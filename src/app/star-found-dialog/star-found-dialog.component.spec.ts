import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarFoundDialogComponent } from './star-found-dialog.component';

describe('StarFoundDialogComponent', () => {
  let component: StarFoundDialogComponent;
  let fixture: ComponentFixture<StarFoundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarFoundDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
