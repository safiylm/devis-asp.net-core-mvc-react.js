import React, { Component } from 'react';
import "../../styles/auth.css"


export class ConfirmationEmail extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-auth">
                <h1>Confirmer votre adresse email. </h1>
                <form>
                    <input type="text" className="form-control" name="Email" placeholder="Saisissez votre adresse email" />
                    <button className="btn btn-primary" type="button">  Envoyer  </button>
                </form>

            </div>
        );
    }
}

export default ConfirmationEmail;