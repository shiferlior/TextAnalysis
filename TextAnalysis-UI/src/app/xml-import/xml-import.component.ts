import { Component, OnInit } from '@angular/core';
import { DefinedWordsGroupService } from 'src/services/definedWordsGroup/defined-words-group.service';

@Component({
  selector: 'app-xml-import',
  templateUrl: './xml-import.component.html',
  styleUrls: ['./xml-import.component.css']
})
export class XmlImportComponent implements OnInit {

  xmlData: string = "";
  constructor(private wordsGroupService: DefinedWordsGroupService) { }

  ngOnInit() {
  }

  handleClick1(value: string) {
    alert(value);
    this.wordsGroupService.importUserDefinedGroups(value).subscribe(res => {
      alert("OK")
      this.xmlData = "";
    });
  }
  handleClick2(value: string) {
    this.wordsGroupService.importUserDefinedPhrases(value).subscribe(res => {
      alert("OK")
      this.xmlData = "";
    });
  }
  handleClick3(value: string) {
    this.wordsGroupService.importIngestedTexts(value).subscribe(res => {
      alert("OK")
      this.xmlData = "";
    });
  }

}
