import React, { useEffect } from 'react'
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';


function EditProfile() {

    let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicPath,setProfilePicPath]=useState('./images/noimage.jpg');


  let storeObj=useSelector((store)=>{
    return store ;
  })
  useEffect(()=>{
    firstNameInputRef.current.value=storeObj.loginReducer.userDetails.firstName;
    lastNameInputRef.current.value=storeObj.loginReducer.userDetails.lastName;
    ageInputRef.current.value=storeObj.loginReducer.userDetails.age;
    emailInputRef.current.value=storeObj.loginReducer.userDetails.email;
    mobileNoInputRef.current.value=storeObj.loginReducer.userDetails.mobileNo;
    let profilePicPath= `http://localhost:7865/${storeObj.loginReducer.userDetails.profilePic}`
    setProfilePicPath(profilePicPath);
  },[])



  let onUpdateProfile=async()=>{
    

    let dataToSend=new FormData();

    dataToSend.append("fn",firstNameInputRef.current.value);
    dataToSend.append("ln",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);
    dataToSend.append("profilePic",profilePicInputRef.current.value);
   //dataToSend.append("profilePic",profilePicInputRef.current.files[0]);

    for(let i=0;i<profilePicInputRef.current.files.length;i++)
    {dataToSend.append("profilePic",profilePicInputRef.current.files[i]);}

    let reqOptions={method:"PUT",
                    
                    body:dataToSend,};
                    
    let JSONData=await fetch("http://localhost:7865/updateProfile",reqOptions);
    let JSOData=await JSONData.json();
    if(JSOData.status==="success"){alert(JSOData.msg);}
    console.log(JSOData);                
  }


  return (
    <div>
        <TopNavigation></TopNavigation>
       <form>
        <h2>Edit Profile</h2>
       <div>
          <label>FIRST NAME</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>LAST NAME</label>
          <input ref={lastNameInputRef}></input>
        </div>{" "}
        <div>
          <label>AGE</label>
          <input ref={ageInputRef}></input>
        </div>{" "}
        <div>
          <label>EMAIL</label>
          <input ref={emailInputRef} readOnly></input>
        </div>{" "}
        <div>
          <label>PASSWORD</label>
          <input ref={passwordInputRef}></input>
        </div>{" "}
        <div>
          <label>MOBILE NUMBER</label>
          <input ref={mobileNoInputRef}></input>
        </div>{" "}
        <div>
          <label>PROFILE PIC</label>
          <input ref={profilePicInputRef} type="file" onChange={(ele)=>{
            let selectedImagePath = URL.createObjectURL(ele.target.files[0]);
            setProfilePicPath(selectedImagePath);
          }} ></input>
          <br></br>
          <br></br>
          <img src={profilePicPath} className="profilePicPreview"></img>
        </div>

        

          <div>
          <button type="button" onClick={() => {
          onUpdateProfile();
            
          }}>
            UPDATE
          </button>
        </div>
      </form>

    </div>
  )
}

export default EditProfile