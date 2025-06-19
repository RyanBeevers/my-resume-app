import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFoundDialogComponent } from './start-found-dialog.component';

describe('StartFoundDialogComponent', () => {
  let component: StartFoundDialogComponent;
  let fixture: ComponentFixture<StartFoundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartFoundDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
