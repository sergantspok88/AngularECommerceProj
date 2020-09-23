import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private datasource: DataSource) {}

  ngOnInit(): void {}

}
