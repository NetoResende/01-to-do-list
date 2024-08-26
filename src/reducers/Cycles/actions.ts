import { Cycle } from "./Reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARCK_CURRENT_CYCLE_AS_FINISCHED = 'MARCK_CURRENT_CYCLE_AS_FINISCHED'
}

export function AddNewCycleActions(newCycle: Cycle) {
  return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
          newCycle,
      },
  }  
}
export function marckCurrentsCyclesAsFinishedActions() {
  return  {
    type: ActionTypes.MARCK_CURRENT_CYCLE_AS_FINISCHED,
  } 
}
export function interruptCycleActions() {
  return  {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  } 
}