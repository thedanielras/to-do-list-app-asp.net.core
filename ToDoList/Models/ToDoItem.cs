using System;

namespace ToDoList.Models
{
    public enum Priority
    {
        Low,
        Medium,
        High
    }
    public class ToDoItem
    {
        public ToDoItem(string task, Priority priority)
        {
            Task = task;
            Created = DateTime.Now;
            Priority = priority;
        }

        public int Id { get; set; }
        public string Task { get; set; }
        public DateTime Created { get; set; }
        public bool Completed { get; set; }
        public Priority Priority { get; set; }
    }
}