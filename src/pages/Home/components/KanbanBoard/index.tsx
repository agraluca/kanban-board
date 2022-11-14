import KanbanCard from "../KanbanCard";
import KanbanAddCard from "../KanbanAddCard";

import { TKanbanCard, useHome } from "pages/Home/useHome";

import plusIcon from "assets/images/plus-circle.svg";

import theme from "styles/theme";

import * as S from "./styles";
import Tooltip from "components/Tooltip";

type TKanbanBoard = {
  title: "To Do" | "Doing" | "Done";
  cards: TKanbanCard[];
  type: "toDo" | "doing" | "done";
};

function KanbanBoard({ title = "To Do", cards = [], type }: TKanbanBoard) {
  const { isAdding, isEditing, handleShowAddArea } = useHome();

  const colorMapper = {
    toDo: theme.colors.blue.lighter,
    doing: theme.colors.yellow,
    done: theme.colors.green,
  };

  const toDoBoard = type === "toDo";
  const showAddArea = toDoBoard && !isAdding;
  const showAddCard = toDoBoard && isAdding;
  return (
    <S.Wrapper>
      <S.Title backgroundColor={colorMapper[type]}>{title}</S.Title>

      {showAddArea && (
        <Tooltip text="Adicionar uma task">
          <S.AddMoreArea
            disabled={Boolean(isEditing)}
            onClick={handleShowAddArea}
          >
            <S.PlusIcon src={plusIcon} />
          </S.AddMoreArea>
        </Tooltip>
      )}

      {showAddCard && <KanbanAddCard />}

      {cards.map(({ id, title, content, list }) => (
        <KanbanCard
          isEditing={id === isEditing}
          key={id}
          id={id}
          title={title}
          content={content}
          list={list}
        />
      ))}
    </S.Wrapper>
  );
}

export default KanbanBoard;
