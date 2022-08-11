import View from '@ioc:Adonis/Core/View'
import { Muscle, Exercise } from "../../database/interfaces";
import { ObjectId } from 'mongodb'
import muscleRepository from '../../repository/muscleRepository'
import exerciseRepository from 'App/repository/exerciseRepository';
import MuscleModel from 'App/Models/Muscle';
class WorkoutsController {
  public form = async ({response}) =>{
    const muscles:Muscle[] = await muscleRepository.all()
    const groupMusclesByBodyPart:Object = MuscleModel.groupMusclesByBodyPart(muscles)
    response.status(200)
    response.header('Content-type','text/html; charset=utf-8')
    return View.render('list-exercises', {muscles, groupMusclesByBodyPart})
  }

  public assembleMusclesForWourkout = async ({request, response}) => {
    const { musculos } = request.body()
    const muscleObjectIds:ObjectId[] = musculos.map( (muscle:String):ObjectId => new ObjectId(muscle) )
    const exercicios:Exercise[] = await exerciseRepository.aggregateById(muscleObjectIds)
    response.status(200)
    response.header('Content-type','application/json')
    return {exercicios}
  }
}

export default new WorkoutsController
