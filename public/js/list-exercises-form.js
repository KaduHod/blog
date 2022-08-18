const table = document.getElementById('table-workout-list')
const tbody = document.getElementById('list-muscles')
const aseembleWorkout = document.getElementById('form-muscles-list').action
const joinMusclesArr = arr => {
  if(!arr) return
  return arr.map(e => e.name).join(', ')
}
const gif_container = document.getElementById('gif-container')
const checkBoxs = [...document.getElementsByName('muscle')]
      checkBoxs.forEach( el => el.addEventListener('change', requestTrainning) )

function requestTrainning({target}){
  show(gif_container)
  const musclesIds = checkBoxs.filter( check => check.checked ).map( ({value}) => value )
  fetch( aseembleWorkout, {
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


function mountList(exercicios){
  tbody.innerHTML = ''
  exercicios.forEach( ({link, name, agonists, synergists, stabilizers}, i) => {
    let tr = `
    <tr>
      <td>${i+1}</td>
      <td>
        <a target="_blank" href="${link}">
        ${name}
        </a>
      </td>
      <td>
        ${joinMusclesArr(agonists)}
      </td>
      <td>
        ${joinMusclesArr(synergists)}
      </td>
      <td>
        ${joinMusclesArr(stabilizers)}
      </td>
    </tr>`
    tbody.innerHTML += tr
  });
}
