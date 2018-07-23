import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-sandwich-builder.firebaseio.com/'
});


export default instance;
