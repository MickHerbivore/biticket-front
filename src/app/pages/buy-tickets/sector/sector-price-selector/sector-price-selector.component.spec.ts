import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorPriceSelectorComponent } from './sector-price-selector.component';

describe('SectorPriceSelectorComponent', () => {
  let component: SectorPriceSelectorComponent;
  let fixture: ComponentFixture<SectorPriceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorPriceSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectorPriceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
