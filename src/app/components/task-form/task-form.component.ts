import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStatus, Task } from '../../models';

interface TaskForm {
  name: FormControl<string>;
  taskStatus: FormControl<TaskStatus>;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  @Output() formSubmitted = new EventEmitter<Pick<Task, 'name' | 'taskStatus'>>();

  readonly taskForm = this.formBuilder.group<TaskForm>({
    name: this.formBuilder.control('', [Validators.required]),
    taskStatus: this.formBuilder.control(TaskStatus.Backlog),
  })

  @Input() set formData(formData: Pick<Task, 'name' | 'taskStatus'>) {
    this.taskForm.patchValue(formData);
  }

  constructor(private formBuilder: NonNullableFormBuilder) { }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.getRawValue())
  }

  protected readonly TaskStatus = TaskStatus;
}
