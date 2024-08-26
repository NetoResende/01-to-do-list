import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmounts: number;
  startDate: Date;
  interruptDate?: Date;
  fishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[]
  activeCyclesId: string | null
}

export function CyclesReducers (state: CyclesState, action: any) { 

  switch (action.type) {
      case ActionTypes.ADD_NEW_CYCLE:
            return {
              ...state,
              cycles: [...state.cycles, action.payload.newCycle],
              activeCyclesId: action.payload.newCycle.id,
            };

      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
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

      case ActionTypes.MARCK_CURRENT_CYCLE_AS_FINISCHED:
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
}


 