import { useContext, useEffect } from "react";
import { CountDownContainer, Separactor } from "./styled";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../..";

export function CountDown() {
  const { activeCycle, activeCyclesId, marckCurrentsCyclesAsFinished,setSecondsPassed, amountSecondsPassed } = useContext(CycleContext)
 
  const totalSeconds = activeCycle ? activeCycle.minutesAmounts * 60 : 0;
  
  useEffect(()=>{
    let interval: number;
    
    if(activeCycle){
      interval = setInterval(()=>{
        const SecondsDifference = differenceInSeconds(new Date, activeCycle.startDate);

          if(SecondsDifference >= totalSeconds){
               marckCurrentsCyclesAsFinished()
               setSecondsPassed(totalSeconds)
                clearInterval(interval)
          }else {
            setSecondsPassed(SecondsDifference)
       }

      }, 1000)
    }
    return ()=>{
        clearInterval(interval)
    }
  },[activeCycle, totalSeconds, activeCyclesId, marckCurrentsCyclesAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(()=>{
    if(activeCycle){
        document.title=`${minutes} : ${seconds}`
    }
},[minutes, seconds, activeCycle])
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separactor>:</Separactor>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
