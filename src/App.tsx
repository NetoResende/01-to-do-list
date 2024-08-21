import { ThemeProvider } from "styled-components"
import { defaultThemes } from "./styles/themes/default";
import { Router } from "./Router";

import { GlobalStyle } from "./styles/global";
import { BrowserRouter} from 'react-router-dom';

export function App() {
  return ( 
    <ThemeProvider theme={defaultThemes}>
      <BrowserRouter>
         <Router/>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
