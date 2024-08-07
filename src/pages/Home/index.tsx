import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separactor, StartcountDownButton, TasckInput } from "./styles";

export function Home(){
  return (
    <HomeContainer>
      <form action="">
       <FormContainer>
            <label htmlFor="tesck">Vou trabalhar em</label>
            <TasckInput 
                type="text" 
                id="tesck" 
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestion"/>
                
                <datalist id="task-suggestion">
                  <option value="projeto-1"/>
                  <option value="projeto-3"/>
                  <option value="projeto-4"/>
                  <option value="qualquer"/>
                </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number"
                id="minutesAmount"
                 placeholder="00"
                 step={5}
                 min={5}
                 max={60}/>

            <span>minutos</span>
       </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separactor>:</Separactor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartcountDownButton disabled type="submit">
          <Play size={24}/>
          começar
        </StartcountDownButton>
      </form>
    </HomeContainer>
  )
}