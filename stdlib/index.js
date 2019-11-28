#!/usr/bin/env node
             
const https = require('https');
const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');
const zlib = require('zlib');
const stream = require('stream');             
const {request:t} = https;
const {request:y} = http;
const {debuglog:z} = util;
const A = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, B = (a, b = !1) => A(a, 2 + (b ? 1 : 0)), C = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:G} = os;
const H = /\s+at.*(?:\(|\s)(.*)\)?/, I = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, J = G(), K = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, f = new RegExp(I.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(d => {
    d = d.match(H);
    if (null === d || !d[1]) {
      return !0;
    }
    d = d[1];
    return d.includes(".app/Contents/Resources/electron.asar") || d.includes(".app/Contents/Resources/default_app.asar") ? !1 : !f.test(d);
  }).filter(d => d.trim()).map(d => b ? d.replace(H, (e, h) => e.replace(h, h.replace(J, "~"))) : d).join("\n");
};
function L(a, b, c = !1) {
  return function(f) {
    var d = C(arguments), {stack:e} = Error();
    const h = A(e, 2, !0), l = (e = f instanceof Error) ? f.message : f;
    d = [`Error: ${l}`, ...null !== d && a === d || c ? [b] : [h, b]].join("\n");
    d = K(d);
    return Object.assign(e ? f : Error(), {message:l, stack:d});
  };
}
;function M(a) {
  var {stack:b} = Error();
  const c = C(arguments);
  b = B(b, a);
  return L(c, b, a);
}
;const {parse:N} = url;
const {Writable:O} = stream;
const P = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Q extends O {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...f} = a || {}, {a:d = M(!0), proxyError:e} = a || {}, h = (l, n) => d(n);
    super(f);
    this.b = [];
    this.g = new Promise((l, n) => {
      this.on("finish", () => {
        let g;
        b ? g = Buffer.concat(this.b) : g = this.b.join("");
        l(g);
        this.b = [];
      });
      this.once("error", g => {
        if (-1 == g.stack.indexOf("\n")) {
          h`${g}`;
        } else {
          const r = K(g.stack);
          g.stack = r;
          e && h`${g}`;
        }
        n(g);
      });
      c && P(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.b.push(a);
    c();
  }
  get c() {
    return this.g;
  }
}
const R = async(a, b = {}) => {
  ({c:a} = new Q({rs:a, ...b, a:M(!0)}));
  return await a;
};
const {createGunzip:S} = zlib;
const T = a => {
  ({"content-encoding":a} = a.headers);
  return "gzip" == a;
}, U = (a, b, c = {}) => {
  const {justHeaders:f, binary:d, a:e = M(!0)} = c;
  let h, l, n, g, r = 0, u = 0;
  c = (new Promise((v, w) => {
    h = a(b, async k => {
      ({headers:l} = k);
      const {statusMessage:p, statusCode:q} = k;
      n = {statusMessage:p, statusCode:q};
      if (f) {
        k.destroy();
      } else {
        var m = T(k);
        k.on("data", x => r += x.byteLength);
        k = m ? k.pipe(S()) : k;
        g = await R(k, {binary:d});
        u = g.length;
      }
      v();
    }).on("error", k => {
      k = e(k);
      w(k);
    }).on("timeout", () => {
      h.abort();
    });
  })).then(() => ({body:g, headers:l, ...n, h:r, byteLength:u, f:null}));
  return {i:h, c};
};
const V = (a = {}) => Object.keys(a).reduce((b, c) => {
  const f = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(f)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), W = async(a, b, {data:c, justHeaders:f, binary:d, a:e = M(!0)}) => {
  const {i:h, c:l} = U(a, b, {justHeaders:f, binary:d, a:e});
  h.end(c);
  a = await l;
  ({"content-type":b = ""} = a.headers);
  if ((b = b.startsWith("application/json")) && a.body) {
    try {
      a.f = JSON.parse(a.body);
    } catch (n) {
      throw e = e(n), e.response = a.body, e;
    }
  }
  return a;
};
let X;
try {
  const {version:a, name:b} = require("../package.json");
  X = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  X = "@aqt/rqt";
}
const Y = z("aqt");
module.exports = {aqt:async(a, b = {}) => {
  const {data:c, type:f = "json", headers:d = {"User-Agent":`Mozilla/5.0 (Node.JS) ${X}`}, compress:e = !0, binary:h = !1, justHeaders:l = !1, method:n, timeout:g} = b;
  b = M(!0);
  const {hostname:r, protocol:u, port:v, path:w} = N(a), k = "https:" === u ? t : y, p = {hostname:r, port:v, path:w, headers:{...d}, timeout:g, method:n};
  if (c) {
    var q = f;
    var m = c;
    switch(q) {
      case "json":
        m = JSON.stringify(m);
        q = "application/json";
        break;
      case "form":
        m = V(m), q = "application/x-www-form-urlencoded";
    }
    m = {data:m, contentType:q};
    ({data:q} = m);
    ({contentType:m} = m);
    p.method = n || "POST";
    "Content-Type" in p.headers || (p.headers["Content-Type"] = m);
    "Content-Length" in p.headers || (p.headers["Content-Length"] = Buffer.byteLength(q));
  }
  !e || "Accept-Encoding" in p.headers || (p.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:x, headers:Z, byteLength:D, statusCode:aa, statusMessage:ba, h:E, f:F} = await W(k, p, {data:q, justHeaders:l, binary:h, a:b});
  Y("%s %s B%s", a, D, `${D != E ? ` (raw ${E} B)` : ""}`);
  return {body:F ? F : x, headers:Z, statusCode:aa, statusMessage:ba};
}};


//# sourceMappingURL=index.js.map