 

import { randomUUID } from "crypto";
import manifest from "../../public/manifest.json"; 
export function generateUUID() {
    return randomUUID();
}

export function asset(path)
{ 
  return manifest[path];
  
}
