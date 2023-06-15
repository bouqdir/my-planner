import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  public currentTodocontent: string;

  constructor(private todoService: TodoService) {
    this.currentTodocontent = '';
  }

  public onAddTask(): void {
    this.todoService.addTodo(this.currentTodocontent);
    this.currentTodocontent = '';
  }
  
}
