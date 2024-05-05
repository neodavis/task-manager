import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppWrapperComponent, TaskFormComponent, TaskListComponent } from './components';
import { Task } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppWrapperComponent, TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  tasks = signal<Task[]>([]);

  updateTasksList(taskUpdateEvent: Pick<Task, "name" | "taskStatus">) {
    const { name, taskStatus } = taskUpdateEvent;
    const task: Task = {
      id: String(new Date().getTime()),
      name,
      taskStatus,
      createdDate: new Date().getTime(),
    }

    this.tasks.update(tasks => [...tasks, task]);
  }
}
