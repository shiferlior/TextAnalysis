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

  constructor(private textService: TextService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadTextForm = this.formBuilder.group({
      title: null,
      path: null
    });
  }

  load(loadTextForm: { title: string, path: string }): void {
    let textId: number = -1;
    let textContent: string = "";

    this.textService.createTextStep1(loadTextForm).subscribe(res => {
      alert("aaa " + JSON.stringify(loadTextForm));
      textId = res.recordset[0].id;
      if (textContent != "") {
        this.continueLoad(textId, textContent);
      }
    });

    this.textService.getTextByURL(loadTextForm.path).subscribe(res => {
      alert("bbb " + JSON.stringify(textContent));
      textContent = res;
      if (textId != -1) {
        this.continueLoad(textId, textContent);
      }
    });
    alert("ccc " + JSON.stringify(loadTextForm));
  }

  async continueLoad(textId: number, textContent: string) {

    let tempSubText = "";

    for (let i = 0; i < textContent.length; i++) {
      tempSubText += textContent[i];

      if (textContent[i] === String.fromCharCode(10) || textContent[i] === String.fromCharCode(13)) {

        try {
          await this.textService.createTextStep2({ textId: textId, row: tempSubText }).toPromise();
        } catch (err) {
          console.error(111, err);
        }

        tempSubText = "";
        console.log(i / textContent.length);
      }
    }

    this.textService.createTextStep3({ textId }).subscribe(res => {
      alert("ddd " + JSON.stringify(res));
    });
  }
}