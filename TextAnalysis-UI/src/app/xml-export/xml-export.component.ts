import { Component, OnInit } from '@angular/core';
import { DefinedWordsGroupService } from 'src/services/definedWordsGroup/defined-words-group.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-xml-export',
  templateUrl: './xml-export.component.html',
  styleUrls: ['./xml-export.component.css']
})
export class XmlExportComponent implements OnInit {

  xmlData: string;
  constructor(private wordsGroupService: DefinedWordsGroupService) { }

  ngOnInit() {
  }

  handleClick1(event: Event) {
    this.wordsGroupService.exportUserDefinedGroups().subscribe(res => {
      this.xmlData = res.recordset["XML_F52E2B61-18A1-11d1-B105-00805F49916B"];
    })
  }

  handleClick2(event: Event) {
    this.wordsGroupService.exportUserDefinedPhrases().subscribe(res => {
      this.xmlData = res.recordset["XML_F52E2B61-18A1-11d1-B105-00805F49916B"];
    })
  }

  handleClick3(event: Event) {
    this.wordsGroupService.exportIngestedTexts().subscribe(res => {
      this.xmlData = res.recordset["XML_F52E2B61-18A1-11d1-B105-00805F49916B"];
    })
  }

}
