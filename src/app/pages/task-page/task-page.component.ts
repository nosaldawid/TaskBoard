import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list-component';

@Component({
  selector: 'app-task-page',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
  standalone: true
})
export class TaskPageComponent {

}
