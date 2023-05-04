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
    // id: [{value: 0, disabled: true}],
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required]
  });

  readonly id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.id) {
      this.getProduct(this.id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(product => {const {'id':_, ...pr} = product; this.productForm.setValue(pr);});
  }

  onSubmit() {
    if (this.id) {
      this.productService.updateProduct({'id': this.id, ...this.productForm.value} as Product)
        .subscribe(product => {
          this.goBack();
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

  trigger(event: Event) {
    event.preventDefault();

    let element: HTMLElement = document.getElementById('file') as HTMLElement;
    element.click();
  }

  handleImageUpload(event: Event) {
    // check for image to upload
    // this checks if the user has uploaded any file
    const fileList = (event.currentTarget as HTMLInputElement).files as FileList;
    if (fileList && fileList[0]) {
      // calculate your image sizes allowed for upload
      const max_size = 20971510;
      // the only MIME types allowed
      const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
      // max image height allowed
      const max_height = 14200;
      //max image width allowed
      const max_width = 15600;

      // check the file uploaded by the user
      if (fileList[0].size > max_size) {
        //show error
       console.log('max image size allowed is ' + max_size / 1000 + 'Mb');
       return;
      }
      // check for allowable types
      if (!allowed_types.includes(fileList[0].type)) {
        // define the error message due to wrong MIME type
       console.log('The allowed images are: ( JPEG | JPG | PNG )');
        //return false since the MIME type is wrong
       return;
      }
      // define a file reader constant
      const reader = new FileReader();
      // read the file on load
      reader.onload = (e: any) => {
        // create an instance of the Image()
        const image = new Image();
        // get the image source
        image.src = e.target.result;
        // @ts-ignore
        image.onload = rs => {
          // get the image height read
          const img = rs.currentTarget as HTMLImageElement;
          const img_height = img['height'];
          // get the image width read
          const img_width = img['width'];
          // check if the dimensions meet the required height and width
          if (img_height > max_height && img_width > max_width) {
            // throw error due to unmatched dimensions
            console.log(
              'Maximum dimensions allowed: ' +
              max_height +
              '*' +
              max_width +
              'px');
            return;
          } else {
            // otherise get the base64 image
            this.productForm.patchValue({'image': e.target.result});
          }
        };
      };
      // reader as data url
      reader.readAsDataURL(fileList[0]);
    }
  }
}
