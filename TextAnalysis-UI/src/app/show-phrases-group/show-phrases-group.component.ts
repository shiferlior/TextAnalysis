import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text/text.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Phrase } from 'src/services/phrase/phrase';
import { DefinedWordsGroupService } from 'src/services/definedWordsGroup/defined-words-group.service';

@Component({
  selector: 'app-show-phrases-group',
  templateUrl: './show-phrases-group.component.html',
  styleUrls: ['./show-phrases-group.component.css']
})
export class ShowPhrasesGroupComponent implements OnInit {

  phrasesGroupForm: FormGroup;
  phrases: [Phrase];

  constructor(private DefinedWordsGroup: DefinedWordsGroupService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.phrasesGroupForm = this.formBuilder.group({
      phrasesGroupId: null,
      textId: null
    });
  }

  showPhrasesGroup(phrasesGroup: { phrasesGroupId: number, textId: number }) {
    alert(JSON.stringify(phrasesGroup));
    this.DefinedWordsGroup.getPhrasesDefinedGroupsAsIndex(phrasesGroup)
      .subscribe(res => {
        this.phrases = res.recordset;
      })

  }

}
