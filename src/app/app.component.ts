import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppWrapperComponent, TaskBoardComponent, TaskFormComponent, TaskListComponent } from './components';
import { Task } from './models';
import { TaskService } from './services';

const COMPONENTS = [
  AppWrapperComponent,
  TaskBoardComponent,
  TaskListComponent,
  TaskFormComponent,
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, COMPONENTS],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export class AppComponent {
  tasks = this.taskService.tasks;

  constructor(private taskService: TaskService) { }

  editTask(task: Partial<Task>) {
    this.taskService.editTask(task);
  }

  createTask(task: Task) {
    this.taskService.createTask(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}
