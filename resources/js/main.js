import * as pages from "./Pages/**/*"
import { createInertiaApp } from '@inertiajs/svelte' 

createInertiaApp({
    resolve: name => pages[name.replace("/", "")],
    setup({ el, App, props }) {
      new App({ target: el, props })
    },
  })