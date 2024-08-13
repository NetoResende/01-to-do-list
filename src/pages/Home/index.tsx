import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separactor, StartcountDownButton, TasckInput } from "./styles";
import { useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';

const newCiclesFormValidateSchema = zod.object({
  task: 
    zod.string().
    min(1, 'Informe a Tarefa'),
  minutesAmounts: 
    zod.number().
    min(5, 'O ciclo precisa ser no mínimo 5 minutos').
    max(60, 'O ciclo precisa ser de no máximo de 60 minutos')
})

export function Home(){
  const { register, handleSubmit, watch , reset} = useForm({
    resolver: zodResolver(newCiclesFormValidateSchema),
  });

  function handlerCreateNewCicle(data: any){
    console.log(data);
    reset();
  }
  const task = watch("task");
  const IsSubmiteDisabled = !task;

  // formState  usado para passar a mensagem de validação de errors...
  // console.log(formState.errors);
  
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
          <span>0</span>
          <span>0</span>
          <Separactor>:</Separactor>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartcountDownButton disabled={IsSubmiteDisabled} type="submit">
          <Play size={24}/>
          começar
        </StartcountDownButton>
      </form>
    </HomeContainer>
  )
}