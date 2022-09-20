const PDF = {
  async handler(){
    const body = PDF.getBody();
    const data = await PDF.request({body});
    console.log(data)
  },
  getBody(){
    const {exercises, type} = currentWorkout;
    const setReps = workoutType[type]
    return {
      data : exercises.map( ({name, agonistsNames, link}) => {
        return {
          name,
          link,
          agonists : agonistsNames.map( ({name}) => name ).join(', '),
          setReps
        }
      })
    }
  },
  async request({body}){
    try {
      const config = {
        method : 'POST',
        body: JSON.stringify(body) ,
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
      }

      console.log(config)
      const response = await fetch('http://localhost:3333/workouts/pdf', config);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
