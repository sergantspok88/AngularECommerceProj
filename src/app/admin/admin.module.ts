import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { CategoryListComponent } from './list/category-list/category-list.component';
import { ProductListComponent } from './list/product-list/product-list.component';



@NgModule({
  declarations: [LayoutComponent, ListComponent, CategoryListComponent, ProductListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
