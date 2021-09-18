import { Sheet } from "./sheet.model";
import { User } from "./user.model";
import { UserQuestion } from "./user_question.model";

export interface Room{
  users_questions:UserQuestion[],
  id:number,
  sheet:Sheet,
  priviliged_room_users:User[],
  room_users:User[],
  room_code:string,
  is_private:boolean

}
