import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../../../shared/material.module';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-certificate-dashboard',
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './certificate-dashboard.component.html',
  styleUrl: './certificate-dashboard.component.scss'
})
export class CertificateDashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
}
