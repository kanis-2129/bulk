import { useState } from "react";
import axios from "axios"
import * as XLSX from "xlsx"

function App() {
  const [msg, setMsg] = useState("")
  const [status, setStatus] = useState(false)
  const [emailList, setEmailList] = useState("")

  function handleMsg(evt) {
    setMsg(evt.target.value)
  }



  function handleFile(event) {
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
      const totalEmailList = emailList.map(function (item, index) {
        return (item.A)
      })

      console.log(totalEmailList)
      setEmailList(totalEmailList)

    }

    reader.readAsBinaryString(file)

  }

  function send() {
    setStatus(true)
    axios.post("http://localhost:5000/sendmail", { msg: msg, emailList: emailList })
    

      .then(function (data) {
        if (data.data === true) {
         
          alert("Email send Successfully")
          setStatus(false)
        }

        else {
          alert("Failed")
        }
      })
      

  }

  return (
    <div>
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-2 py-2">Bulk mail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className=" font-serif px-2 py-2">
          We can help your business with sending multiple emails at once</h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="text-xl font-medium px-2 py-2">Drag and Drop</h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center px-10 py-5">

        <textarea onChange={handleMsg} value={msg} className=" w-[80%] h-36 outline-none border border-black rounded-md px-2"
          placeholder="Enter the Email text"></textarea>
        <div  >
          <input onChange={handleFile} type="file" className="border-2 border-dashed px-4 py-4 mt-3 mb-3" />
        </div>

        <p>Total Emails in the file: {emailList.length}</p>

        <button onClick={send} className="bg-blue-950 text-white rounded-lg py-2 px-2 mt-3 mb-3">{status ? "Sending.." : "send"}</button>
      </div>


    </div>

  )
}

export default App;
