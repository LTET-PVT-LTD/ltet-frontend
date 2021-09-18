import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningContainerComponent } from './learning-container.component';

describe('LearningContainerComponent', () => {
  let component: LearningContainerComponent;
  let fixture: ComponentFixture<LearningContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
