import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../../services/todo.service';
import { FILTERBY } from '../filter-todos/filter-todos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'todo-todays-list',
  templateUrl: './todays-todo-list.component.html',
  styleUrls: ['./todays-todo-list.component.scss'],
})
export class TodaysTodoListComponent implements OnInit {
  public tasks: Todo[];
  public todaysDate: Date;
  public draggingIndex: number;
  public currentFilter: FILTERBY;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.tasks = this.todoService.tasks; // using the tasks list used in the service : single source of truth
    this.todaysDate = new Date();
    this.currentFilter = FILTERBY.ALL;
  }
  ngOnInit(): void {
    //refresh the list whenever a todo is changed by the service
    this.todoService.onTodoChange.subscribe(() => {
      this.refreshList();
    });

    this.route.params.subscribe(
      (params) => (this.currentFilter = params['filterValue'])
    );
  }

  public deleteAll(): void {
    this.todoService.clearList();
    this.refreshList();
  }

  public getCurrentFilter(value: FILTERBY): void {
    this.currentFilter = value;
    this.refreshList();
  }

  public refreshList(): void {
    switch (this.currentFilter) {
      case FILTERBY.DONE:
        this.tasks = this.todoService.tasks.filter((t) => t.isDone);
        // route to /today/done
        break;
      case FILTERBY.TO_BE_DONE:
        this.tasks = this.todoService.tasks.filter((t) => !t.isDone);
        // route to /today/tobedone

        break;
      default:
        this.tasks = this.todoService.tasks;
      // route to /today/all
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
