import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Task } from '../../models';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
}
