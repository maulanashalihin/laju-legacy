 
import { createInertiaApp } from '@inertiajs/svelte'
 
import * as pages from "./Pages/**/*"

createInertiaApp({
  resolve: name => pages[name.replace("/", "")],
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})

try {
  new EventSource('http://127.0.0.1:8000/esbuild').addEventListener('change', () => {
     console.log('reloading...')
    location.reload();
  })
} catch (error) {
  
}