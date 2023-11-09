import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import ListeDB from './components/ListeDB';
import Form from "./components/Form/Form";

import ListeDevis from './components/ListeDevis/ListeDevis';
import Devis from './components/Devis/Devis';
import Index from './components/CreerUnDevis/Index';
import Inscription from './components/Auth/Inscription'
import Connexion from './components/Auth/Connexion';
import MesDonneesPersonnelles from './components/MonCompte/MesDonneesPersonnelles';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
    },
    {
        path: '/Auth/Inscription',
        element: < Inscription />
    },
    {
        path: '/Auth/Connexion',
        element: < Connexion />
    },
    {
        path: '/MonCompte/MesDonneesPersonnelles',
        element: < MesDonneesPersonnelles />
    },
    {
      path: '/ListeDB',
        element: < ListeDB />
    },
    {
        path: '/CreerUnDevis',
        element: < Index />
    },
    {
        path: '/ListeDevis',
        element: < ListeDevis />
    }, 
    {
        path: '/Devis/:id',
        element: < Devis />
    }, {
        path: '/Form/Form', 
        element: <Form/>
    }
];

export default AppRoutes;
