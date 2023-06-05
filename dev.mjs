import * as esbuild from 'esbuild' 
import sveltePlugin from 'esbuild-svelte'; 
import svelteInertiaPlugin from 'esbuild-svelte-inertia';
import fs from "fs"

let ctx = await esbuild.context({
  entryPoints: ["resources/js/app.js"],
  mainFields: ["svelte", "browser", "module", "main"],
  bundle: true,
  outfile: "public/js/app.js",
  minify: false,
  plugins: [sveltePlugin(),svelteInertiaPlugin()],
  logLevel: "info", 
})

await ctx.watch()
console.log('watching...')
 
let { host, port } = await ctx.serve({
  servedir: 'public'
})



let data = `
{
  "js/app.js": "http://${host}:${port}/js/app.js"
}`;

fs.writeFileSync("public/manifest.json", data, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n"); 
  }
});