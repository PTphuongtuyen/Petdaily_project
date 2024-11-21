import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resetpass2Component } from './resetpass2.component';

describe('Resetpass2Component', () => {
  let component: Resetpass2Component;
  let fixture: ComponentFixture<Resetpass2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resetpass2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resetpass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
