import React, { useState } from 'react';
import handleUploadData from '../apicall';
import styles from './mainframe.module.css'; 
import { FiUpload } from 'react-icons/fi';

export default function MainFrame() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('Upload a .xlsx or .xls file here');
  const [showIcon,setShowIcon]=useState(true);
  const handleChange = (event) => {
    const fileName = (event.target.files.item(0).name);
    const fileType = (event.target.files.item(0).type);

  if(fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        setMessage("Not Valid!")
        setFile(null);
    }else{
        setMessage(fileName);
        setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUploadData(file)
        .then((data) => {
            if(data.success){
                setFile(null);
                setMessage(data.message);
                 setShowIcon(false);
            }
        });
  };

  return (
    <div className={styles.big}>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.infoBox}>
        <label htmlFor="fileInput">
       {showIcon  &&   <FiUpload className={styles.icon} />}
       {!showIcon && <h2>Thank You</h2>}
          
          <p className={styles.message}>{message}</p>
        </label>
      </div>
      <input
        id="fileInput"
        className={styles.uploadArea}
        type="file"
        name="xlsx"
        onChange={handleChange}
      />
      {file && (
        <button className={styles.beautifulButton} type="submit">
          Submit
        </button>
      )}
    </form>
  </div> 
  );
}

