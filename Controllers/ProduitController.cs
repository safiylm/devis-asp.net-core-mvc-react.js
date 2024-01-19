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

      
        public IActionResult GetByDevisId([FromQuery] int id)//Identifiant du devis 
        {
            return Json(_context.ProduitModel.Where((prod)=>prod.DevisId == id ).ToList());
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



        [HttpPost]
        [Route("Produit/Create")]
        public object Create([Bind("DevisId,Quantite,Designation,PrixUnitaireHT,TVA")] ProduitModel produitModel)
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


        // GET: Produit/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ProduitModel == null)
            {
                return NotFound();
            }

            var produitModel = await _context.ProduitModel.FindAsync(id);
            if (produitModel == null)
            {
                return NotFound();
            }
            return View(produitModel);
        }

        // POST: Produit/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Quantite,Designation,PrixUnitaireHT,TVA,DateCreation")] ProduitModel produitModel)
        {
            if (id != produitModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(produitModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProduitModelExists(produitModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(produitModel);
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
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
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
            return RedirectToAction(nameof(Index));
        }

        private bool ProduitModelExists(int id)
        {
          return (_context.ProduitModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
