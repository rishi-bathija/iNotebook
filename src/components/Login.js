import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"",password:""})
    let history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    console.log(json);

    if(json.success)
    {
        // save the token and redirect
        localStorage.setItem('token',json.authToken);
        history("/");
        props.showAlert("Logged in Successfully","success");
    }
    else
    {
        // alert("Invalid Credentials");
        props.showAlert("Invalid Details","danger");
    }
}

const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
}

    return (
        <div className='mt-3'>
            <h2 style={{marginBottom:'1em'}}>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
                </div>
                {/* <div className="mb-3 htmlForm-check">
                    <input type="checkbox" className="htmlForm-check-input" id="exampleCheck1" />
                     <label className="htmlForm-check-label" htmlFor="exampleCheck1">Check me out</label> 
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
 