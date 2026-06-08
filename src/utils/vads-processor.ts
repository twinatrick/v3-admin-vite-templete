// src/utils/vads-processor.ts
export interface VADSMessage {
  volume: number
}

// 宣告全域的 AudioWorkletProcessor 與 registerProcessor
declare let AudioWorkletProcessor: any
declare let registerProcessor: any

class VADSProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], _outputs: Float32Array[][], _parameters: Record<string, Float32Array>): boolean {
    const input = inputs[0]
    if (input && input.length > 0) {
      const channelData = input[0]
      let sum = 0
      for (let i = 0; i < channelData.length; i++) {
        sum += channelData[i] * channelData[i]
      }
      const rms = Math.sqrt(sum / channelData.length)
      // 轉換為 0-100 的音量值，可依需求調整倍率
      const volume = Math.min(100, Math.round(rms * 1000))

      // @ts-ignore
      this.port.postMessage({ volume } as VADSMessage)
    }
    return true
  }
}

registerProcessor("vads-processor", VADSProcessor)
