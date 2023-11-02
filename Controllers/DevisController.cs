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
    public class DevisController : Controller
    {
        private readonly DevisContext _context;

        public DevisController(DevisContext context)
        {
            _context = context;
        }

        public IActionResult GetAll()
        {

            return Json(_context.DevisModel.ToList());

        }

       
        public IActionResult GetById([FromQuery] int id)//Identifiant du devis 
        {
            return Json(_context.DevisModel.Where(devis => devis.Id == id).ToList() );
        }


        // GET: Devis
        //public async Task<IActionResult> Index()
        //{
        //      return _context.DevisModel != null ? 
        //                  View(await _context.DevisModel.ToListAsync()) :
        //                  Problem("Entity set 'DevisContext.DevisModel'  is null.");
        //}

        //// GET: Devis/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null || _context.DevisModel == null)
        //    {
        //        return NotFound();
        //    }

        //    var devisModel = await _context.DevisModel
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (devisModel == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(devisModel);
        //}

        // GET: Devis/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Devis/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ClientId,AuteurId,UserId,DateCreation")] DevisModel devisModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(devisModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(devisModel);
        }

        // GET: Devis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.DevisModel == null)
            {
                return NotFound();
            }

            var devisModel = await _context.DevisModel.FindAsync(id);
            if (devisModel == null)
            {
                return NotFound();
            }
            return View(devisModel);
        }

        // POST: Devis/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ClientId,AuteurId,UserId,DateCreation")] DevisModel devisModel)
        {
            if (id != devisModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(devisModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DevisModelExists(devisModel.Id))
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
            return View(devisModel);
        }

        // GET: Devis/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.DevisModel == null)
            {
                return NotFound();
            }

            var devisModel = await _context.DevisModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (devisModel == null)
            {
                return NotFound();
            }

            return View(devisModel);
        }

        // POST: Devis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.DevisModel == null)
            {
                return Problem("Entity set 'DevisContext.DevisModel'  is null.");
            }
            var devisModel = await _context.DevisModel.FindAsync(id);
            if (devisModel != null)
            {
                _context.DevisModel.Remove(devisModel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DevisModelExists(int id)
        {
          return (_context.DevisModel?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
