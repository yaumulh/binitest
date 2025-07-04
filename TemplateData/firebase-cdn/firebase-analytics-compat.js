!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("@firebase/app-compat"), require("@firebase/app"))
    : "function" == typeof define && define.amd
    ? define(["@firebase/app-compat", "@firebase/app"], t)
    : t(
        (e = "undefined" != typeof globalThis ? globalThis : e || self)
          .firebase,
        e.firebase.INTERNAL.modularAPIs
      );
})(this, function (ft, ht) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var t,
        a,
        n = e(ft);
      ((lt = t = t || {})[(lt.DEBUG = 0)] = "DEBUG"),
        (lt[(lt.VERBOSE = 1)] = "VERBOSE"),
        (lt[(lt.INFO = 2)] = "INFO"),
        (lt[(lt.WARN = 3)] = "WARN"),
        (lt[(lt.ERROR = 4)] = "ERROR"),
        (lt[(lt.SILENT = 5)] = "SILENT");
      const r = {
          debug: t.DEBUG,
          verbose: t.VERBOSE,
          info: t.INFO,
          warn: t.WARN,
          error: t.ERROR,
          silent: t.SILENT,
        },
        i = t.INFO,
        o = {
          [t.DEBUG]: "log",
          [t.VERBOSE]: "log",
          [t.INFO]: "info",
          [t.WARN]: "warn",
          [t.ERROR]: "error",
        },
        s = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var a = new Date().toISOString(),
              r = o[t];
            if (!r)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[r](`[${a}]  ${e.name}:`, ...n);
          }
        };
      function c() {
        var e =
          "object" == typeof chrome
            ? chrome.runtime
            : "object" == typeof browser
            ? browser.runtime
            : void 0;
        return "object" == typeof e && void 0 !== e.id;
      }
      function p() {
        return "object" == typeof indexedDB;
      }
      function f() {
        return new Promise((t, n) => {
          try {
            let e = !0;
            const a = "validate-browser-context-for-indexeddb-analytics-module",
              r = self.indexedDB.open(a);
            (r.onsuccess = () => {
              r.result.close(), e || self.indexedDB.deleteDatabase(a), t(!0);
            }),
              (r.onupgradeneeded = () => {
                e = !1;
              }),
              (r.onerror = () => {
                var e;
                n(
                  (null === (e = r.error) || void 0 === e
                    ? void 0
                    : e.message) || ""
                );
              });
          } catch (e) {
            n(e);
          }
        });
      }
      function l() {
        return !("undefined" == typeof navigator || !navigator.cookieEnabled);
      }
      class u extends Error {
        constructor(e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, u.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, d.prototype.create);
        }
      }
      class d {
        constructor(e, t, n) {
          (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
          var a,
            n = t[0] || {},
            r = `${this.service}/${e}`,
            i = this.errors[e],
            i = i
              ? ((a = n),
                i.replace(h, (e, t) => {
                  var n = a[t];
                  return null != n ? String(n) : `<${t}?>`;
                }))
              : "Error",
            i = `${this.serviceName}: ${i} (${r}).`;
          return new u(r, i, n);
        }
      }
      const h = /\{\$([^}]+)}/g,
        g = 1e3,
        m = 2,
        v = 144e5,
        w = 0.5;
      function y(e, t = g, n = m) {
        var a = t * Math.pow(n, e),
          r = Math.round(w * a * (Math.random() - 0.5) * 2);
        return Math.min(v, a + r);
      }
      function I(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class b {
        constructor(e, t, n) {
          (this.name = e),
            (this.instanceFactory = t),
            (this.type = n),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
          return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
          return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
          return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
          return (this.onInstanceCreated = e), this;
        }
      }
      const E = (t, e) => e.some((e) => t instanceof e);
      let _, T;
      const S = new WeakMap(),
        C = new WeakMap(),
        D = new WeakMap(),
        O = new WeakMap(),
        L = new WeakMap();
      let P = {
        get(e, t, n) {
          if (e instanceof IDBTransaction) {
            if ("done" === t) return C.get(e);
            if ("objectStoreNames" === t) return e.objectStoreNames || D.get(e);
            if ("store" === t)
              return n.objectStoreNames[1]
                ? void 0
                : n.objectStore(n.objectStoreNames[0]);
          }
          return k(e[t]);
        },
        set(e, t, n) {
          return (e[t] = n), !0;
        },
        has(e, t) {
          return (
            (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
            t in e
          );
        },
      };
      function N(a) {
        return a !== IDBDatabase.prototype.transaction ||
          "objectStoreNames" in IDBTransaction.prototype
          ? (T = T || [
              IDBCursor.prototype.advance,
              IDBCursor.prototype.continue,
              IDBCursor.prototype.continuePrimaryKey,
            ]).includes(a)
            ? function (...e) {
                return a.apply(M(this), e), k(S.get(this));
              }
            : function (...e) {
                return k(a.apply(M(this), e));
              }
          : function (e, ...t) {
              var n = a.call(M(this), e, ...t);
              return D.set(n, e.sort ? e.sort() : [e]), k(n);
            };
      }
      function A(e) {
        return "function" == typeof e
          ? N(e)
          : (e instanceof IDBTransaction &&
              ((i = e),
              C.has(i) ||
                ((t = new Promise((e, t) => {
                  const n = () => {
                      i.removeEventListener("complete", a),
                        i.removeEventListener("error", r),
                        i.removeEventListener("abort", r);
                    },
                    a = () => {
                      e(), n();
                    },
                    r = () => {
                      t(
                        i.error || new DOMException("AbortError", "AbortError")
                      ),
                        n();
                    };
                  i.addEventListener("complete", a),
                    i.addEventListener("error", r),
                    i.addEventListener("abort", r);
                })),
                C.set(i, t))),
            E(
              e,
              (_ = _ || [
                IDBDatabase,
                IDBObjectStore,
                IDBIndex,
                IDBCursor,
                IDBTransaction,
              ])
            )
              ? new Proxy(e, P)
              : e);
        var i, t;
      }
      function k(e) {
        if (e instanceof IDBRequest)
          return (function (i) {
            const e = new Promise((e, t) => {
              const n = () => {
                  i.removeEventListener("success", a),
                    i.removeEventListener("error", r);
                },
                a = () => {
                  e(k(i.result)), n();
                },
                r = () => {
                  t(i.error), n();
                };
              i.addEventListener("success", a), i.addEventListener("error", r);
            });
            return (
              e
                .then((e) => {
                  e instanceof IDBCursor && S.set(e, i);
                })
                .catch(() => {}),
              L.set(e, i),
              e
            );
          })(e);
        if (O.has(e)) return O.get(e);
        var t = A(e);
        return t !== e && (O.set(e, t), L.set(t, e)), t;
      }
      const M = (e) => L.get(e);
      const R = ["get", "getKey", "getAll", "getAllKeys", "count"],
        j = ["put", "add", "delete", "clear"],
        $ = new Map();
      function B(e, t) {
        if (e instanceof IDBDatabase && !(t in e) && "string" == typeof t) {
          if ($.get(t)) return $.get(t);
          const r = t.replace(/FromIndex$/, ""),
            i = t !== r,
            o = j.includes(r);
          if (
            r in (i ? IDBIndex : IDBObjectStore).prototype &&
            (o || R.includes(r))
          ) {
            var n = async function (e, ...t) {
              var n = this.transaction(e, o ? "readwrite" : "readonly");
              let a = n.store;
              return (
                i && (a = a.index(t.shift())),
                (await Promise.all([a[r](...t), o && n.done]))[0]
              );
            };
            return $.set(t, n), n;
          }
        }
      }
      P = {
        ...(a = P),
        get: (e, t, n) => B(e, t) || a.get(e, t, n),
        has: (e, t) => !!B(e, t) || a.has(e, t),
      };
      var F = "@firebase/installations",
        H = "0.5.16";
      const x = 1e4,
        V = `w:${H}`,
        q = "FIS_v2",
        W = "https://firebaseinstallations.googleapis.com/v1",
        U = 36e5;
      const G = new d("installations", "Installations", {
        "missing-app-config-values":
          'Missing App configuration value: "{$valueName}"',
        "not-registered": "Firebase Installation is not registered.",
        "installation-not-found": "Firebase Installation not found.",
        "request-failed":
          '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        "app-offline": "Could not process request. Application offline.",
        "delete-pending-registration":
          "Can't delete installation while there is a pending registration request.",
      });
      function K(e) {
        return e instanceof u && e.code.includes("request-failed");
      }
      function z({ projectId: e }) {
        return `${W}/projects/${e}/installations`;
      }
      function J(e) {
        return {
          token: e.token,
          requestStatus: 2,
          expiresIn: ((e = e.expiresIn), Number(e.replace("s", "000"))),
          creationTime: Date.now(),
        };
      }
      async function Y(e, t) {
        var n = (await t.json()).error;
        return G.create("request-failed", {
          requestName: e,
          serverCode: n.code,
          serverMessage: n.message,
          serverStatus: n.status,
        });
      }
      function X({ apiKey: e }) {
        return new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-goog-api-key": e,
        });
      }
      function Z(e, { refreshToken: t }) {
        const n = X(e);
        return n.append("Authorization", ((t = t), `${q} ${t}`)), n;
      }
      async function Q(e) {
        var t = await e();
        return 500 <= t.status && t.status < 600 ? e() : t;
      }
      function ee(t) {
        return new Promise((e) => {
          setTimeout(e, t);
        });
      }
      const te = /^[cdef][\w-]{21}$/,
        ne = "";
      function ae() {
        try {
          const t = new Uint8Array(17),
            n = self.crypto || self.msCrypto;
          n.getRandomValues(t), (t[0] = 112 + (t[0] % 16));
          var e = (function (e) {
            const t = (function (e) {
              const t = btoa(String.fromCharCode(...e));
              return t.replace(/\+/g, "-").replace(/\//g, "_");
            })(e);
            return t.substr(0, 22);
          })(t);
          return te.test(e) ? e : ne;
        } catch (e) {
          return ne;
        }
      }
      function re(e) {
        return `${e.appName}!${e.appId}`;
      }
      const ie = new Map();
      function oe(e, t) {
        var n = re(e);
        se(n, t),
          (function (e, t) {
            const n = (function () {
              !ce &&
                "BroadcastChannel" in self &&
                ((ce = new BroadcastChannel("[Firebase] FID Change")),
                (ce.onmessage = (e) => {
                  se(e.data.key, e.data.fid);
                }));
              return ce;
            })();
            n && n.postMessage({ key: e, fid: t });
            0 === ie.size && ce && (ce.close(), (ce = null));
          })(n, t);
      }
      function se(e, t) {
        var n = ie.get(e);
        if (n) for (const a of n) a(t);
      }
      let ce = null;
      const le = "firebase-installations-store";
      let ue = null;
      function de() {
        return (
          (ue =
            ue ||
            (function (
              e,
              t,
              { blocked: n, upgrade: a, blocking: r, terminated: i }
            ) {
              const o = indexedDB.open(e, t),
                s = k(o);
              return (
                a &&
                  o.addEventListener("upgradeneeded", (e) => {
                    a(
                      k(o.result),
                      e.oldVersion,
                      e.newVersion,
                      k(o.transaction)
                    );
                  }),
                n && o.addEventListener("blocked", () => n()),
                s
                  .then((e) => {
                    i && e.addEventListener("close", () => i()),
                      r && e.addEventListener("versionchange", () => r());
                  })
                  .catch(() => {}),
                s
              );
            })("firebase-installations-database", 1, {
              upgrade: (e, t) => {
                0 === t && e.createObjectStore(le);
              },
            })),
          ue
        );
      }
      async function pe(e, t) {
        var n = re(e);
        const a = await de(),
          r = a.transaction(le, "readwrite"),
          i = r.objectStore(le);
        var o = await i.get(n);
        return (
          await i.put(t, n),
          await r.done,
          (o && o.fid === t.fid) || oe(e, t.fid),
          t
        );
      }
      async function fe(e) {
        var t = re(e);
        const n = await de(),
          a = n.transaction(le, "readwrite");
        await a.objectStore(le).delete(t), await a.done;
      }
      async function he(e, t) {
        var n = re(e);
        const a = await de(),
          r = a.transaction(le, "readwrite"),
          i = r.objectStore(le);
        var o = await i.get(n),
          s = t(o);
        return (
          void 0 === s ? await i.delete(n) : await i.put(s, n),
          await r.done,
          !s || (o && o.fid === s.fid) || oe(e, s.fid),
          s
        );
      }
      async function ge(n) {
        let a;
        var e = await he(n.appConfig, (e) => {
          var t = ve(e || { fid: ae(), registrationStatus: 0 }),
            t = (function (e, t) {
              {
                if (0 !== t.registrationStatus)
                  return 1 === t.registrationStatus
                    ? {
                        installationEntry: t,
                        registrationPromise: (async function (e) {
                          let t = await me(e.appConfig);
                          for (; 1 === t.registrationStatus; )
                            await ee(100), (t = await me(e.appConfig));
                          if (0 !== t.registrationStatus) return t;
                          {
                            var {
                              installationEntry: n,
                              registrationPromise: a,
                            } = await ge(e);
                            return a || n;
                          }
                        })(e),
                      }
                    : { installationEntry: t };
                if (!navigator.onLine) {
                  var n = Promise.reject(G.create("app-offline"));
                  return { installationEntry: t, registrationPromise: n };
                }
                var a = {
                    fid: t.fid,
                    registrationStatus: 1,
                    registrationTime: Date.now(),
                  },
                  n = (async function (t, n) {
                    try {
                      var e = await (async function (
                        { appConfig: e, heartbeatServiceProvider: t },
                        { fid: n }
                      ) {
                        const a = z(e),
                          r = X(e),
                          i = t.getImmediate({ optional: !0 });
                        !i ||
                          ((o = await i.getHeartbeatsHeader()) &&
                            r.append("x-firebase-client", o));
                        var o = {
                          fid: n,
                          authVersion: q,
                          appId: e.appId,
                          sdkVersion: V,
                        };
                        const s = {
                            method: "POST",
                            headers: r,
                            body: JSON.stringify(o),
                          },
                          c = await Q(() => fetch(a, s));
                        if (c.ok) {
                          o = await c.json();
                          return {
                            fid: o.fid || n,
                            registrationStatus: 2,
                            refreshToken: o.refreshToken,
                            authToken: J(o.authToken),
                          };
                        }
                        throw await Y("Create Installation", c);
                      })(t, n);
                      return pe(t.appConfig, e);
                    } catch (e) {
                      throw (
                        (K(e) && 409 === e.customData.serverCode
                          ? await fe(t.appConfig)
                          : await pe(t.appConfig, {
                              fid: n.fid,
                              registrationStatus: 0,
                            }),
                        e)
                      );
                    }
                  })(e, a);
                return { installationEntry: a, registrationPromise: n };
              }
            })(n, t);
          return (a = t.registrationPromise), t.installationEntry;
        });
        return e.fid === ne
          ? { installationEntry: await a }
          : { installationEntry: e, registrationPromise: a };
      }
      function me(e) {
        return he(e, (e) => {
          if (!e) throw G.create("installation-not-found");
          return ve(e);
        });
      }
      function ve(e) {
        return 1 === (t = e).registrationStatus &&
          t.registrationTime + x < Date.now()
          ? { fid: e.fid, registrationStatus: 0 }
          : e;
        var t;
      }
      async function we({ appConfig: e, heartbeatServiceProvider: t }, n) {
        const a =
          (([r, i] = [e, n["fid"]]), `${z(r)}/${i}/authTokens:generate`);
        var r, i;
        const o = Z(e, n),
          s = t.getImmediate({ optional: !0 });
        !s ||
          ((c = await s.getHeartbeatsHeader()) &&
            o.append("x-firebase-client", c));
        var c = { installation: { sdkVersion: V, appId: e.appId } };
        const l = { method: "POST", headers: o, body: JSON.stringify(c) },
          u = await Q(() => fetch(a, l));
        if (u.ok) return J(await u.json());
        throw await Y("Generate Auth Token", u);
      }
      async function ye(a, r = !1) {
        let i;
        var e = await he(a.appConfig, (e) => {
          if (!be(e)) throw G.create("not-registered");
          var t,
            n = e.authToken;
          if (
            r ||
            2 !== (t = n).requestStatus ||
            (function (e) {
              var t = Date.now();
              return t < e.creationTime || e.creationTime + e.expiresIn < t + U;
            })(t)
          ) {
            if (1 === n.requestStatus)
              return (
                (i = (async function (e, t) {
                  let n = await Ie(e.appConfig);
                  for (; 1 === n.authToken.requestStatus; )
                    await ee(100), (n = await Ie(e.appConfig));
                  var a = n.authToken;
                  return 0 === a.requestStatus ? ye(e, t) : a;
                })(a, r)),
                e
              );
            if (!navigator.onLine) throw G.create("app-offline");
            n =
              ((t = e),
              (n = { requestStatus: 1, requestTime: Date.now() }),
              Object.assign(Object.assign({}, t), { authToken: n }));
            return (
              (i = (async function (t, n) {
                try {
                  var a = await we(t, n),
                    e = Object.assign(Object.assign({}, n), { authToken: a });
                  return await pe(t.appConfig, e), a;
                } catch (e) {
                  throw (
                    (!K(e) ||
                    (401 !== e.customData.serverCode &&
                      404 !== e.customData.serverCode)
                      ? ((a = Object.assign(Object.assign({}, n), {
                          authToken: { requestStatus: 0 },
                        })),
                        await pe(t.appConfig, a))
                      : await fe(t.appConfig),
                    e)
                  );
                }
              })(a, n)),
              n
            );
          }
          return e;
        });
        return i ? await i : e.authToken;
      }
      function Ie(e) {
        return he(e, (e) => {
          if (!be(e)) throw G.create("not-registered");
          var t,
            n = e.authToken;
          return 1 === (t = n).requestStatus && t.requestTime + x < Date.now()
            ? Object.assign(Object.assign({}, e), {
                authToken: { requestStatus: 0 },
              })
            : e;
        });
      }
      function be(e) {
        return void 0 !== e && 2 === e.registrationStatus;
      }
      async function Ee(e, t = !1) {
        var n,
          a = e;
        return (
          await ((n = (await ge(a)).registrationPromise) && (await n)),
          (await ye(a, t)).token
        );
      }
      function _e(e) {
        return G.create("missing-app-config-values", { valueName: e });
      }
      const Te = "installations",
        Se = (e) => {
          var t = e.getProvider("app").getImmediate();
          return {
            app: t,
            appConfig: (function (e) {
              if (!e || !e.options) throw _e("App Configuration");
              if (!e.name) throw _e("App Name");
              for (const t of ["projectId", "apiKey", "appId"])
                if (!e.options[t]) throw _e(t);
              return {
                appName: e.name,
                projectId: e.options.projectId,
                apiKey: e.options.apiKey,
                appId: e.options.appId,
              };
            })(t),
            heartbeatServiceProvider: ht._getProvider(t, "heartbeat"),
            _delete: () => Promise.resolve(),
          };
        },
        Ce = (e) => {
          var t = e.getProvider("app").getImmediate();
          const n = ht._getProvider(t, Te).getImmediate();
          return {
            getId: () =>
              (async function (e) {
                var t = e;
                const { installationEntry: n, registrationPromise: a } =
                  await ge(t);
                return (a || ye(t)).catch(console.error), n.fid;
              })(n),
            getToken: (e) => Ee(n, e),
          };
        };
      ht._registerComponent(new b(Te, Se, "PUBLIC")),
        ht._registerComponent(new b("installations-internal", Ce, "PRIVATE")),
        ht.registerVersion(F, H),
        ht.registerVersion(F, H, "esm2017");
      const De = "analytics",
        Oe = "firebase_id",
        Le = "origin",
        Pe =
          "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",
        Ne = "https://www.googletagmanager.com/gtag/js",
        Ae = new (class {
          constructor(e) {
            (this.name = e),
              (this._logLevel = i),
              (this._logHandler = s),
              (this._userLogHandler = null);
          }
          get logLevel() {
            return this._logLevel;
          }
          set logLevel(e) {
            if (!(e in t))
              throw new TypeError(
                `Invalid value "${e}" assigned to \`logLevel\``
              );
            this._logLevel = e;
          }
          setLogLevel(e) {
            this._logLevel = "string" == typeof e ? r[e] : e;
          }
          get logHandler() {
            return this._logHandler;
          }
          set logHandler(e) {
            if ("function" != typeof e)
              throw new TypeError(
                "Value assigned to `logHandler` must be a function"
              );
            this._logHandler = e;
          }
          get userLogHandler() {
            return this._userLogHandler;
          }
          set userLogHandler(e) {
            this._userLogHandler = e;
          }
          debug(...e) {
            this._userLogHandler && this._userLogHandler(this, t.DEBUG, ...e),
              this._logHandler(this, t.DEBUG, ...e);
          }
          log(...e) {
            this._userLogHandler && this._userLogHandler(this, t.VERBOSE, ...e),
              this._logHandler(this, t.VERBOSE, ...e);
          }
          info(...e) {
            this._userLogHandler && this._userLogHandler(this, t.INFO, ...e),
              this._logHandler(this, t.INFO, ...e);
          }
          warn(...e) {
            this._userLogHandler && this._userLogHandler(this, t.WARN, ...e),
              this._logHandler(this, t.WARN, ...e);
          }
          error(...e) {
            this._userLogHandler && this._userLogHandler(this, t.ERROR, ...e),
              this._logHandler(this, t.ERROR, ...e);
          }
        })("@firebase/analytics");
      function ke(e) {
        return Promise.all(e.map((e) => e.catch((e) => e)));
      }
      function Me(a, r, i, o) {
        return async function (e, t, n) {
          try {
            "event" === e
              ? await (async function (e, n, a, r, i) {
                  try {
                    let t = [];
                    if (i && i.send_to) {
                      let e = i.send_to;
                      Array.isArray(e) || (e = [e]);
                      const c = await ke(a);
                      for (const l of e) {
                        var o = c.find((e) => e.measurementId === l),
                          s = o && n[o.appId];
                        if (!s) {
                          t = [];
                          break;
                        }
                        t.push(s);
                      }
                    }
                    0 === t.length && (t = Object.values(n)),
                      await Promise.all(t),
                      e("event", r, i || {});
                  } catch (e) {
                    Ae.error(e);
                  }
                })(a, r, i, t, n)
              : "config" === e
              ? await (async function (e, t, n, a, r, i) {
                  var o = a[r];
                  try {
                    if (o) await t[o];
                    else {
                      const c = await ke(n);
                      var s = c.find((e) => e.measurementId === r);
                      s && (await t[s.appId]);
                    }
                  } catch (e) {
                    Ae.error(e);
                  }
                  e("config", r, i);
                })(a, r, i, o, t, n)
              : "consent" === e
              ? a("consent", "update", n)
              : a("set", t);
          } catch (e) {
            Ae.error(e);
          }
        };
      }
      const Re = new d("analytics", "Analytics", {
          "already-exists":
            "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
          "already-initialized":
            "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",
          "already-initialized-settings":
            "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
          "interop-component-reg-failed":
            "Firebase Analytics Interop Component failed to instantiate: {$reason}",
          "invalid-analytics-context":
            "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
          "indexeddb-unavailable":
            "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
          "fetch-throttle":
            "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
          "config-fetch-failed":
            "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
          "no-api-key":
            'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
          "no-app-id":
            'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',
        }),
        je = 30;
      const $e = new (class {
        constructor(e = {}, t = 1e3) {
          (this.throttleMetadata = e), (this.intervalMillis = t);
        }
        getThrottleMetadata(e) {
          return this.throttleMetadata[e];
        }
        setThrottleMetadata(e, t) {
          this.throttleMetadata[e] = t;
        }
        deleteThrottleMetadata(e) {
          delete this.throttleMetadata[e];
        }
      })();
      async function Be(e) {
        var t,
          { appId: n, apiKey: a } = e,
          a = {
            method: "GET",
            headers: new Headers({
              Accept: "application/json",
              "x-goog-api-key": a,
            }),
          },
          n = Pe.replace("{app-id}", n);
        const r = await fetch(n, a);
        if (200 === r.status || 304 === r.status) return r.json();
        {
          let e = "";
          try {
            var i = await r.json();
            null !== (t = i.error) &&
              void 0 !== t &&
              t.message &&
              (e = i.error.message);
          } catch (e) {}
          throw Re.create("config-fetch-failed", {
            httpStatus: r.status,
            responseMessage: e,
          });
        }
      }
      async function Fe(e, t = $e, n) {
        var { appId: a, apiKey: r, measurementId: i } = e.options;
        if (!a) throw Re.create("no-app-id");
        if (!r) {
          if (i) return { measurementId: i, appId: a };
          throw Re.create("no-api-key");
        }
        var o = t.getThrottleMetadata(a) || {
          backoffCount: 0,
          throttleEndTimeMillis: Date.now(),
        };
        const s = new Ve();
        return (
          setTimeout(
            async () => {
              s.abort();
            },
            void 0 !== n ? n : 6e4
          ),
          (async function t(
            n,
            { throttleEndTimeMillis: e, backoffCount: a },
            r,
            i = $e
          ) {
            var o;
            const { appId: s, measurementId: c } = n;
            try {
              await He(r, e);
            } catch (e) {
              if (c)
                return (
                  Ae.warn(
                    "Timed out fetching this Firebase app's measurement ID from the server." +
                      ` Falling back to the measurement ID ${c}` +
                      ` provided in the "measurementId" field in the local Firebase config. [${
                        null === (o = e) || void 0 === o ? void 0 : o.message
                      }]`
                  ),
                  { appId: s, measurementId: c }
                );
              throw e;
            }
            try {
              const l = await Be(n);
              return i.deleteThrottleMetadata(s), l;
            } catch (e) {
              const u = e;
              if (!xe(u)) {
                if ((i.deleteThrottleMetadata(s), c))
                  return (
                    Ae.warn(
                      "Failed to fetch this Firebase app's measurement ID from the server." +
                        ` Falling back to the measurement ID ${c}` +
                        ` provided in the "measurementId" field in the local Firebase config. [${
                          null === u || void 0 === u ? void 0 : u.message
                        }]`
                    ),
                    { appId: s, measurementId: c }
                  );
                throw e;
              }
              const d =
                  503 ===
                  Number(
                    null ===
                      (o =
                        null === u || void 0 === u ? void 0 : u.customData) ||
                      void 0 === o
                      ? void 0
                      : o.httpStatus
                  )
                    ? y(a, i.intervalMillis, je)
                    : y(a, i.intervalMillis),
                p = {
                  throttleEndTimeMillis: Date.now() + d,
                  backoffCount: a + 1,
                };
              return (
                i.setThrottleMetadata(s, p),
                Ae.debug(`Calling attemptFetch again in ${d} millis`),
                t(n, p, r, i)
              );
            }
          })({ appId: a, apiKey: r, measurementId: i }, o, s, t)
        );
      }
      function He(r, i) {
        return new Promise((e, t) => {
          var n = Math.max(i - Date.now(), 0);
          const a = setTimeout(e, n);
          r.addEventListener(() => {
            clearTimeout(a),
              t(Re.create("fetch-throttle", { throttleEndTimeMillis: i }));
          });
        });
      }
      function xe(e) {
        if (!(e instanceof u && e.customData)) return !1;
        var t = Number(e.customData.httpStatus);
        return 429 === t || 500 === t || 503 === t || 504 === t;
      }
      class Ve {
        constructor() {
          this.listeners = [];
        }
        addEventListener(e) {
          this.listeners.push(e);
        }
        abort() {
          this.listeners.forEach((e) => e());
        }
      }
      async function qe(t, e, n, a, r, i, o) {
        const s = Fe(t);
        s
          .then((e) => {
            (n[e.measurementId] = e.appId),
              t.options.measurementId &&
                e.measurementId !== t.options.measurementId &&
                Ae.warn(
                  `The measurement ID in the local Firebase config (${t.options.measurementId})` +
                    ` does not match the measurement ID fetched from the server (${e.measurementId}).` +
                    " To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config."
                );
          })
          .catch((e) => Ae.error(e)),
          e.push(s);
        var c = (async function () {
            if (!p())
              return (
                Ae.warn(
                  Re.create("indexeddb-unavailable", {
                    errorInfo:
                      "IndexedDB is not available in this environment.",
                  }).message
                ),
                !1
              );
            try {
              await f();
            } catch (e) {
              return (
                Ae.warn(
                  Re.create("indexeddb-unavailable", {
                    errorInfo:
                      null === e || void 0 === e ? void 0 : e.toString(),
                  }).message
                ),
                !1
              );
            }
            return !0;
          })().then((e) => {
            if (e) return a.getId();
          }),
          [l, u] = await Promise.all([s, c]);
        !(function (e) {
          var t = window.document.getElementsByTagName("script");
          for (const n of Object.values(t))
            if (n.src && n.src.includes(Ne) && n.src.includes(e)) return n;
        })(i) &&
          (function (e, t) {
            const n = document.createElement("script");
            (n.src = `${Ne}?l=${e}&id=${t}`),
              (n.async = !0),
              document.head.appendChild(n);
          })(i, l.measurementId),
          r("js", new Date());
        const d =
          null !== (c = null == o ? void 0 : o.config) && void 0 !== c ? c : {};
        return (
          (d[Le] = "firebase"),
          (d.update = !0),
          null != u && (d[Oe] = u),
          r("config", l.measurementId, d),
          l.measurementId
        );
      }
      class We {
        constructor(e) {
          this.app = e;
        }
        _delete() {
          return delete Ue[this.app.options.appId], Promise.resolve();
        }
      }
      let Ue = {},
        Ge = [];
      const Ke = {};
      let ze = "dataLayer",
        Je = "gtag",
        Ye,
        Xe,
        Ze = !1;
      function Qe(e) {
        if (Ze) throw Re.create("already-initialized");
        e.dataLayerName && (ze = e.dataLayerName),
          e.gtagName && (Je = e.gtagName);
      }
      function et(e, t, n) {
        !(function () {
          const e = [];
          var t;
          c() && e.push("This is a browser extension environment."),
            l() || e.push("Cookies are not available."),
            0 < e.length &&
              ((t = e.map((e, t) => `(${t + 1}) ${e}`).join(" ")),
              (t = Re.create("invalid-analytics-context", { errorInfo: t })),
              Ae.warn(t.message));
        })();
        var a,
          r,
          i = e.options.appId;
        if (!i) throw Re.create("no-app-id");
        if (!e.options.apiKey) {
          if (!e.options.measurementId) throw Re.create("no-api-key");
          Ae.warn(
            'The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest' +
              ` measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId}` +
              ' provided in the "measurementId" field in the local Firebase config.'
          );
        }
        if (null != Ue[i]) throw Re.create("already-exists", { id: i });
        return (
          Ze ||
            ((function (e) {
              let t = [];
              Array.isArray(window[e]) ? (t = window[e]) : (window[e] = t), t;
            })(ze),
            ({ wrappedGtag: a, gtagCore: r } = (function (e, t, n, a, r) {
              let i = function () {
                window[a].push(arguments);
              };
              return (
                window[r] && "function" == typeof window[r] && (i = window[r]),
                (window[r] = Me(i, e, t, n)),
                { gtagCore: i, wrappedGtag: window[r] }
              );
            })(Ue, Ge, Ke, ze, Je)),
            (Xe = a),
            (Ye = r),
            (Ze = !0)),
          (Ue[i] = qe(e, Ge, Ke, t, Ye, ze, n)),
          new We(e)
        );
      }
      async function tt() {
        if (c()) return !1;
        if (!l()) return !1;
        if (!p()) return !1;
        try {
          return await f();
        } catch (e) {
          return !1;
        }
      }
      function nt(e, t, n) {
        (e = I(e)),
          (async function (e, t, n, a) {
            if (a && a.global)
              return e("set", { screen_name: n }), Promise.resolve();
            e("config", await t, { update: !0, screen_name: n });
          })(Xe, Ue[e.app.options.appId], t, n).catch((e) => Ae.error(e));
      }
      function at(e, t, n) {
        (e = I(e)),
          (async function (e, t, n, a) {
            if (a && a.global)
              return e("set", { user_id: n }), Promise.resolve();
            e("config", await t, { update: !0, user_id: n });
          })(Xe, Ue[e.app.options.appId], t, n).catch((e) => Ae.error(e));
      }
      function rt(e, t, n) {
        (e = I(e)),
          (async function (e, t, n, a) {
            if (a && a.global) {
              const r = {};
              for (const i of Object.keys(n)) r[`user_properties.${i}`] = n[i];
              return e("set", r), Promise.resolve();
            }
            e("config", await t, { update: !0, user_properties: n });
          })(Xe, Ue[e.app.options.appId], t, n).catch((e) => Ae.error(e));
      }
      function it(e, t) {
        (e = I(e)),
          (async function (e, t) {
            var n = await e;
            window[`ga-disable-${n}`] = !t;
          })(Ue[e.app.options.appId], t).catch((e) => Ae.error(e));
      }
      function ot(e, t, n, a) {
        (e = I(e)),
          (async function (e, t, n, a, r) {
            var i;
            r && r.global
              ? e("event", n, a)
              : ((i = await t),
                e(
                  "event",
                  n,
                  Object.assign(Object.assign({}, a), { send_to: i })
                ));
          })(Xe, Ue[e.app.options.appId], t, n, a).catch((e) => Ae.error(e));
      }
      const st = "@firebase/analytics";
      ht._registerComponent(
        new b(
          De,
          (e, { options: t }) => {
            return et(
              e.getProvider("app").getImmediate(),
              e.getProvider("installations-internal").getImmediate(),
              t
            );
          },
          "PUBLIC"
        )
      ),
        ht._registerComponent(
          new b(
            "analytics-internal",
            function (e) {
              try {
                const a = e.getProvider(De).getImmediate();
                return { logEvent: (e, t, n) => ot(a, e, t, n) };
              } catch (e) {
                throw Re.create("interop-component-reg-failed", { reason: e });
              }
            },
            "PRIVATE"
          )
        ),
        ht.registerVersion(st, "0.8.4"),
        ht.registerVersion(st, "0.8.4", "esm2017");
      var ct, lt, ut;
      class dt {
        constructor(e, t) {
          (this.app = e), (this._delegate = t);
        }
        logEvent(e, t, n) {
          ot(this._delegate, e, t, n);
        }
        setCurrentScreen(e, t) {
          nt(this._delegate, e, t);
        }
        setUserId(e, t) {
          at(this._delegate, e, t);
        }
        setUserProperties(e, t) {
          rt(this._delegate, e, t);
        }
        setAnalyticsCollectionEnabled(e) {
          it(this._delegate, e);
        }
      }
      ((lt = ct = ct || {}).ADD_SHIPPING_INFO = "add_shipping_info"),
        (lt.ADD_PAYMENT_INFO = "add_payment_info"),
        (lt.ADD_TO_CART = "add_to_cart"),
        (lt.ADD_TO_WISHLIST = "add_to_wishlist"),
        (lt.BEGIN_CHECKOUT = "begin_checkout"),
        (lt.CHECKOUT_PROGRESS = "checkout_progress"),
        (lt.EXCEPTION = "exception"),
        (lt.GENERATE_LEAD = "generate_lead"),
        (lt.LOGIN = "login"),
        (lt.PAGE_VIEW = "page_view"),
        (lt.PURCHASE = "purchase"),
        (lt.REFUND = "refund"),
        (lt.REMOVE_FROM_CART = "remove_from_cart"),
        (lt.SCREEN_VIEW = "screen_view"),
        (lt.SEARCH = "search"),
        (lt.SELECT_CONTENT = "select_content"),
        (lt.SELECT_ITEM = "select_item"),
        (lt.SELECT_PROMOTION = "select_promotion"),
        (lt.SET_CHECKOUT_OPTION = "set_checkout_option"),
        (lt.SHARE = "share"),
        (lt.SIGN_UP = "sign_up"),
        (lt.TIMING_COMPLETE = "timing_complete"),
        (lt.VIEW_CART = "view_cart"),
        (lt.VIEW_ITEM = "view_item"),
        (lt.VIEW_ITEM_LIST = "view_item_list"),
        (lt.VIEW_PROMOTION = "view_promotion"),
        (lt.VIEW_SEARCH_RESULTS = "view_search_results");
      const pt = (e) => {
        var t = e.getProvider("app-compat").getImmediate(),
          n = e.getProvider("analytics").getImmediate();
        return new dt(t, n);
      };
      (ut = { Analytics: dt, settings: Qe, isSupported: tt, EventName: ct }),
        n.default.INTERNAL.registerComponent(
          new b("analytics-compat", pt, "PUBLIC")
            .setServiceProps(ut)
            .setMultipleInstances(!0)
        ),
        n.default.registerVersion("@firebase/analytics-compat", "0.1.17");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-analytics-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
//# sourceMappingURL=firebase-analytics-compat.js.map
