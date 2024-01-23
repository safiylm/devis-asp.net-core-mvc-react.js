import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditClient = () => {
    const clientId_param = 3011;
    const [clients, setClients] = useState([]);
    const [formclient, setFormClient] = useState({
        nom: "", prenom: "", email: "",
        adresse: "", codePostale: 0, ville: "",
        telephone: 0
    });

 
    useEffect( () => {
        fetch(`http://localhost:44453/Client/GetById?id=${clientId_param}`)
            .then((res) => res.json())
            .then((data) => setClients(data))

    }, []); 


    const changeHandlerClient = (e) => {
        setFormClient({ ...formclient, [e.target.name]: e.target.value })
    }

    const editClientSubmit = (event) => {
        let formData = new FormData();
        Object.keys(formclient).forEach(function (key) {
            formData.append(key, formclient[key]);
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

            request.open("POST", "Client/Edit", false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                   // setMessage(response);
                   
                }
            }.bind(this);
            request.send(formData);
        }
    }

    return (
        <>
            {clients.map((item) => (
                <form key={item.id} onSubmit={editClientSubmit} >

                    <h1>Modifier les données du client </h1>
                    
                    <input type="text" className="form-control" name="nom" onChange={changeHandlerClient} defaultValue={item.nom} />
                    <input type="text" className="form-control" name="prenom" onChange={changeHandlerClient} defaultValue={item.prenom} />
                    <input type="email" className="form-control" name="email" onChange={changeHandlerClient} defaultValue={item.email} />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandlerClient} defaultValue={item.adresse} />
                    <input className="form-control" name="codePostale" onChange={changeHandlerClient} defaultValue={item.codePostale} />
                    <input type="text" className="form-control" name="ville" onChange={changeHandlerClient} defaultValue={item.ville} />
                    <input className="form-control" name="telephone" onChange={changeHandlerClient} defaultValue={item.telephone} />
                        <button className="btn btn-success" type="submit">Modifier </button>
                
                       
            </form> ))}
     </>
    );
}



export default EditClient;