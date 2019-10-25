import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';

@Component({
  selector: 'app-show-text-phrases-as-index',
  templateUrl: './show-text-phrases-as-index.component.html',
  styleUrls: ['./show-text-phrases-as-index.component.css']
})
export class ShowTextPhrasesAsIndexComponent implements OnInit {

  textPhrasesForm: FormGroup;
  phrases;

  constructor(private textService: TextService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.textPhrasesForm = this.formBuilder.group({
      textId: 0
    });
  }

  
  findByText(textId) {
    alert('aaa');
    //TODO: filter by textId - phrases array
  }

}
