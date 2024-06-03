import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host : string="http://localhost:8089";
  constructor(private http : HttpClient) { }

  public searchProducts(keyword:string="",page :number=1, size:number=4) {

    // Effectue une requête HTTP GET vers l'API avec le mot-clé de recherche, le numéro de page et la taille de page spécifiés.
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});

  }



  public checkProducts(product : Product):Observable<Product>{
    return  this.http.patch<Product>(`${this.host}/products/${product.id}`,
      { checked: !product.checked });

  }
  public deleteProducts(product : Product){
    return  this.http.delete<any>(`${this.host}/products/${product.id}`);

  }

  saveProduct(product: Product):Observable<Product> {
    return  this.http.post<Product>(`${this.host}/products`,
      product);
  }


  getProductById(productId: number): Observable<Product> {
    return  this.http.get<Product>(`${this.host}/products/${productId}`);

  }

  updateProduct(product: Product): Observable<Product> {
    return  this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }
}
