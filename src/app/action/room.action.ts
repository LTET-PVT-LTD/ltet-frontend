import { createAction, props } from "@ngrx/store";
import { Room } from "../model/room.model";


export const ADD_ROOM ="ADD_ROOM";
export const REMOVE_ROOM ="REMOVE_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";



export const addRoom = createAction(
  ADD_ROOM,
  props<{ room: Room}>()
  );

export const removeRoom = createAction(
    REMOVE_ROOM,
    );


export const updateRoom = createAction(
    UPDATE_ROOM,
    props<{ id:number,room: Room }>()
    );



