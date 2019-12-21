import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlExportComponent } from './xml-export.component';

describe('XmlExportComponent', () => {
  let component: XmlExportComponent;
  let fixture: ComponentFixture<XmlExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
