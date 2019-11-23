import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTextComponent } from './load-text.component';

describe('LoadTextComponent', () => {
  let component: LoadTextComponent;
  let fixture: ComponentFixture<LoadTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
