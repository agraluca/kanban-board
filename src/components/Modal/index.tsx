import Button from "components/Button";
import CreatePortalWrapper from "components/CreatePortalWrapper";

import * as S from "./styles";

export type TModal = {
  visible: boolean;
  title: string;
  description?: string;
  cancelButtonLabel?: string;
  deleteButtonLabel?: string;
  colorType?: "primary" | "danger";
  handleCancel: () => void;
  handleConfirmDelete: () => void;
  isLoading: boolean;
};

function Modal({
  visible,
  title = "Tem certeza? ",
  description = "Essa ação não poderá ser desfeita!",
  cancelButtonLabel = "Cancelar",
  deleteButtonLabel = "Deletar",
  colorType = "primary",
  handleCancel,
  handleConfirmDelete,
  isLoading = false,
}: TModal) {
  if (!visible) {
    return null;
  }

  return (
    <CreatePortalWrapper selector="modal-root">
      <S.Overlay>
        <S.ModalWrapper>
          <S.ModalTitle colorType={colorType}>{title}</S.ModalTitle>
          <S.ModalDescription>{description}</S.ModalDescription>
          <S.ButtonContainer>
            <S.CancelButton onClick={handleCancel} disabled={isLoading}>
              {cancelButtonLabel}
            </S.CancelButton>
            <Button
              size="normal"
              colorType={colorType}
              onClick={handleConfirmDelete}
              isSubmiting={isLoading}
            >
              {deleteButtonLabel}
            </Button>
          </S.ButtonContainer>
        </S.ModalWrapper>
      </S.Overlay>
    </CreatePortalWrapper>
  );
}

export default Modal;
