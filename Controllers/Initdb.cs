using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Models;
using devis_asp.net_core_mvc_react.js.Data;

public static class Initdb
{

    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DevisContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<DevisContext>>()))
        {

            //////// Look for any user.
            if (context.ProduitModel.Any())
            {
                return;   // DB has been seeded
            }

            context.DevisModel.Add(
        new DevisModel
        {
            Motif = "",
            ClientId = 1,
            EntrepriseId = 1,
            UserId = 1,
            TVATotal = 0,
            TotalHT = 0,
            AccompteQuantite = 1,
            AccomptePourcentage = 20,
            AccompteInformations = "",
            InformationSuplementaire ="",
            DateCreation = DateTime.Now
        }
      ); 


        

            context.ProduitModel.Add(
                new ProduitModel
                {
                    Quantite = 1,
                    Designation = "Iphone 15 pro plus",
                    PrixUnitaireHT = 1200,
                    TVA = 20,
                    DateCreation = DateTime.Now
                }
            ) ;


         context.EntrepriseModel.Add(
           new EntrepriseModel
           {
               Nom = "Entreprise1",
               Email = "entreprise1@gmail.com",
               Adresse = "7 rue du Maréchal",
               CodePostale = 95000,
               Ville = "Paris",
               Telephone = 0615482659,
               SiteInternet = "www.monentreprise.com",
               DateCreation = DateTime.Now,
           }
       );

            context.ClientModel.Add(
              new ClientModel
              {

                  Nom = "Marie",
                  Prenom="Bary",
                  Email = "marie.bary@gmail.com",
                  Adresse = "7 rue de paris",
                  CodePostale = 95000,
                  Ville = "Paris",
                  Telephone = 0615482655,
                  DateCreation = DateTime.Now,
                 
              }
            );

           context.UserModel.Add(
           new UserModel
           {
               Nom = "Clara",
               Prenom = "Bourgeois",
               Email = "clara.bourgeois@gmail.com",
               Password = "123",
               Telephone = 0617782659,
               DateCreation = DateTime.Now
           }
         );

       
            context.SaveChanges();
        }
    }
}
