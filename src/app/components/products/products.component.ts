import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductCardDirective } from '../../directives/product-card.directive';
import { Icategory } from '../../models/icategory';
import { Iproduct } from '../../models/iproduct';
import { CreditCardFormatPipe } from '../../pipes/credit-card-format.pipe';
import { EgyptianNationalIdPipe } from '../../pipes/egyptian-national-id.pipe';
import { ApiProductsService } from '../../services/api-products.service';
import { StaticProductsService } from '../../services/static-products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,ProductCardDirective,EgyptianNationalIdPipe,CreditCardFormatPipe,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges,OnInit{
  products:Iproduct[] = [] as Iproduct[] ;
  nationalId:number = 14;
  filteredProducts:Iproduct[];
  boughtProducts: Iproduct[] = [];
  totalOrderPrice: number = 0;
  num:number = 16;

  @Output() onProductBought: EventEmitter<Iproduct>
  @Input() recievedCatId:number=0
  // private _StaticProductsService: any;

  constructor(private _ApiProductsServices:ApiProductsService,
    private router:Router)
    {
    // this.products =this._StaticProductsService.getAllProducts()

    this.filteredProducts=this.products
    this.onProductBought=new EventEmitter<Iproduct>();
  }
  ngOnInit(): void {
    this._ApiProductsServices.getAllProducts().subscribe({
      next: (res)=>{
        this.products=res;
        this.filteredProducts=this.products
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnChanges() {
    this._ApiProductsServices.getProductBycatId(this.recievedCatId).subscribe({
      next: (res)=>{
        this.filteredProducts=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
   }
    change(){
    }
    buyProduct(product: Iproduct) {
    if (product.quantity > 0) {
      product.quantity--;
    }
    this.onProductBought.emit(product);
 }
 navigateToDetails(id:number) {
  this.router.navigate(['/Details',id]);
}
deleteProduct(id: number): void {
  this._ApiProductsServices.deleteProduct(id).subscribe({
    next: () => {
      const index = this.filteredProducts.findIndex(
        (product) => product.id == id
      );

      if (index != -1) {
        this.filteredProducts.splice(index, 1);
      }
    },
    error: (error) => {
      console.error('Error deleting product:', error);
    },
  });
}
}




  // filterProducts(){
  //   if(this.recievedCatId==0){
  //     this.filteredProducts=this.products
  //   }else{
  //     this.filteredProducts=this.products.filter((prd)=>prd.catId==this.recievedCatId)
  //   }
  //  }



