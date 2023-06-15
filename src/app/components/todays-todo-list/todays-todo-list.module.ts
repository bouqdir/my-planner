import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDisplayModeDirective } from 'src/app/directives/todo-display-mode.directive';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FilterTodosComponent } from '../filter-todos/filter-todos.component';
import { TodoComponent } from '../todo/todo.component';
import { TodaysTodoListComponent } from './todays-todo-list.component';
import { FormsModule } from '@angular/forms';
import { TodaysTodoListRoutingModule } from './todays-todo-list-routing.module';

@NgModule({
  declarations: [
    TodoComponent,
    AddTaskComponent,
    FilterTodosComponent,
    TodoDisplayModeDirective,
    TodaysTodoListComponent,
  ],
  imports: [CommonModule, FormsModule, TodaysTodoListRoutingModule],
})
export class TodaysTodoListModule {}
