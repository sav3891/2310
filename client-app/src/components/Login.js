import React, { useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";


function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

  //axios.defaults.baseURL="http://localhost:7865";

  
 


  useEffect(()=>{validateToken();},[]);

  
  let validateThrAxios=async()=>{
    let dataToSend=new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);

    let response= await axios.post("http://localhost:7865/login",dataToSend);
    if (response.data.data.status === "failure") {
      alert(response.data.data.msg);
    } else {
       // localStorage.setItem("email",emailInputRef.current.value);
        //localStorage.setItem("password",passwordInputRef.current.value);
        localStorage.setItem("token",response.data.data.token);

        dispatch({type:"login",data:response.data.data});
      navigate("/home");
    }
    
    console.log(response);

    
  }





  let validateLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = { method: "POST", body: dataToSend };
    let JSONData = await fetch("http://localhost:7865/login", reqOptions);
    let JSOData = await JSONData.json();
    if (JSOData.status === "failure") {
      alert(JSOData.msg);
    } else {
       // localStorage.setItem("email",emailInputRef.current.value);
        //localStorage.setItem("password",passwordInputRef.current.value);
        localStorage.setItem("token",JSOData.data.token);

        dispatch({type:"login",data:JSOData.data});
      navigate("/home");
    }
    console.log(JSOData);
  };

  let validateCredentials=()=>{
    //console.log("inside validate credentials")
    return async()=>{
      let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = { method: "POST", body: dataToSend };
    let JSONData = await fetch("http://localhost:7865/login", reqOptions);
    let JSOData = await JSONData.json();
    if (JSOData.status === "failure") {
      alert(JSOData.msg);
    } else {
       // localStorage.setItem("email",emailInputRef.current.value);
        //localStorage.setItem("password",passwordInputRef.current.value);
        localStorage.setItem("token",JSOData.data.token);

        dispatch({type:"login",data:JSOData.data});
      navigate("/home");
    }
    console.log(JSOData);
      
    }
  }

  let validateToken=async()=>{
    if(localStorage.getItem("token")){
        let dataToSend=new FormData();
        dataToSend.append("token",localStorage.getItem("token"));

        let reqOptions={method:"POST",
                        body:dataToSend,};

          let JSONData=await fetch("http://localhost:7865/loginWithToken",reqOptions);
          let JSOData=await JSONData.json();
          if (JSOData.status === "failure") {
            alert(JSOData.msg);
          } else {
             
              localStorage.setItem("token",JSOData.data.token);
      
              dispatch({type:"login",data:JSOData.data});
            navigate("/home");
          }
          console.log(JSOData);              
    }
  }

 

  return (
    <div>
      <form>
        <div>
          <label>EMAIL</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>PASSWORD</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              //validateLogin();
              //dispatch(validateCredentials());
              validateThrAxios();
            }}
          >
            Login
          </button>
        </div>
        <div></div>
        <Link to="/Signup" className="dd">
          SIGNUP
        </Link>
      </form>
    </div>
  );
}

export default Login;
