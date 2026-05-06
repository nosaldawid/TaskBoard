import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  
  // RouterOutlet      — slot, w którym Angular renderuje aktywną stronę.
  // RouterLink        — dyrektywa <a routerLink="/tasks">.
  // RouterLinkActive  — dyrektywa nadająca klasę CSS aktywnemu linkowi.  
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TaskBoard');
}
