
const esbuild = require("esbuild");  
const sveltePlugin  = require("esbuild-svelte");
const svelteInertiaPlugin = require("esbuild-svelte-inertia")

esbuild
  .build({
    entryPoints: ["resources/js/app.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    bundle: true,
    outfile: "public/js/app.js",
    minify: true,
    plugins: [sveltePlugin(),svelteInertiaPlugin()],
    logLevel: "info", 
  })
  .catch(() => process.exit(1));