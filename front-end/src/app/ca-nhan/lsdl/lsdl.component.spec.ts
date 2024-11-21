import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LSDLComponent } from './lsdl.component';

describe('LSDLComponent', () => {
  let component: LSDLComponent;
  let fixture: ComponentFixture<LSDLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LSDLComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LSDLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
