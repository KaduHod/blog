// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import RandomWorkout from 'App/Models/RandomWorkout';
import db from "../../database/databaseHandler";
import {MuscleModel, ExerciseModel} from '../../database/models'
import { Muscle, Exercise } from "../../database/interfaces";
import {ObjectId} from 'mongodb'

class WorkoutsController {
  public muscles: Array <Object>;

  constructor(){
  }

  public form = async ({response})=>{
    this.muscles = await db.query({
      type:'find',
      collection:'muscles'
    })

    response.status(200)
    response.header('Content-type','text/html; charset=utf-8')
    return View.render('welcome', {muscles : this.muscles, musclesJSON: JSON.stringify(this.muscles)})
  }

  public assembleMusclesForWourkout = async ({request, response}) => {
    const { musculos } = request.body()
    const muscleObjectIds: Array <ObjectId> = musculos.map( muscle => new ObjectId(muscle) )
    const randomWorkout = new RandomWorkout(muscleObjectIds)
    const exercicios:Array<Exercise> = await randomWorkout.getPossibleExercises()
    response.status(200)
    response.header('Content-type','application/json')
    return {exercicios}
  }
}

export default new WorkoutsController
