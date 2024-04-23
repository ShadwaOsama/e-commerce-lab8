import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,OrderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerceApp';
  dir:string='ltr'
  language$:Observable<string>
  constructor(private store:Store<{language:string}>){
    this.language$=this.store.select('language')
    this.language$.subscribe((lang)=>{
      if (lang==="ar"){
        this.dir="rtl"
      }else{
        this.dir="ltr"
      }
    })
  }

}

