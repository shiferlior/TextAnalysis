import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMetadataTextComponent } from './load-metadata-text.component';

describe('LoadMetadataTextComponent', () => {
  let component: LoadMetadataTextComponent;
  let fixture: ComponentFixture<LoadMetadataTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMetadataTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMetadataTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
