import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
export default class Pdf {
  data:any[];
  constructor({data}){
    this.data = data;
  }
  async createPdf():Promise<string>{
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    const page = pdfDoc.addPage()
    const { height } = page.getSize()
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })
    return await pdfDoc.saveAsBase64();
  }
}
