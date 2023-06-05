require('dotenv').config()

import inertia from "./app/middlewares/inertia";

import Web from "./routes/web"; 

const HyperExpress = require('hyper-express');
const webserver = new HyperExpress.Server();

const LiveDirectory = require('live-directory');

 import manifest from "./public/manifest.json";

 import {version} from "./package.json";

//  rendering html files
// import view from "./app/utils/view";
// webserver.use(view());
// 


// rendering svelte files
require('svelte/register');
 
  


webserver.use(
    inertia({
        view: "index",
        version: version,
        js : manifest["js/app.js"]
    })
);

webserver.use(Web); 

const LiveAssets = new LiveDirectory(__dirname+"/public",{  // We want to provide the system path to the folder. Avoid using relative paths.
    keep: {
        extensions: ['.css', '.js', '.json', '.png', '.jpg', '.jpeg'] // We only want to serve files with these extensions
    },
    cache: {
        max_file_count: 200, // 2.5 MB * 200 = 250 MB - This means you won't go over 250 MB of cached memory for your assets 
        max_file_size: 1024 * 1024 * 2.5, // 2.5 MB - Most assets will be under 2.5 MB hence they can be cached
    },
    ignore: (path) => {
        return path.startsWith('.'); // We want to ignore dotfiles for safety
    }
});



// Create static serve route to serve frontend assets
webserver.get('*', (request, response) => {
    // Strip away '/assets' from the request path to get asset relative path
    // Lookup LiveFile instance from our LiveDirectory instance.

    const path = request.path;
 
 

    const asset = LiveAssets.get(path);
    if (!asset) return response.status(404).send('Not Found');
    
    // Send the asset content as response depending on if the file is cached
    if (asset.cached) {
        // Simply send the Buffer returned by asset.content as the response
        // You can convert a Buffer to a string using Buffer.toString() if your webserver requires string response body
        return response.send(asset.content);
    } else {
        // For files that are not cached, you must create a stream and pipe it as the response for memory efficiency
        const readable = asset.stream();
        return readable.pipe(response);
    }
});

 
// Activate webserver by calling .listen(port, callback);
webserver.listen(3005).catch((err: any) => {
    console.log(err);
}) 