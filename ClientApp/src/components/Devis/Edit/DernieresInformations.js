import React, { useState, useEffect } from "react"
import "../../../styles/devis.css"


const EditDerniersInformations = ({ devisId, devisTempId, clientId, entrepriseId, userId, totalTVA, totalHT }) => {
  const [message, setMessage] = useState("");
  

    const [formdevis, setFormDevis] = useState({
        tempId: devisTempId,
        motif: "",
        clientId: clientId,
        entrepriseId: entrepriseId,
        userId: 21,
        totalTVA: totalTVA,
        totalHT: totalHT,
        accompteQuantite: 0,
        accomptePourcentage:0 ,
        accompteInformations: "",
        informationSuplementaire: "",
    });

    useEffect(() => {
        fetch(`http://localhost:44453/Devis/GetById?id=${devisId}`)
            .then((res) => res.json())
            .then((data) => setFormDevis(data))
    }, []); 


    const changeHandler = (e) => {
        setFormDevis({ ...formdevis, [e.target.name]: e.target.value })
    }

    const editDevisSubmit = (event) => {
        formdevis.Id = devisId;
        formdevis.TempId = devisTempId;
        formdevis.ClientId = clientId;
        formdevis.EntrepriseId = entrepriseId;
        formdevis.UserId = userId;
        formdevis.TotalTVA = totalTVA;
        formdevis.TotalHT = totalHT;

        let formData = new FormData();
        Object.keys(formdevis).forEach(function (key) {
            formData.append(key, formdevis[key]);
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

            request.open("POST", `Devis/Edit?id=${devisId}`, false);
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
       
         <>
                <h1>Modifier </h1>{ formdevis[0] != undefined &&
                <form onSubmit={editDevisSubmit} className="div-saisir"  >
                    <label>Motif du devis :
                        <input type="text" name="motif" className="form-control" onChange={changeHandler} defaultValue={formdevis[0].motif} />
                    </label><br />
                    <label>Accompte pourcentage :
                        <input name="accomptePourcentage" className="form-control" onChange={changeHandler} defaultValue={formdevis[0].accomptePourcentage} />
                    </label><br />
                    <label>Accompte quantitée :
                        <input name="accompteQuantite" className="form-control" onChange={changeHandler} defaultValue={formdevis[0].accompteQuantite} />
                    </label><br />
                    <label>Accompte informations :
                        <input name="accompteInformations" className="form-control" onChange={changeHandler} defaultValue={formdevis[0].accompteInformations} />
                    </label><br />
                    <label>Informations suplémentaires :
                        <input name="informationSuplementaire" className="form-control" onChange={changeHandler} defaultValue={formdevis[0].informationSuplementaire} />
                    </label><br />
                    <p>Mode de paiement </p>
                    <button type="submit" className="btn btn-primary">Enregistrer et terminer</button>
                    <p style={{color: "red" }}>{message}</p> 
                </form>
            } </>
       
    );
}



export default EditDerniersInformations;