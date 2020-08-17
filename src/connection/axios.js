import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.common = {'Authorization': `bearer ${sessionStorage.getItem('authToken') == null ? '_':sessionStorage.getItem('authToken')}`}
console.log(axios.defaults)
export default axios;
