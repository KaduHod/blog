const Sheet = {
    downloadCSV : ({csvString, type, fileName}) => {
        const blob = new Blob([csvString], { type });
        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href  = url;
        link.setAttribute('download', fileName);
        link.click();
        link.remove();
    },
    downloadXLSX : ({exercises, workoutType, fileName, startCel}) => {
        const rows = exercises.map( ({name, agonistsNames}) => {
            const agonists = agonistsNames.map( ({name}) => name ).join(', ')
            return {name, agonists, 'SETS/REPS' : workoutType}
        })
        console.log(rows)
        const links = exercises.map(({link}) =>  link)
        const worksheet = XLSX.utils.json_to_sheet(rows)
        const keys = Object.keys(worksheet)
        const cells = keys.filter( key => key.match(/A/g))
              cells.pop()
        cells.forEach( (cel, i) => {
            worksheet[cel].l = { Target : links[i]}
        });
        const workbook = XLSX.utils.book_new()
        const headers = [Object.keys(rows[0]).map( header => header.toUpperCase() )];
        XLSX.utils.book_append_sheet(workbook, worksheet,'Workout');
        XLSX.utils.sheet_add_aoa(worksheet, headers, {origin : startCel});
        const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
        worksheet["!cols"] = [ { wch: max_width } ];
        XLSX.writeFile(workbook, fileName);
    }
}


