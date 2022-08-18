import db from '../database/databaseHandler'
import { Exercise } from 'App/Models/interfaces'
import { ObjectId } from 'mongodb'
export default class exerciseRepository{
  static aggregateWithMusclesById = ( ids:ObjectId[] ):Promise<Exercise[]> => {
    const query = db.query({
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
    return new Promise( resolve => resolve( query ) )
  }
  static aggregateByAgonist = ( ids:ObjectId[], ):Promise<Exercise[]> => {
    const query = db.query({
      type:'multipleAggregation',
      collection:'exercises',
      pipeline : [
        {
          $match : { agonists : { $in : ids } }
        },
        {
          $lookup : {
            from:'muscles',
            localField : 'agonists',
            foreignField : '_id',
            as : 'agonists'
          }
        },
        {
          $lookup : {
            from:'muscles',
            localField : 'stabilizers',
            foreignField : '_id',
            as : 'stabilizers'
          }
        },
        {
          $lookup : {
            from:'muscles',
            localField : 'synergists',
            foreignField : '_id',
            as : 'synergists'
          }
        }
      ]
    })
    return new Promise( resolve => resolve( query) )
  }

  static aggregateWithMuscles = ():Promise<Exercise[]> => {
    const query = db.query({
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
