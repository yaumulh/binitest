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
})(this, function ($f, Qf) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var l,
        t = e($f);
      function n(t) {
        const n = [];
        let r = 0;
        for (let s = 0; s < t.length; s++) {
          let e = t.charCodeAt(s);
          e < 128
            ? (n[r++] = e)
            : (e < 2048
                ? (n[r++] = (e >> 6) | 192)
                : (55296 == (64512 & e) &&
                  s + 1 < t.length &&
                  56320 == (64512 & t.charCodeAt(s + 1))
                    ? ((e =
                        65536 +
                        ((1023 & e) << 10) +
                        (1023 & t.charCodeAt(++s))),
                      (n[r++] = (e >> 18) | 240),
                      (n[r++] = ((e >> 12) & 63) | 128))
                    : (n[r++] = (e >> 12) | 224),
                  (n[r++] = ((e >> 6) & 63) | 128)),
              (n[r++] = (63 & e) | 128));
        }
        return n;
      }
      const r = {
          byteToCharMap_: null,
          charToByteMap_: null,
          byteToCharMapWebSafe_: null,
          charToByteMapWebSafe_: null,
          ENCODED_VALS_BASE:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
          },
          get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
          },
          HAS_NATIVE_SUPPORT: "function" == typeof atob,
          encodeByteArray(n, e) {
            if (!Array.isArray(n))
              throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
            const s = [];
            for (let h = 0; h < n.length; h += 3) {
              var i = n[h],
                a = h + 1 < n.length,
                o = a ? n[h + 1] : 0,
                u = h + 2 < n.length,
                c = u ? n[h + 2] : 0;
              let e = ((15 & o) << 2) | (c >> 6),
                t = 63 & c;
              u || ((t = 64), a || (e = 64)),
                s.push(r[i >> 2], r[((3 & i) << 4) | (o >> 4)], r[e], r[t]);
            }
            return s.join("");
          },
          encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? btoa(e)
              : this.encodeByteArray(n(e), t);
          },
          decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? atob(e)
              : (function (e) {
                  const t = [];
                  let n = 0,
                    r = 0;
                  for (; n < e.length; ) {
                    var s,
                      i,
                      a = e[n++];
                    a < 128
                      ? (t[r++] = String.fromCharCode(a))
                      : 191 < a && a < 224
                      ? ((s = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((31 & a) << 6) | (63 & s)
                        )))
                      : 239 < a && a < 365
                      ? ((i =
                          (((7 & a) << 18) |
                            ((63 & e[n++]) << 12) |
                            ((63 & e[n++]) << 6) |
                            (63 & e[n++])) -
                          65536),
                        (t[r++] = String.fromCharCode(55296 + (i >> 10))),
                        (t[r++] = String.fromCharCode(56320 + (1023 & i))))
                      : ((s = e[n++]),
                        (i = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((15 & a) << 12) | ((63 & s) << 6) | (63 & i)
                        )));
                  }
                  return t.join("");
                })(this.decodeStringToByteArray(e, t));
          },
          decodeStringToByteArray(e, t) {
            this.init_();
            var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
            const r = [];
            for (let u = 0; u < e.length; ) {
              var s = n[e.charAt(u++)],
                i = u < e.length ? n[e.charAt(u)] : 0;
              ++u;
              var a = u < e.length ? n[e.charAt(u)] : 64;
              ++u;
              var o = u < e.length ? n[e.charAt(u)] : 64;
              if ((++u, null == s || null == i || null == a || null == o))
                throw Error();
              r.push((s << 2) | (i >> 4)),
                64 !== a &&
                  (r.push(((i << 4) & 240) | (a >> 2)),
                  64 !== o && r.push(((a << 6) & 192) | o));
            }
            return r;
          },
          init_() {
            if (!this.byteToCharMap_) {
              (this.byteToCharMap_ = {}),
                (this.charToByteMap_ = {}),
                (this.byteToCharMapWebSafe_ = {}),
                (this.charToByteMapWebSafe_ = {});
              for (let e = 0; e < this.ENCODED_VALS.length; e++)
                (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                  (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                  (this.byteToCharMapWebSafe_[e] =
                    this.ENCODED_VALS_WEBSAFE.charAt(e)),
                  (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] =
                    e),
                  e >= this.ENCODED_VALS_BASE.length &&
                    ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
                      e),
                    (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
                      e));
            }
          },
        },
        a = function (e) {
          return (
            (e = e), (t = n(e)), r.encodeByteArray(t, !0).replace(/\./g, "")
          );
          var t;
        };
      function i() {
        return "undefined" != typeof navigator &&
          "string" == typeof navigator.userAgent
          ? navigator.userAgent
          : "";
      }
      function s() {
        return (
          !(function () {
            try {
              return (
                "[object process]" ===
                Object.prototype.toString.call(global.process)
              );
            } catch (e) {
              return;
            }
          })() &&
          navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
        );
      }
      class o extends Error {
        constructor(e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, o.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, u.prototype.create);
        }
      }
      class u {
        constructor(e, t, n) {
          (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
          var r,
            n = t[0] || {},
            s = `${this.service}/${e}`,
            i = this.errors[e],
            i = i
              ? ((r = n),
                i.replace(c, (e, t) => {
                  var n = r[t];
                  return null != n ? String(n) : `<${t}?>`;
                }))
              : "Error",
            i = `${this.serviceName}: ${i} (${s}).`;
          return new o(s, i, n);
        }
      }
      const c = /\{\$([^}]+)}/g;
      function m(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class h {
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
      ((Hl = l = l || {})[(Hl.DEBUG = 0)] = "DEBUG"),
        (Hl[(Hl.VERBOSE = 1)] = "VERBOSE"),
        (Hl[(Hl.INFO = 2)] = "INFO"),
        (Hl[(Hl.WARN = 3)] = "WARN"),
        (Hl[(Hl.ERROR = 4)] = "ERROR"),
        (Hl[(Hl.SILENT = 5)] = "SILENT");
      const d = {
          debug: l.DEBUG,
          verbose: l.VERBOSE,
          info: l.INFO,
          warn: l.WARN,
          error: l.ERROR,
          silent: l.SILENT,
        },
        f = l.INFO,
        g = {
          [l.DEBUG]: "log",
          [l.VERBOSE]: "log",
          [l.INFO]: "info",
          [l.WARN]: "warn",
          [l.ERROR]: "error",
        },
        p = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var r = new Date().toISOString(),
              s = g[t];
            if (!s)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[s](`[${r}]  ${e.name}:`, ...n);
          }
        };
      var y,
        v =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
        w = {},
        I = v || self;
      function b() {}
      function E(e) {
        var t = typeof e;
        return (
          "array" ==
            (t =
              "object" != t
                ? t
                : e
                ? Array.isArray(e)
                  ? "array"
                  : t
                : "null") ||
          ("object" == t && "number" == typeof e.length)
        );
      }
      function T(e) {
        var t = typeof e;
        return ("object" == t && null != e) || "function" == t;
      }
      var S = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
        _ = 0;
      function x(e, t, n) {
        return e.call.apply(e.bind, arguments);
      }
      function D(t, n, e) {
        if (!t) throw Error();
        if (2 < arguments.length) {
          var r = Array.prototype.slice.call(arguments, 2);
          return function () {
            var e = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(e, r), t.apply(n, e);
          };
        }
        return function () {
          return t.apply(n, arguments);
        };
      }
      function A(e, t, n) {
        return (A =
          Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf("native code")
            ? x
            : D).apply(null, arguments);
      }
      function C(t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return function () {
          var e = n.slice();
          return e.push.apply(e, arguments), t.apply(this, e);
        };
      }
      function N(e, i) {
        function t() {}
        (t.prototype = i.prototype),
          (e.X = i.prototype),
          (e.prototype = new t()),
          ((e.prototype.constructor = e).Wb = function (e, t, n) {
            for (
              var r = Array(arguments.length - 2), s = 2;
              s < arguments.length;
              s++
            )
              r[s - 2] = arguments[s];
            return i.prototype[t].apply(e, r);
          });
      }
      function k() {
        (this.s = this.s), (this.o = this.o);
      }
      (k.prototype.s = !1),
        (k.prototype.na = function () {
          var e;
          !this.s &&
            ((this.s = !0), this.M(), 0) &&
            ((e = this),
            (Object.prototype.hasOwnProperty.call(e, S) && e[S]) ||
              (e[S] = ++_));
        }),
        (k.prototype.M = function () {
          if (this.o) for (; this.o.length; ) this.o.shift()();
        });
      const R = Array.prototype.indexOf
        ? function (e, t) {
            return Array.prototype.indexOf.call(e, t, void 0);
          }
        : function (e, t) {
            if ("string" == typeof e)
              return "string" != typeof t || 1 != t.length
                ? -1
                : e.indexOf(t, 0);
            for (let n = 0; n < e.length; n++)
              if (n in e && e[n] === t) return n;
            return -1;
          };
      function L(t) {
        var n = t.length;
        if (0 < n) {
          const r = Array(n);
          for (let e = 0; e < n; e++) r[e] = t[e];
          return r;
        }
        return [];
      }
      function M(t) {
        for (let e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          if (E(n)) {
            var r = t.length || 0,
              s = n.length || 0;
            t.length = r + s;
            for (let e = 0; e < s; e++) t[r + e] = n[e];
          } else t.push(n);
        }
      }
      function O(e, t) {
        (this.type = e),
          (this.g = this.target = t),
          (this.defaultPrevented = !1);
      }
      O.prototype.h = function () {
        this.defaultPrevented = !0;
      };
      var V = (function () {
        if (!I.addEventListener || !Object.defineProperty) return !1;
        var e = !1,
          t = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            },
          });
        try {
          I.addEventListener("test", b, t), I.removeEventListener("test", b, t);
        } catch (e) {}
        return e;
      })();
      function F(e) {
        return /^[\s\xa0]*$/.test(e);
      }
      var P = String.prototype.trim
        ? function (e) {
            return e.trim();
          }
        : function (e) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1];
          };
      function B(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      function U() {
        var e = I.navigator;
        return (e = e && e.userAgent) ? e : "";
      }
      function q(e) {
        return -1 != U().indexOf(e);
      }
      function K(e) {
        return K[" "](e), e;
      }
      K[" "] = b;
      var G,
        j = q("Opera"),
        $ = q("Trident") || q("MSIE"),
        Q = q("Edge"),
        z = Q || $,
        H =
          q("Gecko") &&
          !(-1 != U().toLowerCase().indexOf("webkit") && !q("Edge")) &&
          !(q("Trident") || q("MSIE")) &&
          !q("Edge"),
        W = -1 != U().toLowerCase().indexOf("webkit") && !q("Edge");
      function Y() {
        var e = I.document;
        return e ? e.documentMode : void 0;
      }
      e: {
        var X = "",
          J =
            ((J = U()),
            H
              ? /rv:([^\);]+)(\)|;)/.exec(J)
              : Q
              ? /Edge\/([\d\.]+)/.exec(J)
              : $
              ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(J)
              : W
              ? /WebKit\/(\S+)/.exec(J)
              : j
              ? /(?:Version)[ \/]?(\S+)/.exec(J)
              : void 0);
        if ((J && (X = J ? J[1] : ""), $)) {
          J = Y();
          if (null != J && J > parseFloat(X)) {
            G = String(J);
            break e;
          }
        }
        G = X;
      }
      var Z = {};
      function ee() {
        return (
          (e = function () {
            let e = 0;
            var t = P(String(G)).split("."),
              n = P("9").split("."),
              r = Math.max(t.length, n.length);
            for (let a = 0; 0 == e && a < r; a++)
              for (
                var s = t[a] || "", i = n[a] || "";
                (s = /(\d*)(\D*)(.*)/.exec(s) || ["", "", "", ""]),
                  (i = /(\d*)(\D*)(.*)/.exec(i) || ["", "", "", ""]),
                  (0 != s[0].length || 0 != i[0].length) &&
                    ((e =
                      B(
                        0 == s[1].length ? 0 : parseInt(s[1], 10),
                        0 == i[1].length ? 0 : parseInt(i[1], 10)
                      ) ||
                      B(0 == s[2].length, 0 == i[2].length) ||
                      B(s[2], i[2])),
                    (s = s[3]),
                    (i = i[3]),
                    0 == e);

              );
            return 0 <= e;
          }),
          (t = Z),
          Object.prototype.hasOwnProperty.call(t, 9) ? t[9] : (t[9] = e(9))
        );
        var e, t;
      }
      var te = (I.document && $ && (Y() || parseInt(G, 10))) || void 0;
      function ne(e, t) {
        if (
          (O.call(this, e ? e.type : ""),
          (this.relatedTarget = this.g = this.target = null),
          (this.button =
            this.screenY =
            this.screenX =
            this.clientY =
            this.clientX =
              0),
          (this.key = ""),
          (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
          (this.state = null),
          (this.pointerId = 0),
          (this.pointerType = ""),
          (this.i = null),
          e)
        ) {
          var n = (this.type = e.type),
            r =
              e.changedTouches && e.changedTouches.length
                ? e.changedTouches[0]
                : null;
          if (
            ((this.target = e.target || e.srcElement),
            (this.g = t),
            (t = e.relatedTarget))
          ) {
            if (H) {
              e: {
                try {
                  K(t.nodeName);
                  var s = !0;
                  break e;
                } catch (e) {}
                s = !1;
              }
              s || (t = null);
            }
          } else
            "mouseover" == n
              ? (t = e.fromElement)
              : "mouseout" == n && (t = e.toElement);
          (this.relatedTarget = t),
            r
              ? ((this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX),
                (this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY),
                (this.screenX = r.screenX || 0),
                (this.screenY = r.screenY || 0))
              : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
                (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
                (this.screenX = e.screenX || 0),
                (this.screenY = e.screenY || 0)),
            (this.button = e.button),
            (this.key = e.key || ""),
            (this.ctrlKey = e.ctrlKey),
            (this.altKey = e.altKey),
            (this.shiftKey = e.shiftKey),
            (this.metaKey = e.metaKey),
            (this.pointerId = e.pointerId || 0),
            (this.pointerType =
              "string" == typeof e.pointerType
                ? e.pointerType
                : re[e.pointerType] || ""),
            (this.state = e.state),
            (this.i = e).defaultPrevented && ne.X.h.call(this);
        }
      }
      N(ne, O);
      var re = { 2: "touch", 3: "pen", 4: "mouse" };
      ne.prototype.h = function () {
        ne.X.h.call(this);
        var e = this.i;
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
      };
      var se = "closure_listenable_" + ((1e6 * Math.random()) | 0),
        ie = 0;
      function ae(e, t, n, r, s) {
        (this.listener = e),
          (this.proxy = null),
          (this.src = t),
          (this.type = n),
          (this.capture = !!r),
          (this.ha = s),
          (this.key = ++ie),
          (this.ba = this.ea = !1);
      }
      function oe(e) {
        (e.ba = !0),
          (e.listener = null),
          (e.proxy = null),
          (e.src = null),
          (e.ha = null);
      }
      function ue(e, t, n) {
        for (const r in e) t.call(n, e[r], r, e);
      }
      function ce(e) {
        const t = {};
        for (const n in e) t[n] = e[n];
        return t;
      }
      const he =
        "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
          " "
        );
      function le(t) {
        let n, r;
        for (let s = 1; s < arguments.length; s++) {
          for (n in (r = arguments[s])) t[n] = r[n];
          for (let e = 0; e < he.length; e++)
            (n = he[e]),
              Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
      }
      function de(e) {
        (this.src = e), (this.g = {}), (this.h = 0);
      }
      function fe(e, t) {
        var n,
          r,
          s,
          i = t.type;
        i in e.g &&
          ((n = e.g[i]),
          (s = 0 <= (r = R(n, t))) && Array.prototype.splice.call(n, r, 1),
          s && (oe(t), 0 == e.g[i].length && (delete e.g[i], e.h--)));
      }
      function ge(e, t, n, r) {
        for (var s = 0; s < e.length; ++s) {
          var i = e[s];
          if (!i.ba && i.listener == t && i.capture == !!n && i.ha == r)
            return s;
        }
        return -1;
      }
      de.prototype.add = function (e, t, n, r, s) {
        var i = e.toString();
        (e = this.g[i]) || ((e = this.g[i] = []), this.h++);
        var a = ge(e, t, r, s);
        return (
          -1 < a
            ? ((t = e[a]), n || (t.ea = !1))
            : (((t = new ae(t, this.src, i, !!r, s)).ea = n), e.push(t)),
          t
        );
      };
      var me = "closure_lm_" + ((1e6 * Math.random()) | 0),
        pe = {};
      function ye(e, t, n, r, s) {
        if (r && r.once)
          return (function e(t, n, r, s, i) {
            if (Array.isArray(n)) {
              for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
              return null;
            }
            r = Se(r);
            return t && t[se]
              ? t.O(n, r, T(s) ? !!s.capture : !!s, i)
              : ve(t, n, r, !0, s, i);
          })(e, t, n, r, s);
        if (Array.isArray(t)) {
          for (var i = 0; i < t.length; i++) ye(e, t[i], n, r, s);
          return null;
        }
        return (
          (n = Se(n)),
          e && e[se]
            ? e.N(t, n, T(r) ? !!r.capture : !!r, s)
            : ve(e, t, n, !1, r, s)
        );
      }
      function ve(e, t, n, r, s, i) {
        if (!t) throw Error("Invalid event type");
        var a = T(s) ? !!s.capture : !!s,
          o = Ee(e);
        if ((o || (e[me] = o = new de(e)), (n = o.add(t, n, r, a, i)).proxy))
          return n;
        if (
          ((r = (function () {
            const n = be;
            return function e(t) {
              return n.call(e.src, e.listener, t);
            };
          })()),
          ((n.proxy = r).src = e),
          (r.listener = n),
          e.addEventListener)
        )
          void 0 === (s = !V ? a : s) && (s = !1),
            e.addEventListener(t.toString(), r, s);
        else if (e.attachEvent) e.attachEvent(Ie(t.toString()), r);
        else {
          if (!e.addListener || !e.removeListener)
            throw Error("addEventListener and attachEvent are unavailable.");
          e.addListener(r);
        }
        return n;
      }
      function we(e) {
        var t, n, r;
        "number" != typeof e &&
          e &&
          !e.ba &&
          ((t = e.src) && t[se]
            ? fe(t.i, e)
            : ((n = e.type),
              (r = e.proxy),
              t.removeEventListener
                ? t.removeEventListener(n, r, e.capture)
                : t.detachEvent
                ? t.detachEvent(Ie(n), r)
                : t.addListener && t.removeListener && t.removeListener(r),
              (n = Ee(t))
                ? (fe(n, e), 0 == n.h && ((n.src = null), (t[me] = null)))
                : oe(e)));
      }
      function Ie(e) {
        return e in pe ? pe[e] : (pe[e] = "on" + e);
      }
      function be(e, t) {
        var n, r;
        return (e =
          !!e.ba ||
          ((t = new ne(t, this)),
          (n = e.listener),
          (r = e.ha || e.src),
          e.ea && we(e),
          n.call(r, t)));
      }
      function Ee(e) {
        return (e = e[me]) instanceof de ? e : null;
      }
      var Te = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
      function Se(t) {
        return "function" == typeof t
          ? t
          : (t[Te] ||
              (t[Te] = function (e) {
                return t.handleEvent(e);
              }),
            t[Te]);
      }
      function _e() {
        k.call(this), (this.i = new de(this)), ((this.P = this).I = null);
      }
      function xe(e, t) {
        var n,
          r = e.I;
        if (r) for (n = []; r; r = r.I) n.push(r);
        if (
          ((e = e.P),
          (r = t.type || t),
          "string" == typeof t
            ? (t = new O(t, e))
            : t instanceof O
            ? (t.target = t.target || e)
            : ((a = t), le((t = new O(r, e)), a)),
          (a = !0),
          n)
        )
          for (var s = n.length - 1; 0 <= s; s--)
            var i = (t.g = n[s]), a = De(i, r, !0, t) && a;
        if (
          ((a = De((i = t.g = e), r, !0, t) && a),
          (a = De(i, r, !1, t) && a),
          n)
        )
          for (s = 0; s < n.length; s++)
            a = De((i = t.g = n[s]), r, !1, t) && a;
      }
      function De(e, t, n, r) {
        if (!(t = e.i.g[String(t)])) return !0;
        t = t.concat();
        for (var s = !0, i = 0; i < t.length; ++i) {
          var a,
            o,
            u = t[i];
          u &&
            !u.ba &&
            u.capture == n &&
            ((a = u.listener),
            (o = u.ha || u.src),
            u.ea && fe(e.i, u),
            (s = !1 !== a.call(o, r) && s));
        }
        return s && !r.defaultPrevented;
      }
      N(_e, k),
        (_e.prototype[se] = !0),
        (_e.prototype.removeEventListener = function (e, t, n, r) {
          !(function e(t, n, r, s, i) {
            if (Array.isArray(n))
              for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
            else
              (s = T(s) ? !!s.capture : !!s),
                (r = Se(r)),
                t && t[se]
                  ? ((t = t.i),
                    (n = String(n).toString()) in t.g &&
                      -1 < (r = ge((a = t.g[n]), r, s, i)) &&
                      (oe(a[r]),
                      Array.prototype.splice.call(a, r, 1),
                      0 == a.length && (delete t.g[n], t.h--)))
                  : (t = t && Ee(t)) &&
                    ((n = t.g[n.toString()]),
                    (r =
                      (t = -1) < (t = n ? ge(n, r, s, i) : t) ? n[t] : null) &&
                      we(r));
          })(this, e, t, n, r);
        }),
        (_e.prototype.M = function () {
          if ((_e.X.M.call(this), this.i)) {
            var e,
              t = this.i;
            for (e in t.g) {
              for (var n = t.g[e], r = 0; r < n.length; r++) oe(n[r]);
              delete t.g[e], t.h--;
            }
          }
          this.I = null;
        }),
        (_e.prototype.N = function (e, t, n, r) {
          return this.i.add(String(e), t, !1, n, r);
        }),
        (_e.prototype.O = function (e, t, n, r) {
          return this.i.add(String(e), t, !0, n, r);
        });
      var Ae = I.JSON.stringify;
      var Ce,
        Ne = new (class {
          constructor(e, t) {
            (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
          }
          get() {
            let e;
            return (
              0 < this.h
                ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
                : (e = this.i()),
              e
            );
          }
        })(
          () => new ke(),
          (e) => e.reset()
        );
      class ke {
        constructor() {
          this.next = this.g = this.h = null;
        }
        set(e, t) {
          (this.h = e), (this.g = t), (this.next = null);
        }
        reset() {
          this.next = this.g = this.h = null;
        }
      }
      function Re(e, t) {
        var n;
        Ce ||
          ((n = I.Promise.resolve(void 0)),
          (Ce = function () {
            n.then(Oe);
          })),
          Le || (Ce(), (Le = !0)),
          Me.add(e, t);
      }
      var Le = !1,
        Me = new (class {
          constructor() {
            this.h = this.g = null;
          }
          add(e, t) {
            const n = Ne.get();
            n.set(e, t),
              this.h ? (this.h.next = n) : (this.g = n),
              (this.h = n);
          }
        })();
      function Oe() {
        for (
          var e;
          (e = (function () {
            var e = Me;
            let t = null;
            return (
              e.g &&
                ((t = e.g),
                (e.g = e.g.next),
                e.g || (e.h = null),
                (t.next = null)),
              t
            );
          })());

        ) {
          try {
            e.h.call(e.g);
          } catch (e) {
            !(function (e) {
              I.setTimeout(() => {
                throw e;
              }, 0);
            })(e);
          }
          var t = Ne;
          t.j(e), t.h < 100 && (t.h++, (e.next = t.g), (t.g = e));
        }
        Le = !1;
      }
      function Ve(e, t) {
        _e.call(this),
          (this.h = e || 1),
          (this.g = t || I),
          (this.j = A(this.lb, this)),
          (this.l = Date.now());
      }
      function Fe(e) {
        (e.ca = !1), e.R && (e.g.clearTimeout(e.R), (e.R = null));
      }
      function Pe(e, t, n) {
        if ("function" == typeof e) n && (e = A(e, n));
        else {
          if (!e || "function" != typeof e.handleEvent)
            throw Error("Invalid listener argument");
          e = A(e.handleEvent, e);
        }
        return 2147483647 < Number(t) ? -1 : I.setTimeout(e, t || 0);
      }
      N(Ve, _e),
        ((y = Ve.prototype).ca = !1),
        (y.R = null),
        (y.lb = function () {
          var e;
          this.ca &&
            (0 < (e = Date.now() - this.l) && e < 0.8 * this.h
              ? (this.R = this.g.setTimeout(this.j, this.h - e))
              : (this.R && (this.g.clearTimeout(this.R), (this.R = null)),
                xe(this, "tick"),
                this.ca && (Fe(this), this.start())));
        }),
        (y.start = function () {
          (this.ca = !0),
            this.R ||
              ((this.R = this.g.setTimeout(this.j, this.h)),
              (this.l = Date.now()));
        }),
        (y.M = function () {
          Ve.X.M.call(this), Fe(this), delete this.g;
        });
      class Be extends k {
        constructor(e, t) {
          super(),
            (this.m = e),
            (this.j = t),
            (this.h = null),
            (this.i = !1),
            (this.g = null);
        }
        l(e) {
          (this.h = arguments),
            this.g
              ? (this.i = !0)
              : (function e(t) {
                  t.g = Pe(() => {
                    (t.g = null), t.i && ((t.i = !1), e(t));
                  }, t.j);
                  var n = t.h;
                  (t.h = null), t.m.apply(null, n);
                })(this);
        }
        M() {
          super.M(),
            this.g &&
              (I.clearTimeout(this.g),
              (this.g = null),
              (this.i = !1),
              (this.h = null));
        }
      }
      function Ue(e) {
        k.call(this), (this.h = e), (this.g = {});
      }
      N(Ue, k);
      var qe = [];
      function Ke(e, t, n, r) {
        Array.isArray(n) || (n && (qe[0] = n.toString()), (n = qe));
        for (var s = 0; s < n.length; s++) {
          var i = ye(t, n[s], r || e.handleEvent, !1, e.h || e);
          if (!i) break;
          e.g[i.key] = i;
        }
      }
      function Ge(e) {
        ue(
          e.g,
          function (e, t) {
            this.g.hasOwnProperty(t) && we(e);
          },
          e
        ),
          (e.g = {});
      }
      function je() {
        this.g = !0;
      }
      function $e(e, t, n, r) {
        e.info(function () {
          return (
            "XMLHTTP TEXT (" +
            t +
            "): " +
            (function (e, t) {
              if (!e.g) return t;
              if (!t) return null;
              try {
                var n = JSON.parse(t);
                if (n)
                  for (e = 0; e < n.length; e++)
                    if (Array.isArray(n[e])) {
                      var r = n[e];
                      if (!(r.length < 2)) {
                        var s = r[1];
                        if (Array.isArray(s) && !(s.length < 1)) {
                          var i = s[0];
                          if ("noop" != i && "stop" != i && "close" != i)
                            for (var a = 1; a < s.length; a++) s[a] = "";
                        }
                      }
                    }
                return Ae(n);
              } catch (e) {
                return t;
              }
            })(e, n) +
            (r ? " " + r : "")
          );
        });
      }
      (Ue.prototype.M = function () {
        Ue.X.M.call(this), Ge(this);
      }),
        (Ue.prototype.handleEvent = function () {
          throw Error("EventHandler.handleEvent not implemented");
        }),
        (je.prototype.Aa = function () {
          this.g = !1;
        }),
        (je.prototype.info = function () {});
      var Qe = {},
        ze = null;
      function He() {
        return (ze = ze || new _e());
      }
      function We(e) {
        O.call(this, Qe.Pa, e);
      }
      function Ye() {
        var e = He();
        xe(e, new We(e));
      }
      function Xe(e, t) {
        O.call(this, Qe.STAT_EVENT, e), (this.stat = t);
      }
      function Je(e) {
        var t = He();
        xe(t, new Xe(t, e));
      }
      function Ze(e, t) {
        O.call(this, Qe.Qa, e), (this.size = t);
      }
      function et(e, t) {
        if ("function" != typeof e)
          throw Error("Fn must not be null and must be a function");
        return I.setTimeout(function () {
          e();
        }, t);
      }
      (Qe.Pa = "serverreachability"),
        N(We, O),
        (Qe.STAT_EVENT = "statevent"),
        N(Xe, O),
        (Qe.Qa = "timingevent"),
        N(Ze, O);
      var tt = {
          NO_ERROR: 0,
          mb: 1,
          zb: 2,
          yb: 3,
          tb: 4,
          xb: 5,
          Ab: 6,
          Ma: 7,
          TIMEOUT: 8,
          Db: 9,
        },
        nt = {
          rb: "complete",
          Nb: "success",
          Na: "error",
          Ma: "abort",
          Fb: "ready",
          Gb: "readystatechange",
          TIMEOUT: "timeout",
          Bb: "incrementaldata",
          Eb: "progress",
          ub: "downloadprogress",
          Vb: "uploadprogress",
        };
      function rt() {}
      function st(e) {
        return e.h || (e.h = e.i());
      }
      function it() {}
      rt.prototype.h = null;
      v = { OPEN: "a", qb: "b", Na: "c", Cb: "d" };
      function at() {
        O.call(this, "d");
      }
      function ot() {
        O.call(this, "c");
      }
      function ut() {}
      function ct(e, t, n, r) {
        (this.l = e),
          (this.j = t),
          (this.m = n),
          (this.U = r || 1),
          (this.S = new Ue(this)),
          (this.O = dt),
          (this.T = new Ve((e = z ? 125 : void 0))),
          (this.H = null),
          (this.i = !1),
          (this.s = this.A = this.v = this.K = this.F = this.V = this.B = null),
          (this.D = []),
          (this.g = null),
          (this.C = 0),
          (this.o = this.u = null),
          (this.Y = -1),
          (this.I = !1),
          (this.N = 0),
          (this.L = null),
          (this.$ = this.J = this.Z = this.P = !1),
          (this.h = new ht());
      }
      function ht() {
        (this.i = null), (this.g = ""), (this.h = !1);
      }
      N(at, O),
        N(ot, O),
        N(ut, rt),
        (ut.prototype.g = function () {
          return new XMLHttpRequest();
        }),
        (ut.prototype.i = function () {
          return {};
        });
      var lt = new ut(),
        dt = 45e3,
        ft = {},
        gt = {};
      function mt(e, t, n) {
        (e.K = 1), (e.v = Lt(At(t))), (e.s = n), (e.P = !0), pt(e, null);
      }
      function pt(e, t) {
        (e.F = Date.now()), wt(e), (e.A = At(e.v));
        var a,
          o,
          u,
          c,
          h,
          l,
          n = e.A,
          r = e.U;
        Array.isArray(r) || (r = [String(r)]),
          Qt(n.i, "t", r),
          (e.C = 0),
          (n = e.l.H),
          (e.h = new ht()),
          (e.g = Qn(e.l, n ? t : null, !e.s)),
          0 < e.N && (e.L = new Be(A(e.La, e, e.g), e.N)),
          Ke(e.S, e.g, "readystatechange", e.ib),
          (t = e.H ? ce(e.H) : {}),
          e.s
            ? (e.u || (e.u = "POST"),
              (t["Content-Type"] = "application/x-www-form-urlencoded"),
              e.g.da(e.A, e.u, e.s, t))
            : ((e.u = "GET"), e.g.da(e.A, e.u, null, t)),
          Ye(),
          (a = e.j),
          (o = e.u),
          (u = e.A),
          (c = e.m),
          (h = e.U),
          (l = e.s),
          a.info(function () {
            if (a.g)
              if (l)
                for (var e = "", t = l.split("&"), n = 0; n < t.length; n++) {
                  var r,
                    s,
                    i = t[n].split("=");
                  1 < i.length &&
                    ((r = i[0]),
                    (i = i[1]),
                    (e =
                      2 <= (s = r.split("_")).length && "type" == s[1]
                        ? e + (r + "=") + i + "&"
                        : e + (r + "=redacted&")));
                }
              else e = null;
            else e = l;
            return (
              "XMLHTTP REQ (" +
              c +
              ") [attempt " +
              h +
              "]: " +
              o +
              "\n" +
              u +
              "\n" +
              e
            );
          });
      }
      function yt(e) {
        return e.g && "GET" == e.u && 2 != e.K && e.l.Da;
      }
      function vt(e, t, n) {
        let r = !0,
          s;
        for (; !e.I && e.C < n.length; ) {
          if (
            ((s =
              ((a = n),
              (u = o = void 0),
              (o = (i = e).C),
              -1 == (u = a.indexOf("\n", o))
                ? gt
                : ((o = Number(a.substring(o, u))),
                  isNaN(o)
                    ? ft
                    : (u += 1) + o > a.length
                    ? gt
                    : ((a = a.substr(u, o)), (i.C = u + o), a)))),
            s == gt)
          ) {
            4 == t && ((e.o = 4), Je(14), (r = !1)),
              $e(e.j, e.m, null, "[Incomplete Response]");
            break;
          }
          if (s == ft) {
            (e.o = 4), Je(15), $e(e.j, e.m, n, "[Invalid Chunk]"), (r = !1);
            break;
          }
          $e(e.j, e.m, s, null), St(e, s);
        }
        var i, a, o, u;
        yt(e) && s != gt && s != ft && ((e.h.g = ""), (e.C = 0)),
          4 != t || 0 != n.length || e.h.h || ((e.o = 1), Je(16), (r = !1)),
          (e.i = e.i && r),
          r
            ? 0 < n.length &&
              !e.$ &&
              ((e.$ = !0),
              (t = e.l).g == e &&
                t.$ &&
                !t.K &&
                (t.j.info(
                  "Great, no buffering proxy detected. Bytes received: " +
                    n.length
                ),
                Pn(t),
                (t.K = !0),
                Je(11)))
            : ($e(e.j, e.m, n, "[Invalid Chunked Response]"), Tt(e), Et(e));
      }
      function wt(e) {
        (e.V = Date.now() + e.O), It(e, e.O);
      }
      function It(e, t) {
        if (null != e.B) throw Error("WatchDog timer not null");
        e.B = et(A(e.gb, e), t);
      }
      function bt(e) {
        e.B && (I.clearTimeout(e.B), (e.B = null));
      }
      function Et(e) {
        0 == e.l.G || e.I || qn(e.l, e);
      }
      function Tt(e) {
        bt(e);
        var t = e.L;
        t && "function" == typeof t.na && t.na(),
          (e.L = null),
          Fe(e.T),
          Ge(e.S),
          e.g && ((t = e.g), (e.g = null), t.abort(), t.na());
      }
      function St(e, t) {
        try {
          var n = e.l;
          if (0 != n.G && (n.g == e || Zt(n.h, e)))
            if (!e.J && Zt(n.h, e) && 3 == n.G) {
              try {
                var r = n.Fa.g.parse(t);
              } catch (e) {
                r = null;
              }
              if (Array.isArray(r) && 3 == r.length) {
                var s = r;
                if (0 == s[0]) {
                  e: if (!n.u) {
                    if (n.g) {
                      if (!(n.g.F + 3e3 < e.F)) break e;
                      Un(n), Nn(n);
                    }
                    Fn(n), Je(18);
                  }
                } else
                  (n.Ba = s[1]),
                    0 < n.Ba - n.T &&
                      s[2] < 37500 &&
                      n.L &&
                      0 == n.A &&
                      !n.v &&
                      (n.v = et(A(n.cb, n), 6e3));
                if (Jt(n.h) <= 1 && n.ja) {
                  try {
                    n.ja();
                  } catch (e) {}
                  n.ja = void 0;
                }
              } else Gn(n, 11);
            } else if (((!e.J && n.g != e) || Un(n), !F(t)))
              for (s = n.Fa.g.parse(t), t = 0; t < s.length; t++) {
                var i = s[t];
                if (((n.T = i[0]), (i = i[1]), 2 == n.G))
                  if ("c" == i[0]) {
                    (n.I = i[1]), (n.ka = i[2]);
                    var a = i[3];
                    null != a && ((n.ma = a), n.j.info("VER=" + n.ma));
                    var o = i[4];
                    null != o && ((n.Ca = o), n.j.info("SVER=" + n.Ca));
                    var u,
                      c,
                      h = i[5];
                    null != h &&
                      "number" == typeof h &&
                      0 < h &&
                      ((r = 1.5 * h),
                      (n.J = r),
                      n.j.info("backChannelRequestTimeoutMs_=" + r)),
                      (r = n);
                    const g = e.g;
                    if (g) {
                      const m = g.g
                        ? g.g.getResponseHeader("X-Client-Wire-Protocol")
                        : null;
                      m &&
                        ((u = r.h).g ||
                          (-1 == m.indexOf("spdy") &&
                            -1 == m.indexOf("quic") &&
                            -1 == m.indexOf("h2")) ||
                          ((u.j = u.l),
                          (u.g = new Set()),
                          u.h && (en(u, u.h), (u.h = null)))),
                        !r.D ||
                          ((c = g.g
                            ? g.g.getResponseHeader("X-HTTP-Session-Id")
                            : null) &&
                            ((r.za = c), Rt(r.F, r.D, c)));
                    }
                    (n.G = 3),
                      n.l && n.l.xa(),
                      n.$ &&
                        ((n.P = Date.now() - e.F),
                        n.j.info("Handshake RTT: " + n.P + "ms"));
                    var l,
                      d,
                      f = e;
                    ((r = n).sa = $n(r, r.H ? r.ka : null, r.V)),
                      f.J
                        ? (tn(r.h, f),
                          (l = f),
                          (d = r.J) && l.setTimeout(d),
                          l.B && (bt(l), wt(l)),
                          (r.g = f))
                        : Vn(r),
                      0 < n.i.length && Rn(n);
                  } else ("stop" != i[0] && "close" != i[0]) || Gn(n, 7);
                else
                  3 == n.G &&
                    ("stop" == i[0] || "close" == i[0]
                      ? "stop" == i[0]
                        ? Gn(n, 7)
                        : Cn(n)
                      : "noop" != i[0] && n.l && n.l.wa(i),
                    (n.A = 0));
              }
          Ye();
        } catch (e) {}
      }
      function _t(e, t) {
        if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
        else if (E(e) || "string" == typeof e)
          Array.prototype.forEach.call(e, t, void 0);
        else
          for (
            var n = (function (e) {
                if (e.oa && "function" == typeof e.oa) return e.oa();
                if (!e.W || "function" != typeof e.W) {
                  if ("undefined" != typeof Map && e instanceof Map)
                    return Array.from(e.keys());
                  if (!("undefined" != typeof Set && e instanceof Set)) {
                    if (E(e) || "string" == typeof e) {
                      var t = [];
                      e = e.length;
                      for (var n = 0; n < e; n++) t.push(n);
                      return t;
                    }
                    (t = []), (n = 0);
                    for (const r in e) t[n++] = r;
                    return t;
                  }
                }
              })(e),
              r = (function (e) {
                if (e.W && "function" == typeof e.W) return e.W();
                if (
                  ("undefined" != typeof Map && e instanceof Map) ||
                  ("undefined" != typeof Set && e instanceof Set)
                )
                  return Array.from(e.values());
                if ("string" == typeof e) return e.split("");
                if (E(e)) {
                  for (var t = [], n = e.length, r = 0; r < n; r++)
                    t.push(e[r]);
                  return t;
                }
                for (r in ((t = []), (n = 0), e)) t[n++] = e[r];
                return t;
              })(e),
              s = r.length,
              i = 0;
            i < s;
            i++
          )
            t.call(void 0, r[i], n && n[i], e);
      }
      ((y = ct.prototype).setTimeout = function (e) {
        this.O = e;
      }),
        (y.ib = function (e) {
          e = e.target;
          const t = this.L;
          t && 3 == Tn(e) ? t.l() : this.La(e);
        }),
        (y.La = function (e) {
          try {
            if (e == this.g)
              e: {
                var t = Tn(this.g),
                  n = this.g.Ea();
                this.g.aa();
                if (
                  !(t < 3) &&
                  (3 != t ||
                    z ||
                    (this.g && (this.h.h || this.g.fa() || Sn(this.g))))
                ) {
                  this.I || 4 != t || 7 == n || Ye(), bt(this);
                  var r = this.g.aa();
                  this.Y = r;
                  t: if (yt(this)) {
                    var s = Sn(this.g);
                    e = "";
                    var i = s.length,
                      a = 4 == Tn(this.g);
                    if (!this.h.i) {
                      if ("undefined" == typeof TextDecoder) {
                        Tt(this), Et(this);
                        var o = "";
                        break t;
                      }
                      this.h.i = new I.TextDecoder();
                    }
                    for (n = 0; n < i; n++)
                      (this.h.h = !0),
                        (e += this.h.i.decode(s[n], {
                          stream: a && n == i - 1,
                        }));
                    s.splice(0, i),
                      (this.h.g += e),
                      (this.C = 0),
                      (o = this.h.g);
                  } else o = this.g.fa();
                  if (
                    ((this.i = 200 == r),
                    (l = this.j),
                    (d = this.u),
                    (f = this.A),
                    (g = this.m),
                    (m = this.U),
                    (p = t),
                    (y = r),
                    l.info(function () {
                      return (
                        "XMLHTTP RESP (" +
                        g +
                        ") [ attempt " +
                        m +
                        "]: " +
                        d +
                        "\n" +
                        f +
                        "\n" +
                        p +
                        " " +
                        y
                      );
                    }),
                    this.i)
                  ) {
                    if (this.Z && !this.J) {
                      t: {
                        if (this.g) {
                          var u,
                            c = this.g;
                          if (
                            (u = c.g
                              ? c.g.getResponseHeader("X-HTTP-Initial-Response")
                              : null) &&
                            !F(u)
                          ) {
                            var h = u;
                            break t;
                          }
                        }
                        h = null;
                      }
                      if (!(r = h)) {
                        (this.i = !1), (this.o = 3), Je(12), Tt(this), Et(this);
                        break e;
                      }
                      $e(
                        this.j,
                        this.m,
                        r,
                        "Initial handshake response via X-HTTP-Initial-Response"
                      ),
                        (this.J = !0),
                        St(this, r);
                    }
                    this.P
                      ? (vt(this, t, o),
                        z &&
                          this.i &&
                          3 == t &&
                          (Ke(this.S, this.T, "tick", this.hb), this.T.start()))
                      : ($e(this.j, this.m, o, null), St(this, o)),
                      4 == t && Tt(this),
                      this.i &&
                        !this.I &&
                        (4 == t ? qn(this.l, this) : ((this.i = !1), wt(this)));
                  } else
                    400 == r && 0 < o.indexOf("Unknown SID")
                      ? ((this.o = 3), Je(12))
                      : ((this.o = 0), Je(13)),
                      Tt(this),
                      Et(this);
                }
              }
          } catch (e) {}
          var l, d, f, g, m, p, y;
        }),
        (y.hb = function () {
          var e, t;
          this.g &&
            ((e = Tn(this.g)),
            (t = this.g.fa()),
            this.C < t.length &&
              (bt(this), vt(this, e, t), this.i && 4 != e && wt(this)));
        }),
        (y.cancel = function () {
          (this.I = !0), Tt(this);
        }),
        (y.gb = function () {
          this.B = null;
          var e,
            t,
            n = Date.now();
          0 <= n - this.V
            ? ((e = this.j),
              (t = this.A),
              e.info(function () {
                return "TIMEOUT: " + t;
              }),
              2 != this.K && (Ye(), Je(17)),
              Tt(this),
              (this.o = 2),
              Et(this))
            : It(this, this.V - n);
        });
      var xt = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
      );
      function Dt(e, t) {
        var n;
        (this.g = this.s = this.j = ""),
          (this.m = null),
          (this.o = this.l = ""),
          (this.h = !1),
          e instanceof Dt
            ? ((this.h = void 0 !== t ? t : e.h),
              Ct(this, e.j),
              (this.s = e.s),
              (this.g = e.g),
              Nt(this, e.m),
              (this.l = e.l),
              (t = e.i),
              ((n = new Kt()).i = t.i),
              t.g && ((n.g = new Map(t.g)), (n.h = t.h)),
              kt(this, n),
              (this.o = e.o))
            : e && (n = String(e).match(xt))
            ? ((this.h = !!t),
              Ct(this, n[1] || "", !0),
              (this.s = Mt(n[2] || "")),
              (this.g = Mt(n[3] || "", !0)),
              Nt(this, n[4]),
              (this.l = Mt(n[5] || "", !0)),
              kt(this, n[6] || "", !0),
              (this.o = Mt(n[7] || "")))
            : ((this.h = !!t), (this.i = new Kt(null, this.h)));
      }
      function At(e) {
        return new Dt(e);
      }
      function Ct(e, t, n) {
        (e.j = n ? Mt(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
      }
      function Nt(e, t) {
        if (t) {
          if (((t = Number(t)), isNaN(t) || t < 0))
            throw Error("Bad port number " + t);
          e.m = t;
        } else e.m = null;
      }
      function kt(e, t, n) {
        var r, s;
        t instanceof Kt
          ? ((e.i = t),
            (r = e.i),
            (s = e.h) &&
              !r.j &&
              (Gt(r),
              (r.i = null),
              r.g.forEach(function (e, t) {
                var n = t.toLowerCase();
                t != n && (jt(this, t), Qt(this, n, e));
              }, r)),
            (r.j = s))
          : (n || (t = Ot(t, Ut)), (e.i = new Kt(t, e.h)));
      }
      function Rt(e, t, n) {
        e.i.set(t, n);
      }
      function Lt(e) {
        return (
          Rt(
            e,
            "zx",
            Math.floor(2147483648 * Math.random()).toString(36) +
              Math.abs(
                Math.floor(2147483648 * Math.random()) ^ Date.now()
              ).toString(36)
          ),
          e
        );
      }
      function Mt(e, t) {
        return e
          ? t
            ? decodeURI(e.replace(/%25/g, "%2525"))
            : decodeURIComponent(e)
          : "";
      }
      function Ot(e, t, n) {
        return "string" == typeof e
          ? ((e = encodeURI(e).replace(t, Vt)),
            (e = n ? e.replace(/%25([0-9a-fA-F]{2})/g, "%$1") : e))
          : null;
      }
      function Vt(e) {
        return (
          "%" +
          (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
          (15 & e).toString(16)
        );
      }
      Dt.prototype.toString = function () {
        var e = [],
          t = this.j;
        t && e.push(Ot(t, Ft, !0), ":");
        var n = this.g;
        return (
          (!n && "file" != t) ||
            (e.push("//"),
            (t = this.s) && e.push(Ot(t, Ft, !0), "@"),
            e.push(
              encodeURIComponent(String(n)).replace(
                /%25([0-9a-fA-F]{2})/g,
                "%$1"
              )
            ),
            null != (n = this.m) && e.push(":", String(n))),
          (n = this.l) &&
            (this.g && "/" != n.charAt(0) && e.push("/"),
            e.push(Ot(n, "/" == n.charAt(0) ? Bt : Pt, !0))),
          (n = this.i.toString()) && e.push("?", n),
          (n = this.o) && e.push("#", Ot(n, qt)),
          e.join("")
        );
      };
      var Ft = /[#\/\?@]/g,
        Pt = /[#\?:]/g,
        Bt = /[#\?]/g,
        Ut = /[#\?@]/g,
        qt = /#/g;
      function Kt(e, t) {
        (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
      }
      function Gt(n) {
        n.g ||
          ((n.g = new Map()),
          (n.h = 0),
          n.i &&
            (function (e, t) {
              if (e) {
                e = e.split("&");
                for (var n = 0; n < e.length; n++) {
                  var r,
                    s = e[n].indexOf("="),
                    i = null;
                  0 <= s
                    ? ((r = e[n].substring(0, s)), (i = e[n].substring(s + 1)))
                    : (r = e[n]),
                    t(r, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "");
                }
              }
            })(n.i, function (e, t) {
              n.add(decodeURIComponent(e.replace(/\+/g, " ")), t);
            }));
      }
      function jt(e, t) {
        Gt(e),
          (t = zt(e, t)),
          e.g.has(t) &&
            ((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t));
      }
      function $t(e, t) {
        return Gt(e), (t = zt(e, t)), e.g.has(t);
      }
      function Qt(e, t, n) {
        jt(e, t),
          0 < n.length &&
            ((e.i = null), e.g.set(zt(e, t), L(n)), (e.h += n.length));
      }
      function zt(e, t) {
        return (t = String(t)), (t = e.j ? t.toLowerCase() : t);
      }
      ((y = Kt.prototype).add = function (e, t) {
        Gt(this), (this.i = null), (e = zt(this, e));
        var n = this.g.get(e);
        return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this;
      }),
        (y.forEach = function (n, r) {
          Gt(this),
            this.g.forEach(function (e, t) {
              e.forEach(function (e) {
                n.call(r, e, t, this);
              }, this);
            }, this);
        }),
        (y.oa = function () {
          Gt(this);
          const t = Array.from(this.g.values()),
            n = Array.from(this.g.keys()),
            r = [];
          for (let i = 0; i < n.length; i++) {
            var s = t[i];
            for (let e = 0; e < s.length; e++) r.push(n[i]);
          }
          return r;
        }),
        (y.W = function (t) {
          Gt(this);
          let n = [];
          if ("string" == typeof t)
            $t(this, t) && (n = n.concat(this.g.get(zt(this, t))));
          else {
            t = Array.from(this.g.values());
            for (let e = 0; e < t.length; e++) n = n.concat(t[e]);
          }
          return n;
        }),
        (y.set = function (e, t) {
          return (
            Gt(this),
            (this.i = null),
            $t(this, (e = zt(this, e))) && (this.h -= this.g.get(e).length),
            this.g.set(e, [t]),
            (this.h += 1),
            this
          );
        }),
        (y.get = function (e, t) {
          return e && 0 < (e = this.W(e)).length ? String(e[0]) : t;
        }),
        (y.toString = function () {
          if (this.i) return this.i;
          if (!this.g) return "";
          const e = [],
            t = Array.from(this.g.keys());
          for (var n = 0; n < t.length; n++)
            for (
              var r = t[n],
                s = encodeURIComponent(String(r)),
                i = this.W(r),
                r = 0;
              r < i.length;
              r++
            ) {
              var a = s;
              "" !== i[r] && (a += "=" + encodeURIComponent(String(i[r]))),
                e.push(a);
            }
          return (this.i = e.join("&"));
        });
      var Ht = class {
        constructor(e, t) {
          (this.h = e), (this.g = t);
        }
      };
      function Wt(e) {
        (this.l = e || 10),
          (e = I.PerformanceNavigationTiming
            ? 0 < (e = I.performance.getEntriesByType("navigation")).length &&
              ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol)
            : !!(I.g && I.g.Ga && I.g.Ga() && I.g.Ga().$b)),
          (this.j = e ? this.l : 1),
          (this.g = null),
          1 < this.j && (this.g = new Set()),
          (this.h = null),
          (this.i = []);
      }
      var Yt;
      function Xt(e) {
        return e.h || (e.g && e.g.size >= e.j);
      }
      function Jt(e) {
        return e.h ? 1 : e.g ? e.g.size : 0;
      }
      function Zt(e, t) {
        return e.h ? e.h == t : e.g && e.g.has(t);
      }
      function en(e, t) {
        e.g ? e.g.add(t) : (e.h = t);
      }
      function tn(e, t) {
        e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
      }
      function nn(t) {
        if (null != t.h) return t.i.concat(t.h.D);
        if (null == t.g || 0 === t.g.size) return L(t.i);
        {
          let e = t.i;
          for (const n of t.g.values()) e = e.concat(n.D);
          return e;
        }
      }
      function rn() {}
      function sn() {
        this.g = new rn();
      }
      function an(e, t, n, r, s) {
        try {
          (t.onload = null),
            (t.onerror = null),
            (t.onabort = null),
            (t.ontimeout = null),
            s(r);
        } catch (e) {}
      }
      function on(e) {
        (this.l = e.ac || null), (this.j = e.jb || !1);
      }
      function un(e, t) {
        _e.call(this),
          (this.D = e),
          (this.u = t),
          (this.m = void 0),
          (this.readyState = cn),
          (this.status = 0),
          (this.responseType =
            this.responseText =
            this.response =
            this.statusText =
              ""),
          (this.onreadystatechange = null),
          (this.v = new Headers()),
          (this.h = null),
          (this.C = "GET"),
          (this.B = ""),
          (this.g = !1),
          (this.A = this.j = this.l = null);
      }
      (Wt.prototype.cancel = function () {
        if (((this.i = nn(this)), this.h)) this.h.cancel(), (this.h = null);
        else if (this.g && 0 !== this.g.size) {
          for (const e of this.g.values()) e.cancel();
          this.g.clear();
        }
      }),
        (rn.prototype.stringify = function (e) {
          return I.JSON.stringify(e, void 0);
        }),
        (rn.prototype.parse = function (e) {
          return I.JSON.parse(e, void 0);
        }),
        N(on, rt),
        (on.prototype.g = function () {
          return new un(this.l, this.j);
        }),
        (on.prototype.i =
          ((Yt = {}),
          function () {
            return Yt;
          })),
        N(un, _e);
      var cn = 0;
      function hn(e) {
        e.j.read().then(e.Ta.bind(e)).catch(e.ga.bind(e));
      }
      function ln(e) {
        (e.readyState = 4), (e.l = null), (e.j = null), (e.A = null), dn(e);
      }
      function dn(e) {
        e.onreadystatechange && e.onreadystatechange.call(e);
      }
      ((y = un.prototype).open = function (e, t) {
        if (this.readyState != cn)
          throw (this.abort(), Error("Error reopening a connection"));
        (this.C = e), (this.B = t), (this.readyState = 1), dn(this);
      }),
        (y.send = function (e) {
          if (1 != this.readyState)
            throw (this.abort(), Error("need to call open() first. "));
          this.g = !0;
          const t = {
            headers: this.v,
            method: this.C,
            credentials: this.m,
            cache: void 0,
          };
          e && (t.body = e),
            (this.D || I)
              .fetch(new Request(this.B, t))
              .then(this.Wa.bind(this), this.ga.bind(this));
        }),
        (y.abort = function () {
          (this.response = this.responseText = ""),
            (this.v = new Headers()),
            (this.status = 0),
            this.j && this.j.cancel("Request was aborted.").catch(() => {}),
            1 <= this.readyState &&
              this.g &&
              4 != this.readyState &&
              ((this.g = !1), ln(this)),
            (this.readyState = cn);
        }),
        (y.Wa = function (e) {
          if (
            this.g &&
            ((this.l = e),
            this.h ||
              ((this.status = this.l.status),
              (this.statusText = this.l.statusText),
              (this.h = e.headers),
              (this.readyState = 2),
              dn(this)),
            this.g && ((this.readyState = 3), dn(this), this.g))
          )
            if ("arraybuffer" === this.responseType)
              e.arrayBuffer().then(this.Ua.bind(this), this.ga.bind(this));
            else if (void 0 !== I.ReadableStream && "body" in e) {
              if (((this.j = e.body.getReader()), this.u)) {
                if (this.responseType)
                  throw Error(
                    'responseType must be empty for "streamBinaryChunks" mode responses.'
                  );
                this.response = [];
              } else
                (this.response = this.responseText = ""),
                  (this.A = new TextDecoder());
              hn(this);
            } else e.text().then(this.Va.bind(this), this.ga.bind(this));
        }),
        (y.Ta = function (e) {
          var t;
          this.g &&
            (this.u && e.value
              ? this.response.push(e.value)
              : this.u ||
                ((t = e.value || new Uint8Array(0)),
                (t = this.A.decode(t, { stream: !e.done })) &&
                  (this.response = this.responseText += t)),
            (e.done ? ln : dn)(this),
            3 == this.readyState && hn(this));
        }),
        (y.Va = function (e) {
          this.g && ((this.response = this.responseText = e), ln(this));
        }),
        (y.Ua = function (e) {
          this.g && ((this.response = e), ln(this));
        }),
        (y.ga = function () {
          this.g && ln(this);
        }),
        (y.setRequestHeader = function (e, t) {
          this.v.append(e, t);
        }),
        (y.getResponseHeader = function (e) {
          return (this.h && this.h.get(e.toLowerCase())) || "";
        }),
        (y.getAllResponseHeaders = function () {
          if (!this.h) return "";
          const e = [],
            t = this.h.entries();
          for (var n = t.next(); !n.done; )
            (n = n.value), e.push(n[0] + ": " + n[1]), (n = t.next());
          return e.join("\r\n");
        }),
        Object.defineProperty(un.prototype, "withCredentials", {
          get: function () {
            return "include" === this.m;
          },
          set: function (e) {
            this.m = e ? "include" : "same-origin";
          },
        });
      var fn = I.JSON.parse;
      function gn(e) {
        _e.call(this),
          (this.headers = new Map()),
          (this.u = e || null),
          (this.h = !1),
          (this.C = this.g = null),
          (this.H = ""),
          (this.m = 0),
          (this.j = ""),
          (this.l = this.F = this.v = this.D = !1),
          (this.B = 0),
          (this.A = null),
          (this.J = mn),
          (this.K = this.L = !1);
      }
      N(gn, _e);
      var mn = "",
        pn = /^https?$/i,
        yn = ["POST", "PUT"];
      function vn(e, t) {
        (e.h = !1),
          e.g && ((e.l = !0), e.g.abort(), (e.l = !1)),
          (e.j = t),
          (e.m = 5),
          wn(e),
          bn(e);
      }
      function wn(e) {
        e.D || ((e.D = !0), xe(e, "complete"), xe(e, "error"));
      }
      function In(e) {
        if (e.h && void 0 !== w && (!e.C[1] || 4 != Tn(e) || 2 != e.aa()))
          if (e.v && 4 == Tn(e)) Pe(e.Ha, 0, e);
          else if ((xe(e, "readystatechange"), 4 == Tn(e))) {
            e.h = !1;
            try {
              var t,
                n,
                r,
                s,
                i = e.aa();
              e: switch (i) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                  var a = !0;
                  break e;
                default:
                  a = !1;
              }
              if (
                ((t = a) ||
                  ((n = 0 === i) &&
                    (!(s = String(e.H).match(xt)[1] || null) &&
                      I.self &&
                      I.self.location &&
                      (s = (r = I.self.location.protocol).substr(
                        0,
                        r.length - 1
                      )),
                    (n = !pn.test(s ? s.toLowerCase() : ""))),
                  (t = n)),
                t)
              )
                xe(e, "complete"), xe(e, "success");
              else {
                e.m = 6;
                try {
                  var o = 2 < Tn(e) ? e.g.statusText : "";
                } catch (e) {
                  o = "";
                }
                (e.j = o + " [" + e.aa() + "]"), wn(e);
              }
            } finally {
              bn(e);
            }
          }
      }
      function bn(e, t) {
        if (e.g) {
          En(e);
          const n = e.g,
            r = e.C[0] ? b : null;
          (e.g = null), (e.C = null), t || xe(e, "ready");
          try {
            n.onreadystatechange = r;
          } catch (e) {}
        }
      }
      function En(e) {
        e.g && e.K && (e.g.ontimeout = null),
          e.A && (I.clearTimeout(e.A), (e.A = null));
      }
      function Tn(e) {
        return e.g ? e.g.readyState : 0;
      }
      function Sn(e) {
        try {
          if (!e.g) return null;
          if ("response" in e.g) return e.g.response;
          switch (e.J) {
            case mn:
            case "text":
              return e.g.responseText;
            case "arraybuffer":
              if ("mozResponseArrayBuffer" in e.g)
                return e.g.mozResponseArrayBuffer;
          }
          return null;
        } catch (e) {
          return null;
        }
      }
      function _n(e) {
        let n = "";
        return (
          ue(e, function (e, t) {
            (n += t), (n += ":"), (n += e), (n += "\r\n");
          }),
          n
        );
      }
      function xn(e, t, n) {
        e: {
          for (r in n) {
            var r = !1;
            break e;
          }
          r = !0;
        }
        r ||
          ((n = _n(n)),
          "string" == typeof e
            ? null != n && encodeURIComponent(String(n))
            : Rt(e, t, n));
      }
      function Dn(e, t, n) {
        return (
          (n && n.internalChannelParams && n.internalChannelParams[e]) || t
        );
      }
      function An(e) {
        (this.Ca = 0),
          (this.i = []),
          (this.j = new je()),
          (this.ka =
            this.sa =
            this.F =
            this.V =
            this.g =
            this.za =
            this.D =
            this.ia =
            this.o =
            this.S =
            this.s =
              null),
          (this.ab = this.U = 0),
          (this.Za = Dn("failFast", !1, e)),
          (this.L = this.v = this.u = this.m = this.l = null),
          (this.Y = !0),
          (this.pa = this.Ba = this.T = -1),
          (this.Z = this.A = this.C = 0),
          (this.Xa = Dn("baseRetryDelayMs", 5e3, e)),
          (this.bb = Dn("retryDelaySeedMs", 1e4, e)),
          (this.$a = Dn("forwardChannelMaxRetries", 2, e)),
          (this.ta = Dn("forwardChannelRequestTimeoutMs", 2e4, e)),
          (this.ra = (e && e.xmlHttpFactory) || void 0),
          (this.Da = (e && e.Zb) || !1),
          (this.J = void 0),
          (this.H = (e && e.supportsCrossDomainXhr) || !1),
          (this.I = ""),
          (this.h = new Wt(e && e.concurrentRequestLimit)),
          (this.Fa = new sn()),
          (this.O = (e && e.fastHandshake) || !1),
          (this.N = (e && e.encodeInitMessageHeaders) || !1),
          this.O && this.N && (this.N = !1),
          (this.Ya = (e && e.Xb) || !1),
          e && e.Aa && this.j.Aa(),
          e && e.forceLongPolling && (this.Y = !1),
          (this.$ = (!this.O && this.Y && e && e.detectBufferingProxy) || !1),
          (this.ja = void 0),
          (this.P = 0),
          (this.K = !1),
          (this.la = this.B = null);
      }
      function Cn(e) {
        var t, n;
        kn(e),
          3 == e.G &&
            ((t = e.U++),
            Rt((n = At(e.F)), "SID", e.I),
            Rt(n, "RID", t),
            Rt(n, "TYPE", "terminate"),
            Mn(e, n),
            ((t = new ct(e, e.j, t, void 0)).K = 2),
            (t.v = Lt(At(n))),
            (n = !1),
            !(n =
              I.navigator && I.navigator.sendBeacon
                ? I.navigator.sendBeacon(t.v.toString(), "")
                : n) &&
              I.Image &&
              ((new Image().src = t.v), (n = !0)),
            n || ((t.g = Qn(t.l, null)), t.g.da(t.v)),
            (t.F = Date.now()),
            wt(t)),
          jn(e);
      }
      function Nn(e) {
        e.g && (Pn(e), e.g.cancel(), (e.g = null));
      }
      function kn(e) {
        Nn(e),
          e.u && (I.clearTimeout(e.u), (e.u = null)),
          Un(e),
          e.h.cancel(),
          e.m && ("number" == typeof e.m && I.clearTimeout(e.m), (e.m = null));
      }
      function Rn(e) {
        Xt(e.h) || e.m || ((e.m = !0), Re(e.Ja, e), (e.C = 0));
      }
      function Ln(e, t) {
        var n = t ? t.m : e.U++,
          r = At(e.F);
        Rt(r, "SID", e.I),
          Rt(r, "RID", n),
          Rt(r, "AID", e.T),
          Mn(e, r),
          e.o && e.s && xn(r, e.o, e.s),
          (n = new ct(e, e.j, n, e.C + 1)),
          null === e.o && (n.H = e.s),
          t && (e.i = t.D.concat(e.i)),
          (t = On(e, n, 1e3)),
          n.setTimeout(
            Math.round(0.5 * e.ta) + Math.round(0.5 * e.ta * Math.random())
          ),
          en(e.h, n),
          mt(n, r, t);
      }
      function Mn(e, n) {
        e.ia &&
          ue(e.ia, function (e, t) {
            Rt(n, t, e);
          }),
          e.l &&
            _t({}, function (e, t) {
              Rt(n, t, e);
            });
      }
      function On(e, t, r) {
        r = Math.min(e.i.length, r);
        var s = e.l ? A(e.l.Ra, e.l, e) : null;
        e: {
          var i = e.i;
          let n = -1;
          for (;;) {
            const u = ["count=" + r];
            -1 == n
              ? 0 < r
                ? ((n = i[0].h), u.push("ofs=" + n))
                : (n = 0)
              : u.push("ofs=" + n);
            let e = !0;
            for (let t = 0; t < r; t++) {
              var a = i[t].h,
                o = i[t].g;
              if ((a -= n) < 0) (n = Math.max(0, i[t].h - 100)), (e = !1);
              else
                try {
                  !(function (e, r, t) {
                    const s = t || "";
                    try {
                      _t(e, function (e, t) {
                        let n = e;
                        T(e) && (n = Ae(e)),
                          r.push(s + t + "=" + encodeURIComponent(n));
                      });
                    } catch (e) {
                      throw (
                        (r.push(s + "type=" + encodeURIComponent("_badmap")), e)
                      );
                    }
                  })(o, u, "req" + a + "_");
                } catch (e) {
                  s && s(o);
                }
            }
            if (e) {
              s = u.join("&");
              break e;
            }
          }
        }
        return (e = e.i.splice(0, r)), (t.D = e), s;
      }
      function Vn(e) {
        e.g || e.u || ((e.Z = 1), Re(e.Ia, e), (e.A = 0));
      }
      function Fn(e) {
        return (
          !(e.g || e.u || 3 <= e.A) &&
          (e.Z++, (e.u = et(A(e.Ia, e), Kn(e, e.A))), e.A++, 1)
        );
      }
      function Pn(e) {
        null != e.B && (I.clearTimeout(e.B), (e.B = null));
      }
      function Bn(e) {
        (e.g = new ct(e, e.j, "rpc", e.Z)),
          null === e.o && (e.g.H = e.s),
          (e.g.N = 0);
        var t = At(e.sa);
        Rt(t, "RID", "rpc"),
          Rt(t, "SID", e.I),
          Rt(t, "CI", e.L ? "0" : "1"),
          Rt(t, "AID", e.T),
          Rt(t, "TYPE", "xmlhttp"),
          Mn(e, t),
          e.o && e.s && xn(t, e.o, e.s),
          e.J && e.g.setTimeout(e.J);
        var n = e.g;
        (e = e.ka),
          (n.K = 1),
          (n.v = Lt(At(t))),
          (n.s = null),
          (n.P = !0),
          pt(n, e);
      }
      function Un(e) {
        null != e.v && (I.clearTimeout(e.v), (e.v = null));
      }
      function qn(e, t) {
        var n,
          r,
          s,
          i = null;
        if (e.g == t) {
          Un(e), Pn(e), (e.g = null);
          var a = 2;
        } else {
          if (!Zt(e.h, t)) return;
          (i = t.D), tn(e.h, t), (a = 1);
        }
        if (0 != e.G)
          if (((e.pa = t.Y), t.i))
            1 == a
              ? ((i = t.s ? t.s.length : 0),
                (t = Date.now() - t.F),
                (n = e.C),
                xe((a = He()), new Ze(a, i)),
                Rn(e))
              : Vn(e);
          else if (
            3 == (n = t.o) ||
            (0 == n && 0 < e.pa) ||
            ((1 != a ||
              ((s = t),
              Jt((r = e).h) >= r.h.j - (r.m ? 1 : 0) ||
                (r.m
                  ? ((r.i = s.D.concat(r.i)), 0)
                  : 1 == r.G ||
                    2 == r.G ||
                    r.C >= (r.Za ? 0 : r.$a) ||
                    ((r.m = et(A(r.Ja, r, s), Kn(r, r.C))), r.C++, 0)))) &&
              (2 != a || !Fn(e)))
          )
            switch (
              (i && 0 < i.length && ((t = e.h), (t.i = t.i.concat(i))), n)
            ) {
              case 1:
                Gn(e, 5);
                break;
              case 4:
                Gn(e, 10);
                break;
              case 3:
                Gn(e, 6);
                break;
              default:
                Gn(e, 2);
            }
      }
      function Kn(e, t) {
        let n = e.Xa + Math.floor(Math.random() * e.bb);
        return e.l || (n *= 2), n * t;
      }
      function Gn(e, t) {
        var n, r;
        e.j.info("Error code " + t),
          2 == t
            ? ((n = null),
              e.l && (n = null),
              (r = A(e.kb, e)),
              n ||
                ((n = new Dt("//www.google.com/images/cleardot.gif")),
                (I.location && "http" == I.location.protocol) || Ct(n, "https"),
                Lt(n)),
              (function (e, t) {
                var n = new je();
                if (I.Image) {
                  const r = new Image();
                  (r.onload = C(an, n, r, "TestLoadImage: loaded", !0, t)),
                    (r.onerror = C(an, n, r, "TestLoadImage: error", !1, t)),
                    (r.onabort = C(an, n, r, "TestLoadImage: abort", !1, t)),
                    (r.ontimeout = C(
                      an,
                      n,
                      r,
                      "TestLoadImage: timeout",
                      !1,
                      t
                    )),
                    I.setTimeout(function () {
                      r.ontimeout && r.ontimeout();
                    }, 1e4),
                    (r.src = e);
                } else t(!1);
              })(n.toString(), r))
            : Je(2),
          (e.G = 0),
          e.l && e.l.va(t),
          jn(e),
          kn(e);
      }
      function jn(e) {
        var t;
        (e.G = 0),
          (e.la = []),
          e.l &&
            ((0 == (t = nn(e.h)).length && 0 == e.i.length) ||
              (M(e.la, t),
              M(e.la, e.i),
              (e.h.i.length = 0),
              L(e.i),
              (e.i.length = 0)),
            e.l.ua());
      }
      function $n(e, t, n) {
        var r,
          s,
          i = n instanceof Dt ? At(n) : new Dt(n, void 0);
        return (
          "" != i.g
            ? (t && (i.g = t + "." + i.g), Nt(i, i.m))
            : ((i = (r = I.location).protocol),
              (t = t ? t + "." + r.hostname : r.hostname),
              (r = +r.port),
              (s = new Dt(null, void 0)),
              i && Ct(s, i),
              t && (s.g = t),
              r && Nt(s, r),
              n && (s.l = n),
              (i = s)),
          (n = e.D),
          (t = e.za),
          n && t && Rt(i, n, t),
          Rt(i, "VER", e.ma),
          Mn(e, i),
          i
        );
      }
      function Qn(e, t, n) {
        if (t && !e.H)
          throw Error("Can't create secondary domain capable XhrIo object.");
        return (
          (t =
            n && e.Da && !e.ra ? new gn(new on({ jb: !0 })) : new gn(e.ra)).Ka(
            e.H
          ),
          t
        );
      }
      function zn() {}
      function Hn() {
        if ($ && !(10 <= Number(te)))
          throw Error("Environmental error: no available transport.");
      }
      function Wn(e, t) {
        _e.call(this),
          (this.g = new An(t)),
          (this.l = e),
          (this.h = (t && t.messageUrlParams) || null),
          (e = (t && t.messageHeaders) || null),
          t &&
            t.clientProtocolHeaderRequired &&
            (e
              ? (e["X-Client-Protocol"] = "webchannel")
              : (e = { "X-Client-Protocol": "webchannel" })),
          (this.g.s = e),
          (e = (t && t.initMessageHeaders) || null),
          t &&
            t.messageContentType &&
            (e
              ? (e["X-WebChannel-Content-Type"] = t.messageContentType)
              : (e = { "X-WebChannel-Content-Type": t.messageContentType })),
          t &&
            t.ya &&
            (e
              ? (e["X-WebChannel-Client-Profile"] = t.ya)
              : (e = { "X-WebChannel-Client-Profile": t.ya })),
          (this.g.S = e),
          (e = t && t.Yb) && !F(e) && (this.g.o = e),
          (this.A = (t && t.supportsCrossDomainXhr) || !1),
          (this.v = (t && t.sendRawJson) || !1),
          (t = t && t.httpSessionIdParam) &&
            !F(t) &&
            ((this.g.D = t),
            null !== (e = this.h) &&
              t in e &&
              t in (e = this.h) &&
              delete e[t]),
          (this.j = new Jn(this));
      }
      function Yn(e) {
        at.call(this);
        var t = e.__sm__;
        if (t) {
          e: {
            for (const n in t) {
              e = n;
              break e;
            }
            e = void 0;
          }
          (this.i = e) &&
            ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
            (this.data = t);
        } else this.data = e;
      }
      function Xn() {
        ot.call(this), (this.status = 1);
      }
      function Jn(e) {
        this.g = e;
      }
      ((y = gn.prototype).Ka = function (e) {
        this.L = e;
      }),
        (y.da = function (e, t, n, r) {
          if (this.g)
            throw Error(
              "[goog.net.XhrIo] Object is active with another request=" +
                this.H +
                "; newUri=" +
                e
            );
          (t = t ? t.toUpperCase() : "GET"),
            (this.H = e),
            (this.j = ""),
            (this.m = 0),
            (this.D = !1),
            (this.h = !0),
            (this.g = (this.u || lt).g()),
            (this.C = this.u ? st(this.u) : st(lt)),
            (this.g.onreadystatechange = A(this.Ha, this));
          try {
            (this.F = !0), this.g.open(t, String(e), !0), (this.F = !1);
          } catch (e) {
            return void vn(this, e);
          }
          if (((e = n || ""), (n = new Map(this.headers)), r))
            if (Object.getPrototypeOf(r) === Object.prototype)
              for (var s in r) n.set(s, r[s]);
            else {
              if ("function" != typeof r.keys || "function" != typeof r.get)
                throw Error("Unknown input type for opt_headers: " + String(r));
              for (const u of r.keys()) n.set(u, r.get(u));
            }
          (r = Array.from(n.keys()).find(
            (e) => "content-type" == e.toLowerCase()
          )),
            (s = I.FormData && e instanceof I.FormData),
            0 <= R(yn, t) &&
              !r &&
              !s &&
              n.set(
                "Content-Type",
                "application/x-www-form-urlencoded;charset=utf-8"
              );
          for (var [i, a] of n) this.g.setRequestHeader(i, a);
          this.J && (this.g.responseType = this.J),
            "withCredentials" in this.g &&
              this.g.withCredentials !== this.L &&
              (this.g.withCredentials = this.L);
          try {
            En(this),
              0 < this.B &&
                ((this.K =
                  ((o = this.g),
                  $ &&
                    ee() &&
                    "number" == typeof o.timeout &&
                    void 0 !== o.ontimeout))
                  ? ((this.g.timeout = this.B),
                    (this.g.ontimeout = A(this.qa, this)))
                  : (this.A = Pe(this.qa, this.B, this))),
              (this.v = !0),
              this.g.send(e),
              (this.v = !1);
          } catch (e) {
            vn(this, e);
          }
          var o;
        }),
        (y.qa = function () {
          void 0 !== w &&
            this.g &&
            ((this.j = "Timed out after " + this.B + "ms, aborting"),
            (this.m = 8),
            xe(this, "timeout"),
            this.abort(8));
        }),
        (y.abort = function (e) {
          this.g &&
            this.h &&
            ((this.h = !1),
            (this.l = !0),
            this.g.abort(),
            (this.l = !1),
            (this.m = e || 7),
            xe(this, "complete"),
            xe(this, "abort"),
            bn(this));
        }),
        (y.M = function () {
          this.g &&
            (this.h &&
              ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
            bn(this, !0)),
            gn.X.M.call(this);
        }),
        (y.Ha = function () {
          this.s || (this.F || this.v || this.l ? In(this) : this.fb());
        }),
        (y.fb = function () {
          In(this);
        }),
        (y.aa = function () {
          try {
            return 2 < Tn(this) ? this.g.status : -1;
          } catch (e) {
            return -1;
          }
        }),
        (y.fa = function () {
          try {
            return this.g ? this.g.responseText : "";
          } catch (e) {
            return "";
          }
        }),
        (y.Sa = function (e) {
          if (this.g) {
            var t = this.g.responseText;
            return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), fn(t);
          }
        }),
        (y.Ea = function () {
          return this.m;
        }),
        (y.Oa = function () {
          return "string" == typeof this.j ? this.j : String(this.j);
        }),
        ((y = An.prototype).ma = 8),
        (y.G = 1),
        (y.Ja = function (t) {
          if (this.m)
            if (((this.m = null), 1 == this.G)) {
              if (!t) {
                (this.U = Math.floor(1e5 * Math.random())), (t = this.U++);
                const i = new ct(this, this.j, t, void 0);
                let e = this.s;
                if (
                  (this.S && (e ? ((e = ce(e)), le(e, this.S)) : (e = this.S)),
                  null !== this.o || this.N || ((i.H = e), (e = null)),
                  this.O)
                )
                  e: {
                    for (var n = 0, r = 0; r < this.i.length; r++) {
                      var s = this.i[r];
                      if (
                        ("__data__" in s.g &&
                        "string" == typeof (s = s.g.__data__)
                          ? (s = s.length)
                          : (s = void 0),
                        void 0 === s)
                      )
                        break;
                      if (4096 < (n += s)) {
                        n = r;
                        break e;
                      }
                      if (4096 === n || r === this.i.length - 1) {
                        n = r + 1;
                        break e;
                      }
                    }
                    n = 1e3;
                  }
                else n = 1e3;
                (n = On(this, i, n)),
                  Rt((r = At(this.F)), "RID", t),
                  Rt(r, "CVER", 22),
                  this.D && Rt(r, "X-HTTP-Session-Id", this.D),
                  Mn(this, r),
                  e &&
                    (this.N
                      ? (n =
                          "headers=" +
                          encodeURIComponent(String(_n(e))) +
                          "&" +
                          n)
                      : this.o && xn(r, this.o, e)),
                  en(this.h, i),
                  this.Ya && Rt(r, "TYPE", "init"),
                  this.O
                    ? (Rt(r, "$req", n),
                      Rt(r, "SID", "null"),
                      (i.Z = !0),
                      mt(i, r, null))
                    : mt(i, r, n),
                  (this.G = 2);
              }
            } else
              3 == this.G &&
                (t
                  ? Ln(this, t)
                  : 0 == this.i.length || Xt(this.h) || Ln(this));
        }),
        (y.Ia = function () {
          var e;
          (this.u = null),
            Bn(this),
            this.$ &&
              !(this.K || null == this.g || this.P <= 0) &&
              ((e = 2 * this.P),
              this.j.info("BP detection timer enabled: " + e),
              (this.B = et(A(this.eb, this), e)));
        }),
        (y.eb = function () {
          this.B &&
            ((this.B = null),
            this.j.info("BP detection timeout reached."),
            this.j.info("Buffering proxy detected and switch to long-polling!"),
            (this.L = !1),
            (this.K = !0),
            Je(10),
            Nn(this),
            Bn(this));
        }),
        (y.cb = function () {
          null != this.v && ((this.v = null), Nn(this), Fn(this), Je(19));
        }),
        (y.kb = function (e) {
          e
            ? (this.j.info("Successfully pinged google.com"), Je(2))
            : (this.j.info("Failed to ping google.com"), Je(1));
        }),
        ((y = zn.prototype).xa = function () {}),
        (y.wa = function () {}),
        (y.va = function () {}),
        (y.ua = function () {}),
        (y.Ra = function () {}),
        (Hn.prototype.g = function (e, t) {
          return new Wn(e, t);
        }),
        N(Wn, _e),
        (Wn.prototype.m = function () {
          (this.g.l = this.j), this.A && (this.g.H = !0);
          var e = this.g,
            t = this.l,
            n = this.h || void 0;
          Je(0),
            (e.V = t),
            (e.ia = n || {}),
            (e.L = e.Y),
            (e.F = $n(e, null, e.V)),
            Rn(e);
        }),
        (Wn.prototype.close = function () {
          Cn(this.g);
        }),
        (Wn.prototype.u = function (e) {
          var t,
            n = this.g;
          "string" == typeof e
            ? (((t = {}).__data__ = e), (e = t))
            : this.v && (((t = {}).__data__ = Ae(e)), (e = t)),
            n.i.push(new Ht(n.ab++, e)),
            3 == n.G && Rn(n);
        }),
        (Wn.prototype.M = function () {
          (this.g.l = null),
            delete this.j,
            Cn(this.g),
            delete this.g,
            Wn.X.M.call(this);
        }),
        N(Yn, at),
        N(Xn, ot),
        N(Jn, zn),
        (Jn.prototype.xa = function () {
          xe(this.g, "a");
        }),
        (Jn.prototype.wa = function (e) {
          xe(this.g, new Yn(e));
        }),
        (Jn.prototype.va = function (e) {
          xe(this.g, new Xn());
        }),
        (Jn.prototype.ua = function () {
          xe(this.g, "b");
        }),
        (Hn.prototype.createWebChannel = Hn.prototype.g),
        (Wn.prototype.send = Wn.prototype.u),
        (Wn.prototype.open = Wn.prototype.m),
        (tt.NO_ERROR = 0),
        (tt.TIMEOUT = 8),
        (tt.HTTP_ERROR = 6),
        (nt.COMPLETE = "complete"),
        ((it.EventType = v).OPEN = "a"),
        (v.CLOSE = "b"),
        (v.ERROR = "c"),
        (v.MESSAGE = "d"),
        (_e.prototype.listen = _e.prototype.N),
        (gn.prototype.listenOnce = gn.prototype.O),
        (gn.prototype.getLastError = gn.prototype.Oa),
        (gn.prototype.getLastErrorCode = gn.prototype.Ea),
        (gn.prototype.getStatus = gn.prototype.aa),
        (gn.prototype.getResponseJson = gn.prototype.Sa),
        (gn.prototype.getResponseText = gn.prototype.fa),
        (gn.prototype.send = gn.prototype.da),
        (gn.prototype.setWithCredentials = gn.prototype.Ka);
      var Zn,
        er = He,
        tr = tt,
        nr = nt,
        rr = Qe,
        sr = 10,
        ir = 11,
        ar = on,
        or = it,
        ur = gn;
      const cr = "@firebase/firestore";
      class hr {
        constructor(e) {
          this.uid = e;
        }
        isAuthenticated() {
          return null != this.uid;
        }
        toKey() {
          return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(e) {
          return e.uid === this.uid;
        }
      }
      (hr.UNAUTHENTICATED = new hr(null)),
        (hr.GOOGLE_CREDENTIALS = new hr("google-credentials-uid")),
        (hr.FIRST_PARTY = new hr("first-party-uid")),
        (hr.MOCK_USER = new hr("mock-user"));
      let lr = "9.14.0";
      const dr = new (class {
        constructor(e) {
          (this.name = e),
            (this._logLevel = f),
            (this._logHandler = p),
            (this._userLogHandler = null);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(e) {
          if (!(e in l))
            throw new TypeError(
              `Invalid value "${e}" assigned to \`logLevel\``
            );
          this._logLevel = e;
        }
        setLogLevel(e) {
          this._logLevel = "string" == typeof e ? d[e] : e;
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
          this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e),
            this._logHandler(this, l.DEBUG, ...e);
        }
        log(...e) {
          this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e),
            this._logHandler(this, l.VERBOSE, ...e);
        }
        info(...e) {
          this._userLogHandler && this._userLogHandler(this, l.INFO, ...e),
            this._logHandler(this, l.INFO, ...e);
        }
        warn(...e) {
          this._userLogHandler && this._userLogHandler(this, l.WARN, ...e),
            this._logHandler(this, l.WARN, ...e);
        }
        error(...e) {
          this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e),
            this._logHandler(this, l.ERROR, ...e);
        }
      })("@firebase/firestore");
      function fr() {
        return dr.logLevel;
      }
      function gr(e, ...t) {
        var n;
        dr.logLevel <= l.DEBUG &&
          ((n = t.map(yr)), dr.debug(`Firestore (${lr}): ${e}`, ...n));
      }
      function mr(e, ...t) {
        var n;
        dr.logLevel <= l.ERROR &&
          ((n = t.map(yr)), dr.error(`Firestore (${lr}): ${e}`, ...n));
      }
      function pr(e, ...t) {
        var n;
        dr.logLevel <= l.WARN &&
          ((n = t.map(yr)), dr.warn(`Firestore (${lr}): ${e}`, ...n));
      }
      function yr(t) {
        if ("string" == typeof t) return t;
        try {
          return JSON.stringify(t);
        } catch (e) {
          return t;
        }
      }
      function vr(e = "Unexpected state") {
        var t = `FIRESTORE (${lr}) INTERNAL ASSERTION FAILED: ` + e;
        throw (mr(t), new Error(t));
      }
      function wr(e) {
        e || vr();
      }
      const Ir = {
        OK: "ok",
        CANCELLED: "cancelled",
        UNKNOWN: "unknown",
        INVALID_ARGUMENT: "invalid-argument",
        DEADLINE_EXCEEDED: "deadline-exceeded",
        NOT_FOUND: "not-found",
        ALREADY_EXISTS: "already-exists",
        PERMISSION_DENIED: "permission-denied",
        UNAUTHENTICATED: "unauthenticated",
        RESOURCE_EXHAUSTED: "resource-exhausted",
        FAILED_PRECONDITION: "failed-precondition",
        ABORTED: "aborted",
        OUT_OF_RANGE: "out-of-range",
        UNIMPLEMENTED: "unimplemented",
        INTERNAL: "internal",
        UNAVAILABLE: "unavailable",
        DATA_LOSS: "data-loss",
      };
      class br extends o {
        constructor(e, t) {
          super(e, t),
            (this.code = e),
            (this.message = t),
            (this.toString = () =>
              `${this.name}: [code=${this.code}]: ${this.message}`);
        }
      }
      class Er {
        constructor() {
          this.promise = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
          });
        }
      }
      class Tr {
        constructor(e, t) {
          (this.user = t),
            (this.type = "OAuth"),
            (this.headers = new Map()),
            this.headers.set("Authorization", `Bearer ${e}`);
        }
      }
      class Sr {
        getToken() {
          return Promise.resolve(null);
        }
        invalidateToken() {}
        start(e, t) {
          e.enqueueRetryable(() => t(hr.UNAUTHENTICATED));
        }
        shutdown() {}
      }
      class _r {
        constructor(e) {
          (this.token = e), (this.changeListener = null);
        }
        getToken() {
          return Promise.resolve(this.token);
        }
        invalidateToken() {}
        start(e, t) {
          (this.changeListener = t),
            e.enqueueRetryable(() => t(this.token.user));
        }
        shutdown() {
          this.changeListener = null;
        }
      }
      class xr {
        constructor(e) {
          (this.t = e),
            (this.currentUser = hr.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null);
        }
        start(t, n) {
          let r = this.i;
          const s = (e) =>
            this.i !== r ? ((r = this.i), n(e)) : Promise.resolve();
          let i = new Er();
          this.o = () => {
            this.i++,
              (this.currentUser = this.u()),
              i.resolve(),
              (i = new Er()),
              t.enqueueRetryable(() => s(this.currentUser));
          };
          const a = () => {
              const e = i;
              t.enqueueRetryable(async () => {
                await e.promise, await s(this.currentUser);
              });
            },
            o = (e) => {
              gr("FirebaseAuthCredentialsProvider", "Auth detected"),
                (this.auth = e),
                this.auth.addAuthTokenListener(this.o),
                a();
            };
          this.t.onInit((e) => o(e)),
            setTimeout(() => {
              var e;
              this.auth ||
                ((e = this.t.getImmediate({ optional: !0 }))
                  ? o(e)
                  : (gr(
                      "FirebaseAuthCredentialsProvider",
                      "Auth not yet detected"
                    ),
                    i.resolve(),
                    (i = new Er())));
            }, 0),
            a();
        }
        getToken() {
          const t = this.i,
            e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.auth
              ? this.auth
                  .getToken(e)
                  .then((e) =>
                    this.i !== t
                      ? (gr(
                          "FirebaseAuthCredentialsProvider",
                          "getToken aborted due to token change."
                        ),
                        this.getToken())
                      : e
                      ? (wr("string" == typeof e.accessToken),
                        new Tr(e.accessToken, this.currentUser))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.auth && this.auth.removeAuthTokenListener(this.o);
        }
        u() {
          var e = this.auth && this.auth.getUid();
          return wr(null === e || "string" == typeof e), new hr(e);
        }
      }
      class Dr {
        constructor(e, t, n, r) {
          (this.h = e),
            (this.l = t),
            (this.m = n),
            (this.g = r),
            (this.type = "FirstParty"),
            (this.user = hr.FIRST_PARTY),
            (this.p = new Map());
        }
        I() {
          return this.g
            ? this.g()
            : (wr(
                !(
                  "object" != typeof this.h ||
                  null === this.h ||
                  !this.h.auth ||
                  !this.h.auth.getAuthHeaderValueForFirstParty
                )
              ),
              this.h.auth.getAuthHeaderValueForFirstParty([]));
        }
        get headers() {
          this.p.set("X-Goog-AuthUser", this.l);
          var e = this.I();
          return (
            e && this.p.set("Authorization", e),
            this.m && this.p.set("X-Goog-Iam-Authorization-Token", this.m),
            this.p
          );
        }
      }
      class Ar {
        constructor(e, t, n, r) {
          (this.h = e), (this.l = t), (this.m = n), (this.g = r);
        }
        getToken() {
          return Promise.resolve(new Dr(this.h, this.l, this.m, this.g));
        }
        start(e, t) {
          e.enqueueRetryable(() => t(hr.FIRST_PARTY));
        }
        shutdown() {}
        invalidateToken() {}
      }
      class Cr {
        constructor(e) {
          (this.value = e),
            (this.type = "AppCheck"),
            (this.headers = new Map()),
            e &&
              0 < e.length &&
              this.headers.set("x-firebase-appcheck", this.value);
        }
      }
      class Nr {
        constructor(e) {
          (this.T = e),
            (this.forceRefresh = !1),
            (this.appCheck = null),
            (this.A = null);
        }
        start(t, n) {
          const r = (e) => {
            null != e.error &&
              gr(
                "FirebaseAppCheckTokenProvider",
                `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`
              );
            var t = e.token !== this.A;
            return (
              (this.A = e.token),
              gr(
                "FirebaseAppCheckTokenProvider",
                `Received ${t ? "new" : "existing"} token.`
              ),
              t ? n(e.token) : Promise.resolve()
            );
          };
          this.o = (e) => {
            t.enqueueRetryable(() => r(e));
          };
          const s = (e) => {
            gr("FirebaseAppCheckTokenProvider", "AppCheck detected"),
              (this.appCheck = e),
              this.appCheck.addTokenListener(this.o);
          };
          this.T.onInit((e) => s(e)),
            setTimeout(() => {
              var e;
              this.appCheck ||
                ((e = this.T.getImmediate({ optional: !0 }))
                  ? s(e)
                  : gr(
                      "FirebaseAppCheckTokenProvider",
                      "AppCheck not yet detected"
                    ));
            }, 0);
        }
        getToken() {
          var e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.appCheck
              ? this.appCheck
                  .getToken(e)
                  .then((e) =>
                    e
                      ? (wr("string" == typeof e.token),
                        (this.A = e.token),
                        new Cr(e.token))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.appCheck && this.appCheck.removeTokenListener(this.o);
        }
      }
      class kr {
        static R() {
          var t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            n = Math.floor(256 / t.length) * t.length;
          let r = "";
          for (; r.length < 20; ) {
            var s = (function (t) {
              const n =
                  "undefined" != typeof self && (self.crypto || self.msCrypto),
                r = new Uint8Array(t);
              if (n && "function" == typeof n.getRandomValues)
                n.getRandomValues(r);
              else
                for (let e = 0; e < t; e++)
                  r[e] = Math.floor(256 * Math.random());
              return r;
            })(40);
            for (let e = 0; e < s.length; ++e)
              r.length < 20 && s[e] < n && (r += t.charAt(s[e] % t.length));
          }
          return r;
        }
      }
      function Rr(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      function Lr(e, n, r) {
        return e.length === n.length && e.every((e, t) => r(e, n[t]));
      }
      function Mr(e) {
        return e + "\0";
      }
      class Or {
        constructor(e, t) {
          if (((this.seconds = e), (this.nanoseconds = t) < 0))
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (1e9 <= t)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (e < -62135596800)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
          if (253402300800 <= e)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
        }
        static now() {
          return Or.fromMillis(Date.now());
        }
        static fromDate(e) {
          return Or.fromMillis(e.getTime());
        }
        static fromMillis(e) {
          var t = Math.floor(e / 1e3),
            n = Math.floor(1e6 * (e - 1e3 * t));
          return new Or(t, n);
        }
        toDate() {
          return new Date(this.toMillis());
        }
        toMillis() {
          return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        _compareTo(e) {
          return this.seconds === e.seconds
            ? Rr(this.nanoseconds, e.nanoseconds)
            : Rr(this.seconds, e.seconds);
        }
        isEqual(e) {
          return (
            e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
          );
        }
        toString() {
          return (
            "Timestamp(seconds=" +
            this.seconds +
            ", nanoseconds=" +
            this.nanoseconds +
            ")"
          );
        }
        toJSON() {
          return { seconds: this.seconds, nanoseconds: this.nanoseconds };
        }
        valueOf() {
          var e = this.seconds - -62135596800;
          return (
            String(e).padStart(12, "0") +
            "." +
            String(this.nanoseconds).padStart(9, "0")
          );
        }
      }
      class Vr {
        constructor(e) {
          this.timestamp = e;
        }
        static fromTimestamp(e) {
          return new Vr(e);
        }
        static min() {
          return new Vr(new Or(0, 0));
        }
        static max() {
          return new Vr(new Or(253402300799, 999999999));
        }
        compareTo(e) {
          return this.timestamp._compareTo(e.timestamp);
        }
        isEqual(e) {
          return this.timestamp.isEqual(e.timestamp);
        }
        toMicroseconds() {
          return (
            1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
          );
        }
        toString() {
          return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        toTimestamp() {
          return this.timestamp;
        }
      }
      class Fr {
        constructor(e, t, n) {
          void 0 === t ? (t = 0) : t > e.length && vr(),
            void 0 === n ? (n = e.length - t) : n > e.length - t && vr(),
            (this.segments = e),
            (this.offset = t),
            (this.len = n);
        }
        get length() {
          return this.len;
        }
        isEqual(e) {
          return 0 === Fr.comparator(this, e);
        }
        child(e) {
          const t = this.segments.slice(this.offset, this.limit());
          return (
            e instanceof Fr
              ? e.forEach((e) => {
                  t.push(e);
                })
              : t.push(e),
            this.construct(t)
          );
        }
        limit() {
          return this.offset + this.length;
        }
        popFirst(e) {
          return this.construct(
            this.segments,
            this.offset + (e = void 0 === e ? 1 : e),
            this.length - e
          );
        }
        popLast() {
          return this.construct(this.segments, this.offset, this.length - 1);
        }
        firstSegment() {
          return this.segments[this.offset];
        }
        lastSegment() {
          return this.get(this.length - 1);
        }
        get(e) {
          return this.segments[this.offset + e];
        }
        isEmpty() {
          return 0 === this.length;
        }
        isPrefixOf(e) {
          if (e.length < this.length) return !1;
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1;
          return !0;
        }
        isImmediateParentOf(e) {
          if (this.length + 1 !== e.length) return !1;
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1;
          return !0;
        }
        forEach(e) {
          for (let t = this.offset, n = this.limit(); t < n; t++)
            e(this.segments[t]);
        }
        toArray() {
          return this.segments.slice(this.offset, this.limit());
        }
        static comparator(e, t) {
          const n = Math.min(e.length, t.length);
          for (let r = 0; r < n; r++) {
            const n = e.get(r),
              s = t.get(r);
            if (n < s) return -1;
            if (n > s) return 1;
          }
          return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
        }
      }
      class Pr extends Fr {
        construct(e, t, n) {
          return new Pr(e, t, n);
        }
        canonicalString() {
          return this.toArray().join("/");
        }
        toString() {
          return this.canonicalString();
        }
        static fromString(...e) {
          const t = [];
          for (const n of e) {
            if (0 <= n.indexOf("//"))
              throw new br(
                Ir.INVALID_ARGUMENT,
                `Invalid segment (${n}). Paths must not contain // in them.`
              );
            t.push(...n.split("/").filter((e) => 0 < e.length));
          }
          return new Pr(t);
        }
        static emptyPath() {
          return new Pr([]);
        }
      }
      const Br = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      class Ur extends Fr {
        construct(e, t, n) {
          return new Ur(e, t, n);
        }
        static isValidIdentifier(e) {
          return Br.test(e);
        }
        canonicalString() {
          return this.toArray()
            .map(
              (e) => (
                (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
                (e = !Ur.isValidIdentifier(e) ? "`" + e + "`" : e)
              )
            )
            .join(".");
        }
        toString() {
          return this.canonicalString();
        }
        isKeyField() {
          return 1 === this.length && "__name__" === this.get(0);
        }
        static keyField() {
          return new Ur(["__name__"]);
        }
        static fromServerFormat(e) {
          const t = [];
          let n = "",
            r = 0;
          var s = () => {
            if (0 === n.length)
              throw new br(
                Ir.INVALID_ARGUMENT,
                `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
              );
            t.push(n), (n = "");
          };
          let i = !1;
          for (; r < e.length; ) {
            const t = e[r];
            if ("\\" === t) {
              if (r + 1 === e.length)
                throw new br(
                  Ir.INVALID_ARGUMENT,
                  "Path has trailing escape character: " + e
                );
              const t = e[r + 1];
              if ("\\" !== t && "." !== t && "`" !== t)
                throw new br(
                  Ir.INVALID_ARGUMENT,
                  "Path has invalid escape sequence: " + e
                );
              (n += t), (r += 2);
            } else "`" === t ? (i = !i) : "." !== t || i ? (n += t) : s(), r++;
          }
          if ((s(), i))
            throw new br(Ir.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
          return new Ur(t);
        }
        static emptyPath() {
          return new Ur([]);
        }
      }
      class qr {
        constructor(e) {
          this.path = e;
        }
        static fromPath(e) {
          return new qr(Pr.fromString(e));
        }
        static fromName(e) {
          return new qr(Pr.fromString(e).popFirst(5));
        }
        static empty() {
          return new qr(Pr.emptyPath());
        }
        get collectionGroup() {
          return this.path.popLast().lastSegment();
        }
        hasCollectionId(e) {
          return (
            2 <= this.path.length && this.path.get(this.path.length - 2) === e
          );
        }
        getCollectionGroup() {
          return this.path.get(this.path.length - 2);
        }
        getCollectionPath() {
          return this.path.popLast();
        }
        isEqual(e) {
          return null !== e && 0 === Pr.comparator(this.path, e.path);
        }
        toString() {
          return this.path.toString();
        }
        static comparator(e, t) {
          return Pr.comparator(e.path, t.path);
        }
        static isDocumentKey(e) {
          return e.length % 2 == 0;
        }
        static fromSegments(e) {
          return new qr(new Pr(e.slice()));
        }
      }
      class Kr {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.collectionGroup = t),
            (this.fields = n),
            (this.indexState = r);
        }
      }
      function Gr(e) {
        return e.fields.find((e) => 2 === e.kind);
      }
      function jr(e) {
        return e.fields.filter((e) => 2 !== e.kind);
      }
      Kr.UNKNOWN_ID = -1;
      class $r {
        constructor(e, t) {
          (this.fieldPath = e), (this.kind = t);
        }
      }
      class Qr {
        constructor(e, t) {
          (this.sequenceNumber = e), (this.offset = t);
        }
        static empty() {
          return new Qr(0, Wr.min());
        }
      }
      function zr(e, t) {
        var n = e.toTimestamp().seconds,
          r = e.toTimestamp().nanoseconds + 1,
          r = Vr.fromTimestamp(1e9 === r ? new Or(n + 1, 0) : new Or(n, r));
        return new Wr(r, qr.empty(), t);
      }
      function Hr(e) {
        return new Wr(e.readTime, e.key, -1);
      }
      class Wr {
        constructor(e, t, n) {
          (this.readTime = e),
            (this.documentKey = t),
            (this.largestBatchId = n);
        }
        static min() {
          return new Wr(Vr.min(), qr.empty(), -1);
        }
        static max() {
          return new Wr(Vr.max(), qr.empty(), -1);
        }
      }
      function Yr(e, t) {
        let n = e.readTime.compareTo(t.readTime);
        return 0 !== n
          ? n
          : ((n = qr.comparator(e.documentKey, t.documentKey)),
            0 !== n ? n : Rr(e.largestBatchId, t.largestBatchId));
      }
      const Xr =
        "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
      class Jr {
        constructor() {
          this.onCommittedListeners = [];
        }
        addOnCommittedListener(e) {
          this.onCommittedListeners.push(e);
        }
        raiseOnCommittedEvent() {
          this.onCommittedListeners.forEach((e) => e());
        }
      }
      async function Zr(e) {
        if (e.code !== Ir.FAILED_PRECONDITION || e.message !== Xr) throw e;
        gr("LocalStore", "Unexpectedly lost primary lease");
      }
      class es {
        constructor(e) {
          (this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            e(
              (e) => {
                (this.isDone = !0),
                  (this.result = e),
                  this.nextCallback && this.nextCallback(e);
              },
              (e) => {
                (this.isDone = !0),
                  (this.error = e),
                  this.catchCallback && this.catchCallback(e);
              }
            );
        }
        catch(e) {
          return this.next(void 0, e);
        }
        next(r, s) {
          return (
            this.callbackAttached && vr(),
            (this.callbackAttached = !0),
            this.isDone
              ? this.error
                ? this.wrapFailure(s, this.error)
                : this.wrapSuccess(r, this.result)
              : new es((t, n) => {
                  (this.nextCallback = (e) => {
                    this.wrapSuccess(r, e).next(t, n);
                  }),
                    (this.catchCallback = (e) => {
                      this.wrapFailure(s, e).next(t, n);
                    });
                })
          );
        }
        toPromise() {
          return new Promise((e, t) => {
            this.next(e, t);
          });
        }
        wrapUserFunction(e) {
          try {
            var t = e();
            return t instanceof es ? t : es.resolve(t);
          } catch (e) {
            return es.reject(e);
          }
        }
        wrapSuccess(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : es.resolve(t);
        }
        wrapFailure(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : es.reject(t);
        }
        static resolve(n) {
          return new es((e, t) => {
            e(n);
          });
        }
        static reject(n) {
          return new es((e, t) => {
            t(n);
          });
        }
        static waitFor(e) {
          return new es((t, n) => {
            let r = 0,
              s = 0,
              i = !1;
            e.forEach((e) => {
              ++r,
                e.next(
                  () => {
                    ++s, i && s === r && t();
                  },
                  (e) => n(e)
                );
            }),
              (i = !0),
              s === r && t();
          });
        }
        static or(e) {
          let t = es.resolve(!1);
          for (const n of e) t = t.next((e) => (e ? es.resolve(e) : n()));
          return t;
        }
        static forEach(e, n) {
          const r = [];
          return (
            e.forEach((e, t) => {
              r.push(n.call(this, e, t));
            }),
            this.waitFor(r)
          );
        }
        static mapArray(o, u) {
          return new es((t, n) => {
            const r = o.length,
              s = new Array(r);
            let i = 0;
            for (let e = 0; e < r; e++) {
              const a = e;
              u(o[a]).next(
                (e) => {
                  (s[a] = e), ++i, i === r && t(s);
                },
                (e) => n(e)
              );
            }
          });
        }
        static doWhile(r, s) {
          return new es((e, t) => {
            const n = () => {
              !0 === r()
                ? s().next(() => {
                    n();
                  }, t)
                : e();
            };
            n();
          });
        }
      }
      class ts {
        constructor(n, e) {
          (this.action = n),
            (this.transaction = e),
            (this.aborted = !1),
            (this.P = new Er()),
            (this.transaction.oncomplete = () => {
              this.P.resolve();
            }),
            (this.transaction.onabort = () => {
              e.error ? this.P.reject(new ss(n, e.error)) : this.P.resolve();
            }),
            (this.transaction.onerror = (e) => {
              var t = cs(e.target.error);
              this.P.reject(new ss(n, t));
            });
        }
        static open(e, t, n, r) {
          try {
            return new ts(t, e.transaction(r, n));
          } catch (e) {
            throw new ss(t, e);
          }
        }
        get v() {
          return this.P.promise;
        }
        abort(e) {
          e && this.P.reject(e),
            this.aborted ||
              (gr(
                "SimpleDb",
                "Aborting transaction:",
                e ? e.message : "Client-initiated abort"
              ),
              (this.aborted = !0),
              this.transaction.abort());
        }
        V() {
          const e = this.transaction;
          this.aborted || "function" != typeof e.commit || e.commit();
        }
        store(e) {
          var t = this.transaction.objectStore(e);
          return new as(t);
        }
      }
      class ns {
        constructor(e, t, n) {
          (this.name = e),
            (this.version = t),
            (this.S = n),
            12.2 === ns.D(i()) &&
              mr(
                "Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
              );
        }
        static delete(e) {
          return (
            gr("SimpleDb", "Removing database:", e),
            os(window.indexedDB.deleteDatabase(e)).toPromise()
          );
        }
        static C() {
          if ("object" != typeof indexedDB) return !1;
          if (ns.N()) return !0;
          const e = i(),
            t = ns.D(e),
            n = 0 < t && t < 10,
            r = ns.k(e),
            s = 0 < r && r < 4.5;
          return !(
            0 < e.indexOf("MSIE ") ||
            0 < e.indexOf("Trident/") ||
            0 < e.indexOf("Edge/") ||
            n ||
            s
          );
        }
        static N() {
          var e;
          return (
            "undefined" != typeof process &&
            "YES" ===
              (null === (e = process.env) || void 0 === e ? void 0 : e.O)
          );
        }
        static M(e, t) {
          return e.store(t);
        }
        static D(e) {
          const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
            n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        static k(e) {
          const t = e.match(/Android ([\d.]+)/i),
            n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        async F(i) {
          return (
            this.db ||
              (gr("SimpleDb", "Opening database:", this.name),
              (this.db = await new Promise((n, r) => {
                const s = indexedDB.open(this.name, this.version);
                (s.onsuccess = (e) => {
                  var t = e.target.result;
                  n(t);
                }),
                  (s.onblocked = () => {
                    r(
                      new ss(
                        i,
                        "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."
                      )
                    );
                  }),
                  (s.onerror = (e) => {
                    var t = e.target.error;
                    "VersionError" === t.name
                      ? r(
                          new br(
                            Ir.FAILED_PRECONDITION,
                            "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."
                          )
                        )
                      : "InvalidStateError" === t.name
                      ? r(
                          new br(
                            Ir.FAILED_PRECONDITION,
                            "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " +
                              t
                          )
                        )
                      : r(new ss(i, t));
                  }),
                  (s.onupgradeneeded = (e) => {
                    gr(
                      "SimpleDb",
                      'Database "' +
                        this.name +
                        '" requires upgrade from version:',
                      e.oldVersion
                    );
                    var t = e.target.result;
                    this.S.$(t, s.transaction, e.oldVersion, this.version).next(
                      () => {
                        gr(
                          "SimpleDb",
                          "Database upgrade to version " +
                            this.version +
                            " complete"
                        );
                      }
                    );
                  });
              }))),
            this.B && (this.db.onversionchange = (e) => this.B(e)),
            this.db
          );
        }
        L(t) {
          (this.B = t), this.db && (this.db.onversionchange = (e) => t(e));
        }
        async runTransaction(e, t, n, r) {
          var s = "readonly" === t;
          let i = 0;
          for (;;) {
            ++i;
            try {
              this.db = await this.F(e);
              const t = ts.open(this.db, e, s ? "readonly" : "readwrite", n),
                i = r(t)
                  .next((e) => (t.V(), e))
                  .catch((e) => (t.abort(e), es.reject(e)))
                  .toPromise();
              return i.catch(() => {}), await t.v, i;
            } catch (e) {
              const t = e,
                n = "FirebaseError" !== t.name && i < 3;
              if (
                (gr(
                  "SimpleDb",
                  "Transaction failed with error:",
                  t.message,
                  "Retrying:",
                  n
                ),
                this.close(),
                !n)
              )
                return Promise.reject(t);
            }
          }
        }
        close() {
          this.db && this.db.close(), (this.db = void 0);
        }
      }
      class rs {
        constructor(e) {
          (this.U = e), (this.q = !1), (this.K = null);
        }
        get isDone() {
          return this.q;
        }
        get G() {
          return this.K;
        }
        set cursor(e) {
          this.U = e;
        }
        done() {
          this.q = !0;
        }
        j(e) {
          this.K = e;
        }
        delete() {
          return os(this.U.delete());
        }
      }
      class ss extends br {
        constructor(e, t) {
          super(Ir.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${t}`),
            (this.name = "IndexedDbTransactionError");
        }
      }
      function is(e) {
        return "IndexedDbTransactionError" === e.name;
      }
      class as {
        constructor(e) {
          this.store = e;
        }
        put(e, t) {
          let n;
          return (
            (n =
              void 0 !== t
                ? (gr("SimpleDb", "PUT", this.store.name, e, t),
                  this.store.put(t, e))
                : (gr("SimpleDb", "PUT", this.store.name, "<auto-key>", e),
                  this.store.put(e))),
            os(n)
          );
        }
        add(e) {
          return (
            gr("SimpleDb", "ADD", this.store.name, e, e), os(this.store.add(e))
          );
        }
        get(t) {
          return os(this.store.get(t)).next(
            (e) => (
              gr(
                "SimpleDb",
                "GET",
                this.store.name,
                t,
                (e = void 0 === e ? null : e)
              ),
              e
            )
          );
        }
        delete(e) {
          return (
            gr("SimpleDb", "DELETE", this.store.name, e),
            os(this.store.delete(e))
          );
        }
        count() {
          return (
            gr("SimpleDb", "COUNT", this.store.name), os(this.store.count())
          );
        }
        W(e, n) {
          var t = this.options(e, n);
          if (t.index || "function" != typeof this.store.getAll) {
            const e = this.cursor(t),
              n = [];
            return this.H(e, (e, t) => {
              n.push(t);
            }).next(() => n);
          }
          {
            const e = this.store.getAll(t.range);
            return new es((t, n) => {
              (e.onerror = (e) => {
                n(e.target.error);
              }),
                (e.onsuccess = (e) => {
                  t(e.target.result);
                });
            });
          }
        }
        J(e, t) {
          const r = this.store.getAll(e, null === t ? void 0 : t);
          return new es((t, n) => {
            (r.onerror = (e) => {
              n(e.target.error);
            }),
              (r.onsuccess = (e) => {
                t(e.target.result);
              });
          });
        }
        Y(e, t) {
          gr("SimpleDb", "DELETE ALL", this.store.name);
          const n = this.options(e, t);
          n.X = !1;
          var r = this.cursor(n);
          return this.H(r, (e, t, n) => n.delete());
        }
        Z(e, t) {
          let n;
          t ? (n = e) : ((n = {}), (t = e));
          var r = this.cursor(n);
          return this.H(r, t);
        }
        tt(s) {
          const e = this.cursor({});
          return new es((n, r) => {
            (e.onerror = (e) => {
              var t = cs(e.target.error);
              r(t);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                t
                  ? s(t.primaryKey, t.value).next((e) => {
                      e ? t.continue() : n();
                    })
                  : n();
              });
          });
        }
        H(e, i) {
          const a = [];
          return new es((s, t) => {
            (e.onerror = (e) => {
              t(e.target.error);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                if (t) {
                  const n = new rs(t),
                    r = i(t.primaryKey, t.value, n);
                  if (r instanceof es) {
                    const e = r.catch((e) => (n.done(), es.reject(e)));
                    a.push(e);
                  }
                  n.isDone
                    ? s()
                    : null === n.G
                    ? t.continue()
                    : t.continue(n.G);
                } else s();
              });
          }).next(() => es.waitFor(a));
        }
        options(e, t) {
          let n;
          return (
            void 0 !== e && ("string" == typeof e ? (n = e) : (t = e)),
            { index: n, range: t }
          );
        }
        cursor(e) {
          let t = "next";
          if ((e.reverse && (t = "prev"), e.index)) {
            const n = this.store.index(e.index);
            return e.X ? n.openKeyCursor(e.range, t) : n.openCursor(e.range, t);
          }
          return this.store.openCursor(e.range, t);
        }
      }
      function os(e) {
        return new es((n, r) => {
          (e.onsuccess = (e) => {
            var t = e.target.result;
            n(t);
          }),
            (e.onerror = (e) => {
              var t = cs(e.target.error);
              r(t);
            });
        });
      }
      let us = !1;
      function cs(e) {
        const t = ns.D(i());
        if (12.2 <= t && t < 13) {
          const t =
            "An internal error was encountered in the Indexed Database server";
          if (0 <= e.message.indexOf(t)) {
            const e = new br(
              "internal",
              `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
            );
            return (
              us ||
                ((us = !0),
                setTimeout(() => {
                  throw e;
                }, 0)),
              e
            );
          }
        }
        return e;
      }
      class hs {
        constructor(e, t) {
          (this.asyncQueue = e), (this.et = t), (this.task = null);
        }
        start() {
          this.nt(15e3);
        }
        stop() {
          this.task && (this.task.cancel(), (this.task = null));
        }
        get started() {
          return null !== this.task;
        }
        nt(e) {
          gr("IndexBackiller", `Scheduled in ${e}ms`),
            (this.task = this.asyncQueue.enqueueAfterDelay(
              "index_backfill",
              e,
              async () => {
                this.task = null;
                try {
                  gr(
                    "IndexBackiller",
                    `Documents written: ${await this.et.st()}`
                  );
                } catch (e) {
                  is(e)
                    ? gr(
                        "IndexBackiller",
                        "Ignoring IndexedDB error during index backfill: ",
                        e
                      )
                    : await Zr(e);
                }
                await this.nt(6e4);
              }
            ));
        }
      }
      class ls {
        constructor(e, t) {
          (this.localStore = e), (this.persistence = t);
        }
        async st(t = 50) {
          return this.persistence.runTransaction(
            "Backfill Indexes",
            "readwrite-primary",
            (e) => this.it(e, t)
          );
        }
        it(e, t) {
          const n = new Set();
          let r = t,
            s = !0;
          return es
            .doWhile(
              () => !0 === s && 0 < r,
              () =>
                this.localStore.indexManager
                  .getNextCollectionGroupToUpdate(e)
                  .next((t) =>
                    null === t || n.has(t)
                      ? void (s = !1)
                      : (gr("IndexBackiller", `Processing collection: ${t}`),
                        this.rt(e, t, r).next((e) => {
                          (r -= e), n.add(t);
                        }))
                  )
            )
            .next(() => t - r);
        }
        rt(r, s, e) {
          return this.localStore.indexManager
            .getMinOffsetFromCollectionGroup(r, s)
            .next((n) =>
              this.localStore.localDocuments
                .getNextDocuments(r, s, n, e)
                .next((e) => {
                  const t = e.changes;
                  return this.localStore.indexManager
                    .updateIndexEntries(r, t)
                    .next(() => this.ot(n, e))
                    .next(
                      (e) => (
                        gr("IndexBackiller", `Updating offset: ${e}`),
                        this.localStore.indexManager.updateCollectionGroup(
                          r,
                          s,
                          e
                        )
                      )
                    )
                    .next(() => t.size);
                })
            );
        }
        ot(e, t) {
          let r = e;
          return (
            t.changes.forEach((e, t) => {
              var n = Hr(t);
              0 < Yr(n, r) && (r = n);
            }),
            new Wr(
              r.readTime,
              r.documentKey,
              Math.max(t.batchId, e.largestBatchId)
            )
          );
        }
      }
      class ds {
        constructor(e, t) {
          (this.previousValue = e),
            t &&
              ((t.sequenceNumberHandler = (e) => this.ut(e)),
              (this.ct = (e) => t.writeSequenceNumber(e)));
        }
        ut(e) {
          return (
            (this.previousValue = Math.max(e, this.previousValue)),
            this.previousValue
          );
        }
        next() {
          var e = ++this.previousValue;
          return this.ct && this.ct(e), e;
        }
      }
      function fs(e) {
        let t = 0;
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
        return t;
      }
      function gs(e, t) {
        for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
      }
      function ms(e) {
        for (const t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      ds.at = -1;
      class ps {
        constructor(e, t) {
          (this.comparator = e), (this.root = t || vs.EMPTY);
        }
        insert(e, t) {
          return new ps(
            this.comparator,
            this.root
              .insert(e, t, this.comparator)
              .copy(null, null, vs.BLACK, null, null)
          );
        }
        remove(e) {
          return new ps(
            this.comparator,
            this.root
              .remove(e, this.comparator)
              .copy(null, null, vs.BLACK, null, null)
          );
        }
        get(e) {
          let t = this.root;
          for (; !t.isEmpty(); ) {
            var n = this.comparator(e, t.key);
            if (0 === n) return t.value;
            n < 0 ? (t = t.left) : 0 < n && (t = t.right);
          }
          return null;
        }
        indexOf(e) {
          let t = 0,
            n = this.root;
          for (; !n.isEmpty(); ) {
            var r = this.comparator(e, n.key);
            if (0 === r) return t + n.left.size;
            n = r < 0 ? n.left : ((t += n.left.size + 1), n.right);
          }
          return -1;
        }
        isEmpty() {
          return this.root.isEmpty();
        }
        get size() {
          return this.root.size;
        }
        minKey() {
          return this.root.minKey();
        }
        maxKey() {
          return this.root.maxKey();
        }
        inorderTraversal(e) {
          return this.root.inorderTraversal(e);
        }
        forEach(n) {
          this.inorderTraversal((e, t) => (n(e, t), !1));
        }
        toString() {
          const n = [];
          return (
            this.inorderTraversal((e, t) => (n.push(`${e}:${t}`), !1)),
            `{${n.join(", ")}}`
          );
        }
        reverseTraversal(e) {
          return this.root.reverseTraversal(e);
        }
        getIterator() {
          return new ys(this.root, null, this.comparator, !1);
        }
        getIteratorFrom(e) {
          return new ys(this.root, e, this.comparator, !1);
        }
        getReverseIterator() {
          return new ys(this.root, null, this.comparator, !0);
        }
        getReverseIteratorFrom(e) {
          return new ys(this.root, e, this.comparator, !0);
        }
      }
      class ys {
        constructor(e, t, n, r) {
          (this.isReverse = r), (this.nodeStack = []);
          let s = 1;
          for (; !e.isEmpty(); )
            if (((s = t ? n(e.key, t) : 1), t && r && (s *= -1), s < 0))
              e = this.isReverse ? e.left : e.right;
            else {
              if (0 === s) {
                this.nodeStack.push(e);
                break;
              }
              this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
            }
        }
        getNext() {
          let e = this.nodeStack.pop();
          var t = { key: e.key, value: e.value };
          if (this.isReverse)
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.right);
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.left);
          return t;
        }
        hasNext() {
          return 0 < this.nodeStack.length;
        }
        peek() {
          if (0 === this.nodeStack.length) return null;
          var e = this.nodeStack[this.nodeStack.length - 1];
          return { key: e.key, value: e.value };
        }
      }
      class vs {
        constructor(e, t, n, r, s) {
          (this.key = e),
            (this.value = t),
            (this.color = null != n ? n : vs.RED),
            (this.left = null != r ? r : vs.EMPTY),
            (this.right = null != s ? s : vs.EMPTY),
            (this.size = this.left.size + 1 + this.right.size);
        }
        copy(e, t, n, r, s) {
          return new vs(
            null != e ? e : this.key,
            null != t ? t : this.value,
            null != n ? n : this.color,
            null != r ? r : this.left,
            null != s ? s : this.right
          );
        }
        isEmpty() {
          return !1;
        }
        inorderTraversal(e) {
          return (
            this.left.inorderTraversal(e) ||
            e(this.key, this.value) ||
            this.right.inorderTraversal(e)
          );
        }
        reverseTraversal(e) {
          return (
            this.right.reverseTraversal(e) ||
            e(this.key, this.value) ||
            this.left.reverseTraversal(e)
          );
        }
        min() {
          return this.left.isEmpty() ? this : this.left.min();
        }
        minKey() {
          return this.min().key;
        }
        maxKey() {
          return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        insert(e, t, n) {
          let r = this;
          var s = n(e, r.key);
          return (
            (r =
              s < 0
                ? r.copy(null, null, null, r.left.insert(e, t, n), null)
                : 0 === s
                ? r.copy(null, t, null, null, null)
                : r.copy(null, null, null, null, r.right.insert(e, t, n))),
            r.fixUp()
          );
        }
        removeMin() {
          if (this.left.isEmpty()) return vs.EMPTY;
          let e = this;
          return (
            e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
            (e = e.copy(null, null, null, e.left.removeMin(), null)),
            e.fixUp()
          );
        }
        remove(e, t) {
          let n,
            r = this;
          if (t(e, r.key) < 0)
            r.left.isEmpty() ||
              r.left.isRed() ||
              r.left.left.isRed() ||
              (r = r.moveRedLeft()),
              (r = r.copy(null, null, null, r.left.remove(e, t), null));
          else {
            if (
              (r.left.isRed() && (r = r.rotateRight()),
              r.right.isEmpty() ||
                r.right.isRed() ||
                r.right.left.isRed() ||
                (r = r.moveRedRight()),
              0 === t(e, r.key))
            ) {
              if (r.right.isEmpty()) return vs.EMPTY;
              (n = r.right.min()),
                (r = r.copy(n.key, n.value, null, null, r.right.removeMin()));
            }
            r = r.copy(null, null, null, null, r.right.remove(e, t));
          }
          return r.fixUp();
        }
        isRed() {
          return this.color;
        }
        fixUp() {
          let e = this;
          return (
            e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
            e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
            e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
            e
          );
        }
        moveRedLeft() {
          let e = this.colorFlip();
          return (
            e.right.left.isRed() &&
              ((e = e.copy(null, null, null, null, e.right.rotateRight())),
              (e = e.rotateLeft()),
              (e = e.colorFlip())),
            e
          );
        }
        moveRedRight() {
          let e = this.colorFlip();
          return (
            e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())),
            e
          );
        }
        rotateLeft() {
          var e = this.copy(null, null, vs.RED, null, this.right.left);
          return this.right.copy(null, null, this.color, e, null);
        }
        rotateRight() {
          var e = this.copy(null, null, vs.RED, this.left.right, null);
          return this.left.copy(null, null, this.color, null, e);
        }
        colorFlip() {
          var e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
          return this.copy(null, null, !this.color, e, t);
        }
        checkMaxDepth() {
          var e = this.check();
          return Math.pow(2, e) <= this.size + 1;
        }
        check() {
          if (this.isRed() && this.left.isRed()) throw vr();
          if (this.right.isRed()) throw vr();
          var e = this.left.check();
          if (e !== this.right.check()) throw vr();
          return e + (this.isRed() ? 0 : 1);
        }
      }
      (vs.EMPTY = null),
        (vs.RED = !0),
        (vs.BLACK = !1),
        (vs.EMPTY = new (class {
          constructor() {
            this.size = 0;
          }
          get key() {
            throw vr();
          }
          get value() {
            throw vr();
          }
          get color() {
            throw vr();
          }
          get left() {
            throw vr();
          }
          get right() {
            throw vr();
          }
          copy(e, t, n, r, s) {
            return this;
          }
          insert(e, t, n) {
            return new vs(e, t);
          }
          remove(e, t) {
            return this;
          }
          isEmpty() {
            return !0;
          }
          inorderTraversal(e) {
            return !1;
          }
          reverseTraversal(e) {
            return !1;
          }
          minKey() {
            return null;
          }
          maxKey() {
            return null;
          }
          isRed() {
            return !1;
          }
          checkMaxDepth() {
            return !0;
          }
          check() {
            return 0;
          }
        })());
      class ws {
        constructor(e) {
          (this.comparator = e), (this.data = new ps(this.comparator));
        }
        has(e) {
          return null !== this.data.get(e);
        }
        first() {
          return this.data.minKey();
        }
        last() {
          return this.data.maxKey();
        }
        get size() {
          return this.data.size;
        }
        indexOf(e) {
          return this.data.indexOf(e);
        }
        forEach(n) {
          this.data.inorderTraversal((e, t) => (n(e), !1));
        }
        forEachInRange(e, t) {
          const n = this.data.getIteratorFrom(e[0]);
          for (; n.hasNext(); ) {
            var r = n.getNext();
            if (0 <= this.comparator(r.key, e[1])) return;
            t(r.key);
          }
        }
        forEachWhile(e, t) {
          let n;
          for (
            n =
              void 0 !== t
                ? this.data.getIteratorFrom(t)
                : this.data.getIterator();
            n.hasNext();

          )
            if (!e(n.getNext().key)) return;
        }
        firstAfterOrEqual(e) {
          const t = this.data.getIteratorFrom(e);
          return t.hasNext() ? t.getNext().key : null;
        }
        getIterator() {
          return new Is(this.data.getIterator());
        }
        getIteratorFrom(e) {
          return new Is(this.data.getIteratorFrom(e));
        }
        add(e) {
          return this.copy(this.data.remove(e).insert(e, !0));
        }
        delete(e) {
          return this.has(e) ? this.copy(this.data.remove(e)) : this;
        }
        isEmpty() {
          return this.data.isEmpty();
        }
        unionWith(e) {
          let t = this;
          return (
            t.size < e.size && ((t = e), (e = this)),
            e.forEach((e) => {
              t = t.add(e);
            }),
            t
          );
        }
        isEqual(e) {
          if (!(e instanceof ws)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.data.getIterator(),
            n = e.data.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (0 !== this.comparator(e, r)) return !1;
          }
          return !0;
        }
        toArray() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e);
            }),
            t
          );
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => t.push(e)), "SortedSet(" + t.toString() + ")"
          );
        }
        copy(e) {
          const t = new ws(this.comparator);
          return (t.data = e), t;
        }
      }
      class Is {
        constructor(e) {
          this.iter = e;
        }
        getNext() {
          return this.iter.getNext().key;
        }
        hasNext() {
          return this.iter.hasNext();
        }
      }
      function bs(e) {
        return e.hasNext() ? e.getNext() : void 0;
      }
      class Es {
        constructor(e) {
          (this.fields = e).sort(Ur.comparator);
        }
        static empty() {
          return new Es([]);
        }
        unionWith(e) {
          let t = new ws(Ur.comparator);
          for (const e of this.fields) t = t.add(e);
          for (const n of e) t = t.add(n);
          return new Es(t.toArray());
        }
        covers(e) {
          for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
          return !1;
        }
        isEqual(e) {
          return Lr(this.fields, e.fields, (e, t) => e.isEqual(t));
        }
      }
      class Ts {
        constructor(e) {
          this.binaryString = e;
        }
        static fromBase64String(e) {
          var t = atob(e);
          return new Ts(t);
        }
        static fromUint8Array(e) {
          var t = (function (e) {
            let t = "";
            for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
            return t;
          })(e);
          return new Ts(t);
        }
        [Symbol.iterator]() {
          let e = 0;
          return {
            next: () =>
              e < this.binaryString.length
                ? { value: this.binaryString.charCodeAt(e++), done: !1 }
                : { value: void 0, done: !0 },
          };
        }
        toBase64() {
          return (e = this.binaryString), btoa(e);
          var e;
        }
        toUint8Array() {
          return (function (e) {
            const t = new Uint8Array(e.length);
            for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
            return t;
          })(this.binaryString);
        }
        approximateByteSize() {
          return 2 * this.binaryString.length;
        }
        compareTo(e) {
          return Rr(this.binaryString, e.binaryString);
        }
        isEqual(e) {
          return this.binaryString === e.binaryString;
        }
      }
      Ts.EMPTY_BYTE_STRING = new Ts("");
      const Ss = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
      function _s(t) {
        if ((wr(!!t), "string" != typeof t))
          return { seconds: xs(t.seconds), nanos: xs(t.nanos) };
        {
          let e = 0;
          var n = Ss.exec(t);
          wr(!!n),
            n[1] &&
              ((n = ((n = n[1]) + "000000000").substr(0, 9)), (e = Number(n)));
          const r = new Date(t);
          return { seconds: Math.floor(r.getTime() / 1e3), nanos: e };
        }
      }
      function xs(e) {
        return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
      }
      function Ds(e) {
        return "string" == typeof e
          ? Ts.fromBase64String(e)
          : Ts.fromUint8Array(e);
      }
      function As(e) {
        var t;
        return (
          "server_timestamp" ===
          (null ===
            (t = (
              (null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
                ? void 0
                : t.fields) || {}
            ).__type__) || void 0 === t
            ? void 0
            : t.stringValue)
        );
      }
      function Cs(e) {
        var t = _s(e.mapValue.fields.__local_write_time__.timestampValue);
        return new Or(t.seconds, t.nanos);
      }
      class Ns {
        constructor(e, t, n, r, s, i, a, o) {
          (this.databaseId = e),
            (this.appId = t),
            (this.persistenceKey = n),
            (this.host = r),
            (this.ssl = s),
            (this.forceLongPolling = i),
            (this.autoDetectLongPolling = a),
            (this.useFetchStreams = o);
        }
      }
      class ks {
        constructor(e, t) {
          (this.projectId = e), (this.database = t || "(default)");
        }
        static empty() {
          return new ks("", "");
        }
        get isDefaultDatabase() {
          return "(default)" === this.database;
        }
        isEqual(e) {
          return (
            e instanceof ks &&
            e.projectId === this.projectId &&
            e.database === this.database
          );
        }
      }
      function Rs(e) {
        return null == e;
      }
      function Ls(e) {
        return 0 === e && 1 / e == -1 / 0;
      }
      function Ms(e) {
        return (
          "number" == typeof e &&
          Number.isInteger(e) &&
          !Ls(e) &&
          e <= Number.MAX_SAFE_INTEGER &&
          e >= Number.MIN_SAFE_INTEGER
        );
      }
      const Os = {
          mapValue: { fields: { __type__: { stringValue: "__max__" } } },
        },
        Vs = { nullValue: "NULL_VALUE" };
      function Fs(e) {
        return "nullValue" in e
          ? 0
          : "booleanValue" in e
          ? 1
          : "integerValue" in e || "doubleValue" in e
          ? 2
          : "timestampValue" in e
          ? 3
          : "stringValue" in e
          ? 5
          : "bytesValue" in e
          ? 6
          : "referenceValue" in e
          ? 7
          : "geoPointValue" in e
          ? 8
          : "arrayValue" in e
          ? 9
          : "mapValue" in e
          ? As(e)
            ? 4
            : Ys(e)
            ? 9007199254740991
            : 10
          : vr();
      }
      function Ps(r, s) {
        if (r === s) return !0;
        var e,
          t,
          n = Fs(r);
        if (n !== Fs(s)) return !1;
        switch (n) {
          case 0:
          case 9007199254740991:
            return !0;
          case 1:
            return r.booleanValue === s.booleanValue;
          case 4:
            return Cs(r).isEqual(Cs(s));
          case 3:
            return (function (e) {
              if (
                "string" == typeof r.timestampValue &&
                "string" == typeof e.timestampValue &&
                r.timestampValue.length === e.timestampValue.length
              )
                return r.timestampValue === e.timestampValue;
              var t = _s(r.timestampValue),
                n = _s(e.timestampValue);
              return t.seconds === n.seconds && t.nanos === n.nanos;
            })(s);
          case 5:
            return r.stringValue === s.stringValue;
          case 6:
            return (t = s), Ds(r.bytesValue).isEqual(Ds(t.bytesValue));
          case 7:
            return r.referenceValue === s.referenceValue;
          case 8:
            return (
              (e = s),
              xs((t = r).geoPointValue.latitude) ===
                xs(e.geoPointValue.latitude) &&
                xs(t.geoPointValue.longitude) === xs(e.geoPointValue.longitude)
            );
          case 2:
            return (function (e, t) {
              if ("integerValue" in e && "integerValue" in t)
                return xs(e.integerValue) === xs(t.integerValue);
              if ("doubleValue" in e && "doubleValue" in t) {
                var n = xs(e.doubleValue),
                  r = xs(t.doubleValue);
                return n === r ? Ls(n) === Ls(r) : isNaN(n) && isNaN(r);
              }
              return !1;
            })(r, s);
          case 9:
            return Lr(r.arrayValue.values || [], s.arrayValue.values || [], Ps);
          case 10:
            return (function (e) {
              const t = e.mapValue.fields || {},
                n = s.mapValue.fields || {};
              if (fs(t) !== fs(n)) return !1;
              for (const e in t)
                if (t.hasOwnProperty(e) && (void 0 === n[e] || !Ps(t[e], n[e])))
                  return !1;
              return !0;
            })(r);
          default:
            return vr();
        }
      }
      function Bs(e, t) {
        return void 0 !== (e.values || []).find((e) => Ps(e, t));
      }
      function Us(e, t) {
        if (e === t) return 0;
        var n,
          r,
          s,
          i,
          a = Fs(e),
          o = Fs(t);
        if (a !== o) return Rr(a, o);
        switch (a) {
          case 0:
          case 9007199254740991:
            return 0;
          case 1:
            return Rr(e.booleanValue, t.booleanValue);
          case 2:
            return (
              (r = t),
              (s = xs(e.integerValue || e.doubleValue)),
              (i = xs(r.integerValue || r.doubleValue)),
              s < i
                ? -1
                : i < s
                ? 1
                : s === i
                ? 0
                : isNaN(s)
                ? isNaN(i)
                  ? 0
                  : -1
                : 1
            );
          case 3:
            return qs(e.timestampValue, t.timestampValue);
          case 4:
            return qs(Cs(e), Cs(t));
          case 5:
            return Rr(e.stringValue, t.stringValue);
          case 6:
            return (function (e, t) {
              const n = Ds(e),
                r = Ds(t);
              return n.compareTo(r);
            })(e.bytesValue, t.bytesValue);
          case 7:
            return (function (e, t) {
              var n = e.split("/"),
                r = t.split("/");
              for (let s = 0; s < n.length && s < r.length; s++) {
                const t = Rr(n[s], r[s]);
                if (0 !== t) return t;
              }
              return Rr(n.length, r.length);
            })(e.referenceValue, t.referenceValue);
          case 8:
            return (
              (n = e.geoPointValue),
              (r = t.geoPointValue),
              0 !== (i = Rr(xs(n.latitude), xs(r.latitude)))
                ? i
                : Rr(xs(n.longitude), xs(r.longitude))
            );
          case 9:
            return (function (e, t) {
              var n = e.values || [],
                r = t.values || [];
              for (let s = 0; s < n.length && s < r.length; ++s) {
                const t = Us(n[s], r[s]);
                if (t) return t;
              }
              return Rr(n.length, r.length);
            })(e.arrayValue, t.arrayValue);
          case 10:
            return (function (e, t) {
              if (e === Os.mapValue && t === Os.mapValue) return 0;
              if (e === Os.mapValue) return 1;
              if (t === Os.mapValue) return -1;
              const n = e.fields || {},
                r = Object.keys(n),
                s = t.fields || {},
                i = Object.keys(s);
              r.sort(), i.sort();
              for (let o = 0; o < r.length && o < i.length; ++o) {
                const t = Rr(r[o], i[o]);
                if (0 !== t) return t;
                var a = Us(n[r[o]], s[i[o]]);
                if (0 !== a) return a;
              }
              return Rr(r.length, i.length);
            })(e.mapValue, t.mapValue);
          default:
            throw vr();
        }
      }
      function qs(e, t) {
        if (
          "string" == typeof e &&
          "string" == typeof t &&
          e.length === t.length
        )
          return Rr(e, t);
        var n = _s(e),
          r = _s(t),
          s = Rr(n.seconds, r.seconds);
        return 0 !== s ? s : Rr(n.nanos, r.nanos);
      }
      function Ks(e) {
        return (function i(e) {
          return "nullValue" in e
            ? "null"
            : "booleanValue" in e
            ? "" + e.booleanValue
            : "integerValue" in e
            ? "" + e.integerValue
            : "doubleValue" in e
            ? "" + e.doubleValue
            : "timestampValue" in e
            ? (function (e) {
                const t = _s(e);
                return `time(${t.seconds},${t.nanos})`;
              })(e.timestampValue)
            : "stringValue" in e
            ? e.stringValue
            : "bytesValue" in e
            ? Ds(e.bytesValue).toBase64()
            : "referenceValue" in e
            ? ((t = e.referenceValue), qr.fromName(t).toString())
            : "geoPointValue" in e
            ? `geo(${(t = e.geoPointValue).latitude},${t.longitude})`
            : "arrayValue" in e
            ? (function (e) {
                let t = "[",
                  n = !0;
                for (const r of e.values || [])
                  n ? (n = !1) : (t += ","), (t += i(r));
                return t + "]";
              })(e.arrayValue)
            : "mapValue" in e
            ? (function (e) {
                const t = Object.keys(e.fields || {}).sort();
                let n = "{",
                  r = !0;
                for (const s of t)
                  r ? (r = !1) : (n += ","), (n += `${s}:${i(e.fields[s])}`);
                return n + "}";
              })(e.mapValue)
            : vr();
          var t;
        })(e);
      }
      function Gs(e, t) {
        return {
          referenceValue: `projects/${e.projectId}/databases/${
            e.database
          }/documents/${t.path.canonicalString()}`,
        };
      }
      function js(e) {
        return e && "integerValue" in e;
      }
      function $s(e) {
        return !!e && "arrayValue" in e;
      }
      function Qs(e) {
        return e && "nullValue" in e;
      }
      function zs(e) {
        return e && "doubleValue" in e && isNaN(Number(e.doubleValue));
      }
      function Hs(e) {
        return e && "mapValue" in e;
      }
      function Ws(t) {
        if (t.geoPointValue)
          return { geoPointValue: Object.assign({}, t.geoPointValue) };
        if (t.timestampValue && "object" == typeof t.timestampValue)
          return { timestampValue: Object.assign({}, t.timestampValue) };
        if (t.mapValue) {
          const n = { mapValue: { fields: {} } };
          return (
            gs(t.mapValue.fields, (e, t) => (n.mapValue.fields[e] = Ws(t))), n
          );
        }
        if (t.arrayValue) {
          const r = { arrayValue: { values: [] } };
          for (let e = 0; e < (t.arrayValue.values || []).length; ++e)
            r.arrayValue.values[e] = Ws(t.arrayValue.values[e]);
          return r;
        }
        return Object.assign({}, t);
      }
      function Ys(e) {
        return (
          "__max__" ===
          (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
        );
      }
      function Xs(e, t) {
        var n = Us(e.value, t.value);
        return 0 !== n
          ? n
          : e.inclusive && !t.inclusive
          ? -1
          : !e.inclusive && t.inclusive
          ? 1
          : 0;
      }
      function Js(e, t) {
        var n = Us(e.value, t.value);
        return 0 !== n
          ? n
          : e.inclusive && !t.inclusive
          ? 1
          : !e.inclusive && t.inclusive
          ? -1
          : 0;
      }
      class Zs {
        constructor(e) {
          this.value = e;
        }
        static empty() {
          return new Zs({ mapValue: {} });
        }
        field(n) {
          if (n.isEmpty()) return this.value;
          {
            let e = this.value;
            for (let t = 0; t < n.length - 1; ++t)
              if (((e = (e.mapValue.fields || {})[n.get(t)]), !Hs(e)))
                return null;
            return (e = (e.mapValue.fields || {})[n.lastSegment()]), e || null;
          }
        }
        set(e, t) {
          this.getFieldsMap(e.popLast())[e.lastSegment()] = Ws(t);
        }
        setAll(e) {
          let n = Ur.emptyPath(),
            r = {},
            s = [];
          e.forEach((e, t) => {
            if (!n.isImmediateParentOf(t)) {
              const e = this.getFieldsMap(n);
              this.applyChanges(e, r, s), (r = {}), (s = []), (n = t.popLast());
            }
            e ? (r[t.lastSegment()] = Ws(e)) : s.push(t.lastSegment());
          });
          var t = this.getFieldsMap(n);
          this.applyChanges(t, r, s);
        }
        delete(e) {
          const t = this.field(e.popLast());
          Hs(t) &&
            t.mapValue.fields &&
            delete t.mapValue.fields[e.lastSegment()];
        }
        isEqual(e) {
          return Ps(this.value, e.value);
        }
        getFieldsMap(t) {
          let n = this.value;
          n.mapValue.fields || (n.mapValue = { fields: {} });
          for (let r = 0; r < t.length; ++r) {
            let e = n.mapValue.fields[t.get(r)];
            (Hs(e) && e.mapValue.fields) ||
              ((e = { mapValue: { fields: {} } }),
              (n.mapValue.fields[t.get(r)] = e)),
              (n = e);
          }
          return n.mapValue.fields;
        }
        applyChanges(n, e, t) {
          gs(e, (e, t) => (n[e] = t));
          for (const e of t) delete n[e];
        }
        clone() {
          return new Zs(Ws(this.value));
        }
      }
      class ei {
        constructor(e, t, n, r, s, i) {
          (this.key = e),
            (this.documentType = t),
            (this.version = n),
            (this.readTime = r),
            (this.data = s),
            (this.documentState = i);
        }
        static newInvalidDocument(e) {
          return new ei(e, 0, Vr.min(), Vr.min(), Zs.empty(), 0);
        }
        static newFoundDocument(e, t, n) {
          return new ei(e, 1, t, Vr.min(), n, 0);
        }
        static newNoDocument(e, t) {
          return new ei(e, 2, t, Vr.min(), Zs.empty(), 0);
        }
        static newUnknownDocument(e, t) {
          return new ei(e, 3, t, Vr.min(), Zs.empty(), 2);
        }
        convertToFoundDocument(e, t) {
          return (
            (this.version = e),
            (this.documentType = 1),
            (this.data = t),
            (this.documentState = 0),
            this
          );
        }
        convertToNoDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 2),
            (this.data = Zs.empty()),
            (this.documentState = 0),
            this
          );
        }
        convertToUnknownDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 3),
            (this.data = Zs.empty()),
            (this.documentState = 2),
            this
          );
        }
        setHasCommittedMutations() {
          return (this.documentState = 2), this;
        }
        setHasLocalMutations() {
          return (this.documentState = 1), (this.version = Vr.min()), this;
        }
        setReadTime(e) {
          return (this.readTime = e), this;
        }
        get hasLocalMutations() {
          return 1 === this.documentState;
        }
        get hasCommittedMutations() {
          return 2 === this.documentState;
        }
        get hasPendingWrites() {
          return this.hasLocalMutations || this.hasCommittedMutations;
        }
        isValidDocument() {
          return 0 !== this.documentType;
        }
        isFoundDocument() {
          return 1 === this.documentType;
        }
        isNoDocument() {
          return 2 === this.documentType;
        }
        isUnknownDocument() {
          return 3 === this.documentType;
        }
        isEqual(e) {
          return (
            e instanceof ei &&
            this.key.isEqual(e.key) &&
            this.version.isEqual(e.version) &&
            this.documentType === e.documentType &&
            this.documentState === e.documentState &&
            this.data.isEqual(e.data)
          );
        }
        mutableCopy() {
          return new ei(
            this.key,
            this.documentType,
            this.version,
            this.readTime,
            this.data.clone(),
            this.documentState
          );
        }
        toString() {
          return `Document(${this.key}, ${this.version}, ${JSON.stringify(
            this.data.value
          )}, {documentType: ${this.documentType}}), {documentState: ${
            this.documentState
          }})`;
        }
      }
      class ti {
        constructor(e, t = null, n = [], r = [], s = null, i = null, a = null) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.orderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.startAt = i),
            (this.endAt = a),
            (this.ht = null);
        }
      }
      function ni(e, t = null, n = [], r = [], s = null, i = null, a = null) {
        return new ti(e, t, n, r, s, i, a);
      }
      function ri(e) {
        const t = e;
        if (null === t.ht) {
          let e = t.path.canonicalString();
          null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup),
            (e += "|f:"),
            (e += t.filters
              .map((e) => {
                return (
                  (t = e).field.canonicalString() +
                  t.op.toString() +
                  Ks(t.value)
                );
                var t;
              })
              .join(",")),
            (e += "|ob:"),
            (e += t.orderBy
              .map((e) =>
                (function (e) {
                  return e.field.canonicalString() + e.dir;
                })(e)
              )
              .join(",")),
            Rs(t.limit) || ((e += "|l:"), (e += t.limit)),
            t.startAt &&
              ((e += "|lb:"),
              (e += t.startAt.inclusive ? "b:" : "a:"),
              (e += t.startAt.position.map((e) => Ks(e)).join(","))),
            t.endAt &&
              ((e += "|ub:"),
              (e += t.endAt.inclusive ? "a:" : "b:"),
              (e += t.endAt.position.map((e) => Ks(e)).join(","))),
            (t.ht = e);
        }
        return t.ht;
      }
      function si(e, t) {
        if (e.limit !== t.limit) return !1;
        if (e.orderBy.length !== t.orderBy.length) return !1;
        for (let a = 0; a < e.orderBy.length; a++)
          if (
            ((n = e.orderBy[a]),
            (r = t.orderBy[a]),
            n.dir !== r.dir || !n.field.isEqual(r.field))
          )
            return !1;
        var n, r, s, i;
        if (e.filters.length !== t.filters.length) return !1;
        for (let o = 0; o < e.filters.length; o++)
          if (
            ((s = e.filters[o]),
            (i = t.filters[o]),
            s.op !== i.op || !s.field.isEqual(i.field) || !Ps(s.value, i.value))
          )
            return !1;
        return (
          e.collectionGroup === t.collectionGroup &&
          !!e.path.isEqual(t.path) &&
          !!bi(e.startAt, t.startAt) &&
          bi(e.endAt, t.endAt)
        );
      }
      function ii(e) {
        return (
          qr.isDocumentKey(e.path) &&
          null === e.collectionGroup &&
          0 === e.filters.length
        );
      }
      function ai(e, t) {
        return e.filters.filter((e) => e instanceof ci && e.field.isEqual(t));
      }
      function oi(t, n, r) {
        let s = Vs,
          i = !0;
        for (const r of ai(t, n)) {
          let e = Vs,
            t = !0;
          switch (r.op) {
            case "<":
            case "<=":
              e =
                "nullValue" in (a = r.value)
                  ? Vs
                  : "booleanValue" in a
                  ? { booleanValue: !1 }
                  : "integerValue" in a || "doubleValue" in a
                  ? { doubleValue: NaN }
                  : "timestampValue" in a
                  ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
                  : "stringValue" in a
                  ? { stringValue: "" }
                  : "bytesValue" in a
                  ? { bytesValue: "" }
                  : "referenceValue" in a
                  ? Gs(ks.empty(), qr.empty())
                  : "geoPointValue" in a
                  ? { geoPointValue: { latitude: -90, longitude: -180 } }
                  : "arrayValue" in a
                  ? { arrayValue: {} }
                  : "mapValue" in a
                  ? { mapValue: {} }
                  : vr();
              break;
            case "==":
            case "in":
            case ">=":
              e = r.value;
              break;
            case ">":
              (e = r.value), (t = !1);
              break;
            case "!=":
            case "not-in":
              e = Vs;
          }
          Xs({ value: s, inclusive: i }, { value: e, inclusive: t }) < 0 &&
            ((s = e), (i = t));
        }
        var a;
        if (null !== r)
          for (let e = 0; e < t.orderBy.length; ++e)
            if (t.orderBy[e].field.isEqual(n)) {
              const t = r.position[e];
              Xs(
                { value: s, inclusive: i },
                { value: t, inclusive: r.inclusive }
              ) < 0 && ((s = t), (i = r.inclusive));
              break;
            }
        return { value: s, inclusive: i };
      }
      function ui(t, n, r) {
        let s = Os,
          i = !0;
        for (const r of ai(t, n)) {
          let e = Os,
            t = !0;
          switch (r.op) {
            case ">=":
            case ">":
              (e =
                "nullValue" in (a = r.value)
                  ? { booleanValue: !1 }
                  : "booleanValue" in a
                  ? { doubleValue: NaN }
                  : "integerValue" in a || "doubleValue" in a
                  ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
                  : "timestampValue" in a
                  ? { stringValue: "" }
                  : "stringValue" in a
                  ? { bytesValue: "" }
                  : "bytesValue" in a
                  ? Gs(ks.empty(), qr.empty())
                  : "referenceValue" in a
                  ? { geoPointValue: { latitude: -90, longitude: -180 } }
                  : "geoPointValue" in a
                  ? { arrayValue: {} }
                  : "arrayValue" in a
                  ? { mapValue: {} }
                  : "mapValue" in a
                  ? Os
                  : vr()),
                (t = !1);
              break;
            case "==":
            case "in":
            case "<=":
              e = r.value;
              break;
            case "<":
              (e = r.value), (t = !1);
              break;
            case "!=":
            case "not-in":
              e = Os;
          }
          0 < Js({ value: s, inclusive: i }, { value: e, inclusive: t }) &&
            ((s = e), (i = t));
        }
        var a;
        if (null !== r)
          for (let e = 0; e < t.orderBy.length; ++e)
            if (t.orderBy[e].field.isEqual(n)) {
              const t = r.position[e];
              0 <
                Js(
                  { value: s, inclusive: i },
                  { value: t, inclusive: r.inclusive }
                ) && ((s = t), (i = r.inclusive));
              break;
            }
        return { value: s, inclusive: i };
      }
      class ci extends class {} {
        constructor(e, t, n) {
          super(), (this.field = e), (this.op = t), (this.value = n);
        }
        static create(e, t, n) {
          return e.isKeyField()
            ? "in" === t || "not-in" === t
              ? this.lt(e, t, n)
              : new hi(e, t, n)
            : "array-contains" === t
            ? new gi(e, n)
            : "in" === t
            ? new mi(e, n)
            : "not-in" === t
            ? new pi(e, n)
            : "array-contains-any" === t
            ? new yi(e, n)
            : new ci(e, t, n);
        }
        static lt(e, t, n) {
          return new ("in" === t ? li : di)(e, n);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return "!=" === this.op
            ? null !== t && this.ft(Us(t, this.value))
            : null !== t &&
                Fs(this.value) === Fs(t) &&
                this.ft(Us(t, this.value));
        }
        ft(e) {
          switch (this.op) {
            case "<":
              return e < 0;
            case "<=":
              return e <= 0;
            case "==":
              return 0 === e;
            case "!=":
              return 0 !== e;
            case ">":
              return 0 < e;
            case ">=":
              return 0 <= e;
            default:
              return vr();
          }
        }
        dt() {
          return 0 <= ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op);
        }
      }
      class hi extends ci {
        constructor(e, t, n) {
          super(e, t, n), (this.key = qr.fromName(n.referenceValue));
        }
        matches(e) {
          var t = qr.comparator(e.key, this.key);
          return this.ft(t);
        }
      }
      class li extends ci {
        constructor(e, t) {
          super(e, "in", t), (this.keys = fi(0, t));
        }
        matches(t) {
          return this.keys.some((e) => e.isEqual(t.key));
        }
      }
      class di extends ci {
        constructor(e, t) {
          super(e, "not-in", t), (this.keys = fi(0, t));
        }
        matches(t) {
          return !this.keys.some((e) => e.isEqual(t.key));
        }
      }
      function fi(e, t) {
        var n;
        return (
          (null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) ||
          []
        ).map((e) => qr.fromName(e.referenceValue));
      }
      class gi extends ci {
        constructor(e, t) {
          super(e, "array-contains", t);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return $s(t) && Bs(t.arrayValue, this.value);
        }
      }
      class mi extends ci {
        constructor(e, t) {
          super(e, "in", t);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return null !== t && Bs(this.value.arrayValue, t);
        }
      }
      class pi extends ci {
        constructor(e, t) {
          super(e, "not-in", t);
        }
        matches(e) {
          if (Bs(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
          var t = e.data.field(this.field);
          return null !== t && !Bs(this.value.arrayValue, t);
        }
      }
      class yi extends ci {
        constructor(e, t) {
          super(e, "array-contains-any", t);
        }
        matches(e) {
          const t = e.data.field(this.field);
          return (
            !(!$s(t) || !t.arrayValue.values) &&
            t.arrayValue.values.some((e) => Bs(this.value.arrayValue, e))
          );
        }
      }
      class vi {
        constructor(e, t) {
          (this.position = e), (this.inclusive = t);
        }
      }
      class wi {
        constructor(e, t = "asc") {
          (this.field = e), (this.dir = t);
        }
      }
      function Ii(e, t, n) {
        let r = 0;
        for (let s = 0; s < e.position.length; s++) {
          const i = t[s],
            a = e.position[s];
          if (
            ((r = i.field.isKeyField()
              ? qr.comparator(qr.fromName(a.referenceValue), n.key)
              : Us(a, n.data.field(i.field))),
            "desc" === i.dir && (r *= -1),
            0 !== r)
          )
            break;
        }
        return r;
      }
      function bi(e, t) {
        if (null === e) return null === t;
        if (null === t) return !1;
        if (
          e.inclusive !== t.inclusive ||
          e.position.length !== t.position.length
        )
          return !1;
        for (let n = 0; n < e.position.length; n++)
          if (!Ps(e.position[n], t.position[n])) return !1;
        return !0;
      }
      class Ei {
        constructor(
          e,
          t = null,
          n = [],
          r = [],
          s = null,
          i = "F",
          a = null,
          o = null
        ) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.explicitOrderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.limitType = i),
            (this.startAt = a),
            (this.endAt = o),
            (this._t = null),
            (this.wt = null),
            this.startAt,
            this.endAt;
        }
      }
      function Ti(e, t, n, r, s, i, a, o) {
        return new Ei(e, t, n, r, s, i, a, o);
      }
      function Si(e) {
        return new Ei(e);
      }
      function _i(e) {
        return (
          0 === e.filters.length &&
          null === e.limit &&
          null == e.startAt &&
          null == e.endAt &&
          (0 === e.explicitOrderBy.length ||
            (1 === e.explicitOrderBy.length &&
              e.explicitOrderBy[0].field.isKeyField()))
        );
      }
      function xi(e) {
        return 0 < e.explicitOrderBy.length ? e.explicitOrderBy[0].field : null;
      }
      function Di(e) {
        for (const t of e.filters) if (t.dt()) return t.field;
        return null;
      }
      function Ai(e) {
        return null !== e.collectionGroup;
      }
      function Ci(t) {
        const n = t;
        if (null === n._t) {
          n._t = [];
          const t = Di(n),
            e = xi(n);
          if (null !== t && null === e)
            t.isKeyField() || n._t.push(new wi(t)),
              n._t.push(new wi(Ur.keyField(), "asc"));
          else {
            let e = !1;
            for (const r of n.explicitOrderBy)
              n._t.push(r), r.field.isKeyField() && (e = !0);
            if (!e) {
              const t =
                0 < n.explicitOrderBy.length
                  ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir
                  : "asc";
              n._t.push(new wi(Ur.keyField(), t));
            }
          }
        }
        return n._t;
      }
      function Ni(e) {
        const t = e;
        if (!t.wt)
          if ("F" === t.limitType)
            t.wt = ni(
              t.path,
              t.collectionGroup,
              Ci(t),
              t.filters,
              t.limit,
              t.startAt,
              t.endAt
            );
          else {
            const e = [];
            for (const s of Ci(t)) {
              const t = "desc" === s.dir ? "asc" : "desc";
              e.push(new wi(s.field, t));
            }
            var n = t.endAt
                ? new vi(t.endAt.position, t.endAt.inclusive)
                : null,
              r = t.startAt
                ? new vi(t.startAt.position, t.startAt.inclusive)
                : null;
            t.wt = ni(t.path, t.collectionGroup, e, t.filters, t.limit, n, r);
          }
        return t.wt;
      }
      function ki(e, t, n) {
        return new Ei(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          e.filters.slice(),
          t,
          n,
          e.startAt,
          e.endAt
        );
      }
      function Ri(e, t) {
        return si(Ni(e), Ni(t)) && e.limitType === t.limitType;
      }
      function Li(e) {
        return `${ri(Ni(e))}|lt:${e.limitType}`;
      }
      function Mi(e) {
        return `Query(target=${(function (e) {
          let t = e.path.canonicalString();
          return (
            null !== e.collectionGroup &&
              (t += " collectionGroup=" + e.collectionGroup),
            0 < e.filters.length &&
              (t += `, filters: [${e.filters
                .map((e) => {
                  return `${(t = e).field.canonicalString()} ${t.op} ${Ks(
                    t.value
                  )}`;
                  var t;
                })
                .join(", ")}]`),
            Rs(e.limit) || (t += ", limit: " + e.limit),
            0 < e.orderBy.length &&
              (t += `, orderBy: [${e.orderBy
                .map((e) =>
                  (function (e) {
                    return `${e.field.canonicalString()} (${e.dir})`;
                  })(e)
                )
                .join(", ")}]`),
            e.startAt &&
              ((t += ", startAt: "),
              (t += e.startAt.inclusive ? "b:" : "a:"),
              (t += e.startAt.position.map((e) => Ks(e)).join(","))),
            e.endAt &&
              ((t += ", endAt: "),
              (t += e.endAt.inclusive ? "a:" : "b:"),
              (t += e.endAt.position.map((e) => Ks(e)).join(","))),
            `Target(${t})`
          );
        })(Ni(e))}; limitType=${e.limitType})`;
      }
      function Oi(n, e) {
        return (
          e.isFoundDocument() &&
          ((s = n),
          (a = (i = e).key.path),
          null !== s.collectionGroup
            ? i.key.hasCollectionId(s.collectionGroup) && s.path.isPrefixOf(a)
            : qr.isDocumentKey(s.path)
            ? s.path.isEqual(a)
            : s.path.isImmediateParentOf(a)) &&
          (function (e) {
            for (const t of n.explicitOrderBy)
              if (!t.field.isKeyField() && null === e.data.field(t.field))
                return;
            return 1;
          })(e) &&
          (function (e) {
            for (const t of n.filters) if (!t.matches(e)) return;
            return 1;
          })(e) &&
          ((s = e),
          (!(e = n).startAt ||
            ((t = e.startAt),
            (r = Ii(t, Ci(e), s)),
            t.inclusive ? r <= 0 : r < 0)) &&
            (!e.endAt ||
              ((t = e.endAt),
              (r = Ii(t, Ci(e), s)),
              t.inclusive ? 0 <= r : 0 < r)))
        );
        var t, r, s, i, a;
      }
      function Vi(e) {
        return (
          e.collectionGroup ||
          (e.path.length % 2 == 1
            ? e.path.lastSegment()
            : e.path.get(e.path.length - 2))
        );
      }
      function Fi(s) {
        return (e, t) => {
          let n = !1;
          for (const r of Ci(s)) {
            const s = (function (e, s, t) {
              var n = e.field.isKeyField()
                ? qr.comparator(s.key, t.key)
                : (function (e, t) {
                    var n = s.data.field(e),
                      r = t.data.field(e);
                    return null !== n && null !== r ? Us(n, r) : vr();
                  })(e.field, t);
              switch (e.dir) {
                case "asc":
                  return n;
                case "desc":
                  return -1 * n;
                default:
                  return vr();
              }
            })(r, e, t);
            if (0 !== s) return s;
            n = n || r.field.isKeyField();
          }
          return 0;
        };
      }
      function Pi(e, t) {
        if (e.gt) {
          if (isNaN(t)) return { doubleValue: "NaN" };
          if (t === 1 / 0) return { doubleValue: "Infinity" };
          if (t === -1 / 0) return { doubleValue: "-Infinity" };
        }
        return { doubleValue: Ls(t) ? "-0" : t };
      }
      function Bi(e) {
        return { integerValue: "" + e };
      }
      function Ui(e, t) {
        return Ms(t) ? Bi(t) : Pi(e, t);
      }
      class qi {
        constructor() {
          this._ = void 0;
        }
      }
      function Ki(e, t) {
        return e instanceof Hi
          ? js((n = t)) || (n && "doubleValue" in n)
            ? t
            : { integerValue: 0 }
          : null;
        var n;
      }
      class Gi extends qi {}
      class ji extends qi {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function $i(e, t) {
        const n = Yi(t);
        for (const t of e.elements) n.some((e) => Ps(e, t)) || n.push(t);
        return { arrayValue: { values: n } };
      }
      class Qi extends qi {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function zi(e, t) {
        let n = Yi(t);
        for (const t of e.elements) n = n.filter((e) => !Ps(e, t));
        return { arrayValue: { values: n } };
      }
      class Hi extends qi {
        constructor(e, t) {
          super(), (this.It = e), (this.yt = t);
        }
      }
      function Wi(e) {
        return xs(e.integerValue || e.doubleValue);
      }
      function Yi(e) {
        return $s(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
      }
      class Xi {
        constructor(e, t) {
          (this.field = e), (this.transform = t);
        }
      }
      class Ji {
        constructor(e, t) {
          (this.version = e), (this.transformResults = t);
        }
      }
      class Zi {
        constructor(e, t) {
          (this.updateTime = e), (this.exists = t);
        }
        static none() {
          return new Zi();
        }
        static exists(e) {
          return new Zi(void 0, e);
        }
        static updateTime(e) {
          return new Zi(e);
        }
        get isNone() {
          return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(e) {
          return (
            this.exists === e.exists &&
            (this.updateTime
              ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
              : !e.updateTime)
          );
        }
      }
      function ea(e, t) {
        return void 0 !== e.updateTime
          ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
          : void 0 === e.exists || e.exists === t.isFoundDocument();
      }
      class ta {}
      function na(e, n) {
        if (!e.hasLocalMutations || (n && 0 === n.fields.length)) return null;
        if (null === n)
          return e.isNoDocument()
            ? new la(e.key, Zi.none())
            : new aa(e.key, e.data, Zi.none());
        {
          const s = e.data,
            i = Zs.empty();
          let t = new ws(Ur.comparator);
          for (var r of n.fields)
            if (!t.has(r)) {
              let e = s.field(r);
              null === e &&
                1 < r.length &&
                ((r = r.popLast()), (e = s.field(r))),
                null === e ? i.delete(r) : i.set(r, e),
                (t = t.add(r));
            }
          return new oa(e.key, i, new Es(t.toArray()), Zi.none());
        }
      }
      function ra(e, t, n) {
        e instanceof aa
          ? (function (e, t, n) {
              const r = e.value.clone(),
                s = ca(e.fieldTransforms, t, n.transformResults);
              r.setAll(s),
                t
                  .convertToFoundDocument(n.version, r)
                  .setHasCommittedMutations();
            })(e, t, n)
          : e instanceof oa
          ? (function (e, t, n) {
              if (!ea(e.precondition, t))
                return t.convertToUnknownDocument(n.version);
              const r = ca(e.fieldTransforms, t, n.transformResults),
                s = t.data;
              s.setAll(ua(e)),
                s.setAll(r),
                t
                  .convertToFoundDocument(n.version, s)
                  .setHasCommittedMutations();
            })(e, t, n)
          : t.convertToNoDocument(n.version).setHasCommittedMutations();
      }
      function sa(e, t, n, r) {
        return e instanceof aa
          ? (function (e, t, n, r) {
              if (!ea(e.precondition, t)) return n;
              const s = e.value.clone(),
                i = ha(e.fieldTransforms, r, t);
              return (
                s.setAll(i),
                t.convertToFoundDocument(t.version, s).setHasLocalMutations(),
                null
              );
            })(e, t, n, r)
          : e instanceof oa
          ? (function (e, t, n, r) {
              if (!ea(e.precondition, t)) return n;
              const s = ha(e.fieldTransforms, r, t),
                i = t.data;
              return (
                i.setAll(ua(e)),
                i.setAll(s),
                t.convertToFoundDocument(t.version, i).setHasLocalMutations(),
                null === n
                  ? null
                  : n
                      .unionWith(e.fieldMask.fields)
                      .unionWith(e.fieldTransforms.map((e) => e.field))
              );
            })(e, t, n, r)
          : ((t = t),
            (n = n),
            ea(e.precondition, t)
              ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
              : n);
      }
      function ia(e, t) {
        return (
          e.type === t.type &&
          !!e.key.isEqual(t.key) &&
          !!e.precondition.isEqual(t.precondition) &&
          ((n = e.fieldTransforms),
          (r = t.fieldTransforms),
          !!(
            (void 0 === n && void 0 === r) ||
            (n &&
              r &&
              Lr(n, r, (e, t) =>
                (function (e, t) {
                  return (
                    e.field.isEqual(t.field) &&
                    ((e = e.transform),
                    (t = t.transform),
                    (e instanceof ji && t instanceof ji) ||
                    (e instanceof Qi && t instanceof Qi)
                      ? Lr(e.elements, t.elements, Ps)
                      : e instanceof Hi && t instanceof Hi
                      ? Ps(e.yt, t.yt)
                      : e instanceof Gi && t instanceof Gi)
                  );
                })(e, t)
              ))
          ) &&
            (0 === e.type
              ? e.value.isEqual(t.value)
              : 1 !== e.type ||
                (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask))))
        );
        var n, r;
      }
      class aa extends ta {
        constructor(e, t, n, r = []) {
          super(),
            (this.key = e),
            (this.value = t),
            (this.precondition = n),
            (this.fieldTransforms = r),
            (this.type = 0);
        }
        getFieldMask() {
          return null;
        }
      }
      class oa extends ta {
        constructor(e, t, n, r, s = []) {
          super(),
            (this.key = e),
            (this.data = t),
            (this.fieldMask = n),
            (this.precondition = r),
            (this.fieldTransforms = s),
            (this.type = 1);
        }
        getFieldMask() {
          return this.fieldMask;
        }
      }
      function ua(n) {
        const r = new Map();
        return (
          n.fieldMask.fields.forEach((e) => {
            var t;
            e.isEmpty() || ((t = n.data.field(e)), r.set(e, t));
          }),
          r
        );
      }
      function ca(e, t, n) {
        const r = new Map();
        wr(e.length === n.length);
        for (let h = 0; h < n.length; h++) {
          var s = e[h],
            i = s.transform,
            a = t.data.field(s.field);
          r.set(
            s.field,
            ((o = i),
            (u = a),
            (c = n[h]),
            o instanceof ji ? $i(o, u) : o instanceof Qi ? zi(o, u) : c)
          );
        }
        var o, u, c;
        return r;
      }
      function ha(e, t, n) {
        const r = new Map();
        for (const c of e) {
          const e = c.transform,
            h = n.data.field(c.field);
          r.set(
            c.field,
            ((s = e),
            (i = h),
            (a = t),
            (u = o = void 0),
            s instanceof Gi
              ? (function () {
                  const e = {
                    fields: {
                      __type__: { stringValue: "server_timestamp" },
                      __local_write_time__: {
                        timestampValue: {
                          seconds: a.seconds,
                          nanos: a.nanoseconds,
                        },
                      },
                    },
                  };
                  return (
                    i && (e.fields.__previous_value__ = i), { mapValue: e }
                  );
                })()
              : s instanceof ji
              ? $i(s, i)
              : s instanceof Qi
              ? zi(s, i)
              : ((o = Ki((s = s), i)),
                (u = Wi(o) + Wi(s.yt)),
                js(o) && js(s.yt) ? Bi(u) : Pi(s.It, u)))
          );
        }
        var s, i, a, o, u;
        return r;
      }
      class la extends ta {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 2),
            (this.fieldTransforms = []);
        }
        getFieldMask() {
          return null;
        }
      }
      class da extends ta {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 3),
            (this.fieldTransforms = []);
        }
        getFieldMask() {
          return null;
        }
      }
      class fa {
        constructor(e) {
          this.count = e;
        }
      }
      function ga(e) {
        switch (e) {
          default:
            return vr(), 0;
          case Ir.CANCELLED:
          case Ir.UNKNOWN:
          case Ir.DEADLINE_EXCEEDED:
          case Ir.RESOURCE_EXHAUSTED:
          case Ir.INTERNAL:
          case Ir.UNAVAILABLE:
          case Ir.UNAUTHENTICATED:
            return;
          case Ir.INVALID_ARGUMENT:
          case Ir.NOT_FOUND:
          case Ir.ALREADY_EXISTS:
          case Ir.PERMISSION_DENIED:
          case Ir.FAILED_PRECONDITION:
          case Ir.ABORTED:
          case Ir.OUT_OF_RANGE:
          case Ir.UNIMPLEMENTED:
          case Ir.DATA_LOSS:
            return 1;
        }
      }
      function ma(e) {
        if (void 0 === e) return mr("GRPC error has no .code"), Ir.UNKNOWN;
        switch (e) {
          case Zn.OK:
            return Ir.OK;
          case Zn.CANCELLED:
            return Ir.CANCELLED;
          case Zn.UNKNOWN:
            return Ir.UNKNOWN;
          case Zn.DEADLINE_EXCEEDED:
            return Ir.DEADLINE_EXCEEDED;
          case Zn.RESOURCE_EXHAUSTED:
            return Ir.RESOURCE_EXHAUSTED;
          case Zn.INTERNAL:
            return Ir.INTERNAL;
          case Zn.UNAVAILABLE:
            return Ir.UNAVAILABLE;
          case Zn.UNAUTHENTICATED:
            return Ir.UNAUTHENTICATED;
          case Zn.INVALID_ARGUMENT:
            return Ir.INVALID_ARGUMENT;
          case Zn.NOT_FOUND:
            return Ir.NOT_FOUND;
          case Zn.ALREADY_EXISTS:
            return Ir.ALREADY_EXISTS;
          case Zn.PERMISSION_DENIED:
            return Ir.PERMISSION_DENIED;
          case Zn.FAILED_PRECONDITION:
            return Ir.FAILED_PRECONDITION;
          case Zn.ABORTED:
            return Ir.ABORTED;
          case Zn.OUT_OF_RANGE:
            return Ir.OUT_OF_RANGE;
          case Zn.UNIMPLEMENTED:
            return Ir.UNIMPLEMENTED;
          case Zn.DATA_LOSS:
            return Ir.DATA_LOSS;
          default:
            return vr();
        }
      }
      ((nt = Zn = Zn || {})[(nt.OK = 0)] = "OK"),
        (nt[(nt.CANCELLED = 1)] = "CANCELLED"),
        (nt[(nt.UNKNOWN = 2)] = "UNKNOWN"),
        (nt[(nt.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
        (nt[(nt.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
        (nt[(nt.NOT_FOUND = 5)] = "NOT_FOUND"),
        (nt[(nt.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
        (nt[(nt.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
        (nt[(nt.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
        (nt[(nt.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
        (nt[(nt.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
        (nt[(nt.ABORTED = 10)] = "ABORTED"),
        (nt[(nt.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
        (nt[(nt.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
        (nt[(nt.INTERNAL = 13)] = "INTERNAL"),
        (nt[(nt.UNAVAILABLE = 14)] = "UNAVAILABLE"),
        (nt[(nt.DATA_LOSS = 15)] = "DATA_LOSS");
      class pa {
        constructor(e, t) {
          (this.mapKeyFn = e),
            (this.equalsFn = t),
            (this.inner = {}),
            (this.innerSize = 0);
        }
        get(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 !== n)
            for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
        }
        has(e) {
          return void 0 !== this.get(e);
        }
        set(e, t) {
          const n = this.mapKeyFn(e),
            r = this.inner[n];
          if (void 0 === r)
            return (this.inner[n] = [[e, t]]), void this.innerSize++;
          for (let s = 0; s < r.length; s++)
            if (this.equalsFn(r[s][0], e)) return void (r[s] = [e, t]);
          r.push([e, t]), this.innerSize++;
        }
        delete(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 === n) return !1;
          for (let r = 0; r < n.length; r++)
            if (this.equalsFn(n[r][0], e))
              return (
                1 === n.length ? delete this.inner[t] : n.splice(r, 1),
                this.innerSize--,
                !0
              );
          return !1;
        }
        forEach(r) {
          gs(this.inner, (e, t) => {
            for (const [e, n] of t) r(e, n);
          });
        }
        isEmpty() {
          return ms(this.inner);
        }
        size() {
          return this.innerSize;
        }
      }
      const ya = new ps(qr.comparator);
      const va = new ps(qr.comparator);
      function wa(...e) {
        let t = va;
        for (const n of e) t = t.insert(n.key, n);
        return t;
      }
      function Ia(e) {
        let n = va;
        return e.forEach((e, t) => (n = n.insert(e, t.overlayedDocument))), n;
      }
      function ba() {
        return new pa(
          (e) => e.toString(),
          (e, t) => e.isEqual(t)
        );
      }
      const Ea = new ps(qr.comparator),
        Ta = new ws(qr.comparator);
      function Sa(...e) {
        let t = Ta;
        for (const n of e) t = t.add(n);
        return t;
      }
      const _a = new ws(Rr);
      class xa {
        constructor(e, t, n, r, s) {
          (this.snapshotVersion = e),
            (this.targetChanges = t),
            (this.targetMismatches = n),
            (this.documentUpdates = r),
            (this.resolvedLimboDocuments = s);
        }
        static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
          const r = new Map();
          return (
            r.set(e, Da.createSynthesizedTargetChangeForCurrentChange(e, t, n)),
            new xa(Vr.min(), r, _a, ya, Sa())
          );
        }
      }
      class Da {
        constructor(e, t, n, r, s) {
          (this.resumeToken = e),
            (this.current = t),
            (this.addedDocuments = n),
            (this.modifiedDocuments = r),
            (this.removedDocuments = s);
        }
        static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
          return new Da(n, t, Sa(), Sa(), Sa());
        }
      }
      class Aa {
        constructor(e, t, n, r) {
          (this.Tt = e),
            (this.removedTargetIds = t),
            (this.key = n),
            (this.Et = r);
        }
      }
      class Ca {
        constructor(e, t) {
          (this.targetId = e), (this.At = t);
        }
      }
      class Na {
        constructor(e, t, n = Ts.EMPTY_BYTE_STRING, r = null) {
          (this.state = e),
            (this.targetIds = t),
            (this.resumeToken = n),
            (this.cause = r);
        }
      }
      class ka {
        constructor() {
          (this.Rt = 0),
            (this.bt = Ma()),
            (this.Pt = Ts.EMPTY_BYTE_STRING),
            (this.vt = !1),
            (this.Vt = !0);
        }
        get current() {
          return this.vt;
        }
        get resumeToken() {
          return this.Pt;
        }
        get St() {
          return 0 !== this.Rt;
        }
        get Dt() {
          return this.Vt;
        }
        Ct(e) {
          0 < e.approximateByteSize() && ((this.Vt = !0), (this.Pt = e));
        }
        xt() {
          let n = Sa(),
            r = Sa(),
            s = Sa();
          return (
            this.bt.forEach((e, t) => {
              switch (t) {
                case 0:
                  n = n.add(e);
                  break;
                case 2:
                  r = r.add(e);
                  break;
                case 1:
                  s = s.add(e);
                  break;
                default:
                  vr();
              }
            }),
            new Da(this.Pt, this.vt, n, r, s)
          );
        }
        Nt() {
          (this.Vt = !1), (this.bt = Ma());
        }
        kt(e, t) {
          (this.Vt = !0), (this.bt = this.bt.insert(e, t));
        }
        Ot(e) {
          (this.Vt = !0), (this.bt = this.bt.remove(e));
        }
        Mt() {
          this.Rt += 1;
        }
        Ft() {
          --this.Rt;
        }
        $t() {
          (this.Vt = !0), (this.vt = !0);
        }
      }
      class Ra {
        constructor(e) {
          (this.Bt = e),
            (this.Lt = new Map()),
            (this.Ut = ya),
            (this.qt = La()),
            (this.Kt = new ws(Rr));
        }
        Gt(e) {
          for (const t of e.Tt)
            e.Et && e.Et.isFoundDocument()
              ? this.Qt(t, e.Et)
              : this.jt(t, e.key, e.Et);
          for (const n of e.removedTargetIds) this.jt(n, e.key, e.Et);
        }
        Wt(n) {
          this.forEachTarget(n, (e) => {
            const t = this.zt(e);
            switch (n.state) {
              case 0:
                this.Ht(e) && t.Ct(n.resumeToken);
                break;
              case 1:
                t.Ft(), t.St || t.Nt(), t.Ct(n.resumeToken);
                break;
              case 2:
                t.Ft(), t.St || this.removeTarget(e);
                break;
              case 3:
                this.Ht(e) && (t.$t(), t.Ct(n.resumeToken));
                break;
              case 4:
                this.Ht(e) && (this.Jt(e), t.Ct(n.resumeToken));
                break;
              default:
                vr();
            }
          });
        }
        forEachTarget(e, n) {
          0 < e.targetIds.length
            ? e.targetIds.forEach(n)
            : this.Lt.forEach((e, t) => {
                this.Ht(t) && n(t);
              });
        }
        Yt(e) {
          const t = e.targetId,
            n = e.At.count,
            r = this.Xt(t);
          if (r) {
            const e = r.target;
            if (ii(e))
              if (0 === n) {
                const n = new qr(e.path);
                this.jt(t, n, ei.newNoDocument(n, Vr.min()));
              } else wr(1 === n);
            else this.Zt(t) !== n && (this.Jt(t), (this.Kt = this.Kt.add(t)));
          }
        }
        te(r) {
          const s = new Map();
          this.Lt.forEach((e, t) => {
            var n = this.Xt(t);
            if (n) {
              if (e.current && ii(n.target)) {
                const s = new qr(n.target.path);
                null !== this.Ut.get(s) ||
                  this.ee(t, s) ||
                  this.jt(t, s, ei.newNoDocument(s, r));
              }
              e.Dt && (s.set(t, e.xt()), e.Nt());
            }
          });
          let i = Sa();
          this.qt.forEach((e, t) => {
            let n = !0;
            t.forEachWhile((e) => {
              var t = this.Xt(e);
              return !t || 2 === t.purpose || (n = !1);
            }),
              n && (i = i.add(e));
          }),
            this.Ut.forEach((e, t) => t.setReadTime(r));
          var e = new xa(r, s, this.Kt, this.Ut, i);
          return (this.Ut = ya), (this.qt = La()), (this.Kt = new ws(Rr)), e;
        }
        Qt(e, t) {
          var n;
          this.Ht(e) &&
            ((n = this.ee(e, t.key) ? 2 : 0),
            this.zt(e).kt(t.key, n),
            (this.Ut = this.Ut.insert(t.key, t)),
            (this.qt = this.qt.insert(t.key, this.ne(t.key).add(e))));
        }
        jt(e, t, n) {
          if (this.Ht(e)) {
            const r = this.zt(e);
            this.ee(e, t) ? r.kt(t, 1) : r.Ot(t),
              (this.qt = this.qt.insert(t, this.ne(t).delete(e))),
              n && (this.Ut = this.Ut.insert(t, n));
          }
        }
        removeTarget(e) {
          this.Lt.delete(e);
        }
        Zt(e) {
          var t = this.zt(e).xt();
          return (
            this.Bt.getRemoteKeysForTarget(e).size +
            t.addedDocuments.size -
            t.removedDocuments.size
          );
        }
        Mt(e) {
          this.zt(e).Mt();
        }
        zt(e) {
          let t = this.Lt.get(e);
          return t || ((t = new ka()), this.Lt.set(e, t)), t;
        }
        ne(e) {
          let t = this.qt.get(e);
          return t || ((t = new ws(Rr)), (this.qt = this.qt.insert(e, t))), t;
        }
        Ht(e) {
          var t = null !== this.Xt(e);
          return (
            t || gr("WatchChangeAggregator", "Detected inactive target", e), t
          );
        }
        Xt(e) {
          var t = this.Lt.get(e);
          return t && t.St ? null : this.Bt.se(e);
        }
        Jt(t) {
          this.Lt.set(t, new ka()),
            this.Bt.getRemoteKeysForTarget(t).forEach((e) => {
              this.jt(t, e, null);
            });
        }
        ee(e, t) {
          return this.Bt.getRemoteKeysForTarget(e).has(t);
        }
      }
      function La() {
        return new ps(qr.comparator);
      }
      function Ma() {
        return new ps(qr.comparator);
      }
      const Oa = { asc: "ASCENDING", desc: "DESCENDING" },
        Va = {
          "<": "LESS_THAN",
          "<=": "LESS_THAN_OR_EQUAL",
          ">": "GREATER_THAN",
          ">=": "GREATER_THAN_OR_EQUAL",
          "==": "EQUAL",
          "!=": "NOT_EQUAL",
          "array-contains": "ARRAY_CONTAINS",
          in: "IN",
          "not-in": "NOT_IN",
          "array-contains-any": "ARRAY_CONTAINS_ANY",
        };
      class Fa {
        constructor(e, t) {
          (this.databaseId = e), (this.gt = t);
        }
      }
      function Pa(e, t) {
        return e.gt
          ? `${new Date(1e3 * t.seconds)
              .toISOString()
              .replace(/\.\d*/, "")
              .replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
          : { seconds: "" + t.seconds, nanos: t.nanoseconds };
      }
      function Ba(e, t) {
        return e.gt ? t.toBase64() : t.toUint8Array();
      }
      function Ua(e) {
        return (
          wr(!!e), Vr.fromTimestamp(((t = _s(e)), new Or(t.seconds, t.nanos)))
        );
        var t;
      }
      function qa(e, t) {
        return (
          (e = e),
          new Pr(["projects", e.projectId, "databases", e.database])
            .child("documents")
            .child(t)
            .canonicalString()
        );
      }
      function Ka(e) {
        var t = Pr.fromString(e);
        return wr(ao(t)), t;
      }
      function Ga(e, t) {
        return qa(e.databaseId, t.path);
      }
      function ja(e, t) {
        const n = Ka(t);
        if (n.get(1) !== e.databaseId.projectId)
          throw new br(
            Ir.INVALID_ARGUMENT,
            "Tried to deserialize key from different project: " +
              n.get(1) +
              " vs " +
              e.databaseId.projectId
          );
        if (n.get(3) !== e.databaseId.database)
          throw new br(
            Ir.INVALID_ARGUMENT,
            "Tried to deserialize key from different database: " +
              n.get(3) +
              " vs " +
              e.databaseId.database
          );
        return new qr(Ha(n));
      }
      function $a(e, t) {
        return qa(e.databaseId, t);
      }
      function Qa(e) {
        var t = Ka(e);
        return 4 === t.length ? Pr.emptyPath() : Ha(t);
      }
      function za(e) {
        return new Pr([
          "projects",
          e.databaseId.projectId,
          "databases",
          e.databaseId.database,
        ]).canonicalString();
      }
      function Ha(e) {
        return wr(4 < e.length && "documents" === e.get(4)), e.popFirst(5);
      }
      function Wa(e, t, n) {
        return { name: Ga(e, t), fields: n.value.mapValue.fields };
      }
      function Ya(e, t, n) {
        const r = ja(e, t.name),
          s = Ua(t.updateTime),
          i = new Zs({ mapValue: { fields: t.fields } }),
          a = ei.newFoundDocument(r, s, i);
        return (
          n && a.setHasCommittedMutations(),
          n ? a.setHasCommittedMutations() : a
        );
      }
      function Xa(e, t) {
        let n;
        if (t instanceof aa) n = { update: Wa(e, t.key, t.value) };
        else if (t instanceof la) n = { delete: Ga(e, t.key) };
        else if (t instanceof oa)
          n = {
            update: Wa(e, t.key, t.data),
            updateMask: (function (e) {
              const t = [];
              return (
                e.fields.forEach((e) => t.push(e.canonicalString())),
                { fieldPaths: t }
              );
            })(t.fieldMask),
          };
        else {
          if (!(t instanceof da)) return vr();
          n = { verify: Ga(e, t.key) };
        }
        return (
          0 < t.fieldTransforms.length &&
            (n.updateTransforms = t.fieldTransforms.map((e) =>
              (function (e) {
                var t = e.transform;
                if (t instanceof Gi)
                  return {
                    fieldPath: e.field.canonicalString(),
                    setToServerValue: "REQUEST_TIME",
                  };
                if (t instanceof ji)
                  return {
                    fieldPath: e.field.canonicalString(),
                    appendMissingElements: { values: t.elements },
                  };
                if (t instanceof Qi)
                  return {
                    fieldPath: e.field.canonicalString(),
                    removeAllFromArray: { values: t.elements },
                  };
                if (t instanceof Hi)
                  return {
                    fieldPath: e.field.canonicalString(),
                    increment: t.yt,
                  };
                throw vr();
              })(e)
            )),
          t.precondition.isNone ||
            (n.currentDocument =
              void 0 !== (r = t.precondition).updateTime
                ? { updateTime: ((t = r.updateTime), Pa(e, t.toTimestamp())) }
                : void 0 !== r.exists
                ? { exists: r.exists }
                : vr()),
          n
        );
        var r;
      }
      function Ja(t, n) {
        const e = n.currentDocument
            ? void 0 !== (s = n.currentDocument).updateTime
              ? Zi.updateTime(Ua(s.updateTime))
              : void 0 !== s.exists
              ? Zi.exists(s.exists)
              : Zi.none()
            : Zi.none(),
          r = n.updateTransforms
            ? n.updateTransforms.map((e) =>
                (function (e, t) {
                  let n = null;
                  if ("setToServerValue" in t)
                    wr("REQUEST_TIME" === t.setToServerValue), (n = new Gi());
                  else if ("appendMissingElements" in t) {
                    const e = t.appendMissingElements.values || [];
                    n = new ji(e);
                  } else if ("removeAllFromArray" in t) {
                    const e = t.removeAllFromArray.values || [];
                    n = new Qi(e);
                  } else "increment" in t ? (n = new Hi(e, t.increment)) : vr();
                  var r = Ur.fromServerFormat(t.fieldPath);
                  return new Xi(r, n);
                })(t, e)
              )
            : [];
        var s;
        if (n.update) {
          n.update.name;
          var i = ja(t, n.update.name),
            a = new Zs({ mapValue: { fields: n.update.fields } });
          if (n.updateMask) {
            const t = (function () {
              const e = n.updateMask.fieldPaths || [];
              return new Es(e.map((e) => Ur.fromServerFormat(e)));
            })();
            return new oa(i, a, t, e, r);
          }
          return new aa(i, a, e, r);
        }
        if (n.delete) {
          const r = ja(t, n.delete);
          return new la(r, e);
        }
        if (n.verify) {
          const r = ja(t, n.verify);
          return new da(r, e);
        }
        return vr();
      }
      function Za(e, t) {
        return { documents: [$a(e, t.path)] };
      }
      function eo(e, t) {
        const n = { structuredQuery: {} },
          r = t.path;
        null !== t.collectionGroup
          ? ((n.parent = $a(e, r)),
            (n.structuredQuery.from = [
              { collectionId: t.collectionGroup, allDescendants: !0 },
            ]))
          : ((n.parent = $a(e, r.popLast())),
            (n.structuredQuery.from = [{ collectionId: r.lastSegment() }]));
        var s = (function (e) {
          if (0 !== e.length) {
            var t = e.map((e) =>
              (function (e) {
                if ("==" === e.op) {
                  if (zs(e.value))
                    return {
                      unaryFilter: { field: no(e.field), op: "IS_NAN" },
                    };
                  if (Qs(e.value))
                    return {
                      unaryFilter: { field: no(e.field), op: "IS_NULL" },
                    };
                } else if ("!=" === e.op) {
                  if (zs(e.value))
                    return {
                      unaryFilter: { field: no(e.field), op: "IS_NOT_NAN" },
                    };
                  if (Qs(e.value))
                    return {
                      unaryFilter: { field: no(e.field), op: "IS_NOT_NULL" },
                    };
                }
                return {
                  fieldFilter: {
                    field: no(e.field),
                    op: ((t = e.op), Va[t]),
                    value: e.value,
                  },
                };
                var t;
              })(e)
            );
            return 1 === t.length
              ? t[0]
              : { compositeFilter: { op: "AND", filters: t } };
          }
        })(t.filters);
        s && (n.structuredQuery.where = s);
        s = (function (e) {
          if (0 !== e.length)
            return e.map((e) =>
              (function (e) {
                return { field: no(e.field), direction: ((e = e.dir), Oa[e]) };
              })(e)
            );
        })(t.orderBy);
        s && (n.structuredQuery.orderBy = s);
        var i,
          s = ((i = t.limit), e.gt || Rs(i) ? i : { value: i });
        return (
          null !== s && (n.structuredQuery.limit = s),
          t.startAt &&
            (n.structuredQuery.startAt = {
              before: (s = t.startAt).inclusive,
              values: s.position,
            }),
          t.endAt &&
            (n.structuredQuery.endAt = {
              before: !(t = t.endAt).inclusive,
              values: t.position,
            }),
          n
        );
      }
      function to(e) {
        let t = Qa(e.parent);
        const n = e.structuredQuery,
          r = n.from ? n.from.length : 0;
        let s = null;
        if (0 < r) {
          wr(1 === r);
          const g = n.from[0];
          g.allDescendants
            ? (s = g.collectionId)
            : (t = t.child(g.collectionId));
        }
        let i = [];
        n.where &&
          (i = (function t(e) {
            return e
              ? void 0 !== e.unaryFilter
                ? [io(e)]
                : void 0 !== e.fieldFilter
                ? [so(e)]
                : void 0 !== e.compositeFilter
                ? e.compositeFilter.filters
                    .map((e) => t(e))
                    .reduce((e, t) => e.concat(t))
                : vr()
              : [];
          })(n.where));
        let a = [];
        n.orderBy &&
          (a = n.orderBy.map((e) =>
            (function (e) {
              return new wi(
                ro(e.field),
                (function () {
                  switch (e.direction) {
                    case "ASCENDING":
                      return "asc";
                    case "DESCENDING":
                      return "desc";
                    default:
                      return;
                  }
                })()
              );
            })(e)
          ));
        let o = null;
        var u, c, h, l;
        n.limit &&
          (o =
            ((e = n.limit),
            Rs((u = "object" == typeof e ? e.value : e)) ? null : u));
        let d = null;
        n.startAt &&
          (d =
            ((c = n.startAt),
            (l = !!c.before),
            (h = c.values || []),
            new vi(h, l)));
        let f = null;
        return (
          n.endAt &&
            (f =
              ((c = n.endAt),
              (h = !c.before),
              (l = c.values || []),
              new vi(l, h))),
          Ti(t, s, a, i, o, "F", d, f)
        );
      }
      function no(e) {
        return { fieldPath: e.canonicalString() };
      }
      function ro(e) {
        return Ur.fromServerFormat(e.fieldPath);
      }
      function so(e) {
        return ci.create(
          ro(e.fieldFilter.field),
          (function () {
            switch (e.fieldFilter.op) {
              case "EQUAL":
                return "==";
              case "NOT_EQUAL":
                return "!=";
              case "GREATER_THAN":
                return ">";
              case "GREATER_THAN_OR_EQUAL":
                return ">=";
              case "LESS_THAN":
                return "<";
              case "LESS_THAN_OR_EQUAL":
                return "<=";
              case "ARRAY_CONTAINS":
                return "array-contains";
              case "IN":
                return "in";
              case "NOT_IN":
                return "not-in";
              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any";
              default:
                return vr();
            }
          })(),
          e.fieldFilter.value
        );
      }
      function io(e) {
        switch (e.unaryFilter.op) {
          case "IS_NAN":
            var t = ro(e.unaryFilter.field);
            return ci.create(t, "==", { doubleValue: NaN });
          case "IS_NULL":
            t = ro(e.unaryFilter.field);
            return ci.create(t, "==", { nullValue: "NULL_VALUE" });
          case "IS_NOT_NAN":
            var n = ro(e.unaryFilter.field);
            return ci.create(n, "!=", { doubleValue: NaN });
          case "IS_NOT_NULL":
            n = ro(e.unaryFilter.field);
            return ci.create(n, "!=", { nullValue: "NULL_VALUE" });
          default:
            return vr();
        }
      }
      function ao(e) {
        return (
          4 <= e.length && "projects" === e.get(0) && "databases" === e.get(2)
        );
      }
      function oo(e) {
        let t = "";
        for (let n = 0; n < e.length; n++)
          0 < t.length && (t = uo(t)),
            (t = (function (e, t) {
              let n = t;
              const r = e.length;
              for (let s = 0; s < r; s++) {
                const r = e.charAt(s);
                switch (r) {
                  case "\0":
                    n += "";
                    break;
                  case "":
                    n += "";
                    break;
                  default:
                    n += r;
                }
              }
              return n;
            })(e.get(n), t));
        return uo(t);
      }
      function uo(e) {
        return e + "";
      }
      function co(t) {
        const n = t.length;
        if ((wr(2 <= n), 2 === n))
          return wr("" === t.charAt(0) && "" === t.charAt(1)), Pr.emptyPath();
        const r = n - 2,
          s = [];
        let i = "";
        for (let a = 0; a < n; ) {
          const n = t.indexOf("", a);
          switch (((n < 0 || n > r) && vr(), t.charAt(n + 1))) {
            case "":
              const r = t.substring(a, n);
              let e;
              0 === i.length ? (e = r) : ((i += r), (e = i), (i = "")),
                s.push(e);
              break;
            case "":
              (i += t.substring(a, n)), (i += "\0");
              break;
            case "":
              i += t.substring(a, n + 1);
              break;
            default:
              vr();
          }
          a = n + 2;
        }
        return new Pr(s);
      }
      const ho = ["userId", "batchId"];
      function lo(e, t) {
        return [e, oo(t)];
      }
      function fo(e, t, n) {
        return [e, oo(t), n];
      }
      const go = {},
        mo = ["prefixPath", "collectionGroup", "readTime", "documentId"],
        po = ["prefixPath", "collectionGroup", "documentId"],
        yo = ["collectionGroup", "readTime", "prefixPath", "documentId"],
        vo = ["canonicalId", "targetId"],
        wo = ["targetId", "path"],
        Io = ["path", "targetId"],
        bo = ["collectionId", "parent"],
        Eo = ["indexId", "uid"],
        To = ["uid", "sequenceNumber"],
        So = [
          "indexId",
          "uid",
          "arrayValue",
          "directionalValue",
          "orderedDocumentKey",
          "documentKey",
        ],
        _o = ["indexId", "uid", "orderedDocumentKey"],
        xo = ["userId", "collectionPath", "documentId"],
        Do = ["userId", "collectionPath", "largestBatchId"],
        Ao = ["userId", "collectionGroup", "largestBatchId"],
        Co = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocuments",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
        ],
        No = [...Co, "documentOverlays"],
        ko = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocumentsV14",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
          "documentOverlays",
        ],
        Ro = ko,
        Lo = [...Ro, "indexConfiguration", "indexState", "indexEntries"];
      class Mo extends Jr {
        constructor(e, t) {
          super(), (this.ie = e), (this.currentSequenceNumber = t);
        }
      }
      function Oo(e, t) {
        var n = e;
        return ns.M(n.ie, t);
      }
      class Vo {
        constructor(e, t, n, r) {
          (this.batchId = e),
            (this.localWriteTime = t),
            (this.baseMutations = n),
            (this.mutations = r);
        }
        applyToRemoteDocument(e, t) {
          var n = t.mutationResults;
          for (let r = 0; r < this.mutations.length; r++) {
            const s = this.mutations[r];
            s.key.isEqual(e.key) && ra(s, e, n[r]);
          }
        }
        applyToLocalView(e, t) {
          for (const n of this.baseMutations)
            n.key.isEqual(e.key) && (t = sa(n, e, t, this.localWriteTime));
          for (const r of this.mutations)
            r.key.isEqual(e.key) && (t = sa(r, e, t, this.localWriteTime));
          return t;
        }
        applyToLocalDocumentSet(i, a) {
          const o = ba();
          return (
            this.mutations.forEach((e) => {
              const t = i.get(e.key),
                n = t.overlayedDocument;
              let r = this.applyToLocalView(n, t.mutatedFields);
              r = a.has(e.key) ? null : r;
              var s = na(n, r);
              null !== s && o.set(e.key, s),
                n.isValidDocument() || n.convertToNoDocument(Vr.min());
            }),
            o
          );
        }
        keys() {
          return this.mutations.reduce((e, t) => e.add(t.key), Sa());
        }
        isEqual(e) {
          return (
            this.batchId === e.batchId &&
            Lr(this.mutations, e.mutations, (e, t) => ia(e, t)) &&
            Lr(this.baseMutations, e.baseMutations, (e, t) => ia(e, t))
          );
        }
      }
      class Fo {
        constructor(e, t, n, r) {
          (this.batch = e),
            (this.commitVersion = t),
            (this.mutationResults = n),
            (this.docVersions = r);
        }
        static from(e, t, n) {
          wr(e.mutations.length === n.length);
          let r = Ea;
          var s = e.mutations;
          for (let i = 0; i < s.length; i++)
            r = r.insert(s[i].key, n[i].version);
          return new Fo(e, t, n, r);
        }
      }
      class Po {
        constructor(e, t) {
          (this.largestBatchId = e), (this.mutation = t);
        }
        getKey() {
          return this.mutation.key;
        }
        isEqual(e) {
          return null !== e && this.mutation === e.mutation;
        }
        toString() {
          return `Overlay{\n      largestBatchId: ${
            this.largestBatchId
          },\n      mutation: ${this.mutation.toString()}\n    }`;
        }
      }
      class Bo {
        constructor(
          e,
          t,
          n,
          r,
          s = Vr.min(),
          i = Vr.min(),
          a = Ts.EMPTY_BYTE_STRING
        ) {
          (this.target = e),
            (this.targetId = t),
            (this.purpose = n),
            (this.sequenceNumber = r),
            (this.snapshotVersion = s),
            (this.lastLimboFreeSnapshotVersion = i),
            (this.resumeToken = a);
        }
        withSequenceNumber(e) {
          return new Bo(
            this.target,
            this.targetId,
            this.purpose,
            e,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken
          );
        }
        withResumeToken(e, t) {
          return new Bo(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            t,
            this.lastLimboFreeSnapshotVersion,
            e
          );
        }
        withLastLimboFreeSnapshotVersion(e) {
          return new Bo(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            e,
            this.resumeToken
          );
        }
      }
      class Uo {
        constructor(e) {
          this.re = e;
        }
      }
      function qo(e, t) {
        const n = t.key,
          r = {
            prefixPath: n.getCollectionPath().popLast().toArray(),
            collectionGroup: n.collectionGroup,
            documentId: n.path.lastSegment(),
            readTime: Ko(t.readTime),
            hasCommittedMutations: t.hasCommittedMutations,
          };
        if (t.isFoundDocument())
          r.document = {
            name: Ga((s = e.re), (e = t).key),
            fields: e.data.value.mapValue.fields,
            updateTime: Pa(s, e.version.toTimestamp()),
          };
        else if (t.isNoDocument())
          r.noDocument = { path: n.path.toArray(), readTime: Go(t.version) };
        else {
          if (!t.isUnknownDocument()) return vr();
          r.unknownDocument = {
            path: n.path.toArray(),
            version: Go(t.version),
          };
        }
        var s;
        return r;
      }
      function Ko(e) {
        var t = e.toTimestamp();
        return [t.seconds, t.nanoseconds];
      }
      function Go(e) {
        var t = e.toTimestamp();
        return { seconds: t.seconds, nanoseconds: t.nanoseconds };
      }
      function jo(e) {
        var t = new Or(e.seconds, e.nanoseconds);
        return Vr.fromTimestamp(t);
      }
      function $o(t, e) {
        const n = (e.baseMutations || []).map((e) => Ja(t.re, e));
        for (let i = 0; i < e.mutations.length - 1; ++i) {
          const n = e.mutations[i];
          if (
            i + 1 < e.mutations.length &&
            void 0 !== e.mutations[i + 1].transform
          ) {
            const r = e.mutations[i + 1];
            (n.updateTransforms = r.transform.fieldTransforms),
              e.mutations.splice(i + 1, 1),
              ++i;
          }
        }
        const r = e.mutations.map((e) => Ja(t.re, e)),
          s = Or.fromMillis(e.localWriteTimeMs);
        return new Vo(e.batchId, s, n, r);
      }
      function Qo(e) {
        var t,
          n = jo(e.readTime),
          r =
            void 0 !== e.lastLimboFreeSnapshotVersion
              ? jo(e.lastLimboFreeSnapshotVersion)
              : Vr.min();
        let s;
        return (
          (s =
            void 0 !== e.query.documents
              ? (wr(1 === (t = e.query).documents.length),
                Ni(Si(Qa(t.documents[0]))))
              : Ni(to(e.query))),
          new Bo(
            s,
            e.targetId,
            0,
            e.lastListenSequenceNumber,
            n,
            r,
            Ts.fromBase64String(e.resumeToken)
          )
        );
      }
      function zo(e, t) {
        var n = Go(t.snapshotVersion),
          r = Go(t.lastLimboFreeSnapshotVersion),
          s = (ii(t.target) ? Za : eo)(e.re, t.target),
          i = t.resumeToken.toBase64();
        return {
          targetId: t.targetId,
          canonicalId: ri(t.target),
          readTime: n,
          resumeToken: i,
          lastListenSequenceNumber: t.sequenceNumber,
          lastLimboFreeSnapshotVersion: r,
          query: s,
        };
      }
      function Ho(e) {
        var t = to({ parent: e.parent, structuredQuery: e.structuredQuery });
        return "LAST" === e.limitType ? ki(t, t.limit, "L") : t;
      }
      function Wo(e, t) {
        return new Po(t.largestBatchId, Ja(e.re, t.overlayMutation));
      }
      function Yo(e, t) {
        var n = t.path.lastSegment();
        return [e, oo(t.path.popLast()), n];
      }
      function Xo(e, t, n, r) {
        return {
          indexId: e,
          uid: t.uid || "",
          sequenceNumber: n,
          readTime: Go(r.readTime),
          documentKey: oo(r.documentKey.path),
          largestBatchId: r.largestBatchId,
        };
      }
      class Jo {
        getBundleMetadata(e, t) {
          return Zo(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  id: (t = e).bundleId,
                  createTime: jo(t.createTime),
                  version: t.version,
                };
              var t;
            });
        }
        saveBundleMetadata(e, t) {
          return Zo(e).put({
            bundleId: (n = t).id,
            createTime: Go(Ua(n.createTime)),
            version: n.version,
          });
          var n;
        }
        getNamedQuery(e, t) {
          return eu(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  name: (t = e).name,
                  query: Ho(t.bundledQuery),
                  readTime: jo(t.readTime),
                };
              var t;
            });
        }
        saveNamedQuery(e, t) {
          return eu(e).put({
            name: (t = t).name,
            readTime: Go(Ua(t.readTime)),
            bundledQuery: t.bundledQuery,
          });
        }
      }
      function Zo(e) {
        return Oo(e, "bundles");
      }
      function eu(e) {
        return Oo(e, "namedQueries");
      }
      class tu {
        constructor(e, t) {
          (this.It = e), (this.userId = t);
        }
        static oe(e, t) {
          var n = t.uid || "";
          return new tu(e, n);
        }
        getOverlay(e, t) {
          return nu(e)
            .get(Yo(this.userId, t))
            .next((e) => (e ? Wo(this.It, e) : null));
        }
        getOverlays(e, t) {
          const n = ba();
          return es
            .forEach(t, (t) =>
              this.getOverlay(e, t).next((e) => {
                null !== e && n.set(t, e);
              })
            )
            .next(() => n);
        }
        saveOverlays(r, s, e) {
          const i = [];
          return (
            e.forEach((e, t) => {
              var n = new Po(s, t);
              i.push(this.ue(r, n));
            }),
            es.waitFor(i)
          );
        }
        removeOverlaysForBatchId(n, e, r) {
          const t = new Set();
          e.forEach((e) => t.add(oo(e.getCollectionPath())));
          const s = [];
          return (
            t.forEach((e) => {
              var t = IDBKeyRange.bound(
                [this.userId, e, r],
                [this.userId, e, r + 1],
                !1,
                !0
              );
              s.push(nu(n).Y("collectionPathOverlayIndex", t));
            }),
            es.waitFor(s)
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = ba(),
            s = oo(t),
            i = IDBKeyRange.bound(
              [this.userId, s, n],
              [this.userId, s, Number.POSITIVE_INFINITY],
              !0
            );
          return nu(e)
            .W("collectionPathOverlayIndex", i)
            .next((e) => {
              for (const t of e) {
                const e = Wo(this.It, t);
                r.set(e.getKey(), e);
              }
              return r;
            });
        }
        getOverlaysForCollectionGroup(e, t, n, s) {
          const i = ba();
          let a;
          var r = IDBKeyRange.bound(
            [this.userId, t, n],
            [this.userId, t, Number.POSITIVE_INFINITY],
            !0
          );
          return nu(e)
            .Z(
              { index: "collectionGroupOverlayIndex", range: r },
              (e, t, n) => {
                const r = Wo(this.It, t);
                i.size() < s || r.largestBatchId === a
                  ? (i.set(r.getKey(), r), (a = r.largestBatchId))
                  : n.done();
              }
            )
            .next(() => i);
        }
        ue(e, t) {
          return nu(e).put(
            (function (e, t, n) {
              var [, r, s] = Yo(t, n.mutation.key);
              return {
                userId: t,
                collectionPath: r,
                documentId: s,
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: Xa(e.re, n.mutation),
              };
            })(this.It, this.userId, t)
          );
        }
      }
      function nu(e) {
        return Oo(e, "documentOverlays");
      }
      class ru {
        constructor() {}
        ce(e, t) {
          this.ae(e, t), t.he();
        }
        ae(e, t) {
          var n, r;
          "nullValue" in e
            ? this.le(t, 5)
            : "booleanValue" in e
            ? (this.le(t, 10), t.fe(e.booleanValue ? 1 : 0))
            : "integerValue" in e
            ? (this.le(t, 15), t.fe(xs(e.integerValue)))
            : "doubleValue" in e
            ? ((n = xs(e.doubleValue)),
              isNaN(n)
                ? this.le(t, 13)
                : (this.le(t, 15), Ls(n) ? t.fe(0) : t.fe(n)))
            : "timestampValue" in e
            ? ((r = e.timestampValue),
              this.le(t, 20),
              "string" == typeof r
                ? t.de(r)
                : (t.de(`${r.seconds || ""}`), t.fe(r.nanos || 0)))
            : "stringValue" in e
            ? (this._e(e.stringValue, t), this.we(t))
            : "bytesValue" in e
            ? (this.le(t, 30), t.me(Ds(e.bytesValue)), this.we(t))
            : "referenceValue" in e
            ? this.ge(e.referenceValue, t)
            : "geoPointValue" in e
            ? ((r = e.geoPointValue),
              this.le(t, 45),
              t.fe(r.latitude || 0),
              t.fe(r.longitude || 0))
            : "mapValue" in e
            ? Ys(e)
              ? this.le(t, Number.MAX_SAFE_INTEGER)
              : (this.ye(e.mapValue, t), this.we(t))
            : "arrayValue" in e
            ? (this.pe(e.arrayValue, t), this.we(t))
            : vr();
        }
        _e(e, t) {
          this.le(t, 25), this.Ie(e, t);
        }
        Ie(e, t) {
          t.de(e);
        }
        ye(e, t) {
          var n = e.fields || {};
          this.le(t, 55);
          for (const e of Object.keys(n)) this._e(e, t), this.ae(n[e], t);
        }
        pe(e, t) {
          var n = e.values || [];
          this.le(t, 50);
          for (const e of n) this.ae(e, t);
        }
        ge(e, t) {
          this.le(t, 37),
            qr.fromName(e).path.forEach((e) => {
              this.le(t, 60), this.Ie(e, t);
            });
        }
        le(e, t) {
          e.fe(t);
        }
        we(e) {
          e.fe(2);
        }
      }
      function su(e) {
        var t =
          64 -
          (function (e) {
            let t = 0;
            for (let r = 0; r < 8; ++r) {
              var n = (function (e) {
                if (0 === e) return 8;
                let t = 0;
                return (
                  e >> 4 == 0 && ((t += 4), (e <<= 4)),
                  e >> 6 == 0 && ((t += 2), (e <<= 2)),
                  e >> 7 == 0 && (t += 1),
                  t
                );
              })(255 & e[r]);
              if (((t += n), 8 !== n)) break;
            }
            return t;
          })(e);
        return Math.ceil(t / 8);
      }
      ru.Te = new ru();
      class iu {
        constructor() {
          (this.buffer = new Uint8Array(1024)), (this.position = 0);
        }
        Ee(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this.Ae(n.value), (n = t.next());
          this.Re();
        }
        be(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this.Pe(n.value), (n = t.next());
          this.ve();
        }
        Ve(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this.Ae(e);
            else if (e < 2048)
              this.Ae(960 | (e >>> 6)), this.Ae(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this.Ae(480 | (e >>> 12)),
                this.Ae(128 | (63 & (e >>> 6))),
                this.Ae(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this.Ae(240 | (e >>> 18)),
                this.Ae(128 | (63 & (e >>> 12))),
                this.Ae(128 | (63 & (e >>> 6))),
                this.Ae(128 | (63 & e));
            }
          }
          this.Re();
        }
        Se(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this.Pe(e);
            else if (e < 2048)
              this.Pe(960 | (e >>> 6)), this.Pe(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this.Pe(480 | (e >>> 12)),
                this.Pe(128 | (63 & (e >>> 6))),
                this.Pe(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this.Pe(240 | (e >>> 18)),
                this.Pe(128 | (63 & (e >>> 12))),
                this.Pe(128 | (63 & (e >>> 6))),
                this.Pe(128 | (63 & e));
            }
          }
          this.ve();
        }
        De(e) {
          var t = this.Ce(e),
            n = su(t);
          this.xe(1 + n), (this.buffer[this.position++] = 255 & n);
          for (let r = t.length - n; r < t.length; ++r)
            this.buffer[this.position++] = 255 & t[r];
        }
        Ne(e) {
          var t = this.Ce(e),
            n = su(t);
          this.xe(1 + n), (this.buffer[this.position++] = ~(255 & n));
          for (let r = t.length - n; r < t.length; ++r)
            this.buffer[this.position++] = ~(255 & t[r]);
        }
        ke() {
          this.Oe(255), this.Oe(255);
        }
        Me() {
          this.Fe(255), this.Fe(255);
        }
        reset() {
          this.position = 0;
        }
        seed(e) {
          this.xe(e.length),
            this.buffer.set(e, this.position),
            (this.position += e.length);
        }
        $e() {
          return this.buffer.slice(0, this.position);
        }
        Ce(e) {
          const t = (function (e) {
              const t = new DataView(new ArrayBuffer(8));
              return t.setFloat64(0, e, !1), new Uint8Array(t.buffer);
            })(e),
            n = 0 != (128 & t[0]);
          t[0] ^= n ? 255 : 128;
          for (let r = 1; r < t.length; ++r) t[r] ^= n ? 255 : 0;
          return t;
        }
        Ae(e) {
          var t = 255 & e;
          0 == t
            ? (this.Oe(0), this.Oe(255))
            : 255 == t
            ? (this.Oe(255), this.Oe(0))
            : this.Oe(t);
        }
        Pe(e) {
          var t = 255 & e;
          0 == t
            ? (this.Fe(0), this.Fe(255))
            : 255 == t
            ? (this.Fe(255), this.Fe(0))
            : this.Fe(e);
        }
        Re() {
          this.Oe(0), this.Oe(1);
        }
        ve() {
          this.Fe(0), this.Fe(1);
        }
        Oe(e) {
          this.xe(1), (this.buffer[this.position++] = e);
        }
        Fe(e) {
          this.xe(1), (this.buffer[this.position++] = ~e);
        }
        xe(e) {
          var t = e + this.position;
          if (!(t <= this.buffer.length)) {
            let e = 2 * this.buffer.length;
            e < t && (e = t);
            const n = new Uint8Array(e);
            n.set(this.buffer), (this.buffer = n);
          }
        }
      }
      class au {
        constructor(e) {
          this.Be = e;
        }
        me(e) {
          this.Be.Ee(e);
        }
        de(e) {
          this.Be.Ve(e);
        }
        fe(e) {
          this.Be.De(e);
        }
        he() {
          this.Be.ke();
        }
      }
      class ou {
        constructor(e) {
          this.Be = e;
        }
        me(e) {
          this.Be.be(e);
        }
        de(e) {
          this.Be.Se(e);
        }
        fe(e) {
          this.Be.Ne(e);
        }
        he() {
          this.Be.Me();
        }
      }
      class uu {
        constructor() {
          (this.Be = new iu()),
            (this.Le = new au(this.Be)),
            (this.Ue = new ou(this.Be));
        }
        seed(e) {
          this.Be.seed(e);
        }
        qe(e) {
          return 0 === e ? this.Le : this.Ue;
        }
        $e() {
          return this.Be.$e();
        }
        reset() {
          this.Be.reset();
        }
      }
      class cu {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.documentKey = t),
            (this.arrayValue = n),
            (this.directionalValue = r);
        }
        Ke() {
          const e = this.directionalValue.length,
            t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
            n = new Uint8Array(t);
          return (
            n.set(this.directionalValue, 0),
            t !== e
              ? n.set([0], this.directionalValue.length)
              : ++n[n.length - 1],
            new cu(this.indexId, this.documentKey, this.arrayValue, n)
          );
        }
      }
      function hu(e, t) {
        let n = e.indexId - t.indexId;
        return 0 !== n
          ? n
          : ((n = lu(e.arrayValue, t.arrayValue)),
            0 !== n
              ? n
              : ((n = lu(e.directionalValue, t.directionalValue)),
                0 !== n ? n : qr.comparator(e.documentKey, t.documentKey)));
      }
      function lu(e, t) {
        for (let r = 0; r < e.length && r < t.length; ++r) {
          var n = e[r] - t[r];
          if (0 != n) return n;
        }
        return e.length - t.length;
      }
      class du {
        constructor(e) {
          (this.collectionId =
            null != e.collectionGroup
              ? e.collectionGroup
              : e.path.lastSegment()),
            (this.Ge = e.orderBy),
            (this.Qe = []);
          for (const t of e.filters) {
            const e = t;
            e.dt() ? (this.je = e) : this.Qe.push(e);
          }
        }
        We(e) {
          var t = Gr(e);
          if (void 0 !== t && !this.ze(t)) return !1;
          var n = jr(e);
          let r = 0,
            s = 0;
          for (; r < n.length && this.ze(n[r]); ++r);
          if (r === n.length) return !0;
          if (void 0 !== this.je) {
            const e = n[r];
            if (!this.He(this.je, e) || !this.Je(this.Ge[s++], e)) return !1;
            ++r;
          }
          for (; r < n.length; ++r) {
            const e = n[r];
            if (s >= this.Ge.length || !this.Je(this.Ge[s++], e)) return !1;
          }
          return !0;
        }
        ze(e) {
          for (const t of this.Qe) if (this.He(t, e)) return !0;
          return !1;
        }
        He(e, t) {
          if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
          var n = "array-contains" === e.op || "array-contains-any" === e.op;
          return (2 === t.kind) == n;
        }
        Je(e, t) {
          return (
            !!e.field.isEqual(t.fieldPath) &&
            ((0 === t.kind && "asc" === e.dir) ||
              (1 === t.kind && "desc" === e.dir))
          );
        }
      }
      class fu {
        constructor() {
          this.Ye = new gu();
        }
        addToCollectionParentIndex(e, t) {
          return this.Ye.add(t), es.resolve();
        }
        getCollectionParents(e, t) {
          return es.resolve(this.Ye.getEntries(t));
        }
        addFieldIndex(e, t) {
          return es.resolve();
        }
        deleteFieldIndex(e, t) {
          return es.resolve();
        }
        getDocumentsMatchingTarget(e, t) {
          return es.resolve(null);
        }
        getIndexType(e, t) {
          return es.resolve(0);
        }
        getFieldIndexes(e, t) {
          return es.resolve([]);
        }
        getNextCollectionGroupToUpdate(e) {
          return es.resolve(null);
        }
        getMinOffset(e, t) {
          return es.resolve(Wr.min());
        }
        getMinOffsetFromCollectionGroup(e, t) {
          return es.resolve(Wr.min());
        }
        updateCollectionGroup(e, t, n) {
          return es.resolve();
        }
        updateIndexEntries(e, t) {
          return es.resolve();
        }
      }
      class gu {
        constructor() {
          this.index = {};
        }
        add(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t] || new ws(Pr.comparator),
            s = !r.has(n);
          return (this.index[t] = r.add(n)), s;
        }
        has(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t];
          return r && r.has(n);
        }
        getEntries(e) {
          return (this.index[e] || new ws(Pr.comparator)).toArray();
        }
      }
      const mu = new Uint8Array(0);
      class pu {
        constructor(e, t) {
          (this.user = e),
            (this.databaseId = t),
            (this.Xe = new gu()),
            (this.Ze = new pa(
              (e) => ri(e),
              (e, t) => si(e, t)
            )),
            (this.uid = e.uid || "");
        }
        addToCollectionParentIndex(e, t) {
          if (this.Xe.has(t)) return es.resolve();
          var n = t.lastSegment(),
            r = t.popLast();
          e.addOnCommittedListener(() => {
            this.Xe.add(t);
          });
          r = { collectionId: n, parent: oo(r) };
          return yu(e).put(r);
        }
        getCollectionParents(e, n) {
          const r = [],
            t = IDBKeyRange.bound([n, ""], [Mr(n), ""], !1, !0);
          return yu(e)
            .W(t)
            .next((e) => {
              for (const t of e) {
                if (t.collectionId !== n) break;
                r.push(co(t.parent));
              }
              return r;
            });
        }
        addFieldIndex(e, t) {
          const n = wu(e),
            r = {
              indexId: t.indexId,
              collectionGroup: t.collectionGroup,
              fields: t.fields.map((e) => [
                e.fieldPath.canonicalString(),
                e.kind,
              ]),
            };
          delete r.indexId;
          const s = n.add(r);
          if (t.indexState) {
            const n = Iu(e);
            return s.next((e) => {
              n.put(
                Xo(
                  e,
                  this.user,
                  t.indexState.sequenceNumber,
                  t.indexState.offset
                )
              );
            });
          }
          return s.next();
        }
        deleteFieldIndex(e, t) {
          const n = wu(e),
            r = Iu(e),
            s = vu(e);
          return n
            .delete(t.indexId)
            .next(() =>
              r.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            )
            .next(() =>
              s.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            );
        }
        getDocumentsMatchingTarget(e, c) {
          const h = vu(e);
          let l = !0;
          const n = new Map();
          return es
            .forEach(this.tn(c), (t) =>
              this.en(e, t).next((e) => {
                (l = l && !!e), n.set(t, e);
              })
            )
            .next(() => {
              if (l) {
                let u = Sa();
                const l = [];
                return es
                  .forEach(n, (e, t) => {
                    gr(
                      "IndexedDbIndexManager",
                      `Using index ${
                        ((o = e),
                        `id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields
                          .map((e) => `${e.fieldPath}:${e.kind}`)
                          .join(",")}`)
                      } to execute ${ri(c)}`
                    );
                    var n = (function (e, t) {
                        var n = Gr(t);
                        if (void 0 === n) return null;
                        for (const t of ai(e, n.fieldPath))
                          switch (t.op) {
                            case "array-contains-any":
                              return t.value.arrayValue.values || [];
                            case "array-contains":
                              return [t.value];
                          }
                        return null;
                      })(t, e),
                      r = (function (e, t) {
                        const n = new Map();
                        for (const r of jr(t))
                          for (const t of ai(e, r.fieldPath))
                            switch (t.op) {
                              case "==":
                              case "in":
                                n.set(r.fieldPath.canonicalString(), t.value);
                                break;
                              case "not-in":
                              case "!=":
                                return (
                                  n.set(r.fieldPath.canonicalString(), t.value),
                                  Array.from(n.values())
                                );
                            }
                        return null;
                      })(t, e),
                      s = (function (e, t) {
                        const n = [];
                        let r = !0;
                        for (const s of jr(t)) {
                          const t = (0 === s.kind ? oi : ui)(
                            e,
                            s.fieldPath,
                            e.startAt
                          );
                          n.push(t.value), (r = r && t.inclusive);
                        }
                        return new vi(n, r);
                      })(t, e),
                      i = (function (e, t) {
                        const n = [];
                        let r = !0;
                        for (const s of jr(t)) {
                          const t = (0 === s.kind ? ui : oi)(
                            e,
                            s.fieldPath,
                            e.endAt
                          );
                          n.push(t.value), (r = r && t.inclusive);
                        }
                        return new vi(n, r);
                      })(t, e),
                      a = this.nn(e, t, s),
                      o = this.nn(e, t, i),
                      r = this.sn(e, t, r),
                      r = this.rn(
                        e.indexId,
                        n,
                        a,
                        s.inclusive,
                        o,
                        i.inclusive,
                        r
                      );
                    return es.forEach(r, (e) =>
                      h.J(e, c.limit).next((e) => {
                        e.forEach((e) => {
                          var t = qr.fromSegments(e.documentKey);
                          u.has(t) || ((u = u.add(t)), l.push(t));
                        });
                      })
                    );
                  })
                  .next(() => l);
              }
              return es.resolve(null);
            });
        }
        tn(e) {
          var t;
          return (t = this.Ze.get(e)) || (this.Ze.set(e, (t = [e])), t);
        }
        rn(t, e, n, r, s, i, a) {
          const o = (null != e ? e.length : 1) * Math.max(n.length, s.length),
            u = o / (null != e ? e.length : 1),
            c = [];
          for (let h = 0; h < o; ++h) {
            const o = e ? this.on(e[h / u]) : mu,
              l = this.un(t, o, n[h % u], r),
              d = this.cn(t, o, s[h % u], i),
              f = a.map((e) => this.un(t, o, e, !0));
            c.push(...this.createRange(l, d, f));
          }
          return c;
        }
        un(e, t, n, r) {
          const s = new cu(e, qr.empty(), t, n);
          return r ? s : s.Ke();
        }
        cn(e, t, n, r) {
          const s = new cu(e, qr.empty(), t, n);
          return r ? s.Ke() : s;
        }
        en(e, t) {
          const r = new du(t),
            n =
              null != t.collectionGroup
                ? t.collectionGroup
                : t.path.lastSegment();
          return this.getFieldIndexes(e, n).next((e) => {
            let t = null;
            for (const n of e)
              r.We(n) && (!t || n.fields.length > t.fields.length) && (t = n);
            return t;
          });
        }
        getIndexType(e, t) {
          let n = 2;
          return es
            .forEach(this.tn(t), (t) =>
              this.en(e, t).next((e) => {
                e
                  ? 0 !== n &&
                    e.fields.length <
                      (function (e) {
                        let t = new ws(Ur.comparator),
                          n = !1;
                        for (const r of e.filters) {
                          const e = r;
                          e.field.isKeyField() ||
                            ("array-contains" === e.op ||
                            "array-contains-any" === e.op
                              ? (n = !0)
                              : (t = t.add(e.field)));
                        }
                        for (const n of e.orderBy)
                          n.field.isKeyField() || (t = t.add(n.field));
                        return t.size + (n ? 1 : 0);
                      })(t) &&
                    (n = 1)
                  : (n = 0);
              })
            )
            .next(() => n);
        }
        an(e, t) {
          const n = new uu();
          for (const s of jr(e)) {
            const e = t.data.field(s.fieldPath);
            if (null == e) return null;
            var r = n.qe(s.kind);
            ru.Te.ce(e, r);
          }
          return n.$e();
        }
        on(e) {
          const t = new uu();
          return ru.Te.ce(e, t.qe(0)), t.$e();
        }
        hn(e, t) {
          const n = new uu();
          return (
            ru.Te.ce(
              Gs(this.databaseId, t),
              n.qe(0 === (r = jr(e)).length ? 0 : r[r.length - 1].kind)
            ),
            n.$e()
          );
          var r;
        }
        sn(e, t, n) {
          if (null === n) return [];
          let r = [];
          r.push(new uu());
          let s = 0;
          for (const i of jr(e)) {
            const e = n[s++];
            for (const n of r)
              if (this.ln(t, i.fieldPath) && $s(e)) r = this.fn(r, i, e);
              else {
                const t = n.qe(i.kind);
                ru.Te.ce(e, t);
              }
          }
          return this.dn(r);
        }
        nn(e, t, n) {
          return this.sn(e, t, n.position);
        }
        dn(e) {
          const t = [];
          for (let n = 0; n < e.length; ++n) t[n] = e[n].$e();
          return t;
        }
        fn(e, t, n) {
          const r = [...e],
            s = [];
          for (const e of n.arrayValue.values || [])
            for (const n of r) {
              const r = new uu();
              r.seed(n.$e()), ru.Te.ce(e, r.qe(t.kind)), s.push(r);
            }
          return s;
        }
        ln(e, t) {
          return !!e.filters.find(
            (e) =>
              e instanceof ci &&
              e.field.isEqual(t) &&
              ("in" === e.op || "not-in" === e.op)
          );
        }
        getFieldIndexes(e, t) {
          const n = wu(e),
            r = Iu(e);
          return (
            t ? n.W("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.W()
          ).next((e) => {
            const i = [];
            return es
              .forEach(e, (s) =>
                r.get([s.indexId, this.uid]).next((e) => {
                  var t, n, r;
                  i.push(
                    ((t = s),
                    (n = (e = e)
                      ? new Qr(
                          e.sequenceNumber,
                          new Wr(
                            jo(e.readTime),
                            new qr(co(e.documentKey)),
                            e.largestBatchId
                          )
                        )
                      : Qr.empty()),
                    (r = t.fields.map(
                      ([e, t]) => new $r(Ur.fromServerFormat(e), t)
                    )),
                    new Kr(t.indexId, t.collectionGroup, r, n))
                  );
                })
              )
              .next(() => i);
          });
        }
        getNextCollectionGroupToUpdate(e) {
          return this.getFieldIndexes(e).next((e) =>
            0 === e.length
              ? null
              : (e.sort((e, t) => {
                  var n =
                    e.indexState.sequenceNumber - t.indexState.sequenceNumber;
                  return 0 != n ? n : Rr(e.collectionGroup, t.collectionGroup);
                }),
                e[0].collectionGroup)
          );
        }
        updateCollectionGroup(e, n, r) {
          const s = wu(e),
            i = Iu(e);
          return this._n(e).next((t) =>
            s
              .W("collectionGroupIndex", IDBKeyRange.bound(n, n))
              .next((e) =>
                es.forEach(e, (e) => i.put(Xo(e.indexId, this.user, t, r)))
              )
          );
        }
        updateIndexEntries(s, e) {
          const n = new Map();
          return es.forEach(e, (t, r) => {
            var e = n.get(t.collectionGroup);
            return (
              e ? es.resolve(e) : this.getFieldIndexes(s, t.collectionGroup)
            ).next(
              (e) => (
                n.set(t.collectionGroup, e),
                es.forEach(e, (n) =>
                  this.wn(s, t, n).next((e) => {
                    var t = this.mn(r, n);
                    return e.isEqual(t) ? es.resolve() : this.gn(s, r, n, e, t);
                  })
                )
              )
            );
          });
        }
        yn(e, t, n, r) {
          return vu(e).put({
            indexId: r.indexId,
            uid: this.uid,
            arrayValue: r.arrayValue,
            directionalValue: r.directionalValue,
            orderedDocumentKey: this.hn(n, t.key),
            documentKey: t.key.path.toArray(),
          });
        }
        pn(e, t, n, r) {
          return vu(e).delete([
            r.indexId,
            this.uid,
            r.arrayValue,
            r.directionalValue,
            this.hn(n, t.key),
            t.key.path.toArray(),
          ]);
        }
        wn(e, n, r) {
          const t = vu(e);
          let s = new ws(hu);
          return t
            .Z(
              {
                index: "documentKeyIndex",
                range: IDBKeyRange.only([r.indexId, this.uid, this.hn(r, n)]),
              },
              (e, t) => {
                s = s.add(
                  new cu(r.indexId, n, t.arrayValue, t.directionalValue)
                );
              }
            )
            .next(() => s);
        }
        mn(e, t) {
          let n = new ws(hu);
          var r = this.an(t, e);
          if (null == r) return n;
          const s = Gr(t);
          if (null != s) {
            var i = e.data.field(s.fieldPath);
            if ($s(i))
              for (const s of i.arrayValue.values || [])
                n = n.add(new cu(t.indexId, e.key, this.on(s), r));
          } else n = n.add(new cu(t.indexId, e.key, mu, r));
          return n;
        }
        gn(t, n, r, c, e) {
          gr(
            "IndexedDbIndexManager",
            "Updating index entries for document '%s'",
            n.key
          );
          const s = [];
          return (
            (function (e, n, r, s) {
              var i = c.getIterator(),
                a = e.getIterator();
              let o = bs(i),
                u = bs(a);
              for (; o || u; ) {
                let e = !1,
                  t = !1;
                if (o && u) {
                  const r = n(o, u);
                  r < 0 ? (t = !0) : 0 < r && (e = !0);
                } else null != o ? (t = !0) : (e = !0);
                e
                  ? (r(u), (u = bs(a)))
                  : t
                  ? (s(o), (o = bs(i)))
                  : ((o = bs(i)), (u = bs(a)));
              }
            })(
              e,
              hu,
              (e) => {
                s.push(this.yn(t, n, r, e));
              },
              (e) => {
                s.push(this.pn(t, n, r, e));
              }
            ),
            es.waitFor(s)
          );
        }
        _n(e) {
          let r = 1;
          return Iu(e)
            .Z(
              {
                index: "sequenceNumberIndex",
                reverse: !0,
                range: IDBKeyRange.upperBound([
                  this.uid,
                  Number.MAX_SAFE_INTEGER,
                ]),
              },
              (e, t, n) => {
                n.done(), (r = t.sequenceNumber + 1);
              }
            )
            .next(() => r);
        }
        createRange(e, t, n) {
          n = n
            .sort((e, t) => hu(e, t))
            .filter((e, t, n) => !t || 0 !== hu(e, n[t - 1]));
          const r = [];
          r.push(e);
          for (const s of n) {
            const n = hu(s, e),
              i = hu(s, t);
            if (0 === n) r[0] = e.Ke();
            else if (0 < n && i < 0) r.push(s), r.push(s.Ke());
            else if (0 < i) break;
          }
          r.push(t);
          const s = [];
          for (let a = 0; a < r.length; a += 2)
            s.push(
              IDBKeyRange.bound(
                [
                  r[a].indexId,
                  this.uid,
                  r[a].arrayValue,
                  r[a].directionalValue,
                  mu,
                  [],
                ],
                [
                  r[a + 1].indexId,
                  this.uid,
                  r[a + 1].arrayValue,
                  r[a + 1].directionalValue,
                  mu,
                  [],
                ]
              )
            );
          return s;
        }
        getMinOffsetFromCollectionGroup(e, t) {
          return this.getFieldIndexes(e, t).next(bu);
        }
        getMinOffset(t, e) {
          return es
            .mapArray(this.tn(e), (e) => this.en(t, e).next((e) => e || vr()))
            .next(bu);
        }
      }
      function yu(e) {
        return Oo(e, "collectionParents");
      }
      function vu(e) {
        return Oo(e, "indexEntries");
      }
      function wu(e) {
        return Oo(e, "indexConfiguration");
      }
      function Iu(e) {
        return Oo(e, "indexState");
      }
      function bu(e) {
        wr(0 !== e.length);
        let t = e[0].indexState.offset,
          n = t.largestBatchId;
        for (let s = 1; s < e.length; s++) {
          var r = e[s].indexState.offset;
          Yr(r, t) < 0 && (t = r),
            n < r.largestBatchId && (n = r.largestBatchId);
        }
        return new Wr(t.readTime, t.documentKey, n);
      }
      const Eu = {
        didRun: !1,
        sequenceNumbersCollected: 0,
        targetsRemoved: 0,
        documentsRemoved: 0,
      };
      class Tu {
        constructor(e, t, n) {
          (this.cacheSizeCollectionThreshold = e),
            (this.percentileToCollect = t),
            (this.maximumSequenceNumbersToCollect = n);
        }
        static withCacheSize(e) {
          return new Tu(
            e,
            Tu.DEFAULT_COLLECTION_PERCENTILE,
            Tu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
          );
        }
      }
      function Su(e, t, n) {
        const r = e.store("mutations"),
          s = e.store("documentMutations"),
          i = [],
          a = IDBKeyRange.only(n.batchId);
        let o = 0;
        const u = r.Z({ range: a }, (e, t, n) => (o++, n.delete()));
        i.push(
          u.next(() => {
            wr(1 === o);
          })
        );
        const c = [];
        for (const e of n.mutations) {
          const r = fo(t, e.key.path, n.batchId);
          i.push(s.delete(r)), c.push(e.key);
        }
        return es.waitFor(i).next(() => c);
      }
      function _u(e) {
        if (!e) return 0;
        let t;
        if (e.document) t = e.document;
        else if (e.unknownDocument) t = e.unknownDocument;
        else {
          if (!e.noDocument) throw vr();
          t = e.noDocument;
        }
        return JSON.stringify(t).length;
      }
      (Tu.DEFAULT_COLLECTION_PERCENTILE = 10),
        (Tu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
        (Tu.DEFAULT = new Tu(
          41943040,
          Tu.DEFAULT_COLLECTION_PERCENTILE,
          Tu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
        )),
        (Tu.DISABLED = new Tu(-1, 0, 0));
      class xu {
        constructor(e, t, n, r) {
          (this.userId = e),
            (this.It = t),
            (this.indexManager = n),
            (this.referenceDelegate = r),
            (this.In = {});
        }
        static oe(e, t, n, r) {
          wr("" !== e.uid);
          var s = e.isAuthenticated() ? e.uid : "";
          return new xu(s, t, n, r);
        }
        checkEmpty(e) {
          let r = !0;
          var t = IDBKeyRange.bound(
            [this.userId, Number.NEGATIVE_INFINITY],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Au(e)
            .Z({ index: "userMutationsIndex", range: t }, (e, t, n) => {
              (r = !1), n.done();
            })
            .next(() => r);
        }
        addMutationBatch(h, l, d, f) {
          const g = Cu(h),
            m = Au(h);
          return m.add({}).next((e) => {
            wr("number" == typeof e);
            const t = new Vo(e, l, d, f),
              n =
                ((s = this.It),
                (i = this.userId),
                (a = t),
                (o = a.baseMutations.map((e) => Xa(s.re, e))),
                (u = a.mutations.map((e) => Xa(s.re, e))),
                {
                  userId: i,
                  batchId: a.batchId,
                  localWriteTimeMs: a.localWriteTime.toMillis(),
                  baseMutations: o,
                  mutations: u,
                }),
              r = [];
            var s, i, a, o, u;
            let c = new ws((e, t) =>
              Rr(e.canonicalString(), t.canonicalString())
            );
            for (const h of f) {
              const l = fo(this.userId, h.key.path, e);
              (c = c.add(h.key.path.popLast())),
                r.push(m.put(n)),
                r.push(g.put(l, go));
            }
            return (
              c.forEach((e) => {
                r.push(this.indexManager.addToCollectionParentIndex(h, e));
              }),
              h.addOnCommittedListener(() => {
                this.In[e] = t.keys();
              }),
              es.waitFor(r).next(() => t)
            );
          });
        }
        lookupMutationBatch(e, t) {
          return Au(e)
            .get(t)
            .next((e) =>
              e ? (wr(e.userId === this.userId), $o(this.It, e)) : null
            );
        }
        Tn(e, n) {
          return this.In[n]
            ? es.resolve(this.In[n])
            : this.lookupMutationBatch(e, n).next((e) => {
                if (e) {
                  var t = e.keys();
                  return (this.In[n] = t);
                }
                return null;
              });
        }
        getNextMutationBatchAfterBatchId(e, t) {
          const r = t + 1,
            n = IDBKeyRange.lowerBound([this.userId, r]);
          let s = null;
          return Au(e)
            .Z({ index: "userMutationsIndex", range: n }, (e, t, n) => {
              t.userId === this.userId &&
                (wr(t.batchId >= r), (s = $o(this.It, t))),
                n.done();
            })
            .next(() => s);
        }
        getHighestUnacknowledgedBatchId(e) {
          var t = IDBKeyRange.upperBound([
            this.userId,
            Number.POSITIVE_INFINITY,
          ]);
          let r = -1;
          return Au(e)
            .Z(
              { index: "userMutationsIndex", range: t, reverse: !0 },
              (e, t, n) => {
                (r = t.batchId), n.done();
              }
            )
            .next(() => r);
        }
        getAllMutationBatches(e) {
          var t = IDBKeyRange.bound(
            [this.userId, -1],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Au(e)
            .W("userMutationsIndex", t)
            .next((e) => e.map((e) => $o(this.It, e)));
        }
        getAllMutationBatchesAffectingDocumentKey(a, o) {
          const e = lo(this.userId, o.path),
            t = IDBKeyRange.lowerBound(e),
            u = [];
          return Cu(a)
            .Z({ range: t }, (e, t, n) => {
              var [r, s, i] = e,
                s = co(s);
              if (r === this.userId && o.path.isEqual(s))
                return Au(a)
                  .get(i)
                  .next((e) => {
                    if (!e) throw vr();
                    wr(e.userId === this.userId), u.push($o(this.It, e));
                  });
              n.done();
            })
            .next(() => u);
        }
        getAllMutationBatchesAffectingDocumentKeys(t, e) {
          let o = new ws(Rr);
          const n = [];
          return (
            e.forEach((a) => {
              var e = lo(this.userId, a.path),
                e = IDBKeyRange.lowerBound(e),
                e = Cu(t).Z({ range: e }, (e, t, n) => {
                  var [r, s, i] = e,
                    s = co(s);
                  r === this.userId && a.path.isEqual(s)
                    ? (o = o.add(i))
                    : n.done();
                });
              n.push(e);
            }),
            es.waitFor(n).next(() => this.En(t, o))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const a = t.path,
            o = a.length + 1,
            n = lo(this.userId, a),
            r = IDBKeyRange.lowerBound(n);
          let u = new ws(Rr);
          return Cu(e)
            .Z({ range: r }, (e, t, n) => {
              var [r, s, i] = e,
                s = co(s);
              r === this.userId && a.isPrefixOf(s)
                ? s.length === o && (u = u.add(i))
                : n.done();
            })
            .next(() => this.En(e, u));
        }
        En(t, e) {
          const n = [],
            r = [];
          return (
            e.forEach((e) => {
              r.push(
                Au(t)
                  .get(e)
                  .next((e) => {
                    if (null === e) throw vr();
                    wr(e.userId === this.userId), n.push($o(this.It, e));
                  })
              );
            }),
            es.waitFor(r).next(() => n)
          );
        }
        removeMutationBatch(t, n) {
          return Su(t.ie, this.userId, n).next(
            (e) => (
              t.addOnCommittedListener(() => {
                this.An(n.batchId);
              }),
              es.forEach(e, (e) =>
                this.referenceDelegate.markPotentiallyOrphaned(t, e)
              )
            )
          );
        }
        An(e) {
          delete this.In[e];
        }
        performConsistencyCheck(n) {
          return this.checkEmpty(n).next((e) => {
            if (!e) return es.resolve();
            var t = IDBKeyRange.lowerBound([this.userId]);
            const r = [];
            return Cu(n)
              .Z({ range: t }, (e, t, n) => {
                if (e[0] === this.userId) {
                  const t = co(e[1]);
                  r.push(t);
                } else n.done();
              })
              .next(() => {
                wr(0 === r.length);
              });
          });
        }
        containsKey(e, t) {
          return Du(e, this.userId, t);
        }
        Rn(e) {
          return Nu(e)
            .get(this.userId)
            .next(
              (e) =>
                e || {
                  userId: this.userId,
                  lastAcknowledgedBatchId: -1,
                  lastStreamToken: "",
                }
            );
        }
      }
      function Du(e, i, t) {
        const n = lo(i, t.path),
          a = n[1],
          r = IDBKeyRange.lowerBound(n);
        let o = !1;
        return Cu(e)
          .Z({ range: r, X: !0 }, (e, t, n) => {
            var [r, s] = e;
            r === i && s === a && (o = !0), n.done();
          })
          .next(() => o);
      }
      function Au(e) {
        return Oo(e, "mutations");
      }
      function Cu(e) {
        return Oo(e, "documentMutations");
      }
      function Nu(e) {
        return Oo(e, "mutationQueues");
      }
      class ku {
        constructor(e) {
          this.bn = e;
        }
        next() {
          return (this.bn += 2), this.bn;
        }
        static Pn() {
          return new ku(0);
        }
        static vn() {
          return new ku(-1);
        }
      }
      class Ru {
        constructor(e, t) {
          (this.referenceDelegate = e), (this.It = t);
        }
        allocateTargetId(n) {
          return this.Vn(n).next((e) => {
            const t = new ku(e.highestTargetId);
            return (
              (e.highestTargetId = t.next()),
              this.Sn(n, e).next(() => e.highestTargetId)
            );
          });
        }
        getLastRemoteSnapshotVersion(e) {
          return this.Vn(e).next((e) =>
            Vr.fromTimestamp(
              new Or(
                e.lastRemoteSnapshotVersion.seconds,
                e.lastRemoteSnapshotVersion.nanoseconds
              )
            )
          );
        }
        getHighestSequenceNumber(e) {
          return this.Vn(e).next((e) => e.highestListenSequenceNumber);
        }
        setTargetsMetadata(t, n, r) {
          return this.Vn(t).next(
            (e) => (
              (e.highestListenSequenceNumber = n),
              r && (e.lastRemoteSnapshotVersion = r.toTimestamp()),
              n > e.highestListenSequenceNumber &&
                (e.highestListenSequenceNumber = n),
              this.Sn(t, e)
            )
          );
        }
        addTargetData(t, n) {
          return this.Dn(t, n).next(() =>
            this.Vn(t).next(
              (e) => ((e.targetCount += 1), this.Cn(n, e), this.Sn(t, e))
            )
          );
        }
        updateTargetData(e, t) {
          return this.Dn(e, t);
        }
        removeTargetData(t, e) {
          return this.removeMatchingKeysForTargetId(t, e.targetId)
            .next(() => Lu(t).delete(e.targetId))
            .next(() => this.Vn(t))
            .next(
              (e) => (wr(0 < e.targetCount), --e.targetCount, this.Sn(t, e))
            );
        }
        removeTargets(r, s, i) {
          let a = 0;
          const o = [];
          return Lu(r)
            .Z((e, t) => {
              var n = Qo(t);
              n.sequenceNumber <= s &&
                null === i.get(n.targetId) &&
                (a++, o.push(this.removeTargetData(r, n)));
            })
            .next(() => es.waitFor(o))
            .next(() => a);
        }
        forEachTarget(e, r) {
          return Lu(e).Z((e, t) => {
            var n = Qo(t);
            r(n);
          });
        }
        Vn(e) {
          return Mu(e)
            .get("targetGlobalKey")
            .next((e) => (wr(null !== e), e));
        }
        Sn(e, t) {
          return Mu(e).put("targetGlobalKey", t);
        }
        Dn(e, t) {
          return Lu(e).put(zo(this.It, t));
        }
        Cn(e, t) {
          let n = !1;
          return (
            e.targetId > t.highestTargetId &&
              ((t.highestTargetId = e.targetId), (n = !0)),
            e.sequenceNumber > t.highestListenSequenceNumber &&
              ((t.highestListenSequenceNumber = e.sequenceNumber), (n = !0)),
            n
          );
        }
        getTargetCount(e) {
          return this.Vn(e).next((e) => e.targetCount);
        }
        getTargetData(e, s) {
          var t = ri(s),
            t = IDBKeyRange.bound(
              [t, Number.NEGATIVE_INFINITY],
              [t, Number.POSITIVE_INFINITY]
            );
          let i = null;
          return Lu(e)
            .Z({ range: t, index: "queryTargetsIndex" }, (e, t, n) => {
              var r = Qo(t);
              si(s, r.target) && ((i = r), n.done());
            })
            .next(() => i);
        }
        addMatchingKeys(n, e, r) {
          const s = [],
            i = Ou(n);
          return (
            e.forEach((e) => {
              var t = oo(e.path);
              s.push(i.put({ targetId: r, path: t })),
                s.push(this.referenceDelegate.addReference(n, r, e));
            }),
            es.waitFor(s)
          );
        }
        removeMatchingKeys(n, e, r) {
          const s = Ou(n);
          return es.forEach(e, (e) => {
            var t = oo(e.path);
            return es.waitFor([
              s.delete([r, t]),
              this.referenceDelegate.removeReference(n, r, e),
            ]);
          });
        }
        removeMatchingKeysForTargetId(e, t) {
          const n = Ou(e),
            r = IDBKeyRange.bound([t], [t + 1], !1, !0);
          return n.delete(r);
        }
        getMatchingKeysForTargetId(e, t) {
          const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
            r = Ou(e);
          let s = Sa();
          return r
            .Z({ range: n, X: !0 }, (e, t, n) => {
              var r = co(e[1]),
                r = new qr(r);
              s = s.add(r);
            })
            .next(() => s);
        }
        containsKey(e, t) {
          var n = oo(t.path),
            n = IDBKeyRange.bound([n], [Mr(n)], !1, !0);
          let r = 0;
          return Ou(e)
            .Z(
              { index: "documentTargetsIndex", X: !0, range: n },
              ([e], t, n) => {
                0 !== e && (r++, n.done());
              }
            )
            .next(() => 0 < r);
        }
        se(e, t) {
          return Lu(e)
            .get(t)
            .next((e) => (e ? Qo(e) : null));
        }
      }
      function Lu(e) {
        return Oo(e, "targets");
      }
      function Mu(e) {
        return Oo(e, "targetGlobal");
      }
      function Ou(e) {
        return Oo(e, "targetDocuments");
      }
      function Vu([e, t], [n, r]) {
        var s = Rr(e, n);
        return 0 === s ? Rr(t, r) : s;
      }
      class Fu {
        constructor(e) {
          (this.xn = e), (this.buffer = new ws(Vu)), (this.Nn = 0);
        }
        kn() {
          return ++this.Nn;
        }
        On(e) {
          var t = [e, this.kn()];
          if (this.buffer.size < this.xn) this.buffer = this.buffer.add(t);
          else {
            const e = this.buffer.last();
            Vu(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
          }
        }
        get maxValue() {
          return this.buffer.last()[0];
        }
      }
      class Pu {
        constructor(e, t, n) {
          (this.garbageCollector = e),
            (this.asyncQueue = t),
            (this.localStore = n),
            (this.Mn = null);
        }
        start() {
          -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
            this.Fn(6e4);
        }
        stop() {
          this.Mn && (this.Mn.cancel(), (this.Mn = null));
        }
        get started() {
          return null !== this.Mn;
        }
        Fn(e) {
          gr("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`),
            (this.Mn = this.asyncQueue.enqueueAfterDelay(
              "lru_garbage_collection",
              e,
              async () => {
                this.Mn = null;
                try {
                  await this.localStore.collectGarbage(this.garbageCollector);
                } catch (e) {
                  is(e)
                    ? gr(
                        "LruGarbageCollector",
                        "Ignoring IndexedDB error during garbage collection: ",
                        e
                      )
                    : await Zr(e);
                }
                await this.Fn(3e5);
              }
            ));
        }
      }
      class Bu {
        constructor(e, t) {
          (this.$n = e), (this.params = t);
        }
        calculateTargetCount(e, t) {
          return this.$n.Bn(e).next((e) => Math.floor((t / 100) * e));
        }
        nthSequenceNumber(e, t) {
          if (0 === t) return es.resolve(ds.at);
          const n = new Fu(t);
          return this.$n
            .forEachTarget(e, (e) => n.On(e.sequenceNumber))
            .next(() => this.$n.Ln(e, (e) => n.On(e)))
            .next(() => n.maxValue);
        }
        removeTargets(e, t, n) {
          return this.$n.removeTargets(e, t, n);
        }
        removeOrphanedDocuments(e, t) {
          return this.$n.removeOrphanedDocuments(e, t);
        }
        collect(t, n) {
          return -1 === this.params.cacheSizeCollectionThreshold
            ? (gr(
                "LruGarbageCollector",
                "Garbage collection skipped; disabled"
              ),
              es.resolve(Eu))
            : this.getCacheSize(t).next((e) =>
                e < this.params.cacheSizeCollectionThreshold
                  ? (gr(
                      "LruGarbageCollector",
                      `Garbage collection skipped; Cache size ${e} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
                    ),
                    Eu)
                  : this.Un(t, n)
              );
        }
        getCacheSize(e) {
          return this.$n.getCacheSize(e);
        }
        Un(t, n) {
          let r, s, i, a, o, u, c;
          const h = Date.now();
          return this.calculateTargetCount(t, this.params.percentileToCollect)
            .next(
              (e) => (
                (s =
                  e > this.params.maximumSequenceNumbersToCollect
                    ? (gr(
                        "LruGarbageCollector",
                        `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`
                      ),
                      this.params.maximumSequenceNumbersToCollect)
                    : e),
                (a = Date.now()),
                this.nthSequenceNumber(t, s)
              )
            )
            .next(
              (e) => ((r = e), (o = Date.now()), this.removeTargets(t, r, n))
            )
            .next(
              (e) => (
                (i = e), (u = Date.now()), this.removeOrphanedDocuments(t, r)
              )
            )
            .next(
              (e) => (
                (c = Date.now()),
                fr() <= l.DEBUG &&
                  gr(
                    "LruGarbageCollector",
                    `LRU Garbage Collection\n\tCounted targets in ${
                      a - h
                    }ms\n\tDetermined least recently used ${s} in ` +
                      (o - a) +
                      "ms\n" +
                      `\tRemoved ${i} targets in ` +
                      (u - o) +
                      "ms\n" +
                      `\tRemoved ${e} documents in ` +
                      (c - u) +
                      "ms\n" +
                      `Total Duration: ${c - h}ms`
                  ),
                es.resolve({
                  didRun: !0,
                  sequenceNumbersCollected: s,
                  targetsRemoved: i,
                  documentsRemoved: e,
                })
              )
            );
        }
      }
      class Uu {
        constructor(e, t) {
          (this.db = e),
            (this.garbageCollector = ((e = this), (t = t), new Bu(e, t)));
        }
        Bn(e) {
          const n = this.qn(e);
          return this.db
            .getTargetCache()
            .getTargetCount(e)
            .next((t) => n.next((e) => t + e));
        }
        qn(e) {
          let t = 0;
          return this.Ln(e, (e) => {
            t++;
          }).next(() => t);
        }
        forEachTarget(e, t) {
          return this.db.getTargetCache().forEachTarget(e, t);
        }
        Ln(e, n) {
          return this.Kn(e, (e, t) => n(t));
        }
        addReference(e, t, n) {
          return qu(e, n);
        }
        removeReference(e, t, n) {
          return qu(e, n);
        }
        removeTargets(e, t, n) {
          return this.db.getTargetCache().removeTargets(e, t, n);
        }
        markPotentiallyOrphaned(e, t) {
          return qu(e, t);
        }
        Gn(t, n) {
          let r = !1;
          return Nu(t)
            .tt((e) => Du(t, e, n).next((e) => (e && (r = !0), es.resolve(!e))))
            .next(() => r);
        }
        removeOrphanedDocuments(n, r) {
          const s = this.db.getRemoteDocumentCache().newChangeBuffer(),
            i = [];
          let a = 0;
          return this.Kn(n, (t, e) => {
            if (e <= r) {
              const r = this.Gn(n, t).next((e) => {
                if (!e)
                  return (
                    a++,
                    s
                      .getEntry(n, t)
                      .next(
                        () => (
                          s.removeEntry(t, Vr.min()),
                          Ou(n).delete([0, oo(t.path)])
                        )
                      )
                  );
              });
              i.push(r);
            }
          })
            .next(() => es.waitFor(i))
            .next(() => s.apply(n))
            .next(() => a);
        }
        removeTarget(e, t) {
          var n = t.withSequenceNumber(e.currentSequenceNumber);
          return this.db.getTargetCache().updateTargetData(e, n);
        }
        updateLimboDocument(e, t) {
          return qu(e, t);
        }
        Kn(e, r) {
          const t = Ou(e);
          let s,
            i = ds.at;
          return t
            .Z(
              { index: "documentTargetsIndex" },
              ([e], { path: t, sequenceNumber: n }) => {
                0 === e
                  ? (i !== ds.at && r(new qr(co(s)), i), (i = n), (s = t))
                  : (i = ds.at);
              }
            )
            .next(() => {
              i !== ds.at && r(new qr(co(s)), i);
            });
        }
        getCacheSize(e) {
          return this.db.getRemoteDocumentCache().getSize(e);
        }
      }
      function qu(e, t) {
        return Ou(e).put(
          ((e = e.currentSequenceNumber),
          { targetId: 0, path: oo(t.path), sequenceNumber: e })
        );
      }
      class Ku {
        constructor() {
          (this.changes = new pa(
            (e) => e.toString(),
            (e, t) => e.isEqual(t)
          )),
            (this.changesApplied = !1);
        }
        addEntry(e) {
          this.assertNotApplied(), this.changes.set(e.key, e);
        }
        removeEntry(e, t) {
          this.assertNotApplied(),
            this.changes.set(e, ei.newInvalidDocument(e).setReadTime(t));
        }
        getEntry(e, t) {
          this.assertNotApplied();
          var n = this.changes.get(t);
          return void 0 !== n ? es.resolve(n) : this.getFromCache(e, t);
        }
        getEntries(e, t) {
          return this.getAllFromCache(e, t);
        }
        apply(e) {
          return (
            this.assertNotApplied(),
            (this.changesApplied = !0),
            this.applyChanges(e)
          );
        }
        assertNotApplied() {}
      }
      class Gu {
        constructor(e) {
          this.It = e;
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t, n) {
          return zu(e).put(n);
        }
        removeEntry(e, n, t) {
          return zu(e).delete(
            (function (e) {
              const t = n.path.toArray();
              return [
                t.slice(0, t.length - 2),
                t[t.length - 2],
                Ko(e),
                t[t.length - 1],
              ];
            })(t)
          );
        }
        updateMetadata(t, n) {
          return this.getMetadata(t).next(
            (e) => ((e.byteSize += n), this.Qn(t, e))
          );
        }
        getEntry(e, n) {
          let r = ei.newInvalidDocument(n);
          return zu(e)
            .Z(
              { index: "documentKeyIndex", range: IDBKeyRange.only(Hu(n)) },
              (e, t) => {
                r = this.jn(n, t);
              }
            )
            .next(() => r);
        }
        Wn(e, n) {
          let r = { size: 0, document: ei.newInvalidDocument(n) };
          return zu(e)
            .Z(
              { index: "documentKeyIndex", range: IDBKeyRange.only(Hu(n)) },
              (e, t) => {
                r = { document: this.jn(n, t), size: _u(t) };
              }
            )
            .next(() => r);
        }
        getEntries(e, t) {
          let r = ya;
          return this.zn(e, t, (e, t) => {
            var n = this.jn(e, t);
            r = r.insert(e, n);
          }).next(() => r);
        }
        Hn(e, t) {
          let r = ya,
            s = new ps(qr.comparator);
          return this.zn(e, t, (e, t) => {
            var n = this.jn(e, t);
            (r = r.insert(e, n)), (s = s.insert(e, _u(t)));
          }).next(() => ({ documents: r, Jn: s }));
        }
        zn(e, t, s) {
          if (t.isEmpty()) return es.resolve();
          let n = new ws(Yu);
          t.forEach((e) => (n = n.add(e)));
          const r = IDBKeyRange.bound(Hu(n.first()), Hu(n.last())),
            i = n.getIterator();
          let a = i.getNext();
          return zu(e)
            .Z({ index: "documentKeyIndex", range: r }, (e, t, n) => {
              for (
                var r = qr.fromSegments([
                  ...t.prefixPath,
                  t.collectionGroup,
                  t.documentId,
                ]);
                a && Yu(a, r) < 0;

              )
                s(a, null), (a = i.getNext());
              a &&
                a.isEqual(r) &&
                (s(a, t), (a = i.hasNext() ? i.getNext() : null)),
                a ? n.j(Hu(a)) : n.done();
            })
            .next(() => {
              for (; a; ) s(a, null), (a = i.hasNext() ? i.getNext() : null);
            });
        }
        getAllFromCollection(e, t, n) {
          var r = [
              t.popLast().toArray(),
              t.lastSegment(),
              Ko(n.readTime),
              n.documentKey.path.isEmpty()
                ? ""
                : n.documentKey.path.lastSegment(),
            ],
            s = [
              t.popLast().toArray(),
              t.lastSegment(),
              [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
              "",
            ];
          return zu(e)
            .W(IDBKeyRange.bound(r, s, !0))
            .next((e) => {
              let t = ya;
              for (const n of e) {
                const e = this.jn(
                  qr.fromSegments(
                    n.prefixPath.concat(n.collectionGroup, n.documentId)
                  ),
                  n
                );
                t = t.insert(e.key, e);
              }
              return t;
            });
        }
        getAllFromCollectionGroup(e, t, n, s) {
          let i = ya;
          var r = Wu(t, n),
            a = Wu(t, Wr.max());
          return zu(e)
            .Z(
              {
                index: "collectionGroupIndex",
                range: IDBKeyRange.bound(r, a, !0),
              },
              (e, t, n) => {
                var r = this.jn(
                  qr.fromSegments(
                    t.prefixPath.concat(t.collectionGroup, t.documentId)
                  ),
                  t
                );
                (i = i.insert(r.key, r)), i.size === s && n.done();
              }
            )
            .next(() => i);
        }
        newChangeBuffer(e) {
          return new $u(this, !!e && e.trackRemovals);
        }
        getSize(e) {
          return this.getMetadata(e).next((e) => e.byteSize);
        }
        getMetadata(e) {
          return Qu(e)
            .get("remoteDocumentGlobalKey")
            .next((e) => (wr(!!e), e));
        }
        Qn(e, t) {
          return Qu(e).put("remoteDocumentGlobalKey", t);
        }
        jn(e, t) {
          if (t) {
            const e = (function (e, t) {
              let n;
              if (t.document)
                n = Ya(e.re, t.document, !!t.hasCommittedMutations);
              else if (t.noDocument) {
                const e = qr.fromSegments(t.noDocument.path),
                  s = jo(t.noDocument.readTime);
                (n = ei.newNoDocument(e, s)),
                  t.hasCommittedMutations && n.setHasCommittedMutations();
              } else {
                if (!t.unknownDocument) return vr();
                {
                  const e = qr.fromSegments(t.unknownDocument.path),
                    i = jo(t.unknownDocument.version);
                  n = ei.newUnknownDocument(e, i);
                }
              }
              return (
                t.readTime &&
                  n.setReadTime(
                    ((t = t.readTime),
                    (r = new Or(t[0], t[1])),
                    Vr.fromTimestamp(r))
                  ),
                n
              );
              var r;
            })(this.It, t);
            if (!e.isNoDocument() || !e.version.isEqual(Vr.min())) return e;
          }
          return ei.newInvalidDocument(e);
        }
      }
      function ju(e) {
        return new Gu(e);
      }
      class $u extends Ku {
        constructor(e, t) {
          super(),
            (this.Yn = e),
            (this.trackRemovals = t),
            (this.Xn = new pa(
              (e) => e.toString(),
              (e, t) => e.isEqual(t)
            ));
        }
        applyChanges(i) {
          const a = [];
          let o = 0,
            u = new ws((e, t) => Rr(e.canonicalString(), t.canonicalString()));
          return (
            this.changes.forEach((e, t) => {
              var n = this.Xn.get(e);
              if (
                (a.push(this.Yn.removeEntry(i, e, n.readTime)),
                t.isValidDocument())
              ) {
                var r = qo(this.Yn.It, t);
                u = u.add(e.path.popLast());
                var s = _u(r);
                (o += s - n.size), a.push(this.Yn.addEntry(i, e, r));
              } else if (((o -= n.size), this.trackRemovals)) {
                const o = qo(this.Yn.It, t.convertToNoDocument(Vr.min()));
                a.push(this.Yn.addEntry(i, e, o));
              }
            }),
            u.forEach((e) => {
              a.push(this.Yn.indexManager.addToCollectionParentIndex(i, e));
            }),
            a.push(this.Yn.updateMetadata(i, o)),
            es.waitFor(a)
          );
        }
        getFromCache(e, t) {
          return this.Yn.Wn(e, t).next(
            (e) => (
              this.Xn.set(t, { size: e.size, readTime: e.document.readTime }),
              e.document
            )
          );
        }
        getAllFromCache(e, t) {
          return this.Yn.Hn(e, t).next(
            ({ documents: n, Jn: e }) => (
              e.forEach((e, t) => {
                this.Xn.set(e, { size: t, readTime: n.get(e).readTime });
              }),
              n
            )
          );
        }
      }
      function Qu(e) {
        return Oo(e, "remoteDocumentGlobal");
      }
      function zu(e) {
        return Oo(e, "remoteDocumentsV14");
      }
      function Hu(e) {
        const t = e.path.toArray();
        return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]];
      }
      function Wu(e, t) {
        const n = t.documentKey.path.toArray();
        return [
          e,
          Ko(t.readTime),
          n.slice(0, n.length - 2),
          0 < n.length ? n[n.length - 1] : "",
        ];
      }
      function Yu(e, t) {
        var n = e.path.toArray(),
          r = t.path.toArray();
        let s = 0;
        for (let i = 0; i < n.length - 2 && i < r.length - 2; ++i)
          if (((s = Rr(n[i], r[i])), s)) return s;
        return (
          (s = Rr(n.length, r.length)),
          s ||
            ((s = Rr(n[n.length - 2], r[r.length - 2])),
            s || Rr(n[n.length - 1], r[r.length - 1]))
        );
      }
      class Xu {
        constructor(e, t) {
          (this.overlayedDocument = e), (this.mutatedFields = t);
        }
      }
      class Ju {
        constructor(e, t, n, r) {
          (this.remoteDocumentCache = e),
            (this.mutationQueue = t),
            (this.documentOverlayCache = n),
            (this.indexManager = r);
        }
        getDocument(t, n) {
          let r = null;
          return this.documentOverlayCache
            .getOverlay(t, n)
            .next((e) => ((r = e), this.getBaseDocument(t, n, r)))
            .next(
              (e) => (null !== r && sa(r.mutation, e, Es.empty(), Or.now()), e)
            );
        }
        getDocuments(t, e) {
          return this.remoteDocumentCache
            .getEntries(t, e)
            .next((e) =>
              this.getLocalViewOfDocuments(t, e, Sa()).next(() => e)
            );
        }
        getLocalViewOfDocuments(e, t, n = Sa()) {
          const r = ba();
          return this.populateOverlays(e, r, t).next(() =>
            this.computeViews(e, t, r, n).next((e) => {
              let n = wa();
              return (
                e.forEach((e, t) => {
                  n = n.insert(e, t.overlayedDocument);
                }),
                n
              );
            })
          );
        }
        getOverlayedDocuments(e, t) {
          const n = ba();
          return this.populateOverlays(e, n, t).next(() =>
            this.computeViews(e, t, n, Sa())
          );
        }
        populateOverlays(e, n, t) {
          const r = [];
          return (
            t.forEach((e) => {
              n.has(e) || r.push(e);
            }),
            this.documentOverlayCache.getOverlays(e, r).next((e) => {
              e.forEach((e, t) => {
                n.set(e, t);
              });
            })
          );
        }
        computeViews(e, t, r, s) {
          let i = ya;
          const a = ba(),
            o = ba();
          return (
            t.forEach((e, t) => {
              const n = r.get(t.key);
              s.has(t.key) && (void 0 === n || n.mutation instanceof oa)
                ? (i = i.insert(t.key, t))
                : void 0 !== n &&
                  (a.set(t.key, n.mutation.getFieldMask()),
                  sa(n.mutation, t, n.mutation.getFieldMask(), Or.now()));
            }),
            this.recalculateAndSaveOverlays(e, i).next(
              (e) => (
                e.forEach((e, t) => a.set(e, t)),
                t.forEach((e, t) => {
                  var n;
                  return o.set(
                    e,
                    new Xu(
                      t,
                      null !== (n = a.get(e)) && void 0 !== n ? n : null
                    )
                  );
                }),
                o
              )
            )
          );
        }
        recalculateAndSaveOverlays(i, a) {
          const o = ba();
          let u = new ps((e, t) => e - t),
            c = Sa();
          return this.mutationQueue
            .getAllMutationBatchesAffectingDocumentKeys(i, a)
            .next((e) => {
              for (const r of e)
                r.keys().forEach((e) => {
                  var t,
                    n = a.get(e);
                  null !== n &&
                    ((t = o.get(e) || Es.empty()),
                    (t = r.applyToLocalView(n, t)),
                    o.set(e, t),
                    (t = (u.get(r.batchId) || Sa()).add(e)),
                    (u = u.insert(r.batchId, t)));
                });
            })
            .next(() => {
              const e = [],
                t = u.getReverseIterator();
              for (; t.hasNext(); ) {
                const u = t.getNext(),
                  n = u.key,
                  r = u.value,
                  s = ba();
                r.forEach((e) => {
                  var t;
                  c.has(e) ||
                    (null !== (t = na(a.get(e), o.get(e))) && s.set(e, t),
                    (c = c.add(e)));
                }),
                  e.push(this.documentOverlayCache.saveOverlays(i, n, s));
              }
              return es.waitFor(e);
            })
            .next(() => o);
        }
        recalculateAndSaveOverlaysForDocumentKeys(t, e) {
          return this.remoteDocumentCache
            .getEntries(t, e)
            .next((e) => this.recalculateAndSaveOverlays(t, e));
        }
        getDocumentsMatchingQuery(e, t, n) {
          return (
            (r = t),
            qr.isDocumentKey(r.path) &&
            null === r.collectionGroup &&
            0 === r.filters.length
              ? this.getDocumentsMatchingDocumentQuery(e, t.path)
              : Ai(t)
              ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n)
              : this.getDocumentsMatchingCollectionQuery(e, t, n)
          );
          var r;
        }
        getNextDocuments(i, t, a, o) {
          return this.remoteDocumentCache
            .getAllFromCollectionGroup(i, t, a, o)
            .next((n) => {
              const e =
                0 < o - n.size
                  ? this.documentOverlayCache.getOverlaysForCollectionGroup(
                      i,
                      t,
                      a.largestBatchId,
                      o - n.size
                    )
                  : es.resolve(ba());
              let r = -1,
                s = n;
              return e.next((e) =>
                es
                  .forEach(
                    e,
                    (t, e) => (
                      r < e.largestBatchId && (r = e.largestBatchId),
                      n.get(t)
                        ? es.resolve()
                        : this.getBaseDocument(i, t, e).next((e) => {
                            s = s.insert(t, e);
                          })
                    )
                  )
                  .next(() => this.populateOverlays(i, e, n))
                  .next(() => this.computeViews(i, s, e, Sa()))
                  .next((e) => ({ batchId: r, changes: Ia(e) }))
              );
            });
        }
        getDocumentsMatchingDocumentQuery(e, t) {
          return this.getDocument(e, new qr(t)).next((e) => {
            let t = wa();
            return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
          });
        }
        getDocumentsMatchingCollectionGroupQuery(r, s, i) {
          const a = s.collectionGroup;
          let o = wa();
          return this.indexManager.getCollectionParents(r, a).next((e) =>
            es
              .forEach(e, (e) => {
                var t,
                  n =
                    ((t = s),
                    (e = e.child(a)),
                    new Ei(
                      e,
                      null,
                      t.explicitOrderBy.slice(),
                      t.filters.slice(),
                      t.limit,
                      t.limitType,
                      t.startAt,
                      t.endAt
                    ));
                return this.getDocumentsMatchingCollectionQuery(r, n, i).next(
                  (e) => {
                    e.forEach((e, t) => {
                      o = o.insert(e, t);
                    });
                  }
                );
              })
              .next(() => o)
          );
        }
        getDocumentsMatchingCollectionQuery(t, i, n) {
          let a;
          return this.remoteDocumentCache
            .getAllFromCollection(t, i.path, n)
            .next(
              (e) => (
                (a = e),
                this.documentOverlayCache.getOverlaysForCollection(
                  t,
                  i.path,
                  n.largestBatchId
                )
              )
            )
            .next((r) => {
              r.forEach((e, t) => {
                var n = t.getKey();
                null === a.get(n) &&
                  (a = a.insert(n, ei.newInvalidDocument(n)));
              });
              let s = wa();
              return (
                a.forEach((e, t) => {
                  var n = r.get(e);
                  void 0 !== n && sa(n.mutation, t, Es.empty(), Or.now()),
                    Oi(i, t) && (s = s.insert(e, t));
                }),
                s
              );
            });
        }
        getBaseDocument(e, t, n) {
          return null === n || 1 === n.mutation.type
            ? this.remoteDocumentCache.getEntry(e, t)
            : es.resolve(ei.newInvalidDocument(t));
        }
      }
      class Zu {
        constructor(e) {
          (this.It = e), (this.Zn = new Map()), (this.ts = new Map());
        }
        getBundleMetadata(e, t) {
          return es.resolve(this.Zn.get(t));
        }
        saveBundleMetadata(e, t) {
          return (
            this.Zn.set(t.id, {
              id: t.id,
              version: t.version,
              createTime: Ua(t.createTime),
            }),
            es.resolve()
          );
        }
        getNamedQuery(e, t) {
          return es.resolve(this.ts.get(t));
        }
        saveNamedQuery(e, t) {
          return (
            this.ts.set(t.name, {
              name: (t = t).name,
              query: Ho(t.bundledQuery),
              readTime: Ua(t.readTime),
            }),
            es.resolve()
          );
        }
      }
      class ec {
        constructor() {
          (this.overlays = new ps(qr.comparator)), (this.es = new Map());
        }
        getOverlay(e, t) {
          return es.resolve(this.overlays.get(t));
        }
        getOverlays(e, t) {
          const n = ba();
          return es
            .forEach(t, (t) =>
              this.getOverlay(e, t).next((e) => {
                null !== e && n.set(t, e);
              })
            )
            .next(() => n);
        }
        saveOverlays(n, r, e) {
          return (
            e.forEach((e, t) => {
              this.ue(n, r, t);
            }),
            es.resolve()
          );
        }
        removeOverlaysForBatchId(e, t, n) {
          const r = this.es.get(n);
          return (
            void 0 !== r &&
              (r.forEach((e) => (this.overlays = this.overlays.remove(e))),
              this.es.delete(n)),
            es.resolve()
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = ba(),
            s = t.length + 1,
            i = new qr(t.child("")),
            a = this.overlays.getIteratorFrom(i);
          for (; a.hasNext(); ) {
            const e = a.getNext().value,
              i = e.getKey();
            if (!t.isPrefixOf(i.path)) break;
            i.path.length === s && e.largestBatchId > n && r.set(e.getKey(), e);
          }
          return es.resolve(r);
        }
        getOverlaysForCollectionGroup(t, e, n, r) {
          let s = new ps((e, t) => e - t);
          const i = this.overlays.getIterator();
          for (; i.hasNext(); ) {
            const t = i.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
              let e = s.get(t.largestBatchId);
              null === e && ((e = ba()), (s = s.insert(t.largestBatchId, e))),
                e.set(t.getKey(), t);
            }
          }
          const a = ba(),
            o = s.getIterator();
          for (
            ;
            o.hasNext() &&
            (o.getNext().value.forEach((e, t) => a.set(e, t)),
            !(a.size() >= r));

          );
          return es.resolve(a);
        }
        ue(e, t, n) {
          var r = this.overlays.get(n.key);
          if (null !== r) {
            const e = this.es.get(r.largestBatchId).delete(n.key);
            this.es.set(r.largestBatchId, e);
          }
          this.overlays = this.overlays.insert(n.key, new Po(t, n));
          let s = this.es.get(t);
          void 0 === s && ((s = Sa()), this.es.set(t, s)),
            this.es.set(t, s.add(n.key));
        }
      }
      class tc {
        constructor() {
          (this.ns = new ws(nc.ss)), (this.rs = new ws(nc.os));
        }
        isEmpty() {
          return this.ns.isEmpty();
        }
        addReference(e, t) {
          var n = new nc(e, t);
          (this.ns = this.ns.add(n)), (this.rs = this.rs.add(n));
        }
        us(e, t) {
          e.forEach((e) => this.addReference(e, t));
        }
        removeReference(e, t) {
          this.cs(new nc(e, t));
        }
        hs(e, t) {
          e.forEach((e) => this.removeReference(e, t));
        }
        ls(e) {
          const t = new qr(new Pr([])),
            n = new nc(t, e),
            r = new nc(t, e + 1),
            s = [];
          return (
            this.rs.forEachInRange([n, r], (e) => {
              this.cs(e), s.push(e.key);
            }),
            s
          );
        }
        fs() {
          this.ns.forEach((e) => this.cs(e));
        }
        cs(e) {
          (this.ns = this.ns.delete(e)), (this.rs = this.rs.delete(e));
        }
        ds(e) {
          var t = new qr(new Pr([])),
            n = new nc(t, e),
            t = new nc(t, e + 1);
          let r = Sa();
          return (
            this.rs.forEachInRange([n, t], (e) => {
              r = r.add(e.key);
            }),
            r
          );
        }
        containsKey(e) {
          var t = new nc(e, 0),
            t = this.ns.firstAfterOrEqual(t);
          return null !== t && e.isEqual(t.key);
        }
      }
      class nc {
        constructor(e, t) {
          (this.key = e), (this._s = t);
        }
        static ss(e, t) {
          return qr.comparator(e.key, t.key) || Rr(e._s, t._s);
        }
        static os(e, t) {
          return Rr(e._s, t._s) || qr.comparator(e.key, t.key);
        }
      }
      class rc {
        constructor(e, t) {
          (this.indexManager = e),
            (this.referenceDelegate = t),
            (this.mutationQueue = []),
            (this.ws = 1),
            (this.gs = new ws(nc.ss));
        }
        checkEmpty(e) {
          return es.resolve(0 === this.mutationQueue.length);
        }
        addMutationBatch(e, t, n, r) {
          var s = this.ws;
          this.ws++,
            0 < this.mutationQueue.length &&
              this.mutationQueue[this.mutationQueue.length - 1];
          var i = new Vo(s, t, n, r);
          this.mutationQueue.push(i);
          for (const t of r)
            (this.gs = this.gs.add(new nc(t.key, s))),
              this.indexManager.addToCollectionParentIndex(
                e,
                t.key.path.popLast()
              );
          return es.resolve(i);
        }
        lookupMutationBatch(e, t) {
          return es.resolve(this.ys(t));
        }
        getNextMutationBatchAfterBatchId(e, t) {
          var n = this.ps(t + 1),
            n = n < 0 ? 0 : n;
          return es.resolve(
            this.mutationQueue.length > n ? this.mutationQueue[n] : null
          );
        }
        getHighestUnacknowledgedBatchId() {
          return es.resolve(0 === this.mutationQueue.length ? -1 : this.ws - 1);
        }
        getAllMutationBatches(e) {
          return es.resolve(this.mutationQueue.slice());
        }
        getAllMutationBatchesAffectingDocumentKey(e, t) {
          const n = new nc(t, 0),
            r = new nc(t, Number.POSITIVE_INFINITY),
            s = [];
          return (
            this.gs.forEachInRange([n, r], (e) => {
              var t = this.ys(e._s);
              s.push(t);
            }),
            es.resolve(s)
          );
        }
        getAllMutationBatchesAffectingDocumentKeys(e, t) {
          let r = new ws(Rr);
          return (
            t.forEach((e) => {
              var t = new nc(e, 0),
                n = new nc(e, Number.POSITIVE_INFINITY);
              this.gs.forEachInRange([t, n], (e) => {
                r = r.add(e._s);
              });
            }),
            es.resolve(this.Is(r))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const n = t.path,
            r = n.length + 1;
          let s = n;
          qr.isDocumentKey(s) || (s = s.child(""));
          var i = new nc(new qr(s), 0);
          let a = new ws(Rr);
          return (
            this.gs.forEachWhile((e) => {
              var t = e.key.path;
              return (
                !!n.isPrefixOf(t) && (t.length === r && (a = a.add(e._s)), !0)
              );
            }, i),
            es.resolve(this.Is(a))
          );
        }
        Is(e) {
          const n = [];
          return (
            e.forEach((e) => {
              var t = this.ys(e);
              null !== t && n.push(t);
            }),
            n
          );
        }
        removeMutationBatch(n, r) {
          wr(0 === this.Ts(r.batchId, "removed")), this.mutationQueue.shift();
          let s = this.gs;
          return es
            .forEach(r.mutations, (e) => {
              var t = new nc(e.key, r.batchId);
              return (
                (s = s.delete(t)),
                this.referenceDelegate.markPotentiallyOrphaned(n, e.key)
              );
            })
            .next(() => {
              this.gs = s;
            });
        }
        An(e) {}
        containsKey(e, t) {
          var n = new nc(t, 0),
            n = this.gs.firstAfterOrEqual(n);
          return es.resolve(t.isEqual(n && n.key));
        }
        performConsistencyCheck(e) {
          return this.mutationQueue.length, es.resolve();
        }
        Ts(e, t) {
          return this.ps(e);
        }
        ps(e) {
          return 0 === this.mutationQueue.length
            ? 0
            : e - this.mutationQueue[0].batchId;
        }
        ys(e) {
          var t = this.ps(e);
          return t < 0 || t >= this.mutationQueue.length
            ? null
            : this.mutationQueue[t];
        }
      }
      class sc {
        constructor(e) {
          (this.Es = e), (this.docs = new ps(qr.comparator)), (this.size = 0);
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t) {
          const n = t.key,
            r = this.docs.get(n),
            s = r ? r.size : 0,
            i = this.Es(t);
          return (
            (this.docs = this.docs.insert(n, {
              document: t.mutableCopy(),
              size: i,
            })),
            (this.size += i - s),
            this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
          );
        }
        removeEntry(e) {
          var t = this.docs.get(e);
          t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
        }
        getEntry(e, t) {
          const n = this.docs.get(t);
          return es.resolve(
            n ? n.document.mutableCopy() : ei.newInvalidDocument(t)
          );
        }
        getEntries(e, t) {
          let n = ya;
          return (
            t.forEach((e) => {
              const t = this.docs.get(e);
              n = n.insert(
                e,
                t ? t.document.mutableCopy() : ei.newInvalidDocument(e)
              );
            }),
            es.resolve(n)
          );
        }
        getAllFromCollection(e, t, n) {
          let r = ya;
          const s = new qr(t.child("")),
            i = this.docs.getIteratorFrom(s);
          for (; i.hasNext(); ) {
            const {
              key: e,
              value: { document: s },
            } = i.getNext();
            if (!t.isPrefixOf(e.path)) break;
            e.path.length > t.length + 1 ||
              Yr(Hr(s), n) <= 0 ||
              (r = r.insert(s.key, s.mutableCopy()));
          }
          return es.resolve(r);
        }
        getAllFromCollectionGroup(e, t, n, r) {
          vr();
        }
        As(e, t) {
          return es.forEach(this.docs, (e) => t(e));
        }
        newChangeBuffer(e) {
          return new ic(this);
        }
        getSize(e) {
          return es.resolve(this.size);
        }
      }
      class ic extends Ku {
        constructor(e) {
          super(), (this.Yn = e);
        }
        applyChanges(n) {
          const r = [];
          return (
            this.changes.forEach((e, t) => {
              t.isValidDocument()
                ? r.push(this.Yn.addEntry(n, t))
                : this.Yn.removeEntry(e);
            }),
            es.waitFor(r)
          );
        }
        getFromCache(e, t) {
          return this.Yn.getEntry(e, t);
        }
        getAllFromCache(e, t) {
          return this.Yn.getEntries(e, t);
        }
      }
      class ac {
        constructor(e) {
          (this.persistence = e),
            (this.Rs = new pa((e) => ri(e), si)),
            (this.lastRemoteSnapshotVersion = Vr.min()),
            (this.highestTargetId = 0),
            (this.bs = 0),
            (this.Ps = new tc()),
            (this.targetCount = 0),
            (this.vs = ku.Pn());
        }
        forEachTarget(e, n) {
          return this.Rs.forEach((e, t) => n(t)), es.resolve();
        }
        getLastRemoteSnapshotVersion(e) {
          return es.resolve(this.lastRemoteSnapshotVersion);
        }
        getHighestSequenceNumber(e) {
          return es.resolve(this.bs);
        }
        allocateTargetId(e) {
          return (
            (this.highestTargetId = this.vs.next()),
            es.resolve(this.highestTargetId)
          );
        }
        setTargetsMetadata(e, t, n) {
          return (
            n && (this.lastRemoteSnapshotVersion = n),
            t > this.bs && (this.bs = t),
            es.resolve()
          );
        }
        Dn(e) {
          this.Rs.set(e.target, e);
          var t = e.targetId;
          t > this.highestTargetId &&
            ((this.vs = new ku(t)), (this.highestTargetId = t)),
            e.sequenceNumber > this.bs && (this.bs = e.sequenceNumber);
        }
        addTargetData(e, t) {
          return this.Dn(t), (this.targetCount += 1), es.resolve();
        }
        updateTargetData(e, t) {
          return this.Dn(t), es.resolve();
        }
        removeTargetData(e, t) {
          return (
            this.Rs.delete(t.target),
            this.Ps.ls(t.targetId),
            --this.targetCount,
            es.resolve()
          );
        }
        removeTargets(n, r, s) {
          let i = 0;
          const a = [];
          return (
            this.Rs.forEach((e, t) => {
              t.sequenceNumber <= r &&
                null === s.get(t.targetId) &&
                (this.Rs.delete(e),
                a.push(this.removeMatchingKeysForTargetId(n, t.targetId)),
                i++);
            }),
            es.waitFor(a).next(() => i)
          );
        }
        getTargetCount(e) {
          return es.resolve(this.targetCount);
        }
        getTargetData(e, t) {
          var n = this.Rs.get(t) || null;
          return es.resolve(n);
        }
        addMatchingKeys(e, t, n) {
          return this.Ps.us(t, n), es.resolve();
        }
        removeMatchingKeys(t, e, n) {
          this.Ps.hs(e, n);
          const r = this.persistence.referenceDelegate,
            s = [];
          return (
            r &&
              e.forEach((e) => {
                s.push(r.markPotentiallyOrphaned(t, e));
              }),
            es.waitFor(s)
          );
        }
        removeMatchingKeysForTargetId(e, t) {
          return this.Ps.ls(t), es.resolve();
        }
        getMatchingKeysForTargetId(e, t) {
          var n = this.Ps.ds(t);
          return es.resolve(n);
        }
        containsKey(e, t) {
          return es.resolve(this.Ps.containsKey(t));
        }
      }
      class oc {
        constructor(e, t) {
          (this.Vs = {}),
            (this.overlays = {}),
            (this.Ss = new ds(0)),
            (this.Ds = !1),
            (this.Ds = !0),
            (this.referenceDelegate = e(this)),
            (this.Cs = new ac(this)),
            (this.indexManager = new fu()),
            (this.remoteDocumentCache =
              ((e = (e) => this.referenceDelegate.xs(e)), new sc(e))),
            (this.It = new Uo(t)),
            (this.Ns = new Zu(this.It));
        }
        start() {
          return Promise.resolve();
        }
        shutdown() {
          return (this.Ds = !1), Promise.resolve();
        }
        get started() {
          return this.Ds;
        }
        setDatabaseDeletedListener() {}
        setNetworkEnabled() {}
        getIndexManager(e) {
          return this.indexManager;
        }
        getDocumentOverlayCache(e) {
          let t = this.overlays[e.toKey()];
          return t || ((t = new ec()), (this.overlays[e.toKey()] = t)), t;
        }
        getMutationQueue(e, t) {
          let n = this.Vs[e.toKey()];
          return (
            n ||
              ((n = new rc(t, this.referenceDelegate)),
              (this.Vs[e.toKey()] = n)),
            n
          );
        }
        getTargetCache() {
          return this.Cs;
        }
        getRemoteDocumentCache() {
          return this.remoteDocumentCache;
        }
        getBundleCache() {
          return this.Ns;
        }
        runTransaction(e, t, n) {
          gr("MemoryPersistence", "Starting transaction:", e);
          const r = new uc(this.Ss.next());
          return (
            this.referenceDelegate.ks(),
            n(r)
              .next((e) => this.referenceDelegate.Os(r).next(() => e))
              .toPromise()
              .then((e) => (r.raiseOnCommittedEvent(), e))
          );
        }
        Ms(t, n) {
          return es.or(
            Object.values(this.Vs).map((e) => () => e.containsKey(t, n))
          );
        }
      }
      class uc extends Jr {
        constructor(e) {
          super(), (this.currentSequenceNumber = e);
        }
      }
      class cc {
        constructor(e) {
          (this.persistence = e), (this.Fs = new tc()), (this.$s = null);
        }
        static Bs(e) {
          return new cc(e);
        }
        get Ls() {
          if (this.$s) return this.$s;
          throw vr();
        }
        addReference(e, t, n) {
          return (
            this.Fs.addReference(n, t),
            this.Ls.delete(n.toString()),
            es.resolve()
          );
        }
        removeReference(e, t, n) {
          return (
            this.Fs.removeReference(n, t),
            this.Ls.add(n.toString()),
            es.resolve()
          );
        }
        markPotentiallyOrphaned(e, t) {
          return this.Ls.add(t.toString()), es.resolve();
        }
        removeTarget(e, t) {
          this.Fs.ls(t.targetId).forEach((e) => this.Ls.add(e.toString()));
          const n = this.persistence.getTargetCache();
          return n
            .getMatchingKeysForTargetId(e, t.targetId)
            .next((e) => {
              e.forEach((e) => this.Ls.add(e.toString()));
            })
            .next(() => n.removeTargetData(e, t));
        }
        ks() {
          this.$s = new Set();
        }
        Os(n) {
          const r = this.persistence.getRemoteDocumentCache().newChangeBuffer();
          return es
            .forEach(this.Ls, (e) => {
              const t = qr.fromPath(e);
              return this.Us(n, t).next((e) => {
                e || r.removeEntry(t, Vr.min());
              });
            })
            .next(() => ((this.$s = null), r.apply(n)));
        }
        updateLimboDocument(e, t) {
          return this.Us(e, t).next((e) => {
            e ? this.Ls.delete(t.toString()) : this.Ls.add(t.toString());
          });
        }
        xs(e) {
          return 0;
        }
        Us(e, t) {
          return es.or([
            () => es.resolve(this.Fs.containsKey(t)),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => this.persistence.Ms(e, t),
          ]);
        }
      }
      class hc {
        constructor(e) {
          this.It = e;
        }
        $(t, e, n, r) {
          const s = new ts("createOrUpgrade", e);
          var i;
          n < 1 &&
            1 <= r &&
            (t.createObjectStore("owner"),
            (i = t).createObjectStore("mutationQueues", { keyPath: "userId" }),
            i
              .createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0,
              })
              .createIndex("userMutationsIndex", ho, { unique: !0 }),
            i.createObjectStore("documentMutations"),
            lc(t),
            t.createObjectStore("remoteDocuments"));
          let a = es.resolve();
          return (
            n < 3 &&
              3 <= r &&
              (0 !== n &&
                ((i = t).deleteObjectStore("targetDocuments"),
                i.deleteObjectStore("targets"),
                i.deleteObjectStore("targetGlobal"),
                lc(t)),
              (a = a.next(() =>
                (function () {
                  const e = s.store("targetGlobal"),
                    t = {
                      highestTargetId: 0,
                      highestListenSequenceNumber: 0,
                      lastRemoteSnapshotVersion: Vr.min().toTimestamp(),
                      targetCount: 0,
                    };
                  return e.put("targetGlobalKey", t);
                })()
              ))),
            n < 4 &&
              4 <= r &&
              (0 !== n &&
                (a = a.next(() =>
                  (function (r, s) {
                    return s
                      .store("mutations")
                      .W()
                      .next((e) => {
                        r.deleteObjectStore("mutations"),
                          r
                            .createObjectStore("mutations", {
                              keyPath: "batchId",
                              autoIncrement: !0,
                            })
                            .createIndex("userMutationsIndex", ho, {
                              unique: !0,
                            });
                        const t = s.store("mutations"),
                          n = e.map((e) => t.put(e));
                        return es.waitFor(n);
                      });
                  })(t, s)
                )),
              (a = a.next(() => {
                t.createObjectStore("clientMetadata", { keyPath: "clientId" });
              }))),
            n < 5 && 5 <= r && (a = a.next(() => this.qs(s))),
            n < 6 &&
              6 <= r &&
              (a = a.next(
                () => (t.createObjectStore("remoteDocumentGlobal"), this.Ks(s))
              )),
            n < 7 && 7 <= r && (a = a.next(() => this.Gs(s))),
            n < 8 && 8 <= r && (a = a.next(() => this.Qs(t, s))),
            n < 9 &&
              9 <= r &&
              (a = a.next(() => {
                var e;
                (e = t).objectStoreNames.contains("remoteDocumentChanges") &&
                  e.deleteObjectStore("remoteDocumentChanges");
              })),
            n < 10 && 10 <= r && (a = a.next(() => this.js(s))),
            n < 11 &&
              11 <= r &&
              (a = a.next(() => {
                t.createObjectStore("bundles", { keyPath: "bundleId" }),
                  t.createObjectStore("namedQueries", { keyPath: "name" });
              })),
            n < 12 &&
              12 <= r &&
              (a = a.next(() => {
                !(function () {
                  const e = t.createObjectStore("documentOverlays", {
                    keyPath: xo,
                  });
                  e.createIndex("collectionPathOverlayIndex", Do, {
                    unique: !1,
                  }),
                    e.createIndex("collectionGroupOverlayIndex", Ao, {
                      unique: !1,
                    });
                })();
              })),
            n < 13 &&
              13 <= r &&
              (a = a
                .next(() =>
                  (function () {
                    const e = t.createObjectStore("remoteDocumentsV14", {
                      keyPath: mo,
                    });
                    e.createIndex("documentKeyIndex", po),
                      e.createIndex("collectionGroupIndex", yo);
                  })()
                )
                .next(() => this.Ws(t, s))
                .next(() => t.deleteObjectStore("remoteDocuments"))),
            n < 14 && 14 <= r && (a = a.next(() => this.zs(t, s))),
            n < 15 &&
              15 <= r &&
              (a = a.next(() =>
                (function (e) {
                  e
                    .createObjectStore("indexConfiguration", {
                      keyPath: "indexId",
                      autoIncrement: !0,
                    })
                    .createIndex("collectionGroupIndex", "collectionGroup", {
                      unique: !1,
                    }),
                    e
                      .createObjectStore("indexState", { keyPath: Eo })
                      .createIndex("sequenceNumberIndex", To, { unique: !1 }),
                    e
                      .createObjectStore("indexEntries", { keyPath: So })
                      .createIndex("documentKeyIndex", _o, { unique: !1 });
                })(t)
              )),
            a
          );
        }
        Ks(t) {
          let n = 0;
          return t
            .store("remoteDocuments")
            .Z((e, t) => {
              n += _u(t);
            })
            .next(() => {
              var e = { byteSize: n };
              return t
                .store("remoteDocumentGlobal")
                .put("remoteDocumentGlobalKey", e);
            });
        }
        qs(r) {
          const e = r.store("mutationQueues"),
            t = r.store("mutations");
          return e.W().next((e) =>
            es.forEach(e, (n) => {
              var e = IDBKeyRange.bound(
                [n.userId, -1],
                [n.userId, n.lastAcknowledgedBatchId]
              );
              return t.W("userMutationsIndex", e).next((e) =>
                es.forEach(e, (e) => {
                  wr(e.userId === n.userId);
                  var t = $o(this.It, e);
                  return Su(r, n.userId, t).next(() => {});
                })
              );
            })
          );
        }
        Gs(e) {
          const a = e.store("targetDocuments"),
            t = e.store("remoteDocuments");
          return e
            .store("targetGlobal")
            .get("targetGlobalKey")
            .next((s) => {
              const i = [];
              return t
                .Z((e, t) => {
                  const n = new Pr(e),
                    r = [0, oo(n)];
                  i.push(
                    a
                      .get(r)
                      .next((e) =>
                        e
                          ? es.resolve()
                          : ((e) =>
                              a.put({
                                targetId: 0,
                                path: oo(e),
                                sequenceNumber: s.highestListenSequenceNumber,
                              }))(n)
                      )
                  );
                })
                .next(() => es.waitFor(i));
            });
        }
        Qs(e, t) {
          e.createObjectStore("collectionParents", { keyPath: bo });
          const n = t.store("collectionParents"),
            r = new gu(),
            s = (e) => {
              if (r.add(e)) {
                const t = e.lastSegment(),
                  r = e.popLast();
                return n.put({ collectionId: t, parent: oo(r) });
              }
            };
          return t
            .store("remoteDocuments")
            .Z({ X: !0 }, (e, t) => {
              const n = new Pr(e);
              return s(n.popLast());
            })
            .next(() =>
              t.store("documentMutations").Z({ X: !0 }, ([, e], t) => {
                const n = co(e);
                return s(n.popLast());
              })
            );
        }
        js(e) {
          const r = e.store("targets");
          return r.Z((e, t) => {
            var n = Qo(t),
              n = zo(this.It, n);
            return r.put(n);
          });
        }
        Ws(e, i) {
          const t = i.store("remoteDocuments"),
            a = [];
          return t
            .Z((e, t) => {
              const n = i.store("remoteDocumentsV14"),
                r = (
                  (s = t).document
                    ? new qr(Pr.fromString(s.document.name).popFirst(5))
                    : s.noDocument
                    ? qr.fromSegments(s.noDocument.path)
                    : s.unknownDocument
                    ? qr.fromSegments(s.unknownDocument.path)
                    : vr()
                ).path.toArray();
              var s = {
                prefixPath: r.slice(0, r.length - 2),
                collectionGroup: r[r.length - 2],
                documentId: r[r.length - 1],
                readTime: t.readTime || [0, 0],
                unknownDocument: t.unknownDocument,
                noDocument: t.noDocument,
                document: t.document,
                hasCommittedMutations: !!t.hasCommittedMutations,
              };
              a.push(n.put(s));
            })
            .next(() => es.waitFor(a));
        }
        zs(e, i) {
          const t = i.store("mutations"),
            a = ju(this.It),
            o = new oc(cc.Bs, this.It.re);
          return t.W().next((e) => {
            const r = new Map();
            return (
              e.forEach((e) => {
                var t;
                let n =
                  null !== (t = r.get(e.userId)) && void 0 !== t ? t : Sa();
                $o(this.It, e)
                  .keys()
                  .forEach((e) => (n = n.add(e))),
                  r.set(e.userId, n);
              }),
              es.forEach(r, (e, t) => {
                var n = new hr(t),
                  r = tu.oe(this.It, n),
                  s = o.getIndexManager(n),
                  n = xu.oe(n, this.It, s, o.referenceDelegate);
                return new Ju(a, n, r, s)
                  .recalculateAndSaveOverlaysForDocumentKeys(
                    new Mo(i, ds.at),
                    e
                  )
                  .next();
              })
            );
          });
        }
      }
      function lc(e) {
        e
          .createObjectStore("targetDocuments", { keyPath: wo })
          .createIndex("documentTargetsIndex", Io, { unique: !0 }),
          e
            .createObjectStore("targets", { keyPath: "targetId" })
            .createIndex("queryTargetsIndex", vo, { unique: !0 }),
          e.createObjectStore("targetGlobal");
      }
      const dc =
        "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
      class fc {
        constructor(e, t, n, r, s, i, a, o, u, c, h = 15) {
          if (
            ((this.allowTabSynchronization = e),
            (this.persistenceKey = t),
            (this.clientId = n),
            (this.Hs = s),
            (this.window = i),
            (this.document = a),
            (this.Js = u),
            (this.Ys = c),
            (this.Xs = h),
            (this.Ss = null),
            (this.Ds = !1),
            (this.isPrimary = !1),
            (this.networkEnabled = !0),
            (this.Zs = null),
            (this.inForeground = !1),
            (this.ti = null),
            (this.ei = null),
            (this.ni = Number.NEGATIVE_INFINITY),
            (this.si = (e) => Promise.resolve()),
            !fc.C())
          )
            throw new br(
              Ir.UNIMPLEMENTED,
              "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."
            );
          (this.referenceDelegate = new Uu(this, r)),
            (this.ii = t + "main"),
            (this.It = new Uo(o)),
            (this.ri = new ns(this.ii, this.Xs, new hc(this.It))),
            (this.Cs = new Ru(this.referenceDelegate, this.It)),
            (this.remoteDocumentCache = ju(this.It)),
            (this.Ns = new Jo()),
            this.window && this.window.localStorage
              ? (this.oi = this.window.localStorage)
              : ((this.oi = null),
                !1 === c &&
                  mr(
                    "IndexedDbPersistence",
                    "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."
                  ));
        }
        start() {
          return this.ui()
            .then(() => {
              if (!this.isPrimary && !this.allowTabSynchronization)
                throw new br(Ir.FAILED_PRECONDITION, dc);
              return (
                this.ci(),
                this.ai(),
                this.hi(),
                this.runTransaction(
                  "getHighestListenSequenceNumber",
                  "readonly",
                  (e) => this.Cs.getHighestSequenceNumber(e)
                )
              );
            })
            .then((e) => {
              this.Ss = new ds(e, this.Js);
            })
            .then(() => {
              this.Ds = !0;
            })
            .catch((e) => (this.ri && this.ri.close(), Promise.reject(e)));
        }
        li(t) {
          return (
            (this.si = async (e) => {
              if (this.started) return t(e);
            }),
            t(this.isPrimary)
          );
        }
        setDatabaseDeletedListener(t) {
          this.ri.L(async (e) => {
            null === e.newVersion && (await t());
          });
        }
        setNetworkEnabled(e) {
          this.networkEnabled !== e &&
            ((this.networkEnabled = e),
            this.Hs.enqueueAndForget(async () => {
              this.started && (await this.ui());
            }));
        }
        ui() {
          return this.runTransaction(
            "updateClientMetadataAndTryBecomePrimary",
            "readwrite",
            (t) =>
              mc(t)
                .put({
                  clientId: this.clientId,
                  updateTimeMs: Date.now(),
                  networkEnabled: this.networkEnabled,
                  inForeground: this.inForeground,
                })
                .next(() => {
                  if (this.isPrimary)
                    return this.fi(t).next((e) => {
                      e ||
                        ((this.isPrimary = !1),
                        this.Hs.enqueueRetryable(() => this.si(!1)));
                    });
                })
                .next(() => this.di(t))
                .next((e) =>
                  this.isPrimary && !e
                    ? this._i(t).next(() => !1)
                    : !!e && this.wi(t).next(() => !0)
                )
          )
            .catch((e) => {
              if (is(e))
                return (
                  gr(
                    "IndexedDbPersistence",
                    "Failed to extend owner lease: ",
                    e
                  ),
                  this.isPrimary
                );
              if (!this.allowTabSynchronization) throw e;
              return (
                gr(
                  "IndexedDbPersistence",
                  "Releasing owner lease after error during lease refresh",
                  e
                ),
                !1
              );
            })
            .then((e) => {
              this.isPrimary !== e &&
                this.Hs.enqueueRetryable(() => this.si(e)),
                (this.isPrimary = e);
            });
        }
        fi(e) {
          return gc(e)
            .get("owner")
            .next((e) => es.resolve(this.mi(e)));
        }
        gi(e) {
          return mc(e).delete(this.clientId);
        }
        async yi() {
          if (this.isPrimary && !this.pi(this.ni, 18e5)) {
            this.ni = Date.now();
            var e = await this.runTransaction(
              "maybeGarbageCollectMultiClientState",
              "readwrite-primary",
              (e) => {
                const r = Oo(e, "clientMetadata");
                return r.W().next((e) => {
                  const t = this.Ii(e, 18e5),
                    n = e.filter((e) => -1 === t.indexOf(e));
                  return es
                    .forEach(n, (e) => r.delete(e.clientId))
                    .next(() => n);
                });
              }
            ).catch(() => []);
            if (this.oi)
              for (const t of e) this.oi.removeItem(this.Ti(t.clientId));
          }
        }
        hi() {
          this.ei = this.Hs.enqueueAfterDelay(
            "client_metadata_refresh",
            4e3,
            () =>
              this.ui()
                .then(() => this.yi())
                .then(() => this.hi())
          );
        }
        mi(e) {
          return !!e && e.ownerId === this.clientId;
        }
        di(t) {
          return this.Ys
            ? es.resolve(!0)
            : gc(t)
                .get("owner")
                .next((e) => {
                  if (
                    null !== e &&
                    this.pi(e.leaseTimestampMs, 5e3) &&
                    !this.Ei(e.ownerId)
                  ) {
                    if (this.mi(e) && this.networkEnabled) return !0;
                    if (!this.mi(e)) {
                      if (!e.allowTabSynchronization)
                        throw new br(Ir.FAILED_PRECONDITION, dc);
                      return !1;
                    }
                  }
                  return (
                    !(!this.networkEnabled || !this.inForeground) ||
                    mc(t)
                      .W()
                      .next(
                        (e) =>
                          void 0 ===
                          this.Ii(e, 5e3).find((e) => {
                            if (this.clientId !== e.clientId) {
                              var t = !this.networkEnabled && e.networkEnabled,
                                n = !this.inForeground && e.inForeground,
                                r = this.networkEnabled === e.networkEnabled;
                              if (t || (n && r)) return !0;
                            }
                            return !1;
                          })
                      )
                  );
                })
                .next(
                  (e) => (
                    this.isPrimary !== e &&
                      gr(
                        "IndexedDbPersistence",
                        `Client ${
                          e ? "is" : "is not"
                        } eligible for a primary lease.`
                      ),
                    e
                  )
                );
        }
        async shutdown() {
          (this.Ds = !1),
            this.Ai(),
            this.ei && (this.ei.cancel(), (this.ei = null)),
            this.Ri(),
            this.bi(),
            await this.ri.runTransaction(
              "shutdown",
              "readwrite",
              ["owner", "clientMetadata"],
              (e) => {
                const t = new Mo(e, ds.at);
                return this._i(t).next(() => this.gi(t));
              }
            ),
            this.ri.close(),
            this.Pi();
        }
        Ii(e, t) {
          return e.filter(
            (e) => this.pi(e.updateTimeMs, t) && !this.Ei(e.clientId)
          );
        }
        vi() {
          return this.runTransaction("getActiveClients", "readonly", (e) =>
            mc(e)
              .W()
              .next((e) => this.Ii(e, 18e5).map((e) => e.clientId))
          );
        }
        get started() {
          return this.Ds;
        }
        getMutationQueue(e, t) {
          return xu.oe(e, this.It, t, this.referenceDelegate);
        }
        getTargetCache() {
          return this.Cs;
        }
        getRemoteDocumentCache() {
          return this.remoteDocumentCache;
        }
        getIndexManager(e) {
          return new pu(e, this.It.re.databaseId);
        }
        getDocumentOverlayCache(e) {
          return tu.oe(this.It, e);
        }
        getBundleCache() {
          return this.Ns;
        }
        runTransaction(t, n, r) {
          gr("IndexedDbPersistence", "Starting transaction:", t);
          var e,
            s = "readonly" === n ? "readonly" : "readwrite",
            e =
              15 === (e = this.Xs)
                ? Lo
                : 14 === e
                ? Ro
                : 13 === e
                ? ko
                : 12 === e
                ? No
                : 11 === e
                ? Co
                : void vr();
          let i;
          return this.ri
            .runTransaction(
              t,
              s,
              e,
              (e) => (
                (i = new Mo(e, this.Ss ? this.Ss.next() : ds.at)),
                "readwrite-primary" === n
                  ? this.fi(i)
                      .next((e) => !!e || this.di(i))
                      .next((e) => {
                        if (!e)
                          throw (
                            (mr(
                              `Failed to obtain primary lease for action '${t}'.`
                            ),
                            (this.isPrimary = !1),
                            this.Hs.enqueueRetryable(() => this.si(!1)),
                            new br(Ir.FAILED_PRECONDITION, Xr))
                          );
                        return r(i);
                      })
                      .next((e) => this.wi(i).next(() => e))
                  : this.Vi(i).next(() => r(i))
              )
            )
            .then((e) => (i.raiseOnCommittedEvent(), e));
        }
        Vi(e) {
          return gc(e)
            .get("owner")
            .next((e) => {
              if (
                null !== e &&
                this.pi(e.leaseTimestampMs, 5e3) &&
                !this.Ei(e.ownerId) &&
                !this.mi(e) &&
                !(
                  this.Ys ||
                  (this.allowTabSynchronization && e.allowTabSynchronization)
                )
              )
                throw new br(Ir.FAILED_PRECONDITION, dc);
            });
        }
        wi(e) {
          var t = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now(),
          };
          return gc(e).put("owner", t);
        }
        static C() {
          return ns.C();
        }
        _i(e) {
          const t = gc(e);
          return t
            .get("owner")
            .next((e) =>
              this.mi(e)
                ? (gr("IndexedDbPersistence", "Releasing primary lease."),
                  t.delete("owner"))
                : es.resolve()
            );
        }
        pi(e, t) {
          var n = Date.now();
          return !(
            e < n - t ||
            (n < e &&
              (mr(`Detected an update time that is in the future: ${e} > ${n}`),
              1))
          );
        }
        ci() {
          null !== this.document &&
            "function" == typeof this.document.addEventListener &&
            ((this.ti = () => {
              this.Hs.enqueueAndForget(
                () => (
                  (this.inForeground =
                    "visible" === this.document.visibilityState),
                  this.ui()
                )
              );
            }),
            this.document.addEventListener("visibilitychange", this.ti),
            (this.inForeground = "visible" === this.document.visibilityState));
        }
        Ri() {
          this.ti &&
            (this.document.removeEventListener("visibilitychange", this.ti),
            (this.ti = null));
        }
        ai() {
          var e;
          "function" ==
            typeof (null === (e = this.window) || void 0 === e
              ? void 0
              : e.addEventListener) &&
            ((this.Zs = () => {
              this.Ai(),
                s() &&
                  navigator.appVersion.match(/Version\/1[45]/) &&
                  this.Hs.enterRestrictedMode(!0),
                this.Hs.enqueueAndForget(() => this.shutdown());
            }),
            this.window.addEventListener("pagehide", this.Zs));
        }
        bi() {
          this.Zs &&
            (this.window.removeEventListener("pagehide", this.Zs),
            (this.Zs = null));
        }
        Ei(e) {
          var t;
          try {
            var n =
              null !==
              (null === (t = this.oi) || void 0 === t
                ? void 0
                : t.getItem(this.Ti(e)));
            return (
              gr(
                "IndexedDbPersistence",
                `Client '${e}' ${n ? "is" : "is not"} zombied in LocalStorage`
              ),
              n
            );
          } catch (e) {
            return (
              mr("IndexedDbPersistence", "Failed to get zombied client id.", e),
              !1
            );
          }
        }
        Ai() {
          if (this.oi)
            try {
              this.oi.setItem(this.Ti(this.clientId), String(Date.now()));
            } catch (e) {
              mr("Failed to set zombie client id.", e);
            }
        }
        Pi() {
          if (this.oi)
            try {
              this.oi.removeItem(this.Ti(this.clientId));
            } catch (e) {}
        }
        Ti(e) {
          return `firestore_zombie_${this.persistenceKey}_${e}`;
        }
      }
      function gc(e) {
        return Oo(e, "owner");
      }
      function mc(e) {
        return Oo(e, "clientMetadata");
      }
      function pc(e, t) {
        let n = e.projectId;
        return (
          e.isDefaultDatabase || (n += "." + e.database),
          "firestore/" + t + "/" + n + "/"
        );
      }
      class yc {
        constructor(e, t, n, r) {
          (this.targetId = e),
            (this.fromCache = t),
            (this.Si = n),
            (this.Di = r);
        }
        static Ci(e, t) {
          let n = Sa(),
            r = Sa();
          for (const e of t.docChanges)
            switch (e.type) {
              case 0:
                n = n.add(e.doc.key);
                break;
              case 1:
                r = r.add(e.doc.key);
            }
          return new yc(e, t.fromCache, n, r);
        }
      }
      class vc {
        constructor() {
          this.xi = !1;
        }
        initialize(e, t) {
          (this.Ni = e), (this.indexManager = t), (this.xi = !0);
        }
        getDocumentsMatchingQuery(t, n, r, s) {
          return this.ki(t, n)
            .next((e) => e || this.Oi(t, n, s, r))
            .next((e) => e || this.Mi(t, n));
        }
        ki(s, i) {
          if (_i(i)) return es.resolve(null);
          let t = Ni(i);
          return this.indexManager.getIndexType(s, t).next((e) =>
            0 === e
              ? null
              : (null !== i.limit &&
                  1 === e &&
                  ((i = ki(i, null, "F")), (t = Ni(i))),
                this.indexManager.getDocumentsMatchingTarget(s, t).next((e) => {
                  const r = Sa(...e);
                  return this.Ni.getDocuments(s, r).next((n) =>
                    this.indexManager.getMinOffset(s, t).next((e) => {
                      var t = this.Fi(i, n);
                      return this.$i(i, t, r, e.readTime)
                        ? this.ki(s, ki(i, null, "F"))
                        : this.Bi(s, t, i, e);
                    })
                  );
                }))
          );
        }
        Oi(n, r, s, i) {
          return _i(r) || i.isEqual(Vr.min())
            ? this.Mi(n, r)
            : this.Ni.getDocuments(n, s).next((e) => {
                var t = this.Fi(r, e);
                return this.$i(r, t, s, i)
                  ? this.Mi(n, r)
                  : (fr() <= l.DEBUG &&
                      gr(
                        "QueryEngine",
                        "Re-using previous result from %s to execute query: %s",
                        i.toString(),
                        Mi(r)
                      ),
                    this.Bi(n, t, r, zr(i, -1)));
              });
        }
        Fi(n, e) {
          let r = new ws(Fi(n));
          return (
            e.forEach((e, t) => {
              Oi(n, t) && (r = r.add(t));
            }),
            r
          );
        }
        $i(e, t, n, r) {
          if (null === e.limit) return !1;
          if (n.size !== t.size) return !0;
          const s = "F" === e.limitType ? t.last() : t.first();
          return !!s && (s.hasPendingWrites || 0 < s.version.compareTo(r));
        }
        Mi(e, t) {
          return (
            fr() <= l.DEBUG &&
              gr(
                "QueryEngine",
                "Using full collection scan to execute query:",
                Mi(t)
              ),
            this.Ni.getDocumentsMatchingQuery(e, t, Wr.min())
          );
        }
        Bi(e, n, t, r) {
          return this.Ni.getDocumentsMatchingQuery(e, t, r).next(
            (t) => (
              n.forEach((e) => {
                t = t.insert(e.key, e);
              }),
              t
            )
          );
        }
      }
      class wc {
        constructor(e, t, n, r) {
          (this.persistence = e),
            (this.Li = t),
            (this.It = r),
            (this.Ui = new ps(Rr)),
            (this.qi = new pa((e) => ri(e), si)),
            (this.Ki = new Map()),
            (this.Gi = e.getRemoteDocumentCache()),
            (this.Cs = e.getTargetCache()),
            (this.Ns = e.getBundleCache()),
            this.Qi(n);
        }
        Qi(e) {
          (this.documentOverlayCache =
            this.persistence.getDocumentOverlayCache(e)),
            (this.indexManager = this.persistence.getIndexManager(e)),
            (this.mutationQueue = this.persistence.getMutationQueue(
              e,
              this.indexManager
            )),
            (this.localDocuments = new Ju(
              this.Gi,
              this.mutationQueue,
              this.documentOverlayCache,
              this.indexManager
            )),
            this.Gi.setIndexManager(this.indexManager),
            this.Li.initialize(this.localDocuments, this.indexManager);
        }
        collectGarbage(t) {
          return this.persistence.runTransaction(
            "Collect garbage",
            "readwrite-primary",
            (e) => t.collect(e, this.Ui)
          );
        }
      }
      function Ic(e, t, n, r) {
        return new wc(e, t, n, r);
      }
      async function bc(e, t) {
        const a = e;
        return a.persistence.runTransaction(
          "Handle user change",
          "readonly",
          (s) => {
            let i;
            return a.mutationQueue
              .getAllMutationBatches(s)
              .next(
                (e) => (
                  (i = e), a.Qi(t), a.mutationQueue.getAllMutationBatches(s)
                )
              )
              .next((e) => {
                const t = [],
                  n = [];
                let r = Sa();
                for (const s of i) {
                  t.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                for (const s of e) {
                  n.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                return a.localDocuments
                  .getDocuments(s, r)
                  .next((e) => ({
                    ji: e,
                    removedBatchIds: t,
                    addedBatchIds: n,
                  }));
              });
          }
        );
      }
      function Ec(e) {
        const t = e;
        return t.persistence.runTransaction(
          "Get last remote snapshot version",
          "readonly",
          (e) => t.Cs.getLastRemoteSnapshotVersion(e)
        );
      }
      function Tc(e, c) {
        const h = e,
          l = c.snapshotVersion;
        let d = h.Ui;
        return h.persistence
          .runTransaction("Apply remote event", "readwrite-primary", (o) => {
            const e = h.Gi.newChangeBuffer({ trackRemovals: !0 });
            d = h.Ui;
            const u = [];
            c.targetChanges.forEach((t, n) => {
              const r = d.get(n);
              if (r) {
                u.push(
                  h.Cs.removeMatchingKeys(o, t.removedDocuments, n).next(() =>
                    h.Cs.addMatchingKeys(o, t.addedDocuments, n)
                  )
                );
                let e = r.withSequenceNumber(o.currentSequenceNumber);
                var s, i, a;
                c.targetMismatches.has(n)
                  ? (e = e
                      .withResumeToken(Ts.EMPTY_BYTE_STRING, Vr.min())
                      .withLastLimboFreeSnapshotVersion(Vr.min()))
                  : 0 < t.resumeToken.approximateByteSize() &&
                    (e = e.withResumeToken(t.resumeToken, l)),
                  (d = d.insert(n, e)),
                  (s = r),
                  (i = e),
                  (a = t),
                  (0 !== s.resumeToken.approximateByteSize() &&
                    !(
                      3e8 <=
                        i.snapshotVersion.toMicroseconds() -
                          s.snapshotVersion.toMicroseconds() ||
                      0 <
                        a.addedDocuments.size +
                          a.modifiedDocuments.size +
                          a.removedDocuments.size
                    )) ||
                    u.push(h.Cs.updateTargetData(o, e));
              }
            });
            let t = ya,
              n = Sa();
            if (
              (c.documentUpdates.forEach((e) => {
                c.resolvedLimboDocuments.has(e) &&
                  u.push(
                    h.persistence.referenceDelegate.updateLimboDocument(o, e)
                  );
              }),
              u.push(
                Sc(o, e, c.documentUpdates).next((e) => {
                  (t = e.Wi), (n = e.zi);
                })
              ),
              !l.isEqual(Vr.min()))
            ) {
              const c = h.Cs.getLastRemoteSnapshotVersion(o).next((e) =>
                h.Cs.setTargetsMetadata(o, o.currentSequenceNumber, l)
              );
              u.push(c);
            }
            return es
              .waitFor(u)
              .next(() => e.apply(o))
              .next(() => h.localDocuments.getLocalViewOfDocuments(o, t, n))
              .next(() => t);
          })
          .then((e) => ((h.Ui = d), e));
      }
      function Sc(e, i, t) {
        let n = Sa(),
          a = Sa();
        return (
          t.forEach((e) => (n = n.add(e))),
          i.getEntries(e, n).next((r) => {
            let s = ya;
            return (
              t.forEach((e, t) => {
                const n = r.get(e);
                t.isFoundDocument() !== n.isFoundDocument() && (a = a.add(e)),
                  t.isNoDocument() && t.version.isEqual(Vr.min())
                    ? (i.removeEntry(e, t.readTime), (s = s.insert(e, t)))
                    : !n.isValidDocument() ||
                      0 < t.version.compareTo(n.version) ||
                      (0 === t.version.compareTo(n.version) &&
                        n.hasPendingWrites)
                    ? (i.addEntry(t), (s = s.insert(e, t)))
                    : gr(
                        "LocalStore",
                        "Ignoring outdated watch update for ",
                        e,
                        ". Current version:",
                        n.version,
                        " Watch version:",
                        t.version
                      );
              }),
              { Wi: s, zi: a }
            );
          })
        );
      }
      function _c(e, r) {
        const s = e;
        return s.persistence
          .runTransaction("Allocate target", "readwrite", (t) => {
            let n;
            return s.Cs.getTargetData(t, r).next((e) =>
              e
                ? ((n = e), es.resolve(n))
                : s.Cs.allocateTargetId(t).next(
                    (e) => (
                      (n = new Bo(r, e, 0, t.currentSequenceNumber)),
                      s.Cs.addTargetData(t, n).next(() => n)
                    )
                  )
            );
          })
          .then((e) => {
            var t = s.Ui.get(e.targetId);
            return (
              (null === t ||
                0 < e.snapshotVersion.compareTo(t.snapshotVersion)) &&
                ((s.Ui = s.Ui.insert(e.targetId, e)), s.qi.set(r, e.targetId)),
              e
            );
          });
      }
      async function xc(e, t, n) {
        const r = e,
          s = r.Ui.get(t),
          i = n ? "readwrite" : "readwrite-primary";
        try {
          n ||
            (await r.persistence.runTransaction("Release target", i, (e) =>
              r.persistence.referenceDelegate.removeTarget(e, s)
            ));
        } catch (e) {
          if (!is(e)) throw e;
          gr(
            "LocalStore",
            `Failed to update sequence numbers for target ${t}: ${e}`
          );
        }
        (r.Ui = r.Ui.remove(t)), r.qi.delete(s.target);
      }
      function Dc(e, n, r) {
        const s = e;
        let i = Vr.min(),
          a = Sa();
        return s.persistence.runTransaction("Execute query", "readonly", (t) =>
          (function (e, t, n) {
            const r = e,
              s = r.qi.get(n);
            return void 0 !== s
              ? es.resolve(r.Ui.get(s))
              : r.Cs.getTargetData(t, n);
          })(s, t, Ni(n))
            .next((e) => {
              if (e)
                return (
                  (i = e.lastLimboFreeSnapshotVersion),
                  s.Cs.getMatchingKeysForTargetId(t, e.targetId).next((e) => {
                    a = e;
                  })
                );
            })
            .next(() =>
              s.Li.getDocumentsMatchingQuery(
                t,
                n,
                r ? i : Vr.min(),
                r ? a : Sa()
              )
            )
            .next((e) => (Nc(s, Vi(n), e), { documents: e, Hi: a }))
        );
      }
      function Ac(e, t) {
        const n = e,
          r = n.Cs,
          s = n.Ui.get(t);
        return s
          ? Promise.resolve(s.target)
          : n.persistence.runTransaction("Get target data", "readonly", (e) =>
              r.se(e, t).next((e) => (e ? e.target : null))
            );
      }
      function Cc(e, t) {
        const n = e,
          r = n.Ki.get(t) || Vr.min();
        return n.persistence
          .runTransaction("Get new document changes", "readonly", (e) =>
            n.Gi.getAllFromCollectionGroup(
              e,
              t,
              zr(r, -1),
              Number.MAX_SAFE_INTEGER
            )
          )
          .then((e) => (Nc(n, t, e), e));
      }
      function Nc(e, t, n) {
        let r = e.Ki.get(t) || Vr.min();
        n.forEach((e, t) => {
          0 < t.readTime.compareTo(r) && (r = t.readTime);
        }),
          e.Ki.set(t, r);
      }
      function kc(e, t) {
        return `firestore_clients_${e}_${t}`;
      }
      function Rc(e, t, n) {
        let r = `firestore_mutations_${e}_${n}`;
        return t.isAuthenticated() && (r += `_${t.uid}`), r;
      }
      function Lc(e, t) {
        return `firestore_targets_${e}_${t}`;
      }
      class Mc {
        constructor(e, t, n, r) {
          (this.user = e),
            (this.batchId = t),
            (this.state = n),
            (this.error = r);
        }
        static Zi(e, t, n) {
          var r = JSON.parse(n);
          let s,
            i =
              "object" == typeof r &&
              -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) &&
              (void 0 === r.error || "object" == typeof r.error);
          return (
            i &&
              r.error &&
              ((i =
                "string" == typeof r.error.message &&
                "string" == typeof r.error.code),
              i && (s = new br(r.error.code, r.error.message))),
            i
              ? new Mc(e, t, r.state, s)
              : (mr(
                  "SharedClientState",
                  `Failed to parse mutation state for ID '${t}': ${n}`
                ),
                null)
          );
        }
        tr() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class Oc {
        constructor(e, t, n) {
          (this.targetId = e), (this.state = t), (this.error = n);
        }
        static Zi(e, t) {
          var n = JSON.parse(t);
          let r,
            s =
              "object" == typeof n &&
              -1 !== ["not-current", "current", "rejected"].indexOf(n.state) &&
              (void 0 === n.error || "object" == typeof n.error);
          return (
            s &&
              n.error &&
              ((s =
                "string" == typeof n.error.message &&
                "string" == typeof n.error.code),
              s && (r = new br(n.error.code, n.error.message))),
            s
              ? new Oc(e, n.state, r)
              : (mr(
                  "SharedClientState",
                  `Failed to parse target state for ID '${e}': ${t}`
                ),
                null)
          );
        }
        tr() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class Vc {
        constructor(e, t) {
          (this.clientId = e), (this.activeTargetIds = t);
        }
        static Zi(e, t) {
          var n = JSON.parse(t);
          let r = "object" == typeof n && n.activeTargetIds instanceof Array,
            s = _a;
          for (let i = 0; r && i < n.activeTargetIds.length; ++i)
            (r = Ms(n.activeTargetIds[i])), (s = s.add(n.activeTargetIds[i]));
          return r
            ? new Vc(e, s)
            : (mr(
                "SharedClientState",
                `Failed to parse client data for instance '${e}': ${t}`
              ),
              null);
        }
      }
      class Fc {
        constructor(e, t) {
          (this.clientId = e), (this.onlineState = t);
        }
        static Zi(e) {
          var t = JSON.parse(e);
          return "object" == typeof t &&
            -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) &&
            "string" == typeof t.clientId
            ? new Fc(t.clientId, t.onlineState)
            : (mr("SharedClientState", `Failed to parse online state: ${e}`),
              null);
        }
      }
      class Pc {
        constructor() {
          this.activeTargetIds = _a;
        }
        er(e) {
          this.activeTargetIds = this.activeTargetIds.add(e);
        }
        nr(e) {
          this.activeTargetIds = this.activeTargetIds.delete(e);
        }
        tr() {
          var e = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now(),
          };
          return JSON.stringify(e);
        }
      }
      class Bc {
        constructor(e, t, n, r, s) {
          (this.window = e),
            (this.Hs = t),
            (this.persistenceKey = n),
            (this.sr = r),
            (this.syncEngine = null),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null),
            (this.ir = this.rr.bind(this)),
            (this.ur = new ps(Rr)),
            (this.started = !1),
            (this.cr = []);
          var i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          (this.storage = this.window.localStorage),
            (this.currentUser = s),
            (this.ar = kc(this.persistenceKey, this.sr)),
            (this.hr = `firestore_sequence_number_${this.persistenceKey}`),
            (this.ur = this.ur.insert(this.sr, new Pc())),
            (this.lr = new RegExp(`^firestore_clients_${i}_([^_]*)$`)),
            (this.dr = new RegExp(
              `^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`
            )),
            (this._r = new RegExp(`^firestore_targets_${i}_(\\d+)$`)),
            (this.wr = `firestore_online_state_${this.persistenceKey}`),
            (this.mr = `firestore_bundle_loaded_v2_${this.persistenceKey}`),
            this.window.addEventListener("storage", this.ir);
        }
        static C(e) {
          return !(!e || !e.localStorage);
        }
        async start() {
          const e = await this.syncEngine.vi();
          for (const n of e)
            if (n !== this.sr) {
              const e = this.getItem(kc(this.persistenceKey, n));
              var t;
              !e ||
                ((t = Vc.Zi(n, e)) &&
                  (this.ur = this.ur.insert(t.clientId, t)));
            }
          this.gr();
          const n = this.storage.getItem(this.wr);
          if (n) {
            const e = this.yr(n);
            e && this.pr(e);
          }
          for (const e of this.cr) this.rr(e);
          (this.cr = []),
            this.window.addEventListener("pagehide", () => this.shutdown()),
            (this.started = !0);
        }
        writeSequenceNumber(e) {
          this.setItem(this.hr, JSON.stringify(e));
        }
        getAllActiveQueryTargets() {
          return this.Ir(this.ur);
        }
        isActiveQueryTarget(n) {
          let r = !1;
          return (
            this.ur.forEach((e, t) => {
              t.activeTargetIds.has(n) && (r = !0);
            }),
            r
          );
        }
        addPendingMutation(e) {
          this.Tr(e, "pending");
        }
        updateMutationState(e, t, n) {
          this.Tr(e, t, n), this.Er(e);
        }
        addLocalQueryTarget(e) {
          let t = "not-current";
          var n;
          return (
            this.isActiveQueryTarget(e) &&
              (!(n = this.storage.getItem(Lc(this.persistenceKey, e))) ||
                ((n = Oc.Zi(e, n)) && (t = n.state))),
            this.Ar.er(e),
            this.gr(),
            t
          );
        }
        removeLocalQueryTarget(e) {
          this.Ar.nr(e), this.gr();
        }
        isLocalQueryTarget(e) {
          return this.Ar.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          this.removeItem(Lc(this.persistenceKey, e));
        }
        updateQueryState(e, t, n) {
          this.Rr(e, t, n);
        }
        handleUserChange(e, t, n) {
          t.forEach((e) => {
            this.Er(e);
          }),
            (this.currentUser = e),
            n.forEach((e) => {
              this.addPendingMutation(e);
            });
        }
        setOnlineState(e) {
          this.br(e);
        }
        notifyBundleLoaded(e) {
          this.Pr(e);
        }
        shutdown() {
          this.started &&
            (this.window.removeEventListener("storage", this.ir),
            this.removeItem(this.ar),
            (this.started = !1));
        }
        getItem(e) {
          var t = this.storage.getItem(e);
          return gr("SharedClientState", "READ", e, t), t;
        }
        setItem(e, t) {
          gr("SharedClientState", "SET", e, t), this.storage.setItem(e, t);
        }
        removeItem(e) {
          gr("SharedClientState", "REMOVE", e), this.storage.removeItem(e);
        }
        rr(e) {
          const s = e;
          s.storageArea === this.storage &&
            (gr("SharedClientState", "EVENT", s.key, s.newValue),
            s.key !== this.ar
              ? this.Hs.enqueueRetryable(async () => {
                  if (this.started) {
                    if (null !== s.key)
                      if (this.lr.test(s.key)) {
                        if (null == s.newValue) {
                          var e = this.vr(s.key);
                          return this.Vr(e, null);
                        }
                        e = this.Sr(s.key, s.newValue);
                        if (e) return this.Vr(e.clientId, e);
                      } else if (this.dr.test(s.key)) {
                        if (null !== s.newValue) {
                          var t = this.Dr(s.key, s.newValue);
                          if (t) return this.Cr(t);
                        }
                      } else if (this._r.test(s.key)) {
                        if (null !== s.newValue) {
                          t = this.Nr(s.key, s.newValue);
                          if (t) return this.kr(t);
                        }
                      } else if (s.key === this.wr) {
                        if (null !== s.newValue) {
                          var n = this.yr(s.newValue);
                          if (n) return this.pr(n);
                        }
                      } else if (s.key === this.hr) {
                        n = (function (e) {
                          let t = ds.at;
                          if (null != e)
                            try {
                              var n = JSON.parse(e);
                              wr("number" == typeof n), (t = n);
                            } catch (e) {
                              mr(
                                "SharedClientState",
                                "Failed to read sequence number from WebStorage",
                                e
                              );
                            }
                          return t;
                        })(s.newValue);
                        n !== ds.at && this.sequenceNumberHandler(n);
                      } else if (s.key === this.mr) {
                        const r = this.Or(s.newValue);
                        await Promise.all(r.map((e) => this.syncEngine.Mr(e)));
                      }
                  } else this.cr.push(s);
                })
              : mr(
                  "Received WebStorage notification for local change. Another client might have garbage-collected our state"
                ));
        }
        get Ar() {
          return this.ur.get(this.sr);
        }
        gr() {
          this.setItem(this.ar, this.Ar.tr());
        }
        Tr(e, t, n) {
          const r = new Mc(this.currentUser, e, t, n),
            s = Rc(this.persistenceKey, this.currentUser, e);
          this.setItem(s, r.tr());
        }
        Er(e) {
          var t = Rc(this.persistenceKey, this.currentUser, e);
          this.removeItem(t);
        }
        br(e) {
          var t = { clientId: this.sr, onlineState: e };
          this.storage.setItem(this.wr, JSON.stringify(t));
        }
        Rr(e, t, n) {
          const r = Lc(this.persistenceKey, e),
            s = new Oc(e, t, n);
          this.setItem(r, s.tr());
        }
        Pr(e) {
          var t = JSON.stringify(Array.from(e));
          this.setItem(this.mr, t);
        }
        vr(e) {
          var t = this.lr.exec(e);
          return t ? t[1] : null;
        }
        Sr(e, t) {
          var n = this.vr(e);
          return Vc.Zi(n, t);
        }
        Dr(e, t) {
          var n = this.dr.exec(e),
            r = Number(n[1]),
            n = void 0 !== n[2] ? n[2] : null;
          return Mc.Zi(new hr(n), r, t);
        }
        Nr(e, t) {
          var n = this._r.exec(e),
            n = Number(n[1]);
          return Oc.Zi(n, t);
        }
        yr(e) {
          return Fc.Zi(e);
        }
        Or(e) {
          return JSON.parse(e);
        }
        async Cr(e) {
          if (e.user.uid === this.currentUser.uid)
            return this.syncEngine.Fr(e.batchId, e.state, e.error);
          gr(
            "SharedClientState",
            `Ignoring mutation for non-active user ${e.user.uid}`
          );
        }
        kr(e) {
          return this.syncEngine.$r(e.targetId, e.state, e.error);
        }
        Vr(e, t) {
          const n = t ? this.ur.insert(e, t) : this.ur.remove(e),
            r = this.Ir(this.ur),
            s = this.Ir(n),
            i = [],
            a = [];
          return (
            s.forEach((e) => {
              r.has(e) || i.push(e);
            }),
            r.forEach((e) => {
              s.has(e) || a.push(e);
            }),
            this.syncEngine.Br(i, a).then(() => {
              this.ur = n;
            })
          );
        }
        pr(e) {
          this.ur.get(e.clientId) && this.onlineStateHandler(e.onlineState);
        }
        Ir(e) {
          let n = _a;
          return (
            e.forEach((e, t) => {
              n = n.unionWith(t.activeTargetIds);
            }),
            n
          );
        }
      }
      class Uc {
        constructor() {
          (this.Lr = new Pc()),
            (this.Ur = {}),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null);
        }
        addPendingMutation(e) {}
        updateMutationState(e, t, n) {}
        addLocalQueryTarget(e) {
          return this.Lr.er(e), this.Ur[e] || "not-current";
        }
        updateQueryState(e, t, n) {
          this.Ur[e] = t;
        }
        removeLocalQueryTarget(e) {
          this.Lr.nr(e);
        }
        isLocalQueryTarget(e) {
          return this.Lr.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          delete this.Ur[e];
        }
        getAllActiveQueryTargets() {
          return this.Lr.activeTargetIds;
        }
        isActiveQueryTarget(e) {
          return this.Lr.activeTargetIds.has(e);
        }
        start() {
          return (this.Lr = new Pc()), Promise.resolve();
        }
        handleUserChange(e, t, n) {}
        setOnlineState(e) {}
        shutdown() {}
        writeSequenceNumber(e) {}
        notifyBundleLoaded(e) {}
      }
      class qc {
        qr(e) {}
        shutdown() {}
      }
      class Kc {
        constructor() {
          (this.Kr = () => this.Gr()),
            (this.Qr = () => this.jr()),
            (this.Wr = []),
            this.zr();
        }
        qr(e) {
          this.Wr.push(e);
        }
        shutdown() {
          window.removeEventListener("online", this.Kr),
            window.removeEventListener("offline", this.Qr);
        }
        zr() {
          window.addEventListener("online", this.Kr),
            window.addEventListener("offline", this.Qr);
        }
        Gr() {
          gr("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
          for (const e of this.Wr) e(0);
        }
        jr() {
          gr(
            "ConnectivityMonitor",
            "Network connectivity changed: UNAVAILABLE"
          );
          for (const e of this.Wr) e(1);
        }
        static C() {
          return (
            "undefined" != typeof window &&
            void 0 !== window.addEventListener &&
            void 0 !== window.removeEventListener
          );
        }
      }
      const Gc = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery",
        RunAggregationQuery: "runAggregationQuery",
      };
      class jc {
        constructor(e) {
          (this.Hr = e.Hr), (this.Jr = e.Jr);
        }
        Yr(e) {
          this.Xr = e;
        }
        Zr(e) {
          this.eo = e;
        }
        onMessage(e) {
          this.no = e;
        }
        close() {
          this.Jr();
        }
        send(e) {
          this.Hr(e);
        }
        so() {
          this.Xr();
        }
        io(e) {
          this.eo(e);
        }
        ro(e) {
          this.no(e);
        }
      }
      class $c extends class {
        constructor(e) {
          (this.databaseInfo = e), (this.databaseId = e.databaseId);
          var t = e.ssl ? "https" : "http";
          (this.oo = t + "://" + e.host),
            (this.uo =
              "projects/" +
              this.databaseId.projectId +
              "/databases/" +
              this.databaseId.database +
              "/documents");
        }
        get co() {
          return !1;
        }
        ao(t, e, n, r, s) {
          const i = this.ho(t, e);
          gr("RestConnection", "Sending: ", i, n);
          var a = {};
          return (
            this.lo(a, r, s),
            this.fo(t, i, a, n).then(
              (e) => (gr("RestConnection", "Received: ", e), e),
              (e) => {
                throw (
                  (pr(
                    "RestConnection",
                    `${t} failed with error: `,
                    e,
                    "url: ",
                    i,
                    "request:",
                    n
                  ),
                  e)
                );
              }
            )
          );
        }
        _o(e, t, n, r, s, i) {
          return this.ao(e, t, n, r, s);
        }
        lo(n, e, t) {
          (n["X-Goog-Api-Client"] = "gl-js/ fire/" + lr),
            (n["Content-Type"] = "text/plain"),
            this.databaseInfo.appId &&
              (n["X-Firebase-GMPID"] = this.databaseInfo.appId),
            e && e.headers.forEach((e, t) => (n[t] = e)),
            t && t.headers.forEach((e, t) => (n[t] = e));
        }
        ho(e, t) {
          var n = Gc[e];
          return `${this.oo}/v1/${t}:${n}`;
        }
      } {
        constructor(e) {
          super(e),
            (this.forceLongPolling = e.forceLongPolling),
            (this.autoDetectLongPolling = e.autoDetectLongPolling),
            (this.useFetchStreams = e.useFetchStreams);
        }
        fo(u, t, n, r) {
          return new Promise((i, a) => {
            const o = new ur();
            o.setWithCredentials(!0),
              o.listenOnce(nr.COMPLETE, () => {
                var t, n;
                try {
                  switch (o.getLastErrorCode()) {
                    case tr.NO_ERROR:
                      var e = o.getResponseJson();
                      gr("Connection", "XHR received:", JSON.stringify(e)),
                        i(e);
                      break;
                    case tr.TIMEOUT:
                      gr("Connection", 'RPC "' + u + '" timed out'),
                        a(new br(Ir.DEADLINE_EXCEEDED, "Request time out"));
                      break;
                    case tr.HTTP_ERROR:
                      var r = o.getStatus();
                      if (
                        (gr(
                          "Connection",
                          'RPC "' + u + '" failed with status:',
                          r,
                          "response text:",
                          o.getResponseText()
                        ),
                        0 < r)
                      ) {
                        let e = o.getResponseJson();
                        Array.isArray(e) && (e = e[0]);
                        var s =
                          null === (t = e) || void 0 === t ? void 0 : t.error;
                        if (s && s.status && s.message) {
                          const u =
                            ((n = s.status.toLowerCase().replace(/_/g, "-")),
                            0 <= Object.values(Ir).indexOf(n) ? n : Ir.UNKNOWN);
                          a(new br(u, s.message));
                        } else
                          a(
                            new br(
                              Ir.UNKNOWN,
                              "Server responded with status " + o.getStatus()
                            )
                          );
                      } else a(new br(Ir.UNAVAILABLE, "Connection failed."));
                      break;
                    default:
                      vr();
                  }
                } finally {
                  gr("Connection", 'RPC "' + u + '" completed.');
                }
              });
            var e = JSON.stringify(r);
            o.send(t, "POST", e, n, 15);
          });
        }
        wo(e, t, n) {
          const r = [
              this.oo,
              "/",
              "google.firestore.v1.Firestore",
              "/",
              e,
              "/channel",
            ],
            s = new Hn(),
            i = er(),
            a = {
              httpSessionIdParam: "gsessionid",
              initMessageHeaders: {},
              messageUrlParams: {
                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
              },
              sendRawJson: !0,
              supportsCrossDomainXhr: !0,
              internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
              forceLongPolling: this.forceLongPolling,
              detectBufferingProxy: this.autoDetectLongPolling,
            };
          this.useFetchStreams && (a.xmlHttpFactory = new ar({})),
            this.lo(a.initMessageHeaders, t, n),
            (a.encodeInitMessageHeaders = !0);
          var o = r.join("");
          gr("Connection", "Creating WebChannel: " + o, a);
          const u = s.createWebChannel(o, a);
          let c = !1,
            h = !1;
          const l = new jc({
              Hr: (e) => {
                h
                  ? gr(
                      "Connection",
                      "Not sending because WebChannel is closed:",
                      e
                    )
                  : (c ||
                      (gr("Connection", "Opening WebChannel transport."),
                      u.open(),
                      (c = !0)),
                    gr("Connection", "WebChannel sending:", e),
                    u.send(e));
              },
              Jr: () => u.close(),
            }),
            d = (e, t, n) => {
              e.listen(t, (e) => {
                try {
                  n(e);
                } catch (e) {
                  setTimeout(() => {
                    throw e;
                  }, 0);
                }
              });
            };
          return (
            d(u, or.EventType.OPEN, () => {
              h || gr("Connection", "WebChannel transport opened.");
            }),
            d(u, or.EventType.CLOSE, () => {
              h ||
                ((h = !0),
                gr("Connection", "WebChannel transport closed"),
                l.io());
            }),
            d(u, or.EventType.ERROR, (e) => {
              h ||
                ((h = !0),
                pr("Connection", "WebChannel transport errored:", e),
                l.io(
                  new br(Ir.UNAVAILABLE, "The operation could not be completed")
                ));
            }),
            d(u, or.EventType.MESSAGE, (n) => {
              if (!h) {
                var e = n.data[0];
                wr(!!e);
                var r =
                  e.error ||
                  (null === (r = e[0]) || void 0 === r ? void 0 : r.error);
                if (r) {
                  gr("Connection", "WebChannel received error:", r);
                  const n = r.status;
                  let e = (function (e) {
                      var t = Zn[e];
                      if (void 0 !== t) return ma(t);
                    })(n),
                    t = r.message;
                  void 0 === e &&
                    ((e = Ir.INTERNAL),
                    (t =
                      "Unknown error status: " +
                      n +
                      " with message " +
                      r.message)),
                    (h = !0),
                    l.io(new br(e, t)),
                    u.close();
                } else gr("Connection", "WebChannel received:", e), l.ro(e);
              }
            }),
            d(i, rr.STAT_EVENT, (e) => {
              e.stat === sr
                ? gr("Connection", "Detected buffering proxy")
                : e.stat === ir &&
                  gr("Connection", "Detected no buffering proxy");
            }),
            setTimeout(() => {
              l.so();
            }, 0),
            l
          );
        }
      }
      function Qc() {
        return "undefined" != typeof window ? window : null;
      }
      function zc() {
        return "undefined" != typeof document ? document : null;
      }
      function Hc(e) {
        return new Fa(e, !0);
      }
      class Wc {
        constructor(e, t, n = 1e3, r = 1.5, s = 6e4) {
          (this.Hs = e),
            (this.timerId = t),
            (this.mo = n),
            (this.yo = r),
            (this.po = s),
            (this.Io = 0),
            (this.To = null),
            (this.Eo = Date.now()),
            this.reset();
        }
        reset() {
          this.Io = 0;
        }
        Ao() {
          this.Io = this.po;
        }
        Ro(e) {
          this.cancel();
          var t = Math.floor(this.Io + this.bo()),
            n = Math.max(0, Date.now() - this.Eo),
            r = Math.max(0, t - n);
          0 < r &&
            gr(
              "ExponentialBackoff",
              `Backing off for ${r} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
            ),
            (this.To = this.Hs.enqueueAfterDelay(
              this.timerId,
              r,
              () => ((this.Eo = Date.now()), e())
            )),
            (this.Io *= this.yo),
            this.Io < this.mo && (this.Io = this.mo),
            this.Io > this.po && (this.Io = this.po);
        }
        Po() {
          null !== this.To && (this.To.skipDelay(), (this.To = null));
        }
        cancel() {
          null !== this.To && (this.To.cancel(), (this.To = null));
        }
        bo() {
          return (Math.random() - 0.5) * this.Io;
        }
      }
      class Yc {
        constructor(e, t, n, r, s, i, a, o) {
          (this.Hs = e),
            (this.vo = n),
            (this.Vo = r),
            (this.connection = s),
            (this.authCredentialsProvider = i),
            (this.appCheckCredentialsProvider = a),
            (this.listener = o),
            (this.state = 0),
            (this.So = 0),
            (this.Do = null),
            (this.Co = null),
            (this.stream = null),
            (this.xo = new Wc(e, t));
        }
        No() {
          return 1 === this.state || 5 === this.state || this.ko();
        }
        ko() {
          return 2 === this.state || 3 === this.state;
        }
        start() {
          4 !== this.state ? this.auth() : this.Oo();
        }
        async stop() {
          this.No() && (await this.close(0));
        }
        Mo() {
          (this.state = 0), this.xo.reset();
        }
        Fo() {
          this.ko() &&
            null === this.Do &&
            (this.Do = this.Hs.enqueueAfterDelay(this.vo, 6e4, () =>
              this.$o()
            ));
        }
        Bo(e) {
          this.Lo(), this.stream.send(e);
        }
        async $o() {
          if (this.ko()) return this.close(0);
        }
        Lo() {
          this.Do && (this.Do.cancel(), (this.Do = null));
        }
        Uo() {
          this.Co && (this.Co.cancel(), (this.Co = null));
        }
        async close(e, t) {
          this.Lo(),
            this.Uo(),
            this.xo.cancel(),
            this.So++,
            4 !== e
              ? this.xo.reset()
              : t && t.code === Ir.RESOURCE_EXHAUSTED
              ? (mr(t.toString()),
                mr(
                  "Using maximum backoff delay to prevent overloading the backend."
                ),
                this.xo.Ao())
              : t &&
                t.code === Ir.UNAUTHENTICATED &&
                3 !== this.state &&
                (this.authCredentialsProvider.invalidateToken(),
                this.appCheckCredentialsProvider.invalidateToken()),
            null !== this.stream &&
              (this.qo(), this.stream.close(), (this.stream = null)),
            (this.state = e),
            await this.listener.Zr(t);
        }
        qo() {}
        auth() {
          this.state = 1;
          const e = this.Ko(this.So),
            n = this.So;
          Promise.all([
            this.authCredentialsProvider.getToken(),
            this.appCheckCredentialsProvider.getToken(),
          ]).then(
            ([e, t]) => {
              this.So === n && this.Go(e, t);
            },
            (t) => {
              e(() => {
                var e = new br(
                  Ir.UNKNOWN,
                  "Fetching auth token failed: " + t.message
                );
                return this.Qo(e);
              });
            }
          );
        }
        Go(e, t) {
          const n = this.Ko(this.So);
          (this.stream = this.jo(e, t)),
            this.stream.Yr(() => {
              n(
                () => (
                  (this.state = 2),
                  (this.Co = this.Hs.enqueueAfterDelay(
                    this.Vo,
                    1e4,
                    () => (this.ko() && (this.state = 3), Promise.resolve())
                  )),
                  this.listener.Yr()
                )
              );
            }),
            this.stream.Zr((e) => {
              n(() => this.Qo(e));
            }),
            this.stream.onMessage((e) => {
              n(() => this.onMessage(e));
            });
        }
        Oo() {
          (this.state = 5),
            this.xo.Ro(async () => {
              (this.state = 0), this.start();
            });
        }
        Qo(e) {
          return (
            gr("PersistentStream", `close with error: ${e}`),
            (this.stream = null),
            this.close(4, e)
          );
        }
        Ko(t) {
          return (e) => {
            this.Hs.enqueueAndForget(() =>
              this.So === t
                ? e()
                : (gr(
                    "PersistentStream",
                    "stream callback skipped by getCloseGuardedDispatcher."
                  ),
                  Promise.resolve())
            );
          };
        }
      }
      class Xc extends Yc {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "listen_stream_connection_backoff",
            "listen_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.It = s);
        }
        jo(e, t) {
          return this.connection.wo("Listen", e, t);
        }
        onMessage(e) {
          this.xo.reset();
          var t = (function (e, t) {
              let n;
              if ("targetChange" in t) {
                t.targetChange;
                var r =
                    "NO_CHANGE" ===
                    (f = t.targetChange.targetChangeType || "NO_CHANGE")
                      ? 0
                      : "ADD" === f
                      ? 1
                      : "REMOVE" === f
                      ? 2
                      : "CURRENT" === f
                      ? 3
                      : "RESET" === f
                      ? 4
                      : vr(),
                  s = t.targetChange.targetIds || [],
                  i =
                    ((f = t.targetChange.resumeToken),
                    e.gt
                      ? (wr(void 0 === f || "string" == typeof f),
                        Ts.fromBase64String(f || ""))
                      : (wr(void 0 === f || f instanceof Uint8Array),
                        Ts.fromUint8Array(f || new Uint8Array()))),
                  a = t.targetChange.cause,
                  o =
                    a &&
                    ((o = void 0 === (f = a).code ? Ir.UNKNOWN : ma(f.code)),
                    new br(o, f.message || ""));
                n = new Na(r, s, i, o || null);
              } else if ("documentChange" in t) {
                t.documentChange;
                var u = t.documentChange;
                u.document, u.document.name, u.document.updateTime;
                var o = ja(e, u.document.name),
                  c = Ua(u.document.updateTime),
                  h = new Zs({ mapValue: { fields: u.document.fields } }),
                  c = ei.newFoundDocument(o, c, h),
                  h = u.targetIds || [],
                  u = u.removedTargetIds || [];
                n = new Aa(h, u, c.key, c);
              } else if ("documentDelete" in t) {
                t.documentDelete;
                h = t.documentDelete;
                h.document;
                (u = ja(e, h.document)),
                  (c = h.readTime ? Ua(h.readTime) : Vr.min()),
                  (c = ei.newNoDocument(u, c)),
                  (h = h.removedTargetIds || []);
                n = new Aa([], h, c.key, c);
              } else if ("documentRemove" in t) {
                t.documentRemove;
                var l = t.documentRemove;
                l.document;
                var d = ja(e, l.document),
                  l = l.removedTargetIds || [];
                n = new Aa([], l, d, null);
              } else {
                if (!("filter" in t)) return vr();
                {
                  t.filter;
                  const e = t.filter;
                  e.targetId;
                  (l = e.count || 0), (d = new fa(l)), (l = e.targetId);
                  n = new Ca(l, d);
                }
              }
              var o, f;
              return n;
            })(this.It, e),
            n = (function (e) {
              if (!("targetChange" in e)) return Vr.min();
              var t = e.targetChange;
              return (!t.targetIds || !t.targetIds.length) && t.readTime
                ? Ua(t.readTime)
                : Vr.min();
            })(e);
          return this.listener.Wo(t, n);
        }
        zo(e) {
          const t = {};
          (t.database = za(this.It)),
            (t.addTarget = (function (e, t) {
              let n;
              var r = t.target;
              return (
                (n = ii(r) ? { documents: Za(e, r) } : { query: eo(e, r) }),
                (n.targetId = t.targetId),
                0 < t.resumeToken.approximateByteSize()
                  ? (n.resumeToken = Ba(e, t.resumeToken))
                  : 0 < t.snapshotVersion.compareTo(Vr.min()) &&
                    (n.readTime = Pa(e, t.snapshotVersion.toTimestamp())),
                n
              );
            })(this.It, e));
          var n,
            r,
            r =
              (this.It,
              (n = e),
              null ==
              (r = (function () {
                switch (n.purpose) {
                  case 0:
                    return null;
                  case 1:
                    return "existence-filter-mismatch";
                  case 2:
                    return "limbo-document";
                  default:
                    return vr();
                }
              })())
                ? null
                : { "goog-listen-tags": r });
          r && (t.labels = r), this.Bo(t);
        }
        Ho(e) {
          const t = {};
          (t.database = za(this.It)), (t.removeTarget = e), this.Bo(t);
        }
      }
      class Jc extends Yc {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "write_stream_connection_backoff",
            "write_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.It = s),
            (this.Jo = !1);
        }
        get Yo() {
          return this.Jo;
        }
        start() {
          (this.Jo = !1), (this.lastStreamToken = void 0), super.start();
        }
        qo() {
          this.Jo && this.Xo([]);
        }
        jo(e, t) {
          return this.connection.wo("Write", e, t);
        }
        onMessage(e) {
          if (
            (wr(!!e.streamToken),
            (this.lastStreamToken = e.streamToken),
            this.Jo)
          ) {
            this.xo.reset();
            var t =
                ((r = e.writeResults),
                (s = e.commitTime),
                r && 0 < r.length
                  ? (wr(void 0 !== s),
                    r.map((e) =>
                      (function (e, t) {
                        let n = e.updateTime ? Ua(e.updateTime) : Ua(t);
                        return (
                          n.isEqual(Vr.min()) && (n = Ua(t)),
                          new Ji(n, e.transformResults || [])
                        );
                      })(e, s)
                    ))
                  : []),
              n = Ua(e.commitTime);
            return this.listener.Zo(n, t);
          }
          var r, s;
          return (
            wr(!e.writeResults || 0 === e.writeResults.length),
            (this.Jo = !0),
            this.listener.tu()
          );
        }
        eu() {
          const e = {};
          (e.database = za(this.It)), this.Bo(e);
        }
        Xo(e) {
          var t = {
            streamToken: this.lastStreamToken,
            writes: e.map((e) => Xa(this.It, e)),
          };
          this.Bo(t);
        }
      }
      class Zc extends class {} {
        constructor(e, t, n, r) {
          super(),
            (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.connection = n),
            (this.It = r),
            (this.nu = !1);
        }
        su() {
          if (this.nu)
            throw new br(
              Ir.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        ao(n, r, s) {
          return (
            this.su(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.connection.ao(n, r, s, e, t))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === Ir.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new br(Ir.UNKNOWN, e.toString());
              })
          );
        }
        _o(n, r, s, i) {
          return (
            this.su(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.connection._o(n, r, s, e, t, i))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === Ir.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new br(Ir.UNKNOWN, e.toString());
              })
          );
        }
        terminate() {
          this.nu = !0;
        }
      }
      class eh {
        constructor(e, t) {
          (this.asyncQueue = e),
            (this.onlineStateHandler = t),
            (this.state = "Unknown"),
            (this.iu = 0),
            (this.ru = null),
            (this.ou = !0);
        }
        uu() {
          0 === this.iu &&
            (this.cu("Unknown"),
            (this.ru = this.asyncQueue.enqueueAfterDelay(
              "online_state_timeout",
              1e4,
              () => (
                (this.ru = null),
                this.au("Backend didn't respond within 10 seconds."),
                this.cu("Offline"),
                Promise.resolve()
              )
            )));
        }
        hu(e) {
          "Online" === this.state
            ? this.cu("Unknown")
            : (this.iu++,
              1 <= this.iu &&
                (this.lu(),
                this.au(
                  `Connection failed 1 times. Most recent error: ${e.toString()}`
                ),
                this.cu("Offline")));
        }
        set(e) {
          this.lu(),
            (this.iu = 0),
            "Online" === e && (this.ou = !1),
            this.cu(e);
        }
        cu(e) {
          e !== this.state && ((this.state = e), this.onlineStateHandler(e));
        }
        au(e) {
          var t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
          this.ou ? (mr(t), (this.ou = !1)) : gr("OnlineStateTracker", t);
        }
        lu() {
          null !== this.ru && (this.ru.cancel(), (this.ru = null));
        }
      }
      class th {
        constructor(e, t, n, r, s) {
          (this.localStore = e),
            (this.datastore = t),
            (this.asyncQueue = n),
            (this.remoteSyncer = {}),
            (this.fu = []),
            (this.du = new Map()),
            (this._u = new Set()),
            (this.wu = []),
            (this.mu = s),
            this.mu.qr((e) => {
              n.enqueueAndForget(async () => {
                hh(this) &&
                  (gr(
                    "RemoteStore",
                    "Restarting streams for network reachability change."
                  ),
                  await (async function (e) {
                    const t = e;
                    t._u.add(4),
                      await rh(t),
                      t.gu.set("Unknown"),
                      t._u.delete(4),
                      await nh(t);
                  })(this));
              });
            }),
            (this.gu = new eh(n, r));
        }
      }
      async function nh(e) {
        if (hh(e)) for (const t of e.wu) await t(!0);
      }
      async function rh(e) {
        for (const t of e.wu) await t(!1);
      }
      function sh(e, t) {
        const n = e;
        n.du.has(t.targetId) ||
          (n.du.set(t.targetId, t), ch(n) ? uh(n) : wh(n).ko() && ah(n, t));
      }
      function ih(e, t) {
        const n = e,
          r = wh(n);
        n.du.delete(t),
          r.ko() && oh(n, t),
          0 === n.du.size && (r.ko() ? r.Fo() : hh(n) && n.gu.set("Unknown"));
      }
      function ah(e, t) {
        e.yu.Mt(t.targetId), wh(e).zo(t);
      }
      function oh(e, t) {
        e.yu.Mt(t), wh(e).Ho(t);
      }
      function uh(t) {
        (t.yu = new Ra({
          getRemoteKeysForTarget: (e) =>
            t.remoteSyncer.getRemoteKeysForTarget(e),
          se: (e) => t.du.get(e) || null,
        })),
          wh(t).start(),
          t.gu.uu();
      }
      function ch(e) {
        return hh(e) && !wh(e).No() && 0 < e.du.size;
      }
      function hh(e) {
        return 0 === e._u.size;
      }
      function lh(e) {
        e.yu = void 0;
      }
      async function dh(e, t, n) {
        if (!is(t)) throw t;
        e._u.add(1),
          await rh(e),
          e.gu.set("Offline"),
          (n = n || (() => Ec(e.localStore))),
          e.asyncQueue.enqueueRetryable(async () => {
            gr("RemoteStore", "Retrying IndexedDB access"),
              await n(),
              e._u.delete(1),
              await nh(e);
          });
      }
      function fh(t, n) {
        return n().catch((e) => dh(t, e, n));
      }
      async function gh(e) {
        const t = e,
          n = Ih(t);
        let r = 0 < t.fu.length ? t.fu[t.fu.length - 1].batchId : -1;
        for (; hh((s = t)) && s.fu.length < 10; )
          try {
            const e = await (function (e, t) {
              const n = e;
              return n.persistence.runTransaction(
                "Get next mutation batch",
                "readonly",
                (e) => (
                  void 0 === t && (t = -1),
                  n.mutationQueue.getNextMutationBatchAfterBatchId(e, t)
                )
              );
            })(t.localStore, r);
            if (null === e) {
              0 === t.fu.length && n.Fo();
              break;
            }
            (r = e.batchId),
              (function (e, t) {
                e.fu.push(t);
                const n = Ih(e);
                n.ko() && n.Yo && n.Xo(t.mutations);
              })(t, e);
          } catch (e) {
            await dh(t, e);
          }
        var s;
        mh(t) && ph(t);
      }
      function mh(e) {
        return hh(e) && !Ih(e).No() && 0 < e.fu.length;
      }
      function ph(e) {
        Ih(e).start();
      }
      async function yh(e, t) {
        const n = e;
        n.asyncQueue.verifyOperationInProgress(),
          gr("RemoteStore", "RemoteStore received new credentials");
        var r = hh(n);
        n._u.add(3),
          await rh(n),
          r && n.gu.set("Unknown"),
          await n.remoteSyncer.handleCredentialChange(t),
          n._u.delete(3),
          await nh(n);
      }
      async function vh(e, t) {
        const n = e;
        t
          ? (n._u.delete(2), await nh(n))
          : (n._u.add(2), await rh(n), n.gu.set("Unknown"));
      }
      function wh(t) {
        return (
          t.pu ||
            ((t.pu = (function (e, t, n) {
              const r = e;
              return (
                r.su(),
                new Xc(
                  t,
                  r.connection,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.It,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              Yr: async function (n) {
                n.du.forEach((e, t) => {
                  ah(n, e);
                });
              }.bind(null, t),
              Zr: async function (e, t) {
                lh(e), ch(e) ? (e.gu.hu(t), uh(e)) : e.gu.set("Unknown");
              }.bind(null, t),
              Wo: async function (e, r, t) {
                if (
                  (e.gu.set("Online"),
                  r instanceof Na && 2 === r.state && r.cause)
                )
                  try {
                    await (async function (e) {
                      var t = r.cause;
                      for (const n of r.targetIds)
                        e.du.has(n) &&
                          (await e.remoteSyncer.rejectListen(n, t),
                          e.du.delete(n),
                          e.yu.removeTarget(n));
                    })(e);
                  } catch (t) {
                    gr(
                      "RemoteStore",
                      "Failed to remove targets %s: %s ",
                      r.targetIds.join(","),
                      t
                    ),
                      await dh(e, t);
                  }
                else if (
                  (r instanceof Aa
                    ? e.yu.Gt(r)
                    : r instanceof Ca
                    ? e.yu.Yt(r)
                    : e.yu.Wt(r),
                  !t.isEqual(Vr.min()))
                )
                  try {
                    const r = await Ec(e.localStore);
                    0 <= t.compareTo(r) &&
                      (await (function (r, s) {
                        const e = r.yu.te(s);
                        return (
                          e.targetChanges.forEach((e, t) => {
                            if (0 < e.resumeToken.approximateByteSize()) {
                              const n = r.du.get(t);
                              n &&
                                r.du.set(
                                  t,
                                  n.withResumeToken(e.resumeToken, s)
                                );
                            }
                          }),
                          e.targetMismatches.forEach((e) => {
                            const t = r.du.get(e);
                            var n;
                            t &&
                              (r.du.set(
                                e,
                                t.withResumeToken(
                                  Ts.EMPTY_BYTE_STRING,
                                  t.snapshotVersion
                                )
                              ),
                              oh(r, e),
                              (n = new Bo(t.target, e, 1, t.sequenceNumber)),
                              ah(r, n));
                          }),
                          r.remoteSyncer.applyRemoteEvent(e)
                        );
                      })(e, t));
                  } catch (r) {
                    gr("RemoteStore", "Failed to raise snapshot:", r),
                      await dh(e, r);
                  }
              }.bind(null, t),
            })),
            t.wu.push(async (e) => {
              e
                ? (t.pu.Mo(), ch(t) ? uh(t) : t.gu.set("Unknown"))
                : (await t.pu.stop(), lh(t));
            })),
          t.pu
        );
      }
      function Ih(t) {
        return (
          t.Iu ||
            ((t.Iu = (function (e, t, n) {
              const r = e;
              return (
                r.su(),
                new Jc(
                  t,
                  r.connection,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.It,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              Yr: async function (e) {
                Ih(e).eu();
              }.bind(null, t),
              Zr: async function (e, t) {
                t &&
                  Ih(e).Yo &&
                  (await (async function (e, t) {
                    if (ga((n = t.code)) && n !== Ir.ABORTED) {
                      const n = e.fu.shift();
                      Ih(e).Mo(),
                        await fh(e, () =>
                          e.remoteSyncer.rejectFailedWrite(n.batchId, t)
                        ),
                        await gh(e);
                    }
                    var n;
                  })(e, t)),
                  mh(e) && ph(e);
              }.bind(null, t),
              tu: async function (e) {
                const t = Ih(e);
                for (const n of e.fu) t.Xo(n.mutations);
              }.bind(null, t),
              Zo: async function (e, t, n) {
                const r = e.fu.shift(),
                  s = Fo.from(r, t, n);
                await fh(e, () => e.remoteSyncer.applySuccessfulWrite(s)),
                  await gh(e);
              }.bind(null, t),
            })),
            t.wu.push(async (e) => {
              e
                ? (t.Iu.Mo(), await gh(t))
                : (await t.Iu.stop(),
                  0 < t.fu.length &&
                    (gr(
                      "RemoteStore",
                      `Stopping write stream with ${t.fu.length} pending writes`
                    ),
                    (t.fu = [])));
            })),
          t.Iu
        );
      }
      class bh {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.timerId = t),
            (this.targetTimeMs = n),
            (this.op = r),
            (this.removalCallback = s),
            (this.deferred = new Er()),
            (this.then = this.deferred.promise.then.bind(
              this.deferred.promise
            )),
            this.deferred.promise.catch((e) => {});
        }
        static createAndSchedule(e, t, n, r, s) {
          const i = Date.now() + n,
            a = new bh(e, t, i, r, s);
          return a.start(n), a;
        }
        start(e) {
          this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
        }
        skipDelay() {
          return this.handleDelayElapsed();
        }
        cancel(e) {
          null !== this.timerHandle &&
            (this.clearTimeout(),
            this.deferred.reject(
              new br(Ir.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))
            ));
        }
        handleDelayElapsed() {
          this.asyncQueue.enqueueAndForget(() =>
            null !== this.timerHandle
              ? (this.clearTimeout(),
                this.op().then((e) => this.deferred.resolve(e)))
              : Promise.resolve()
          );
        }
        clearTimeout() {
          null !== this.timerHandle &&
            (this.removalCallback(this),
            clearTimeout(this.timerHandle),
            (this.timerHandle = null));
        }
      }
      function Eh(e, t) {
        if ((mr("AsyncQueue", `${t}: ${e}`), is(e)))
          return new br(Ir.UNAVAILABLE, `${t}: ${e}`);
        throw e;
      }
      class Th {
        constructor(n) {
          (this.comparator = n
            ? (e, t) => n(e, t) || qr.comparator(e.key, t.key)
            : (e, t) => qr.comparator(e.key, t.key)),
            (this.keyedMap = wa()),
            (this.sortedSet = new ps(this.comparator));
        }
        static emptySet(e) {
          return new Th(e.comparator);
        }
        has(e) {
          return null != this.keyedMap.get(e);
        }
        get(e) {
          return this.keyedMap.get(e);
        }
        first() {
          return this.sortedSet.minKey();
        }
        last() {
          return this.sortedSet.maxKey();
        }
        isEmpty() {
          return this.sortedSet.isEmpty();
        }
        indexOf(e) {
          var t = this.keyedMap.get(e);
          return t ? this.sortedSet.indexOf(t) : -1;
        }
        get size() {
          return this.sortedSet.size;
        }
        forEach(n) {
          this.sortedSet.inorderTraversal((e, t) => (n(e), !1));
        }
        add(e) {
          const t = this.delete(e.key);
          return t.copy(
            t.keyedMap.insert(e.key, e),
            t.sortedSet.insert(e, null)
          );
        }
        delete(e) {
          var t = this.get(e);
          return t
            ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
            : this;
        }
        isEqual(e) {
          if (!(e instanceof Th)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.sortedSet.getIterator(),
            n = e.sortedSet.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (!e.isEqual(r)) return !1;
          }
          return !0;
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e.toString());
            }),
            0 === t.length
              ? "DocumentSet ()"
              : "DocumentSet (\n  " + t.join("  \n") + "\n)"
          );
        }
        copy(e, t) {
          const n = new Th();
          return (
            (n.comparator = this.comparator),
            (n.keyedMap = e),
            (n.sortedSet = t),
            n
          );
        }
      }
      class Sh {
        constructor() {
          this.Tu = new ps(qr.comparator);
        }
        track(e) {
          var t = e.doc.key,
            n = this.Tu.get(t);
          !n || (0 !== e.type && 3 === n.type)
            ? (this.Tu = this.Tu.insert(t, e))
            : 3 === e.type && 1 !== n.type
            ? (this.Tu = this.Tu.insert(t, { type: n.type, doc: e.doc }))
            : 2 === e.type && 2 === n.type
            ? (this.Tu = this.Tu.insert(t, { type: 2, doc: e.doc }))
            : 2 === e.type && 0 === n.type
            ? (this.Tu = this.Tu.insert(t, { type: 0, doc: e.doc }))
            : 1 === e.type && 0 === n.type
            ? (this.Tu = this.Tu.remove(t))
            : 1 === e.type && 2 === n.type
            ? (this.Tu = this.Tu.insert(t, { type: 1, doc: n.doc }))
            : 0 === e.type && 1 === n.type
            ? (this.Tu = this.Tu.insert(t, { type: 2, doc: e.doc }))
            : vr();
        }
        Eu() {
          const n = [];
          return (
            this.Tu.inorderTraversal((e, t) => {
              n.push(t);
            }),
            n
          );
        }
      }
      class _h {
        constructor(e, t, n, r, s, i, a, o, u) {
          (this.query = e),
            (this.docs = t),
            (this.oldDocs = n),
            (this.docChanges = r),
            (this.mutatedKeys = s),
            (this.fromCache = i),
            (this.syncStateChanged = a),
            (this.excludesMetadataChanges = o),
            (this.hasCachedResults = u);
        }
        static fromInitialDocuments(e, t, n, r, s) {
          const i = [];
          return (
            t.forEach((e) => {
              i.push({ type: 0, doc: e });
            }),
            new _h(e, t, Th.emptySet(t), i, n, r, !0, !1, s)
          );
        }
        get hasPendingWrites() {
          return !this.mutatedKeys.isEmpty();
        }
        isEqual(e) {
          if (
            !(
              this.fromCache === e.fromCache &&
              this.hasCachedResults === e.hasCachedResults &&
              this.syncStateChanged === e.syncStateChanged &&
              this.mutatedKeys.isEqual(e.mutatedKeys) &&
              Ri(this.query, e.query) &&
              this.docs.isEqual(e.docs) &&
              this.oldDocs.isEqual(e.oldDocs)
            )
          )
            return !1;
          const t = this.docChanges,
            n = e.docChanges;
          if (t.length !== n.length) return !1;
          for (let r = 0; r < t.length; r++)
            if (t[r].type !== n[r].type || !t[r].doc.isEqual(n[r].doc))
              return !1;
          return !0;
        }
      }
      class xh {
        constructor() {
          (this.Au = void 0), (this.listeners = []);
        }
      }
      class Dh {
        constructor() {
          (this.queries = new pa((e) => Li(e), Ri)),
            (this.onlineState = "Unknown"),
            (this.Ru = new Set());
        }
      }
      async function Ah(e, t) {
        const n = e,
          r = t.query;
        let s = !1,
          i = n.queries.get(r);
        if ((i || ((s = !0), (i = new xh())), s))
          try {
            i.Au = await n.onListen(r);
          } catch (e) {
            const n = Eh(e, `Initialization of query '${Mi(t.query)}' failed`);
            return void t.onError(n);
          }
        n.queries.set(r, i),
          i.listeners.push(t),
          t.bu(n.onlineState),
          !i.Au || (t.Pu(i.Au) && Nh(n));
      }
      async function Ch(e, t) {
        const n = e,
          r = t.query;
        let s = !1;
        const i = n.queries.get(r);
        if (i) {
          const e = i.listeners.indexOf(t);
          0 <= e && (i.listeners.splice(e, 1), (s = 0 === i.listeners.length));
        }
        if (s) return n.queries.delete(r), n.onUnlisten(r);
      }
      function Nh(e) {
        e.Ru.forEach((e) => {
          e.next();
        });
      }
      class kh {
        constructor(e, t, n) {
          (this.query = e),
            (this.vu = t),
            (this.Vu = !1),
            (this.Su = null),
            (this.onlineState = "Unknown"),
            (this.options = n || {});
        }
        Pu(e) {
          if (!this.options.includeMetadataChanges) {
            const t = [];
            for (const n of e.docChanges) 3 !== n.type && t.push(n);
            e = new _h(
              e.query,
              e.docs,
              e.oldDocs,
              t,
              e.mutatedKeys,
              e.fromCache,
              e.syncStateChanged,
              !0,
              e.hasCachedResults
            );
          }
          let t = !1;
          return (
            this.Vu
              ? this.Du(e) && (this.vu.next(e), (t = !0))
              : this.Cu(e, this.onlineState) && (this.xu(e), (t = !0)),
            (this.Su = e),
            t
          );
        }
        onError(e) {
          this.vu.error(e);
        }
        bu(e) {
          this.onlineState = e;
          let t = !1;
          return (
            this.Su &&
              !this.Vu &&
              this.Cu(this.Su, e) &&
              (this.xu(this.Su), (t = !0)),
            t
          );
        }
        Cu(e, t) {
          return (
            !e.fromCache ||
            ((!this.options.Nu || !("Offline" !== t)) &&
              (!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t))
          );
        }
        Du(e) {
          if (0 < e.docChanges.length) return !0;
          var t = this.Su && this.Su.hasPendingWrites !== e.hasPendingWrites;
          return (
            !(!e.syncStateChanged && !t) &&
            !0 === this.options.includeMetadataChanges
          );
        }
        xu(e) {
          (e = _h.fromInitialDocuments(
            e.query,
            e.docs,
            e.mutatedKeys,
            e.fromCache,
            e.hasCachedResults
          )),
            (this.Vu = !0),
            this.vu.next(e);
        }
      }
      class Rh {
        constructor(e, t) {
          (this.ku = e), (this.byteLength = t);
        }
        Ou() {
          return "metadata" in this.ku;
        }
      }
      class Lh {
        constructor(e) {
          this.It = e;
        }
        Ji(e) {
          return ja(this.It, e);
        }
        Yi(e) {
          return e.metadata.exists
            ? Ya(this.It, e.document, !1)
            : ei.newNoDocument(
                this.Ji(e.metadata.name),
                this.Xi(e.metadata.readTime)
              );
        }
        Xi(e) {
          return Ua(e);
        }
      }
      class Mh {
        constructor(e, t, n) {
          (this.Mu = e),
            (this.localStore = t),
            (this.It = n),
            (this.queries = []),
            (this.documents = []),
            (this.collectionGroups = new Set()),
            (this.progress = Oh(e));
        }
        Fu(e) {
          this.progress.bytesLoaded += e.byteLength;
          let t = this.progress.documentsLoaded;
          if (e.ku.namedQuery) this.queries.push(e.ku.namedQuery);
          else if (e.ku.documentMetadata) {
            this.documents.push({ metadata: e.ku.documentMetadata }),
              e.ku.documentMetadata.exists || ++t;
            const n = Pr.fromString(e.ku.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
          } else
            e.ku.document &&
              ((this.documents[this.documents.length - 1].document =
                e.ku.document),
              ++t);
          return t !== this.progress.documentsLoaded
            ? ((this.progress.documentsLoaded = t),
              Object.assign({}, this.progress))
            : null;
        }
        $u(e) {
          const t = new Map(),
            n = new Lh(this.It);
          for (const s of e)
            if (s.metadata.queries) {
              const e = n.Ji(s.metadata.name);
              for (const n of s.metadata.queries) {
                var r = (t.get(n) || Sa()).add(e);
                t.set(n, r);
              }
            }
          return t;
        }
        async complete() {
          const e = await (async function (e, t, n, r) {
              const s = e;
              let i = Sa(),
                a = ya;
              for (const e of n) {
                const n = t.Ji(e.metadata.name);
                e.document && (i = i.add(n));
                const c = t.Yi(e);
                c.setReadTime(t.Xi(e.metadata.readTime)), (a = a.insert(n, c));
              }
              const o = s.Gi.newChangeBuffer({ trackRemovals: !0 }),
                u = await _c(
                  s,
                  ((r = r), Ni(Si(Pr.fromString(`__bundle__/docs/${r}`))))
                );
              return s.persistence.runTransaction(
                "Apply bundle documents",
                "readwrite",
                (t) =>
                  Sc(t, o, a)
                    .next((e) => (o.apply(t), e))
                    .next((e) =>
                      s.Cs.removeMatchingKeysForTargetId(t, u.targetId)
                        .next(() => s.Cs.addMatchingKeys(t, i, u.targetId))
                        .next(() =>
                          s.localDocuments.getLocalViewOfDocuments(
                            t,
                            e.Wi,
                            e.zi
                          )
                        )
                        .next(() => e.Wi)
                    )
              );
            })(this.localStore, new Lh(this.It), this.documents, this.Mu.id),
            t = this.$u(this.documents);
          for (const e of this.queries)
            await (async function (e, n, r = Sa()) {
              const s = await _c(e, Ni(Ho(n.bundledQuery))),
                i = e;
              return i.persistence.runTransaction(
                "Save named query",
                "readwrite",
                (e) => {
                  var t = Ua(n.readTime);
                  if (0 <= s.snapshotVersion.compareTo(t))
                    return i.Ns.saveNamedQuery(e, n);
                  t = s.withResumeToken(Ts.EMPTY_BYTE_STRING, t);
                  return (
                    (i.Ui = i.Ui.insert(t.targetId, t)),
                    i.Cs.updateTargetData(e, t)
                      .next(() =>
                        i.Cs.removeMatchingKeysForTargetId(e, s.targetId)
                      )
                      .next(() => i.Cs.addMatchingKeys(e, r, s.targetId))
                      .next(() => i.Ns.saveNamedQuery(e, n))
                  );
                }
              );
            })(this.localStore, e, t.get(e.name));
          return (
            (this.progress.taskState = "Success"),
            { progress: this.progress, Bu: this.collectionGroups, Lu: e }
          );
        }
      }
      function Oh(e) {
        return {
          taskState: "Running",
          documentsLoaded: 0,
          bytesLoaded: 0,
          totalDocuments: e.totalDocuments,
          totalBytes: e.totalBytes,
        };
      }
      class Vh {
        constructor(e) {
          this.key = e;
        }
      }
      class Fh {
        constructor(e) {
          this.key = e;
        }
      }
      class Ph {
        constructor(e, t) {
          (this.query = e),
            (this.Uu = t),
            (this.qu = null),
            (this.hasCachedResults = !1),
            (this.current = !1),
            (this.Ku = Sa()),
            (this.mutatedKeys = Sa()),
            (this.Gu = Fi(e)),
            (this.Qu = new Th(this.Gu));
        }
        get ju() {
          return this.Uu;
        }
        Wu(e, t) {
          const o = t ? t.zu : new Sh(),
            u = (t || this).Qu;
          let c = (t || this).mutatedKeys,
            h = u,
            l = !1;
          const d =
              "F" === this.query.limitType && u.size === this.query.limit
                ? u.last()
                : null,
            f =
              "L" === this.query.limitType && u.size === this.query.limit
                ? u.first()
                : null;
          if (
            (e.inorderTraversal((e, t) => {
              const n = u.get(e),
                r = Oi(this.query, t) ? t : null,
                s = !!n && this.mutatedKeys.has(n.key),
                i =
                  !!r &&
                  (r.hasLocalMutations ||
                    (this.mutatedKeys.has(r.key) && r.hasCommittedMutations));
              let a = !1;
              n && r
                ? n.data.isEqual(r.data)
                  ? s !== i && (o.track({ type: 3, doc: r }), (a = !0))
                  : this.Hu(n, r) ||
                    (o.track({ type: 2, doc: r }),
                    (a = !0),
                    ((d && 0 < this.Gu(r, d)) || (f && this.Gu(r, f) < 0)) &&
                      (l = !0))
                : !n && r
                ? (o.track({ type: 0, doc: r }), (a = !0))
                : n &&
                  !r &&
                  (o.track({ type: 1, doc: n }),
                  (a = !0),
                  (d || f) && (l = !0)),
                a &&
                  (c = r
                    ? ((h = h.add(r)), i ? c.add(e) : c.delete(e))
                    : ((h = h.delete(e)), c.delete(e)));
            }),
            null !== this.query.limit)
          )
            for (; h.size > this.query.limit; ) {
              const e = "F" === this.query.limitType ? h.last() : h.first();
              (h = h.delete(e.key)),
                (c = c.delete(e.key)),
                o.track({ type: 1, doc: e });
            }
          return { Qu: h, zu: o, $i: l, mutatedKeys: c };
        }
        Hu(e, t) {
          return (
            e.hasLocalMutations &&
            t.hasCommittedMutations &&
            !t.hasLocalMutations
          );
        }
        applyChanges(e, t, n) {
          var r = this.Qu;
          (this.Qu = e.Qu), (this.mutatedKeys = e.mutatedKeys);
          const s = e.zu.Eu();
          s.sort(
            (e, t) =>
              (function (e, t) {
                var n = (e) => {
                  switch (e) {
                    case 0:
                      return 1;
                    case 2:
                    case 3:
                      return 2;
                    case 1:
                      return 0;
                    default:
                      return vr();
                  }
                };
                return n(e) - n(t);
              })(e.type, t.type) || this.Gu(e.doc, t.doc)
          ),
            this.Ju(n);
          var i = t ? this.Yu() : [],
            a = 0 === this.Ku.size && this.current ? 1 : 0,
            o = a !== this.qu;
          return (
            (this.qu = a),
            0 !== s.length || o
              ? {
                  snapshot: new _h(
                    this.query,
                    e.Qu,
                    r,
                    s,
                    e.mutatedKeys,
                    0 == a,
                    o,
                    !1,
                    !!n && 0 < n.resumeToken.approximateByteSize()
                  ),
                  Xu: i,
                }
              : { Xu: i }
          );
        }
        bu(e) {
          return this.current && "Offline" === e
            ? ((this.current = !1),
              this.applyChanges(
                {
                  Qu: this.Qu,
                  zu: new Sh(),
                  mutatedKeys: this.mutatedKeys,
                  $i: !1,
                },
                !1
              ))
            : { Xu: [] };
        }
        Zu(e) {
          return (
            !this.Uu.has(e) &&
            !!this.Qu.has(e) &&
            !this.Qu.get(e).hasLocalMutations
          );
        }
        Ju(e) {
          e &&
            (e.addedDocuments.forEach((e) => (this.Uu = this.Uu.add(e))),
            e.modifiedDocuments.forEach((e) => {}),
            e.removedDocuments.forEach((e) => (this.Uu = this.Uu.delete(e))),
            (this.current = e.current));
        }
        Yu() {
          if (!this.current) return [];
          const t = this.Ku;
          (this.Ku = Sa()),
            this.Qu.forEach((e) => {
              this.Zu(e.key) && (this.Ku = this.Ku.add(e.key));
            });
          const n = [];
          return (
            t.forEach((e) => {
              this.Ku.has(e) || n.push(new Fh(e));
            }),
            this.Ku.forEach((e) => {
              t.has(e) || n.push(new Vh(e));
            }),
            n
          );
        }
        tc(e) {
          (this.Uu = e.Hi), (this.Ku = Sa());
          var t = this.Wu(e.documents);
          return this.applyChanges(t, !0);
        }
        ec() {
          return _h.fromInitialDocuments(
            this.query,
            this.Qu,
            this.mutatedKeys,
            0 === this.qu,
            this.hasCachedResults
          );
        }
      }
      class Bh {
        constructor(e, t, n) {
          (this.query = e), (this.targetId = t), (this.view = n);
        }
      }
      class Uh {
        constructor(e) {
          (this.key = e), (this.nc = !1);
        }
      }
      class qh {
        constructor(e, t, n, r, s, i) {
          (this.localStore = e),
            (this.remoteStore = t),
            (this.eventManager = n),
            (this.sharedClientState = r),
            (this.currentUser = s),
            (this.maxConcurrentLimboResolutions = i),
            (this.sc = {}),
            (this.ic = new pa((e) => Li(e), Ri)),
            (this.rc = new Map()),
            (this.oc = new Set()),
            (this.uc = new ps(qr.comparator)),
            (this.cc = new Map()),
            (this.ac = new tc()),
            (this.hc = {}),
            (this.lc = new Map()),
            (this.fc = ku.vn()),
            (this.onlineState = "Unknown"),
            (this.dc = void 0);
        }
        get isPrimaryClient() {
          return !0 === this.dc;
        }
      }
      async function Kh(n, e, t, r, s) {
        n._c = (e, i, t) =>
          (async function (e, t, n) {
            let r = t.view.Wu(i);
            r.$i &&
              (r = await Dc(e.localStore, t.query, !1).then(
                ({ documents: e }) => t.view.Wu(e, r)
              ));
            var s = n && n.targetChanges.get(t.targetId),
              s = t.view.applyChanges(r, e.isPrimaryClient, s);
            return Xh(e, t.targetId, s.Xu), s.snapshot;
          })(n, e, t);
        const i = await Dc(n.localStore, e, !0),
          a = new Ph(e, i.Hi),
          o = a.Wu(i.documents),
          u = Da.createSynthesizedTargetChangeForCurrentChange(
            t,
            r && "Offline" !== n.onlineState,
            s
          ),
          c = a.applyChanges(o, n.isPrimaryClient, u);
        Xh(n, t, c.Xu);
        var h = new Bh(e, t, a);
        return (
          n.ic.set(e, h),
          n.rc.has(t) ? n.rc.get(t).push(e) : n.rc.set(t, [e]),
          c.snapshot
        );
      }
      async function Gh(e, t, n) {
        const r = sl(e);
        try {
          const e = await (function (e, s) {
            const i = e,
              a = Or.now(),
              o = s.reduce((e, t) => e.add(t.key), Sa());
            let u, c;
            return i.persistence
              .runTransaction("Locally write mutations", "readwrite", (n) => {
                let t = ya,
                  r = Sa();
                return i.Gi.getEntries(n, o)
                  .next((e) => {
                    (t = e),
                      t.forEach((e, t) => {
                        t.isValidDocument() || (r = r.add(e));
                      });
                  })
                  .next(() => i.localDocuments.getOverlayedDocuments(n, t))
                  .next((e) => {
                    u = e;
                    const t = [];
                    for (const n of s) {
                      const s = (function (e, t) {
                        let n = null;
                        for (const r of e.fieldTransforms) {
                          const e = t.data.field(r.field),
                            s = Ki(r.transform, e || null);
                          null != s &&
                            (null === n && (n = Zs.empty()), n.set(r.field, s));
                        }
                        return n || null;
                      })(n, u.get(n.key).overlayedDocument);
                      null != s &&
                        t.push(
                          new oa(
                            n.key,
                            s,
                            (function r(e) {
                              const s = [];
                              return (
                                gs(e.fields, (e, t) => {
                                  const n = new Ur([e]);
                                  if (Hs(t)) {
                                    const e = r(t.mapValue).fields;
                                    if (0 === e.length) s.push(n);
                                    else for (const t of e) s.push(n.child(t));
                                  } else s.push(n);
                                }),
                                new Es(s)
                              );
                            })(s.value.mapValue),
                            Zi.exists(!0)
                          )
                        );
                    }
                    return i.mutationQueue.addMutationBatch(n, a, t, s);
                  })
                  .next((e) => {
                    var t = (c = e).applyToLocalDocumentSet(u, r);
                    return i.documentOverlayCache.saveOverlays(n, e.batchId, t);
                  });
              })
              .then(() => ({ batchId: c.batchId, changes: Ia(u) }));
          })(r.localStore, t);
          r.sharedClientState.addPendingMutation(e.batchId),
            (function (e, t, n) {
              let r = e.hc[e.currentUser.toKey()];
              (r = r || new ps(Rr)),
                (r = r.insert(t, n)),
                (e.hc[e.currentUser.toKey()] = r);
            })(r, e.batchId, n),
            await Zh(r, e.changes),
            await gh(r.remoteStore);
        } catch (e) {
          const t = Eh(e, "Failed to persist write");
          n.reject(t);
        }
      }
      async function jh(e, t) {
        const r = e;
        try {
          const e = await Tc(r.localStore, t);
          t.targetChanges.forEach((e, t) => {
            const n = r.cc.get(t);
            n &&
              (wr(
                e.addedDocuments.size +
                  e.modifiedDocuments.size +
                  e.removedDocuments.size <=
                  1
              ),
              0 < e.addedDocuments.size
                ? (n.nc = !0)
                : 0 < e.modifiedDocuments.size
                ? wr(n.nc)
                : 0 < e.removedDocuments.size && (wr(n.nc), (n.nc = !1)));
          }),
            await Zh(r, e, t);
        } catch (e) {
          await Zr(e);
        }
      }
      function $h(r, s, e) {
        const t = r;
        if ((t.isPrimaryClient && 0 === e) || (!t.isPrimaryClient && 1 === e)) {
          const r = [];
          t.ic.forEach((e, t) => {
            var n = t.view.bu(s);
            n.snapshot && r.push(n.snapshot);
          }),
            (function (e, n) {
              const t = e;
              t.onlineState = n;
              let r = !1;
              t.queries.forEach((e, t) => {
                for (const e of t.listeners) e.bu(n) && (r = !0);
              }),
                r && Nh(t);
            })(t.eventManager, s),
            r.length && t.sc.Wo(r),
            (t.onlineState = s),
            t.isPrimaryClient && t.sharedClientState.setOnlineState(s);
        }
      }
      async function Qh(e, t) {
        const n = e,
          r = t.batch.batchId;
        try {
          const e = await (function (e, r) {
            const s = e;
            return s.persistence.runTransaction(
              "Acknowledge batch",
              "readwrite-primary",
              (e) => {
                const t = r.batch.keys(),
                  n = s.Gi.newChangeBuffer({ trackRemovals: !0 });
                return (function (e, t, r, s) {
                  const i = r.batch,
                    n = i.keys();
                  let a = es.resolve();
                  return (
                    n.forEach((n) => {
                      a = a
                        .next(() => s.getEntry(t, n))
                        .next((e) => {
                          var t = r.docVersions.get(n);
                          wr(null !== t),
                            e.version.compareTo(t) < 0 &&
                              (i.applyToRemoteDocument(e, r),
                              e.isValidDocument() &&
                                (e.setReadTime(r.commitVersion),
                                s.addEntry(e)));
                        });
                    }),
                    a.next(() => e.mutationQueue.removeMutationBatch(t, i))
                  );
                })(s, e, r, n)
                  .next(() => n.apply(e))
                  .next(() => s.mutationQueue.performConsistencyCheck(e))
                  .next(() =>
                    s.documentOverlayCache.removeOverlaysForBatchId(
                      e,
                      t,
                      r.batch.batchId
                    )
                  )
                  .next(() =>
                    s.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                      e,
                      (function (e) {
                        let t = Sa();
                        for (let n = 0; n < e.mutationResults.length; ++n)
                          0 < e.mutationResults[n].transformResults.length &&
                            (t = t.add(e.batch.mutations[n].key));
                        return t;
                      })(r)
                    )
                  )
                  .next(() => s.localDocuments.getDocuments(e, t));
              }
            );
          })(n.localStore, t);
          Hh(n, r, null),
            zh(n, r),
            n.sharedClientState.updateMutationState(r, "acknowledged"),
            await Zh(n, e);
        } catch (e) {
          await Zr(e);
        }
      }
      function zh(e, t) {
        (e.lc.get(t) || []).forEach((e) => {
          e.resolve();
        }),
          e.lc.delete(t);
      }
      function Hh(e, t, n) {
        const r = e;
        let s = r.hc[r.currentUser.toKey()];
        if (s) {
          const e = s.get(t);
          e && (n ? e.reject(n) : e.resolve(), (s = s.remove(t))),
            (r.hc[r.currentUser.toKey()] = s);
        }
      }
      function Wh(t, e, n = null) {
        t.sharedClientState.removeLocalQueryTarget(e);
        for (const r of t.rc.get(e)) t.ic.delete(r), n && t.sc.wc(r, n);
        t.rc.delete(e),
          t.isPrimaryClient &&
            t.ac.ls(e).forEach((e) => {
              t.ac.containsKey(e) || Yh(t, e);
            });
      }
      function Yh(e, t) {
        e.oc.delete(t.path.canonicalString());
        var n = e.uc.get(t);
        null !== n &&
          (ih(e.remoteStore, n),
          (e.uc = e.uc.remove(t)),
          e.cc.delete(n),
          Jh(e));
      }
      function Xh(e, t, n) {
        for (const r of n)
          r instanceof Vh
            ? (e.ac.addReference(r.key, t),
              (function (e, t) {
                const n = t.key,
                  r = n.path.canonicalString();
                e.uc.get(n) ||
                  e.oc.has(r) ||
                  (gr("SyncEngine", "New document in limbo: " + n),
                  e.oc.add(r),
                  Jh(e));
              })(e, r))
            : r instanceof Fh
            ? (gr("SyncEngine", "Document no longer in limbo: " + r.key),
              e.ac.removeReference(r.key, t),
              e.ac.containsKey(r.key) || Yh(e, r.key))
            : vr();
      }
      function Jh(e) {
        for (; 0 < e.oc.size && e.uc.size < e.maxConcurrentLimboResolutions; ) {
          var t = e.oc.values().next().value;
          e.oc.delete(t);
          var n = new qr(Pr.fromString(t)),
            t = e.fc.next();
          e.cc.set(t, new Uh(n)),
            (e.uc = e.uc.insert(n, t)),
            sh(e.remoteStore, new Bo(Ni(Si(n.path)), t, 2, ds.at));
        }
      }
      async function Zh(e, t, r) {
        const s = e,
          i = [],
          a = [],
          o = [];
        s.ic.isEmpty() ||
          (s.ic.forEach((e, n) => {
            o.push(
              s._c(n, t, r).then((e) => {
                var t;
                (e || r) &&
                  s.isPrimaryClient &&
                  s.sharedClientState.updateQueryState(
                    n.targetId,
                    null != e && e.fromCache ? "not-current" : "current"
                  ),
                  e && (i.push(e), (t = yc.Ci(n.targetId, e)), a.push(t));
              })
            );
          }),
          await Promise.all(o),
          s.sc.Wo(i),
          await (async function (e, t) {
            const r = e;
            try {
              await r.persistence.runTransaction(
                "notifyLocalViewChanges",
                "readwrite",
                (n) =>
                  es.forEach(t, (t) =>
                    es
                      .forEach(t.Si, (e) =>
                        r.persistence.referenceDelegate.addReference(
                          n,
                          t.targetId,
                          e
                        )
                      )
                      .next(() =>
                        es.forEach(t.Di, (e) =>
                          r.persistence.referenceDelegate.removeReference(
                            n,
                            t.targetId,
                            e
                          )
                        )
                      )
                  )
              );
            } catch (e) {
              if (!is(e)) throw e;
              gr("LocalStore", "Failed to update sequence numbers: " + e);
            }
            for (const e of t) {
              const t = e.targetId;
              if (!e.fromCache) {
                const e = r.Ui.get(t),
                  n = e.snapshotVersion,
                  s = e.withLastLimboFreeSnapshotVersion(n);
                r.Ui = r.Ui.insert(t, s);
              }
            }
          })(s.localStore, a));
      }
      async function el(r, e) {
        const s = r;
        if ((rl(s), sl(s), !0 === e && !0 !== s.dc)) {
          const r = s.sharedClientState.getAllActiveQueryTargets(),
            e = await tl(s, r.toArray());
          (s.dc = !0), await vh(s.remoteStore, !0);
          for (const r of e) sh(s.remoteStore, r);
        } else if (!1 === e && !1 !== s.dc) {
          const r = [];
          let n = Promise.resolve();
          s.rc.forEach((e, t) => {
            s.sharedClientState.isLocalQueryTarget(t)
              ? r.push(t)
              : (n = n.then(() => (Wh(s, t), xc(s.localStore, t, !0)))),
              ih(s.remoteStore, t);
          }),
            await n,
            await tl(s, r),
            (function () {
              const n = s;
              n.cc.forEach((e, t) => {
                ih(n.remoteStore, t);
              }),
                n.ac.fs(),
                (n.cc = new Map()),
                (n.uc = new ps(qr.comparator));
            })(),
            (s.dc = !1),
            await vh(s.remoteStore, !1);
        }
      }
      async function tl(t, n) {
        const r = t,
          s = [],
          i = [];
        for (const t of n) {
          let e;
          const h = r.rc.get(t);
          if (h && 0 !== h.length) {
            e = await _c(r.localStore, Ni(h[0]));
            for (const t of h) {
              const n = r.ic.get(t),
                h =
                  ((a = r),
                  (o = n),
                  (c = u = void 0),
                  (c = await Dc((u = a).localStore, o.query, !0)),
                  (c = o.view.tc(c)),
                  u.isPrimaryClient && Xh(u, o.targetId, c.Xu),
                  await c);
              h.snapshot && i.push(h.snapshot);
            }
          } else {
            const h = await Ac(r.localStore, t);
            (e = await _c(r.localStore, h)),
              await Kh(r, nl(h), t, !1, e.resumeToken);
          }
          s.push(e);
        }
        var a, o, u, c;
        return r.sc.Wo(i), s;
      }
      function nl(e) {
        return Ti(
          e.path,
          e.collectionGroup,
          e.orderBy,
          e.filters,
          e.limit,
          "F",
          e.startAt,
          e.endAt
        );
      }
      function rl(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applyRemoteEvent = jh.bind(null, t)),
          (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = function (e, t) {
            const n = e,
              r = n.cc.get(t);
            if (r && r.nc) return Sa().add(r.key);
            {
              let e = Sa();
              const r = n.rc.get(t);
              if (!r) return e;
              for (const t of r) {
                const r = n.ic.get(t);
                e = e.unionWith(r.view.ju);
              }
              return e;
            }
          }.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectListen = async function (e, t, n) {
            const r = e;
            r.sharedClientState.updateQueryState(t, "rejected", n);
            const s = r.cc.get(t),
              i = s && s.key;
            if (i) {
              let e = new ps(qr.comparator);
              e = e.insert(i, ei.newNoDocument(i, Vr.min()));
              const n = Sa().add(i),
                s = new xa(Vr.min(), new Map(), new ws(Rr), e, n);
              await jh(r, s), (r.uc = r.uc.remove(i)), r.cc.delete(t), Jh(r);
            } else
              await xc(r.localStore, t, !1)
                .then(() => Wh(r, t, n))
                .catch(Zr);
          }.bind(null, t)),
          (t.sc.Wo = function (e, t) {
            const n = e;
            let r = !1;
            for (const e of t) {
              const t = e.query,
                s = n.queries.get(t);
              if (s) {
                for (const t of s.listeners) t.Pu(e) && (r = !0);
                s.Au = e;
              }
            }
            r && Nh(n);
          }.bind(null, t.eventManager)),
          (t.sc.wc = function (e, t, n) {
            const r = e,
              s = r.queries.get(t);
            if (s) for (const e of s.listeners) e.onError(n);
            r.queries.delete(t);
          }.bind(null, t.eventManager)),
          t
        );
      }
      function sl(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applySuccessfulWrite = Qh.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectFailedWrite = async function (
            e,
            t,
            n
          ) {
            const r = e;
            try {
              const e = await (function (e, r) {
                const s = e;
                return s.persistence.runTransaction(
                  "Reject batch",
                  "readwrite-primary",
                  (t) => {
                    let n;
                    return s.mutationQueue
                      .lookupMutationBatch(t, r)
                      .next(
                        (e) => (
                          wr(null !== e),
                          (n = e.keys()),
                          s.mutationQueue.removeMutationBatch(t, e)
                        )
                      )
                      .next(() => s.mutationQueue.performConsistencyCheck(t))
                      .next(() =>
                        s.documentOverlayCache.removeOverlaysForBatchId(t, n, r)
                      )
                      .next(() =>
                        s.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                          t,
                          n
                        )
                      )
                      .next(() => s.localDocuments.getDocuments(t, n));
                  }
                );
              })(r.localStore, t);
              Hh(r, t, n),
                zh(r, t),
                r.sharedClientState.updateMutationState(t, "rejected", n),
                await Zh(r, e);
            } catch (n) {
              await Zr(n);
            }
          }.bind(null, t)),
          t
        );
      }
      class il {
        constructor() {
          this.synchronizeTabs = !1;
        }
        async initialize(e) {
          (this.It = Hc(e.databaseInfo.databaseId)),
            (this.sharedClientState = this.gc(e)),
            (this.persistence = this.yc(e)),
            await this.persistence.start(),
            (this.localStore = this.Ic(e)),
            (this.gcScheduler = this.Tc(e, this.localStore)),
            (this.indexBackfillerScheduler = this.Ec(e, this.localStore));
        }
        Tc(e, t) {
          return null;
        }
        Ec(e, t) {
          return null;
        }
        Ic(e) {
          return Ic(this.persistence, new vc(), e.initialUser, this.It);
        }
        yc(e) {
          return new oc(cc.Bs, this.It);
        }
        gc(e) {
          return new Uc();
        }
        async terminate() {
          this.gcScheduler && this.gcScheduler.stop(),
            await this.sharedClientState.shutdown(),
            await this.persistence.shutdown();
        }
      }
      class al extends il {
        constructor(e, t, n) {
          super(),
            (this.Ac = e),
            (this.cacheSizeBytes = t),
            (this.forceOwnership = n),
            (this.synchronizeTabs = !1);
        }
        async initialize(e) {
          await super.initialize(e),
            await this.Ac.initialize(this, e),
            await sl(this.Ac.syncEngine),
            await gh(this.Ac.remoteStore),
            await this.persistence.li(
              () => (
                this.gcScheduler &&
                  !this.gcScheduler.started &&
                  this.gcScheduler.start(),
                this.indexBackfillerScheduler &&
                  !this.indexBackfillerScheduler.started &&
                  this.indexBackfillerScheduler.start(),
                Promise.resolve()
              )
            );
        }
        Ic(e) {
          return Ic(this.persistence, new vc(), e.initialUser, this.It);
        }
        Tc(e, t) {
          var n = this.persistence.referenceDelegate.garbageCollector;
          return new Pu(n, e.asyncQueue, t);
        }
        Ec(e, t) {
          var n = new ls(t, this.persistence);
          return new hs(e.asyncQueue, n);
        }
        yc(e) {
          var t = pc(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey),
            n =
              void 0 !== this.cacheSizeBytes
                ? Tu.withCacheSize(this.cacheSizeBytes)
                : Tu.DEFAULT;
          return new fc(
            this.synchronizeTabs,
            t,
            e.clientId,
            n,
            e.asyncQueue,
            Qc(),
            zc(),
            this.It,
            this.sharedClientState,
            !!this.forceOwnership
          );
        }
        gc(e) {
          return new Uc();
        }
      }
      class ol extends al {
        constructor(e, t) {
          super(e, t, !1),
            (this.Ac = e),
            (this.cacheSizeBytes = t),
            (this.synchronizeTabs = !0);
        }
        async initialize(e) {
          await super.initialize(e);
          var t = this.Ac.syncEngine;
          this.sharedClientState instanceof Bc &&
            ((this.sharedClientState.syncEngine = {
              Fr: async function (e, t, n, r) {
                var s = e,
                  i = await (function (e, n) {
                    const r = e,
                      s = r.mutationQueue;
                    return r.persistence.runTransaction(
                      "Lookup mutation documents",
                      "readonly",
                      (t) =>
                        s
                          .Tn(t, n)
                          .next((e) =>
                            e
                              ? r.localDocuments.getDocuments(t, e)
                              : es.resolve(null)
                          )
                    );
                  })(s.localStore, t);
                null !== i
                  ? ("pending" === n
                      ? await gh(s.remoteStore)
                      : "acknowledged" === n || "rejected" === n
                      ? (Hh(s, t, r || null),
                        zh(s, t),
                        s.localStore.mutationQueue.An(t))
                      : vr(),
                    await Zh(s, i))
                  : gr(
                      "SyncEngine",
                      "Cannot apply mutation batch with id: " + t
                    );
              }.bind(null, t),
              $r: async function (e, t, n, r) {
                const s = e;
                if (s.dc)
                  gr(
                    "SyncEngine",
                    "Ignoring unexpected query state notification."
                  );
                else {
                  var i = s.rc.get(t);
                  if (i && 0 < i.length)
                    switch (n) {
                      case "current":
                      case "not-current": {
                        const e = await Cc(s.localStore, Vi(i[0])),
                          r = xa.createSynthesizedRemoteEventForCurrentChange(
                            t,
                            "current" === n,
                            Ts.EMPTY_BYTE_STRING
                          );
                        await Zh(s, e, r);
                        break;
                      }
                      case "rejected":
                        await xc(s.localStore, t, !0), Wh(s, t, r);
                        break;
                      default:
                        vr();
                    }
                }
              }.bind(null, t),
              Br: async function (e, t, n) {
                const r = rl(e);
                if (r.dc) {
                  for (const e of t)
                    if (r.rc.has(e))
                      gr("SyncEngine", "Adding an already active target " + e);
                    else {
                      const t = await Ac(r.localStore, e),
                        n = await _c(r.localStore, t);
                      await Kh(r, nl(t), n.targetId, !1, n.resumeToken),
                        sh(r.remoteStore, n);
                    }
                  for (const e of n)
                    r.rc.has(e) &&
                      (await xc(r.localStore, e, !1)
                        .then(() => {
                          ih(r.remoteStore, e), Wh(r, e);
                        })
                        .catch(Zr));
                }
              }.bind(null, t),
              vi: function (e) {
                return e.localStore.persistence.vi();
              }.bind(null, t),
              Mr: async function (e, t) {
                const n = e;
                return Cc(n.localStore, t).then((e) => Zh(n, e));
              }.bind(null, t),
            }),
            await this.sharedClientState.start()),
            await this.persistence.li(async (e) => {
              await el(this.Ac.syncEngine, e),
                this.gcScheduler &&
                  (e && !this.gcScheduler.started
                    ? this.gcScheduler.start()
                    : e || this.gcScheduler.stop()),
                this.indexBackfillerScheduler &&
                  (e && !this.indexBackfillerScheduler.started
                    ? this.indexBackfillerScheduler.start()
                    : e || this.indexBackfillerScheduler.stop());
            });
        }
        gc(e) {
          var t = Qc();
          if (!Bc.C(t))
            throw new br(
              Ir.UNIMPLEMENTED,
              "IndexedDB persistence is only available on platforms that support LocalStorage."
            );
          var n = pc(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey);
          return new Bc(t, e.asyncQueue, n, e.clientId, e.initialUser);
        }
      }
      class ul {
        async initialize(e, t) {
          this.localStore ||
            ((this.localStore = e.localStore),
            (this.sharedClientState = e.sharedClientState),
            (this.datastore = this.createDatastore(t)),
            (this.remoteStore = this.createRemoteStore(t)),
            (this.eventManager = this.createEventManager(t)),
            (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = (e) =>
              $h(this.syncEngine, e, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange =
              async function (e, t) {
                const n = e;
                if (!n.currentUser.isEqual(t)) {
                  gr("SyncEngine", "User change. New user:", t.toKey());
                  const r = await bc(n.localStore, t);
                  (n.currentUser = t),
                    (e = n).lc.forEach((e) => {
                      e.forEach((e) => {
                        e.reject(
                          new br(
                            Ir.CANCELLED,
                            "'waitForPendingWrites' promise is rejected due to a user change."
                          )
                        );
                      });
                    }),
                    e.lc.clear(),
                    n.sharedClientState.handleUserChange(
                      t,
                      r.removedBatchIds,
                      r.addedBatchIds
                    ),
                    await Zh(n, r.ji);
                }
              }.bind(null, this.syncEngine)),
            await vh(this.remoteStore, this.syncEngine.isPrimaryClient));
        }
        createEventManager(e) {
          return new Dh();
        }
        createDatastore(e) {
          var t,
            n,
            r,
            s,
            i = Hc(e.databaseInfo.databaseId),
            t = ((t = e.databaseInfo), new $c(t));
          return (
            (n = e.authCredentials),
            (r = e.appCheckCredentials),
            (s = t),
            (e = i),
            new Zc(n, r, s, e)
          );
        }
        createRemoteStore(e) {
          return (
            (t = this.localStore),
            (n = this.datastore),
            (r = e.asyncQueue),
            (s = (e) => $h(this.syncEngine, e, 0)),
            (i = new (Kc.C() ? Kc : qc)()),
            new th(t, n, r, s, i)
          );
          var t, n, r, s, i;
        }
        createSyncEngine(e, t) {
          return (function (e, t, n, r, s, i, a) {
            const o = new qh(e, t, n, r, s, i);
            return a && (o.dc = !0), o;
          })(
            this.localStore,
            this.remoteStore,
            this.eventManager,
            this.sharedClientState,
            e.initialUser,
            e.maxConcurrentLimboResolutions,
            t
          );
        }
        terminate() {
          return (async function (e) {
            const t = e;
            gr("RemoteStore", "RemoteStore shutting down."),
              t._u.add(5),
              await rh(t),
              t.mu.shutdown(),
              t.gu.set("Unknown");
          })(this.remoteStore);
        }
      }
      function cl(e, t, n) {
        if (!n)
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Function ${e}() cannot be called with an empty ${t}.`
          );
      }
      function hl(e, t, n, r) {
        if (!0 === t && !0 === r)
          throw new br(
            Ir.INVALID_ARGUMENT,
            `${e} and ${n} cannot be used together.`
          );
      }
      function ll(e) {
        if (!qr.isDocumentKey(e))
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
          );
      }
      function dl(e) {
        if (qr.isDocumentKey(e))
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
          );
      }
      function fl(e) {
        if (void 0 === e) return "undefined";
        if (null === e) return "null";
        if ("string" == typeof e)
          return (
            20 < e.length && (e = `${e.substring(0, 20)}...`), JSON.stringify(e)
          );
        if ("number" == typeof e || "boolean" == typeof e) return "" + e;
        if ("object" != typeof e)
          return "function" == typeof e ? "a function" : vr();
        if (e instanceof Array) return "an array";
        var t = (e = e).constructor ? e.constructor.name : null;
        return t ? `a custom ${t} object` : "an object";
      }
      function gl(e, t) {
        if ((e = "_delegate" in e ? e._delegate : e) instanceof t) return e;
        if (t.name === e.constructor.name)
          throw new br(
            Ir.INVALID_ARGUMENT,
            "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"
          );
        var n = fl(e);
        throw new br(
          Ir.INVALID_ARGUMENT,
          `Expected type '${t.name}', but it was: ${n}`
        );
      }
      function ml(e, t) {
        if (t <= 0)
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Function ${e}() requires a positive number, but it was: ${t}.`
          );
      }
      const pl = new Map();
      class yl {
        constructor(e) {
          var t;
          if (void 0 === e.host) {
            if (void 0 !== e.ssl)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "Can't provide ssl option if host option is not set"
              );
            (this.host = "firestore.googleapis.com"), (this.ssl = !0);
          } else
            (this.host = e.host),
              (this.ssl = null === (t = e.ssl) || void 0 === t || t);
          if (
            ((this.credentials = e.credentials),
            (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
            void 0 === e.cacheSizeBytes)
          )
            this.cacheSizeBytes = 41943040;
          else {
            if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "cacheSizeBytes must be at least 1048576"
              );
            this.cacheSizeBytes = e.cacheSizeBytes;
          }
          (this.experimentalForceLongPolling =
            !!e.experimentalForceLongPolling),
            (this.experimentalAutoDetectLongPolling =
              !!e.experimentalAutoDetectLongPolling),
            (this.useFetchStreams = !!e.useFetchStreams),
            hl(
              "experimentalForceLongPolling",
              e.experimentalForceLongPolling,
              "experimentalAutoDetectLongPolling",
              e.experimentalAutoDetectLongPolling
            );
        }
        isEqual(e) {
          return (
            this.host === e.host &&
            this.ssl === e.ssl &&
            this.credentials === e.credentials &&
            this.cacheSizeBytes === e.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
              e.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
              e.experimentalAutoDetectLongPolling &&
            this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
            this.useFetchStreams === e.useFetchStreams
          );
        }
      }
      class vl {
        constructor(e, t, n, r) {
          (this._authCredentials = e),
            (this._appCheckCredentials = t),
            (this._databaseId = n),
            (this._app = r),
            (this.type = "firestore-lite"),
            (this._persistenceKey = "(lite)"),
            (this._settings = new yl({})),
            (this._settingsFrozen = !1);
        }
        get app() {
          if (!this._app)
            throw new br(
              Ir.FAILED_PRECONDITION,
              "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
          return this._app;
        }
        get _initialized() {
          return this._settingsFrozen;
        }
        get _terminated() {
          return void 0 !== this._terminateTask;
        }
        _setSettings(e) {
          if (this._settingsFrozen)
            throw new br(
              Ir.FAILED_PRECONDITION,
              "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."
            );
          (this._settings = new yl(e)),
            void 0 !== e.credentials &&
              (this._authCredentials = (function (e) {
                if (!e) return new Sr();
                switch (e.type) {
                  case "gapi":
                    var t = e.client;
                    return new Ar(
                      t,
                      e.sessionIndex || "0",
                      e.iamToken || null,
                      e.authTokenFactory || null
                    );
                  case "provider":
                    return e.client;
                  default:
                    throw new br(
                      Ir.INVALID_ARGUMENT,
                      "makeAuthCredentialsProvider failed due to invalid credential type"
                    );
                }
              })(e.credentials));
        }
        _getSettings() {
          return this._settings;
        }
        _freezeSettings() {
          return (this._settingsFrozen = !0), this._settings;
        }
        _delete() {
          return (
            this._terminateTask || (this._terminateTask = this._terminate()),
            this._terminateTask
          );
        }
        toJSON() {
          return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings,
          };
        }
        _terminate() {
          return (
            (function (e) {
              const t = pl.get(e);
              t &&
                (gr("ComponentProvider", "Removing Datastore"),
                pl.delete(e),
                t.terminate());
            })(this),
            Promise.resolve()
          );
        }
      }
      function wl(n, e, t, r = {}) {
        var s;
        const i = (n = gl(n, vl))._getSettings();
        if (
          ("firestore.googleapis.com" !== i.host &&
            i.host !== e &&
            pr(
              "Host has been set in both settings() and useEmulator(), emulator host will be used"
            ),
          n._setSettings(
            Object.assign(Object.assign({}, i), { host: `${e}:${t}`, ssl: !1 })
          ),
          r.mockUserToken)
        ) {
          let e, t;
          if ("string" == typeof r.mockUserToken)
            (e = r.mockUserToken), (t = hr.MOCK_USER);
          else {
            e = (function (e, t) {
              if (e.uid)
                throw new Error(
                  'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                );
              var n = t || "demo-project",
                r = e.iat || 0,
                s = e.sub || e.user_id;
              if (!s)
                throw new Error(
                  "mockUserToken must contain 'sub' or 'user_id' field!"
                );
              return (
                (s = Object.assign(
                  {
                    iss: `https://securetoken.google.com/${n}`,
                    aud: n,
                    iat: r,
                    exp: r + 3600,
                    auth_time: r,
                    sub: s,
                    user_id: s,
                    firebase: { sign_in_provider: "custom", identities: {} },
                  },
                  e
                )),
                [
                  a(JSON.stringify({ alg: "none", type: "JWT" })),
                  a(JSON.stringify(s)),
                  "",
                ].join(".")
              );
            })(
              r.mockUserToken,
              null === (s = n._app) || void 0 === s
                ? void 0
                : s.options.projectId
            );
            const i = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!i)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "mockUserToken must contain 'sub' or 'user_id' field!"
              );
            t = new hr(i);
          }
          n._authCredentials = new _r(new Tr(e, t));
        }
      }
      class Il {
        constructor(e, t, n) {
          (this.converter = t),
            (this._key = n),
            (this.type = "document"),
            (this.firestore = e);
        }
        get _path() {
          return this._key.path;
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get path() {
          return this._key.path.canonicalString();
        }
        get parent() {
          return new El(
            this.firestore,
            this.converter,
            this._key.path.popLast()
          );
        }
        withConverter(e) {
          return new Il(this.firestore, e, this._key);
        }
      }
      class bl {
        constructor(e, t, n) {
          (this.converter = t),
            (this._query = n),
            (this.type = "query"),
            (this.firestore = e);
        }
        withConverter(e) {
          return new bl(this.firestore, e, this._query);
        }
      }
      class El extends bl {
        constructor(e, t, n) {
          super(e, t, Si(n)), (this._path = n), (this.type = "collection");
        }
        get id() {
          return this._query.path.lastSegment();
        }
        get path() {
          return this._query.path.canonicalString();
        }
        get parent() {
          const e = this._path.popLast();
          return e.isEmpty() ? null : new Il(this.firestore, null, new qr(e));
        }
        withConverter(e) {
          return new El(this.firestore, e, this._path);
        }
      }
      function Tl(e, t, ...n) {
        if (((e = m(e)), cl("collection", "path", t), e instanceof vl)) {
          var r = Pr.fromString(t, ...n);
          return dl(r), new El(e, null, r);
        }
        if (!(e instanceof Il || e instanceof El))
          throw new br(
            Ir.INVALID_ARGUMENT,
            "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
          );
        r = e._path.child(Pr.fromString(t, ...n));
        return dl(r), new El(e.firestore, null, r);
      }
      function Sl(e, t, ...n) {
        if (
          ((e = m(e)),
          cl("doc", "path", (t = 1 === arguments.length ? kr.R() : t)),
          e instanceof vl)
        ) {
          var r = Pr.fromString(t, ...n);
          return ll(r), new Il(e, null, new qr(r));
        }
        if (!(e instanceof Il || e instanceof El))
          throw new br(
            Ir.INVALID_ARGUMENT,
            "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
          );
        r = e._path.child(Pr.fromString(t, ...n));
        return (
          ll(r),
          new Il(e.firestore, e instanceof El ? e.converter : null, new qr(r))
        );
      }
      function _l(e, t) {
        return (
          (e = m(e)),
          (t = m(t)),
          (e instanceof Il || e instanceof El) &&
            (t instanceof Il || t instanceof El) &&
            e.firestore === t.firestore &&
            e.path === t.path &&
            e.converter === t.converter
        );
      }
      function xl(e, t) {
        return (
          (e = m(e)),
          (t = m(t)),
          e instanceof bl &&
            t instanceof bl &&
            e.firestore === t.firestore &&
            Ri(e._query, t._query) &&
            e.converter === t.converter
        );
      }
      function Dl(t, n = 10240) {
        let r = 0;
        return {
          async read() {
            if (r < t.byteLength) {
              var e = { value: t.slice(r, r + n), done: !1 };
              return (r += n), e;
            }
            return { done: !0 };
          },
          async cancel() {},
          releaseLock() {},
          closed: Promise.reject("unimplemented"),
        };
      }
      class Al {
        constructor(e) {
          (this.observer = e), (this.muted = !1);
        }
        next(e) {
          this.observer.next && this.Rc(this.observer.next, e);
        }
        error(e) {
          this.observer.error
            ? this.Rc(this.observer.error, e)
            : mr("Uncaught Error in snapshot listener:", e.toString());
        }
        bc() {
          this.muted = !0;
        }
        Rc(e, t) {
          this.muted ||
            setTimeout(() => {
              this.muted || e(t);
            }, 0);
        }
      }
      class Cl {
        constructor(e, t) {
          (this.Pc = e),
            (this.It = t),
            (this.metadata = new Er()),
            (this.buffer = new Uint8Array()),
            (this.vc = new TextDecoder("utf-8")),
            this.Vc().then(
              (e) => {
                e && e.Ou()
                  ? this.metadata.resolve(e.ku.metadata)
                  : this.metadata.reject(
                      new Error(
                        `The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(
                          null == e ? void 0 : e.ku
                        )}`
                      )
                    );
              },
              (e) => this.metadata.reject(e)
            );
        }
        close() {
          return this.Pc.cancel();
        }
        async getMetadata() {
          return this.metadata.promise;
        }
        async mc() {
          return await this.getMetadata(), this.Vc();
        }
        async Vc() {
          var e = await this.Sc();
          if (null === e) return null;
          var t = this.vc.decode(e),
            n = Number(t);
          isNaN(n) && this.Dc(`length string (${t}) is not valid number`);
          t = await this.Cc(n);
          return new Rh(JSON.parse(t), e.length + n);
        }
        xc() {
          return this.buffer.findIndex((e) => e === "{".charCodeAt(0));
        }
        async Sc() {
          for (; this.xc() < 0 && !(await this.Nc()); );
          if (0 === this.buffer.length) return null;
          var e = this.xc();
          e < 0 &&
            this.Dc(
              "Reached the end of bundle when a length string is expected."
            );
          var t = this.buffer.slice(0, e);
          return (this.buffer = this.buffer.slice(e)), t;
        }
        async Cc(e) {
          for (; this.buffer.length < e; )
            (await this.Nc()) &&
              this.Dc("Reached the end of bundle when more is expected.");
          var t = this.vc.decode(this.buffer.slice(0, e));
          return (this.buffer = this.buffer.slice(e)), t;
        }
        Dc(e) {
          throw (this.Pc.cancel(), new Error(`Invalid bundle format: ${e}`));
        }
        async Nc() {
          var e = await this.Pc.read();
          if (!e.done) {
            const t = new Uint8Array(this.buffer.length + e.value.length);
            t.set(this.buffer),
              t.set(e.value, this.buffer.length),
              (this.buffer = t);
          }
          return e.done;
        }
      }
      class Nl {
        constructor(e) {
          (this.datastore = e),
            (this.readVersions = new Map()),
            (this.mutations = []),
            (this.committed = !1),
            (this.lastWriteError = null),
            (this.writtenDocs = new Set());
        }
        async lookup(e) {
          if ((this.ensureCommitNotCalled(), 0 < this.mutations.length))
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Firestore transactions require all reads to be executed before all writes."
            );
          const t = await (async function (e, t) {
            const r = e,
              n = za(r.It) + "/documents",
              s = { documents: t.map((e) => Ga(r.It, e)) },
              i = await r._o("BatchGetDocuments", n, s, t.length),
              a = new Map();
            i.forEach((e) => {
              const t =
                ((n = r.It),
                "found" in (e = e)
                  ? (function (e, t) {
                      wr(!!t.found), t.found.name, t.found.updateTime;
                      var n = ja(e, t.found.name),
                        r = Ua(t.found.updateTime),
                        s = new Zs({ mapValue: { fields: t.found.fields } });
                      return ei.newFoundDocument(n, r, s);
                    })(n, e)
                  : "missing" in e
                  ? (function (e, t) {
                      wr(!!t.missing), wr(!!t.readTime);
                      var n = ja(e, t.missing),
                        r = Ua(t.readTime);
                      return ei.newNoDocument(n, r);
                    })(n, e)
                  : vr());
              var n;
              a.set(t.key.toString(), t);
            });
            const o = [];
            return (
              t.forEach((e) => {
                var t = a.get(e.toString());
                wr(!!t), o.push(t);
              }),
              o
            );
          })(this.datastore, e);
          return t.forEach((e) => this.recordVersion(e)), t;
        }
        set(e, t) {
          this.write(t.toMutation(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        update(e, t) {
          try {
            this.write(t.toMutation(e, this.preconditionForUpdate(e)));
          } catch (e) {
            this.lastWriteError = e;
          }
          this.writtenDocs.add(e.toString());
        }
        delete(e) {
          this.write(new la(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        async commit() {
          if ((this.ensureCommitNotCalled(), this.lastWriteError))
            throw this.lastWriteError;
          const t = this.readVersions;
          this.mutations.forEach((e) => {
            t.delete(e.key.toString());
          }),
            t.forEach((e, t) => {
              var n = qr.fromPath(t);
              this.mutations.push(new da(n, this.precondition(n)));
            }),
            await (async function (e, t) {
              const n = e,
                r = za(n.It) + "/documents",
                s = { writes: t.map((e) => Xa(n.It, e)) };
              await n.ao("Commit", r, s);
            })(this.datastore, this.mutations),
            (this.committed = !0);
        }
        recordVersion(e) {
          let t;
          if (e.isFoundDocument()) t = e.version;
          else {
            if (!e.isNoDocument()) throw vr();
            t = Vr.min();
          }
          var n = this.readVersions.get(e.key.toString());
          if (n) {
            if (!t.isEqual(n))
              throw new br(
                Ir.ABORTED,
                "Document version changed between two reads."
              );
          } else this.readVersions.set(e.key.toString(), t);
        }
        precondition(e) {
          const t = this.readVersions.get(e.toString());
          return !this.writtenDocs.has(e.toString()) && t
            ? t.isEqual(Vr.min())
              ? Zi.exists(!1)
              : Zi.updateTime(t)
            : Zi.none();
        }
        preconditionForUpdate(e) {
          const t = this.readVersions.get(e.toString());
          if (this.writtenDocs.has(e.toString()) || !t) return Zi.exists(!0);
          if (t.isEqual(Vr.min()))
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Can't update a document that doesn't exist."
            );
          return Zi.updateTime(t);
        }
        write(e) {
          this.ensureCommitNotCalled(), this.mutations.push(e);
        }
        ensureCommitNotCalled() {}
      }
      class kl {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.datastore = t),
            (this.options = n),
            (this.updateFunction = r),
            (this.deferred = s),
            (this.kc = n.maxAttempts),
            (this.xo = new Wc(this.asyncQueue, "transaction_retry"));
        }
        run() {
          --this.kc, this.Oc();
        }
        Oc() {
          this.xo.Ro(async () => {
            const t = new Nl(this.datastore),
              e = this.Mc(t);
            e &&
              e
                .then((e) => {
                  this.asyncQueue.enqueueAndForget(() =>
                    t
                      .commit()
                      .then(() => {
                        this.deferred.resolve(e);
                      })
                      .catch((e) => {
                        this.Fc(e);
                      })
                  );
                })
                .catch((e) => {
                  this.Fc(e);
                });
          });
        }
        Mc(e) {
          try {
            var t = this.updateFunction(e);
            return !Rs(t) && t.catch && t.then
              ? t
              : (this.deferred.reject(
                  Error("Transaction callback must return a Promise")
                ),
                null);
          } catch (e) {
            return this.deferred.reject(e), null;
          }
        }
        Fc(e) {
          0 < this.kc && this.$c(e)
            ? (--this.kc,
              this.asyncQueue.enqueueAndForget(
                () => (this.Oc(), Promise.resolve())
              ))
            : this.deferred.reject(e);
        }
        $c(e) {
          if ("FirebaseError" !== e.name) return !1;
          var t = e.code;
          return (
            "aborted" === t ||
            "failed-precondition" === t ||
            "already-exists" === t ||
            !ga(t)
          );
        }
      }
      class Rl {
        constructor(e, t, n, r) {
          (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.asyncQueue = n),
            (this.databaseInfo = r),
            (this.user = hr.UNAUTHENTICATED),
            (this.clientId = kr.R()),
            (this.authCredentialListener = () => Promise.resolve()),
            (this.appCheckCredentialListener = () => Promise.resolve()),
            this.authCredentials.start(n, async (e) => {
              gr("FirestoreClient", "Received user=", e.uid),
                await this.authCredentialListener(e),
                (this.user = e);
            }),
            this.appCheckCredentials.start(
              n,
              (e) => (
                gr("FirestoreClient", "Received new app check token=", e),
                this.appCheckCredentialListener(e, this.user)
              )
            );
        }
        async getConfiguration() {
          return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100,
          };
        }
        setCredentialChangeListener(e) {
          this.authCredentialListener = e;
        }
        setAppCheckTokenChangeListener(e) {
          this.appCheckCredentialListener = e;
        }
        verifyNotTerminated() {
          if (this.asyncQueue.isShuttingDown)
            throw new br(
              Ir.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        terminate() {
          this.asyncQueue.enterRestrictedMode();
          const n = new Er();
          return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
              try {
                this.onlineComponents &&
                  (await this.onlineComponents.terminate()),
                  this.offlineComponents &&
                    (await this.offlineComponents.terminate()),
                  this.authCredentials.shutdown(),
                  this.appCheckCredentials.shutdown(),
                  n.resolve();
              } catch (e) {
                var t = Eh(e, "Failed to shutdown persistence");
                n.reject(t);
              }
            }),
            n.promise
          );
        }
      }
      async function Ll(e, t) {
        e.asyncQueue.verifyOperationInProgress(),
          gr("FirestoreClient", "Initializing OfflineComponentProvider");
        var n = await e.getConfiguration();
        await t.initialize(n);
        let r = n.initialUser;
        e.setCredentialChangeListener(async (e) => {
          r.isEqual(e) || (await bc(t.localStore, e), (r = e));
        }),
          t.persistence.setDatabaseDeletedListener(() => e.terminate()),
          (e.offlineComponents = t);
      }
      async function Ml(e, n) {
        e.asyncQueue.verifyOperationInProgress();
        var t = await Ol(e);
        gr("FirestoreClient", "Initializing OnlineComponentProvider");
        var r = await e.getConfiguration();
        await n.initialize(t, r),
          e.setCredentialChangeListener((e) => yh(n.remoteStore, e)),
          e.setAppCheckTokenChangeListener((e, t) => yh(n.remoteStore, t)),
          (e.onlineComponents = n);
      }
      async function Ol(e) {
        return (
          e.offlineComponents ||
            (gr("FirestoreClient", "Using default OfflineComponentProvider"),
            await Ll(e, new il())),
          e.offlineComponents
        );
      }
      async function Vl(e) {
        return (
          e.onlineComponents ||
            (gr("FirestoreClient", "Using default OnlineComponentProvider"),
            await Ml(e, new ul())),
          e.onlineComponents
        );
      }
      function Fl(e) {
        return Ol(e).then((e) => e.persistence);
      }
      function Pl(e) {
        return Ol(e).then((e) => e.localStore);
      }
      function Bl(e) {
        return Vl(e).then((e) => e.remoteStore);
      }
      function Ul(e) {
        return Vl(e).then((e) => e.syncEngine);
      }
      async function ql(e) {
        const t = await Vl(e),
          n = t.eventManager;
        return (
          (n.onListen = async function (e, t) {
            const n = rl(e);
            let r, s;
            const i = n.ic.get(t);
            if (i)
              (r = i.targetId),
                n.sharedClientState.addLocalQueryTarget(r),
                (s = i.view.ec());
            else {
              const e = await _c(n.localStore, Ni(t));
              n.isPrimaryClient && sh(n.remoteStore, e);
              const i = n.sharedClientState.addLocalQueryTarget(e.targetId);
              (r = e.targetId),
                (s = await Kh(n, t, r, "current" === i, e.resumeToken));
            }
            return s;
          }.bind(null, t.syncEngine)),
          (n.onUnlisten = async function (e, t) {
            const n = e,
              r = n.ic.get(t),
              s = n.rc.get(r.targetId);
            if (1 < s.length)
              return (
                n.rc.set(
                  r.targetId,
                  s.filter((e) => !Ri(e, t))
                ),
                void n.ic.delete(t)
              );
            n.isPrimaryClient
              ? (n.sharedClientState.removeLocalQueryTarget(r.targetId),
                n.sharedClientState.isActiveQueryTarget(r.targetId) ||
                  (await xc(n.localStore, r.targetId, !1)
                    .then(() => {
                      n.sharedClientState.clearQueryState(r.targetId),
                        ih(n.remoteStore, r.targetId),
                        Wh(n, r.targetId);
                    })
                    .catch(Zr)))
              : (Wh(n, r.targetId), await xc(n.localStore, r.targetId, !0));
          }.bind(null, t.syncEngine)),
          n
        );
      }
      function Kl(e, t, n = {}) {
        const r = new Er();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (function (n, r, s, i, a) {
              const e = new Al({
                  next: (e) => {
                    r.enqueueAndForget(() => Ch(n, o));
                    var t = e.docs.has(s);
                    !t && e.fromCache
                      ? a.reject(
                          new br(
                            Ir.UNAVAILABLE,
                            "Failed to get document because the client is offline."
                          )
                        )
                      : t && e.fromCache && i && "server" === i.source
                      ? a.reject(
                          new br(
                            Ir.UNAVAILABLE,
                            'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                          )
                        )
                      : a.resolve(e);
                  },
                  error: (e) => a.reject(e),
                }),
                o = new kh(Si(s.path), e, {
                  includeMetadataChanges: !0,
                  Nu: !0,
                });
              return Ah(n, o);
            })(await ql(e), e.asyncQueue, t, n, r)
          ),
          r.promise
        );
      }
      function Gl(e, t, n = {}) {
        const r = new Er();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (function (t, n, e, r, s) {
              const i = new Al({
                  next: (e) => {
                    n.enqueueAndForget(() => Ch(t, a)),
                      e.fromCache && "server" === r.source
                        ? s.reject(
                            new br(
                              Ir.UNAVAILABLE,
                              'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                            )
                          )
                        : s.resolve(e);
                  },
                  error: (e) => s.reject(e),
                }),
                a = new kh(e, i, { includeMetadataChanges: !0, Nu: !0 });
              return Ah(t, a);
            })(await ql(e), e.asyncQueue, t, n, r)
          ),
          r.promise
        );
      }
      function jl(e, t, n, r) {
        const s =
          ((n = n),
          (t = Hc(t)),
          (i = "string" == typeof n ? new TextEncoder().encode(n) : n),
          (n = (function (e) {
            if (e instanceof Uint8Array) return Dl(e, void 0);
            if (e instanceof ArrayBuffer) return Dl(new Uint8Array(e), void 0);
            if (e instanceof ReadableStream) return e.getReader();
            throw new Error(
              "Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream"
            );
          })(i)),
          (t = t),
          new Cl(n, t));
        var i;
        e.asyncQueue.enqueueAndForget(async () => {
          !(function (e, t, n) {
            const r = e;
            !(async function (t, n, r) {
              try {
                var s = await n.getMetadata();
                if (
                  await (function (e, t) {
                    const n = e,
                      r = Ua(t.createTime);
                    return n.persistence
                      .runTransaction("hasNewerBundle", "readonly", (e) =>
                        n.Ns.getBundleMetadata(e, t.id)
                      )
                      .then((e) => !!e && 0 <= e.createTime.compareTo(r));
                  })(t.localStore, s)
                )
                  return (
                    await n.close(),
                    r._completeWith({
                      taskState: "Success",
                      documentsLoaded: s.totalDocuments,
                      bytesLoaded: s.totalBytes,
                      totalDocuments: s.totalDocuments,
                      totalBytes: s.totalBytes,
                    }),
                    Promise.resolve(new Set())
                  );
                r._updateProgress(Oh(s));
                const a = new Mh(s, t.localStore, n.It);
                let e = await n.mc();
                for (; e; ) {
                  const t = await a.Fu(e);
                  t && r._updateProgress(t), (e = await n.mc());
                }
                var i = await a.complete();
                return (
                  await Zh(t, i.Lu, void 0),
                  await (function (e, t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "Save bundle",
                      "readwrite",
                      (e) => n.Ns.saveBundleMetadata(e, t)
                    );
                  })(t.localStore, s),
                  r._completeWith(i.progress),
                  Promise.resolve(i.Bu)
                );
              } catch (t) {
                return (
                  pr("SyncEngine", `Loading bundle failed with ${t}`),
                  r._failWith(t),
                  Promise.resolve(new Set())
                );
              }
            })(r, t, n).then((e) => {
              r.sharedClientState.notifyBundleLoaded(e);
            });
          })(await Ul(e), s, r);
        });
      }
      class $l {
        constructor() {
          (this.Bc = Promise.resolve()),
            (this.Lc = []),
            (this.Uc = !1),
            (this.qc = []),
            (this.Kc = null),
            (this.Gc = !1),
            (this.Qc = !1),
            (this.jc = []),
            (this.xo = new Wc(this, "async_queue_retry")),
            (this.Wc = () => {
              var e = zc();
              e &&
                gr(
                  "AsyncQueue",
                  "Visibility state changed to " + e.visibilityState
                ),
                this.xo.Po();
            });
          const e = zc();
          e &&
            "function" == typeof e.addEventListener &&
            e.addEventListener("visibilitychange", this.Wc);
        }
        get isShuttingDown() {
          return this.Uc;
        }
        enqueueAndForget(e) {
          this.enqueue(e);
        }
        enqueueAndForgetEvenWhileRestricted(e) {
          this.zc(), this.Hc(e);
        }
        enterRestrictedMode(e) {
          if (!this.Uc) {
            (this.Uc = !0), (this.Qc = e || !1);
            const t = zc();
            t &&
              "function" == typeof t.removeEventListener &&
              t.removeEventListener("visibilitychange", this.Wc);
          }
        }
        enqueue(e) {
          if ((this.zc(), this.Uc)) return new Promise(() => {});
          const t = new Er();
          return this.Hc(() =>
            this.Uc && this.Qc
              ? Promise.resolve()
              : (e().then(t.resolve, t.reject), t.promise)
          ).then(() => t.promise);
        }
        enqueueRetryable(e) {
          this.enqueueAndForget(() => (this.Lc.push(e), this.Jc()));
        }
        async Jc() {
          if (0 !== this.Lc.length) {
            try {
              await this.Lc[0](), this.Lc.shift(), this.xo.reset();
            } catch (e) {
              if (!is(e)) throw e;
              gr("AsyncQueue", "Operation failed with retryable error: " + e);
            }
            0 < this.Lc.length && this.xo.Ro(() => this.Jc());
          }
        }
        Hc(e) {
          var t = this.Bc.then(
            () => (
              (this.Gc = !0),
              e()
                .catch((e) => {
                  throw (
                    ((this.Kc = e),
                    (this.Gc = !1),
                    mr(
                      "INTERNAL UNHANDLED ERROR: ",
                      (function (e) {
                        let t = e.message || "";
                        return (
                          e.stack &&
                            (t = e.stack.includes(e.message)
                              ? e.stack
                              : e.message + "\n" + e.stack),
                          t
                        );
                      })(e)
                    ),
                    e)
                  );
                })
                .then((e) => ((this.Gc = !1), e))
            )
          );
          return (this.Bc = t);
        }
        enqueueAfterDelay(e, t, n) {
          this.zc(), -1 < this.jc.indexOf(e) && (t = 0);
          var r = bh.createAndSchedule(this, e, t, n, (e) => this.Yc(e));
          return this.qc.push(r), r;
        }
        zc() {
          this.Kc && vr();
        }
        verifyOperationInProgress() {}
        async Xc() {
          for (var e; await (e = this.Bc), e !== this.Bc; );
        }
        Zc(e) {
          for (const t of this.qc) if (t.timerId === e) return !0;
          return !1;
        }
        ta(t) {
          return this.Xc().then(() => {
            this.qc.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
            for (const e of this.qc)
              if ((e.skipDelay(), "all" !== t && e.timerId === t)) break;
            return this.Xc();
          });
        }
        ea(e) {
          this.jc.push(e);
        }
        Yc(e) {
          var t = this.qc.indexOf(e);
          this.qc.splice(t, 1);
        }
      }
      function Ql(e) {
        return (function (e) {
          if ("object" == typeof e && null !== e) {
            var t = e;
            for (const e of ["next", "error", "complete"])
              if (e in t && "function" == typeof t[e]) return 1;
          }
        })(e);
      }
      class zl {
        constructor() {
          (this._progressObserver = {}),
            (this._taskCompletionResolver = new Er()),
            (this._lastProgress = {
              taskState: "Running",
              totalBytes: 0,
              totalDocuments: 0,
              bytesLoaded: 0,
              documentsLoaded: 0,
            });
        }
        onProgress(e, t, n) {
          this._progressObserver = { next: e, error: t, complete: n };
        }
        catch(e) {
          return this._taskCompletionResolver.promise.catch(e);
        }
        then(e, t) {
          return this._taskCompletionResolver.promise.then(e, t);
        }
        _completeWith(e) {
          this._updateProgress(e),
            this._progressObserver.complete &&
              this._progressObserver.complete(),
            this._taskCompletionResolver.resolve(e);
        }
        _failWith(e) {
          (this._lastProgress.taskState = "Error"),
            this._progressObserver.next &&
              this._progressObserver.next(this._lastProgress),
            this._progressObserver.error && this._progressObserver.error(e),
            this._taskCompletionResolver.reject(e);
        }
        _updateProgress(e) {
          (this._lastProgress = e),
            this._progressObserver.next && this._progressObserver.next(e);
        }
      }
      var Hl, Wl, Yl;
      class Xl extends vl {
        constructor(e, t, n, r) {
          super(e, t, n, r),
            (this.type = "firestore"),
            (this._queue = new $l()),
            (this._persistenceKey =
              (null == r ? void 0 : r.name) || "[DEFAULT]");
        }
        _terminate() {
          return (
            this._firestoreClient || Zl(this), this._firestoreClient.terminate()
          );
        }
      }
      function Jl(e) {
        return (
          e._firestoreClient || Zl(e),
          e._firestoreClient.verifyNotTerminated(),
          e._firestoreClient
        );
      }
      function Zl(e) {
        var t,
          n,
          r,
          s,
          i,
          a = e._freezeSettings(),
          a =
            ((n = e._databaseId),
            (r =
              (null === (t = e._app) || void 0 === t
                ? void 0
                : t.options.appId) || ""),
            (s = e._persistenceKey),
            (i = a),
            new Ns(
              n,
              r,
              s,
              i.host,
              i.ssl,
              i.experimentalForceLongPolling,
              i.experimentalAutoDetectLongPolling,
              i.useFetchStreams
            ));
        e._firestoreClient = new Rl(
          e._authCredentials,
          e._appCheckCredentials,
          e._queue,
          a
        );
      }
      function ed(e, n, r) {
        const s = new Er();
        return e.asyncQueue
          .enqueue(async () => {
            try {
              await Ll(e, r), await Ml(e, n), s.resolve();
            } catch (e) {
              const n = e;
              if (
                !("FirebaseError" === (t = n).name
                  ? t.code === Ir.FAILED_PRECONDITION ||
                    t.code === Ir.UNIMPLEMENTED
                  : !(
                      "undefined" != typeof DOMException &&
                      t instanceof DOMException
                    ) ||
                    22 === t.code ||
                    20 === t.code ||
                    11 === t.code)
              )
                throw n;
              pr(
                "Error enabling offline persistence. Falling back to persistence disabled: " +
                  n
              ),
                s.reject(n);
            }
            var t;
          })
          .then(() => s.promise);
      }
      function td(e) {
        return (function (e) {
          const t = new Er();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t) {
                const n = e;
                hh(n.remoteStore) ||
                  gr(
                    "SyncEngine",
                    "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
                  );
                try {
                  const e = await (function () {
                    const t = n.localStore;
                    return t.persistence.runTransaction(
                      "Get highest unacknowledged batch id",
                      "readonly",
                      (e) => t.mutationQueue.getHighestUnacknowledgedBatchId(e)
                    );
                  })();
                  if (-1 === e) return void t.resolve();
                  const r = n.lc.get(e) || [];
                  r.push(t), n.lc.set(e, r);
                } catch (e) {
                  const n = Eh(
                    e,
                    "Initialization of waitForPendingWrites() operation failed"
                  );
                  t.reject(n);
                }
              })(await Ul(e), t)
            ),
            t.promise
          );
        })(Jl((e = gl(e, Xl))));
      }
      function nd(e) {
        return (n = Jl((e = gl(e, Xl)))).asyncQueue.enqueue(async () => {
          const e = await Fl(n),
            t = await Bl(n);
          return (
            e.setNetworkEnabled(!0),
            (function () {
              const e = t;
              return e._u.delete(0), nh(e);
            })()
          );
        });
        var n;
      }
      function rd(e) {
        return (n = Jl((e = gl(e, Xl)))).asyncQueue.enqueue(async () => {
          const e = await Fl(n),
            t = await Bl(n);
          return (
            e.setNetworkEnabled(!1),
            (async function () {
              const e = t;
              e._u.add(0), await rh(e), e.gu.set("Offline");
            })()
          );
        });
        var n;
      }
      function sd(t, e) {
        return (
          (n = Jl((t = gl(t, Xl)))),
          (r = e),
          n.asyncQueue
            .enqueue(async () =>
              (function (e, t) {
                const n = e;
                return n.persistence.runTransaction(
                  "Get named query",
                  "readonly",
                  (e) => n.Ns.getNamedQuery(e, t)
                );
              })(await Pl(n), r)
            )
            .then((e) => (e ? new bl(t, null, e.query) : null))
        );
        var n, r;
      }
      function id(e) {
        if (e._initialized || e._terminated)
          throw new br(
            Ir.FAILED_PRECONDITION,
            "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object."
          );
      }
      class ad {
        constructor(e) {
          this._byteString = e;
        }
        static fromBase64String(e) {
          try {
            return new ad(Ts.fromBase64String(e));
          } catch (e) {
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Failed to construct data from Base64 string: " + e
            );
          }
        }
        static fromUint8Array(e) {
          return new ad(Ts.fromUint8Array(e));
        }
        toBase64() {
          return this._byteString.toBase64();
        }
        toUint8Array() {
          return this._byteString.toUint8Array();
        }
        toString() {
          return "Bytes(base64: " + this.toBase64() + ")";
        }
        isEqual(e) {
          return this._byteString.isEqual(e._byteString);
        }
      }
      class od {
        constructor(...e) {
          for (let t = 0; t < e.length; ++t)
            if (0 === e[t].length)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "Invalid field name at argument $(i + 1). Field names must not be empty."
              );
          this._internalPath = new Ur(e);
        }
        isEqual(e) {
          return this._internalPath.isEqual(e._internalPath);
        }
      }
      class ud {
        constructor(e) {
          this._methodName = e;
        }
      }
      class cd {
        constructor(e, t) {
          if (!isFinite(e) || e < -90 || 90 < e)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Latitude must be a number between -90 and 90, but was: " + e
            );
          if (!isFinite(t) || t < -180 || 180 < t)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Longitude must be a number between -180 and 180, but was: " + t
            );
          (this._lat = e), (this._long = t);
        }
        get latitude() {
          return this._lat;
        }
        get longitude() {
          return this._long;
        }
        isEqual(e) {
          return this._lat === e._lat && this._long === e._long;
        }
        toJSON() {
          return { latitude: this._lat, longitude: this._long };
        }
        _compareTo(e) {
          return Rr(this._lat, e._lat) || Rr(this._long, e._long);
        }
      }
      const hd = /^__.*__$/;
      class ld {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return null !== this.fieldMask
            ? new oa(e, this.data, this.fieldMask, t, this.fieldTransforms)
            : new aa(e, this.data, t, this.fieldTransforms);
        }
      }
      class dd {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return new oa(e, this.data, this.fieldMask, t, this.fieldTransforms);
        }
      }
      function fd(e) {
        switch (e) {
          case 0:
          case 2:
          case 1:
            return 1;
          case 3:
          case 4:
            return;
          default:
            throw vr();
        }
      }
      class gd {
        constructor(e, t, n, r, s, i) {
          (this.settings = e),
            (this.databaseId = t),
            (this.It = n),
            (this.ignoreUndefinedProperties = r),
            void 0 === s && this.na(),
            (this.fieldTransforms = s || []),
            (this.fieldMask = i || []);
        }
        get path() {
          return this.settings.path;
        }
        get sa() {
          return this.settings.sa;
        }
        ia(e) {
          return new gd(
            Object.assign(Object.assign({}, this.settings), e),
            this.databaseId,
            this.It,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask
          );
        }
        ra(e) {
          var t;
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            r = this.ia({ path: n, oa: !1 });
          return r.ua(e), r;
        }
        ca(e) {
          var t;
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            r = this.ia({ path: n, oa: !1 });
          return r.na(), r;
        }
        aa(e) {
          return this.ia({ path: void 0, oa: !0 });
        }
        ha(e) {
          return Md(
            e,
            this.settings.methodName,
            this.settings.la || !1,
            this.path,
            this.settings.fa
          );
        }
        contains(t) {
          return (
            void 0 !== this.fieldMask.find((e) => t.isPrefixOf(e)) ||
            void 0 !== this.fieldTransforms.find((e) => t.isPrefixOf(e.field))
          );
        }
        na() {
          if (this.path)
            for (let e = 0; e < this.path.length; e++)
              this.ua(this.path.get(e));
        }
        ua(e) {
          if (0 === e.length)
            throw this.ha("Document fields must not be empty");
          if (fd(this.sa) && hd.test(e))
            throw this.ha('Document fields cannot begin and end with "__"');
        }
      }
      class md {
        constructor(e, t, n) {
          (this.databaseId = e),
            (this.ignoreUndefinedProperties = t),
            (this.It = n || Hc(e));
        }
        da(e, t, n, r = !1) {
          return new gd(
            {
              sa: e,
              methodName: t,
              fa: n,
              path: Ur.emptyPath(),
              oa: !1,
              la: r,
            },
            this.databaseId,
            this.It,
            this.ignoreUndefinedProperties
          );
        }
      }
      function pd(e) {
        var t = e._freezeSettings(),
          n = Hc(e._databaseId);
        return new md(e._databaseId, !!t.ignoreUndefinedProperties, n);
      }
      function yd(e, t, n, r, s, i = {}) {
        const a = e.da(i.merge || i.mergeFields ? 2 : 0, t, n, s);
        Nd("Data must be an object, but it was:", a, r);
        var o = Ad(r, a);
        let u, c;
        if (i.merge) (u = new Es(a.fieldMask)), (c = a.fieldTransforms);
        else if (i.mergeFields) {
          const e = [];
          for (const r of i.mergeFields) {
            const s = kd(t, r, n);
            if (!a.contains(s))
              throw new br(
                Ir.INVALID_ARGUMENT,
                `Field '${s}' is specified in your field mask but missing from your input data.`
              );
            Od(e, s) || e.push(s);
          }
          (u = new Es(e)),
            (c = a.fieldTransforms.filter((e) => u.covers(e.field)));
        } else (u = null), (c = a.fieldTransforms);
        return new ld(new Zs(o), u, c);
      }
      class vd extends ud {
        _toFieldTransform(e) {
          if (2 !== e.sa)
            throw 1 === e.sa
              ? e.ha(
                  `${this._methodName}() can only appear at the top level of your update data`
                )
              : e.ha(
                  `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
                );
          return e.fieldMask.push(e.path), null;
        }
        isEqual(e) {
          return e instanceof vd;
        }
      }
      function wd(e, t, n) {
        return new gd(
          { sa: 3, fa: t.settings.fa, methodName: e._methodName, oa: n },
          t.databaseId,
          t.It,
          t.ignoreUndefinedProperties
        );
      }
      class Id extends ud {
        _toFieldTransform(e) {
          return new Xi(e.path, new Gi());
        }
        isEqual(e) {
          return e instanceof Id;
        }
      }
      class bd extends ud {
        constructor(e, t) {
          super(e), (this._a = t);
        }
        _toFieldTransform(e) {
          const t = wd(this, e, !0),
            n = this._a.map((e) => Dd(e, t)),
            r = new ji(n);
          return new Xi(e.path, r);
        }
        isEqual(e) {
          return this === e;
        }
      }
      class Ed extends ud {
        constructor(e, t) {
          super(e), (this._a = t);
        }
        _toFieldTransform(e) {
          const t = wd(this, e, !0),
            n = this._a.map((e) => Dd(e, t)),
            r = new Qi(n);
          return new Xi(e.path, r);
        }
        isEqual(e) {
          return this === e;
        }
      }
      class Td extends ud {
        constructor(e, t) {
          super(e), (this.wa = t);
        }
        _toFieldTransform(e) {
          var t = new Hi(e.It, Ui(e.It, this.wa));
          return new Xi(e.path, t);
        }
        isEqual(e) {
          return this === e;
        }
      }
      function Sd(e, s, i, t) {
        const a = e.da(1, s, i);
        Nd("Data must be an object, but it was:", a, t);
        const o = [],
          u = Zs.empty();
        gs(t, (e, t) => {
          var n = Ld(s, e, i);
          t = m(t);
          var r = a.ca(n);
          if (t instanceof vd) o.push(n);
          else {
            const e = Dd(t, r);
            null != e && (o.push(n), u.set(n, e));
          }
        });
        var n = new Es(o);
        return new dd(u, n, a.fieldTransforms);
      }
      function _d(e, t, n, r, s, i) {
        const a = e.da(1, t, n),
          o = [kd(t, r, n)],
          u = [s];
        if (i.length % 2 != 0)
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
          );
        for (let f = 0; f < i.length; f += 2)
          o.push(kd(t, i[f])), u.push(i[f + 1]);
        const c = [],
          h = Zs.empty();
        for (let g = o.length - 1; 0 <= g; --g)
          if (!Od(c, o[g])) {
            const t = o[g];
            var l = m((l = u[g]));
            const r = a.ca(t);
            if (l instanceof vd) c.push(t);
            else {
              const e = Dd(l, r);
              null != e && (c.push(t), h.set(t, e));
            }
          }
        var d = new Es(c);
        return new dd(h, d, a.fieldTransforms);
      }
      function xd(e, t, n, r = !1) {
        return Dd(n, e.da(r ? 4 : 3, t));
      }
      function Dd(i, e) {
        if (Cd((i = m(i))))
          return Nd("Unsupported field value:", e, i), Ad(i, e);
        if (i instanceof ud)
          return (
            (function (e, t) {
              if (!fd(t.sa))
                throw t.ha(
                  `${e._methodName}() can only be used with update() and set()`
                );
              if (!t.path)
                throw t.ha(
                  `${e._methodName}() is not currently supported inside arrays`
                );
              var n = e._toFieldTransform(t);
              n && t.fieldTransforms.push(n);
            })(i, e),
            null
          );
        if (void 0 === i && e.ignoreUndefinedProperties) return null;
        if ((e.path && e.fieldMask.push(e.path), i instanceof Array)) {
          if (e.settings.oa && 4 !== e.sa)
            throw e.ha("Nested arrays are not supported");
          return (function (t) {
            const n = [];
            let r = 0;
            for (const s of i) {
              let e = Dd(s, t.aa(r));
              null == e && (e = { nullValue: "NULL_VALUE" }), n.push(e), r++;
            }
            return { arrayValue: { values: n } };
          })(e);
        }
        return (function (e, t) {
          if (null === (e = m(i))) return { nullValue: "NULL_VALUE" };
          if ("number" == typeof e) return Ui(t.It, e);
          if ("boolean" == typeof e) return { booleanValue: e };
          if ("string" == typeof e) return { stringValue: e };
          if (e instanceof Date) {
            var n = Or.fromDate(e);
            return { timestampValue: Pa(t.It, n) };
          }
          if (e instanceof Or) {
            n = new Or(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
            return { timestampValue: Pa(t.It, n) };
          }
          if (e instanceof cd)
            return {
              geoPointValue: { latitude: e.latitude, longitude: e.longitude },
            };
          if (e instanceof ad) return { bytesValue: Ba(t.It, e._byteString) };
          if (e instanceof Il) {
            const r = t.databaseId,
              s = e.firestore._databaseId;
            if (!s.isEqual(r))
              throw t.ha(
                `Document reference is for database ${s.projectId}/${s.database} but should be for database ${r.projectId}/${r.database}`
              );
            return {
              referenceValue: qa(
                e.firestore._databaseId || t.databaseId,
                e._key.path
              ),
            };
          }
          throw t.ha(`Unsupported field value: ${fl(e)}`);
        })(0, e);
      }
      function Ad(e, r) {
        const s = {};
        return (
          ms(e)
            ? r.path && 0 < r.path.length && r.fieldMask.push(r.path)
            : gs(e, (e, t) => {
                var n = Dd(t, r.ra(e));
                null != n && (s[e] = n);
              }),
          { mapValue: { fields: s } }
        );
      }
      function Cd(e) {
        return !(
          "object" != typeof e ||
          null === e ||
          e instanceof Array ||
          e instanceof Date ||
          e instanceof Or ||
          e instanceof cd ||
          e instanceof ad ||
          e instanceof Il ||
          e instanceof ud
        );
      }
      function Nd(e, t, n) {
        if (
          !Cd(n) ||
          "object" != typeof (s = n) ||
          null === s ||
          (Object.getPrototypeOf(s) !== Object.prototype &&
            null !== Object.getPrototypeOf(s))
        ) {
          var r = fl(n);
          throw "an object" === r
            ? t.ha(e + " a custom object")
            : t.ha(e + " " + r);
        }
        var s;
      }
      function kd(e, t, n) {
        if ((t = m(t)) instanceof od) return t._internalPath;
        if ("string" == typeof t) return Ld(e, t);
        throw Md(
          "Field path arguments must be of type string or ",
          e,
          !1,
          void 0,
          n
        );
      }
      const Rd = new RegExp("[~\\*/\\[\\]]");
      function Ld(t, n, r) {
        if (0 <= n.search(Rd))
          throw Md(
            `Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`,
            t,
            !1,
            void 0,
            r
          );
        try {
          return new od(...n.split("."))._internalPath;
        } catch (e) {
          throw Md(
            `Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            t,
            !1,
            void 0,
            r
          );
        }
      }
      function Md(e, t, n, r, s) {
        var i = r && !r.isEmpty(),
          a = void 0 !== s;
        let o = `Function ${t}() called with invalid data`;
        n && (o += " (via `toFirestore()`)"), (o += ". ");
        let u = "";
        return (
          (i || a) &&
            ((u += " (found"),
            i && (u += ` in field ${r}`),
            a && (u += ` in document ${s}`),
            (u += ")")),
          new br(Ir.INVALID_ARGUMENT, o + e + u)
        );
      }
      function Od(e, t) {
        return e.some((e) => e.isEqual(t));
      }
      class Vd {
        constructor(e, t, n, r, s) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._key = n),
            (this._document = r),
            (this._converter = s);
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get ref() {
          return new Il(this._firestore, this._converter, this._key);
        }
        exists() {
          return null !== this._document;
        }
        data() {
          if (this._document) {
            if (this._converter) {
              var e = new Fd(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                null
              );
              return this._converter.fromFirestore(e);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
          }
        }
        get(e) {
          if (this._document) {
            var t = this._document.data.field(Pd("DocumentSnapshot.get", e));
            if (null !== t) return this._userDataWriter.convertValue(t);
          }
        }
      }
      class Fd extends Vd {
        data() {
          return super.data();
        }
      }
      function Pd(e, t) {
        return "string" == typeof t
          ? Ld(e, t)
          : (t instanceof od ? t : t._delegate)._internalPath;
      }
      function Bd(e) {
        if ("L" === e.limitType && 0 === e.explicitOrderBy.length)
          throw new br(
            Ir.UNIMPLEMENTED,
            "limitToLast() queries require specifying at least one orderBy() clause"
          );
      }
      class Ud {}
      function qd(e, ...t) {
        for (const n of t) e = n._apply(e);
        return e;
      }
      class Kd extends Ud {
        constructor(e, t, n) {
          super(),
            (this.ma = e),
            (this.ga = t),
            (this.ya = n),
            (this.type = "where");
        }
        _apply(e) {
          var t = pd(e.firestore),
            t = (function (e, t, n, r, s, i, a) {
              let o;
              if (s.isKeyField()) {
                if ("array-contains" === i || "array-contains-any" === i)
                  throw new br(
                    Ir.INVALID_ARGUMENT,
                    `Invalid Query. You can't perform '${i}' queries on documentId().`
                  );
                if ("in" === i || "not-in" === i) {
                  Wd(a, i);
                  const t = [];
                  for (const n of a) t.push(Hd(r, e, n));
                  o = { arrayValue: { values: t } };
                } else o = Hd(r, e, a);
              } else
                ("in" !== i && "not-in" !== i && "array-contains-any" !== i) ||
                  Wd(a, i),
                  (o = xd(n, t, a, "in" === i || "not-in" === i));
              var u = ci.create(s, i, o);
              return (
                (function (e, t) {
                  if (t.dt()) {
                    const r = Di(e);
                    if (null !== r && !r.isEqual(t.field))
                      throw new br(
                        Ir.INVALID_ARGUMENT,
                        `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${t.field.toString()}'`
                      );
                    var n = xi(e);
                    null !== n && Yd(0, t.field, n);
                  }
                  const r = (function (e, t) {
                    for (const n of e.filters)
                      if (0 <= t.indexOf(n.op)) return n.op;
                    return null;
                  })(
                    e,
                    (function () {
                      switch (t.op) {
                        case "!=":
                          return ["!=", "not-in"];
                        case "array-contains":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "not-in",
                          ];
                        case "in":
                          return ["array-contains-any", "in", "not-in"];
                        case "array-contains-any":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "in",
                            "not-in",
                          ];
                        case "not-in":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "in",
                            "not-in",
                            "!=",
                          ];
                        default:
                          return [];
                      }
                    })()
                  );
                  if (null !== r)
                    throw r === t.op
                      ? new br(
                          Ir.INVALID_ARGUMENT,
                          `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
                        )
                      : new br(
                          Ir.INVALID_ARGUMENT,
                          `Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`
                        );
                })(e, u),
                u
              );
            })(
              e._query,
              "where",
              t,
              e.firestore._databaseId,
              this.ma,
              this.ga,
              this.ya
            );
          return new bl(
            e.firestore,
            e.converter,
            ((e = e._query),
            (t = e.filters.concat([t])),
            new Ei(
              e.path,
              e.collectionGroup,
              e.explicitOrderBy.slice(),
              t,
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class Gd extends Ud {
        constructor(e, t) {
          super(), (this.ma = e), (this.pa = t), (this.type = "orderBy");
        }
        _apply(e) {
          var t = (function (e, t, n) {
            if (null !== e.startAt)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "Invalid query. You must not call startAt() or startAfter() before calling orderBy()."
              );
            if (null !== e.endAt)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "Invalid query. You must not call endAt() or endBefore() before calling orderBy()."
              );
            var r,
              s = new wi(t, n);
            return (
              (n = s),
              null !== xi((e = e)) ||
                (null !== (r = Di(e)) && Yd(0, r, n.field)),
              s
            );
          })(e._query, this.ma, this.pa);
          return new bl(
            e.firestore,
            e.converter,
            ((e = e._query),
            (t = e.explicitOrderBy.concat([t])),
            new Ei(
              e.path,
              e.collectionGroup,
              t,
              e.filters.slice(),
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class jd extends Ud {
        constructor(e, t, n) {
          super(), (this.type = e), (this.Ia = t), (this.Ta = n);
        }
        _apply(e) {
          return new bl(
            e.firestore,
            e.converter,
            ki(e._query, this.Ia, this.Ta)
          );
        }
      }
      class $d extends Ud {
        constructor(e, t, n) {
          super(), (this.type = e), (this.Ea = t), (this.Aa = n);
        }
        _apply(e) {
          var t,
            n = zd(e, this.type, this.Ea, this.Aa);
          return new bl(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new Ei(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              e,
              t.endAt
            ))
          );
        }
      }
      class Qd extends Ud {
        constructor(e, t, n) {
          super(), (this.type = e), (this.Ea = t), (this.Aa = n);
        }
        _apply(e) {
          var t,
            n = zd(e, this.type, this.Ea, this.Aa);
          return new bl(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new Ei(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              t.startAt,
              e
            ))
          );
        }
      }
      function zd(e, t, n, r) {
        if (((n[0] = m(n[0])), n[0] instanceof Vd))
          return (function (e, t, n, r, s) {
            if (!r)
              throw new br(
                Ir.NOT_FOUND,
                `Can't use a DocumentSnapshot that doesn't exist for ${n}().`
              );
            const i = [];
            for (const n of Ci(e))
              if (n.field.isKeyField()) i.push(Gs(t, r.key));
              else {
                const e = r.data.field(n.field);
                if (As(e))
                  throw new br(
                    Ir.INVALID_ARGUMENT,
                    'Invalid query. You are trying to start or end a query using a document for which the field "' +
                      n.field +
                      '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
                  );
                if (null === e) {
                  const e = n.field.canonicalString();
                  throw new br(
                    Ir.INVALID_ARGUMENT,
                    `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`
                  );
                }
                i.push(e);
              }
            return new vi(i, s);
          })(e._query, e.firestore._databaseId, t, n[0]._document, r);
        var s = pd(e.firestore);
        return (function (e, t, n, r, s, i) {
          const a = e.explicitOrderBy;
          if (s.length > a.length)
            throw new br(
              Ir.INVALID_ARGUMENT,
              `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`
            );
          const o = [];
          for (let u = 0; u < s.length; u++) {
            const c = s[u];
            if (a[u].field.isKeyField()) {
              if ("string" != typeof c)
                throw new br(
                  Ir.INVALID_ARGUMENT,
                  `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`
                );
              if (!Ai(e) && -1 !== c.indexOf("/"))
                throw new br(
                  Ir.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`
                );
              const n = e.path.child(Pr.fromString(c));
              if (!qr.isDocumentKey(n))
                throw new br(
                  Ir.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`
                );
              const s = new qr(n);
              o.push(Gs(t, s));
            } else {
              const e = xd(n, r, c);
              o.push(e);
            }
          }
          return new vi(o, i);
        })(e._query, e.firestore._databaseId, s, t, n, r);
      }
      function Hd(e, t, n) {
        if ("string" == typeof (n = m(n))) {
          if ("" === n)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string."
            );
          if (!Ai(t) && -1 !== n.indexOf("/"))
            throw new br(
              Ir.INVALID_ARGUMENT,
              `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
            );
          var r = t.path.child(Pr.fromString(n));
          if (!qr.isDocumentKey(r))
            throw new br(
              Ir.INVALID_ARGUMENT,
              `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`
            );
          return Gs(e, new qr(r));
        }
        if (n instanceof Il) return Gs(e, n._key);
        throw new br(
          Ir.INVALID_ARGUMENT,
          `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fl(
            n
          )}.`
        );
      }
      function Wd(e, t) {
        if (!Array.isArray(e) || 0 === e.length)
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
          );
        if (10 < e.length)
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`
          );
      }
      function Yd(e, t, n) {
        if (!n.isEqual(t))
          throw new br(
            Ir.INVALID_ARGUMENT,
            `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`
          );
      }
      class Xd {
        convertValue(e, t = "none") {
          switch (Fs(e)) {
            case 0:
              return null;
            case 1:
              return e.booleanValue;
            case 2:
              return xs(e.integerValue || e.doubleValue);
            case 3:
              return this.convertTimestamp(e.timestampValue);
            case 4:
              return this.convertServerTimestamp(e, t);
            case 5:
              return e.stringValue;
            case 6:
              return this.convertBytes(Ds(e.bytesValue));
            case 7:
              return this.convertReference(e.referenceValue);
            case 8:
              return this.convertGeoPoint(e.geoPointValue);
            case 9:
              return this.convertArray(e.arrayValue, t);
            case 10:
              return this.convertObject(e.mapValue, t);
            default:
              throw vr();
          }
        }
        convertObject(e, n) {
          const r = {};
          return (
            gs(e.fields, (e, t) => {
              r[e] = this.convertValue(t, n);
            }),
            r
          );
        }
        convertGeoPoint(e) {
          return new cd(xs(e.latitude), xs(e.longitude));
        }
        convertArray(e, t) {
          return (e.values || []).map((e) => this.convertValue(e, t));
        }
        convertServerTimestamp(e, t) {
          switch (t) {
            case "previous":
              var n = (function e(t) {
                var n = t.mapValue.fields.__previous_value__;
                return As(n) ? e(n) : n;
              })(e);
              return null == n ? null : this.convertValue(n, t);
            case "estimate":
              return this.convertTimestamp(Cs(e));
            default:
              return null;
          }
        }
        convertTimestamp(e) {
          var t = _s(e);
          return new Or(t.seconds, t.nanos);
        }
        convertDocumentKey(e, t) {
          const n = Pr.fromString(e);
          wr(ao(n));
          const r = new ks(n.get(1), n.get(3)),
            s = new qr(n.popFirst(5));
          return (
            r.isEqual(t) ||
              mr(
                `Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
              ),
            s
          );
        }
      }
      function Jd(e, t, n) {
        return e
          ? n && (n.merge || n.mergeFields)
            ? e.toFirestore(t, n)
            : e.toFirestore(t)
          : t;
      }
      class Zd extends Xd {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new ad(e);
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return new Il(this.firestore, null, t);
        }
      }
      class ef {
        constructor(e, t) {
          (this.hasPendingWrites = e), (this.fromCache = t);
        }
        isEqual(e) {
          return (
            this.hasPendingWrites === e.hasPendingWrites &&
            this.fromCache === e.fromCache
          );
        }
      }
      class tf extends Vd {
        constructor(e, t, n, r, s, i) {
          super(e, t, n, r, i),
            (this._firestore = e),
            (this._firestoreImpl = e),
            (this.metadata = s);
        }
        exists() {
          return super.exists();
        }
        data(e = {}) {
          if (this._document) {
            if (this._converter) {
              var t = new nf(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                this.metadata,
                null
              );
              return this._converter.fromFirestore(t, e);
            }
            return this._userDataWriter.convertValue(
              this._document.data.value,
              e.serverTimestamps
            );
          }
        }
        get(e, t = {}) {
          if (this._document) {
            var n = this._document.data.field(Pd("DocumentSnapshot.get", e));
            if (null !== n)
              return this._userDataWriter.convertValue(n, t.serverTimestamps);
          }
        }
      }
      class nf extends tf {
        data(e = {}) {
          return super.data(e);
        }
      }
      class rf {
        constructor(e, t, n, r) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._snapshot = r),
            (this.metadata = new ef(r.hasPendingWrites, r.fromCache)),
            (this.query = n);
        }
        get docs() {
          const t = [];
          return this.forEach((e) => t.push(e)), t;
        }
        get size() {
          return this._snapshot.docs.size;
        }
        get empty() {
          return 0 === this.size;
        }
        forEach(t, n) {
          this._snapshot.docs.forEach((e) => {
            t.call(
              n,
              new nf(
                this._firestore,
                this._userDataWriter,
                e.key,
                e,
                new ef(
                  this._snapshot.mutatedKeys.has(e.key),
                  this._snapshot.fromCache
                ),
                this.query.converter
              )
            );
          });
        }
        docChanges(e = {}) {
          var t = !!e.includeMetadataChanges;
          if (t && this._snapshot.excludesMetadataChanges)
            throw new br(
              Ir.INVALID_ARGUMENT,
              "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot()."
            );
          return (
            (this._cachedChanges &&
              this._cachedChangesIncludeMetadataChanges === t) ||
              ((this._cachedChanges = (function (i, t) {
                if (i._snapshot.oldDocs.isEmpty()) {
                  let n = 0;
                  return i._snapshot.docChanges.map((e) => {
                    var t = new nf(
                      i._firestore,
                      i._userDataWriter,
                      e.doc.key,
                      e.doc,
                      new ef(
                        i._snapshot.mutatedKeys.has(e.doc.key),
                        i._snapshot.fromCache
                      ),
                      i.query.converter
                    );
                    return (
                      e.doc,
                      { type: "added", doc: t, oldIndex: -1, newIndex: n++ }
                    );
                  });
                }
                {
                  let s = i._snapshot.oldDocs;
                  return i._snapshot.docChanges
                    .filter((e) => t || 3 !== e.type)
                    .map((e) => {
                      var t = new nf(
                        i._firestore,
                        i._userDataWriter,
                        e.doc.key,
                        e.doc,
                        new ef(
                          i._snapshot.mutatedKeys.has(e.doc.key),
                          i._snapshot.fromCache
                        ),
                        i.query.converter
                      );
                      let n = -1,
                        r = -1;
                      return (
                        0 !== e.type &&
                          ((n = s.indexOf(e.doc.key)),
                          (s = s.delete(e.doc.key))),
                        1 !== e.type &&
                          ((s = s.add(e.doc)), (r = s.indexOf(e.doc.key))),
                        {
                          type: (function (e) {
                            switch (e) {
                              case 0:
                                return "added";
                              case 2:
                              case 3:
                                return "modified";
                              case 1:
                                return "removed";
                              default:
                                return vr();
                            }
                          })(e.type),
                          doc: t,
                          oldIndex: n,
                          newIndex: r,
                        }
                      );
                    });
                }
              })(this, t)),
              (this._cachedChangesIncludeMetadataChanges = t)),
            this._cachedChanges
          );
        }
      }
      function sf(e, t) {
        return e instanceof tf && t instanceof tf
          ? e._firestore === t._firestore &&
              e._key.isEqual(t._key) &&
              (null === e._document
                ? null === t._document
                : e._document.isEqual(t._document)) &&
              e._converter === t._converter
          : e instanceof rf &&
              t instanceof rf &&
              e._firestore === t._firestore &&
              xl(e.query, t.query) &&
              e.metadata.isEqual(t.metadata) &&
              e._snapshot.isEqual(t._snapshot);
      }
      class af extends Xd {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new ad(e);
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return new Il(this.firestore, null, t);
        }
      }
      function of(t) {
        t = gl(t, Il);
        const n = gl(t.firestore, Xl),
          e = Jl(n),
          r = new af(n);
        return (function (e, t) {
          const n = new Er();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                try {
                  const s = await (function (t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "read document",
                      "readonly",
                      (e) => n.localDocuments.getDocument(e, t)
                    );
                  })(t);
                  s.isFoundDocument()
                    ? n.resolve(s)
                    : s.isNoDocument()
                    ? n.resolve(null)
                    : n.reject(
                        new br(
                          Ir.UNAVAILABLE,
                          "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
                        )
                      );
                } catch (e) {
                  var r = Eh(e, `Failed to get document '${t} from cache`);
                  n.reject(r);
                }
              })(await Pl(e), t, n)
            ),
            n.promise
          );
        })(e, t._key).then(
          (e) =>
            new tf(
              n,
              r,
              t._key,
              e,
              new ef(null !== e && e.hasLocalMutations, !0),
              t.converter
            )
        );
      }
      function uf(t) {
        t = gl(t, bl);
        const n = gl(t.firestore, Xl),
          e = Jl(n),
          r = new af(n);
        return (function (e, t) {
          const n = new Er();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                try {
                  const s = await Dc(e, t, !0),
                    i = new Ph(t, s.Hi),
                    a = i.Wu(s.documents),
                    o = i.applyChanges(a, !1);
                  n.resolve(o.snapshot);
                } catch (e) {
                  var r = Eh(e, `Failed to execute query '${t} against cache`);
                  n.reject(r);
                }
              })(await Pl(e), t, n)
            ),
            n.promise
          );
        })(e, t._query).then((e) => new rf(n, r, t, e));
      }
      function cf(e, t, n) {
        e = gl(e, Il);
        var r = gl(e.firestore, Xl),
          s = Jd(e.converter, t, n);
        return ff(r, [
          yd(pd(r), "setDoc", e._key, s, null !== e.converter, n).toMutation(
            e._key,
            Zi.none()
          ),
        ]);
      }
      function hf(e, t, n, ...r) {
        e = gl(e, Il);
        var s = gl(e.firestore, Xl),
          i = pd(s);
        let a;
        return (
          (a =
            "string" == typeof (t = m(t)) || t instanceof od
              ? _d(i, "updateDoc", e._key, t, n, r)
              : Sd(i, "updateDoc", e._key, t)),
          ff(s, [a.toMutation(e._key, Zi.exists(!0))])
        );
      }
      function lf(t, ...n) {
        var e;
        t = m(t);
        let r = { includeMetadataChanges: !1 },
          s = 0;
        "object" != typeof n[s] || Ql(n[s]) || ((r = n[s]), s++);
        var i = { includeMetadataChanges: r.includeMetadataChanges };
        if (Ql(n[s])) {
          const t = n[s];
          (n[s] = null === (e = t.next) || void 0 === e ? void 0 : e.bind(t)),
            (n[s + 1] =
              null === (e = t.error) || void 0 === e ? void 0 : e.bind(t)),
            (n[s + 2] =
              null === (e = t.complete) || void 0 === e ? void 0 : e.bind(t));
        }
        let a, o, u;
        if (t instanceof Il)
          (o = gl(t.firestore, Xl)),
            (u = Si(t._key.path)),
            (a = {
              next: (e) => {
                n[s] && n[s](gf(o, t, e));
              },
              error: n[s + 1],
              complete: n[s + 2],
            });
        else {
          const c = gl(t, bl);
          (o = gl(c.firestore, Xl)), (u = c._query);
          const h = new af(o);
          (a = {
            next: (e) => {
              n[s] && n[s](new rf(o, h, c, e));
            },
            error: n[s + 1],
            complete: n[s + 2],
          }),
            Bd(t._query);
        }
        return (function (e, t, n, r) {
          const s = new Al(r),
            i = new kh(t, s, n);
          return (
            e.asyncQueue.enqueueAndForget(async () => Ah(await ql(e), i)),
            () => {
              s.bc(),
                e.asyncQueue.enqueueAndForget(async () => Ch(await ql(e), i));
            }
          );
        })(Jl(o), u, i, a);
      }
      function df(e, t) {
        return (function (e, t) {
          const n = new Al(t);
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (function (e, t) {
                e.Ru.add(t), t.next();
              })(await ql(e), n)
            ),
            () => {
              n.bc(),
                e.asyncQueue.enqueueAndForget(async () =>
                  (function (e, t) {
                    e.Ru.delete(t);
                  })(await ql(e), n)
                );
            }
          );
        })(Jl((e = gl(e, Xl))), Ql(t) ? t : { next: t });
      }
      function ff(e, t) {
        return (function (e, t) {
          const n = new Er();
          return (
            e.asyncQueue.enqueueAndForget(async () => Gh(await Ul(e), t, n)),
            n.promise
          );
        })(Jl(e), t);
      }
      function gf(e, t, n) {
        var r = n.docs.get(t._key),
          s = new af(e);
        return new tf(
          e,
          s,
          t._key,
          r,
          new ef(n.hasPendingWrites, n.fromCache),
          t.converter
        );
      }
      const mf = { maxAttempts: 5 };
      class pf {
        constructor(e, t) {
          (this._firestore = e),
            (this._commitHandler = t),
            (this._mutations = []),
            (this._committed = !1),
            (this._dataReader = pd(e));
        }
        set(e, t, n) {
          this._verifyNotCommitted();
          const r = yf(e, this._firestore),
            s = Jd(r.converter, t, n),
            i = yd(
              this._dataReader,
              "WriteBatch.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._mutations.push(i.toMutation(r._key, Zi.none())), this;
        }
        update(e, t, n, ...r) {
          this._verifyNotCommitted();
          var s = yf(e, this._firestore);
          let i;
          return (
            (i =
              "string" == typeof (t = m(t)) || t instanceof od
                ? _d(this._dataReader, "WriteBatch.update", s._key, t, n, r)
                : Sd(this._dataReader, "WriteBatch.update", s._key, t)),
            this._mutations.push(i.toMutation(s._key, Zi.exists(!0))),
            this
          );
        }
        delete(e) {
          this._verifyNotCommitted();
          var t = yf(e, this._firestore);
          return (
            (this._mutations = this._mutations.concat(
              new la(t._key, Zi.none())
            )),
            this
          );
        }
        commit() {
          return (
            this._verifyNotCommitted(),
            (this._committed = !0),
            0 < this._mutations.length
              ? this._commitHandler(this._mutations)
              : Promise.resolve()
          );
        }
        _verifyNotCommitted() {
          if (this._committed)
            throw new br(
              Ir.FAILED_PRECONDITION,
              "A write batch can no longer be used after commit() has been called."
            );
        }
      }
      function yf(e, t) {
        if ((e = m(e)).firestore !== t)
          throw new br(
            Ir.INVALID_ARGUMENT,
            "Provided document reference is from a different Firestore instance."
          );
        return e;
      }
      class vf extends class {
        constructor(e, t) {
          (this._firestore = e),
            (this._transaction = t),
            (this._dataReader = pd(e));
        }
        get(e) {
          const n = yf(e, this._firestore),
            r = new Zd(this._firestore);
          return this._transaction.lookup([n._key]).then((e) => {
            if (!e || 1 !== e.length) return vr();
            const t = e[0];
            if (t.isFoundDocument())
              return new Vd(this._firestore, r, t.key, t, n.converter);
            if (t.isNoDocument())
              return new Vd(this._firestore, r, n._key, null, n.converter);
            throw vr();
          });
        }
        set(e, t, n) {
          var r = yf(e, this._firestore),
            s = Jd(r.converter, t, n),
            s = yd(
              this._dataReader,
              "Transaction.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._transaction.set(r._key, s), this;
        }
        update(e, t, n, ...r) {
          var s = yf(e, this._firestore),
            i =
              "string" == typeof (t = m(t)) || t instanceof od
                ? _d(this._dataReader, "Transaction.update", s._key, t, n, r)
                : Sd(this._dataReader, "Transaction.update", s._key, t);
          return this._transaction.update(s._key, i), this;
        }
        delete(e) {
          var t = yf(e, this._firestore);
          return this._transaction.delete(t._key), this;
        }
      } {
        constructor(e, t) {
          super(e, t), (this._firestore = e);
        }
        get(e) {
          const t = yf(e, this._firestore),
            n = new af(this._firestore);
          return super
            .get(e)
            .then(
              (e) =>
                new tf(
                  this._firestore,
                  n,
                  t._key,
                  e._document,
                  new ef(!1, !1),
                  t.converter
                )
            );
        }
      }
      function wf(t, n, e) {
        t = gl(t, Xl);
        var r = Object.assign(Object.assign({}, mf), e);
        return (
          (function () {
            if (r.maxAttempts < 1)
              throw new br(
                Ir.INVALID_ARGUMENT,
                "Max attempts must be at least 1"
              );
          })(),
          (function (t, n, r) {
            const s = new Er();
            return (
              t.asyncQueue.enqueueAndForget(async () => {
                var e = await Vl(t).then((e) => e.datastore);
                new kl(t.asyncQueue, e, r, n, s).run();
              }),
              s.promise
            );
          })(Jl(t), (e) => n(new vf(t, e)), r)
        );
      }
      (Hl = Qf.SDK_VERSION),
        (lr = Hl),
        Qf._registerComponent(
          new h(
            "firestore",
            (e, { instanceIdentifier: t, options: n }) => {
              const r = e.getProvider("app").getImmediate(),
                s = new Xl(
                  new xr(e.getProvider("auth-internal")),
                  new Nr(e.getProvider("app-check-internal")),
                  (function (e, t) {
                    if (
                      !Object.prototype.hasOwnProperty.apply(e.options, [
                        "projectId",
                      ])
                    )
                      throw new br(
                        Ir.INVALID_ARGUMENT,
                        '"projectId" not provided in firebase.initializeApp.'
                      );
                    return new ks(e.options.projectId, t);
                  })(r, t),
                  r
                );
              return (
                (n = Object.assign({ useFetchStreams: !0 }, n)),
                s._setSettings(n),
                s
              );
            },
            "PUBLIC"
          ).setMultipleInstances(!0)
        ),
        Qf.registerVersion(cr, "3.7.3", void 0),
        Qf.registerVersion(cr, "3.7.3", "esm2017");
      function If(e, t) {
        if (void 0 === t) return { merge: !1 };
        if (void 0 !== t.mergeFields && void 0 !== t.merge)
          throw new br(
            "invalid-argument",
            `Invalid options passed to function ${e}(): You cannot ` +
              'specify both "merge" and "mergeFields".'
          );
        return t;
      }
      function bf() {
        if ("undefined" == typeof Uint8Array)
          throw new br(
            "unimplemented",
            "Uint8Arrays are not available in this environment."
          );
      }
      function Ef() {
        if ("undefined" == typeof atob)
          throw new br(
            "unimplemented",
            "Blobs are unavailable in Firestore in this environment."
          );
      }
      class Tf {
        constructor(e) {
          this._delegate = e;
        }
        static fromBase64String(e) {
          return Ef(), new Tf(ad.fromBase64String(e));
        }
        static fromUint8Array(e) {
          return bf(), new Tf(ad.fromUint8Array(e));
        }
        toBase64() {
          return Ef(), this._delegate.toBase64();
        }
        toUint8Array() {
          return bf(), this._delegate.toUint8Array();
        }
        isEqual(e) {
          return this._delegate.isEqual(e._delegate);
        }
        toString() {
          return "Blob(base64: " + this.toBase64() + ")";
        }
      }
      function Sf(e) {
        return (function (e, t) {
          if ("object" != typeof e || null === e) return;
          var n = e;
          for (const r of t) if (r in n && "function" == typeof n[r]) return 1;
          return;
        })(e, ["next", "error", "complete"]);
      }
      class _f {
        enableIndexedDbPersistence(e, t) {
          return (function (e, t) {
            id((e = gl(e, Xl)));
            var n = Jl(e),
              r = e._freezeSettings(),
              s = new ul();
            return ed(
              n,
              s,
              new al(s, r.cacheSizeBytes, null == t ? void 0 : t.forceOwnership)
            );
          })(e._delegate, { forceOwnership: t });
        }
        enableMultiTabIndexedDbPersistence(e) {
          return (function (e) {
            id((e = gl(e, Xl)));
            var t = Jl(e),
              n = e._freezeSettings(),
              r = new ul();
            return ed(t, r, new ol(r, n.cacheSizeBytes));
          })(e._delegate);
        }
        clearIndexedDbPersistence(e) {
          return (function (e) {
            if (e._initialized && !e._terminated)
              throw new br(
                Ir.FAILED_PRECONDITION,
                "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated."
              );
            const t = new Er();
            return (
              e._queue.enqueueAndForgetEvenWhileRestricted(async () => {
                try {
                  await (async function (e) {
                    if (!ns.C()) return Promise.resolve();
                    var t = e + "main";
                    await ns.delete(t);
                  })(pc(e._databaseId, e._persistenceKey)),
                    t.resolve();
                } catch (e) {
                  t.reject(e);
                }
              }),
              t.promise
            );
          })(e._delegate);
        }
      }
      class xf {
        constructor(e, t, n) {
          (this._delegate = t),
            (this._persistenceProvider = n),
            (this.INTERNAL = { delete: () => this.terminate() }),
            e instanceof ks || (this._appCompat = e);
        }
        get _databaseId() {
          return this._delegate._databaseId;
        }
        settings(e) {
          var t = this._delegate._getSettings();
          e.merge ||
            t.host === e.host ||
            pr(
              "You are overriding the original host. If you did not intend to override your settings, use {merge: true}."
            ),
            e.merge &&
              delete (e = Object.assign(Object.assign({}, t), e)).merge,
            this._delegate._setSettings(e);
        }
        useEmulator(e, t, n = {}) {
          wl(this._delegate, e, t, n);
        }
        enableNetwork() {
          return nd(this._delegate);
        }
        disableNetwork() {
          return rd(this._delegate);
        }
        enablePersistence(e) {
          let t = !1,
            n = !1;
          return (
            e &&
              ((t = !!e.synchronizeTabs),
              (n = !!e.experimentalForceOwningTab),
              hl("synchronizeTabs", t, "experimentalForceOwningTab", n)),
            t
              ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(
                  this
                )
              : this._persistenceProvider.enableIndexedDbPersistence(this, n)
          );
        }
        clearPersistence() {
          return this._persistenceProvider.clearIndexedDbPersistence(this);
        }
        terminate() {
          return (
            this._appCompat &&
              (this._appCompat._removeServiceInstance("firestore-compat"),
              this._appCompat._removeServiceInstance("firestore")),
            this._delegate._delete()
          );
        }
        waitForPendingWrites() {
          return td(this._delegate);
        }
        onSnapshotsInSync(e) {
          return df(this._delegate, e);
        }
        get app() {
          if (!this._appCompat)
            throw new br(
              "failed-precondition",
              "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
          return this._appCompat;
        }
        collection(e) {
          try {
            return new Uf(this, Tl(this._delegate, e));
          } catch (e) {
            throw Rf(e, "collection()", "Firestore.collection()");
          }
        }
        doc(e) {
          try {
            return new kf(this, Sl(this._delegate, e));
          } catch (e) {
            throw Rf(e, "doc()", "Firestore.doc()");
          }
        }
        collectionGroup(e) {
          try {
            return new Ff(
              this,
              (function (e, t) {
                if (
                  ((e = gl(e, vl)),
                  cl("collectionGroup", "collection id", t),
                  0 <= t.indexOf("/"))
                )
                  throw new br(
                    Ir.INVALID_ARGUMENT,
                    `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`
                  );
                return new bl(e, null, ((t = t), new Ei(Pr.emptyPath(), t)));
              })(this._delegate, e)
            );
          } catch (e) {
            throw Rf(e, "collectionGroup()", "Firestore.collectionGroup()");
          }
        }
        runTransaction(t) {
          return wf(this._delegate, (e) => t(new Af(this, e)));
        }
        batch() {
          return (
            Jl(this._delegate),
            new Cf(new pf(this._delegate, (e) => ff(this._delegate, e)))
          );
        }
        loadBundle(e) {
          return (
            (t = this._delegate),
            (e = e),
            (n = Jl((t = gl(t, Xl)))),
            (r = new zl()),
            jl(n, t._databaseId, e, r),
            r
          );
          var t, n, r;
        }
        namedQuery(e) {
          return sd(this._delegate, e).then((e) =>
            e ? new Ff(this, e) : null
          );
        }
      }
      class Df extends Xd {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new Tf(new ad(e));
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return kf.forKey(t, this.firestore, null);
        }
      }
      class Af {
        constructor(e, t) {
          (this._firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Df(e));
        }
        get(e) {
          const t = qf(e);
          return this._delegate
            .get(t)
            .then(
              (e) =>
                new Of(
                  this._firestore,
                  new tf(
                    this._firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    t.converter
                  )
                )
            );
        }
        set(e, t, n) {
          var r = qf(e);
          return (
            n
              ? (If("Transaction.set", n), this._delegate.set(r, t, n))
              : this._delegate.set(r, t),
            this
          );
        }
        update(e, t, n, ...r) {
          var s = qf(e);
          return (
            2 === arguments.length
              ? this._delegate.update(s, t)
              : this._delegate.update(s, t, n, ...r),
            this
          );
        }
        delete(e) {
          var t = qf(e);
          return this._delegate.delete(t), this;
        }
      }
      class Cf {
        constructor(e) {
          this._delegate = e;
        }
        set(e, t, n) {
          var r = qf(e);
          return (
            n
              ? (If("WriteBatch.set", n), this._delegate.set(r, t, n))
              : this._delegate.set(r, t),
            this
          );
        }
        update(e, t, n, ...r) {
          var s = qf(e);
          return (
            2 === arguments.length
              ? this._delegate.update(s, t)
              : this._delegate.update(s, t, n, ...r),
            this
          );
        }
        delete(e) {
          var t = qf(e);
          return this._delegate.delete(t), this;
        }
        commit() {
          return this._delegate.commit();
        }
      }
      class Nf {
        constructor(e, t, n) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._delegate = n);
        }
        fromFirestore(e, t) {
          var n = new nf(
            this._firestore._delegate,
            this._userDataWriter,
            e._key,
            e._document,
            e.metadata,
            null
          );
          return this._delegate.fromFirestore(
            new Vf(this._firestore, n),
            null != t ? t : {}
          );
        }
        toFirestore(e, t) {
          return t
            ? this._delegate.toFirestore(e, t)
            : this._delegate.toFirestore(e);
        }
        static getInstance(e, t) {
          const n = Nf.INSTANCES;
          let r = n.get(e);
          r || ((r = new WeakMap()), n.set(e, r));
          let s = r.get(t);
          return s || ((s = new Nf(e, new Df(e), t)), r.set(t, s)), s;
        }
      }
      Nf.INSTANCES = new WeakMap();
      class kf {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Df(e));
        }
        static forPath(e, t, n) {
          if (e.length % 2 != 0)
            throw new br(
              "invalid-argument",
              "Invalid document reference. Document references must have an even number of segments, but " +
                `${e.canonicalString()} has ${e.length}`
            );
          return new kf(t, new Il(t._delegate, n, new qr(e)));
        }
        static forKey(e, t, n) {
          return new kf(t, new Il(t._delegate, n, e));
        }
        get id() {
          return this._delegate.id;
        }
        get parent() {
          return new Uf(this.firestore, this._delegate.parent);
        }
        get path() {
          return this._delegate.path;
        }
        collection(e) {
          try {
            return new Uf(this.firestore, Tl(this._delegate, e));
          } catch (e) {
            throw Rf(e, "collection()", "DocumentReference.collection()");
          }
        }
        isEqual(e) {
          return (e = m(e)) instanceof Il && _l(this._delegate, e);
        }
        set(e, t) {
          t = If("DocumentReference.set", t);
          try {
            return t ? cf(this._delegate, e, t) : cf(this._delegate, e);
          } catch (e) {
            throw Rf(e, "setDoc()", "DocumentReference.set()");
          }
        }
        update(e, t, ...n) {
          try {
            return 1 === arguments.length
              ? hf(this._delegate, e)
              : hf(this._delegate, e, t, ...n);
          } catch (e) {
            throw Rf(e, "updateDoc()", "DocumentReference.update()");
          }
        }
        delete() {
          return ff(gl((e = this._delegate).firestore, Xl), [
            new la(e._key, Zi.none()),
          ]);
          var e;
        }
        onSnapshot(...e) {
          var t = Lf(e),
            n = Mf(
              e,
              (e) =>
                new Of(
                  this.firestore,
                  new tf(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            );
          return lf(this._delegate, t, n);
        }
        get(e) {
          let t;
          return (
            (t = (
              "cache" === (null == e ? void 0 : e.source)
                ? of
                : "server" === (null == e ? void 0 : e.source)
                ? function (t) {
                    t = gl(t, Il);
                    const n = gl(t.firestore, Xl);
                    return Kl(Jl(n), t._key, { source: "server" }).then((e) =>
                      gf(n, t, e)
                    );
                  }
                : function (t) {
                    t = gl(t, Il);
                    const n = gl(t.firestore, Xl);
                    return Kl(Jl(n), t._key).then((e) => gf(n, t, e));
                  }
            )(this._delegate)),
            t.then(
              (e) =>
                new Of(
                  this.firestore,
                  new tf(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            )
          );
        }
        withConverter(e) {
          return new kf(
            this.firestore,
            e
              ? this._delegate.withConverter(Nf.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function Rf(e, t, n) {
        return (e.message = e.message.replace(t, n)), e;
      }
      function Lf(e) {
        for (const t of e) if ("object" == typeof t && !Sf(t)) return t;
        return {};
      }
      function Mf(e, t) {
        var n;
        let r;
        return (
          (r = Sf(e[0])
            ? e[0]
            : Sf(e[1])
            ? e[1]
            : "function" == typeof e[0]
            ? { next: e[0], error: e[1], complete: e[2] }
            : { next: e[1], error: e[2], complete: e[3] }),
          {
            next: (e) => {
              r.next && r.next(t(e));
            },
            error: null === (n = r.error) || void 0 === n ? void 0 : n.bind(r),
            complete:
              null === (n = r.complete) || void 0 === n ? void 0 : n.bind(r),
          }
        );
      }
      class Of {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get ref() {
          return new kf(this._firestore, this._delegate.ref);
        }
        get id() {
          return this._delegate.id;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get exists() {
          return this._delegate.exists();
        }
        data(e) {
          return this._delegate.data(e);
        }
        get(e, t) {
          return this._delegate.get(e, t);
        }
        isEqual(e) {
          return sf(this._delegate, e._delegate);
        }
      }
      class Vf extends Of {
        data(e) {
          var t = this._delegate.data(e);
          return void 0 !== t || vr(), t;
        }
      }
      class Ff {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Df(e));
        }
        where(e, t, n) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                ((r = n), (s = t), (i = Pd("where", e)), new Kd(i, s, r))
              )
            );
          } catch (e) {
            throw Rf(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var r, s, i;
        }
        orderBy(e, t) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (([n, r = "asc"] = [e, t]),
                (s = r),
                (i = Pd("orderBy", n)),
                new Gd(i, s))
              )
            );
          } catch (e) {
            throw Rf(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var n, r, s, i;
        }
        limit(e) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (ml("limit", (t = e)), new jd("limit", t, "F"))
              )
            );
          } catch (e) {
            throw Rf(e, "limit()", "Query.limit()");
          }
          var t;
        }
        limitToLast(e) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (ml("limitToLast", (t = e)), new jd("limitToLast", t, "L"))
              )
            );
          } catch (e) {
            throw Rf(e, "limitToLast()", "Query.limitToLast()");
          }
          var t;
        }
        startAt(...e) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (function (...e) {
                  return new $d("startAt", e, !0);
                })(...e)
              )
            );
          } catch (e) {
            throw Rf(e, "startAt()", "Query.startAt()");
          }
        }
        startAfter(...e) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (function (...e) {
                  return new $d("startAfter", e, !1);
                })(...e)
              )
            );
          } catch (e) {
            throw Rf(e, "startAfter()", "Query.startAfter()");
          }
        }
        endBefore(...e) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (function (...e) {
                  return new Qd("endBefore", e, !1);
                })(...e)
              )
            );
          } catch (e) {
            throw Rf(e, "endBefore()", "Query.endBefore()");
          }
        }
        endAt(...e) {
          try {
            return new Ff(
              this.firestore,
              qd(
                this._delegate,
                (function (...e) {
                  return new Qd("endAt", e, !0);
                })(...e)
              )
            );
          } catch (e) {
            throw Rf(e, "endAt()", "Query.endAt()");
          }
        }
        isEqual(e) {
          return xl(this._delegate, e._delegate);
        }
        get(e) {
          let t;
          return (
            (t = (
              "cache" === (null == e ? void 0 : e.source)
                ? uf
                : "server" === (null == e ? void 0 : e.source)
                ? function (t) {
                    t = gl(t, bl);
                    const n = gl(t.firestore, Xl),
                      e = Jl(n),
                      r = new af(n);
                    return Gl(e, t._query, { source: "server" }).then(
                      (e) => new rf(n, r, t, e)
                    );
                  }
                : function (t) {
                    t = gl(t, bl);
                    const n = gl(t.firestore, Xl),
                      e = Jl(n),
                      r = new af(n);
                    return (
                      Bd(t._query),
                      Gl(e, t._query).then((e) => new rf(n, r, t, e))
                    );
                  }
            )(this._delegate)),
            t.then(
              (e) =>
                new Bf(
                  this.firestore,
                  new rf(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            )
          );
        }
        onSnapshot(...e) {
          var t = Lf(e),
            n = Mf(
              e,
              (e) =>
                new Bf(
                  this.firestore,
                  new rf(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            );
          return lf(this._delegate, t, n);
        }
        withConverter(e) {
          return new Ff(
            this.firestore,
            e
              ? this._delegate.withConverter(Nf.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      class Pf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get type() {
          return this._delegate.type;
        }
        get doc() {
          return new Vf(this._firestore, this._delegate.doc);
        }
        get oldIndex() {
          return this._delegate.oldIndex;
        }
        get newIndex() {
          return this._delegate.newIndex;
        }
      }
      class Bf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get query() {
          return new Ff(this._firestore, this._delegate.query);
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get size() {
          return this._delegate.size;
        }
        get empty() {
          return this._delegate.empty;
        }
        get docs() {
          return this._delegate.docs.map((e) => new Vf(this._firestore, e));
        }
        docChanges(e) {
          return this._delegate
            .docChanges(e)
            .map((e) => new Pf(this._firestore, e));
        }
        forEach(t, n) {
          this._delegate.forEach((e) => {
            t.call(n, new Vf(this._firestore, e));
          });
        }
        isEqual(e) {
          return sf(this._delegate, e._delegate);
        }
      }
      class Uf extends Ff {
        constructor(e, t) {
          super(e, t), (this.firestore = e), (this._delegate = t);
        }
        get id() {
          return this._delegate.id;
        }
        get path() {
          return this._delegate.path;
        }
        get parent() {
          var e = this._delegate.parent;
          return e ? new kf(this.firestore, e) : null;
        }
        doc(e) {
          try {
            return void 0 === e
              ? new kf(this.firestore, Sl(this._delegate))
              : new kf(this.firestore, Sl(this._delegate, e));
          } catch (e) {
            throw Rf(e, "doc()", "CollectionReference.doc()");
          }
        }
        add(e) {
          return (function (e, t) {
            const n = gl(e.firestore, Xl),
              r = Sl(e),
              s = Jd(e.converter, t);
            return ff(n, [
              yd(
                pd(e.firestore),
                "addDoc",
                r._key,
                s,
                null !== e.converter,
                {}
              ).toMutation(r._key, Zi.exists(!1)),
            ]).then(() => r);
          })(this._delegate, e).then((e) => new kf(this.firestore, e));
        }
        isEqual(e) {
          return _l(this._delegate, e._delegate);
        }
        withConverter(e) {
          return new Uf(
            this.firestore,
            e
              ? this._delegate.withConverter(Nf.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function qf(e) {
        return gl(e, Il);
      }
      const Kf = {
        Firestore: xf,
        GeoPoint: cd,
        Timestamp: Or,
        Blob: Tf,
        Transaction: Af,
        WriteBatch: Cf,
        DocumentReference: kf,
        DocumentSnapshot: Of,
        Query: Ff,
        QueryDocumentSnapshot: Vf,
        QuerySnapshot: Bf,
        CollectionReference: Uf,
        FieldPath: class Gf {
          constructor(...e) {
            this._delegate = new od(...e);
          }
          static documentId() {
            return new Gf(Ur.keyField().canonicalString());
          }
          isEqual(e) {
            return (
              (e = m(e)) instanceof od &&
              this._delegate._internalPath.isEqual(e._internalPath)
            );
          }
        },
        FieldValue: class jf {
          constructor(e) {
            this._delegate = e;
          }
          static serverTimestamp() {
            const e = new Id("serverTimestamp");
            return (e._methodName = "FieldValue.serverTimestamp"), new jf(e);
          }
          static delete() {
            const e = new vd("deleteField");
            return (e._methodName = "FieldValue.delete"), new jf(e);
          }
          static arrayUnion(...e) {
            const t = (function (...e) {
              return new bd("arrayUnion", e);
            })(...e);
            return (t._methodName = "FieldValue.arrayUnion"), new jf(t);
          }
          static arrayRemove(...e) {
            const t = (function (...e) {
              return new Ed("arrayRemove", e);
            })(...e);
            return (t._methodName = "FieldValue.arrayRemove"), new jf(t);
          }
          static increment(e) {
            const t = new Td("increment", e);
            return (t._methodName = "FieldValue.increment"), new jf(t);
          }
          isEqual(e) {
            return this._delegate.isEqual(e._delegate);
          }
        },
        setLogLevel: function (e) {
          (e = e), dr.setLogLevel(e);
        },
        CACHE_SIZE_UNLIMITED: -1,
      };
      (Wl = t.default),
        (Yl = (e, t) => new xf(e, t, new _f())),
        Wl.INTERNAL.registerComponent(
          new h(
            "firestore-compat",
            (e) => {
              var t = e.getProvider("app-compat").getImmediate(),
                n = e.getProvider("firestore").getImmediate();
              return Yl(t, n);
            },
            "PUBLIC"
          ).setServiceProps(Object.assign({}, Kf))
        ),
        Wl.registerVersion("@firebase/firestore-compat", "0.2.3");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
//# sourceMappingURL=firebase-firestore-compat.js.map
