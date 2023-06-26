import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import {FaFileAudio} from 'react-icons/fa'

const InputFile = (props: any) => {
  
  const [infor, setInfor] = useState<File>();

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    props.setFile(acceptedFiles[0])
    setInfor(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className='text-center input-wrap mx-auto' style={{opacity: `${isDragActive ? 0.5 : 1}`}}>
      <label className='fs-3' htmlFor={props.id}>{props.label}</label>
      <div {...getRootProps()} className={`input-file d-flex jusitify-content-center align-items-center p-4 flex-column text-center ${infor ? 'border-success' : 'border-warning'}`}>
        <input className='d-none' id={props.id} {...getInputProps()} />
        {
          infor ?
            <p className='text-success'>{infor ? infor.name: null} <br /> <FaFileAudio size={100} className='text-success'/></p> :
            <p>Drag and drop file here</p>
        }
      </div>
    </div>
  )

}

export default InputFile
