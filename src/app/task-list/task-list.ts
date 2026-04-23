import { Component } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  standalone: true,
})
export class TaskList {
  title = 'Task list';

  tasks: Task[] = [
    {
      id: 1,
      title: 'Podstawy Angulara',
      description: 'Komponenty, szablony, binding',
      isDone: false
    },
    {
      id: 2,
      title: 'Postawienie projektu',
      description: 'Uruchoemienie dev server',
      isDone: true
    },
    {
      id: 3,
      title: 'Stworzenie komponentu',
      description: 'Wygenerowanie komponentu i wyświetlenie listy',
      isDone: false
    }
  ];
}
