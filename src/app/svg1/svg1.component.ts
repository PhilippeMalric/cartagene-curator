import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as d3 from 'd3';
import { map } from 'd3';
import { Subscription } from 'rxjs';
import { selectCategories } from '../reducers';
import { MainState } from '../reducers/main.reducer';
import { DataService } from '../services/data.service';
import Chart from 'chart.js/auto';
import { generate } from 'patternomaly';
import { GoogleChartInterface } from 'ng2-google-charts';


@Component({
  selector: 'app-svg1',
  templateUrl: './svg1.component.html',
  styleUrls: ['./svg1.component.css']
})
export class Svg1Component implements OnInit {
  
  @Input() varName: String;
  @Input() data2: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private h2 = 450
  private backgroundC = generate([
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', 
    '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', 
    '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
  ]);

  
  private borderColor = this.backgroundC


  sub1: Subscription;
  x: d3.ScaleBand<string>;
  canvas: any;
  ctx: any;
  myChart: any;
  graph: { data: ({ x: number[]; y: number[]; type: string; mode: string; marker: { color: string; }; } | { x: number[]; y: number[]; type: string; mode?: undefined; marker?: undefined; })[]; layout: { width: number; height: number; title: string; }; };
 
  rows: any[];
  dt: any
  calendar: GoogleChartInterface;
  chartDate: boolean=false;


 

  constructor(
    
    private dataService:DataService,
    private ref:ChangeDetectorRef,
    private store:Store) { }

    
  ngOnInit(): void {

    this.ctx = 'myChart'; 
    this.createSvg()
    this.dataService.categories$
    .subscribe((data:any)=>{
      console.log("svg")
      console.log(data)
      this.createGraph(data)
      
      //this.ref.markForCheck()
    })
  

    
    this.store.subscribe((state:any)=>{
      let clear = state.main.clearState
      if(clear){
        this.svg.selectAll("*").remove()
        //this.createSvg()
      }
    })
  }

  ngAfterViewInit() {
    
  }



  createGraph(data: any) {
    if(data.length > 0 ){

      let data_count = data.map(x=>x.count)
      console.log(data_count)
      let data2 = {
        labels: data.map(x=>x.categorie),
        datasets: [{
          label: "",
          data: data_count,
          backgroundColor: this.backgroundC.slice(0,data.length),
          borderColor: this.borderColor.slice(0,data.length),
          borderWidth: 1
        }]
      };

      if(this.myChart){
        this.myChart.destroy();
      }

      if(data.length < 20){

        this.chartDate = false

        this.myChart = new Chart(this.ctx,
          {
            type: 'bar',
            data: data2,
            options: {
              indexAxis:"y",
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          })
      }
      else{
        console.log("data[1].categorie")
        console.log(data[1].categorie)

        if(data[1].categorie.split(" ")[0].split("-").length > 2 ){

          this.chartDate = true

          this.rows = data.filter((x)=>x.categorie != 'NA' && x.categorie != '').map((x)=>{
          
            let date = x.categorie.split(" ")[0].split("-")
            
            return[new Date(date[0],Number(date[1])-1,date[2]),x.count]})
  
          
  
  
            this.calendar = {
              chartType: 'Calendar',
              dataTable: this.rows,
              firstRowIsData: true,
              options: {
                height: 400 ,
                'title': 'Tasks'},
            };
         
  
        }
        }
        

      
        
      this.drawBars(data)
    }
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

  

  
  private createSvg(): void {
    
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.h2 + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    //console.log("svg" )
    //console.log(this.svg )
  }

  

  private drawBars(data: any[]): void {
    
    this.svg.selectAll("*").remove()
   
    let mymax = d3.max(data.map(x=>x.count))

    //console.log(data)
    // Create the X-axis band scale
    this.x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.categorie))
    .padding(0.2);

    //console.log(data.map(d => d.categorie))

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-25)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, mymax])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => this.x(d.categorie))
    .attr("y", d => y(d.count))
    .attr("width", this.x.bandwidth())
    .attr("height", (d) => this.height - y(d.count))
    .attr("fill", "#d04a35");
  }

}
