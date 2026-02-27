import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-task-list',
  imports: [RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  taskService = inject(TaskService);

  filter = signal<'all' | 'active' | 'completed'>('all');
  filteredTasks = computed(() => {
    switch (this.filter()) {
      case 'all':
        return this.taskService.tasks();
      case 'completed':
        return this.taskService.completedTasks();
      case 'active':
        return this.taskService.activeTasks();
      default:
        return this.taskService.tasks();
    }
  });

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter.set(filter);
  }
}
