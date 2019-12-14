import { Component, OnInit } from '@angular/core';
import { Phrase } from 'src/services/phrase/phrase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PhraseService } from 'src/services/phrase/phrase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-linguistic-expression',
  templateUrl: './search-linguistic-expression.component.html',
  styleUrls: ['./search-linguistic-expression.component.css']
})
export class SearchLinguisticExpressionComponent implements OnInit {

  lingusticExpressionForm: FormGroup;
  phrases: [Phrase];
  constructor(
    private phraseService: PhraseService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.lingusticExpressionForm = this.formBuilder.group({
        phrase: params.get('phrase'),
        textId: null
      });
      this.phraseService.searchPhrase({phrase: params.get('phrase'), textId:null}).subscribe(res => {
        this.phrases = res.recordset;
      });
    });
  }

  searchPhrase(lingusticExpression) {
    this.phraseService.searchPhrase(lingusticExpression).subscribe(res => {
        this.phrases = res.recordset;
      });
  }

}
