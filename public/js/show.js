function show({classList}){
  if(classList.contains('hidden')) classList.remove('hidden')
}

function hide({classList}){
  if(!classList.contains('hidden')) classList.add('hidden')
}
