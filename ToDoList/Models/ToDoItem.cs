﻿using System;
using System.ComponentModel.DataAnnotations;

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
        public ToDoItem()
        {
            Created = DateTime.Now;
        }
        public ToDoItem(string task, Priority priority)
        {
            Task = task;
            Created = DateTime.Now;
            Priority = priority;
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Task is required")]
        public string Task { get; set; }
        public DateTime Created { get; set; }
        public bool Completed { get; set; }
        public Priority Priority { get; set; }

        public void MarkAsCompleted()
        {
            Completed = true;
        }
    }
}