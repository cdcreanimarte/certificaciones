import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateContainerComponent } from './certificate-container.component';

describe('CertificateContainerComponent', () => {
  let component: CertificateContainerComponent;
  let fixture: ComponentFixture<CertificateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
