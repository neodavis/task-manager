import { ChangeDetectionStrategy, Component, computed, Input, Signal } from '@angular/core';

import { Task, TaskStatus } from '../../models';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskListComponent],
})
export class TaskBoardComponent {
  @Input({ required: true }) tasks!: Signal<Task[]>;

  tasksInBacklog = this.getTasksByStatus(TaskStatus.Backlog);
  tasksInProgress = this.getTasksByStatus(TaskStatus.InProgress);
  tasksInComplete = this.getTasksByStatus(TaskStatus.Complete);
  tasksInBlocked = this.getTasksByStatus(TaskStatus.Blocked);
  tasksOnHold = this.getTasksByStatus(TaskStatus.OnHold);

  private getTasksByStatus(status: TaskStatus) {
    return computed(() => this.tasks().filter(task => task.taskStatus === status));
  }

  protected readonly TaskStatus = TaskStatus;
}
