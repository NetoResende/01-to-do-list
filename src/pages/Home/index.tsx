import { HandPalm, Play } from "phosphor-react";
import { HomeContainer,StartCountDownButton,  StopCountDownButton } from "./styles";
import { CountDown } from "./components/CountDown";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const newCiclesFormValidateSchema = zod.object({
  task: 
    zod.string().
    min(1, 'Informe a Tarefa'),
  minutesAmounts: 
    zod.number().
    min(1, 'O ciclo precisa ser no mínimo 5 minutos').
    max(60, 'O ciclo precisa ser de no máximo de 60 minutos'), 
})
  type newCiclesFormatteData = zod.infer < typeof newCiclesFormValidateSchema >
  
interface Cycle {
  id: string;
  task: string;
  minutesAmounts: number;
  startDate: Date;
  interruptDate?: Date;
  fishedDate?: Date
}
interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCyclesId: string | null;
  amountSecondsPassed: number
  marckCurrentsCyclesAsFinished: ()=> void;
  setSecondsPassed: ( seconds: number)=> void
}

export const CycleContext = createContext({} as CycleContextType)

export function Home(){
  const [ cycles, setCycles ] = useState <Cycle[]>([]);
  const [ activeCyclesId, setActiveCyclesId ] = useState <string | null>(null);
  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)

  const newCycleForm = useForm <newCiclesFormatteData>({
    resolver: zodResolver(newCiclesFormValidateSchema),
    defaultValues: {
      task: '',
      minutesAmounts: 0
    }
  });

  const { handleSubmit, watch, formState , reset} = newCycleForm
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId);

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function marckCurrentsCyclesAsFinished(){
    setCycles((state)=>
        state.map(cycle => {
            if(cycle.id === activeCyclesId){
              return {...cycle, fishedDate: new Date()}
            }else {
              return cycle
              }
          })
        )
}

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
    setCycles((state) => state.map(cycle => {
                        if(cycle.id === activeCyclesId){
                          return {...cycle, interruptDate: new Date()}
                        }else {
                          return cycle
                        }
                  }))
    setActiveCyclesId(null)
  }

  const task = watch("task");
  const IsSubmiteDisabled = !task;
  

    return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handlerCreateNewCicle)}>
        <CycleContext.Provider  
        value={{ activeCycle, activeCyclesId,amountSecondsPassed, marckCurrentsCyclesAsFinished, setSecondsPassed}}>
            <FormProvider {...newCycleForm}>
              <NewCycleForm />
            </FormProvider>
            <CountDown/>
        </CycleContext.Provider>

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