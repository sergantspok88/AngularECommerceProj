import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private datasource: DataSource,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addProductClick() {
    //alert("Add Product - Not implemented");
    this.router.navigate(['add-product'], { relativeTo: this.route });
  }

  addCategoryClick() {
    alert('Add Category - Not implemented');
  }
}
