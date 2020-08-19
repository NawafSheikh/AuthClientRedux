import { createSlice } from '@reduxjs/toolkit';
import axios from '../../connection/axios';

export const dataSlice = createSlice({
  name:"data",
  initialState: {
    lst:null
  },
  reducers: {
    store: (state, action) => {
      state.lst = action.payload
    }
}});

export const fetchDataAsync = () => dispatch => {
  axios.get('/users/data').then(res => {
    dispatch(dataSlice.actions.store(res.data))
  }).catch(err => {
    window.location.reload(false)
    console.log(err)
  })
}

export const storeDataAsync = (classValue, subject, marks) => dispatch => {
  axios.post('users/data', {class: classValue, subject: subject, marks: marks}).then(res => {
    dispatch(fetchDataAsync())
  }).catch(err => {
    window.location.reload(false)
    console.log(err)
  })
}

export const deleteDataAsync = (id) => dispatch => {
  axios.delete(`users/data/${id}`).then(res => {
    dispatch(fetchDataAsync())
  }).catch(err => {
    window.location.reload(false)
    console.log(err)
  })
}

export const updateDataAsync = (id, classValue, subject, marks) => dispatch => {
  axios.patch('users/data', {id: id, class: classValue, subject: subject, marks: marks}).then(res => {
    dispatch(fetchDataAsync())
  }).catch(err => {
    window.location.reload(false)
    console.log(err)
  })
}

export default dataSlice.reducer;
