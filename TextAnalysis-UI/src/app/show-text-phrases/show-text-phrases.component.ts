import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { TextService } from '../../services/text/text.service';
import { JsonPipe } from '@angular/common';
import { Phrase } from 'src/services/phrase/phrase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-text-phrases',
  templateUrl: './show-text-phrases.component.html',
  styleUrls: ['./show-text-phrases.component.css']
})
export class ShowTextPhrasesComponent implements OnInit {

  textPhrasesForm: FormGroup;
  phrases: [Phrase];
  textId: number;
  from: number;
  to: number;

  constructor(private textService: TextService, private formBuilder: FormBuilder, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.from = 0;
    this.to = 1000;
    this.activatedroute.paramMap.subscribe(params => {
      this.textPhrasesForm = this.formBuilder.group({
        textId: params.get('textId')
      });
      this.findByText({'textId': parseInt(params.get('textId'),10)});
    });
  }

  findByText(textPhrasesForm: { textId: number }) {
    this.from = 0;
    this.textId = textPhrasesForm.textId;
    if (!(this.textId && this.textId > 0))
      this.textId = -1;
    this.textService.getAllPhrasesInAText(this.textId, this.from, this.to).subscribe((res) => {
      this.phrases = res.recordset;
    });
  }

  next1000Words() {
    this.from += 1000;
    this.textService.getAllPhrasesInAText(this.textId, this.from, this.to).subscribe((res) => {
      this.phrases = res.recordset;
    });
  }

  isPhrasesWithWords() {
    if (this.phrases)
      return this.phrases.length > 0;
    else
      return false;
  }
}
