import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text/text.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Phrase } from 'src/services/phrase/phrase';
import { DefinedWordsGroupService } from 'src/services/definedWordsGroup/defined-words-group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-phrases-group',
  templateUrl: './show-phrases-group.component.html',
  styleUrls: ['./show-phrases-group.component.css']
})
export class ShowPhrasesGroupComponent implements OnInit {

  phrasesGroupForm: FormGroup;
  phrases: [Phrase];

  constructor(private DefinedWordsGroup: DefinedWordsGroupService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.phrasesGroupForm = this.formBuilder.group({
        phrasesGroupId: params.get('phrasesGroupId'),
        textId: null
      });
      this.showPhrasesGroup({phrasesGroupId: parseInt(params.get('phrasesGroupId'),10), textId:null});
    });
  }

  showPhrasesGroup(phrasesGroup: { phrasesGroupId: number, textId: number }) {
    this.DefinedWordsGroup.getPhrasesDefinedGroupsAsIndex(phrasesGroup)
      .subscribe(res => {
        this.phrases = res.recordset;
      });
  }

}
