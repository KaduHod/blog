document.getElementById('btn').addEventListener('click', requestTrainning)
const joinMusclesArr = arr => arr.map(e => e.name).join(', ')
function requestTrainning(event){
  const checkBoxs = [...document.getElementsByName('muscle')]
  const muscles = checkBoxs.filter( check => check.checked ).map( field => field.value )
  axios.post('http://localhost:3333/workouts/assemble', { musculos : muscles })
      .then( ({data}) => mountList(data))
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
