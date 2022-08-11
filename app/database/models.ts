import { Schema, model } from "mongoose";
import { Muscle, Exercise } from "./interfaces";

const muscleSchema = new Schema <Muscle> ({
  name: { type: String, required: true }
})

const exerciseSchema = new Schema <Exercise> ({
  name:    { type: String, required: true  },
  link:    { type: String, required: false },
  muscles: [{
    type: Schema.Types.ObjectId,
    ref : 'Muscle'
  }]
})

const  MuscleModel  = model<Muscle>('Muscle',     muscleSchema)
const ExerciseModel = model<Exercise>('Exercise', exerciseSchema)

export {MuscleModel, ExerciseModel}
