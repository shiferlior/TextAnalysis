import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTextPhrasesAsIndexComponent } from './show-text-phrases-as-index.component';

describe('ShowTextPhrasesAsIndexComponent', () => {
  let component: ShowTextPhrasesAsIndexComponent;
  let fixture: ComponentFixture<ShowTextPhrasesAsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTextPhrasesAsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTextPhrasesAsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
