import { createReducer, on, State } from "@ngrx/store";
import { addRoom, removeRoom } from "../action/room.action";
import { UserQuestion } from "../model/user_question.model";


import { Room } from "../model/room.model";

export const initialState:Room={
  users_questions:[],
  id:0,
  is_private:false,
  sheet:{
    id:0,
    questions:[],
    sheet_name:"",
    sheet_description:"",
    enrolled_users_count:0,
    enrolled_users:[]
  },
  priviliged_room_users:[],
  room_users:[],
  room_code:""
}

export const _Room= createReducer(
  initialState,
  on(addRoom,(state, {room}) =>{
    return room;
  }),
  on(removeRoom,(state) =>{
    return {
      users_questions:[],
      id:0,
      is_private:false,
      sheet:{
        id:0,
        questions:[],
        sheet_name:"",
        sheet_description:"",
        enrolled_users_count:0,
        enrolled_users:[]
      },
      priviliged_room_users:[],
      room_users:[],
      room_code:""
    }
  }),




);

export function Room(state:any, action:any){
  return _Room(state,action);
}
