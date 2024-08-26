import { createContext, ReactNode, useReducer, useState } from "react";
import {  Cycle, CyclesReducers } from "../reducers/Cycles/Reducer";
import {  AddNewCycleActions, interruptCycleActions, marckCurrentsCyclesAsFinishedActions } from "../reducers/Cycles/actions";

interface CreateCycleDate {
  task: string;
  minutesAmounts: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCyclesId: string | null;
  amountSecondsPassed: number;
  marckCurrentsCyclesAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCicle: (data: CreateCycleDate) => void;
  interruptCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children,}: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer( CyclesReducers,
    {
      cycles: [],
      activeCyclesId: null,
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCyclesId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
  function marckCurrentsCyclesAsFinished() {
    dispatch(marckCurrentsCyclesAsFinishedActions());
  }

  function createNewCicle(data: CreateCycleDate) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmounts: data.minutesAmounts,
      startDate: new Date(),
    };
    dispatch(AddNewCycleActions(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCycle() {
    dispatch(interruptCycleActions());
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCyclesId,
        amountSecondsPassed,
        marckCurrentsCyclesAsFinished,
        setSecondsPassed,
        createNewCicle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
