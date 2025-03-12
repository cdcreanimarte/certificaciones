import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  private _authSrv = inject(AuthService);
  private _router = inject(Router);

  toggleMenu() {
    this.menuToggle.emit();
  }

  async logout() {
    await this._authSrv.logOut();
    this._router.navigateByUrl('/');
  }
}
