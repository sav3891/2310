import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicPath,setProfilePicPath]=useState('./images/noimage.jpg');



  let onSignUpUsingFD=async()=>{
    

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

    let reqOptions={method:"POST",
                    
                    body:dataToSend,};
                    
    let JSONData=await fetch("/signup",reqOptions);
    let JSOData=await JSONData.json();
    if(JSOData.status==="success"){alert(JSOData.msg);}
    console.log(JSOData);                
  }



 // let onSignUpUsingURLE=async()=>{
   // let myHeader=new Headers();
    //myHeader.append("content-type","x-www-urlencoded");

    //let dataToSend=new URLSearchParams();
    //dataToSend.append("fn",firstNameInputRef.current.value);
    //dataToSend.append("ln",lastNameInputRef.current.value);
    //dataToSend.append("age",ageInputRef.current.value);
    //dataToSend.append("email",emailInputRef.current.value);
    //dataToSend.append("password",passwordInputRef.current.value);
    //dataToSend.append("mobileNo",mobileNoInputRef.current.value);
    //dataToSend.append("profilePic",profilePicInputRef.current.value);

    //let reqOptions={method:"POST",
      //              header:myHeader,
        //            body:dataToSend,};
    //let JSONData=await fetch("http://localhost:7865/signup",reqOptions);
    //let JSOData=await JSONData.json();
    //console.log(JSOData);                
  //}

  

//  let onSignUpUsingJSON=async()=>{
  //  let datatosend={
    //    fn:firstNameInputRef.current.value,
      //  ln:lastNameInputRef.current.value,
        //age:ageInputRef.current.value,
        //email:emailInputRef.current.value,
        //password:passwordInputRef.current.value,
        //mobileNo:mobileNoInputRef.current.value,
        //profilePic:profilePicInputRef.current.value,};

        //let JSONdatatosend=JSON.stringify(datatosend)
    
   // let myHeader=new Headers();

    //myHeader.append("content-type","application/json");
  
    
    //let reqOptions={method:"POST",
      //              body:JSONdatatosend,
        //            headers:myHeader
//};

//let JSONData=await fetch("http://localhost:7865/signup",reqOptions);
//let JSOData=await JSONData.json();
//console.log(JSOData);
  //};
  return (
    <div>
      <form>
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
          <input ref={emailInputRef}></input>
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
          onSignUpUsingFD();
            
          }}>
            signup
          </button>
        </div>

        <Link
          to="/ " className="dd"
        >
          lOGIN
        </Link>
      </form>
    </div>
    
  )
}
export default Signup
