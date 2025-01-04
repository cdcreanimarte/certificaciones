import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-list',
  imports: [],
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.scss'
})
export class CertificateListComponent {

  private _authSrv = inject(AuthService);
  private _router = inject(Router);

  async logout() {
    await this._authSrv.logOut();
    this._router.navigateByUrl('/');

    console.log('Logout');
  }

}
