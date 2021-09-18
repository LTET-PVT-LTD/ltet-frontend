import { createReducer, on, State } from "@ngrx/store";
import {  addUserRoom, initialRooms, removeUserRoom, updateUserRoom} from "../action/user_room.action";
import { Room } from "../model/room.model";

export const initialState:Room[]= []



export const _UserRoom= createReducer(
  initialState,
  on(addUserRoom,(state, {room}) =>{
    return [...state,room]
  }),

  on(initialRooms,(state, {rooms}) =>{
    return rooms;
  }),


  on(removeUserRoom,(state, {removeRoomId}) =>{
    return state.filter(room => room.id!=removeRoomId);
  }),
  on(updateUserRoom,(state, {roomId,room}) =>{
    return state.map((currRoom) => {

      if(currRoom.id===roomId){

       return room;
      }
      else{
        return currRoom;
      }
    });
  }),

);

export function UserRoom(state:any, action:any){

  return _UserRoom(state,action);
}
