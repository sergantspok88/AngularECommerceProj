import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/model/repository';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'categoryList',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
  }

  get categories(): Category[]{
    return this.repo.getCategories();
  }

}
