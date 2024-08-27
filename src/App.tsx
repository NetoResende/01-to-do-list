import { Router } from "./Router";
import { BrowserRouter} from 'react-router-dom';
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { ThemeProvider } from "styled-components"
import { defaultThemes } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

export function App() {
  return ( 
    <ThemeProvider theme={defaultThemes}>
        <BrowserRouter>
          <CyclesContextProvider>
             <Router/>
          </CyclesContextProvider>
        </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
