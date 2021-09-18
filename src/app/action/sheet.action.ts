import { createAction, props } from "@ngrx/store";
import { Sheet } from "../model/sheet.model";


export const ADD_SHEET ="ADD_SHEET";
export const REMOVE_SHEET ="REMOVE_SHEET";
export const UPDATE_SHEET = "UPDATE_SHEET";
export const INITIAL_SHEETS = "INITIAL_SHEETS";

export const addSheet = createAction(
  ADD_SHEET,
  props<{ sheet: Sheet }>()
  );

export const removeSheet = createAction(
    REMOVE_SHEET,

    );


export const updateSheet = createAction(
    UPDATE_SHEET,
    props<{ sheetId:number,sheet: Sheet }>()
    );

    export const initialSheets = createAction(
      INITIAL_SHEETS,
      props<{ sheets:Sheet[]}>()
      );
