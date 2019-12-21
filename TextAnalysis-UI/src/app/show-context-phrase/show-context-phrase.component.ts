import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PhraseService } from 'src/services/phrase/phrase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-context-phrase',
  templateUrl: './show-context-phrase.component.html',
  styleUrls: ['./show-context-phrase.component.css']
})
export class ShowContextPhraseComponent implements OnInit {

  phraseContextForm: FormGroup;
  phraseContextText: string;
  constructor(
    private phraseSerice: PhraseService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      let details = {
        phraseId: parseInt(params.get('phraseId'),10),
        wordsBackward: 5,
        wordsForward: 5
      };
      this.phraseContextForm = this.formBuilder.group(details);
      this.phraseContext(details);
    });
  }

  phraseContext(phraseContext: { phraseId: number, wordsBackward: number, wordsForward: number }) {
    this.phraseSerice.getContextForPhrase(phraseContext).subscribe(res => {
      this.phraseContextText = res.recordset[0].text;
    });
  }

}
