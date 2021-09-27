export interface Question{
  id:number,
  question_url: string,
  question_description:string,
  created_at:string,
  category:{
    id:number,
    name:string
  },
  sheet: number[],
  tags:number[]
}
