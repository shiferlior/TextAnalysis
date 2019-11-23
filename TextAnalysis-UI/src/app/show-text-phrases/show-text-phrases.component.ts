import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-show-text-phrases',
  templateUrl: './show-text-phrases.component.html',
  styleUrls: ['./show-text-phrases.component.css']
})
export class ShowTextPhrasesComponent implements OnInit {

  textPhrasesForm: FormGroup;
  phrases;

  constructor(private textService: TextService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.textPhrasesForm = this.formBuilder.group({
      textId: 0
    });
  }

  findByText(textPhrasesForm:{textId: number}) {
    let textIdTemp = textPhrasesForm.textId;
    if(!(textIdTemp && textIdTemp>0))
      textIdTemp = -1;
    this.textService.getAllPhrasesInAText(textIdTemp).subscribe((res)=>{
      this.phrases = res.recordset;
    });
  }
}
