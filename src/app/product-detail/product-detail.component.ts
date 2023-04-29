import { Component } from '@angular/core';
import { Product } from "../../model/product";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product | undefined;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const id = 12;
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }
}
