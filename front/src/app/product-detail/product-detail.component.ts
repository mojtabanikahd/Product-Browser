import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../model/product";
import { ProductService } from "../product.service";
import { Location } from "@angular/common";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product | undefined;
  colNum: number = 2;
  math = Math;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map(({ breakpoints }) => {
        if (breakpoints[Breakpoints.XSmall])
          this.colNum = 1;
        else if (breakpoints[Breakpoints.Small])
          this.colNum = 1;
        else if (breakpoints[Breakpoints.Medium])
          this.colNum = 2;
        else if (breakpoints[Breakpoints.Large])
          this.colNum = 3;
        else if (breakpoints[Breakpoints.XLarge])
          this.colNum = 3;
        return 2;
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack() {
    this.location.back();
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe( () => this.goBack());
  }
}
