import { TKanbanCard, useHome } from "pages/Home/useHome";

import edit from "assets/images/edit.svg";
import trash from "assets/images/trash.svg";
import arrow from "assets/images/arrow.svg";

import theme from "styles/theme";

import * as S from "./styles";

function KanbanCard({ id, title, content = "", list }: TKanbanCard) {
  const { handleDelete } = useHome();
  const colorMapper = {
    ToDo: theme.colors.blue.lighter,
    Doing: theme.colors.yellow,
    Done: theme.colors.green,
  };

  const cardFooterTag = `Kanb-${id?.slice(0, 4)}`;
  const arrowOnLeft = ["Doing", "Done"].includes(list);
  const arrowOnRigth = ["ToDo", "Doing"].includes(list);

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title backgroundColor={colorMapper[list]}>{title}</S.Title>
        <S.IconsWrapper>
          <S.TransparentButton>
            <S.Icon src={edit} />
          </S.TransparentButton>
          <S.TransparentButton>
            <S.Icon src={trash} onClick={() => handleDelete({ id, title })} />
          </S.TransparentButton>
        </S.IconsWrapper>
      </S.Header>
      <S.Description>{content}</S.Description>
      <S.Footer>
        {arrowOnLeft && (
          <S.TransparentButton>
            <S.ArrowIcon src={arrow} pos="left" />
          </S.TransparentButton>
        )}
        <S.Tag>{cardFooterTag}</S.Tag>
        {arrowOnRigth && (
          <S.TransparentButton>
            <S.ArrowIcon src={arrow} pos="right" />
          </S.TransparentButton>
        )}
      </S.Footer>
    </S.Wrapper>
  );
}

export default KanbanCard;
