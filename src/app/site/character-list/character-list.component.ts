import { Component, OnInit } from '@angular/core';

import { IMG_PATH_CHARACTER_LIST, EXT_CHARACTER, CHARACTER_DATA} from '../../shared/const';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
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

    this.character_id = chara_id;
    this.character_name = chara['name'];
    this.main_image_path = IMG_PATH_CHARACTER_LIST + chara['main_image_file'] + EXT_CHARACTER;
    this.character_exp = chara['explanation'];
  }
}
