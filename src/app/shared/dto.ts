//Context Object
export class CrossScreenContext {
  sound: SoundInfo;
}

// Initial Settings
export class InitConf {
  lang: string;
  sound: string;
}

// Informations to move rooms
export class RoomInfo {
  roomName: string;
}

// Informations to fetch serifs
export class FetchSerifsParam {
  lang: string;
  room: string;
  clicked: string;
}

// Informations to send Mail
export class SendMailInfo {
  mail_from: string;
  mail_to: string;
  title: string;
  message: string;
}

// Informations to Control sound
export class SoundInfo {
  is_sound_on: boolean;
  volume: number;
  bgm_filename: string;
}

// Informations to handle exceptions
export class ErrorInfo {
  message: string;
}

