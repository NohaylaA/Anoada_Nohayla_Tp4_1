import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {JsonPipe} from "@angular/common";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  formLogin! : FormGroup;
  errorMessage = undefined;
constructor(private fb :FormBuilder,private router:Router , private authService :AuthService) {
}
ngOnInit() {
  this.formLogin=this.fb.group({
  username : this.fb.control(""),
    password : this.fb.control("")
})
}

  handlelogin() {
    let username=this.formLogin.value.username;
    let password=this.formLogin.value.password;
    this.authService.login(username, password)
      .then(resp=>{
        this.router.navigateByUrl("/admin");
      })
      .catch(error=>{
        this.errorMessage=error;
      })
  }
}
