import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

export enum FILTERBY {
  DONE = 'done',
  TO_BE_DONE = 'to be done',
  ALL = 'all',
}

@Component({
  selector: 'todo-filter',
  templateUrl: './filter-todos.component.html',
  styleUrls: ['./filter-todos.component.scss'],
})
export class FilterTodosComponent implements OnInit {
  public filterBy = FILTERBY; // used to compare value in the html file
  public currentFilter: FILTERBY; // used to apply styles with the ngClass

  @Output() usedFilter: EventEmitter<FILTERBY>; // try using eventemitter

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
    this.currentFilter = FILTERBY.ALL;
    this.usedFilter = new EventEmitter<FILTERBY>();
  }
  ngOnInit(): void {}

  public filterByState(filterValue: FILTERBY): void {
    this.currentFilter = filterValue;
    this.usedFilter.emit(this.currentFilter);
    //FilterTodosComponent.onFilterChange.emit(this.currentFilter);
  }

  public deleteAll(): void {
    this.todoService.clearList();
  }
}
