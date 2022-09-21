const PDF = {
  async handler(){
    const body = PDF.getBody();
    const {base64} = await PDF.request({body});
    PDF.downloadPdf({base64String:base64});
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
      const response = await fetch('http://localhost:3333/workouts/pdf', config);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error)
      return error
    }
  },
  bufferToBlob({uint8Array, mimeType = 'application/pdf'}){
    //console.log(Object.values(uint8Array))
    return new Blob([uint8Array], {type:mimeType});
  },
  blobToFile({blob, fileName = 'Workout.pdf'}){
    return new File(Object.values(blob), fileName)
  },
  createObjectUrl({blob}){
    return URL.createObjectURL(blob)
  },
  downloadPdf({base64String , fileName = 'Workout.pdf'}){
    a = Object.assign(document.createElement('a'),{
      href: 'data:application/octet-stream;base64,' + base64String,
      target:'_blank',
      style : 'display: none',
      download: fileName
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
  },
  tutorial(base64String){

    // Insert a link that allows the user to download the PDF file
    var link = document.createElement('a');
    link.innerHTML = 'Download PDF file';
    link.download = 'file.pdf';
    link.target = '_blank';
    link.href = 'data:application/octet-stream;base64,' + base64String;
    document.body.appendChild(link);
    link.click()
  }
}
