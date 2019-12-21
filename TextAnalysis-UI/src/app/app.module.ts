import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { TextService } from '../services/text/text.service';
import { TextsComponent } from './texts/texts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadMetadataTextComponent } from './load-metadata-text/load-metadata-text.component';
import { ShowTextPhrasesComponent } from './show-text-phrases/show-text-phrases.component';
import { ShowTextPhrasesAsIndexComponent } from './show-text-phrases-as-index/show-text-phrases-as-index.component';
import { FindPhraseByLocationComponent } from './find-phrase-by-location/find-phrase-by-location.component';
import { PhrasesGroupComponent } from './phrases-group/phrases-group.component';
import { LinguisticExpressionComponent } from './linguistic-expression/linguistic-expression.component';
import { ShowPhrasesGroupComponent } from './show-phrases-group/show-phrases-group.component';
import { StatisticalDataComponent } from './statistical-data/statistical-data.component';
import { LoadTextComponent } from './load-text/load-text.component';
import { SearchLinguisticExpressionComponent } from './search-linguistic-expression/search-linguistic-expression.component';
import { AddPhraseToPhrasesGroupComponent } from './add-phrase-to-phrases-group/add-phrase-to-phrases-group.component';
import { ShowContextPhraseComponent } from './show-context-phrase/show-context-phrase.component';
import { XmlExportComponent } from './xml-export/xml-export.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    TextsComponent,
    LoadMetadataTextComponent,
    ShowTextPhrasesComponent,
    ShowTextPhrasesAsIndexComponent,
    FindPhraseByLocationComponent,
    PhrasesGroupComponent,
    LinguisticExpressionComponent,
    ShowPhrasesGroupComponent,
    StatisticalDataComponent,
    LoadTextComponent,
    SearchLinguisticExpressionComponent,
    AddPhraseToPhrasesGroupComponent,
    ShowContextPhraseComponent,
    XmlExportComponent
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
