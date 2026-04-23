import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task/task-service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.css',
  standalone: true,
})
export class TaskListComponent {
  title = 'My task list';

  // inject() pobieranie zależnośći z DI (alternatywa dla konstruktora)
  private readonly taskService = inject(TaskService);
  // alternatywa
  // constructor (private taskService: TaskService){ }

  readonly tasks = this.taskService.tasks;

  // computed() - wartość jest automatycznie obliczana na podstawie innych signal
  readonly totalCount = computed(() => this.tasks().length);

  readonly doneCount = computed(() => this.tasks().filter((x) => x.isDone).length);

  onToggle(id: number): void {
    this.taskService.toogleDone(id);
  }
}
