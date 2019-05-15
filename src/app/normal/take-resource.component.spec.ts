import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeResourceComponent } from './take-resource.component';

describe('TakeResourceComponent', () => {
  let component: TakeResourceComponent;
  let fixture: ComponentFixture<TakeResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
