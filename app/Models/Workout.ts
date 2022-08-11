import db from '../database/databaseHandler'
import { Exercise } from 'App/database/interfaces';
import muscleRepository from 'App/repository/muscleRepository';


export default class Workout {
  public exercises:  Object[];
  public workout:    Object[];
  public musclesIds: string[];

  constructor(musclesIds){
    this.musclesIds = musclesIds
  }

  public random = async ({exercisesPerMuscle, totalExercises, musclesList, bodyParts}) => {
    return {exercisesPerMuscle, totalExercises, musclesList, bodyParts}
  }
}


