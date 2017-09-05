import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinModalComponent } from './lin-modal.component';

describe('LinModalComponent', () => {
  let component: LinModalComponent;
  let fixture: ComponentFixture<LinModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
