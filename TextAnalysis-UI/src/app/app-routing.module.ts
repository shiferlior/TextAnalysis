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

const routes: Routes = [
  { path: 'getTexts', component: TextsComponent },
  { path: 'loadText', component: HomeComponent },
  { path: 'loadTextMetadata', component: LoadMetadataTextComponent },
  { path: 'showTextPhrases', component: ShowTextPhrasesComponent },
  { path: 'ShowTextPhrasesAsIndex', component: ShowTextPhrasesAsIndexComponent },
  { path: 'FindPhraseByLocation', component: FindPhraseByLocationComponent },
  { path: 'LinguisticExpression', component: LinguisticExpressionComponent },
  { path: 'PhrasesGroup', component: PhrasesGroupComponent },
  { path: 'ShowPhrasesGroup', component: ShowPhrasesGroupComponent },
  { path: 'StatisticalData', component: StatisticalDataComponent },
  { path: '', redirectTo: '/getTexts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

