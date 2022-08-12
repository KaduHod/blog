const table = document.getElementById('table-workout-list')
const joinMusclesArr = arr => arr.map(e => e.name).join(', ')
const gif_container = document.getElementById('gif-container')
const checkBoxs = [...document.getElementsByName('muscle')]
      checkBoxs.forEach( el => el.addEventListener('change', requestTrainning) )

function requestTrainning(event){
  show(gif_container)
  const muscles = checkBoxs.filter( check => check.checked ).map( field => field.value )
  fetch('http://localhost:3333/workouts/assemble', {
    method: 'POST',
    body: JSON.stringify({musculos : muscles}),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(res => res.json())
  .then( ({exercicios}) => {
      if(exercicios.length){
        show(table)
        return mountList({exercicios})
      }
      hide(gif_container)
      hide(table)
    })
}

function show(el){
  const {classList} = el
  if(classList.contains('hidden')) el.classList.remove('hidden')
}

function hide(el){
  const {classList} = el
  if(!classList.contains('hidden')) el.classList.add('hidden')
}

function mountList({exercicios}){
  const tbody = document.getElementById('list')
  tbody.innerHTML = ''
  exercicios.forEach( (exercise, i) => {
    let tr = `
    <tr>
      <td>${i+1}</td>
      <td>
        <a target="_blank" href="${exercise.link}">
        ${exercise.name}
        </a>
      </td>
      <td>
        ${joinMusclesArr(exercise.muscles)}
      </td>
    </tr>`
    tbody.innerHTML += tr
  });
}
