import { useHome } from "pages/Home/useHome";

import Input from "components/Input";

import save from "assets/images/save.svg";
import cancel from "assets/images/cancel.svg";

import * as S from "./styles";
import Textarea from "components/Textarea";

function KanbanAddCard() {
  const {
    isLoading,
    handleHideAddArea,
    handleChangeAddingCard,
    handleSubmitCard,
  } = useHome();
  return (
    <S.Wrapper>
      <S.Header>
        <Input
          name="title"
          type="text"
          placeholder="Título..."
          onChange={handleChangeAddingCard}
          error=""
          disabled={isLoading}
        />
        <S.IconsWrapper>
          <S.TransparentButton disabled={isLoading} onClick={handleSubmitCard}>
            <S.Icon src={save} />
          </S.TransparentButton>
          <S.TransparentButton disabled={isLoading} onClick={handleHideAddArea}>
            <S.Icon src={cancel} />
          </S.TransparentButton>
        </S.IconsWrapper>
      </S.Header>
      <Textarea
        name="content"
        placeholder="Conteúdo..."
        onChange={handleChangeAddingCard}
        disabled={isLoading}
        error=""
      />
    </S.Wrapper>
  );
}

export default KanbanAddCard;
