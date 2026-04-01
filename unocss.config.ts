import { defineConfig, presetAttributify, presetUno } from "unocss"

export default defineConfig({
  /** default */
  presets: [presetAttributify(), presetUno()],

  rules: [
    ["uno-padding-20", { padding: "20px" }],
    [/^w-(\d+)%$/, (match) => ({ width: `${match[1]}%` })],
    [
      /^form-item-(\d+)-(\d+)$/,
      ([, x, y]) => {
        const xx = parseInt(x) || 0
        const yy = parseInt(y) || 1
        return {
          width: `calc(100% * ${xx / yy})`,
          "align-items": "flex-start"
        }
      }
    ]
  ],

  shortcuts: {
    "uno-wh-full": "w-full h-full",
    "uno-flex-center": "flex justify-center items-center",
    "uno-flex-x-center": "flex justify-center",
    "uno-flex-y-center": "flex items-center"
  }
})
