import { Component } from '@angular/core';
import * as packageJson from './../../../../../package.json';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  version = packageJson.version;
  currentYear = new Date().getFullYear();
}
