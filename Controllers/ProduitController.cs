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

      
        public IActionResult GetAll()
        {
            return Json( _context.ProduitModel.ToList());
        }

      
        public IActionResult GetByDevisId([FromQuery] string id)//Identifiant du devis 
        {
            return Json(_context.ProduitModel.Where((prod)=>prod.DevisId== id  ).ToList());
        }

   

        //calcule la somme total HT
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
      
        //calcule la somme total TVA
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
        //Devis non crée encore,  
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
        [Route("Produit/Edit_")]
        //Devis non crée encore,  
        public object Edit_(int? id, [FromForm] ProduitModel data)
        {

            var res = "Erreur, votre produit n'a pas pu être modifier, veuillez recommencer.";
            var ancien = _context.ProduitModel.AsNoTracking().Where(e => e.Id == id).FirstOrDefault();

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


        [HttpPost]
        [Route("Produit/Delete_")]
        //Devis non crée encore,  
        public async Task<IActionResult> DeleteConfirmed_(int id)
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
                await _context.SaveChangesAsync();
            }

            await _context.SaveChangesAsync();
            return Json(res);
        }
        
        
   

        [HttpPost]
        [Route("Produit/Create")]
        //Devis déjà crée, on le modifie en ajoute de nouveau produit, donc on modifie le prix total du devis 
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
        //Devis déjà crée, on le modifie en modifiant un produit, donc on modifie le prix total du devis 
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


        [HttpPost]
        [Route("Produit/Delete")]
        //Devis déjà crée, on le modifie en supprimant un produit, donc on modifie le prix total du devis 
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
                await _context.SaveChangesAsync();

                var devis = _context.DevisModel.AsNoTracking().Where(e => e.TempId == produitModel.DevisId).First();

                if (devis != null)
                {
                    devis.TotalHT = CalculHT(produitModel.DevisId);
                    devis.TotalTVA = CalculTVA(produitModel.DevisId);

                    _context.DevisModel.Update(devis);

                    _context.SaveChanges();
                }
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
