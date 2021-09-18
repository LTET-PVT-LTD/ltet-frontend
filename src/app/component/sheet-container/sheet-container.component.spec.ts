import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetContainerComponent } from './sheet-container.component';

describe('SheetContainerComponent', () => {
  let component: SheetContainerComponent;
  let fixture: ComponentFixture<SheetContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
