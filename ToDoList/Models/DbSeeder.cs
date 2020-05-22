using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace ToDoList.Models
{
    static class DbSeeder
    {
        public static void Seed(ToDoListContext context)
        {
            if (!context.ToDoItems.Any())
            {
                context.ToDoItems.Add(new ToDoItem("Sample Task", Priority.Medium));
                context.SaveChanges();
            }
        }
    }
}