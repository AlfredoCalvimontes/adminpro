import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: [
  ]
})
export class GraficodonaComponent implements OnInit {

  @Input('Labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('Data') public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input('Type') public doughnutChartType: ChartType = 'doughnut';
  @Input('Leyend') public leyend: String = 'Leyenda';

  constructor() { }

  ngOnInit(): void {
    console.log('', this.doughnutChartLabels);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
