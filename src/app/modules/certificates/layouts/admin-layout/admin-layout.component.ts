import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/material.module';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { SidenavComponent } from "../../../../shared/components/sidenav/sidenav.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";


@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, MaterialModule, RouterModule, HeaderComponent, SidenavComponent, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
