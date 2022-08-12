import db from '../database/databaseHandler'
import { Exercise, Muscle } from 'App/Models/interfaces';
import muscleRepository from 'App/repository/muscleRepository';


export default class WorkoutModel {
  public exercises:  Object[];
  static random = async (exercisesPerMuscle:Number| null, totalExercises:Number | null, musclesList:String[] | null, bodyParts:String[] | null) => {
    return new Promise ( resolve => resolve({exercisesPerMuscle, totalExercises, musclesList, bodyParts}))
  }
}


