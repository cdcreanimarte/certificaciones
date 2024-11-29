import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TrimValueDirective } from './trim-value.directive';

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="email" appTrimValue>
    </form>
  `
})
class TestComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('')
    });
  }
}

describe('TrimValueDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, TrimValueDirective],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should trim input value on blur', () => {
    const input = inputEl.nativeElement;
    input.value = '  test  ';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.form.get('email')!.value).toBe('test');
  });

  it('should not change already trimmed input value', () => {
    const input = inputEl.nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.form.get('email')!.value).toBe('test');
  });
});
