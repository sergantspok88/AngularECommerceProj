import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  constructor(private datasource: DataSource) {}

  ngOnInit(): void {}

  get categories(): Category[] {
    return this.datasource.categories;
  }

  setCategory(name: string, event) {
    if (event.target !== event.currentTarget) return;
    if (name == this.datasource.getChosenCategoryName()) {
      this.resetCategory();
    } else {
      this.datasource.setChosenCategory(name);
    }
  }

  categoryActive(name: string): boolean {
    return name === this.datasource.getChosenCategoryName();
  }

  resetCategory() {
    this.datasource.setChosenCategory('');
  }

  categoryDeleteClick(categoryName) {
    alert('Delete category: ' + categoryName + ' - Not implemented');
  }

  categoryEditClick(categoryName) {
    alert('Delete category: ' + categoryName + ' - Not implemented');
  }
}
