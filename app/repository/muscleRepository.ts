import db from '../database/databaseHandler'
import { Muscle } from 'App/database/interfaces'

export default class muscleRepository{
  static all = ():Promise<Array<Muscle>> =>{
    const query:Array<Muscle> = db.query({
      type:'find',
      collection:'muscles'
    })
    return new Promise( resolve => resolve( query ))
  }
}
