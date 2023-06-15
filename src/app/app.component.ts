import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from './services/todo.service';
import { FILTERBY } from './components/filter-todos/filter-todos.component';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // all variables are declared here, then initialized in the constructor

  public tasks: Todo[];
  public todaysDate: Date;
  public draggingIndex: number;
  public currentFilter: string;
  public filterValue: FILTERBY;

  constructor(private todoService: TodoService) {
    this.tasks = this.todoService.tasks; // using the tasks list used in the service : single source of truth
    this.todaysDate = new Date();

    //refresh the list whenever a todo is changed by the service
    this.todoService.onTodoChange.subscribe((response) => {
      this.refreshList();
    });
  }

  ngOnInit(): void {}

  public deleteAll(): void {
    this.todoService.clearList();
    this.refreshList();
  }

  public getCurrentFilter(value: string): void {
    this.currentFilter = value;
    this.refreshList();
  }

  public refreshList(): void {
    switch (this.currentFilter) {
      case FILTERBY.DONE:
        this.tasks = this.todoService.tasks.filter((t) => t.isDone);
        break;
      case FILTERBY.TO_BE_DONE:
        this.tasks = this.todoService.tasks.filter((t) => !t.isDone);
        break;
      default:
        this.tasks = this.todoService.tasks;
    }
  }

  // Drag and drop todo cards
  public reorderTasks(fromIndex: number, toIndex: number): void {
    const taskToBeReordered = this.tasks.splice(fromIndex, 1)[0];
    this.tasks.splice(toIndex, 0, taskToBeReordered);
    this.draggingIndex = toIndex;
  }

  public onDragStart(index: number): void {
    this.draggingIndex = index;
  }

  public onDragEnter(index: number): void {
    if (this.draggingIndex !== index) {
      this.reorderTasks(this.draggingIndex, index);
    }
  }
  public onDragEnd(): void {
    this.draggingIndex = -1;
  }
}
