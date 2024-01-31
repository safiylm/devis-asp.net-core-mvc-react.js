import React, { useState, useEffect } from "react"
import "../../styles/devis.css"
import jsPDF from 'jspdf';
import { useRef } from 'react';

const Devis = () => {

    const reportTemplateRefHTML = useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            orientation: 'p',
            format: 'a0',
            unit: 'px',
           
             putOnlyUsedFonts: true
        });

        

        doc.html(reportTemplateRefHTML.current, {
            async callback(doc) {
               
                await doc.save('devispdfessai');
            },
        });

    };


    const url_ = window.location.pathname;
    const arrayURL = url_.split("/");
    const id = arrayURL[2];
    const id_ = arrayURL[3];
    const clientId_param = arrayURL[4];
    const entrepriseId_param = arrayURL[5];



    const [produits, setProduit] = useState([]);

    const [clients, setClients] = useState([]);
    const [deviss, setDevis] = useState([]);
    const [entreprise, setEntreprise] = useState([]);
    
    const sommePrixTVA = produits.map(item => item.tva).reduce((prev, curr) => prev + curr, 0);
    const sommePrixHT = produits.map(item => item.prixUnitaireHT).reduce((prev, curr) => prev + curr, 0);
    const sommeTotale = sommePrixTVA + sommePrixHT;

    useEffect(() => { document.title = `Devis N° ${id}`; 
       
    fetch(`http://localhost:44453/Devis/GetById?id=${id}`)
        .then((res) => res.json())
        .then((data) => setDevis(data) );


    fetch(`http://localhost:44453/Client/GetById?id=${clientId_param}`)
        .then((res) => res.json())
        .then((data) => setClients(data));

    fetch(`http://localhost:44453/Entreprise/GetById?id=${entrepriseId_param}`)
        .then((res) => res.json())
        .then((data) => setEntreprise(data));


    fetch(`http://localhost:44453/Produit/GetByDevisId?id=${id_ }`)
        .then((res) => res.json())
        .then((data) => setProduit(data));
   }, []); 


    return (
        <>

            <button className="button" onClick={handleGeneratePdf}>
                Generate PDF
            </button>
           
           ,<div className="page-devis" ref={reportTemplateRefHTML}>
                <div className="div-devis" id="devis" >
               
                    <h1>Devis N° : {id} </h1>

            {(produits.length > 0 && clients.length > 0 && deviss.length > 0) &&                   
               <div>
                    <div className="div-container-auteur-client">
                        <div className="div-auteur">
                                    <img src="data:image/jpeg;base64,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" />
                                    {(entreprise.length > 0) &&
                                        entreprise.map((item) => (
                                        <div key={item.id}>
                                            <p>{item.nom}</p>
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
                                    <p> Client : {item.nom} {item.prenom}</p>
                                    <p> Email : {item.email}</p>
                                    <p> Adresse : {item.adresse}</p>
                                    <p> Ville : {item.ville} {item.codePostale}</p>
                                    <p> Téléphone : {item.telephone}</p>

                                </div>
                            ))
                        }
                    </div>
                    </div>

                    <div className="div-container-devis">
                <p>Intitulé : Motif ou description du devis.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Quantite</th>
                            <th>Designation</th>
                            <th>Prix Unitaire HT</th>
                            <th>TVA</th>
                            <th>Prix TTC</th>
                          

                        </tr>
                    </thead>
                    <tbody>
            {(produits.length > 0) ?
                produits.map((item) => (
                    <tr key={item.id}>
                        <td>{item.quantite }</td>
                        <td>{item.designation}</td>
                        <td>{item.prixUnitaireHT}$</td>
                        <td>{item.tva}$</td>
                        <td>{item.prixUnitaireHT + item.tva}$</td>
                      
                   </tr>
                )) :
                <div>Loading ...</div>
                        }
                    </tbody>
                </table>
                                <div className="div-prix-parent">
                                    <div className="div-prix-total">
                                        <p> Total HT :{sommePrixHT}$</p>
                                        <p> Total TVA : {sommePrixTVA}$</p>
                                        <p> <strong>Total TTC : {sommeTotale}$ </strong></p>
                                    </div>
                                </div>

                <div className="div-informations-suppementaires">
                    <p><strong>Conditions de paiement</strong> </p>
                    <p>Accompte de 20% à la signature: 150$ </p>

                    <p><strong>Moyens de paiement </strong></p>
                    <p>Espèce - Virement </p>
                </div>

            </div>
              </div>
        }
                </div>
            </div>
           
    </>
    );
}



export default Devis;