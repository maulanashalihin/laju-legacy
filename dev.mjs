import * as esbuild from 'esbuild' 
import sveltePlugin from 'esbuild-svelte'; 
import svelteInertiaPlugin from 'esbuild-svelte-inertia';


let ctx = await esbuild.context({
  entryPoints: ["resources/js/app.js"],
  mainFields: ["svelte", "browser", "module", "main"],
  bundle: true,
  outfile: "public/js/app.js",
  minify: true,
  plugins: [sveltePlugin(),svelteInertiaPlugin()],
  logLevel: "info", 
})

await ctx.watch()
console.log('watching...')
 
let { host, port } = await ctx.serve({
  servedir: 'public'
})
