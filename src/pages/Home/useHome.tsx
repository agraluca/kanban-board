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
    id: string,
    list: ListEnum
  ) => void;
  handleSubmitEditCard: () => void;
  handleMoveCard: (card: TKanbanCard) => void;
  handleCloseModal: () => void;
  handleConfirmDelete: () => void;
  isDeletingLoading: boolean;
  hasError: boolean;
  handleDelete: ({ id, title }: TDeleteModal) => void;
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
  isLoading: false,
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
  isDeletingLoading: false,
  hasError: false,
  handleDelete: () => null,
};

export const UseHomeContext = createContext<UseHomeContextData>(
  useHomeContextDefaultValues
);

export default function UseHomeProvider({ children }: UseHomeProviderProps) {
  const [modal, setModal] = useState<TModal>(modalInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [cards, setCards] = useState<TKanbanCard[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addingCard, setAddingCard] = useState(initialStateAddingCard);

  const [isEditing, setIsEditing] = useState("");
  const [editingCard, setEditingCard] = useState<TKanbanCard>(
    initialStateEditingCard
  );

  const handleCreateToken = useCallback(async () => {
    try {
      setIsDeletingLoading(true);
      await AuthService.createToken();
    } catch {
      toast.error("Ocorreu um erro ao se conectar", 4000);
    } finally {
      setIsDeletingLoading(false);
    }
  }, []);

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
  };

  const handleChangeAddingCard = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddingCard((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleSubmitCard = useCallback(async () => {
    try {
      setIsLoading(true);
      await CardService.createCard(addingCard);
      toast.success("Task criada com sucesso!", 4000);
    } catch {
      toast.error("Ocorreu um erro ao criar task", 4000);
    } finally {
      setIsAdding(false);
      setAddingCard(initialStateAddingCard);
      handleListCards();
      setIsLoading(false);
    }
  }, [addingCard, handleListCards]);

  const handleShowEditArea = (id: string) => {
    setIsEditing(id);
  };

  const handleHideEditArea = () => {
    setIsEditing("");
    setEditingCard(initialStateEditingCard);
  };

  const handleChangeEditCard = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string,
      list: ListEnum
    ) => {
      setEditingCard((prev) => ({
        ...prev,
        id,
        list,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleSubmitEditCard = useCallback(async () => {
    try {
      setIsLoading(true);
      await CardService.editCard(editingCard);
      toast.success("Task editada com sucesso!", 4000);
    } catch {
      toast.error("Ocorreu um erro ao editar a task", 4000);
    } finally {
      setIsEditing("");
      setEditingCard(initialStateEditingCard);
      handleListCards();
      setIsLoading(false);
    }
  }, [editingCard, handleListCards]);

  const handleMoveCard = useCallback(
    async (card: TKanbanCard) => {
      try {
        setIsLoading(true);
        await CardService.editCard(card);
        toast.success("Task movida com sucesso!", 4000);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        handleListCards();
        setIsLoading(false);
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
        isLoading,
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
        isDeletingLoading,
        hasError,
        handleDelete,
      }}
    >
      {children}
    </UseHomeContext.Provider>
  );
}

const useHome = () => useContext(UseHomeContext);

export { UseHomeProvider, useHome };
