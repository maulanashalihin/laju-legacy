import esbuild from "esbuild";

import svelteInertiaPlugin from "esbuild-svelte-inertia";
import sveltePlugin from "esbuild-svelte";


let clients = [];

let files = {};

let hash = {}

const port = 8001;


import { writeFileSync, readFileSync } from 'fs';



async function Build(init) {


  try {

    const start = Date.now();

    let result = await esbuild.build({
      entryPoints: ["./resources/js/app.js"],
      mainFields: ["svelte", "browser", "module", "main"],
      conditions: ["svelte", "browser"],
      bundle: true,
      minify: true,
      write: false,
      plugins: [sveltePlugin(), svelteInertiaPlugin()],
      outdir: 'public',
    })

    const end = Date.now();

    console.log(`compile done in ${end - start}ms`)

    const out = result.outputFiles;

    let manifest = `{
  "style.css" : "http://localhost:${port}/style.css",`;

    let count = 0;

    let push_change = false;

    for await (const file of out) {
      count++;
      const filename = file.path.split("/").pop();
      files[filename] = file.text;
      if (hash[filename] != file.hash) {
        push_change = true;
        hash[filename] = file.hash;
      }
      manifest += `"${filename}": "http://localhost:${port}/${filename}"${count < out.length ? "," : ""}`

    }

    if (push_change && !init) {
      console.log("compile done, pushing change...")
      clients.forEach((client) => {

        const send = `data: reload\n\n`;

        client.response.write(send);
      })
    }


    manifest += `}`

    if (init) {
      writeFileSync("./public/manifest.json", manifest)
    }

  } catch (error) {

  }




}


import chokidar from "chokidar"

var watcher = chokidar.watch('resources/js', { ignored: /^\./, persistent: true });

watcher
  .on('ready', () => {
    console.log('Initial scan complete. Ready for changes');
    Build(true)
  })
  .on('change', (path) => {

    console.log('File', path, 'has been changed');
    Build()
  })

import HyperExpress from 'hyper-express';
const webserver = new HyperExpress.Server();



import cors from "cors"

webserver.use(cors())


webserver.get("/subscribe", (request, response) => {

  response.status(200).header("Content-Type", "text/event-stream").header("Connection", "keep-alive").header("Cache-Control", "no-cache").header("X-Accel-Buffering", "no");

  const data = `data: initialize\n\n`;

  response.write(data);

  const id = (Math.random() + 1).toString(36).substring(7);;

  clients.push({
    id: id,
    response: response
  });



  response.on('close', () => {
    clients = clients.filter((client) => client.id != id);
  });

})

// Create static serve route to serve frontend assets
webserver.get('*', (request, response) => {
  // Strip away '/assets' from the request path to get asset relative path
  // Lookup LiveFile instance from our LiveDirectory instance.


  const path = request.path.replace('/', '');

  const ext = path.split(".")[1];

  try {


    let file;

    if (files[path]) {
      file = files[path]
    } else {
      file = readFileSync("public/" + path);
    }


    if (path.includes('.js')) {

      file += `
        
        var evtSource = new EventSource('http://localhost:${port}/subscribe');

         evtSource.onmessage = function (event) { 
          if (event.data.includes("reload")) {
            
            location.reload()
          }
        };`
    }





    return response.type(ext).send(file);

  } catch (error) {
    return response.status(404).send('Not Found');
  }


});

// Activate webserver by calling .listen(port, callback);
webserver.listen(port)
  .then((socket) => console.log('Webserver started on  http://localhost:' + port))
  .catch((error) => console.log('Failed to start webserver on port 80'));