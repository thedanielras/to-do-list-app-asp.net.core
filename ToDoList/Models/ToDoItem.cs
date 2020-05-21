using System;

namespace ToDoList.Models
{
    public class ToDoItem
    {
        public ToDoItem(string task)
        {
            Task = task;
            Created = new DateTime();
        }

        public string Task { get; set; }
        public DateTime Created { get; set; }
        public bool Completed { get; set; }
    }
}