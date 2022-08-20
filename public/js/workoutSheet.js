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
    const resultArray = this.exercises.map( ({name, link, agonistsNames}, index) => {
      const agonists = agonistsNames.map( ({name}) => name ).join(' ')
      return [index+1 ,name, link, agonists];
    })
    resultArray.unshift(["Nº" ,'EXERCISE', link.toUpperCase(), agonists.toUpperCase(),'SETS']);
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

  file = () => {
    this.formatArrToCsvArrayType()
        .csvArrToString()
    const {csvString, type} = this;
    return {csvString, type};
  }

}
