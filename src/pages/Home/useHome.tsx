import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthService from "services/authService";
import CardService from "services/cardService";

import { toast } from "utils/toast";

export type TKanbanCard = {
  id: string;
  title: string;
  content: string;
  list: "ToDo" | "Doing" | "Done";
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

const useHomeContextDefaultValues = {
  cards: [],
  isLoading: false,
  modal: modalInitialState,
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

  const handleCreateToken = useCallback(async () => {
    await AuthService.createToken();
  }, []);

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
