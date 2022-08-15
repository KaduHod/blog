import View from '@ioc:Adonis/Core/View'
import { Muscle, Exercise } from "App/Models/interfaces";
import { ObjectId } from 'mongodb'
import muscleRepository from 'App/repository/muscleRepository'
import exerciseRepository from 'App/repository/exerciseRepository';
import MuscleModel from 'App/Models/Muscle';
import WorkoutModel from 'App/Models/Workout';

class WorkoutsController {
  public form = async ({response}) =>{
    const muscles:Muscle[] = await muscleRepository.all()
    const groupMusclesByBodyPart:Object = MuscleModel.groupByBodyPart(muscles)
    response.status(200)
    response.header('Content-type','text/html; charset=utf-8')
    return View.render('list-exercises', {muscles, groupMusclesByBodyPart})
  }

  public assembleMusclesFormWourkout = async ({request, response}) => {
    const { musclesIds } = request.body()
    const muscleObjectIds:ObjectId[] = musclesIds.map( (id:String):ObjectId => new ObjectId(id))
    const exercicios :Exercise[] = await exerciseRepository.aggregateByAgonist(muscleObjectIds)
    response.status(200)
    response.header('Content-type','application/json')
    return {exercicios}
  }

  public assembleRandomWorkout = async ({request,response}) => {
    const {exercisesPerMuscle, musclesList} = request.body()
    const musclesIdList = musclesList.map( (id:String):ObjectId => new ObjectId(id))
    const workout = new WorkoutModel({exercisesPerMuscle, musclesIdList})
    await workout.setExercisesByMusclesId()
    response.status(200)
    response.header('Content-type','application/json')
    return {workout : workout.getExercises()}
  }
}
export default new WorkoutsController
