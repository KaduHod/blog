export function filterUniqueExercises(qtd:number=3, exercises:[]){
  console.log('\t\t OUTRO \n')
  const {length} = exercises;
  let cont = length
  const uniqueExercises = []
  while(uniqueExercises.length <= qtd && cont >= 0){

    let rand:number = Math.floor(Math.random() * length -1)
    let exercise = exercises[rand]
    let verifyIfHasBeenAdded = uniqueExercises.indexOf(exercise) > -1

    if(!verifyIfHasBeenAdded && uniqueExercises.length !== qtd && !!exercise){
      uniqueExercises.push(exercise)
      exercises.splice(rand,1)
    }
    cont--
  }
  return uniqueExercises;
}
