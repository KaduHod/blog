import db from '../database/databaseHandler'
import { Exercise } from 'App/Models/interfaces'
import { ObjectId } from 'mongodb'
export default class exerciseRepository{
  static aggregateWithMusclesById = async ( ids:ObjectId[] ):Promise<Exercise[]> => {
    const query = await db.query({
      type:'aggregation',
      collection:'exercises',
      pipeline : [
        { $match : {
            muscles: {$in : ids}
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
    return new Promise( resolve => resolve( query) )
  }
  static aggregateWithTypesOfMuscles = async ( ids:ObjectId[] ):Promise<Exercise[]> => {
    const query = await db.query({
      type:'aggregation',
      collection:'exercises',
      pipeline : [
        { $match : {
            agonists : {$in : ids}
          }
        },
        { $lookup: {
            from : 'muscles',
            localField : 'agonists',
            foreignField : '_id',
            as : 'agonists'
          }
        }
      ]
    })
    return new Promise( resolve => resolve( query) )
  }

  static aggregateWithMuscles = async ():Promise<Exercise[]> => {
    const query = await db.query({
      type:'aggregation',
      collection:'exercises',
      pipeline : [
        { $match : {} },
        { $lookup: {
            from : 'muscles',
            localField : 'muscles',
            foreignField : '_id',
            as : 'muscles'
          }
        }
      ]
    })
    return new Promise( resolve => resolve( query ) )
  }
}
