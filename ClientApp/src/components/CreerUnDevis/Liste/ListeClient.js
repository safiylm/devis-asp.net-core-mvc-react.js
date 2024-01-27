import React, {  useState, useEffect } from 'react';
import '../../../styles/FormListeClientEntreprise.css';

const SaisirUnClient = ({ idClient, setIdClient, changeNumEtape }) => {

    const [clientsDB, setClientDB] = useState([])
    useEffect(() => {

        fetch('http://localhost:44453/Client/getAll')
            .then((res) => res.json())
            .then((data) => setClientDB(data));
    }, []);


    const onChange = (e) => {
       
        console.log(e.target.value)
        setIdClient(e.target.value)
        changeNumEtape(3);
    }


    return (
        <form className="div-choisir">
            <h1>Choisir parmi un client enregistré </h1>

            <div className="ListeClient">
           
              {(clientsDB.length > 0) ?
                   clientsDB.map((item) => (
                       <div key={item.id}>
                           {(idClient == item.id) ?
                               <label>
                                   <input type="radio" name="clientchoose"
                                       onChange={onChange} value={item.id} checked />
                                    {item.nom} <br /> {item.email} <br />{item.ville}

                               </label>
                           :
                            <label>
                               <input type="radio" name="clientchoose"
                                   onChange={onChange} value={item.id }/>
                                   {item.nom} <br /> {item.email} <br />{item.ville}
                           
                           </label>
                           }
                        </div>
                ))
               : <p> Chargement des clients ...</p>}
            </div>

            <button type="submit" className="btn btn-success"> Envoyer </button>
        </form>
    );
}

export default SaisirUnClient;


