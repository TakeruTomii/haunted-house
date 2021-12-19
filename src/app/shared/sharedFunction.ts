
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

  //prepare audio source for BGM
  //set volume any value
  async prepareBGM(filename:string, volume:number):Promise<AudioBufferSourceNode> {
    let filePath = '../../assets/sound/' + filename
    let ctx = new AudioContext();
    let buf = await this.setupAudioBuffer(ctx, filePath);
    let gain = this.getGainNode(ctx, volume);
    let source = this.createAudioSource(ctx, buf, gain);
    return source;
  }

  //prepare audio source for sound effect
  //fix bolume max
  async prepareSoundEffectSource(filename:string):Promise<AudioBufferSourceNode> {
    let filePath = '../../../assets/sound/' + filename
    let ctx = new AudioContext();
    let buf = await this.setupAudioBuffer(ctx, filePath);
    let gain = this.getGainNode(ctx, 1);
    let source = this.createAudioSource(ctx, buf, gain);
    return source;
  }
};

