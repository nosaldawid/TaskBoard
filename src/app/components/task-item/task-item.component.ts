import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  standalone: true,
})
export class TaskItemComponent {
  // input() - sposób definiowania wejść komponentu
  // W szablonie odczytujemy wartość jak funkcję: task().title
  task = input.required<Task>();

  toogle = output<void>();
  remove = output<void>();
  titleChange = output<string>();

  readonly isEditing = signal(false);
  readonly draftTitle = signal('');

  // viewChild() łączy się z elementem oznaczonym #editInput w szablonie
  // ElementRef<HTMLInputElement> określenie jakiego typu jest natywny element - dzięki czemu jest dostęp np do .focus()
  readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor() {
    // effect() - funkcja uruchamiana gdy zmieni się w niej dowolnym odczytywany signal
    effect(() => {
      if (this.isEditing()) {
        const input = this.editInput();
        if (input) {
          setTimeout(() => {
            input.nativeElement.focus();
            input.nativeElement.select();
          });
        }
      }
    });
  }

  // Wysłanie zdarzenia do rodzica
  onClick(): void {
    this.toogle.emit();
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation(); // zablokuj bubbling do <li>
    this.remove.emit();
  }

  startEditing(event: MouseEvent): void {
    event.stopPropagation();
    this.draftTitle.set(this.task().title);
    this.isEditing.set(true);
  }

  saveEdit(): void {
    const newTitle = this.draftTitle().trim();

    if (newTitle.length === 0) {
      this.cancelEdit();
      return;
    }

    if (newTitle !== this.task().title) {
      this.titleChange.emit(newTitle);
    }

    this.isEditing.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.saveEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancelEdit();
    }
  }
}