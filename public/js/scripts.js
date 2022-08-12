const table = document.getElementById('table-workout-list')
const joinMusclesArr = arr => arr.map(e => e.name).join(', ')
const gif_container = document.getElementById('gif-container')
const checkBoxs = [...document.getElementsByName('muscle')]
      checkBoxs.forEach( el => el.addEventListener('change', requestTrainning) )

function requestTrainning(event){
  show(gif_container)
  const musclesIds = checkBoxs.filter( check => check.checked ).map( ({value}) => value )
  fetch('http://localhost:3333/workouts/assemble', {
    method: 'POST',
    body: JSON.stringify({musclesIds}),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(res => res.json())
  .then( ({exercicios}) => {
    if(exercicios.length) {
      show(table);
      hide(gif_container)
      mountList(exercicios);
      return;
    }
    hide(gif_container);
    hide(table);
  })
}

function show({classList}){
  if(classList.contains('hidden')) classList.remove('hidden')
}

function hide({classList}){
  if(!classList.contains('hidden')) classList.add('hidden')
}

function mountList(exercicios){
  const tbody = document.getElementById('list')
  tbody.innerHTML = ''
  exercicios.forEach( ({link, name, muscles}, i) => {
    let tr = `
    <tr>
      <td>${i+1}</td>
      <td>
        <a target="_blank" href="${link}">
        ${name}
        </a>
      </td>
      <td>
        ${joinMusclesArr(muscles)}
      </td>
    </tr>`
    tbody.innerHTML += tr
  });
}
