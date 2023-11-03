import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import ListeDB from './components/ListeDB';
import SaisirUnAuteur from './components/CreerUnDevis/SaisirUnAuteur';
import SaisirUnClient from './components/CreerUnDevis/SaisirUnClient';
import SaisirLesProduits from './components/CreerUnDevis/SaisirLesProduits';
import ListeDevis from './components/ListeDevis/ListeDevis';
import Devis from './components/Devis/Devis';
import Apercu from './components/CreerUnDevis/Apercu';

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
      path: '/ListeDB',
        element: < ListeDB />
    },
    {
        path: '/CreerUnDevis/SaisirUnAuteur',
        element: < SaisirUnAuteur />
    },
    {
        path: '/CreerUnDevis/SaisirUnClient',
        element: < SaisirUnClient />
    },
    {
        path: '/CreerUnDevis/SaisirLesProduits',
        element: < SaisirLesProduits />
    },
    {
        path: '/CreerUnDevis/Apercu',
        element: < Apercu />
    },
    {
        path: '/ListeDevis',
        element: < ListeDevis />
    }, 
    {
        path: '/Devis/:id',
        element: < Devis />
    }
];

export default AppRoutes;
