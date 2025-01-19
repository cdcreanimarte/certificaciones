import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../../constant/menu.config';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  menuItems: MenuItem[] = MENU_ITEMS;
}
