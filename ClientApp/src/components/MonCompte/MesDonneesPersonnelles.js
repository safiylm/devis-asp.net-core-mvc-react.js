import React, { useState, useEffect } from 'react';
import '../../styles/dataperso.css';

const MesDonneesPersonnelles = () => {
    const [users, setUser] = useState([]);
    useEffect(() => { document.title = 'Mes données personnelles'; });

    fetch('http://localhost:44453/User/GetById?id=1')
        .then((res) => res.json())
        .then((data) => setUser(data));



    const updateNom = () => {
       // document.getElementById("input-prenom-id").ariaDisabled;
       
    }

    return (
        <div className="page-mes-donnees-perso">
            <div className="div-mes-donnees-perso">

            {users.length > 0 ?

                users.map(user => (
                    <div className="div-mes-donnees-perso-flex" key={user.id}>

                    <div className="div1" id="form-pre-nom" >
                            <label> Prénom<input id="input-prenom-id" className="form-control" value={user.prenom} /></label> 
                            <label> Nom <input className="form-control" value={user.nom} /></label> 
                            <button onClick={ updateNom() }>Modifier </button>
                    </div>

                  
                     <div className="div1">
                            <label> Saisissez votre ancien mot de passe
                                <input placeholder="Saisissez votre ancien mot de passe" className="form-control" value={user.password} />
                            </label> 
                            <label> Saisissez votre nouveau mot de passe
                                <input placeholder="Saisissez votre nouveau mot de passe" className="form-control" />
                            </label> 
                            <label> Confirmez votre nouveau mot de passe
                                <input placeholder="Confirmez votre nouveau mot de passe" className="form-control" />
                            </label> 

                            <button>Modifier votre mot de passe </button>
                     </div>


                    <div className="div1" id="form-email" >
                            <label> Email <input className="form-control" value={user.email} /></label> 
                            <button>Modifier votre email</button>
                     </div>

                     <div className="div1">
                            <label> Téléphone <input className="form-control" value={user.telephone} /></label> 
                            <button>Modifier votre téléphone</button>
                     </div>

                </div>
            )) : <p>...</p>}
            </div>
        </div>
    );
   

}
export default MesDonneesPersonnelles;