import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'categoryList',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  constructor(private datasource: DataSource) {}

  ngOnInit(): void {}

  get categories(): Category[] {
    return this.datasource.categories;
  }
  setCategory(name: string) {
    this.datasource.setChosenCategory(name);
  }

  categoryActive(name: string): boolean {
    return name === this.datasource.getChosenCategoryName();
  }

  resetCategory() {
    this.datasource.setChosenCategory('');
  }
}
