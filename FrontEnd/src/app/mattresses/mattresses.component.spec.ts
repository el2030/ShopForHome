import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattressesComponent } from './mattresses.component';

describe('MattressesComponent', () => {
  let component: MattressesComponent;
  let fixture: ComponentFixture<MattressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MattressesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MattressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
