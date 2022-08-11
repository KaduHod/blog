import { Muscle } from "App/database/interfaces";

export default class MuscleModel{
  static groupMusclesByBodyPart = (muscles:Array<Muscle>):Object => {
    return muscles.reduce( (acc, curr) => {
      curr.bodyPart.forEach( part => {
        acc[part].push(curr)
      })
      return acc
    },{Lower:[], Upper:[], Core:[], Side:[], Arms:[], Back:[], Front:[]})
  }
}
