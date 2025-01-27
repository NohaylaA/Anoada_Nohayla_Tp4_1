import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {HomeComponent} from "./home/home.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

export const routes: Routes =  [
  {path : "login", component : LoginComponent},
  {
    path : "admin", component : AdminTemplateComponent, children : [
      {path : "products", component : ProductsComponent},
      {path : "newProduct", component : NewProductComponent},
      {path : "editProduct/:id", component : EditProductComponent},
      {path : "home", component : HomeComponent},

    ]
  },

  {path : "", redirectTo : "login" ,pathMatch:'full'}
];

