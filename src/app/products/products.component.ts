import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    NgForOf,
    AsyncPipe,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit
{
  constructor(private productService:ProductService,
              private router: Router,
              public appState: AppStateService)
  {}

  ngOnInit() {
    this.searchProducts();

    }
  searchProducts() {
    /*this.appState.setProductState({
      status : "LOADING"
    });*/
    this.productService.searchProducts(
      this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize)
      .subscribe({
        next: (resp) => {
          let products = resp.body as Product[];

          let totalProducts: number = parseInt(resp.headers.get('x-total-count')!);

         // this.appState.productsState.totalProducts=totalProducts;

          let totalPages= Math.floor(totalProducts / this.appState.productsState.pageSize);

          if (totalProducts % this.appState.productsState.pageSize != 0)
          {
            ++totalPages;
          }
          this.appState.setProductState({
            products : products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            status : "LOADED"
          })
        },
        error: err => {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage : err
          })
        }
      })
  }


  handleCheckProduct(product: Product) {

    this.productService.checkProducts(product)
      .subscribe({
        next: updatedProduct => {
          product.checked=!product.checked;
          //this.searchProducts();
        },
        error: err => {
          console.log(err);
        }
      });


  }
  handleDelete(product: Product) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit? "))
      this.productService.deleteProducts(product).subscribe({
        next:value => {
          this.searchProducts();
          //this.appState.productsState.products = this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
      }
     })
  }

  handleGotoPage(page: number) {
     this.appState.productsState.currentPage=page;
     this.searchProducts();

  }

  handleEdit(product: Product) {
       this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }


}
