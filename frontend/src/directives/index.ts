import type { App } from 'vue'
import imageProDirective from './v-image-pro'

export default {
  install(app: App) {
    app.directive('image-pro', imageProDirective)
  }
}
