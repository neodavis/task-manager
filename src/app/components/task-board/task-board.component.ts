import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output, Signal } from '@angular/core';

import { Task, TaskStatus } from '../../models';
import { TaskListComponent } from '../task-list/task-list.component';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskListComponent, DragDropModule],
})
export class TaskBoardComponent {
  @Input({ required: true }) tasks!: Signal<Task[]>;

  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<Partial<Task>>();

  tasksInBacklog = this.getTasksByStatus(TaskStatus.Backlog);
  tasksInProgress = this.getTasksByStatus(TaskStatus.InProgress);
  tasksInComplete = this.getTasksByStatus(TaskStatus.Completed);
  tasksInBlocked = this.getTasksByStatus(TaskStatus.Blocked);
  tasksOnHold = this.getTasksByStatus(TaskStatus.OnHold);

  readonly TaskStatus = TaskStatus;

  private getTasksByStatus(status: TaskStatus) {
    return computed(() => this.tasks().filter(task => task.taskStatus === status));
  }

  moveIntoStatus(event: CdkDragDrop<Task[], Task>, newStatus: TaskStatus) {
    const taskWithNewStatus: Task = {
      ...event.item.data,
      modifiedDate: new Date().getTime(),
      taskStatus: newStatus
    }

    this.taskEdited.emit(taskWithNewStatus)
  }
}
