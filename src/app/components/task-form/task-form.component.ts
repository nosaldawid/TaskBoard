import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task/task-service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  standalone: true
})
export class TaskFormComponent {
  private readonly taskService = inject(TaskService);

  readonly title = signal('');
  readonly description = signal('');

  // Computed - reaktywna walidacja
  // Aktualizuje się atyomatycznie przy zmianie title/description
  readonly isValid = computed(
    () => this.title().trim().length > 0 && this.description().trim().length > 0
  );

  onSubmit(): void {
    if (!this.isValid()) {
      return;
    }

    this.taskService.addTask({
      title: this.title().trim(),
      description: this.description().trim(),
    });

    this.title.set('');
    this.description.set('');
  }
}
