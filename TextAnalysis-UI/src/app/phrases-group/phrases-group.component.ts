import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';
import { DefinedWordsGroupService } from 'src/services/definedWordsGroup/defined-words-group.service';
import { WordsGroup } from 'src/services/definedWordsGroup/wordsGroup';

@Component({
  selector: 'app-phrases-group',
  templateUrl: './phrases-group.component.html',
  styleUrls: ['./phrases-group.component.css']
})
export class PhrasesGroupComponent implements OnInit {

  addPhrasesGroupForm: FormGroup;
  phrasesGroups: [WordsGroup];

  constructor(private wordsGroupService: DefinedWordsGroupService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.wordsGroupService.getUserDefinedGroupsList().subscribe(res => {
      this.phrasesGroups = res.recordset;
    });

    this.addPhrasesGroupForm = this.formBuilder.group({
      groupName: null
    });
  }

  deleteClicked() {
    this.wordsGroupService.deleteAllUserDefinedWordsGroup().subscribe(res => {
      this.wordsGroupService.getUserDefinedGroupsList().subscribe(res => {
        this.phrasesGroups = res.recordset;
      });
    });
  }

  addPhrasesGroup(addPhrasesGroup: { groupName: string }) {
    this.wordsGroupService.createUserDefinedGroup(addPhrasesGroup)
      .subscribe(res => {
        this.ngOnInit();
        alert('success!');
      });
  }

}
