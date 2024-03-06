import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPollComponent } from './new-poll.component';

describe('NewPollComponent', () => {
  let component: NewPollComponent;
  let fixture: ComponentFixture<NewPollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPollComponent]
    });
    fixture = TestBed.createComponent(NewPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
