import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SiderComponent } from './sider/sider.component';
import { RightComponent } from './right/right.component';
import { HeaderComponent } from './header/header.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent, SiderComponent, RightComponent, HeaderComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
