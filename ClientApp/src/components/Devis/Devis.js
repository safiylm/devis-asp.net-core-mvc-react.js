import React, { useState } from "react"
import { useParams } from "react-router-dom";
import "../../styles/devis.css"

const Devis = () => {

    const [produits, setProduit] = useState([]);
    let id = useParams()
    const [clients, setClients] = useState([]);
    const [deviss, setDevis] = useState([]);

    //const [auteurs, setAuteurs] = useState([]);

    console.log("id-->", id)

    fetch('http://localhost:44453/Devis/GetById?id=1')
        .then((res) => res.json())
        .then((data) => setDevis(data));

    fetch('http://localhost:44453/Client/GetById?id=1')
        .then((res) => res.json())
        .then((data) => setClients(data));

    fetch('http://localhost:44453/Produit/GetAll')
        .then((res) => res.json())
        .then((data) => setProduit(data));


    return (

        <div className="div-devis">

            <div className="div-container-auteur-client">
                <div className="div-auteur">
              
                    {(clients.length > 0) &&
                        clients.map((item) => (
                        <div key={item.id}>
                            <p>{item.nom} {item.prenom}</p>
                            <p> {item.email}</p>
                            <p> {item.adresse}</p>
                            <p> {item.ville} {item.codePostale}</p>
                            <p> {item.Telephone}</p>

                        </div>
                    )) 
                    }
                </div>

                <div className="div-client">

                {(clients.length > 0) &&
                    clients.map((item) => (
                        <div key={item.id}>
                            <p>{item.nom} {item.prenom}</p>
                            <p> {item.email}</p>
                            <p> {item.adresse}</p>
                            <p> {item.ville} {item.codePostale}</p>
                            <p> {item.Telephone}</p>

                        </div>
                    ))
                }
            </div>
            </div>

            <div className="div-container-devis">
                <table>
                    <thead>
                        <tr>
                            <th>Quantite</th>
                            <th>Designation</th>
                            <th>Prix Unitaire HT</th>
                            <th>TVA</th>
                          

                        </tr>
                    </thead>
                    <tbody>
            {(produits.length > 0) ?
                produits.map((item) => (
                    <tr key={item.id}>
                        <td>{item.quantite }</td>
                        <td>{item.designation }</td>
                        <td>{item.prixUnitaireHT}</td>
                        <td>{item.tVA}</td>

                   </tr>
                )) :
                <div>Loading ...</div>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default Devis;