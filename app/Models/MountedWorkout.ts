import { Exercise, MountedWorkout, WorkoutMuscle } from "./interfaces";

export default class MounteWorkoutModel implements MountedWorkout{
  public exercisesByMuscle:WorkoutMuscle[];
  public exercises:Exercise[]
  public setsPerMuscle:number;
  public type:string;
  public reps:string;


  constructor(workout:WorkoutMuscle[], type:string, reps:string, setsPerMuscle:number){
    this.exercisesByMuscle = workout;
    this.type = type;
    this.reps = reps;
    this.setsPerMuscle = setsPerMuscle;
    this.setExercises()
  }

  public setExercises = ():void =>{
    let exercisesArr = []
    this.exercisesByMuscle.forEach( ({exercises}:any):void => {
      exercisesArr = exercisesArr.concat(exercises)
    });
    this.exercises = exercisesArr
  }


}
