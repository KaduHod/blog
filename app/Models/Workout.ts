import db from '../database/databaseHandler'
import { Exercise, Muscle } from 'App/Models/interfaces';
import exerciseRepository from 'App/repository/exerciseRepository';
import { Collection, ObjectId } from 'mongodb';

export default class WorkoutModel {
  public  exercisesPerMuscle:Number | null = null;
  public  musclesIdList:ObjectId[]  | null = null;
  private exercises:Exercise[]      | null = null;

  constructor({exercisesPerMuscle , musclesIdList}){
    this.exercisesPerMuscle = exercisesPerMuscle;
    this.musclesIdList      = musclesIdList;
  }

  public setExercisesByMusclesId = async () => { 
    this.exercises = await exerciseRepository.aggregateWithMusclesById(this.musclesIdList)
  }

  getExercises():Collection{
    return this.exercises
  }
}




