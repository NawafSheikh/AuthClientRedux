import { createSlice } from '@reduxjs/toolkit';
import axios from "../../connection/axios"

export const authSlice = createSlice({
  name:"authorization",
  initialState: {
    loggedIn: null,
    name:null
  },
  reducers: {
    login: state => {
      state.loggedIn = true;
    },
    logoff: state => {
      state.loggedIn = false;
      state.name = null;
      sessionStorage.setItem('authToken', '');
      axios.defaults.headers.common = {'Authorization': `bearer ${sessionStorage.getItem('authToken')}`}
    },
    info: (state, action) => {
      state.name = action.payload;
    }
  }
})

export const login2Async = () => dispatch => {
  window.open("http://localhost:3000/auth/facebook", "_self");
  /*axios.post('/auth/facebook').then(res => {
    console.log('Success')
  }).catch(err => {
    console.log('Failure', err)
  })*/
}

export const loginAsync = (name, password) => dispatch => {
  axios.post(`/users/login`, {name: name, password:password})
    .then(res => {
      console.log(2)
      sessionStorage.setItem('authToken', res.data.accessToken);
      axios.defaults.headers.common = {'Authorization': `bearer ${sessionStorage.getItem('authToken')}`}
      dispatch(authSlice.actions.login());
    }).catch(err => {
      console.log(err)
      dispatch(authSlice.actions.logoff());
    })

};

export const checkAsync = () => dispatch => {
  axios.get('/users/check').then(res => {
    dispatch(authSlice.actions.login());
  }).catch(err => {
    console.log(err)
    dispatch(authSlice.actions.logoff());
  })
}

export const infoAsync = () => dispatch => {
  axios.get('/users/info').then(res => {
    dispatch(authSlice.actions.info(res.data[0].name))
  }).catch(err => {
    console.log(err)
    dispatch(authSlice.actions.info(''))
  })
}

export const createAsync = (name, password) => dispatch => {
  axios.post(`/users/create`, {name: name, password:password}).then(res => {
    dispatch(loginAsync(name, password));
  }).catch(err => {
    console.log(err)
  })
}


export default authSlice.reducer;
