import React, { Component } from 'react';
import "../../styles/auth.css"
import { Link } from 'react-router-dom';

export class Connexion extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-auth">
                <h1>Se Connecter </h1>
                <form>
                    <input type="text" className="form-control" name="Email" placeholder="Adresse Email" />
                    <input type="text" className="form-control" name="Password" placeholder="Password" />
                    <div className="div-btn">
                    <button className="btn btn-primary" type="button">Se Connecter </button>
                        <Link to="/Auth/Inscription">S'inscrire </Link>
                    </div>
                </form>
                
            </div>
        );
    }
}



export default Connexion;