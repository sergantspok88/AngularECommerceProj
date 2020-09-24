import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  addProductClick() {
    //alert("Add Product - Not implemented");
    this.router.navigate(['add-product'], { relativeTo: this.route });
  }

  addCategoryClick() {
    alert('Add Category - Not implemented');
  }
}
