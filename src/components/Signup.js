import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
        const {name,email,password}=credentials
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
          body: JSON.stringify({name,email,password})
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Invalid credentials","danger")
            navigate("/");
          }
          else{
            props.showAlert("Account Created Successfully","success")
          }
        }
        else {
          props.showAlert("Confirm Password does not match", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
     }
  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;