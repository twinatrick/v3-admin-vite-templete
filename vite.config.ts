/// <reference types="vitest" />

import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import path, { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import svgLoader from "vite-svg-loader"
import UnoCSS from "unocss/vite"

/** config doc：https://vitejs.dev/config/ */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  console.log("viteEnv:", viteEnv)
  return {
    /** base dir */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ point to /src dir */
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      /** HTTPS */
      https: false,
      /** set host: true to use ip to access website */
      host: true, // host: "0.0.0.0"
      /** port */
      port: 3333,
      /** auto open browser */
      open: false,
      /** cros */
      cors: true,
      /** when port is used, strictly exit */
      strictPort: false,
      /** proxy */
      proxy: {
        "/api/v1": {
          target: "http://localhost:8000",
          ws: true,
          /** cros */
          changeOrigin: true,
          rewrite: (path) => path.replace("/api/v1", "/")
        },
        "/ws": {
          target: "ws://localhost:8000",
          ws: true,
          changeOrigin: true
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x up need to set minify: "terser", thus terserOptions has effect */
      minify: "terser",
      /** remove console.log, debugger and comments when building*/
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        format: {
          /** remove comments */
          comments: false
        }
      },
      /** static file path when building */
      assetsDir: "static"
    },
    /** Vite plugin */
    plugins: [
      vue(),
      vueDevTools(),
      vueJsx(),
      /** change svg to vue component */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ],
    /** Vitest unit test config：https://vitejs.dev/config/ */
    test: {
      include: ["tests/**/*.test.ts"],
      environment: "jsdom",
      deps: {
        inline: ["element-plus", "@popperjs/core"]
      },
      testTimeout: 30000,
      hookTimeout: 30000,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: [
          "src/views/system-management/user/service.ts",
          "src/views/system-management/skill/service.ts",
          "src/views/system-management/project/service.ts",
          "src/views/personal-management/skill/service.ts",
          "src/views/personal-management/project/service.ts"
        ],
        exclude: ["node_modules/**", "tests/**"],
        all: false
      }
    },
    define: {
      _GIT_SHA: currentGitSHA()
    }
  }
}

import fs from "fs"

function currentGitSHA() {
  try {
    const gitHistory = fs.readFileSync(path.join(__dirname, ".git/logs/HEAD"), {
      encoding: "utf-8",
      flag: "r"
    })
    const lines = gitHistory.split("\n")
    const sha = lines[lines.length - 2].split(" ")[1]
    return JSON.stringify(sha)
  } catch (err) {
    console.log(err)
    return JSON.stringify("error")
  }
}
