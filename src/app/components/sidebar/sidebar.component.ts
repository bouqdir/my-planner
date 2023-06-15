import { Component } from '@angular/core';
import { FILTERBY } from '../filter-todos/filter-todos.component';

@Component({
  selector: 'todo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public filterValue: FILTERBY;

  constructor() {
    this.filterValue = FILTERBY.DONE;
  }
}
