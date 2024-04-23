import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { VisionComponent } from './components/vision/vision.component';
import { ValuesComponent } from './components/values/values.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'Home'},
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  { path: 'AddProduct', component: AddProductComponent },
  {path:'Register' , component: RegisterComponent},

  { path: 'update-product/:id', component: UpdateProductComponent },

  {path:'Details/:id',component:DetailsComponent},

  {path:'AboutUs',component:AboutUsComponent,children:[
    {path:'',pathMatch:'full',redirectTo:'vision'},
    {path:'vision',component:VisionComponent},
    {path:'values',component:ValuesComponent}
  ],
},
  {path:'ContactUs',component:ContactUsComponent},
  { path: 'Products', loadComponent: ()=>import('./components/products/products.component').then((obj)=>obj.ProductsComponent)},
  {path:'**',component:NotFoundComponent},

];
