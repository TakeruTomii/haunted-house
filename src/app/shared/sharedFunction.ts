
// Sound Functions
// setup audio buffer
export class Sound {
  async setupAudioBuffer(ctx:AudioContext, url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  createAudioSource(ctx:AudioContext, audioBuffer: AudioBuffer):AudioBufferSourceNode{
    let source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    return source;
  }
};

