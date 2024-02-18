import React from 'react'
import TopNavigation from './TopNavigation'
import { useDispatch } from 'react-redux'

function Tasks() {
  let dispatch=useDispatch();
  return (
    <div>
        <h1>TASKS</h1>
        <TopNavigation></TopNavigation>
        <button onClick={()=>{
          dispatch({type:"addTask",data:"dummy data"})

        }} >add tasks</button>
    </div>
  )
}

export default Tasks