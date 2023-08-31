import axios from 'axios';

const handleUploadData = (file) => {
    if (file== null) {
      return;
    }

    let formData = new FormData();
    formData.append('xlsx', file);

    const head = {     
      headers: { 'content-type': 'excel/form-data' }
    }

    return axios.post('http://localhost:8080/employees/', formData, head)
      .then((res) => res.data)
      .catch((err) => err.response.data);
  };

  export default handleUploadData;