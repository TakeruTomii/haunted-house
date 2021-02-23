import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaRoomComponent } from './tea-room.component';

describe('TeaRoomComponent', () => {
  let component: TeaRoomComponent;
  let fixture: ComponentFixture<TeaRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeaRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
