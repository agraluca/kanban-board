import { ListEnum, TKanbanCard, useHome } from "pages/Home/useHome";

import Input from "components/Input";

import edit from "assets/images/edit.svg";
import trash from "assets/images/trash.svg";
import arrow from "assets/images/arrow.svg";
import save from "assets/images/save.svg";
import cancel from "assets/images/cancel.svg";

import theme from "styles/theme";

import * as S from "./styles";
import Textarea from "components/Textarea";

type KanbanCardComponent = { isEditing: boolean } & TKanbanCard;

const colorMapper = {
  ToDo: theme.colors.blue.lighter,
  Doing: theme.colors.yellow,
  Done: theme.colors.green,
};

const leftMoveMapper = {
  Done: ListEnum["Doing"],
  Doing: ListEnum["ToDo"],
  ToDo: ListEnum["Done"],
};

const rightMoveMapper = {
  ToDo: ListEnum["Doing"],
  Doing: ListEnum["Done"],
  Done: ListEnum["ToDo"],
};

function KanbanCard({
  id,
  title,
  content = "",
  list,
  isEditing = false,
}: KanbanCardComponent) {
  const {
    isLoading,
    handleMoveCard,
    handleDelete,
    handleShowEditArea,
    handleHideEditArea,
    handleChangeEditCard,
    handleSubmitEditCard,
  } = useHome();

  const cardFooterTag = `Kanb-${id?.slice(0, 4)}`;
  const arrowOnLeft = ["Doing", "Done"].includes(list);
  const arrowOnRigth = ["ToDo", "Doing"].includes(list);

  return (
    <S.Wrapper>
      <S.Header>
        {!isEditing ? (
          <S.Title backgroundColor={colorMapper[list]}>{title}</S.Title>
        ) : (
          <Input
            name="title"
            type="text"
            placeholder="Título..."
            initialValue={title}
            onInputChange={(e) => handleChangeEditCard(e, id, list)}
            error=""
            disabled={isLoading}
          />
        )}

        {!isEditing ? (
          <S.IconsWrapper>
            <S.TransparentButton onClick={() => handleShowEditArea(id)}>
              <S.Icon src={edit} />
            </S.TransparentButton>
            <S.TransparentButton onClick={() => handleDelete({ id, title })}>
              <S.Icon src={trash} />
            </S.TransparentButton>
          </S.IconsWrapper>
        ) : (
          <S.IconsWrapper>
            <S.TransparentButton onClick={handleSubmitEditCard}>
              <S.Icon src={save} />
            </S.TransparentButton>
            <S.TransparentButton onClick={handleHideEditArea}>
              <S.Icon src={cancel} />
            </S.TransparentButton>
          </S.IconsWrapper>
        )}
      </S.Header>
      {!isEditing ? (
        <S.Description>{content}</S.Description>
      ) : (
        <Textarea
          name="content"
          placeholder="Conteúdo..."
          initialValue={content}
          onTextareaChange={(e) => handleChangeEditCard(e, id, list)}
          disabled={isLoading}
          error=""
        />
      )}
      {!isEditing && (
        <S.Footer>
          {arrowOnLeft && (
            <S.TransparentButton
              onClick={() =>
                handleMoveCard({
                  id,
                  title,
                  content,
                  list: leftMoveMapper[list],
                })
              }
            >
              <S.ArrowIcon src={arrow} pos="left" />
            </S.TransparentButton>
          )}
          <S.Tag>{cardFooterTag}</S.Tag>
          {arrowOnRigth && (
            <S.TransparentButton
              onClick={() =>
                handleMoveCard({
                  id,
                  title,
                  content,
                  list: rightMoveMapper[list],
                })
              }
            >
              <S.ArrowIcon src={arrow} pos="right" />
            </S.TransparentButton>
          )}
        </S.Footer>
      )}
    </S.Wrapper>
  );
}

export default KanbanCard;
