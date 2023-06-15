import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

export const appRouteList: Routes = [
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'today',
    loadChildren: () =>
      import('./components/todays-todo-list/todays-todo-list.module').then(
        (m) => m.TodaysTodoListModule
      ),
  },

  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRouteList)],
})
export class AppRoutingModule {}
