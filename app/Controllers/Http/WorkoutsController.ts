// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import RandomWorkout from 'App/Models/RandomWorkout';
import PythonApiHandler from 'App/Service/PythonApiHandler';
import MongoDB from "../../database/databaseHandler";
import {MuscleModel, ExerciseModel} from '../../database/models'
import { Muscle, Exercise } from "../../database/interfaces";

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

      const chest = new MuscleModel({
        name: 'Chest'
      })

      const benchPress = new ExerciseModel({
        name: "Bench press",
        link: "https://en.wikipedia.org/wiki/Bench_press",
        muscles: [
          chest._id
        ]
      })

      const result = await client.query({
        type:'insertOne',
        collection:'muscles',
        data: chest
      })

      response.status(200)
      response.header('Content-type','application/json')
      return {'Message': {result}}
    } catch (error) {
      console.log(error)
      response.status(400)
      response.header('Content-type','application/json')
      return {'Message':'Connecion tested!', error}
    }
  }

  public insertMuscles = async ({response}) => {
    const musclesNames:Array<String> = await this.PythonApi.getMuscles()

    let newMuscles:Array<Muscle> = []
    musclesNames.forEach( name => {
      newMuscles.push(
        new MuscleModel({name})
      )
    })

    const client:MongoDB = new MongoDB()

    const result = await client.query({
      type:'insertMany',
      collection:'muscles',
      data: newMuscles
    })

    response.status(200)
    response.header('Content-type','application/json')
    return {result}
  }

  public insertExercises = ({response}) => {
    const client:MongoDB = new MongoDB()
    client.connect()

    this.PythonApi.getExercises()
      .then( (exercises:Array<Object>) => {
        exercises = exercises.data.map(({name, link, muscles}) => {
          return { name, link, muscles }
        })
        return {client, exercises}
      })
      .then( async ({exercises, client}) => {
        const muscles = await client.query({
          type:'find',
          collection:'muscles',
          select: {roll:1}
        })
        return {muscles, exercises, client}
      })
      .then( ({muscles, exercises, client} ) => {
        const getMusclesIdByName = arrNames => {
          return muscles.filter( muscle => {
            const verify = arrNames.indexOf(muscle.name) > -1
            if(verify) return muscle._id
          })
        }
        const models = exercises.map(exercicio => {
          return new ExerciseModel({
            name: exercicio.name,
            link: exercicio.link,
            muscles : getMusclesIdByName(exercicio.muscles)
          })
        })
        return {client, models}
      })
      .then( async ({client, models}) => {
        const result = await client.query({
          type:'insertMany',
          collection:'exercises',
          data: models
        })

        console.log(result)

        return client
      })
      .then(client => client.disconnect())

    //client.disconnect()
    response.status(200)
    response.header('Content-type','application/json')

    return {'hello':'World'}


  }

  async hello(client, exercises){
    const exerciseModels = await exercises.map(async e => {
      const arrIds = await client.query({
        type : 'find',
        collection: 'muscles',
        filters : {name : {'$in' : e.muscles}},
        select : {roll:1}
      })

      const model = new ExerciseModel({
        name : e.name,
        link : e.link,
        muscles : arrIds
      })
      console.log(model)

      const result = await client.query({
        type:'insertOne',
        collection:'exercises',
        data : model
      })

      console.log(result)

      return new Promise( resolve => resolve(model))
    })

    console.log(exerciseModels)

    return new Promise(resolve => resolve(exerciseModels))
  }
}

export default new WorkoutsController
