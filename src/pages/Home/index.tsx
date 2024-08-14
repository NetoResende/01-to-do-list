import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separactor, StartcountDownButton, TasckInput } from "./styles";
import { useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useState } from "react";


const newCiclesFormValidateSchema = zod.object({
  task: 
    zod.string().
    min(1, 'Informe a Tarefa'),
  minutesAmounts: 
    zod.number().
    min(5, 'O ciclo precisa ser no mínimo 5 minutos').
    max(60, 'O ciclo precisa ser de no máximo de 60 minutos')
})
  type newCiclesFormatteData = zod.infer < typeof newCiclesFormValidateSchema >

interface Cycle {
  id: string;
  task: string;
  minutesAmounts: number
}
export function Home(){
  const [ cycles, setCycles ] = useState <Cycle[]>([]);
  const [ activeCyclesId, setActiveCyclesId ] = useState <string | null>(null);
  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)
 
  const { register, handleSubmit, watch,formState , reset} = useForm <newCiclesFormatteData>({
    resolver: zodResolver(newCiclesFormValidateSchema),
  });
  function handlerCreateNewCicle(data: newCiclesFormatteData){
    const id = String( new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmounts: data.minutesAmounts
    }
    setCycles((state) => [...state, newCycle])
    setActiveCyclesId(id)
    reset();
  }
  const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmounts * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  
  const task = watch("task");
  const IsSubmiteDisabled = !task;
  // formState  usado para passar a mensagem de validação de errors...
  console.log(formState.errors);
  
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

        <StartcountDownButton disabled={IsSubmiteDisabled} type="submit">
          <Play size={24}/>
          começar
        </StartcountDownButton>
      </form>
    </HomeContainer>
  )
}