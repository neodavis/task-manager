import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskStatus, Task } from '../../models';

interface TaskForm {
  name: string;
  taskStatus: TaskStatus;
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
    name: '',
    taskStatus: TaskStatus.Backlog,
  })

  @Input() set formData(formData: Pick<Task, 'name' | 'taskStatus'>) {
    this.taskForm.patchValue(formData);
  }

  constructor(private formBuilder: NonNullableFormBuilder) { }

  submitForm() {
    this.formSubmitted.emit(this.taskForm.getRawValue())
  }
}
