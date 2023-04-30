import { Component, OnInit } from '@angular/core';
import { Product } from "../../model/product";
import { ProductService } from "../product.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  colNum = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).pipe(
    map(({ breakpoints }) => {
      if (breakpoints[Breakpoints.XSmall])
        return 1;
      else if (breakpoints[Breakpoints.Small])
        return 1;
      else if (breakpoints[Breakpoints.Medium])
        return 2;
      else if (breakpoints[Breakpoints.Large])
        return 3;
      else if (breakpoints[Breakpoints.XLarge])
        return 3;
      return 2;
    })
  );

  constructor(
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id != id)
    this.productService.deleteProduct(id).subscribe();
  }
}
