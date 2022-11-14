import { useHome } from "pages/Home/useHome";

import Input from "components/Input";

import save from "assets/images/save.svg";
import cancel from "assets/images/cancel.svg";

import * as S from "./styles";
import Textarea from "components/Textarea";
import Tooltip from "components/Tooltip";

function KanbanAddCard() {
  const {
    isAddingFormValid,
    isLoading,
    handleHideAddArea,
    handleChangeAddingCard,
    handleSubmitCard,
    formError,
  } = useHome();

  return (
    <S.Wrapper>
      <S.Header>
        <Input
          name="title"
          type="text"
          placeholder="Título..."
          onInputChange={handleChangeAddingCard}
          error={formError.title}
          disabled={isLoading}
        />
        <S.IconsWrapper>
          <Tooltip text="Criar">
            <S.TransparentButton
              disabled={isLoading || !isAddingFormValid}
              onClick={handleSubmitCard}
            >
              <S.Icon src={save} />
            </S.TransparentButton>
          </Tooltip>
          <Tooltip text="Cancelar">
            <S.TransparentButton
              disabled={isLoading}
              onClick={handleHideAddArea}
            >
              <S.Icon src={cancel} />
            </S.TransparentButton>
          </Tooltip>
        </S.IconsWrapper>
      </S.Header>
      <Textarea
        name="content"
        placeholder="Conteúdo..."
        onTextareaChange={handleChangeAddingCard}
        error={formError.content}
        disabled={isLoading}
      />
    </S.Wrapper>
  );
}

export default KanbanAddCard;
