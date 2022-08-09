// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import RandomWorkout from 'App/Models/RandomWorkout';
import PythonApiHandler from 'App/Service/PythonApiHandler';

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
}

export default new WorkoutsController
