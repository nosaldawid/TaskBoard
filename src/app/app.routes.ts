import { Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    component: TaskPageComponent,
    title: 'TaskBoard - Tasks list',
  },
  {
    // :id to parametr
    path: 'tasks/:id',
    component: TaskDetailPageComponent,
    title: 'TaskBoard - Task details',
  },
  {
    // Wildcard ** - catch other routes
    path: '**',
    redirectTo: 'tasks',
  },
];
