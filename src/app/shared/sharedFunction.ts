
// Sound Functions
export class Sound {
  // setup audio buffer
  async setupAudioBuffer(ctx:AudioContext, url: string):Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
  // setup gainNode
  getGainNode(ctx:AudioContext, volume:number):GainNode {
    let gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    return gainNode;
  }

  // get audio source object
  createAudioSource(ctx:AudioContext, audioBuffer:AudioBuffer, gainNode:GainNode, isLoop:boolean=false):AudioBufferSourceNode{
    let source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = isLoop;
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    return source;
  }

  //prepare audio source
  async createSound(filename:string, volume:number=1, isLoop:boolean=false,
                    fileDir:string='../../assets/sound/'):Promise<AudioBufferSourceNode> {
    let filePath = fileDir + filename;
    let ctx = new AudioContext();
    let buf = await this.setupAudioBuffer(ctx, filePath);
    let gain = this.getGainNode(ctx, volume);
    let source = this.createAudioSource(ctx, buf, gain, isLoop);
    return source;
  }

};

//Validation functions
export class Validation {
  isOnOff(value:string):boolean{
    const correctArray = ['on', 'off'];
    if(correctArray.includes(value)){
      return true;
    }
    return false;
  }
};
