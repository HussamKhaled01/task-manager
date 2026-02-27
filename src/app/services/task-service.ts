import { Injectable, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  CreatedAt: Date;   
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSignal = signal<Task[]>([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      completed: false,
      CreatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: true,
      CreatedAt: new Date('2024-02-01'),
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      completed: false,
      CreatedAt: new Date('2024-03-01'),
    }
  ]);
  tasks = this.tasksSignal.asReadonly();

  getTask(id: number){
    return this.tasksSignal().find(task => task.id === id);
  }
}
