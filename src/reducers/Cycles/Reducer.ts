import { produce } from 'immer'
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
      case ActionTypes.ADD_NEW_CYCLE: {
            return produce(state, draft=>{
                draft.cycles.push(action.payload.newCycle)
                draft.activeCyclesId = action.payload.newCycle.id
            } )
          }

      case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex(cycle =>{
                  return cycle.id === state.activeCyclesId
            });
            if(currentCycleIndex < 0){
              return state
            }
            return produce(state, draft =>{
              draft.activeCyclesId = null
              draft.cycles[currentCycleIndex].interruptDate = new Date()
            })
          }

      case ActionTypes.MARCK_CURRENT_CYCLE_AS_FINISCHED:{  
          const currentCycleIndex = state.cycles.findIndex(cycle =>{
                return cycle.id === state.activeCyclesId
          });
          if(currentCycleIndex < 0){
            return state
          }
          return produce(state, draft =>{
            draft.activeCyclesId = null
            draft.cycles[currentCycleIndex].fishedDate = new Date()
          })
        }
            
      default:
          return state;
  }
}


 