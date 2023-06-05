
const esbuild = require("esbuild");  
const sveltePlugin  = require("esbuild-svelte");
const svelteInertiaPlugin = require("esbuild-svelte-inertia")
const fs = require('fs');
const path = require('path');

const outfile = `/js/app-${(Math.random() + 1).toString(36).substring(7)}.js`;



esbuild
  .build({
    entryPoints: ["resources/js/app.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    bundle: true,
    outfile: "public"+outfile,
    minify: true,
    plugins: [sveltePlugin(),svelteInertiaPlugin()],
    logLevel: "info", 
  })
  .catch(() => process.exit(1));




 


 
const files =   fs.readdirSync("public/js");

for (const file of files) {
  fs.unlinkSync(path.join("public/js", file));
}
 

let data = `
{
  "js/app.js": "${outfile}"
}`;

fs.writeFileSync("public/manifest.json", data, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n"); 
  }
});
