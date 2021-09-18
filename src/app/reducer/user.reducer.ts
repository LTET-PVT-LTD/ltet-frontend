import { createReducer, on, State } from "@ngrx/store";
import { addUser, removeUser, updateUser } from "../action/user.action";

import { User } from "../model/user.model";

export const initialState:User={
  email:"",
  id:0
}

export const _user= createReducer(
  initialState,
  on(addUser,(state, {user}) =>{
    return user;
  }),
  on(removeUser,(state) =>{
    return {email:"",id:0}
  }),


);

export function user(state:any, action:any){
  return _user(state,action);
}
