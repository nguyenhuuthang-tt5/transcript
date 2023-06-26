import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import InputFile from "./components/InputFile";

function App() {
  const [file, setFile] = useState<string | Blob>();
  const [result, setResult] = useState<any>();


  useEffect(()=>{
    if (result) {
      if (result.code == 200) {

      }
      else{
  
      }
    }
  }, [result, setResult]);

  const handleSubmit = useCallback(async ()=>{
    if (file) {
      var formData = new FormData();
      formData.append("audioFile", file);
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
        }});
        const id = res.data.id;
        
        let final;

        let time = setInterval( async ()=> {
          final = await axios.get(`http://127.0.0.1:8000/api/getjson/?id=${id}`)
          if (final.data.code != 409) {
            clearInterval(time);
            console.log(final.data);
            setResult(final)
          }
          else {
            console.log(final.data);
          }
        }, 2000)
    
        console.log('result:', result);
        
      } 
      catch (error: any) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    }
  }, [result, setResult, file, setFile])
  return (
    <div className="App">
      <InputFile file={file} setFile={setFile}/>
      {file ? <button onClick={handleSubmit}>Submit</button> : null}
      <p>process: </p>
    </div>
  );
}

export default App;
