import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})

// class Sensor{
//   url: string

// }

export class SensorComponent implements OnInit {
  sensorStatus = false
  collectingData = true
  loading = false
  espIp = '192.168.0.137'
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.http.get(`http://${this.espIp}/`, {responseType: 'text'}).subscribe((payload)=>{
      this.loading = false
      this.sensorStatus = true
      console.log('sucess')
      if(payload == 'true')  this.collectingData = true
      else if(payload == 'false')  this.collectingData = false
    }, (error) => {
      this.loading = false
      console.log(error)
      this.sensorStatus = false
    })
  }

  start(){
    this.loading = true
    this.http.get(`http://${this.espIp}/start`, {responseType: 'text'}).subscribe((payload)=>{
      this.loading = false
      this.sensorStatus = true
      console.log('sucess')
      if(payload == 'true')  this.collectingData = true
      else if(payload == 'false')  this.collectingData = false
    }, (error) => {
      this.loading = false
      console.log('error')

      this.collectingData = true
    })
  }
  
  stop(){
    this.loading = true
    this.http.get(`http://${this.espIp}/stop`, {responseType: 'text'}).subscribe((payload)=>{
      this.loading = false
      this.sensorStatus = true
      console.log('sucess')
      if(payload == 'true')  this.collectingData = true
      else if(payload == 'false')  this.collectingData = false
      
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
