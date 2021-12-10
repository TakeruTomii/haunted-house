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

// Informations to fetch serifs
export class fetchSerifsParam {
  lang: string;
  room: string;
  clicked: string;
}

// Informations to send Mail
export class sendMailInfo {
  mail_from: string;
  mail_to: string;
  title: string;
  message: string;
}
