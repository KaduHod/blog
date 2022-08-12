import db from '../database/databaseHandler'
import { Muscle } from 'App/Models/interfaces'

export default class muscleRepository{
  static all = ():Promise<Muscle[]> =>{
    const query:Muscle[] = db.query({
      type:'find',
      collection:'muscles'
    })
    return new Promise( resolve => resolve( query ))
  }
}
