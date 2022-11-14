import useErrors from "hooks/useErrors";
import {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthService from "services/authService";
import CardService from "services/cardService";

import { toast } from "utils/toast";

export enum ListEnum {
  ToDo = "ToDo",
  Doing = "Doing",
  Done = "Done",
}

export type TKanbanCard = {
  id: string;
  title: string;
  content: string;
  list: ListEnum;
};

type TModal = {
  isOpen: boolean;
  id: string | null;
  title: string;
};

type TDeleteModal = {
  id: string;
  title: string;
};

export type UseHomeContextData = {
  cards: TKanbanCard[];
  isLoading: boolean;
  modal: TModal;
  isAdding: boolean;
  handleShowAddArea: () => void;
  handleHideAddArea: () => void;
  handleChangeAddingCard: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmitCard: () => void;
  isEditing: string;
  handleShowEditArea: (id: string) => void;
  handleHideEditArea: () => void;
  handleChangeEditCard: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { id, title, content, list }: TKanbanCard
  ) => void;
  handleSubmitEditCard: () => void;
  handleMoveCard: (card: TKanbanCard) => void;
  handleCloseModal: () => void;
  handleConfirmDelete: () => void;
  hasError: boolean;
  formError: {
    title: string;
    content: string;
  };
  handleDelete: ({ id, title }: TDeleteModal) => void;
  isAddingFormValid: boolean;
  isEditingFormValid: boolean;
};

export type UseHomeProviderProps = {
  children: React.ReactNode;
};

const modalInitialState = {
  isOpen: false,
  id: null,
  title: "",
};

const initialStateAddingCard = {
  title: "",
  content: "",
  list: ListEnum["ToDo"],
};

const initialStateEditingCard = {
  id: "",
  title: "",
  content: "",
  list: ListEnum["ToDo"],
};

const useHomeContextDefaultValues = {
  cards: [],
  isLoading: true,
  modal: modalInitialState,
  isAdding: false,
  handleShowAddArea: () => null,
  handleHideAddArea: () => null,
  handleChangeAddingCard: () => null,
  handleSubmitCard: () => null,
  isEditing: "",
  handleShowEditArea: () => null,
  handleHideEditArea: () => null,
  handleChangeEditCard: () => null,
  handleSubmitEditCard: () => null,
  handleMoveCard: () => null,
  handleCloseModal: () => null,
  handleConfirmDelete: () => null,
  hasError: false,
  formError: {
    title: "",
    content: "",
  },
  handleDelete: () => null,
  isAddingFormValid: false,
  isEditingFormValid: false,
};

export const UseHomeContext = createContext<UseHomeContextData>(
  useHomeContextDefaultValues
);

export default function UseHomeProvider({ children }: UseHomeProviderProps) {
  const [cards, setCards] = useState<TKanbanCard[]>([]);

  const [modal, setModal] = useState<TModal>(modalInitialState);

  const [isLoading, setIsLoading] = useState(true);
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const [isMovingLoading, setIsMovingLoading] = useState(false);
  const [isEditingLoading, setIsEditingLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [addingCard, setAddingCard] = useState(initialStateAddingCard);

  const [isEditing, setIsEditing] = useState("");
  const [editingCard, setEditingCard] = useState<TKanbanCard>(
    initialStateEditingCard
  );

  const { removeError, setError, formError, resetErrors } = useErrors();

  const handleCreateToken = useCallback(async () => {
    try {
      setIsLoading(true);
      await AuthService.createToken();
    } catch {
      toast.error("Ocorreu um erro ao se conectar", 4000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleErrorChange = useCallback(
    (name: string, value: string) => {
      removeError(name);

      if (!value) {
        return setError(name, "Campo obrigatório");
      }
    },
    [removeError, setError]
  );

  const handleListCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const cardsList = await CardService.listCards();
      setHasError(false);
      setCards(cardsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleShowAddArea = () => {
    setIsAdding(true);
  };

  const handleHideAddArea = () => {
    setIsAdding(false);
    setAddingCard(initialStateAddingCard);
    resetErrors();
  };

  const handleChangeAddingCard = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddingCard((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      handleErrorChange(e.target.name, e.target.value);
    },
    [handleErrorChange]
  );

  const handleSubmitCard = useCallback(async () => {
    try {
      setIsAddingLoading(true);
      await CardService.createCard(addingCard);
      toast.success("Task criada com sucesso!", 4000);
    } catch {
      toast.error("Ocorreu um erro ao criar task", 4000);
    } finally {
      setIsAdding(false);
      setAddingCard(initialStateAddingCard);
      handleListCards();
      setIsAddingLoading(false);
    }
  }, [addingCard, handleListCards]);

  const handleShowEditArea = (id: string) => {
    setIsEditing(id);
  };

  const handleHideEditArea = () => {
    setIsEditing("");
    setEditingCard(initialStateEditingCard);
    resetErrors();
  };

  const handleChangeEditCard = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      { id, title, content, list }: TKanbanCard
    ) => {
      setEditingCard((prev) => ({
        ...prev,
        id,
        title,
        content,
        list,
        [e.target.name]: e.target.value,
      }));
      handleErrorChange(e.target.name, e.target.value);
    },
    [handleErrorChange]
  );

  const handleSubmitEditCard = useCallback(async () => {
    try {
      setIsEditingLoading(true);
      await CardService.editCard(editingCard);
      toast.success("Task editada com sucesso!", 4000);
    } catch {
      toast.error("Ocorreu um erro ao editar a task", 4000);
    } finally {
      setIsEditing("");
      setEditingCard(initialStateEditingCard);
      handleListCards();
      setIsEditingLoading(false);
    }
  }, [editingCard, handleListCards]);

  const handleMoveCard = useCallback(
    async (card: TKanbanCard) => {
      try {
        setIsMovingLoading(true);
        await CardService.editCard(card);
        toast.success("Task movida com sucesso!", 4000);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        handleListCards();
        setIsMovingLoading(false);
      }
    },
    [handleListCards]
  );

  const handleDelete = ({ id, title }: TDeleteModal) => {
    setModal({ isOpen: true, id, title });
  };

  const handleCloseModal = () => {
    setModal(modalInitialState);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeletingLoading(true);
      if (modal.id) await CardService.deleteCard(modal.id);
      toast.success("Card deletado com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao deletar o contato!", 4000);
    } finally {
      handleListCards();
      setIsDeletingLoading(false);
      handleCloseModal();
    }
  };

  const isAddingFormValid =
    Object.values(addingCard).every((value) => !!value) &&
    Object.values(formError).filter((err) => !!err).length === 0;

  const isEditingFormValid =
    Object.values(editingCard).every((value) => !!value) &&
    Object.values(formError).filter((err) => !!err).length === 0;

  useEffect(() => {
    handleCreateToken();
  }, [handleCreateToken]);

  useEffect(() => {
    handleListCards();
  }, [handleListCards]);

  return (
    <UseHomeContext.Provider
      value={{
        cards,
        isLoading:
          isLoading ||
          isAddingLoading ||
          isDeletingLoading ||
          isEditingLoading ||
          isMovingLoading,
        modal,
        isAdding,
        handleShowAddArea,
        handleHideAddArea,
        handleChangeAddingCard,
        handleSubmitCard,
        isEditing,
        handleShowEditArea,
        handleHideEditArea,
        handleChangeEditCard,
        handleSubmitEditCard,
        handleMoveCard,
        handleCloseModal,
        handleConfirmDelete,
        handleDelete,
        hasError,
        formError,
        isAddingFormValid,
        isEditingFormValid,
      }}
    >
      {children}
    </UseHomeContext.Provider>
  );
}

const useHome = () => useContext(UseHomeContext);

export { UseHomeProvider, useHome };
