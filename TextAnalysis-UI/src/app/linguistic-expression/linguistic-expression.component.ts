import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';

@Component({
  selector: 'app-linguistic-expression',
  templateUrl: './linguistic-expression.component.html',
  styleUrls: ['./linguistic-expression.component.css']
})
export class LinguisticExpressionComponent implements OnInit {

  lingusticExpressionForm: FormGroup;

  constructor(
    private textSerice: TextService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.lingusticExpressionForm = this.formBuilder.group({
      lingusticExpression: ''
    });
  }

  searchPhrase(lingusticExpression) {
    alert('aaaa');
  }
}
