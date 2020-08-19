import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  storeDataAsync,
  deleteDataAsync,
  updateDataAsync
} from './dataSlice';

function Data() {
  const [classValue, setClassValue] = useState(0);
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState(0);
  const dispatch = useDispatch();
  const lst = useSelector(state => state.data.lst);
  return(
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Class</th>
          <th>Subject</th>
          <th>Marks</th>

        </tr>
      </thead>
      <tbody>
        {
          lst.map(element => {
            return(
              <tr key={element._id}>
                <td><button id="text" onClick={e=>e.type==='click' ? dispatch(deleteDataAsync(element._id)) : null}>X</button></td>
                <td><input defaultValue={element.class} onKeyPress={e => e.key === 'Enter' ? dispatch(updateDataAsync(element._id, e.target.value, element.subject, element.marks)) : null}/></td>
                <td><input defaultValue={element.subject} onKeyPress={e => e.key === 'Enter' ? dispatch(updateDataAsync(element._id, element.class, e.target.value, element.marks)) : null}/></td>
                <td><input defaultValue={element.marks} onKeyPress={e => e.key === 'Enter' ? dispatch(updateDataAsync(element._id, element.class, element.subject, e.target.value)) : null}/></td>
              </tr>
            )
          })
        }
        <tr>
          <td></td>
          <td><input onChange={e => setClassValue(e.target.value)} onKeyPress={e => e.key === 'Enter' ? dispatch(storeDataAsync(classValue, subject, marks)) : null}/></td>
          <td><input onChange={e => setSubject(e.target.value)} onKeyPress={e => e.key === 'Enter' ? dispatch(storeDataAsync(classValue, subject, marks)) : null}/></td>
          <td><input onChange={e => setMarks(e.target.value)} onKeyPress={e => e.key === 'Enter' ? dispatch(storeDataAsync(classValue, subject, marks)) : null}/></td>

        </tr>
      </tbody>
    </table>
  )
}

export default Data;
