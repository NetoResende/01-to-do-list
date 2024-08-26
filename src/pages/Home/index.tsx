import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { CountDown } from "./components/CountDown";
import {  useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CycleContext } from "../../contexts/CyclesContext";

const newCiclesFormValidateSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  minutesAmounts: zod
    .number()
    .min(1, "O ciclo precisa ser no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo de 60 minutos"),
});
type newCiclesFormatteData = zod.infer<typeof newCiclesFormValidateSchema>;


export function Home() {
 
  const { activeCycle,createNewCicle, interruptCycle} = useContext(CycleContext)

  const newCycleForm = useForm<newCiclesFormatteData>({
    resolver: zodResolver(newCiclesFormValidateSchema),
    defaultValues: {
      task: "",
      minutesAmounts: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;
 
 function handlerCreateNewCycle(data: newCiclesFormatteData ){
  createNewCicle(data);
  reset()
 }
  const task = watch("task");
  const IsSubmiteDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handlerCreateNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
       

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={IsSubmiteDisabled} type="submit">
            <Play size={24} />
            começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
