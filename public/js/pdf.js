const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

const PDF = {
  handler({data, workoutType}){
    const headers = PDF.setHeaders();
    const values = PDF.setValues({data, workoutType});
    const doc = PDF.createDocument({headers, values});
    PDF.download({doc})
    console.log({data})
  },
  setHeaders(){
    return ['Name', 'Agonists', 'Sets/Reps']
  },
  setValues({data, workoutType}){
    return data.map( ({name, agonistsNames, link}) => {
      return [
        {text: name, link, color:'blue'},
        agonistsNames.map( ({name}) => name).join(', '),
        workoutType
      ]
    })
  },
  createDocument({
    headerRows = 1, widths = ['33%', '33%', '33%'] ,
    layout ='lightHorizontalLines',
    headers, values,
  }){
    return {
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60] ,
      header:[
        {text:'Workout', style: PDF.getStyles('header')  },
      ],
      content : [
        {
          layout,
          table: {
            headerRows,
            widths,
            body: [
              headers,
              ...values
            ]
          }
        }
      ],
      footer:[
        {text:'pagina 1', style: PDF.getStyles('footer')},
      ],

    }
  },
  download({doc}){
    const newWindow = window.open('','_blank')
    return pdfMake.createPdf(doc).open({}, newWindow);
  },
  getStyles(name = 'default'){
    const styles = {
      header : {
        fontSize: 25,
        alignment: 'center'
      },
      default : {

      },
      footer : {
        italics: true,
        alignment: 'center'
      }
    }
    return styles[name]
  }

};
