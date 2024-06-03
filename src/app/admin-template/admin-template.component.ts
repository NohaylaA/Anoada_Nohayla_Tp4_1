import { Component } from '@angular/core';
import {AppErrorsComponent} from "../app-errors/app-errors.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  standalone: true,
    imports: [
        AppErrorsComponent,
        DashboardComponent,
        NavbarComponent,
        RouterOutlet
    ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
