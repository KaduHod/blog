import db from '../database/databaseHandler'
import { Muscle } from 'App/Models/interfaces'
import { ObjectId } from 'mongodb'

export default class muscleRepository{
  static all = ():Promise<Muscle[]> =>{
    const query:Promise<Muscle[]> = db.query({
      type:'find',
      collection:'muscles'
    })
    return new Promise( resolve => resolve( query ))
  }

  static getMuscleNames = ( ids:ObjectId[] ):Promise<Muscle[]> => {
    const query:Promise<Muscle[]> = db.query({
      type:'find',
      collection:'muscles',
      project:{name:1, _id:0},
      filters : {_id : {$in : ids}}
    })
    return new Promise(resolve => resolve( query ))
  }
}
