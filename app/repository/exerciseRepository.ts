import db from '../database/databaseHandler'
import { Exercise } from 'App/database/interfaces'
import { ObjectId } from 'mongodb'

export default class exerciseRepository{
  static aggregateById = async ( ids:ObjectId[] ):Promise<Exercise[]> => {
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
}
