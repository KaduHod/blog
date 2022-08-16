"use strict"

const form = document.getElementById('form-random-workout')
      form.addEventListener('submit', handleSubmit)
const select = document.getElementById('workoutType')
const inputs = [...form.getElementsByTagName('input')]
const urlToGetWorkout = document.getElementById('form-random-workout').action

function handleSubmit(event){
  event.preventDefault();
  const data = setRequestData(event)
  if(!data) return
  console.log('aqui')
  makeRequest(data)
  console.log('aqui2')
}

async function makeRequest({setsPerMuscle, musclesIds, reps, type}){
  const response = await fetch(urlToGetWorkout, {
    method:'POST',
    body: JSON.stringify({setsPerMuscle, musclesIds, reps, type}),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  const {workout} = await response.json()
  console.log({workout})
}


function filterUniqueValues(qtd=3, array){
  const returnArr = [];
  for (let i = 0; i <= qtd; i++){
    let rand = Math.floor(Math.random() * array.length)
    const choosedExercise = array[rand]
    if(returnArr.indexOf(choosedExercise) > -1) continue
    returnArr.push(choosedExercise)
  }
  return returnArr
}

function setRequestData({target}){
  const musclesIds = [...target.getElementsByTagName('input')]
                              .filter(({checked}) => !!checked)
                              .map(({value}) => value)
  if(!musclesIds.length) return false
  const {setsPerMuscle, type, reps} = JSON.parse(select.value)
  return {setsPerMuscle, type, reps, musclesIds}
}


