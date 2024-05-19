import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { Task } from '../../models';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DatePipe],
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<Partial<Task>>();

  editMode = signal<boolean>(false);

  nameControl = new FormControl<string>('', [Validators.required]);

  changeEditMode(editMode: boolean) {
    this.editMode.set(editMode);

    if (editMode) {
      setTimeout(() => document.querySelector<HTMLInputElement>('#name-control')?.focus());
      this.nameControl.setValue(this.task.name);
    }
  }

  applyEditChanges() {
    const editedTask: Task = {
      ...this.task,
      name: this.nameControl.value ?? '',
    }

    this.taskEdited.emit(editedTask);
    this.changeEditMode(false);
  }
}
