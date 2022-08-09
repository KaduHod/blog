import PythonApiHandler from 'App/Service/PythonApiHandler';

class RandomWorkout {
  public exercises:         any;
  public workout:           Array <Object>;
  public possibleExercises: Array <Object>;
  public muscles:           Array <String>;
  public PythonApi:PythonApiHandler = new PythonApiHandler();

  constructor(muscles){
    this.muscles   = muscles
  }

  public setExercises = async () => {
    this.exercises = await this.PythonApi.getExercises()
  }

  public setPossibleExercises = async () => {
    await this.setExercises()
    this.possibleExercises = this.exercises.filter( exercise => {
        const { muscles } = exercise
        return muscles.some( muscle => this.muscles.includes(muscle) )
      }
    )
  }
}

export default RandomWorkout
