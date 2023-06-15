import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodaysTodoListComponent } from './todays-todo-list.component';

const routes: Routes = [{ path: '', component: TodaysTodoListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaysTodoListRoutingModule {}
