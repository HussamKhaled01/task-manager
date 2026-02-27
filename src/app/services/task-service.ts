import { computed, Injectable, signal } from '@angular/core';

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

  completedTasks = computed(() => {
    return this.tasksSignal().filter((tasks) => tasks.completed);
  });
  activeTasks = computed(() => {
    return this.tasksSignal().filter((tasks) => !tasks.completed);
  });

  getTask(id: number){
    return this.tasksSignal().find(task => task.id === id);
  }

  deleteTask(id: number) {
    this.tasksSignal.update((tasks) =>{
      return tasks.filter(task => task.id !== id);
    });
  }


  addTask(title: string, description: string) {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      completed: false,
      CreatedAt: new Date(),
    };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
  }
}
