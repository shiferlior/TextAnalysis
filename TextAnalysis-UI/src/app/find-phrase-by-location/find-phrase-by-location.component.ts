import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';
import { PhraseService } from 'src/services/phrase/phrase.service';
import { Phrase } from 'src/services/phrase/phrase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-find-phrase-by-location',
  templateUrl: './find-phrase-by-location.component.html',
  styleUrls: ['./find-phrase-by-location.component.css']
})
export class FindPhraseByLocationComponent implements OnInit {
  locationPhraseForm: FormGroup;
  phrases: [Phrase];
  constructor(
    private phraseSerice: PhraseService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.locationPhraseForm = this.formBuilder.group({
        textId: params.get('textId'),
        rowNum: null,
        wordInRow: null
      });
    });
  }

  findPhrase(locationPhrase: { textId: number, rowNum: number, wordInRow: number }) {
    this.phraseSerice.getPhraseByRowLocation(locationPhrase).subscribe(res => {
      this.phrases = res.recordset;
    });
  }
}
