import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/services/stats/stats.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statistical-data',
  templateUrl: './statistical-data.component.html',
  styleUrls: ['./statistical-data.component.css']
})
export class StatisticalDataComponent implements OnInit {

  phraseStatsForm: FormGroup;
  rowStatsForm: FormGroup;

  phraseStats;

  rowStats;
  rowStatsKeys;

  constructor(private statsService: StatsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.phraseStatsForm = this.formBuilder.group({
      phrase: null
    });
    this.rowStatsForm = this.formBuilder.group({
      textId: null,
      rowNum: null
    });
  }

  findStatsByPhrase(phraseStats) {
    this.statsService.getStatsForPhrase(phraseStats).subscribe(res => {
      this.rowStats = res.recordset[0];
      this.rowStatsKeys = Object.keys(this.rowStats);
    });
  }

  findStatsByRowLocation(rowStats) {
    this.statsService.getStatsForRow(rowStats).subscribe(res => {
      this.rowStats = res.recordset[0];
      this.rowStatsKeys = Object.keys(this.rowStats);
    });
  }

}
