import axios from 'axios'
export default class PythonApiHandler{

  endpoint:Object = {
    muscles : 'http://127.0.0.1:9999/muscles',
    exercises : 'http://127.0.0.1:9999/workouts/wiki'
  }

  public getMuscles = async () => {
    const {data} = await axios.get(this.endpoint.muscles)
    return data
  }

  public getExercises = async () => {
    const {data} = await axios.get(this.endpoint.exercises)
    return data
  }
}
