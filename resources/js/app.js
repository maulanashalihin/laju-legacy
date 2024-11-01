import { createInertiaApp } from '@inertiajs/svelte'
import "./index.css"
import { mount } from 'svelte'

createInertiaApp({
  resolve: name => require(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    mount(App, { target: el, props })
  },
})
 