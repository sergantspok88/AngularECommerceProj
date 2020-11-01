import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterExtService } from 'src/app/helpers/router.service';
import { Alert } from 'src/app/model/alert';
import { Product } from 'src/app/model/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, AfterViewInit {
  private mode: string = 'add';
  //private editProductId: number = -1;

  form: FormGroup;
  loading = false;
  submitted = false;

  public curProduct:Product;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routerExt: RouterExtService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    public datasource: DataSource
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        //id: [''],
        name: ['', Validators.required],
        categoryName: ['', Validators.required],
        description: [''],
        price: ['', Validators.required],
      },
      {
        validator: this.GreaterThanValidator('price', 0),
      }
    );
  }

  //https://www.itsolutionstuff.com/post/angular-validation-password-and-confirm-passwordexample.html
  GreaterThanValidator(controlName: string, value: number) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.value <= value) {
        control.setErrors({ greaterThanValidator: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  //convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
        this.submitted = true;

        //reset alerts on submit
        this.alertService.clear();

        //stop here if from is invalid
        if (this.form.invalid) {
          return;
        }

        const product: Product = {
          //need id for editing
          id: this.datasource.productIdEdit,
          name: this.f.name.value,
          description: this.f.description.value,
          price: this.f.price.value,
          categoryName: this.f.categoryName.value,
        };

        if(this.isAddMode()){
          this.datasource.addProduct(product);
        } else if(this.isEditMode()){
          this.datasource.editProduct(product);
        } else {
          this.alertService.error('Wrong mode: ' + this.mode);
        }

  }

  ngAfterViewInit() {
    //let routeSplit = this.router.url.split('/');
    //console.log('Route: ' + routeSplit[routeSplit.length - 1]);
    if (this.router.url.includes('add-product')) {
      this.mode = 'add';
    } else if (this.router.url.includes('edit-product')) {
      this.mode = 'edit';
      if (this.datasource.productIdEdit < 0) {
        if (!this.routerExt.getPreviousUrl().includes('edit-product')) {
          //navigated here with routerLink
          this.router.navigateByUrl(this.routerExt.getPreviousUrl());
        } else {
          //navigated here with href link - so prevUrl will be currentUrl ergo useless
          this.router.navigateByUrl('/admin');
        }
      } else {
        //set form values to chosen product
        let ind = this.datasource.products.findIndex(p => p.id == this.datasource.productIdEdit);
        if(ind >= 0){
          this.curProduct = this.datasource.products[ind];
          this.f.name.setValue(this.curProduct.name);
          this.f.description.setValue(this.curProduct.description);
          this.f.price.setValue(this.curProduct.price);
          this.f.categoryName.setValue(this.curProduct.categoryName, {onlySelf: true});
        } else {
          this.alertService.error('Can not find product with id: ' + this.datasource.productIdEdit);
        }
      }
    } else {
      this.mode = 'error';
    }
    this.cdr.detectChanges();
  }

  isAddMode(): boolean {
    return this.mode == 'add';
  }

  isEditMode(): boolean {
    return this.mode == 'edit';
  }
}
