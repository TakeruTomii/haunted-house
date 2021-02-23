import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerifComponent } from './serif.component';

describe('SerifComponent', () => {
  let component: SerifComponent;
  let fixture: ComponentFixture<SerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
