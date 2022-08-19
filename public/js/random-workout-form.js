"use strict"
const form = document.getElementById('form-random-workout')
form.addEventListener('submit', evt => {
  evt.preventDefault();
  handleSubmit()
})
const select = document.getElementById('workoutTypeSelect')
      select.addEventListener('change',handleSubmit)
const inputs = [...form.getElementsByTagName('input')]
      inputs.forEach( input => input.addEventListener('change',handleSubmit) )
const urlToGetWorkout = document.getElementById('form-random-workout').action
const tbody = document.getElementById('list-workout')
const table = document.getElementById('table-workout-list')
const gif_container = document.getElementById('gif-container')
const workoutType = {
  'resistence' : 'sets: 4 / reps: >13',
  'hipertrofy' : 'sets: 3 / reps: 6-12',
  'strength': 'sets: 3 / reps: 3-6'
}
const iconDownload = document.getElementById('icon-download')
      iconDownload.addEventListener('click', csv)
var currentWorkout = null;

async function handleSubmit(){
  const data = setRequestData()
  if(!data) return hide(table);
  const workout = await makeRequest(data);
  currentWorkout = workout;
  if(workout.exercises.length){
    show(table);
    mountTable(workout.exercises, workoutType[workout.type]);
    return;
  }
  hide(table);
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

function mountTable(exercises, workoutType){
  let trs = ``;
  exercises.forEach( ({name, agonistsNames, link}, index) => {
    agonistsNames = agonistsNames.map( ({name}) => name );
    trs += `
    <tr>
      <td>${index+1}</td>
      <td>
        <a target="_blank" href='${link}'>${name}</a>
      </td>
      <td>${agonistsNames.join(', ')}</td>
      <td>${workoutType}</td>
    </tr>
    `;
  })
  tbody.innerHTML = trs;
}

function setRequestData(){
  const musclesIds = inputs.filter(({checked}) => !!checked)
                      .map(({value}) => value)
  if(!musclesIds.length) return false
  const {setsPerMuscle, type, reps} = JSON.parse(select.value)
  return {setsPerMuscle, type, reps, musclesIds}
}

function csv(){
  const csvArr = makeArrayToCsvFile(currentWorkout);
  const csvString = makeCsvString(csvArr);
  const fileName = 'workout.csv';
  const type = 'text/csv;charset=utf-8;';
  downloadCsv({csvString, fileName, type})
}

const makeArrayToCsvFile = ({exercises}) => {
  return exercises.map( ({name, link, agonistsNames}) => {
    let agonists = agonistsNames.map( ({name}) => name).join(' ')
    return [name, link, agonists]
  })
}

const makeCsvString = arrCsv => {
  let csvString = '';
  arrCsv.forEach( rowArr => {
    let row = rowArr.join(",");
    row+= '\r\n'
    csvString += row
  })
  return csvString;
}

function downloadCsv({content, fileName, type}) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.click();
}

