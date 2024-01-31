import React, { useState, useEffect } from "react"


const EditClient = ({ clientId_param }) => {
  const [message, setMessage] = useState("");

    const [formclient, setFormClient] = useState({
        id: clientId_param, nom: "", prenom: "", email: "",
        adresse: "", codePostale: 0, ville: "",
        telephone: 0
    });
   
    useEffect( () => {
        fetch(`http://localhost:44453/Client/GetById?id=${clientId_param}`)
            .then((res) => res.json())
            .then((data) => setFormClient(data))
    }, []); 


    const changeHandlerClient = (e) => {
        setFormClient({ ...formclient, [e.target.name]: e.target.value })
     
    }


    const editClientSubmit = (event) => {
        formclient.id =clientId_param
       
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

            request.open("POST", `Client/Edit?id=${clientId_param}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    setMessage(response);
                   
                }
            }.bind(this);
            request.send(formData);
        }
    }
   
    return (
    
        <div class="container-lg">
            <form onSubmit={editClientSubmit} >
                {formclient[0] != undefined && <>

                    <h1>Modifier les données du client </h1>
                    <input type="text" className="form-control" name="nom" onChange={changeHandlerClient} defaultValue={formclient[0].nom }  />
                    <input type="text" className="form-control" name="prenom" onChange={changeHandlerClient} defaultValue={formclient[0].prenom} />
                    <input type="email" className="form-control" name="email" onChange={changeHandlerClient} defaultValue={formclient[0].email} />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandlerClient} defaultValue={formclient[0].adresse} />
                    <input type="number" className="form-control" name="codePostale" onChange={changeHandlerClient} defaultValue={formclient[0].codePostale} />
                    <input type="text" className="form-control" name="ville" onChange={changeHandlerClient} defaultValue={formclient[0].ville} />
                    <input className="form-control" name="telephone" onChange={changeHandlerClient} defaultValue={formclient[0].telephone} />
                    <button className="btn btn-primary" type="submit">Modifier </button>
                    <p style={{color: "red" }}>{message}</p> 

                </> }             
            </form>
       </div>
    
    );
}



export default EditClient;