import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TextService } from '../../services/text/text.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  title;
  path;

  constructor(
    public textSerice: TextService
  ) { }

  ngOnInit() {
  }

  createDoc(loadDocForm: NgForm): void {
    // this.textSerice.createText(loadDocForm.value)
    //   .subscribe(res => {
    //     alert(res.title);
    //   });
  }
}