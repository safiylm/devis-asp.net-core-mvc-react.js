import React, { Component } from 'react';
import "../../styles/auth.css"


export class Inscription extends Component {

    constructor(props) {
        super(props);
      
    } 


    render() {
        return (
            <div className="container-auth">
              <h1>S'inscrire </h1>
                <form>
                    <input type="text" className="form-control" name="Nom" placeholder="Nom" />
                    <input type="text" className="form-control" name="Prenom" placeholder="Prenom" />
                    <input type="text" className="form-control" name="Email" placeholder="Adresse Email" />
                    <input type="text" className="form-control" name="Adresse" placeholder="Adresse" />
                    <input name="CodePostale" className="form-control" placeholder="CodePostale" />
                    <input type="text" name="Ville" className="form-control" placeholder="Ville" />
                    <input name="Telephone" className="form-control" placeholder="Telephone" />
                    <input type="text" name="SiteInternet" className="form-control" placeholder="SiteInternet" />
                    <input name="UserId" type="hidden" value="1" />

                    <button className="btn btn-primary" type="button">S'inscrire </button>
                </form>

            </div>
        );
    }
}



export default Inscription;