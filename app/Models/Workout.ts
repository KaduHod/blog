import { ObjectId } from 'mongodb';
import { Exercise, Muscle, Workout } from 'App/Models/interfaces';
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

    const workOutByMuscles = await this.workoutByMuscle()
    const workoutsRicycled  = this.handleRecycle(workOutByMuscles)
    let  workoutsWithRightAmountOfExercises = this.handleQtdExercises(workoutsRicycled)
    const musclesNames = await muscleRepository.getMuscleNames(this.musclesIdList);
    workoutsWithRightAmountOfExercises = workoutsWithRightAmountOfExercises.map( workout => {
      const result:any = musclesNames.find( ({_id}) => _id.toString() === workout.muscleId.toString())
      if(!result) return
      result.exercises = workout.exercises
      result
      return result
    });

    this.mountedWorkout = workoutsWithRightAmountOfExercises
  }

  public handleQtdExercises = (workouts) => {
    return workouts.map( workout => {
      const {exercises} = workout
      if(exercises.length > this.exercisesPerMuscle){
        const copy = exercises
        while(copy.length > this.exercisesPerMuscle){
          const rand = Math.floor(Math.random() * copy.length - 1)
          copy.splice(rand,1)
        }
        workout.exercises = copy
      }
      return workout
    })
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

  public handleRecycle = (workoutByMuscles):any => {
    const {donors, toDonate, hasMininalCountOfExercises}:any = workoutByMuscles.reduce((acc, curr) => {
      const {exercises} = curr;
      if(exercises.length  <  this.exercisesPerMuscle) acc.toDonate.push(curr);
      if(exercises.length  >  this.exercisesPerMuscle) acc.donors.push(curr);
      if(exercises.length === this.exercisesPerMuscle) acc.hasMininalCountOfExercises.push(curr);
      return acc;
    }, {donors:[], hasMininalCountOfExercises: [], toDonate: []})

    const workoutsAfterDonation:any = this.manageDonation({donors, toDonate})
    hasMininalCountOfExercises.forEach( workout =>  workoutsAfterDonation.push(workout))
    return workoutsAfterDonation
  }

  public manageDonation = ({donors , toDonate}) => {
    const idsToDonate = toDonate.map( ({muscleId}) => muscleId);
    const objToDonate = toDonate.reduce( (acc,{muscleId}) =>{
      acc[muscleId] = [];
      return acc;
    },{})

    //DONATE
    donors.forEach( donor => {//iterando doadores
      const { exercises } = donor;
      let exerciseCopy = exercises;
      for (let indexExercise = 0; indexExercise < exerciseCopy.length; indexExercise++ ){//iterando sobre exercicios
        if(exerciseCopy.length == this.exercisesPerMuscle){
          break;
        }
        const exercise  = exerciseCopy[indexExercise];
        const  {agonists}  = exercise;
        for (let indexExerciseIds = 0; indexExerciseIds < idsToDonate.length; indexExerciseIds++){//iterando sobre musculos que precisam de doacao
          const id = new ObjectId(idsToDonate[indexExerciseIds]);
          if(objToDonate[ id.toString() ].length == this.exercisesPerMuscle -1) break; // SE O MUSCULO QUE PRECISA DE DOAÇÃO JA TEM O NUMERO NECESSARIO DE EXERCICIOS PARA O TREINO

          const hasTheMuscleToDonate = agonists.filter( _id => _id.toString() === id.toString());
          if(!hasTheMuscleToDonate.length) continue;//SE O EXERCICIO RECRUTA O MUSCULO A RECEBER DOAÇAO

          const exerciseThatWillBeDonated = exerciseCopy.splice(indexExercise,1)[0]
          objToDonate[ id.toString() ].push(exerciseThatWillBeDonated);
        }
      }
      donor.exercises = exerciseCopy
    });

    for( let i = 0; i < toDonate.length; i++ ){
      const muscle = toDonate[ i ];
      const { exercises, muscleId } = muscle;
      const exercisesDonated        = objToDonate[ muscleId.toString() ];
      const updatedListOfExercises  = exercises.concat(exercisesDonated);
      toDonate[i].exercises         = updatedListOfExercises;
    }

    const workoutsAfterDonation = [];
    toDonate.forEach( (workout):number => workoutsAfterDonation.push(workout));
    donors.forEach(   (workout):number => workoutsAfterDonation.push(workout));
    return workoutsAfterDonation;
  }

  public getExercises():Exercise[]{
    return this.exercisesByAgonists;
  }

  public getMountedWorkout():Workout{
    return this.mountedWorkout;
  }
}




