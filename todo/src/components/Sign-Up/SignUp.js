import React, {useState} from 'react';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import {API_BASE_URL} from '../../constants/apiConstants';
import { createPortal } from 'react-dom';


function SignUp(props) {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
  
    
    
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const sendDetailsToServer = () => {
        console.log(username);
        console.log(password);
        console.log(confirmPassword);
        if(username.length && password.length) {
            const payload={
                "username": username,
                "password": password,
            }
           // console.log(payload)
            axios.post(API_BASE_URL+'register', {
                username: username,
                password: password
            })
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    redirectToHome();
                    
                } else{
                    console.log("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
        } 
        else {
            console.log("something wrong!");
        }
        
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
       
        if(password === confirmPassword) {
            sendDetailsToServer()    
        } else {
            console.log("something wrong!");
            // props.showError('Passwords do not match');
        }
    }


    return(
        <div className="App">
            <div className="auth-wrapper">
                <div className="container auth-inner center">
                    <form>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username"  onChange = { e => setUsername(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"  onChange = { e => setPassword(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Confirm password"  onChange = { e => setConfirmPassword(e.target.value)}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmitClick}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="#">Sign in?</a>
                        </p>
                </form>
                </div>
            </div>
        </div>
      
    )
}

export default SignUp;