import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinFooterComponent } from './lin-footer.component';

describe('LinFooterComponent', () => {
  let component: LinFooterComponent;
  let fixture: ComponentFixture<LinFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
