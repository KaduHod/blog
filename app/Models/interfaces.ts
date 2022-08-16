import { ObjectId } from "mongodb";

export interface Muscle{
  name:string;
  bodyPart:string[];
}
export interface Exercise{
  link:        string;
  name:        string;
  muscles:     ObjectId[] | Muscle[];
  agonists:    ObjectId[] | Muscle[];
  synergists:  ObjectId[] | Muscle[];
  stabilizers: ObjectId[] | Muscle[];
}

export interface Workout{
  musclesIdList:ObjectId[];
  exercisesByAgonists:Exercise[];
  mountedWorkout:Object;
  setsPerMuscle:number;
  exercisesPerMuscle:number;
  type:String;
  reps:String;
}

