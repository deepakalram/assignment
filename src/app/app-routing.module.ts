import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinListComponent } from './components/pin-list/pin-list.component';

const routes: Routes = [
  /* single page that's why not required notfound page so redirect to our list page */
  {
    path: '**',
    component: PinListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
