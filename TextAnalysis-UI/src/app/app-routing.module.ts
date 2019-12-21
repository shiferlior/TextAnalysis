import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { TextsComponent } from './texts/texts.component';
import { LoadMetadataTextComponent } from './load-metadata-text/load-metadata-text.component';
import { ShowTextPhrasesComponent } from './show-text-phrases/show-text-phrases.component';
import { ShowTextPhrasesAsIndexComponent } from './show-text-phrases-as-index/show-text-phrases-as-index.component';
import { FindPhraseByLocationComponent } from './find-phrase-by-location/find-phrase-by-location.component';
import { PhrasesGroupComponent } from './phrases-group/phrases-group.component';
import { LinguisticExpressionComponent } from './linguistic-expression/linguistic-expression.component';
import { ShowPhrasesGroupComponent } from './show-phrases-group/show-phrases-group.component';
import { StatisticalDataComponent } from './statistical-data/statistical-data.component';
import { LoadTextComponent } from './load-text/load-text.component';
import {SearchLinguisticExpressionComponent} from './search-linguistic-expression/search-linguistic-expression.component';
import {AddPhraseToPhrasesGroupComponent} from './add-phrase-to-phrases-group/add-phrase-to-phrases-group.component';
import {ShowContextPhraseComponent} from './show-context-phrase/show-context-phrase.component';
import {XmlExportComponent} from './xml-export/xml-export.component';

const routes: Routes = [
  { path: 'getTexts', component: TextsComponent },
  { path: 'loadText', component: LoadTextComponent },
  { path: 'loadTextMetadata', component: LoadMetadataTextComponent },
  { path: 'loadTextMetadata/:textId', component: LoadMetadataTextComponent },
  { path: 'showTextPhrases/:textId', component: ShowTextPhrasesComponent },
  { path: 'showTextPhrases', component: ShowTextPhrasesComponent },
  { path: 'ShowTextPhrasesAsIndex', component: ShowTextPhrasesAsIndexComponent },
  { path: 'ShowTextPhrasesAsIndex/:phrase', component: ShowTextPhrasesAsIndexComponent },
  { path: 'FindPhraseByLocation', component: FindPhraseByLocationComponent },
  { path: 'FindPhraseByLocation/:textId', component: FindPhraseByLocationComponent },
  { path: 'LinguisticExpression', component: LinguisticExpressionComponent },
  { path: 'PhrasesGroup', component: PhrasesGroupComponent },
  { path: 'ShowPhrasesGroup/:phrasesGroupId', component: ShowPhrasesGroupComponent },
  { path: 'StatisticalData', component: StatisticalDataComponent },
  { path: 'SearchLinguisticExpression/:phrase', component: SearchLinguisticExpressionComponent },
  { path: 'AddPhraseToPhrasesGroup/phrase/:phrase', component: AddPhraseToPhrasesGroupComponent },
  { path: 'AddPhraseToPhrasesGroup/phrasesGroupId/:phrasesGroupId', component: AddPhraseToPhrasesGroupComponent },
  { path: 'ShowContextPhraseComponent/:phraseId', component: ShowContextPhraseComponent },
  { path: 'XmlExport', component: XmlExportComponent},
  { path: '', redirectTo: '/getTexts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

