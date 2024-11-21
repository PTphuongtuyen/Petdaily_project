import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSCNComponent } from './hscn.component';

describe('HSCNComponent', () => {
  let component: HSCNComponent;
  let fixture: ComponentFixture<HSCNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HSCNComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HSCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
