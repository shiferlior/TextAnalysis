import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhraseService } from 'src/services/phrase/phrase.service';
import { Phrase } from 'src/services/phrase/phrase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-text-phrases-as-index',
  templateUrl: './show-text-phrases-as-index.component.html',
  styleUrls: ['./show-text-phrases-as-index.component.css']
})
export class ShowTextPhrasesAsIndexComponent implements OnInit {

  textPhrasesForm: FormGroup;
  phrases: [Phrase];

  constructor(private phraseService: PhraseService, private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.textPhrasesForm = this.formBuilder.group({
        phrase: params.get('phrase'),
        textId: null
      });
      this.findByText({phrase: params.get('phrase'), textId: null});
    });
  }


  findByText(textPhrasesForm) {
    this.phraseService.getIndexForPhrase(textPhrasesForm).subscribe(res => {
      this.phrases = res.recordset;
    });
  }

}
