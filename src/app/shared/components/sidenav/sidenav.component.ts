import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<boolean>();
  menuItems: MenuItem[] = MENU_ITEMS;

  toggleSidenavCollapse(): void {
    this.collapsed = !this.collapsed;
    this.toggleCollapse.emit(this.collapsed);
  }
}
