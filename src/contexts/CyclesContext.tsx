import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleDate {
  task: string;
  minutesAmounts: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmounts: number;
  startDate: Date;
  interruptDate?: Date;
  fishedDate?: Date;
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

interface CyclesState {
  cycles: Cycle[]
  activeCyclesId: string | null
}

export function CyclesContextProvider({ children,}: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(  (state: CyclesState, action: any) => {

      switch (action.type) {
          case "ADD_NEW_CYCLE":
                return {
                  ...state,
                  cycles: [...state.cycles, action.payload.newCycle],
                  activeCyclesId: action.payload.newCycle.id,
                };

          case "INTERRUPT_CURRENT_CYCLE":
                return {
                  ...state,
                  cycles: state.cycles.map((cycle: any) => {
                    if (cycle.id === state.activeCyclesId) {
                      return { ...cycle, interruptDate: new Date() };
                    } else {
                      return cycle;
                    }
                  }),
                  activeCyclesId: null,
                };

          case "MARCK_CURRENT_CYCLE_AS_FINISCHED":
                return {
                  ...state,
                  cycles: state.cycles.map((cycle: any) => {
                    if (cycle.id === state.activeCyclesId) {
                      return { ...cycle, fishedDate: new Date() };
                    } else {
                      return cycle;
                    }
                  }),
                  activeCyclesId: null,
                };

          default:
              return state;
      }
    },
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
    dispatch({
      type: "MARCK_CURRENT_CYCLE_AS_FINISCHED",
      payload: {
        activeCyclesId,
      },
    });
  }

  function createNewCicle(data: CreateCycleDate) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmounts: data.minutesAmounts,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });
    setAmountSecondsPassed(0);
  }
  function interruptCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCyclesId,
      },
    });
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
