import { Component, OnInit, HostBinding } from '@angular/core';
import { IMG_PATH_CHARACTER_LIST, EXT_CHARACTER, CHARACTER_DATA} from '../../shared/const';
import { trigger, state, style, animate, transition } from '@angular/animations';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  animations: [

  ]
})
export class CharacterListComponent implements OnInit {

  // character variables
  character_id : number;
  character_name : string;
  main_image_path : string;
  character_exp : string;
  select_characters : any[];

  // Characters Data
  character_data = CHARACTER_DATA;

  constructor() { }

  ngOnInit(): void {
    this.setCurrentCharacter(0);

  }

  setCurrentCharacter(chara_id : number) {
    let chara = this.character_data[chara_id];
    let id_selecter = "#character_" + chara_id + " img";

    //set movement when cliking characters
    this.setCharacterOnTheStage(id_selecter);

    this.character_id = chara_id;
    this.character_name = chara['name'];
    this.main_image_path = IMG_PATH_CHARACTER_LIST + chara['main_image_file'] + EXT_CHARACTER;
    this.character_exp = chara['explanation'];
  }

  setCharacterOnTheStage(target: string){
    // appear all characters
    var appear = anime.timeline({
      targets: ".select-background img",
      easing: 'easeInQuad',
      duration: 10
    });
    appear
    .add({
      opacity: 1,
    })

    // selected character jump to the stage
    var on_the_stage = anime.timeline({
      targets: target,
      easing: 'easeOutQuad',
      duration: 200
    });

    on_the_stage
    .add({
      scaleX: 1.2,
      scaleY: 0.8
    })
    .add({
      scaleX: 1,
      scaleY: 1,
      opacity: 0,
      translateY: -100
    })
    .add({
      translateY: 0
    })

  }

}
