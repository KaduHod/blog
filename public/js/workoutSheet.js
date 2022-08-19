class WorkoutSheet {
  constructor({exercises, fileName, workoutSet}){
    this.exercises = exercises;
    this.fileName = fileName;
    this.workoutSet = workoutSet;
    this.type = 'text/csv;charset=utf-8;';
    this.arrCsv;
    this.csvString;
  }
  formatArrToCsvArrayType = () => {
    const [_id, name, link, muscles, agonists, stabilizers, synergists, agonistsNames] = Object.keys(this.exercises[0])
    const resultArray = this.exercises.map( ({name, link, agonistsNames}) => {
      const agonists = agonistsNames.map( ({name}) => name ).join(' ')
      return [ name, link, agonists];
    })
    resultArray.unshift([name.toUpperCase(), link.toUpperCase(), agonists.toUpperCase(),'SETS']);
    this.arrCsv = resultArray;
    return this;
  }
  csvArrToString = () => {
    this.csvString = this.arrCsv.reduce( (stringCsv, rowArr, index) => {
      let row = rowArr.join(',');
      if(index > 0) row += ',' + this.workoutSet;
      row += `\r\n`;
      stringCsv += row;
      return stringCsv;
    },'')
    return this;
  }
  download = () => {
    const blob = new Blob([this.csvString], { type:this.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', this.fileName);
    link.click();
    return this;
  }

  downloadCsvFile = () => {
    this.formatArrToCsvArrayType()
        .csvArrToString()
        .download();
    return this;
  }

}
