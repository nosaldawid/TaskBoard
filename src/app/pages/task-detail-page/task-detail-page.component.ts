import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task/task-service';

@Component({
  selector: 'app-task-detail-page',
  imports: [RouterLink],
  templateUrl: './task-detail-page.component.html',
  styleUrl: './task-detail-page.component.css',
})
export class TaskDetailPageComponent {
  private readonly taskService = inject(TaskService);

  readonly id = input<string>('');

  readonly task = computed(() => {
    const numericId = Number(this.id());
    return this.taskService.tasks().find((t) => t.id === numericId);
  });
}
