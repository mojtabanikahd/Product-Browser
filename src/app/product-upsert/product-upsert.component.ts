import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product } from "../../model/product";
import { Location } from "@angular/common";

@Component({
  selector: 'app-product-upsert',
  templateUrl: './product-upsert.component.html',
  styleUrls: ['./product-upsert.component.scss']
})
export class ProductUpsertComponent implements OnInit {
  productForm = this.fb.group({
    id: [{value: 0, disabled: true}],
    name: ['', Validators.required],
    description: [''],
    image: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(product => this.productForm.setValue(product));
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.updateProduct({'id': id, ...this.productForm.value} as Product)
        .subscribe(product => {
          this.router.navigate([`/product/${id}`]);
        });
    } else {
      this.productService.addProduct(this.productForm.value as Product)
        .subscribe(product => {
          this.router.navigate(['/products']);
        });
    }
    console.warn(this.productForm.value);
  }

  goBack() {
    this.location.back();
  }

}
