import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousCommandsComponent } from './previous-commands.component';

describe('PreviousCommandsComponent', () => {
  let component: PreviousCommandsComponent;
  let fixture: ComponentFixture<PreviousCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousCommandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
