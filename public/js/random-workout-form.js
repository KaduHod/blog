"use strict"
const form = document.getElementById('form-random-workout')
form.addEventListener('submit', handleSubmit)
const select = document.getElementById('workoutType')
const inputs = [...form.getElementsByTagName('input')]
const urlToGetWorkout = document.getElementById('form-random-workout').action
const tbody = document.getElementById('list-workout')
const table = document.getElementById('table-workout-list')
const gif_container = document.getElementById('gif-container')

async function handleSubmit(event){
  event.preventDefault();
  const data = setRequestData(event)
  if(!data) return
  const workout = await makeRequest(data)
  const exercises = getExercises(workout)
  show(gif_container)
  if(!!exercises.length){
    show(table)
    mountList(exercises)
    hide(gif_container)
    return
  }
  hide(gif_container)
  hide(table)
}

async function makeRequest( {setsPerMuscle, musclesIds, reps, type} ){
  const response = await fetch(urlToGetWorkout, {
    method:'POST',
    body: JSON.stringify( {setsPerMuscle, musclesIds, reps, type} ),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  const {workout} = await response.json()
  return workout
}

function getExercises(workouts){
  let exercisesArr = []
  workouts.forEach( ({exercises}) => {
    exercisesArr = exercisesArr.concat(exercises)
  });
  return exercisesArr
}

function mountList(exercises){
  let trs = ``
  exercises.forEach( ({name, agonistsNames, link}, index) => {
    agonistsNames = agonistsNames.map( ({name}) => name )
    trs += `
    <tr>
      <td>${index+1}</td>
      <td><a target="_blank" href='${link}'>${name}</a></td>
      <td>${agonistsNames.join(', ')}</td>
    </tr>
    `
  })
  tbody.innerHTML = trs
}

function setRequestData({target}){
  const musclesIds = [...target.getElementsByTagName('input')]
                      .filter(({checked}) => !!checked)
                      .map(({value}) => value)
  if(!musclesIds.length) return false
  const {setsPerMuscle, type, reps} = JSON.parse(select.value)
  return {setsPerMuscle, type, reps, musclesIds}
}


