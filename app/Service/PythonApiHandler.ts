import axios from 'axios'
export default class PythonApiHandler{

  endpoint:Object = {
    muscles : 'http://127.0.0.1:9999/muscles',
    exercises : 'http://127.0.0.1:9999/workouts/wiki'
  }

  public getMuscles = () => {
    return new Promise( (resolve) => resolve(axios.get(this.endpoint.muscles)))
  }

  public getExercises = () => {
    return new Promise( (resolve) => resolve(axios.get(this.endpoint.exercises)))
  }
}
