export interface AudioState {
  isAutoMode: boolean
  isProcessing: boolean
  isRecording: boolean
  isThinking: boolean
  currentVolume: number
  threshold: number
  language: string
  format: string
}

export interface AudioRefs {
  context: AudioContext | null
  stream: MediaStream | null
  worklet: AudioWorkletNode | null
  recorder: MediaRecorder | null
  chunks: Blob[]
}

export interface RecognizeResult {
  id: number
  timestamp: string
  text: string
  language: string
  format: string
  status: "pending" | "success" | "error"
}
