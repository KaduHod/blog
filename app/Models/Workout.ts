import db from '../database/databaseHandler'
import { Exercise } from 'App/Models/interfaces';
import muscleRepository from 'App/repository/muscleRepository';


export default class Workout {
  public exercises:  Object[];

  public random = async ({exercisesPerMuscle, totalExercises, musclesList, bodyParts}) => {
    return {exercisesPerMuscle, totalExercises, musclesList, bodyParts}
  }
}


