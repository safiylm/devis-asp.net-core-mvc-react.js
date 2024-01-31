using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Data;
using devis_asp.net_core_mvc_react.js.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NuGet.Protocol;

namespace devis_asp.net_core_mvc_react.js.Controllers
{
    public class ProduitController : Controller
    {
        private readonly DevisContext _context;

        public ProduitController(DevisContext context)
        {
            _context = context;
        }

        private static readonly IEnumerable<ProduitModel> Produits = new[]
        {
             new ProduitModel
            {
                 Id = 1,
                Quantite = 2,
                Designation = "Iphone 11" ,
                DateCreation = DateTime.Now,
                PrixUnitaireHT = 500 ,
                TVA = 20,
            },
              new ProduitModel
            {
                 Id = 2,
                Quantite = 2,
                Designation = "Iphone 12" ,
                DateCreation = DateTime.Now,
                PrixUnitaireHT = 650 ,
                TVA = 20,
            },
                 new ProduitModel
            {
                 Id = 3,
                Quantite = 2,
                Designation = "Iphone 14" ,
                DateCreation = DateTime.Now,
                PrixUnitaireHT = 950 ,
                TVA = 20,
            }
            ,
                   new ProduitModel
            {
                 Id = 4,
                Quantite = 2,
                Designation = "Iphone 15" ,
                DateCreation = DateTime.Now,
                PrixUnitaireHT = 1250 ,
                TVA = 20,
            }
    };

      
        public IActionResult GetAll()
        {
            // ProduitModel[] listeProduit = Produits.ToArray();
            ///  System.Threading.Thread.Sleep(2000);
            //return Json(listeProduit);
            ///  
            return Json( _context.ProduitModel.ToList());

        }

      
        public IActionResult GetByDevisId([FromQuery] string id)//Identifiant du devis 
        {
            return Json(_context.ProduitModel.Where((prod)=>prod.DevisId== id  ).ToList());
        }

        // GET: Produit
        public async Task<IActionResult> Index()
        {
            return _context.ProduitModel != null ?
                        View(await _context.ProduitModel.ToListAsync()) :
                        Problem("Entity set 'DevisContext.ProduitModel'  is null.");
        }


     


        // GET: Produit/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.ProduitModel == null)
            {
                return NotFound();
            }

            var produitModel = await _context.ProduitModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produitModel == null)
            {
                return NotFound();
            }

            return View(produitModel);
        }




        public  int CalculHT(string idDevis)
        {
            int somme = 0;
            List<ProduitModel> ancien = _context.ProduitModel.AsNoTracking().Where(e => e.DevisId == idDevis).ToList();
            foreach (var item in ancien)
            {
                somme = item.PrixUnitaireHT * item.Quantite + somme;
            }
            return somme;

        }

        public int CalculTVA(string idDevis)
        {
            int somme = 0;
            List<ProduitModel> ancien = _context.ProduitModel.AsNoTracking().Where(e => e.DevisId == idDevis).ToList();
            foreach (var item in ancien)
            {
                somme = item.TVA * item.Quantite + somme;
            }
            return somme;

        }

        [HttpPost]
        [Route("Produit/Create_")]
        public object Create_([FromForm][Bind("DevisId,Quantite,Designation,PrixUnitaireHT,TVA")] ProduitModel produitModel)
        {
            var res = "Erreur, votre produit n'a pas pu être enregistrer, veuillez recommencer.";
            if (produitModel.TVA != 0 && produitModel.Designation != null
                && produitModel.Quantite != 0 && produitModel.PrixUnitaireHT != 0)
            {

                produitModel.DateCreation = DateTime.Now;
                _context.ProduitModel.Add(produitModel);
                    _context.SaveChangesAsync();
                    res = "Votre produit a été enregistré avec succès!";
                
            }
            return Json(res);
        }

        [HttpPost]
        [Route("Produit/Create")]
        public object Create([FromForm][Bind("DevisId,Quantite,Designation,PrixUnitaireHT,TVA")] ProduitModel produitModel)
        {
            var res = "Erreur, votre produit n'a pas pu être enregistrer, veuillez recommencer.";
            if (produitModel.TVA != 0 && produitModel.Designation != null
                && produitModel.Quantite != 0 && produitModel.PrixUnitaireHT != 0)
            {

                produitModel.DateCreation = DateTime.Now;
                _context.ProduitModel.Add(produitModel);
                    _context.SaveChangesAsync();

                Thread.Sleep(2000);

                var devis = _context.DevisModel.AsNoTracking().Where(e => e.TempId == produitModel.DevisId).FirstOrDefault();
                if (devis != null)
                {
                    devis.TotalHT = CalculHT(produitModel.DevisId);
                    devis.TotalTVA = CalculTVA(produitModel.DevisId);
                    _context.DevisModel.Update(devis);

                    _context.SaveChangesAsync();
                    res = "Votre produit a été enregistré avec succès!";
                }
            }
            return Json(res);
        }

        [HttpPost]
        [Route("Produit/Edit")]
        public object Edit(int? id, [FromForm] ProduitModel data)
        {

            var res = "Erreur, votre produit n'a pas pu être modifier, veuillez recommencer.";
            var ancien = _context.ProduitModel.AsNoTracking().Where(e => e.Id == id).First();

            if (data.Quantite == 0) { data.Quantite = ancien.Quantite; }
            if (data.Designation == null) { data.Designation = ancien.Designation; }
            if (data.PrixUnitaireHT == 0) { data.PrixUnitaireHT = ancien.PrixUnitaireHT; }
            if (data.TVA == 0) { data.TVA = ancien.TVA; }
            if (data.DevisId == null) { data.DevisId = ancien.DevisId; }
           
            data.DateCreation = DateTime.Now;

            if (data != null && data.TVA != 0 && data.Designation != null
            && data.Quantite != 0 && data.PrixUnitaireHT != 0)
            {
              
                    try
                    {                        
                        _context.ProduitModel.Update(data);
                    _context.SaveChanges();

                    var devis = _context.DevisModel.AsNoTracking().Where(e => e.TempId == data.DevisId).First();

                    if (devis != null)
                    {
                        devis.TotalHT = CalculHT(data.DevisId);
                        devis.TotalTVA = CalculTVA(data.DevisId);

                        _context.DevisModel.Update(devis);
                        res = "Votre produit a été modifier avec succès!";
                        _context.SaveChanges();
                    }
                }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!ProduitModelExists(data.Id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                
            }
            return Json(res);
        }

        // GET: Produit/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ProduitModel == null)
            {
                return NotFound();
            }

            var produitModel = await _context.ProduitModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produitModel == null)
            {
                return NotFound();
            }

            return View(produitModel);
        }

        // POST: Produit/Delete/5
        [HttpPost]
        [Route("Produit/Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var res = "Erreur Suprrimer Produit ";

            if (_context.ProduitModel == null)
            {
                return Problem("Entity set 'DevisContext.ProduitModel'  is null.");
            }
            var produitModel = await _context.ProduitModel.FindAsync(id);
            if (produitModel != null)
            {
                _context.ProduitModel.Remove(produitModel);
            }
            
            await _context.SaveChangesAsync();
            return Json(res);
        }






        private bool ProduitModelExists(int id)
        {
          return (_context.ProduitModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
