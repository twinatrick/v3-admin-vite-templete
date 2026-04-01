import { defineConfig } from "cypress"
import vitePreprocessor from "cypress-vite"

export default defineConfig({
  scrollBehavior: undefined,
  projectId: "ei3rxo",
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
      _on("file:preprocessor", vitePreprocessor())
    }
  },
  video: true,
  viewportHeight: 1080,
  viewportWidth: 1920,

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite"
    }
  }
})
