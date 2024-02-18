import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Home() {
    let storeObj=useSelector((store)=>{

        console.log(store)
        return store
    })
  return (
    <div>
        <h1>WELCOME {storeObj.loginReducer.userDetails.firstName} {storeObj.loginReducer.userDetails.lastName}</h1>

        <TopNavigation></TopNavigation>
        <img src={`http://localhost:7865/${storeObj.loginReducer.userDetails.profilePic}`} ></img>
    </div>
  )
}

export default Home