import React, { Component } from 'react';
import "../../styles/auth.css"


export class PasswordForgotten extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-auth">
                <h1>Saisissez votre adresse email, vous allez recevoir un mail pour entrer un nouveau mot de passe. </h1>
                <form>
                    <input type="text" className="form-control" name="Email" placeholder="Saisissez votre adresse email" />
                    <button className="btn btn-primary" type="button">  Envoyer  </button>
                </form>

            </div>
        );
    }
}

export default PasswordForgotten;