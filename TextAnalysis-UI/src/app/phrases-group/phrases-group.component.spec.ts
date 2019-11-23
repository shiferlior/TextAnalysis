import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhrasesGroupComponent } from './phrases-group.component';

describe('PhrasesGroupComponent', () => {
  let component: PhrasesGroupComponent;
  let fixture: ComponentFixture<PhrasesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
