import { DatashowComponent } from './datashow/datashow.component';
import { ExceptionComponent } from './exception/exception.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'datashow',
        pathMatch: 'full'
      },
      {
        path: 'datashow/:area',
        component: DatashowComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: ExceptionComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MainRoutingModule { }
