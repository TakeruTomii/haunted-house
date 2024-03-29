import { Component, OnInit, HostBinding } from '@angular/core';
import { IMG_PATH_CHARACTER_LIST, EXT_CHARACTER, CHARACTER_DATA, PAGE_BGMS, NO_EXIST_CHARACTER} from '../../shared/const';
import anime from 'animejs/lib/anime.es.js';
import { ErrorInfo, SoundInfo } from 'src/app/shared/dto';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { Sound, Validation } from 'src/app/shared/sharedFunction';
import { InvalidOperationError } from 'src/app/shared/error/errorClass';
import { LoadingDisplayService } from 'src/app/loading/display/loading-display.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  animations: []
})

export class CharacterListComponent implements OnInit {

  // Sound Setting
  page_sound:SoundInfo = null;
  current_volume:number = 0;
  open_source :AudioBufferSourceNode = null;
  close_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  // Validation
  validFunc = new Validation();

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

  async ngOnInit(): Promise<void> {

    // set bgm information
    this.page_sound = this.screenCtx.getSound();

    this.open_source = await this.soundFunc.createSound('se_wadaiko.mp3');
    this.close_source = await this.soundFunc.createSound('se_hyoushigi.mp3');

    this.isCurtainOpen = false;
    this.setCurrentCharacter(0);

  }

  setCurrentCharacter(chara_id : number) {
    // Validation
    const isValidCharacterId: boolean = (0 <= chara_id) && (chara_id < CHARACTER_DATA.length);
    if(!isValidCharacterId) {
      const message = NO_EXIST_CHARACTER;
      const err:ErrorInfo = { 'message': message }
      this.screenCtx.setError(err);
      throw new InvalidOperationError(message);
    }

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

  async animateCharacterChange(target: string){

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

  async characterChange(delaytime: string) {
    if(this.page_sound.is_sound_on) {
      this.close_source.start();
      this.close_source = await this.soundFunc.createSound('se_hyoushigi.mp3');

      setTimeout(async () => {
        this.open_source.start();
        this.open_source = await this.soundFunc.createSound('se_wadaiko.mp3');
      }, 1000);

    }

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

  async openCurtain(delaytime: string) {
    if(this.page_sound.is_sound_on) {
      this.open_source.start();
      this.open_source = await this.soundFunc.createSound('se_wadaiko.mp3');
    }

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
