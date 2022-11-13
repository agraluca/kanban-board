import { useHome } from "./useHome";

import Modal from "components/Modal";
import KanbanBoard from "./components/KanbanBoard";

import * as S from "./styles";
import Loader from "components/Loader";

function Home() {
  const {
    cards,
    modal,
    isLoading,
    handleCloseModal,
    handleConfirmDelete,
    isDeletingLoading,
  } = useHome();

  const toDoCards = cards.filter((card) => card.list === "ToDo");
  const doingCards = cards.filter((card) => card?.list === "Doing");
  const doneCards = cards.filter((card) => card?.list === "Done");

  return (
    <S.Wrapper>
      <Loader isLoading={isLoading} />
      <KanbanBoard title="To Do" cards={toDoCards} type="toDo" />
      <KanbanBoard title="Doing" cards={doingCards} type="doing" />
      <KanbanBoard title="Done" cards={doneCards} type="done" />
      <Modal
        visible={modal.isOpen}
        handleCancel={handleCloseModal}
        colorType="danger"
        title={`Tem certeza que deseja remover o card '${modal.title}'?`}
        handleConfirmDelete={handleConfirmDelete}
        isLoading={isDeletingLoading}
      />
    </S.Wrapper>
  );
}

export default Home;
