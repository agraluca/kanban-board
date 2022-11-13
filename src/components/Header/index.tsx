import logo from "assets/images/logo.svg";

import * as S from "./styles";

function Header() {
  return (
    <S.WrapperContainer>
      <S.LogoImage src={logo} alt="Kanban" />
    </S.WrapperContainer>
  );
}

export default Header;
