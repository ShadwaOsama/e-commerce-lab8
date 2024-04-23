import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { ApiProductsService } from '../../services/api-products.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  productData: undefined | Iproduct;
  productMessage: undefined | string;
  categories: any[] | undefined; // Define the categories property

  constructor(private route: ActivatedRoute, private _ApiProductsService: ApiProductsService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this._ApiProductsService.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });

    // Fetch categories from your service and assign them to the categories property
    this._ApiProductsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this._ApiProductsService.updateProduct(data.id, data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
  }
}
