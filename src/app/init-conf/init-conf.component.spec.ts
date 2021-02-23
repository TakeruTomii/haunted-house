import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitConfComponent } from './init-conf.component';

describe('InitConfComponent', () => {
  let component: InitConfComponent;
  let fixture: ComponentFixture<InitConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
