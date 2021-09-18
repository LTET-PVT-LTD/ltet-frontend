import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";


export const ADD_USER ="ADD_USER";
export const REMOVE_USER ="REMOVE_USER";
export const UPDATE_USER = "UPDATE_USER";

export const addUser = createAction(
  ADD_USER,
  props<{ user: User }>()
  );

export const removeUser = createAction(
    REMOVE_USER,
    );


export const updateUser = createAction(
    UPDATE_USER,
    props<{ id:number,user: User }>()
    );

