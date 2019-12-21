import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-xml-export',
  templateUrl: './xml-export.component.html',
  styleUrls: ['./xml-export.component.css']
})
export class XmlExportComponent implements OnInit {

  xmlForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.xmlForm = this.formBuilder.group({
      ingestedTexts: null,
      userDefinedGroups: null,
      userDefinedPhrases: null
    });
  }

  findByText(xmlPath) {
    alert('asdsad');
  }

}
