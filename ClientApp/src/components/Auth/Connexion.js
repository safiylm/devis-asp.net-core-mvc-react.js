import React, { useState } from 'react';
import "../../styles/auth.css"
import { Link } from 'react-router-dom';

const Connexion =()=> {

    const [message, setMessage] = useState("");

    const [user, setUser] = useState({
        email: "Email", password:"Paswword"
    });


    const handleSubmit = (event) => {
        //Send Post 

        let formData = new FormData();
        Object.keys(user).forEach(function (key) {
            formData.append(key, user[key]);
        });

        event.preventDefault();
        var request;
        if (window.XMLHttpRequest) {
            //New browsers.
            request = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            //Old IE Browsers.
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (request != null) {

            request.open("POST", "User/Connexion", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                }
            }.bind(this);
            request.send(formData);
        }
    }


    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }



  
        return (
            <div className="container-auth">
                <h1>Se Connecter </h1>
                <form onSubmit={handleSubmit }>
                    <input type="text" className="form-control" name="email" onChange={changeHandler} placeholder="Adresse Email" />
                    <input type="password" className="form-control" name="password" onChange={changeHandler} placeholder="Password" />
                    <div className="div-btn">
                        <button className="btn btn-primary" type="submit">Se Connecter </button>
                        <Link to="/Auth/Inscription">S'inscrire </Link>
                    </div>
                </form>
                <p style={{color: "white"}}>{message}</p> 
            </div>
        );
    
}



export default Connexion;