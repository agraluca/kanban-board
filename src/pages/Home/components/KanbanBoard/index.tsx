import { useState } from "react";

import KanbanCard from "../KanbanCard";
import { TKanbanCard } from "pages/Home/useHome";

import plusIcon from "assets/images/plus-circle.svg";

import theme from "styles/theme";

import * as S from "./styles";

type TKanbanBoard = {
  title: "To Do" | "Doing" | "Done";
  cards: TKanbanCard[];
  type: "toDo" | "doing" | "done";
};

function KanbanBoard({ title = "To Do", cards = [], type }: TKanbanBoard) {
  const [isAdding, setIsAdding] = useState(false);
  const colorMapper = {
    toDo: theme.colors.blue.lighter,
    doing: theme.colors.yellow,
    done: theme.colors.green,
  };

  const handleShowAddArea = () => {
    setIsAdding(true);
  };

  const toDoBoard = type === "toDo";
  const showAddArea = toDoBoard && !isAdding;
  const showAddCard = toDoBoard && isAdding;
  return (
    <S.Wrapper>
      <S.Title backgroundColor={colorMapper[type]}>{title}</S.Title>

      {showAddArea && (
        <S.AddMoreArea onClick={handleShowAddArea}>
          <S.PlusIcon src={plusIcon} />
        </S.AddMoreArea>
      )}

      {/* {showAddCard && (

      )} */}

      {cards.map(({ id, title, content, list }) => (
        <KanbanCard
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
