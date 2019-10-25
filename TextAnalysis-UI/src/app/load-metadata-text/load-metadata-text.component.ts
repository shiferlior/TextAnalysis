import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';

@Component({
  selector: 'app-load-metadata-text',
  templateUrl: './load-metadata-text.component.html',
  styleUrls: ['./load-metadata-text.component.css']
})
export class LoadMetadataTextComponent implements OnInit {

  loadTextMetadataForm: FormGroup;

  constructor(
    private textSerice: TextService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadTextMetadataForm = this.formBuilder.group({
      textId: '',
      subjectKey: '',
      subjectValue: ''
    });
  }

  insertMetadata(loadTextMetadataForm) {
    alert('aaaa');
  }
}
