import {
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef, inject,
  Input,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { Task, TaskStatus } from '../../models';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule, TaskComponent],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input({ required: true }) taskStatus!: TaskStatus;
  @Input({ required: true }) tasks!: Signal<Task[]>;

  tasksFilteredBySearch = computed(() => this.tasks().filter(task => task.name.includes(this.search().trim())))
  searchControl = new FormControl<string>('');

  private search = signal<string>('');
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        tap((value) => this.search.set(value ?? '')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe()
  }
}
