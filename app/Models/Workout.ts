import { ObjectId } from 'mongodb';
import { Exercise, Muscle, Workout } from 'App/Models/interfaces';
import { filterUniqueExercises } from 'App/helpers/uniqueValues'
import muscleRepository from 'App/repository/muscleRepository';
import exerciseRepository from 'App/repository/exerciseRepository';
import db from 'App/database/databaseHandler';

export default class WorkoutModel implements Workout {
  musclesIdList:ObjectId[];
  exercisesByAgonists:Exercise[];
  mountedWorkout:Workout;
  setsPerMuscle:number;
  exercisesPerMuscle:number;
  type:String;
  reps:String;


  constructor({setsPerMuscle, musclesIdList, type, reps}){
    this.setsPerMuscle = setsPerMuscle;
    this.exercisesPerMuscle = this.setsPerMuscle/3
    this.musclesIdList = musclesIdList;
    this.reps = reps;
    this.type = type;
  }

  public getExercisesByAgonists = async ():Promise<any> => {
    this.exercisesByAgonists = await exerciseRepository.aggregateByAgonist(this.musclesIdList);
  }

  public mountWorkout = async ():Promise<void> => {
    const musclesNames:string[] = await muscleRepository.getMuscleNames(this.musclesIdList)
                                        .then( queryWithNames => queryWithNames.map( ({name}) => name ));
    const workOutByMuscles = await this.workoutByMuscle()
    const workoutRicycled  = this.setNumExercisesAndRecycle(workOutByMuscles)
   // console.log(workOutByMuscles)
    //const workout
    this.mountedWorkout = workoutRicycled
    //return workoutRicycled
  }

  public workoutByMuscle = async ():Promise<any[]> => {
    let idsAlreadyFinded:ObjectId[] = []
    const workoutByMuscle:any[] = []

    for await ( const id of this.musclesIdList ){
      const exercises:Exercise[] = await db.query({
        type:'find',
        collection:'exercises',
        filters : { agonists : id, _id : {$nin : idsAlreadyFinded} },
      })

      exercises.forEach( (exercise:any) => {
        idsAlreadyFinded.push(exercise._id)
      })

      workoutByMuscle.push({
        muscleId : id,
        exercises
      })
    }

    return workoutByMuscle;
  }

  public setNumExercisesAndRecycle = (workoutByMuscles) => {
    
    const couldRicycle = workoutByMuscles.filter( ({exercises}) => exercises.length < this.exercisesPerMuscle)
    const canDonate = workoutByMuscles.filter( ({exercises}) => exercises.length > this.exercisesPerMuscle)
    const hasMinimalExercises = workoutByMuscles.filter( ({exercises}) => exercises.length === this.exercisesPerMuscle)
    
    if(!couldRicycle) return workoutByMuscles
    const recycled = this.ricycle(canDonate)
    //console.log({workoutByMuscles})

    return recycled//tirar isso amanha
  }

  public ricycle = (canDonate):any[] => {
    return canDonate.map( ({muscleId, exercises}) => {
      const exercisesRicycled = filterUniqueExercises( this.exercisesPerMuscle, exercises)
      return {
        muscleId,
        exercises : exercisesRicycled,
        ricycle: exercises.filter( (e:any) => exercisesRicycled.indexOf(e) === -1)
      }
    })
  }

  public getExercises():Exercise[]{
    return this.exercisesByAgonists;
  }

  public getMountedWorkout():Workout{
    return this.mountedWorkout;
  }
}




