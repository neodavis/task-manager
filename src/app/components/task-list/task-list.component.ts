import { ChangeDetectionStrategy, Component, computed, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

import { Task } from '../../models';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input({ required: true }) tasks!: WritableSignal<Task[]>;

  search = signal<string>('');
  tasksFilteredBySearch = computed(() => this.tasks().filter(task => task.name.includes(this.search().trim())))
  searchControl = new FormControl<string>('');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        tap((value) => this.search.set(value ?? ''))
      )
      .subscribe()
  }
}
