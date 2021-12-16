import { Component, OnInit, HostBinding } from '@angular/core';
import { IMG_PATH_CHARACTER_LIST, EXT_CHARACTER, CHARACTER_DATA, PAGE_BGMS} from '../../shared/const';
import anime from 'animejs/lib/anime.es.js';
import { SoundInfo } from 'src/app/shared/dto';
import { ContextService } from 'src/app/shared/inter-screen/context.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  animations: [

  ]
})



export class CharacterListComponent implements OnInit {

  // Sound Setting
  page_sound:SoundInfo = null;
  current_volume:number = 0;

  // character variables
  character_id : number;
  character_name : string;
  main_image_path : string;
  character_exp : string;
  select_characters : any[];
  isCurtainOpen : boolean;

  // Characters Data
  character_data = CHARACTER_DATA;

  constructor(private screenCtx: ContextService) { }

  ngOnInit(): void {
    // set bgm information
    this.page_sound = this.screenCtx.getSound();
    // TODO: error handling
    if(!this.page_sound) {
      this.page_sound = {
        is_sound_on: false,
        volume: 0,
        bgm_filename: PAGE_BGMS["character-list"]
      }
    }

    this.isCurtainOpen = false;
    this.setCurrentCharacter(0);
  }

  setCurrentCharacter(chara_id : number) {
    let chara = this.character_data[chara_id];
    let id_selecter = "#character_" + chara_id + " img";

    //set movement when cliking characters
    this.animateCharacterChange(id_selecter);

    setTimeout(() => {
      this.character_id = chara_id;
      this.character_name = chara['name'];
      this.main_image_path = IMG_PATH_CHARACTER_LIST + chara['main_image_file'] + EXT_CHARACTER;
      this.character_exp = chara['explanation'];
    }, 500)

  }

  animateCharacterChange(target: string){
    // curtain movement
    if(this.isCurtainOpen) {
      this.characterChange('0');
    } else {
      this.openCurtain('0');
    }

    // appear all characters
    var appear = anime.timeline({
      targets: ".select-background img",
      easing: 'easeInQuad',
      duration: 10
    });

    appear
    .add({
      opacity: 1,
    });

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
    });

  }

  characterChange(delaytime: string) {
    var close_open = anime.timeline({
      targets: ".curtain",
      easing: 'linear',
      delay: delaytime
    });

    close_open
    .add({
      width: "100%",
      duration: 500
    })
    .add ({
      duration: 500
    })
    .add({
      width: "0%",
      duration: 1500
    })
  }

  openCurtain(delaytime: string) {
    var open = anime.timeline({
      targets: ".curtain",
      easing: 'linear',
      duration: 1500,
      delay: delaytime
    });

    open
    .add({
      width: "0%"
    })

    this.isCurtainOpen = true;
  }

  preserveVolume(volume:number) {
    this.current_volume = volume;
  }

}
