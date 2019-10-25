import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text/text.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Text } from '../../services/text/text';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css']
})
export class TextsComponent implements OnInit {
  getTextForm: FormGroup;
  texts: [Text];
  isByPhrase: boolean;
  labelText: string;


  constructor(private textSerice: TextService,
    private formBuilder: FormBuilder) {
    this.isByPhrase = true;
    this.labelText = 'נתון מובנה';
  }

  ngOnInit() {
    this.getTextForm = this.formBuilder.group({
      phrase: '',
      subjectKey: '',
      subjectValue: ''
    });

    this.textSerice.GetTexts()
      .subscribe(res => {
        this.texts = res.recordset;
      });
  }

  switchSearch() {
    this.isByPhrase = !this.isByPhrase;
    this.labelText = this.isByPhrase ? 'נתון מובנה' : 'ביטוי';

  }

  findByPhrase(getTextForm): void {
    console.log(222);
    console.log('a: ' + JSON.stringify(getTextForm));
    if (this.isByPhrase) {
      this.textSerice.GetTextsByPhrase(getTextForm.phrase)
        .subscribe(res => {
          this.texts = res.recordset;
        });
    }
    else {
      this.textSerice.GetTextsByMetadata(getTextForm.subjectKey,getTextForm.subjectValue)
        .subscribe(res => {
          this.texts = res.recordset;
        });
    }
  }

}
