import esbuild from "esbuild";
import crypto from "crypto";
import svelteInertiaPlugin from "esbuild-svelte-inertia";
import sveltePlugin from "esbuild-svelte";


let clients = [];

let files = {};

let hash = {}

let sse_streams = {};

const port = 8001;



 
import {writeFileSync,readFileSync} from 'fs'; 
 


async function Build(init) {

try {
  

  const start = Date.now();

  

  let result = await esbuild.build({
    entryPoints: ['./resources/js/app.js'],
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    bundle: true,
    minify: false,
    write: false,
    plugins: [sveltePlugin(), svelteInertiaPlugin()],
    outdir: 'public',
  })

  const end = Date.now();

  console.log(`compile done in ${end - start}ms`)

  const out = result.outputFiles;

  let manifest = `{ `;

  let count = 0;

  let push_change = false;

  for await (const file of out) {
   
    count++;
    const filename = file.path.split("/").pop();
    files[filename] = file.text;
    if(hash[filename] != file.hash)
    {
      push_change = true;
      hash[filename] = file.hash;
    }
    manifest += `"${filename}": "http://localhost:${port}/${filename}"${count < out.length  ? "," : ""}`
   
  }

  

  if(push_change && !init)
  {
    console.log("compile done, pushing change...")

    Object.keys(sse_streams).forEach((id) => {
      sse_streams[id].send("reload");
  })

  }
  

  manifest+=` }`
 
 
  if(init)
  { 
    writeFileSync( "./public/assets/manifest.json", manifest)
  }

} 

  catch (error) {
  
  }
    
  
}


import chokidar from "chokidar"

var watcher = chokidar.watch('resources/js', { ignored: /^\./, persistent: true });

watcher
  .on('ready', ()=>{
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

  response.status(200).header("Content-Type", "text/event-stream").header("Connection", "keep-alive").header("Cache-Control", "no-cache");

  response.sse.open();
  // OR you may also send a message which will open the stream automatically
  response.sse.send('initialize');
  
  // Assign a unique identifier to this stream and store it in our broadcast pool
  response.sse.id = crypto.randomUUID();

  sse_streams[response.sse.id] = response.sse;

  response.on('error', () => {
    delete sse_streams[response.sse.id];
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

    if(path == "favicon.ico")
    {
      file = readFileSync("public/icon/favicon.ico");
    }
    else if (files[path]) {
      file = files[path];
    } else { 
      file = readFileSync("public/" + path);
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