import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/services/text/text.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-load-text',
  templateUrl: './load-text.component.html',
  styleUrls: ['./load-text.component.css']
})
export class LoadTextComponent implements OnInit {

  loadTextForm: FormGroup;
  precent: string;
  textSend: string;
  isNeedButtonLoad: boolean;
  isShowSpinner: boolean;

  constructor(private textService: TextService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isNeedButtonLoad = true;
    this.isShowSpinner = false;

    this.loadTextForm = this.formBuilder.group({
      title: null,
      path: null
    });
  }

  load(loadTextFormValue: { title: string, path: string }): void {
    this.isNeedButtonLoad = false;
    this.isShowSpinner = true;
    let textId: number = -1;
    let textContent: string = "";

    this.textService.createTextStep1(loadTextFormValue).subscribe(res => {
      textId = res.recordset[0].id;

      this.textService.getTextByURL(loadTextFormValue.path).subscribe(res => {
        textContent = res.text;
        console.log('The text' + textContent);

        this.continueLoad(textId, textContent);
      });

    });
  }

  async continueLoad(textId: number, textContent: string) {
    let tempSubText = "";

    for (let i = 0; i < textContent.length; i++) {
      tempSubText += textContent[i];

      if (textContent[i] === String.fromCharCode(10) || textContent[i] === String.fromCharCode(13)) {
        this.textSend = tempSubText;
        try {
          await this.textService.createTextStep2({ textId: textId, row: tempSubText }).toPromise();
        } catch (err) {
          console.error("Error: ", err);
        }

        tempSubText = "";
        this.precent = ((i / textContent.length) * 100).toFixed(2).toString() + " " + "%";
      }
    }

    this.textService.createTextStep3({ textId }).subscribe(res => {
      alert('success!');
      this.isNeedButtonLoad = true;
      this.isShowSpinner = false;
    });
  }
}