import axios from 'axios'

const instance = axios.create({
  baseURL: "https://burger-builder23.firebaseio.com/"
});

export default instance