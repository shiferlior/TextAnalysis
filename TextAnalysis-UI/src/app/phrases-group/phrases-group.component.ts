import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';

@Component({
  selector: 'app-phrases-group',
  templateUrl: './phrases-group.component.html',
  styleUrls: ['./phrases-group.component.css']
})
export class PhrasesGroupComponent implements OnInit {

  addPhrasesGroupForm: FormGroup;
  phrasesGroups;

  constructor(private textSerice: TextService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    

    this.addPhrasesGroupForm = this.formBuilder.group({
      lingusticExpression: ''
    });
  }
  addPhrasesGroup(addPhrasesGroup){
    alert('aaa');
  }
}
