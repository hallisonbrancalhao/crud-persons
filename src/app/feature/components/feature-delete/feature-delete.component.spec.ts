import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDeleteComponent } from './feature-delete.component';

describe('FeatureDeleteComponent', () => {
  let component: FeatureDeleteComponent;
  let fixture: ComponentFixture<FeatureDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
