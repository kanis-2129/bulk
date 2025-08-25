const fileInput = document.getElementById("fileInput")
// fileinput work agudhanu check panne console
fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0]

    const reader = new FileReader()

    reader.onload = function (event) {
        const data = event.target.result
        // console.log(data)
        //  console.log(event) //it's store data
        const workbook = XLSX.read(data, { type: "binary" })
        // console.log(workbook)
        //  demo.js:14 Uncaught ReferenceError: xlsx is not defined
        // at reader.onload (demo.js:14:25) some lib are secure so use live server

        const sheetName = workbook.SheetNames[0]
        // const sheetName = workbook.sheetNames[0]
        // demo.js:16 Uncaught TypeError: Cannot read properties of undefined (reading '0')
        // at reader.onload (demo.js:16:46)
        const worksheet = workbook.Sheets[sheetName]
        // console.log(worksheet)
        const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
        console.log(emailList)
    }

    reader.readAsBinaryString(file)            //readAsBinaryString it's use for Excel 
})
