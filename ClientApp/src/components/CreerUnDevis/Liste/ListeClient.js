import React, {  useState } from 'react';
import '../../../styles/FormListeClientEntreprise.css';

const SaisirUnClient = ({ setIdClient, changeNumEtape }) => {

    const [clientsDB, setClientDB] = useState([])

    fetch('http://localhost:44453/Client/getAll')
        .then((res) => res.json())
        .then((data) => setClientDB(data));

    const onChange = (e) => {
       
        console.log(e.target.value)
        setIdClient(e.target.value)
        changeNumEtape(3);
    }


    return (
        <form >
            <div className="ListeClient">
           
              {(clientsDB.length > 0) ?
                   clientsDB.map((item) => (
                        <div key={item.id}>
                            <label>
                               <input type="radio" name="clientchoose"
                                   onChange={onChange} value={item.id }/>
                                    {item.nom} {item.ville} {item.email}
                           
                            </label>
                        </div>
                ))
               : <p> Chargement des clients ...</p>}
            </div>

            <button type="submit" className="btn btn-success"> Envoyer </button>
        </form>
    );
}

export default SaisirUnClient;


