using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using devis_asp.net_core_mvc_react.js.Data;
using devis_asp.net_core_mvc_react.js.Models;

namespace devis_asp.net_core_mvc_react.js.Controllers
{
    public class AuteurrController : Controller
    {
        private readonly DevisContext _context;

        public AuteurrController(DevisContext context)
        {
            _context = context;
        }

        public IActionResult GetAll()
        {

            return  Json(_context.AuteurModel.ToList());

        }

        // GET: AuteurModels
        public async Task<IActionResult> Index()
        {
              return _context.AuteurModel != null ? 
                          View(await _context.AuteurModel.ToListAsync()) :
                          Problem("Entity set 'DevisContext.AuteurModel'  is null.");
        }

        // GET: AuteurModels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.AuteurModel == null)
            {
                return NotFound();
            }

            var auteurModel = await _context.AuteurModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (auteurModel == null)
            {
                return NotFound();
            }

            return View(auteurModel);
        }

        // GET: AuteurModels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: AuteurModels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Email,Adresse,CodePostale,Ville,Telephone,SiteInternet,UserId,DateCreation")] AuteurModel auteurModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(auteurModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(auteurModel);
        }

        // GET: AuteurModels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.AuteurModel == null)
            {
                return NotFound();
            }

            var auteurModel = await _context.AuteurModel.FindAsync(id);
            if (auteurModel == null)
            {
                return NotFound();
            }
            return View(auteurModel);
        }

        // POST: AuteurModels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Email,Adresse,CodePostale,Ville,Telephone,SiteInternet,UserId,DateCreation")] AuteurModel auteurModel)
        {
            if (id != auteurModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(auteurModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AuteurModelExists(auteurModel.Id))
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
            return View(auteurModel);
        }

        // GET: AuteurModels/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.AuteurModel == null)
            {
                return NotFound();
            }

            var auteurModel = await _context.AuteurModel
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
            if (_context.AuteurModel == null)
            {
                return Problem("Entity set 'DevisContext.AuteurModel'  is null.");
            }
            var auteurModel = await _context.AuteurModel.FindAsync(id);
            if (auteurModel != null)
            {
                _context.AuteurModel.Remove(auteurModel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AuteurModelExists(int id)
        {
          return (_context.AuteurModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
