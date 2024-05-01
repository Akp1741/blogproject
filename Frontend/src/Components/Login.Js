import React, { useState } from 'react';

function Login () {
   const name= "ayush";
   const Password= "ayush12"; 
   
   const [username,setName]=useState('');
    const [pass,SetPass]=useState('');
    const [isLoggedin,setIsLoggedin]=useState();


const handleLogin = async(event)=> {
    if(username===name && pass===password){
    setIsLoggedin(true);
    localStorage.setItem('isLoggedn','true');
    navigate("/BlogList");
    }else{
        alert("Username Or Password invalid")
    }
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/blogs'); 
    } catch (error) {
        console.error('Login failed:', error);
    }
}
};
return (
    <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input type of="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
);

export default Login;