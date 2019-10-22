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

  createDoc(loadDocForm: NgForm) :void {
    console.log("111" + loadDocForm);
    this.textSerice.CreateText(loadDocForm.value)
        .subscribe(res => {
          alert(res);
        });
    
  }
}