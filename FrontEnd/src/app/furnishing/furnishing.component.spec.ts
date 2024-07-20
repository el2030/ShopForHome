import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnishingComponent } from './furnishing.component';

describe('FurnishingComponent', () => {
  let component: FurnishingComponent;
  let fixture: ComponentFixture<FurnishingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FurnishingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FurnishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
