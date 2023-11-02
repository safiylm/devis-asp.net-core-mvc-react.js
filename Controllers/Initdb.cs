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
            ////// Look for any user.
            if (context.ProduitModel.Any())
            {
              return;   // DB has been seeded
            }

            context.ProduitModel.Add(
                new ProduitModel
                {
                   
                    Quantite = 55,
                    Designation = "Iphone 15 pro plus",
                    PrixUnitaireHT = 1200,
                    TVA = 20,
                    DateCreation = DateTime.Now
                }//,
                 //new ProduitModel{}
            ) ;


         context.AuteurModel.Add(
           new AuteurModel
           {
               Nom = "Dupont",
               Email = "Iphone 15 pro plus",
               Adresse = "7 rue du Maréchal",
               CodePostale = 20,
               Ville = "Paris",
               Telephone = 0615482659,
               SiteInternet = "http://monsite.com",
               UserId = 1,
               DateCreation = DateTime.Now,
           }
       );

            context.ClientModel.Add(
              new ClientModel
              {

                  Nom = "Dupont",
                  Prenom="Quentin",
                  Email = "Iphone 15 pro plus",
                  Adresse = "7 rue du Maréchal",
                  CodePostale = 20,
                  Ville = "Paris",
                  Telephone = 0615482659,
                  DateCreation = DateTime.Now,
                  DevisId = 1
              }
            );

           context.UserModel.Add(
           new UserModel
           {
               Nom = "Dupont",
               Prenom = "Quentin",
               Email = "Iphone 15 pro plus",
               Password = "abcd",
               Telephone = 0615482659,
               DateCreation = DateTime.Now
           }
         );

          context.DevisModel.Add(
           new DevisModel
           {
                ClientId =1,
                AuteurId=1,
                UserId =1,
                DateCreation = DateTime.Now
           }
         );

            context.SaveChanges();
        }
    }
}
