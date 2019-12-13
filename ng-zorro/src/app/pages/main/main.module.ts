import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ExceptionComponent } from './exception/exception.component';
import { DatashowComponent } from './datashow/datashow.component';

@NgModule({
  declarations: [
    MainComponent,
    ExceptionComponent,
    DatashowComponent
  ],
  imports: [CommonModule, MainRoutingModule, NgZorroAntdModule]
})
export class MainModule {}
