import { FormContainer, MinutesAmountInput, TasckInput } from "./styled";
import { useContext } from "react";
import { CycleContext } from "../..";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
   
  const { activeCycle} = useContext(CycleContext)
  const { register} = useFormContext()

  return (
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
                <option value="projeto-1" />
                <option value="projeto-3" />
                <option value="projeto-4" />
                <option value="qualquer" />
              </datalist>

              <label htmlFor="minutesAmounts">durante</label>
              <MinutesAmountInput
                type="number"
                id="minutesAmounts"
                placeholder="00"
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register("minutesAmounts", { valueAsNumber: true })}
              />

              <span>minutos</span>
        </FormContainer>
  );
}
