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
    const upData = res.data.map(d => {return {key:d._id, class:d.class, subject: d.subject, marks:d.marks}})
    dispatch(dataSlice.actions.store(upData))
  }).catch(err => {
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

export const updateDataAsync = () => dispatch => (row) => {
  axios.patch('users/data', {id: row.key, class: row.class, subject: row.subject, marks: row.marks}).then(res => {
    dispatch(fetchDataAsync())
  }).catch(err => {
    window.location.reload(false)
    console.log(err)
  })
}

export default dataSlice.reducer;
