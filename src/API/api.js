import axios from 'axios';


export default axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000,
//   mode: 'no-cors',
  headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
});