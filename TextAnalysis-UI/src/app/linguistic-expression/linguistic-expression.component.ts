import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';
import { PhraseService } from 'src/services/phrase/phrase.service';
import { Phrase } from 'src/services/phrase/phrase';

@Component({
  selector: 'app-linguistic-expression',
  templateUrl: './linguistic-expression.component.html',
  styleUrls: ['./linguistic-expression.component.css']
})
export class LinguisticExpressionComponent implements OnInit {

  lingusticExpressionForm: FormGroup;
  phrases: [Phrase];

  constructor(
    private phraseService: PhraseService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.lingusticExpressionForm = this.formBuilder.group({
      newPhrase: null
    });

    this.phraseService.getPhrasesDefinedByUser().subscribe(res => {
      this.phrases = res.recordset;
    });
  }

  addPhrase(lingusticExpression) {
    this.phraseService.addUserDefinedPhrase(lingusticExpression).subscribe(res => {
      this.phraseService.getPhrasesDefinedByUser().subscribe(res => {
        this.phrases = res.recordset;
      });
    });
  }
}
