import db from '../database/databaseHandler'
import { Exercise } from 'App/database/interfaces';
import muscleRepository from 'App/repository/muscleRepository';


export default class Workout {
  public exercises:  Array <Object>;
  public workout:    Array <Object>;
  public musclesIds: Array <string>;

  constructor(musclesIds){
    this.musclesIds = musclesIds
  }

  public getPossibleExercises = async ():Promise<Array<Exercise>> => {
    const exercicios:Array<Exercise> = await db.query({
      type:'aggregation',
      collection:'exercises',
      pipeline : [
        { $match : {
            muscles: {$in : this.musclesIds}
          }
        },
        { $lookup: {
            from : 'muscles',
            localField : 'muscles',
            foreignField : '_id',
            as : 'muscles'
          }
        }
      ]
    })
    return new Promise(resolve => resolve( exercicios ))
  }
}


