export function hasField(form,type){
    let item = form.list_field.find(item => {
        return item.type == type;
    })
    return item;
}
export function getCookieName(form){
    if(document.cookie && form.show_affiliate_name)
    {
        const rc = document.cookie

        let hasAffiliate;
        let affiliateName;

        hasAffiliate = rc.split(';').find(item => {
            return item.includes(form.id + '-user-affiliate');
        })

        if(form.global_affiliate && !hasAffiliate)
        {

            hasAffiliate = rc.split(';').find(item => {
                return item.includes('global-affiliate');
            })
            
        }


        
        if(hasAffiliate)
        {
             affiliateName = rc.split(';').find(item => {
                return item.includes('affiliate_name');
            })

            if(affiliateName)
            {
                return affiliateName.split('=')[1]
            }
        }
    }

    return;
}

export function getCookieNameV2(form_id){
    const data = decryptCookie(`affiliate-user_name-${form_id}=`)
   
    if(data)
    {
     
        return data.message;
    } 
  
}

export function getUplineID(form_id){
    const data = decryptCookie(`upline_id-${form_id}=`)
   
    if(data)
    {
     
        return data.message;
    } 
  
}

export function getUplineName(form_id){
    const data = decryptCookie(`upline_name-${form_id}=`)
   
    if(data)
    {
     
        return data.message;
    } 
  
}

 

export function decryptCookie(key)
{   
    const data = document.cookie.split(key)[1]; 

    if(!data)
    { 
        return;
    }

    const userIdValue = data.split(';')[0]

     /**
      * Base 64 decoding the value
      */
     const base64Decoded = atob(userIdValue)
     
     /**
      * Converting the JSON string to an object
      */
     const jsonParsed = JSON.parse(base64Decoded)

     return jsonParsed;
}
export function getCookieGlobalName(form){

 
  
    if(form.global_affiliate)
    {
        const data = decryptCookie(`dripform-affiliate-data=`)

     
        if(data)
        {
            return data.message.affiliate_name;
        }
        
    } 
}

export function getAffiliateID(form){

    let exist = document.cookie.split(';').find(item => {
        return item.includes(form.id + '-affiliate');
    })
 
    if (exist) {
        return exist.split('=')[1] 
    }

}

export function getAffiliateIDV2(form_id){

    const data = decryptCookie(`affiliate-user_id-${form_id}=`)
   
    if(data)
    {
     
        return data.message;
    } 
    
}

export function getAffiliateIDGlobal(form){

    if(form.global_affiliate)
    {
        const data = decryptCookie(`dripform-affiliate-data=`)

     
        if(data)
        {
            return data.message.user_id;
        }
        
    } 
    
}

// Changes XML to JSON

export function xml2json(xml, tab) {
    var X = {
       toObj: function(xml) {
          var o = {};
          if (xml.nodeType==1) {   // element node ..
             if (xml.attributes.length)   // element with attributes  ..
                for (var i=0; i<xml.attributes.length; i++)
                   o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
             if (xml.firstChild) { // element has child nodes ..
                var textChild=0, cdataChild=0, hasElementChild=false;
                for (var n=xml.firstChild; n; n=n.nextSibling) {
                   if (n.nodeType==1) hasElementChild = true;
                   else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                   else if (n.nodeType==4) cdataChild++; // cdata section node
                }
                if (hasElementChild) {
                   if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                      X.removeWhite(xml);
                      for (var n=xml.firstChild; n; n=n.nextSibling) {
                         if (n.nodeType == 3)  // text node
                            o["#text"] = X.escape(n.nodeValue);
                         else if (n.nodeType == 4)  // cdata node
                            o["#cdata"] = X.escape(n.nodeValue);
                         else if (o[n.nodeName]) {  // multiple occurence of element ..
                            if (o[n.nodeName] instanceof Array)
                               o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                            else
                               o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                         }
                         else  // first occurence of element..
                            o[n.nodeName] = X.toObj(n);
                      }
                   }
                   else { // mixed content
                      if (!xml.attributes.length)
                         o = X.escape(X.innerXml(xml));
                      else
                         o["#text"] = X.escape(X.innerXml(xml));
                   }
                }
                else if (textChild) { // pure text
                   if (!xml.attributes.length)
                      o = X.escape(X.innerXml(xml));
                   else
                      o["#text"] = X.escape(X.innerXml(xml));
                }
                else if (cdataChild) { // cdata
                   if (cdataChild > 1)
                      o = X.escape(X.innerXml(xml));
                   else
                      for (var n=xml.firstChild; n; n=n.nextSibling)
                         o["#cdata"] = X.escape(n.nodeValue);
                }
             }
             if (!xml.attributes.length && !xml.firstChild) o = null;
          }
          else if (xml.nodeType==9) { // document.node
             o = X.toObj(xml.documentElement);
          }
          else
             alert("unhandled node type: " + xml.nodeType);
          return o;
       },
       toJson: function(o, name, ind) {
          var json = name ? ("\""+name+"\"") : "";
          if (o instanceof Array) {
             for (var i=0,n=o.length; i<n; i++)
                o[i] = X.toJson(o[i], "", ind+"\t");
             json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
          }
          else if (o == null)
             json += (name&&":") + "null";
          else if (typeof(o) == "object") {
             var arr = [];
             for (var m in o)
                arr[arr.length] = X.toJson(o[m], m, ind+"\t");
             json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
          }
          else if (typeof(o) == "string")
             json += (name&&":") + "\"" + o.toString() + "\"";
          else
             json += (name&&":") + o.toString();
          return json;
       },
       innerXml: function(node) {
          var s = ""
          if ("innerHTML" in node)
             s = node.innerHTML;
          else {
             var asXml = function(n) {
                var s = "";
                if (n.nodeType == 1) {
                   s += "<" + n.nodeName;
                   for (var i=0; i<n.attributes.length;i++)
                      s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                   if (n.firstChild) {
                      s += ">";
                      for (var c=n.firstChild; c; c=c.nextSibling)
                         s += asXml(c);
                      s += "</"+n.nodeName+">";
                   }
                   else
                      s += "/>";
                }
                else if (n.nodeType == 3)
                   s += n.nodeValue;
                else if (n.nodeType == 4)
                   s += "<![CDATA[" + n.nodeValue + "]]>";
                return s;
             };
             for (var c=node.firstChild; c; c=c.nextSibling)
                s += asXml(c);
          }
          return s;
       },
       escape: function(txt) {
          return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
       },
       removeWhite: function(e) {
          e.normalize();
          for (var n = e.firstChild; n; ) {
             if (n.nodeType == 3) {  // text node
                if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                   var nxt = n.nextSibling;
                   e.removeChild(n);
                   n = nxt;
                }
                else
                   n = n.nextSibling;
             }
             else if (n.nodeType == 1) {  // element node
                X.removeWhite(n);
                n = n.nextSibling;
             }
             else                      // any other node
                n = n.nextSibling;
          }
          return e;
       }
    };
    if (xml.nodeType == 9) // document node
       xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
 }

 export function password_generator( pLength ) {
   var keyListAlpha="abcdefghijklmnopqrstuvwxyz",
   keyListInt="123456789",
   keyListSpec="!@#_",
   password='';
var len = Math.ceil(pLength/2);
len = len - 1;
var lenSpec = pLength-2*len;

for (let i=0;i<len;i++) {
   password+=keyListAlpha.charAt(Math.floor(Math.random()*keyListAlpha.length));
   password+=keyListInt.charAt(Math.floor(Math.random()*keyListInt.length));
}

for (let i=0;i<lenSpec;i++)
   password+=keyListSpec.charAt(Math.floor(Math.random()*keyListSpec.length));

password=password.split('').sort(function(){return 0.5-Math.random()}).join('');

return password;
}



export function getTimeZone()
{
  let zone = "WIB";

  switch (new Date().getTimezoneOffset()) {
    case -480:
      // code block
      zone = "WITA";
      break;
    case -520:
      // code block
      zone = "WIT";
      break;
    default:
    // code block
  }

  return zone
}

export   function saveToLocal(lead)
{
   localStorage.setItem('lead_data', JSON.stringify(lead));
}

export function makeid(length) {
   let result = '';
   const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   let counter = 0;
   while (counter < length) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
     counter += 1;
   }
   return result;
}