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
import Tooltip from "components/Tooltip";

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
    isEditing: someoneIsEditing,
    isAdding,
    isLoading,
    formError,
    isEditingFormValid,
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
          <Tooltip text={title}>
            <S.Title backgroundColor={colorMapper[list]}>{title}</S.Title>
          </Tooltip>
        ) : (
          <Input
            name="title"
            type="text"
            placeholder="Título..."
            initialValue={title}
            onInputChange={(e) =>
              handleChangeEditCard(e, { id, title, content, list })
            }
            error={formError.title}
            disabled={isLoading}
          />
        )}

        {!isEditing ? (
          <S.IconsWrapper>
            <Tooltip text="Editar">
              <S.TransparentButton
                disabled={isAdding || Boolean(someoneIsEditing)}
                onClick={() => handleShowEditArea(id)}
              >
                <S.Icon src={edit} />
              </S.TransparentButton>
            </Tooltip>
            <Tooltip text="Excluir">
              <S.TransparentButton
                disabled={isAdding || Boolean(someoneIsEditing)}
                onClick={() => handleDelete({ id, title })}
              >
                <S.Icon src={trash} />
              </S.TransparentButton>
            </Tooltip>
          </S.IconsWrapper>
        ) : (
          <S.IconsWrapper>
            <Tooltip text="Salvar">
              <S.TransparentButton
                disabled={!isEditingFormValid}
                onClick={handleSubmitEditCard}
              >
                <S.Icon src={save} />
              </S.TransparentButton>
            </Tooltip>
            <Tooltip text="Cancelar">
              <S.TransparentButton onClick={handleHideEditArea}>
                <S.Icon src={cancel} />
              </S.TransparentButton>
            </Tooltip>
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
          onTextareaChange={(e) =>
            handleChangeEditCard(e, { id, title, content, list })
          }
          disabled={isLoading}
          error={formError.content}
        />
      )}
      {!isEditing && (
        <S.Footer>
          {arrowOnLeft && (
            <Tooltip
              text={`Mover para ${
                leftMoveMapper[list] === "ToDo" ? "To Do" : leftMoveMapper[list]
              }`}
            >
              <S.TransparentButton
                disabled={isAdding || Boolean(someoneIsEditing)}
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
            </Tooltip>
          )}
          <S.Tag>{cardFooterTag}</S.Tag>
          {arrowOnRigth && (
            <Tooltip text={`Mover para ${rightMoveMapper[list]}`}>
              <S.TransparentButton
                disabled={isAdding || Boolean(someoneIsEditing)}
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
            </Tooltip>
          )}
        </S.Footer>
      )}
    </S.Wrapper>
  );
}

export default KanbanCard;
