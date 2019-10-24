import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text/text.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css']
})
export class TextsComponent implements OnInit {
  phrase;
  texts;
  //  = [
  //   {
  //     "id": 4,
  //     "title": "CheckLior",
  //     "totalWords": 0,
  //     "totalRows": 0,
  //     "totalCharacters": 0
  //   },
  //   {
  //     "id": 5,
  //     "title": "CheckLior2",
  //     "totalWords": 0,
  //     "totalRows": 0,
  //     "totalCharacters": 0
  //   }
  // ];

  constructor(public textSerice: TextService) { }

  ngOnInit() {
    this.textSerice.GetTexts()
      .subscribe(res => {
        this.texts = res.recordset;
      });
  }

  findByPhrase(phrase: NgForm): void {
    console.log('a: ' + JSON.stringify(phrase.value.phrase));
    this.textSerice.GetTextsByPhrase(phrase.value.phrase)
      .subscribe(res => {
        this.texts = res.recordset;
      });
  }

}
