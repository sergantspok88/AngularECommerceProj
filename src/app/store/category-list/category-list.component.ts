import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/model/repository';
import { Category } from 'src/app/model/category.model';
import { DataSource } from 'src/app/model/datasource';

@Component({
  selector: 'categoryList',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  constructor(
    //private repo: Repository
    private datasource: DataSource
  ) {}

  ngOnInit(): void {}

  get categories(): Category[] {
    //return this.repo.getCategories();
    return this.datasource.categories;
  }
  setCategory(name: string){
    this.datasource.setChosenCategory(name);
  }

  categoryActive(name: string): boolean {
    return (name === this.datasource.getChosenCategoryName());
  }

  resetCategory(){
    this.datasource.setChosenCategory("");
  }
}
