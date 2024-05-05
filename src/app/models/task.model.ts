import { TaskStatus } from './task-status.model';

export interface Task {
  id: string;
  name: string;
  taskStatus: TaskStatus;
  createdDate: number;
  modifiedDate?: number;
}
