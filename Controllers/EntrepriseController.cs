using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Data;
using devis_asp.net_core_mvc_react.js.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace devis_asp.net_core_mvc_react.js.Controllers
{
    public class EntrepriseController : Controller
    {
        private readonly DevisContext _context;

        public EntrepriseController(DevisContext context)
        {
            _context = context;
        }

        public IActionResult GetAll()
        {
            return  Json(_context.EntrepriseModel.ToList());
        }


        public IActionResult GetById([FromQuery] int id)//Identifiant du devis 
        {
            return Json(_context.EntrepriseModel.Where((u) => u.Id == id).ToList());
        }


        // GET: AuteurModels
        public async Task<IActionResult> Index()
        {
              return _context.EntrepriseModel != null ? 
                          View(await _context.EntrepriseModel.ToListAsync()) :
                          Problem("Entity set 'DevisContext.AuteurModel'  is null.");
        }

        // GET: AuteurModels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.EntrepriseModel == null)
            {
                return NotFound();
            }

            var auteurModel = await _context.EntrepriseModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auteurModel == null)
            {
                return NotFound();
            }

            return View(auteurModel);
        }

      
                //_context.Add(auteurModel);
                //await _context.SaveChangesAsync();
                //return RedirectToAction(nameof(Index));
           


        [HttpPost]
        [Route("Entreprise/Create")]
        public object Create([FromHeader] string token, [FromForm] EntrepriseModel data)
        {
            var res = "Erreur, votre entreprise n'a pas été enregistrer, veuillez recommencer.";
            // check token
            // do something with data
            if (data != null && data.Nom != null && data.Email !=null && data.Telephone != 0 )
            {
                _context.EntrepriseModel.Add(data);
                _context.SaveChangesAsync();
                res = "Votre entreprise a été enregistré avec succès!";
              
            }
            return Json(res);
        }




        [HttpPost]
        [Route("Entreprise/Edit")]
        public object Edit( int? id, [FromForm] EntrepriseModel data)
        {
            var res = "Erreur, les données de votre entreprise n'a pas été modifier.";

            var ancien = _context.EntrepriseModel.AsNoTracking().Where(e => e.Id == id).First();

            if (data.Nom == null) { data.Nom = ancien.Nom; }
            if (data.Email == null) { data.Email = ancien.Email; }
            if (data.Adresse == null) { data.Adresse = ancien.Adresse; }
            if (data.CodePostale == 0) { data.CodePostale = ancien.CodePostale; }
            if (data.Ville == null) { data.Ville = ancien.Ville; }
            if (data.Telephone == 0) { data.Telephone = ancien.Telephone; }
            if (data.SiteInternet == null) { data.SiteInternet = ancien.SiteInternet; }
            data.DateCreation = DateTime.Now;
         

            if (data != null && data.Email != null &&
             data.Nom != null && data.SiteInternet !=null &&
             data.Adresse != null && data.CodePostale != 0 &&
            data.Ville != null && data.Telephone != 0)
            {

                //if (ModelState.IsValid) {
                try
                {
                    _context.EntrepriseModel.Update(data);
                    _context.SaveChangesAsync();
                    res = "Les données de votre entreprise a été modifier avec succès!";

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AuteurModelExists(data.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
                return Json(res) ;
        }


        // GET: AuteurModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.EntrepriseModel == null)
            {
                return NotFound();
            }

            var auteurModel = await _context.EntrepriseModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auteurModel == null)
            {
                return NotFound();
            }

            return View(auteurModel);
        }

        // POST: AuteurModels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.EntrepriseModel == null)
            {
                return Problem("Entity set 'DevisContext.AuteurModel'  is null.");
            }
            var auteurModel = await _context.EntrepriseModel.FindAsync(id);
            if (auteurModel != null)
            {
                _context.EntrepriseModel.Remove(auteurModel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AuteurModelExists(int id)
        {
          return (_context.EntrepriseModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
