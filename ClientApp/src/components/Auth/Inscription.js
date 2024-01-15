import React, { useState, useEffect } from 'react';
import "../../styles/auth.css"


const  Inscription = ()=> {

    useEffect(() => { document.title = 'Inscription'; });

    const[message, setMessage] = useState("");
    const[user, setUser] = useState({
        nom: "Nom", prenom: "Prenom", email: "Email",
        telephone: "Telephone", dateCreation: Date.now
    });


    const handleClick = (event) => {
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

            request.open("POST", "User/Inscription", false);
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
              <h1>S'inscrire </h1>
                <form onSubmit={handleClick }>
                    <input type="text" className="form-control" name="nom" onChange={changeHandler} placeholder="Nom" />
                    <input type="text" className="form-control" name="prenom" onChange={changeHandler} placeholder="Prenom" />
                    <input type="text" className="form-control" name="email" onChange={changeHandler} placeholder="Adresse Email" />
                    <input type="password" className="form-control" name="password" onChange={changeHandler} placeholder="Password" />
                    <input type="number" className="form-control" name="telephone" onChange={changeHandler} placeholder="Telephone" />

                    <button className="btn btn-primary" type="submit">S'inscrire </button>
                </form>
                <p style={{ color : "white"} }>{message}</p> 
            </div>
        );
   
}



export default Inscription;