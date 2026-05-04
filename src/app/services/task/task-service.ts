import { Injectable, signal } from '@angular/core';
import { Task } from '../../models/task';

// Dekorator @Injectable oznacza, że ta klasa może być wstrzyknięta przez DI
@Injectable({
  // providedIn: 'root' — rejestruje serwis w głównym injectorze aplikacji, dzięki lazy-loading zostanie utworzony dopiero gdy będzie potrzebny.
  // Efekt: jedna instancja (singleton) współdzielona przez całą aplikację.
  providedIn: 'root',
})
export class TaskService {
  // signal() -
  // - pozwala odczytać wartość przez wywołanie funkcji: this.tasks()
  // - pozwala zaktualizować wartość przez .set() lub .update()
  // - autoamtycznie odświezą widoki
  private readonly _tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Angular basics',
      description: 'Components, Templates, Bingind',
      isDone: false,
    },
    {
      id: 2,
      title: 'First project',
      description: 'Run dev server',
      isDone: true,
    },
    {
      id: 3,
      title: 'Create component',
      description: 'Generate component and show list',
      isDone: false,
    },
  ]);

  readonly tasks = this._tasks.asReadonly();

  getAll(): Task[] {
    return this._tasks();
  }

  getById(id: number): Task | undefined {
    return this._tasks().find((x) => x.id === id);
  }

  toogleDone(id: number) {
    this._tasks.update((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, isDone: !task.isDone } // Pobierz kopię obiektu, zmieniając tylko jedno pole
          : task,
      ),
    );
  }

  // Omit<Task, 'id' | 'isDone'> to typ pomocniczy TypeScript, który umożliwia pominięcie określonych pól
  // w tym wypadku pól 'id' i 'isDone'
  addTask(input: Omit<Task, 'id' | 'isDone'>) {
    this._tasks.update((current) => {
      const nextId = current.length === 0 ? 1 : Math.max(...current.map((t) => t.id)) + 1;

      const newTask: Task = {
        id: nextId,
        title: input.title,
        description: input.description,
        isDone: false,
      };

      // Zwróć nową tabilę z dodanym elementem
      // Pomiń current.push() aby nie modyfikować orginału
      return [...current, newTask];
    });
  }

  removeTask(id: number) {
    this._tasks.update((current) => current.filter((task) => task.id != id));
  }

  // Partial<Task> wszystkie pola typu Task są opcjonalne
  updateTask(id: number, changes: Omit<Partial<Task>, 'id'>) {
    this._tasks.update((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, ...changes } // Nadpisanie pól z changes do task
          : task,
      ),
    );
  }
}
