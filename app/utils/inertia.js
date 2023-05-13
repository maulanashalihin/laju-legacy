import { option } from "yargs";

const lodashPick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const setupProps = async (props,req) => {
      
    let _props = props; 

    const share = req.share || {};

    let error = req.cookies.error;

     

    _props = { ...props, ...share, error };

    return _props;
};

const getRequestedProps = (req, component, props) => {
    const requestedProps = req.header("X-Inertia-Partial-Data");
    if (requestedProps) {
        if (req.header("X-Inertia-Partial-Component") === component) {
            return lodashPick(props, requestedProps.split(","));
        }
    } 
    return props;
};

const shouldSeeOther = (req, res) => {
    const methods = ["PUT", "PATCH", "DELETE"];
    return res.statusCode === 303 && methods.includes(req.method);
};

const shouldConflict = (req, version) => {
    return req.method === `GET` && req.header("X-Inertia-Version") !== version;
};
 
function view( {page,js}) {
    
    const result =  `<!DOCTYPE html>
    <html lang="en-gb">
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Orderform</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
    
        <div id="app" data-page='${  (page) }'></div>
     
        <script src="${js}"></script>
    
    </body>
    </html>`
 
    return result;
    
}

const inertia = (options = {}) => {
    options = {
        version: null,
        view: "app",
        ...options,
    };

    return (req, res, next) => {
        
        res.inertia = async (component, inertiaProps, viewProps) => {
            const url = `${req.protocol}://${req.get("host")}${
                req.originalUrl
            }`; 
            const props = getRequestedProps(req, component, inertiaProps);
            const inertiaObject = {
                component: component,
                props: await setupProps(props, req),
                url: url, 
                version: options.version,
            }; 

            if(inertiaObject.props.error)
            {
                res.clearCookie("error")
            }

            if (!req.header("X-Inertia")) 
            { 
                const html = await view( 
                    {
                        layout: false,
                        js : options.js,
                        page: JSON.stringify(inertiaObject),
                        ...viewProps,
                    });

                return res.send(html) 
            }

            if (shouldConflict(req, options.version)) {
                if (req.session && typeof req.flash === "function") {
                    const messages = req.flash();
                    for (message in messages) {
                        req.flash(message, messages[message]);
                    }
                }
                res.setHeader("X-Inertia-Location", url);
                return res.status(409).end();
            }

            res.setHeader("Vary", "Accept");
            res.setHeader("X-Inertia", "true");
            res.setHeader("X-Inertia-Version", options.version);

            return res.json(inertiaObject);
        };

        const end = res.end;
        res.end = function () {
            if (shouldSeeOther(req, res)) {
                res.status(303);
            }
            return end.apply(this, arguments);
        };
        next();
    };
};

export default inertia;