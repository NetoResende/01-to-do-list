import { ThemeProvider } from "styled-components"
import { defaultThemes } from "./styles/themes/default";
import { Router } from "./Router";

import { GlobalStyle } from "./styles/global";
import { BrowserRouter} from 'react-router-dom';
import { CyclesContextProvider } from "./contexts/CyclesContext";


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
