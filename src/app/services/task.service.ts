import { Injectable, Signal, signal } from '@angular/core';
import { Task } from '../models';

// TODO: replace with better naming for service abstraction (<I> prefix is deprecated in community)
interface ITaskService {
  editTask: (task: Task) => void;
  createTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;

  get tasks(): Signal<Task[]>;
}

@Injectable()
export class TaskService implements ITaskService {
  private _tasks = signal<Task[]>([]);

  get tasks() {
    return this._tasks.asReadonly();
  }

  editTask(task: Partial<Task>) {
    this._tasks.update(tasks => {
      const existingTaskIndex = tasks.findIndex(item => item.id === task.id);
      const updatedTasks = [...tasks];

      updatedTasks[existingTaskIndex] = {
        ...updatedTasks[existingTaskIndex],
        ...task,
        modifiedDate: new Date().getTime(),
      };

      return updatedTasks;
    });
  }

  createTask(task: Task) {
    this._tasks.update(tasks => [...tasks, task]);
  }

  deleteTask(taskId: string) {
    this._tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }
}
