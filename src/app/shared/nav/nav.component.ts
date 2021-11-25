import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  // Sound Settings
  sound_selected='on';
  sounds = [
    {label:'ON', value: 'on'},
    {label:'OFF', value: 'off'}
  ]

  constructor() { }

  ngOnInit(): void {
    var volume = document.getElementById('sound_input');
    var target = document.getElementById('vol_value');
    var rangeValue =  (volume, target) => {
      return (event) => {
        target.innerHTML = volume.value;
        var icon = document.getElementById('sound-icon');
        if(volume.value === "0"){
          icon.classList.add('volume-zero');
        }else{
          icon.classList.remove('volume-zero');
        }
      }
    }
    volume.addEventListener('input', rangeValue(volume, target));
  }

}
