
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
  createAudioSource(ctx:AudioContext, audioBuffer:AudioBuffer, gainNode:GainNode):AudioBufferSourceNode{
    let source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    return source;
  }
};

