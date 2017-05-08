import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderParticipantManagerComponent } from './order-participant-manager.component';

describe('OrderParticipantManagerComponent', () => {
  let component: OrderParticipantManagerComponent;
  let fixture: ComponentFixture<OrderParticipantManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderParticipantManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderParticipantManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
