import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'highcharts'
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  sensorStatus = false
  collectingData = true
  loading = false
  highchart: any
  backendIp = 'localhost:3000'
  tempData: any[] = [];
  smokeData: any[] = [];
  sonicwaveData: any[] = [];

  // this.tempDataChart
  // this.smokeDataChart
  // this.sonicwaveChart

  constructor(
    private http: HttpClient,
  ) { 
    if(localStorage.getItem("backendIp")){
      this.backendIp = JSON.parse(localStorage.getItem("backendIp") as string)
    }
  }

  ngOnInit(): void {
    this.loading = true
    this.http.get(`http://${this.backendIp}/`, {responseType: 'text'}).subscribe((payload)=>{
      this.loading = false
      this.sensorStatus = true
      console.log('sucess')
      // if(payload == 'true')  this.collectingData = true
      // else if(payload == 'false')  this.collectingData = false
      this.initHighchart()
      this.injectData()
    }, (error) => {
      this.loading = false
      console.log(error)
      this.sensorStatus = false
    })
  }

  refresh(){
    localStorage.setItem("backendIp", JSON.stringify(this.backendIp));
    this.ngOnInit()
  }

  injectData(){
    this.tempData = []
    this.smokeData = []
    this.sonicwaveData = []
    this.http.get(`http://${this.backendIp}/sensor`).subscribe((payload:any)=>{
      payload.forEach((element:any) => {
        let timestamp:number = ((new Date(element.timestamp)).getTime() - (new Date().getTimezoneOffset()*60*1000))
        this.tempData.push([timestamp, element.temp_value])
        this.smokeData.push([timestamp, element.smoke_value])
        this.sonicwaveData.push([timestamp, element.ultrasonic_value])
      });
      console.log(this.tempData, this.smokeData, this.sonicwaveData)
      // this.highchart.addSeries() 
      this.initHighchart()
    })
  }

  initHighchart(){
    let option: any = {
      chart:{
        renderTo: 'highchart-sensor'
      },
      title: {
          text: 'Sensor Datas'
      },
  
      subtitle: {
          text: 'Chart'
      },
  
      yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: 'red'
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: 'red'
            }
        },
        opposite: true

    }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
            text: 'Ultrasonic',
            style: {
                color: 'blue'
            }
        },
        labels: {
            format: '{value} cm',
            style: {
                color: 'blue'
            }
        }

    }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
            text: 'Smoke',
            style: {
                color: 'gray'
            }
        },
        labels: {
            format: '{value} smoke',
            style: {
                color: 'gray'
            }
        },
        opposite: true
    }],
  
    xAxis: {
			title: {
				text: 'Hour'
			},
			type: 'datetime',
			dateTimeLabelFormats: {
					hour: '%H:%M' 
      },
			// labels: {
			// 	rotation: 315,
			// 	formatter: function() {
			// 		return this.value; // clean, unformatted number for year
			// 	}
			// }
		},
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2010
          }
      },
  
      series: [{
          name: 'Temperature',
          // yAxis: 1,
          color: 'red',
          data: this.tempData
        }, {
          name: 'Smoke',
          data: this.smokeData,
          color: 'grey',
          yAxis: 2,
          type: 'column'
          
        }, {
          name: 'SonicWave',
            color: 'blue',
          yAxis: 1,
          data: this.sonicwaveData,
      }],
      
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  
  }
    this.highchart  = Highcharts.chart(option);
  }
}
