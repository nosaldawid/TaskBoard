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
      title: 'Podstawy Angulara',
      description: 'Komponenty, szablony, binding',
      isDone: false,
    },
    {
      id: 2,
      title: 'Postawienie projektu',
      description: 'Uruchoemienie dev server',
      isDone: true,
    },
    {
      id: 3,
      title: 'Stworzenie komponentu',
      description: 'Wygenerowanie komponentu i wyświetlenie listy',
      isDone: false,
    },
  ]);

  readonly tasks = this._tasks.asReadonly();

  getAll(): Task[] {
    return this._tasks();
  }

  getById(id: number): Task | undefined{
    return this._tasks().find(x => x.id === id);
  }

  toogleDone(id: number) {
    this._tasks.update(current =>
      current.map(task =>
        task.id === id ? 
        { ...task, isDone: !task.isDone} // Pobierz kopię obiektu, zmieniając tylko jedno pole
        : task
      )
    );
  }
}
