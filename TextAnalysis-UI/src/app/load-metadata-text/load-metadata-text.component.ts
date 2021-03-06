import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextService } from '../../services/text/text.service';
import { Metadata } from 'src/services/text/metadata';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load-metadata-text',
  templateUrl: './load-metadata-text.component.html',
  styleUrls: ['./load-metadata-text.component.css']
})
export class LoadMetadataTextComponent implements OnInit {

  loadTextMetadataForm: FormGroup;

  constructor(
    private textService: TextService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.loadTextMetadataForm = this.formBuilder.group({
        textId: params.get('textId'),
        subjectKey: '',
        subjectValue: ''
      });
    });

    
  }

  insertMetadata(loadTextMetadataForm:Metadata) {
    this.textService.insertMetadata(loadTextMetadataForm).subscribe(res =>{
      if(res.returnValue === 1)
        alert('Success!');
      else
        alert('Some Problems...');
    });
  }
}
