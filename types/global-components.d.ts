import SvgIcon from "@/components/SvgIcon/index.vue"

/** Components registered globally by app.component need to declare TS type here to get type hints provided by Volar plugin) */
declare module "vue" {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
  }
}

export {}
