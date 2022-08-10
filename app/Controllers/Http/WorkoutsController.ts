// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import RandomWorkout from 'App/Models/RandomWorkout';
import PythonApiHandler from 'App/Service/PythonApiHandler';
import MongoDB from "../../database/databaseHandler";
import models from '../../database/models'

class WorkoutsController {
  public muscles:   Array <Object>;
  public PythonApi:PythonApiHandler = new PythonApiHandler();

  constructor(){
    this.setMuscles()
  }

  public setMuscles = async () => {
    this.muscles = await this.PythonApi.getMuscles()
  }

  public form = async ({response})=>{
    await this.setMuscles()
    response.status(200)
    response.header('Content-type','text/html; charset=utf-8')
    return View.render('welcome', {muscles : this.muscles})
  }

  public assembleMusclesForWourkout = async ({request, response}) => {
    const { musculos } = request.body()
    const randomWorkout = new RandomWorkout(musculos)
          await randomWorkout.setPossibleExercises()
    response.status(200)
    response.header('Content-type','application/json')
    return { 'exercicios' : randomWorkout.possibleExercises}
  }

  public main = async ({response}) => {
    try {
      const client:MongoDB = new MongoDB()

      const chest = new models.MuscleModel({
        name: 'Chest'
      })

      const benchPress = new models.ExerciseModel({
        name: "Bench press",
        link: "https://en.wikipedia.org/wiki/Bench_press",
        muscles:[
          chest._id
        ]
      })

      const result = await client.query({
        type:'insert',
        collection:'muscles',
        data: chest
      })

      response.status(200)
      response.header('Content-type','application/json')
      return {'Message': {benchPress ,chest}}
    } catch (error) {
      console.log(error)
      response.status(200)
      response.header('Content-type','application/json')
      return {'Message':'Connecion tested!', error}
    }
  }

}

export default new WorkoutsController
