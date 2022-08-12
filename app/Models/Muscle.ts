import { Muscle } from "App/Models/interfaces";

export default class MuscleModel{
  static groupByBodyPart = (muscles:Muscle[]):Object => {
    return muscles.reduce( (acc, curr) => {
      curr.bodyPart.forEach( part => {
        acc[part].push(curr)
      })
      return acc
    },{Lower:[], Upper:[], Core:[], Side:[], Arms:[], Back:[], Front:[]})
  }
}
