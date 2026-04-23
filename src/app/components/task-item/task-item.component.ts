import { Component, input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  standalone: true
})
export class TaskItemComponent {
  // input() - sposób definiowania wejść komponentu
  // W szablonie odczytujemy wartość jak funkcję: task().title
  task = input.required<Task>();
}