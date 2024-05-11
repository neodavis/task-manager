import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect, EventEmitter,
  inject,
  Injector,
  Input,
  OnInit, Output,
  Signal,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { Task, TaskStatus } from '../../models';
import { TaskComponent } from '../task/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule, TaskComponent, DragDropModule],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input({ required: true }) taskStatus!: TaskStatus;
  @Input({ required: true }) tasks!: Signal<Task[]>;

  @Output() taskDeleted = new EventEmitter<string>();

  tasksFilteredBySearch = computed(() => this.tasks().filter(task => task.name.includes(this.search().trim())))
  searchControl = new FormControl<string>('');

  private search = signal<string>('');
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);

  ngOnInit() {
    effect(() => this.tasks().length ? this.searchControl.enable() : this.searchControl.disable(), { injector: this.injector })

    this.searchControl.valueChanges
      .pipe(
        tap((value) => this.search.set(value ?? '')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe()
  }
}
