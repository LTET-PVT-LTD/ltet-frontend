import { createAction, props } from "@ngrx/store";
import { Room } from "../model/room.model";


export const ADD_USER_ROOM ="ADD__USER_ROOM";
export const REMOVE_USER_ROOM ="REMOVE_USER_ROOM";
export const UPDATE_USER_ROOM = "UPDATE_USER_ROOM";
export const INITIAL_ROOMS = "INITIAL_ROOMS";

export const addUserRoom = createAction(
  ADD_USER_ROOM,
  props<{ room: Room }>()
  );

export const removeUserRoom = createAction(
    REMOVE_USER_ROOM,
    props<{ removeRoomId: number }>()
    );


export const updateUserRoom = createAction(
    UPDATE_USER_ROOM,
    props<{ roomId:number,room: Room }>()
    );

    export const initialRooms = createAction(
      INITIAL_ROOMS,
      props<{ rooms:Room[]}>()
      );



