import {v4} from "uuid";

import manifest from "../../public/manifest.json"; 
export function generateUUID() {
    return v4();
}

export function asset(path)
{ 
  return manifest[path];
  
}
