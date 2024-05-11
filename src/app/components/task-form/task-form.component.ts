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
  @Output() formSubmitted = new EventEmitter<Task>();

  readonly TaskStatus = TaskStatus;
  readonly taskForm = this.formBuilder.group<TaskForm>({
    name: this.formBuilder.control('', [Validators.required]),
    taskStatus: this.formBuilder.control(TaskStatus.Backlog),
  })

  constructor(private formBuilder: NonNullableFormBuilder) { }

  submitForm() {
    const { name, taskStatus } = this.taskForm.getRawValue();
    const createdTask: Task = {
      name,
      taskStatus,
      id: String(new Date().getTime()),
      createdDate: new Date().getTime(),
    }

    this.formSubmitted.emit(createdTask)
  }
}
