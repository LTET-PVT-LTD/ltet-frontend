import { createReducer, on, State } from "@ngrx/store";
import { addSheet, initialSheets, removeSheet, updateSheet } from "../action/sheet.action";
import { Sheet } from "../model/sheet.model";

export const initialState:Sheet[]= []



export const _Sheet= createReducer(
  initialState,
  on(initialSheets,(state, {sheets}) =>{
    return sheets;
  }),


  on(removeSheet,(state) =>{
    return [];
  }),
  on(updateSheet,(state, {sheetId,sheet}) =>{
    return state.map((currSheet) => {

      if(currSheet.id===sheetId){

       return sheet;
      }
      else{
        return currSheet;
      }
    });
  }),

);

export function Sheet(state:any, action:any){

  return _Sheet(state,action);
}
