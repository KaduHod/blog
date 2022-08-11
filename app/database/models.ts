import { Schema, model } from "mongoose";
import { Muscle, Exercise } from "./interfaces";

const muscleSchema = new Schema <Muscle> ({
  name: { type: String, required: true },
  bodyPart: {required: true}
})

const exerciseSchema = new Schema <Exercise> ({
  name:    { type: String, required: true  },
  link:    { type: String, required: false },
  muscles: [{
    type: Schema.Types.ObjectId,
    ref : 'Muscle'
  }]
})

export const  MuscleModel  = model<Muscle>('Muscle',     muscleSchema)
export const ExerciseModel = model<Exercise>('Exercise', exerciseSchema)


