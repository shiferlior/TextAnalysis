import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DefinedWordsGroupService } from 'src/services/definedWordsGroup/defined-words-group.service';

@Component({
  selector: 'app-add-phrase-to-phrases-group',
  templateUrl: './add-phrase-to-phrases-group.component.html',
  styleUrls: ['./add-phrase-to-phrases-group.component.css']
})
export class AddPhraseToPhrasesGroupComponent implements OnInit {


  addPhraseToPhrasesGroupForm: FormGroup;
  constructor(
    private definedWordsGroup: DefinedWordsGroupService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.addPhraseToPhrasesGroupForm = this.formBuilder.group({
        phrase: params.get('phrase'),
        phrasesGroupId: params.get('phrasesGroupId')
      });
    });
  }

  addPhraseToPhrasesGroup(details) {
    this.definedWordsGroup.addPhraseToUserDefinedGroup(details).subscribe(res => {
      alert('success');
    });
  }

}
