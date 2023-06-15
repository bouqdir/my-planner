import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

export enum MODE {
  Edit = 'EDIT',
  Display = 'DISPLAY',
}

@Component({
  selector: 'todo-card',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnChanges {
  @Input() todo: Todo;

  public mode = MODE;
  public currentMode: MODE;
  public done: boolean;
  public todoContentEdit: string;

  constructor(private todoService: TodoService) {
    this.currentMode = MODE.Display;
    this.done = false;
    this.todoContentEdit = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Todo changed : ', changes);
  }

  public onDeleteTodo(todo: Todo): void {
    this.todoService.removeTodo(todo.id);
  }

  public onSaveEditTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
    this.currentMode = MODE.Display;
  }

  public disableEdit(): void {
    this.todo.content = this.todoContentEdit;
    this.currentMode = MODE.Display;
  }

  public enableEdit(): void {
    this.todoContentEdit = this.todo.content;
    this.currentMode = MODE.Edit;
  }

  public onCheckChange(): void {
    this.todoService.updateTodo(this.todo);
  }
}
