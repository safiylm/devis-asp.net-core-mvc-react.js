import React, {  useState, useEffect } from 'react';

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
    }

    const submitChoisirClient = (e) => {
        changeNumEtape(3);

    }

    return (

        <div style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center" }}>Choisir parmi un client enregistré </h3>
            <form onSubmit={submitChoisirClient }>
                
                <div class="flex-center-wrap-row border">
                       

              {(clientsDB.length > 0) ?
                   clientsDB.map((item) => (
                       <div key={item.id} >
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

                <button type="submit" className="btn btn-primary"> Choisir </button>
            </form>
            
        </div>
        
    );
}

export default SaisirUnClient;


