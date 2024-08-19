import { HandPalm, Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separactor, StartCountDownButton,  StopCountDownButton, TasckInput } from "./styles";
import { useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds} from 'date-fns'


const newCiclesFormValidateSchema = zod.object({
  task: 
    zod.string().
    min(1, 'Informe a Tarefa'),
  minutesAmounts: 
    zod.number().
    min(5, 'O ciclo precisa ser no mínimo 5 minutos').
    max(60, 'O ciclo precisa ser de no máximo de 60 minutos'), 
})
  type newCiclesFormatteData = zod.infer < typeof newCiclesFormValidateSchema >

interface Cycle {
  id: string;
  task: string;
  minutesAmounts: number;
  startDate: Date;
  interruptDate?: Date
}

export function Home(){
  const [ cycles, setCycles ] = useState <Cycle[]>([]);
  const [ activeCyclesId, setActiveCyclesId ] = useState <string | null>(null);
  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)

  const { register, handleSubmit, watch, formState , reset} = useForm <newCiclesFormatteData>({
    resolver: zodResolver(newCiclesFormValidateSchema),
  });

  const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId);

  useEffect(()=>{
    let interval: number;

    if(activeCycle){
      interval = setInterval(()=>{
        setAmountSecondsPassed(
          differenceInSeconds(new Date, activeCycle.startDate)
        )
      }, 1000)
    }

    return ()=>{
        clearInterval(interval)
    }
  },[activeCycle])

  function handlerCreateNewCicle(data: newCiclesFormatteData){
    const id = String( new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmounts: data.minutesAmounts,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCyclesId(id)
    setAmountSecondsPassed(0)
    reset();
  }

  function handlerInterruptCycle(){
    setCycles(
      cycles.map(cycle => {
      if(cycle.id === activeCyclesId){
        return {...cycle, interruptDate: new Date()}
      }else {
        return cycle
      }
    }))
    setActiveCyclesId(null)
  }
 

  const totalSeconds = activeCycle ? activeCycle.minutesAmounts * 60 : 0
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
  
  const task = watch("task");
  const IsSubmiteDisabled = !task;
  // formState  usado para passar a mensagem de validação de errors...
  console.log(formState.errors);

  console.log(cycles);
  
  
    return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handlerCreateNewCicle)}>
       <FormContainer>
            <label htmlFor="tesck">Vou trabalhar em</label>
            <TasckInput 
                type="text" 
                id="task" 
                list="task-suggestion"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
                {...register("task")}
                />
                
                <datalist id="task-suggestion">
                  <option value="projeto-1"/>
                  <option value="projeto-3"/>
                  <option value="projeto-4"/>
                  <option value="qualquer"/>
                </datalist>

            <label htmlFor="minutesAmounts">durante</label>
            <MinutesAmountInput 
                type="number"
                id="minutesAmounts"
                 placeholder="00"
                 step={5}
                 min={5}
                 max={60}
                 disabled={!!activeCycle}
                 {...register("minutesAmounts", {valueAsNumber: true})}/>

            <span>minutos</span>
       </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separactor>:</Separactor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
           <StopCountDownButton onClick={handlerInterruptCycle}  type="button">
           <HandPalm size={24}/>
           Interromper
         </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={IsSubmiteDisabled} type="submit">
          <Play size={24}/>
          começar
        </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}