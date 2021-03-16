import { Component } from "@angular/core";

// Initial Settings
export class InitConf {
  lang: string;
  sound: string;
}

// Informations to move rooms
export class RoomInfo {
  roomName: string;
}

// informations to fetch serifs
export class fetchSerifsParam {
  lang: string;
  room: string;
  clicked: string;
}
