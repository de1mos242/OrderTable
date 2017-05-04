import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCardEditComponent } from './rate-card-edit.component';

describe('RateCardEditComponent', () => {
  let component: RateCardEditComponent;
  let fixture: ComponentFixture<RateCardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateCardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
