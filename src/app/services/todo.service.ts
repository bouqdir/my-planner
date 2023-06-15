import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {
  FILTERBY,
  FilterTodosComponent,
} from '../components/filter-todos/filter-todos.component';

interface JSONTodo {
  _id: number;
  _content: string;
  _isDone: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly key = 'tasks';
  private _tasks: Todo[];
  protected todo: Todo;
  public currentFilter: FILTERBY;

  public onTodoChange: EventEmitter<void>;

  /**
   * Whats the ideal value to emit in order to refresh knowing that
    the emmited value will never be used in the refresh ?!

    ===> we can emit void, better emit the changed value
    Tip: use separate event emitters for every event
   */

  constructor() {
    this.todo = new Todo();
    this.onTodoChange = new EventEmitter<void>();
    this.currentFilter = FILTERBY.ALL;
    this.getAllTodos();
  }

  get tasks(): Todo[] {
    return this._tasks;
  }

  set tasks(tasks: Todo[]) {
    this._tasks = tasks;
  }

  public getAllTodos(): void {
    this.tasks = [];

    if (localStorage.getItem(this.key) !== null) {
      let jsonTodos: JSONTodo[] = [];
      jsonTodos = JSON.parse(localStorage.getItem(this.key)!);
      jsonTodos.forEach((t) => {
        //this.tasks.push(Object.assign(new Todo(), t)); // better use a constructor with params to avoid creating the Object instance then copy
        this.tasks.push(new Todo(t._id, t._content, t._isDone));
      });
    }
  }

  public generateId(): number {
    let randomId = Math.random() * Number.MAX_VALUE;
    let exists =
      this.tasks.find((task) => task.id === randomId) !== undefined
        ? true
        : false;

    if (exists) {
      this.generateId();
    }

    return randomId;
  }

  public addTodo(content: string): Todo {
    let todo = new Todo();
    todo.id = this.generateId();
    todo.content = content;
    todo.isDone = false;

    this.tasks.push(todo);
    localStorage.setItem(this.key, JSON.stringify(this.tasks));

    this.onTodoChange.emit();
    return todo;
  }

  public updateTodo(todo: Todo): void {
    this.removeTodo(todo.id);
    this.tasks.push(todo);
    localStorage.setItem(this.key, JSON.stringify(this.tasks));
    this.onTodoChange.emit();
  }

  public removeTodo(id: number): void {
    let todoChange = new Todo();
    this.tasks.forEach((todo, index) => {
      if (todo.id === id) {
        todoChange = todo;
        this.tasks.splice(index, 1);
      }
    });
    this.onTodoChange.emit();
    localStorage.setItem(this.key, JSON.stringify(this.tasks));
  }

  public clearList(): void {
    localStorage.removeItem(this.key);
    this.tasks = [];
    this.onTodoChange.emit();
  }
}
