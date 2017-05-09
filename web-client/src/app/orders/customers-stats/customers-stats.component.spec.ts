import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersStatsComponent } from './customers-stats.component';

describe('CustomersStatsComponent', () => {
  let component: CustomersStatsComponent;
  let fixture: ComponentFixture<CustomersStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
