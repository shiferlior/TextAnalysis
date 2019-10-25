import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';

@Component({
  selector: 'app-find-phrase-by-location',
  templateUrl: './find-phrase-by-location.component.html',
  styleUrls: ['./find-phrase-by-location.component.css']
})
export class FindPhraseByLocationComponent implements OnInit {
  locationPhraseForm: FormGroup;
  constructor(
    private textSerice: TextService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.locationPhraseForm = this.formBuilder.group({
      textId: 0,
      lineNum: 0,
      locationInLine: 0
    });
  }

  findPhrase(locationPhrase){
    //TODO: add the this.textService
  }
}
