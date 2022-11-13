import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import GlobalStyles from "styles/global";

import Toast from "components/Toast";

import Routes from "routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
      <Toast />
    </ThemeProvider>
  );
}

export default App;
