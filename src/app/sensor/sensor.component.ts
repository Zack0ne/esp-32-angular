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
  loading = false
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.http.get('').subscribe((payload)=>{
      this.loading = false
      console.log('sucess')
      this.sensorStatus = true
    }, (error) => {
      this.loading = false
      console.log('error')
      this.sensorStatus = true
    })
  }

  start(){
    this.loading = true
    this.http.get('').subscribe((payload)=>{
      this.loading = false
      console.log('sucess')
      this.sensorStatus = true
    }, (error) => {
      console.log('error')
      this.loading = false
      this.sensorStatus = false
      this.collectingData = true
    })
  }
  
  stop(){
    this.loading = true
    this.http.get('').subscribe((payload)=>{
      this.loading = false
      console.log('sucess')
      this.sensorStatus = true
      
    }, (error) => {
      this.loading = false
      console.log('error')
      this.sensorStatus = false
      this.collectingData = false
    })
  }
  refresh(){
    this.ngOnInit()
  }
}
