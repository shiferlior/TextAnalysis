import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhrasesGroupComponent } from './show-phrases-group.component';

describe('ShowPhrasesGroupComponent', () => {
  let component: ShowPhrasesGroupComponent;
  let fixture: ComponentFixture<ShowPhrasesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPhrasesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPhrasesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
