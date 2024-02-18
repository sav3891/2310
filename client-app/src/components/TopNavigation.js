import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
    let navigate=useNavigate();
    let storeObj=useSelector((store)=>{
        console.log(store);
        return store;
    });
    useEffect(()=>{
        if(storeObj.loginReducer.userDetails.email){}else{navigate("/")};},[])

    let onDeleteAccount=async()=>{
        localStorage.clear();

        let dataToSend=new FormData();
        dataToSend.append("email",storeObj.loginReducer.userDetails.email);

        let reqOptions={method:"PUT",
                        body:dataToSend,}

        let JSONData=await fetch("http://localhost:7865/deleteProfile",reqOptions)
        let JSOData=await JSONData.json();
        if(JSOData.status==="success"){
            alert(JSOData.msg);
        }else{alert(JSOData.msg)}
    }    
    

  
  return (
    <div>
        <nav>
            <NavLink to="/home" >HOME</NavLink>
            <NavLink to="/tasks">TASKS</NavLink>
            <NavLink to="/leaves" >LEAVES</NavLink>
            <NavLink to="/editProfile" >EDIT PROFILE</NavLink>
            <NavLink to="/deleteProfile" onClick={()=>{
                onDeleteAccount();

            }} >DELETE PROFILE</NavLink>
            <NavLink to="/" onClick={()=>{
                localStorage.clear();
            }} >LOGOUT</NavLink>
        </nav>
    </div>
  )
}

export default TopNavigation