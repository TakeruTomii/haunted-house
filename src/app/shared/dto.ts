import { Component } from "@angular/core";

//初期設定情報
export class InitConf {
  lang: string;
  sound: string;
}

//部屋移動の情報
export class RoomInfo {
  roomName: string;
}

//セリフ取得用の情報
export class fetchSerifsParam {
  lang: string;
  room: string;
  clicked: string;
}
