import db from '../database/databaseHandler'
import {FindCursor, ObjectID} from 'mongodb'
import { ExerciseModel } from 'App/database/models';
import { Exercise } from 'App/database/interfaces';


export default class RandomWorkout {
  public exercises:         Array <Object>;
  public workout:           Array <Object>;
  public musclesIds:        Array <string>;

  constructor(musclesIds){
    this.musclesIds = musclesIds
  }

  public getPossibleExercises = async () => {
    const exercicios:Array<Exercise> = await db.query({
      type:'find',
      collection:'exercises',
      filters : {muscles: {$in : this.musclesIds}}
    })
    return new Promise(resolve => resolve( exercicios ))
  }


}


