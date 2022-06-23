import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  sensorStatus = false
  collectingData = true
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('').subscribe((payload)=>{
      console.log('sucess')
      this.sensorStatus = true
    }, (error) => {
      console.log('error')
      this.sensorStatus = true
    })
  }

  start(){
    this.http.get('').subscribe((payload)=>{
      console.log('sucess')
      this.sensorStatus = true
    }, (error) => {
      console.log('error')
      this.sensorStatus = false
    })
  }
  
  stop(){
    this.http.get('').subscribe((payload)=>{
      console.log('sucess')
      this.sensorStatus = true
    }, (error) => {
      console.log('error')
      this.sensorStatus = false
    })
  }
  refresh(){
    this.ngOnInit()
  }
}
