import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Icategory } from '../models/icategory';
import { Iproduct } from '../models/iproduct';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  constructor(private httClient: HttpClient,private _UserAuthService:UserAuthService) {}

  getAllProducts(): Observable<Iproduct[]> {
    return this.httClient.get<Iproduct[]>(`${environment.baseUrl}/products`,{
      headers:new HttpHeaders({
        "authorization":this._UserAuthService.getToken()
      })
    });
  }
  getCategories(): Observable<Icategory[]> {
    return this.httClient.get<Icategory[]>(`${environment.baseUrl}/categories`);
  }
  getProduct(productId: string): Observable<Iproduct> {
    return this.httClient.get<Iproduct>(`${environment.baseUrl}/products/${productId}`);
  }


  // constructor(private httClient:HttpClient) { }
  // getAllProducts():Observable<Iproduct[]>{
  //   return this.httClient.get<Iproduct[]>(`${environment.baseUrl}/products`)

  // }
  getProductById(id:number):Observable<Iproduct>{
    return this.httClient.get<Iproduct>(`${environment.baseUrl}/products/${id}`)

  }
  getProductBycatId(catId:number):Observable<Iproduct[]>{
    let searchString = new HttpParams()
    searchString = searchString.append("catId",catId)
    searchString = searchString.append("limit",5)


  return  this.httClient.get<Iproduct[]>(`${environment.baseUrl}/products?`,{
    //params: new HttpParams().set("catId",catId)
    params: searchString
  })
  }
  addProduct(newPrd:Iproduct):Observable<Iproduct>{
    return this.httClient.post<Iproduct>(`${environment.baseUrl}/products`,JSON.stringify(newPrd));
  }
  deleteProduct(id:number):Observable<any>{
    return this.httClient.delete(`${environment.baseUrl}/products/${id}`);
  }
  updateProduct(id: number, productData: any): Observable<any> {
    return this.httClient.put<any>(`${environment.baseUrl}/products/${id}`, productData);
  }

}
