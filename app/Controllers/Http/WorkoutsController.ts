"use strict"
import View from '@ioc:Adonis/Core/View'
import { Muscle, Exercise } from "App/Models/interfaces";
import { ObjectId } from 'mongodb'
import muscleRepository from 'App/repository/muscleRepository'
import exerciseRepository from 'App/repository/exerciseRepository';
import MuscleModel from 'App/Models/Muscle';
import WorkoutModel from 'App/Models/Workout';
import PdfService from 'App/Services/Pdf';

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
    const muscleObjectIds:ObjectId[] = musclesIds.map( (id:string):ObjectId => new ObjectId(id))
    const exercicios :Exercise[] = await exerciseRepository.aggregateByAgonist(muscleObjectIds)
    response.status(200)
    response.header('Content-type','application/json')
    return {exercicios}
  }

  public randomWorkout = async ({response}) => {
    const muscles:Muscle[] = await muscleRepository.all()
    const groupMusclesByBodyPart:object = MuscleModel.groupByBodyPart(muscles)
    response.status(200)
    response.header('Content-type','text/html; charset=utf-8')
    return View.render('random-workout-form', {muscles, groupMusclesByBodyPart})
  }

  public assembleRandomWorkout = async ({request,response}) => {
    const {setsPerMuscle, type, reps, musclesIds} = request.body()
    const musclesIdList = musclesIds.map( (id:string):ObjectId => new ObjectId(id))
    const workout:WorkoutModel = new WorkoutModel({setsPerMuscle,type,reps, musclesIdList})
    await workout.getExercisesByAgonists()
    await workout.mountWorkout()
    response.status(200)
    response.header('Content-type','application/json')
    return {workout : workout.getMountedWorkout()}
  }

  public pdf = async ({request, response}) => {
    const {data} = request.body();
    const pdfService = new PdfService({data});
    const pdfBytes = await pdfService.createPdf();
    console.log(pdfBytes)
    response.status(200)
    response.header('Content-type','application/json')
    return {data:pdfBytes};
  }
}
export default new WorkoutsController
