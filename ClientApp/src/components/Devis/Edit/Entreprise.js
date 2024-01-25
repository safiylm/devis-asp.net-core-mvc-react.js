import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditEntreprise = () => {
    const entrepriseId_param = 1;
    const [formEntreprise, setFormEntreprise] = useState({
        id: entrepriseId_param, nom:"", email:"",
        adresse: "", codePostale: 0, ville:"",
        telephone:0, siteInternet : ""
    });

    useEffect(() => {
    fetch(`http://localhost:44453/Entreprise/GetById?id=${entrepriseId_param}`)
        .then((res) => res.json())
        .then((data) => setFormEntreprise(data));

    }, []); //allow to fetch once the data 

 
  

    const changeHandlerEntreprise = (e) => {
        setFormEntreprise({ ...formEntreprise, [e.target.name]: e.target.value })
    }

    const editEntrepriseSubmit = (event) => {
        formEntreprise.id = entrepriseId_param

        let formData = new FormData();
        Object.keys(formEntreprise).forEach(function (key) {
            formData.append(key, formEntreprise[key]);
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

            request.open("POST", `Entreprise/Edit?id=${entrepriseId_param}`, false);
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    //setMessage(response);     
                }
            }.bind(this);
            request.send(formData);
        }
    }

    return (
        <>
            {formEntreprise[0] != undefined && <>

                <form className="div-saisir" onSubmit={editEntrepriseSubmit} >

                    <h1>Modifier les données de l'entreprise </h1>
                    <input type="text" className="form-control" name="nom" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].nom} />
                    <input type="email" className="form-control" name="email" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].email} />
                    <input type="text" className="form-control" name="adresse" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].adresse} />
                    <input className="form-control" name="codePostale" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].codePostale} />
                    <input type="text" className="form-control" name="ville" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].ville} />
                    <input className="form-control" name="telephone" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].telephone} />
                    <input type="text" className="form-control" name="siteInternet" onChange={changeHandlerEntreprise} defaultValue={formEntreprise[0].siteInternet} />

                    <button className="btn btn-success" type="submit">Modifier </button>

                </form>
            </>}
            
      </>
    );
}



export default EditEntreprise;