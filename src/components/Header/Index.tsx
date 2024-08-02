import { HeaderContainer } from "./styled";
import logoIgnite from '../../assets/logo-iginte.png'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header(){
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
          <NavLink to='/' title="Time">
            <Timer size={24}/>
          </NavLink>
          <NavLink to='/history' title="Histórico">
            <Scroll size={24}/>
          </NavLink>
      </nav>
    </HeaderContainer>
  )
}