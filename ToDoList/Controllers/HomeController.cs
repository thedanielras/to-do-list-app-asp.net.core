﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ToDoListContext _context;

        public HomeController(ILogger<HomeController> logger, ToDoListContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            var toDoItems = _context.ToDoItems.ToList();
            return View(toDoItems);
        }

        [HttpPost]
        public IActionResult Add(ToDoItem toDoItem)
        {
            if (ModelState.IsValid)
            {
                _context.ToDoItems.Add((toDoItem));
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult Edit(ToDoItem toDoItem)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _context.Entry(toDoItem);
                    entity.State = EntityState.Modified;
                    entity.Property("Created").IsModified = false;
                    
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error updating entity");
                    return StatusCode(500);
                }
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult MarkCompleted(int? toDoItemId)
        {
            if (toDoItemId == null) return StatusCode(500);
            ToDoItem item = _context.ToDoItems.FirstOrDefault(t => t.Id == toDoItemId);

            if (item != null)
            {
                item.MarkAsCompleted();
                _context.SaveChanges();

                return Json(item);
            }

            return StatusCode(500);
        }

        [HttpPost]
        public IActionResult RemoveToDo(int? toDoItemId)
        {
            if (toDoItemId == null) return StatusCode(500);
            ToDoItem item = _context.ToDoItems.FirstOrDefault(t => t.Id == toDoItemId);

            if (item != null)
            {
                _context.Entry(item).State = EntityState.Deleted;
                _context.SaveChanges();

                return Json(item);
            }

            return StatusCode(500);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}