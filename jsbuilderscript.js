function PointJS(Ta, Ua, xb, Rc) {
    this._logo = "http://pointjs.ru/PjsMin.png";
    var k = window,
        z = this,
        J = !1,
        Ca = "fixed",
        Ub = 0,
        Vb = 0,
        yb = 100,
        Wb = function(a) {
            a = a.getBoundingClientRect();
            return {
                y: a.top + k.pageYOffset,
                x: a.left + k.pageXOffset
            }
        },
        Dc = function(a) {
            for (var b = 1; a;) b += a.style.zIndex, a = a.offsetParent;
            return b
        };
    if (1 === arguments.length) {
        J = arguments[0];
        var Xb = Wb(J);
        Ub = Xb.x;
        Vb = Xb.y;
        Ta = J.offsetWidth;
        Ua = J.offsetHeight;
        Ca = "absolute";
        yb = Dc(J)
    }

    var Da = !0,
        zb = !0,
        Yb = !0,
        ha = !1,
        Ea = !0,
        m = Ta,
        n = Ua,
        ka = Ta,
        la = Ua,
        G = m / 2,
        H = n / 2,
        ma = 1,
        na = 1,
        e = {
            x: 0,
            y: 0
        },
        t = {
            fillStyle: "black",
            strokeStyle: "black",
            globalAlpha: 1,
            font: "serif",
            textBaseline: "top"
        },
        ca = function(a) {
            console.log("[PointJS] : ", a)
        };
    "undefined" !== typeof POINTJS_USER_LOG && (ca = POINTJS_USER_LOG);
    var Va = function(a) {
        var b = decodeURI(a.stack.toString().replace(/(@|[\(\)]|[\w]+:\/\/)/g, ""));
        b = b.split(/\n/);
        b = ("" === b[2] ? b[0] : b[1]).split("/");
        b = b[b.length - 1].split(":");
        ca('ERROR "' + a.toString() + '" \n in      ' + b[0] + " \n line :   " + b[1] + " \n symbol : " + b[2])
    };
    this.game = {};
    this.levels = {};
    this.camera = {};
    this.keyControl = {};
    this.mouseControl = {};
    this.touchControl = {};
    this.system = {};
    this.vector = {};
    this.math = {};
    this.layers = {};
    this.colors = {};
    this.brush = {};
    this.audio = {};
    this.wAudio = {};
    this.resources = {};
    this.tiles = {};
    this.OOP = {};
    this.memory = {};
    this.modules = {};
    this.zList = {};
    this.filters = {};
    this.system.log = ca;
    this.system.consoleLog = function(a) {
        this.log = !0 === a ? console.log : ca
    };
    this.system.setTitle = function(a) {
        k.document.title = a
    };
    this.system.setSettings = function(a) {
        Da = v(a.isShowError) ? a.isShowError : !0;
        zb = v(a.isStopForError) ?
            a.isStopForError : !0;
        Yb = v(a.isAutoClear) ? a.isAutoClear : !1;
        v(a.isZBuffer)
    };
    this.system.setDefaultSettings = function(a) {
        for (var b in a) t[b] = a[b];
        g.save()
    };
    this.system.setSmoothing = function(a) {
        Ea = a;
        g.msImageSmoothingEnabled = Ea;
        g.imageSmoothingEnabled = Ea
    };
    this.system.restart = function(a) {
        k.location.reload(a)
    };
    var Ec = {
        name: "PointJS",
        desc: "HTML5 Game Engine for JavaScript",
        author: "Skaner (skaner0@yandex.ru)",
        version: "0.4.1"
    };
    this.system.getInfo = function() {
        return Ec
    };
    this.modules["import"] = function(a, b) {
        A.add();
        var c = new XMLHttpRequest;
        c.open("GET", a, !0);
        c.onload = function() {
            var a = {
                    constructor: function() {}
                },
                h = c.responseText.toString().replace(/PointJS.Module/i, "Module.constructor");
            (new Function("Module", h))(a);
            a = new a.constructor(z, k);
            A.load();
            b(a)
        };
        c.send()
    };
    this.modules.importSync = function(a) {
        try {
            var b = new XMLHttpRequest;
            b.open("GET", a, !1);
            b.send()
        } catch (c) {
            return
        }
        a = {
            constructor: function() {}
        };
        b = b.responseText.toString().replace(/PointJS.Module/i, "Module.constructor");
        (new Function("Module", b))(a);
        return new a.constructor(z,
            k)
    };
    var da = function(a, b) {
            b.prototype = Object.create(a.prototype);
            b.prototype.constructor = b
        },
        ea = function(a, b, c) {
            this.x = a || 0;
            this.y = b || 0;
            this.z = c || 0
        };
    ea.prototype = {
        abs: function() {
            return new ea(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
        },
        invert: function() {
            return new ea(-this.x, -this.y, -this.z)
        },
        plus: function(a) {
            return new ea(this.x + a.x, this.y + a.y, this.z + a.z)
        },
        minus: function(a) {
            return new ea(this.x - a.x, this.y - a.y, this.z - a.z)
        },
        inc: function(a) {
            return new ea(this.x * a.x, this.y * a.y, this.z * a.z)
        },
        div: function(a) {
            return new ea(this.x /
                a.x, this.y / a.y, this.z / a.z)
        },
        "int": function() {
            return new ea(this.x >> 0, this.y >> 0, this.z >> 0)
        }
    };
    var f = function(a, b, c) {
            return new ea(a, b, c)
        },
        E = function(a, b, c) {
            return {
                w: a,
                h: b,
                d: c
            }
        },
        Wa = function(a, b) {
            return {
                x: a.x + b.x,
                y: a.y + b.y,
                z: a.z + b.z
            }
        },
        I = function(a, b, c) {
            if (c) {
                var d = B(c);
                c = a.x - b.x;
                a = a.y - b.y;
                var h = Math.cos(d);
                d = Math.sin(d);
                return f(c * h - a * d + b.x, c * d + a * h + b.y)
            }
            return f(a.x, a.y)
        },
        Fa = function(a, b) {
            return 180 / Math.PI * Math.atan2(b.y - a.y, b.x - a.x)
        },
        oa = function(a, b) {
            var c, d = 0;
            var h = 0;
            var e = b.length;
            for (c = b.length -
                1; h < e; c = h++) b[h].y > a.y !== b[c].y > a.y && a.x < (b[c].x - b[h].x) * (a.y - b[h].y) / (b[c].y - b[h].y) + b[h].x && (d = !d);
            return d
        },
        Ga = function(a, b, c) {
            return !(a < b || a > c)
        };
    this.vector.isNumInRange = Ga;
    this.vector.point = f;
    this.vector.simplePoint = function(a, b, c) {
        return {
            x: !1 !== a ? a : !1,
            y: !1 !== b ? b : !1,
            z: !1 !== c ? c : !1
        }
    };
    this.vector.v2d = f;
    this.vector.size = E;
    this.vector.getPointAngle = I;
    this.vector.isPointIn = oa;
    this.vector.pointMinus = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        }
    };
    this.vector.pointPlus = Wa;
    this.vector.pointInc = function(a,
        b) {
        return {
            x: a.x * b.x,
            y: a.y * b.y,
            z: a.z * b.z
        }
    };
    this.vector.pointDiv = function(a, b) {
        return {
            x: a.x / (0 !== b.x ? b.x : 1),
            y: a.y / (0 !== b.y ? b.y : 1),
            z: a.z / (0 !== b.z ? b.z : 1)
        }
    };
    this.vector.pointAbs = function(a) {
        return {
            x: Math.abs(a.x),
            y: Math.abs(a.y),
            z: Math.abs(a.z)
        }
    };
    this.vector.getMidPoint = function(a, b) {
        return v(b) ? f((a.x + b.x) / 2, (a.y + b.y) / 2) : 0
    };
    this.vector.getDistance = function(a, b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
    };
    this.vector.isSame = function(a, b) {
        return v(b) ? a.x === b.x && a.y === b.y : !1
    };
    this.vector.getAngle2Points =
        Fa;
    this.vector.newStaticBox = function(a, b, c, d) {
        return {
            x: a,
            y: b,
            w: c,
            h: d
        }
    };
    this.vector.newDynamicBoxRect = function(a, b, c, d) {
        return [f(a, b), f(a + c, b), f(a + c, b + d), f(a, b + d)]
    };
    this.vector.moveCollision = function(a, b, c, d, h, e) {
        var f = !1,
            g = !1,
            w = c.abs(),
            k = a.getStaticBoxPosition(),
            m = b.length - 1,
            n;
        var p = 2 + w.x;
        for (n = 2 + w.y; 0 <= m; m--)
            if (w = b[m], w.visible && a !== w && !(h && !w.isInCameraStatic() || e && a.getDistanceC(w.getPositionC()) > e) && a.isStaticIntersect(w.getStaticBox())) {
                var l = w.getStaticBoxPosition();
                k.h >= l.y + n && k.y <= l.h - n &&
                    (0 <= c.x ? Ga(k.w, l.x, l.w) && (a.x = l.x - (a.w + a.box.w + a.box.x) + 1, c.x = 0, f = !0) : 0 > c.x && Ga(k.x, l.x, l.w) && (a.x = l.w - a.box.x - 1, c.x = 0, f = !0));
                k.w >= l.x + p && k.x <= l.w - p && (0 < c.y ? Ga(k.h, l.y, l.h) && (a.y = l.y - (a.h + a.box.h + a.box.y) + 1, c.y = 0, g = !0) : 0 > c.y && Ga(k.y, l.y, l.h) && (a.y = l.h - a.box.y - 1, c.y = 0, g = !0));
                d && d(a, w, f, g)
            }
        a.move(c)
    };
    this.vector.moveCollisionAngle = function(a, b, c, d, h, e, g) {
        var w = f();
        h = math.a2r(OOP.isDef(h) ? h : a.angle);
        w.x = c * Math.cos(h);
        w.y = c * Math.sin(h);
        c = 0;
        h = b.length;
        for (var k; c < h; c += 1)
            if (k = b[c], !e || k.isInCamera())
                if (!g ||
                    !a.getDistanceC(k.getPositionC())) {
                    var l = k.getStaticBox();
                    if (a.isIntersect(k)) {
                        var m = a.getStaticBox(),
                            Xa = Math.abs(w.x),
                            n = Math.abs(w.y);
                        m.x + m.w > l.x + 10 + Xa && m.x < l.x + l.w - 10 - Xa && (0 < w.y && m.y + m.h < l.y + l.h / 2 + n ? w.y = 0 : 0 > w.y && m.y > l.y + l.h - l.h / 2 - n && (w.y = 0));
                        m.y + m.h > l.y + 10 + n && m.y < l.y + l.h - 10 - n && (0 < w.x && m.x + m.w < l.x + l.w / 2 + Xa ? w.x = 0 : 0 > w.x && m.x > l.x + l.w - l.w / 2 - Xa && (w.x = 0));
                        d && d(a, k)
                    }
                }
        a.move(w);
        return w
    };
    var Zb = {},
        Ab = function() {
            var a = (new Date).getTime();
            Zb[a] && (a = Ab());
            Zb[a] = !0;
            return a
        },
        B = function(a) {
            return Math.PI / 180 *
                a
        },
        R = function(a, b, c) {
            var d = Math.floor(Math.random() * (b - a + 1) + a);
            return c && 0 == d ? R(a, b, c) : d
        },
        Bb = function(a) {
            return 0 > a ? -1 : 1
        };
    this.math.limit = function(a, b) {
        var c = Bb(a);
        a = Math.abs(a);
        b = Math.abs(b);
        return a < b ? a * c : b * c
    };
    this.math.sign = Bb;
    this.math.a2r = B;
    this.math.random = R;
    this.math.toInt = function(a) {
        return a >> 0
    };
    this.math.uid = Ab;
    this.math.toZiro = function(a, b) {
        if (0 == a) return 0;
        var c = Bb(a);
        b = Math.abs(b);
        a = Math.abs(a);
        return 0 < a && (a -= b, a < b) ? 0 : a * c
    };
    var $b = function(a, b) {
            return a ? a : b ? b : !1
        },
        Cb = [],
        Fc = function(a,
            b) {
            var c;
            this.canvas = c = k.document.createElement("canvas");
            var d = c.style,
                h = q.style;
            d.position = Ca;
            d.top = h.top;
            d.left = h.left;
            c.width = q.width;
            c.height = q.height;
            d.width = h.width;
            d.height = h.height;
            d.zIndex = h.zIndex + a;
            b && (d.opacity = $b(b.alpha, 1), d.backgroundColor = $b(b.backgroundColor, "transparent"));
            p.attach(c);
            (this.context = c.getContext("2d")).textBaseline = t.textBaseline;
            this.isAutoClear = !0;
            this.clear = function() {
                this.context.clearRect(0, 0, m, n)
            };
            this.on = function(a) {
                g = this.context;
                this.isAutoClear && this.clear();
                a(this);
                g = ac
            };
            this.setVisible = function(a) {
                this.canvas.style = a ? "block" : "none"
            };
            Cb.push(this)
        },
        pa = function() {
            u(Cb, function(a) {
                a.canvas.width = m;
                a.canvas.height = n;
                a.canvas.style.width = q.style.width;
                a.canvas.style.height = q.style.height;
                a.context.textBaseline = t.textBaseline
            })
        },
        Gc = function() {
            u(Cb, function(a) {
                a.canvas.style.left = q.style.left;
                a.canvas.style.top = q.style.top
            })
        };
    this.layers.newLayer = function(a, b) {
        return new Fc(a, b)
    };
    var bc = 0,
        p = {
            loaded: !1,
            events: {
                onload: [],
                preLoop: [],
                postLoop: [],
                entryLoop: [],
                exitLoop: [],
                gameBlur: [],
                gameFocus: [],
                gameResize: [],
                gameStop: [],
                gameStart: []
            },
            addEvent: function(a, b, c) {
                "onload" === a && p.loaded ? c() : p.events[a].push({
                    id: b,
                    func: c
                })
            },
            delEvent: function(a, b) {
                u(p.events[a], function(a, d, h) {
                    a.id === b && h.splice(d, 1)
                })
            },
            runEvent: function(a) {
                u(p.events[a], function(a) {
                    "function" === typeof a.func && a.func()
                })
            },
            attach: function(a) {
                var b = function() {
                    k.document.body.appendChild(a)
                };
                p.loaded ? b() : p.addEvent("onload", "attachElement_PointJS" + (bc += 1), b)
            },
            remove: function(a) {
                var b = function() {
                    k.document.body.removeChild(a)
                };
                p.loaded ? b() : p.addEvent("onload", "attachElement_PointJS" + (bc += 1), b)
            },
            getWH: function() {
                return {
                    w: parseInt(k.innerWidth || k.document.body.clientWidth),
                    h: parseInt(k.innerHeight || k.document.body.clientHeight)
                }
            }
        };
    this.system.delEvent = function(a, b) {
        p.delEvent(a, b)
    };
    this.system.addEvent = function(a, b, c) {
        p.addEvent(a, b, c)
    };
    this.system.removeDOM = function(a) {
        p.remove(a)
    };
    this.system.attachDOM = function(a) {
        p.attach(a)
    };
    this.system.newDOM = function(a, b) {
        var c = k.document.createElement(a);
        c.style.position = Ca;
        c.style.left =
            0;
        c.style.top = 0;
        c.style.zIndex = r.style.zIndex + 1;
        if (b) {
            var d = function(a) {
                a.stopPropagation()
            };
            c.addEventListener("touchstart", d, !1);
            c.addEventListener("touchend", d, !1);
            c.addEventListener("touchmove", d, !1);
            c.addEventListener("mousedown", d, !1);
            c.addEventListener("mousepress", d, !1);
            c.addEventListener("mouseup", d, !1);
            c.addEventListener("mousemove", d, !1);
            c.addEventListener("keypress", d, !1);
            c.addEventListener("keydown", d, !1);
            c.addEventListener("keyup", d, !1);
            c.addEventListener("click", d, !1);
            c.addEventListener("wheel",
                d, !1);
            c.addEventListener("mousewheel", d, !1);
            c.addEventListener("contextmenu", d, !1);
            c.addEventListener("selectstart", d, !1);
            c.addEventListener("dragstart", d, !1);
            c.addEventListener("DOMMouseScroll", d, !1)
        }
        p.attach(c);
        return c
    };
    var g = null,
        ac = null,
        Ha = f(Ub, Vb);
    var q = k.document.createElement("canvas");
    ac = g = q.getContext("2d");
    g.textBaseline = t.textBaseline;
    q.crossOrigin = "anonymous";
    q.width = parseInt(Ta);
    q.height = parseInt(Ua);
    q.style.position = Ca;
    J ? (q.style.left = Ha.x + "px", q.style.top = Ha.y + "px", p.addEvent("gameResize",
        "initedCanvasResize",
        function() {
            var a = Wb(J);
            z.system.setOffset(a.x, a.y);
            z.system.resize(J.offsetWidth, J.offsetHeight)
        })) : (q.style.left = 0, q.style.top = 0);
    q.style.zIndex = yb;
    q.id = "PointJS-canvas_0";
    if ("object" === typeof xb)
        for (var Db in xb) Db.match(/margin|padding|position/) || (q.style[Db] = xb[Db]);
    this.system.setOffset = function(a, b) {
        r.style.left = q.style.left = a + "px";
        r.style.top = q.style.top = b + "px";
        Ha = {
            x: a,
            y: b
        };
        Gc()
    };
    var r = k.document.createElement("div");
    (function() {
        var a = r.style;
        a.position = Ca;
        a.left = q.style.left;
        a.top = q.style.top;
        a.width = q.width + "px";
        a.height = q.height + "px";
        a.zIndex = yb + 100
    })();
    p.attach(r);
    p.attach(q);
    this.system.setStyle = function(a) {
        if ("object" === typeof a)
            for (var b in a) q.style[b] = a[b]
    };
    this.system.getCanvas = function() {
        return q
    };
    this.system.getContext = function() {
        return g
    };
    this.system.setContext = function(a) {
        a && (g = a)
    };
    this.system.resize = function(a, b) {
        m = a || ka;
        n = b || la;
        G = m / 2;
        H = n / 2;
        q.width = m;
        q.height = n;
        r.style.width = m + "px";
        r.style.height = n + "px";
        pa()
    };
    this.system.initFullPage = function() {
        J || (p.addEvent("gameResize",
            "PointJS_resizeGame",
            function() {
                m = p.getWH().w;
                n = p.getWH().h;
                G = m / 2;
                H = n / 2;
                q.width = m;
                q.height = n;
                g.textBaseline = t.textBaseline;
                r.style.width = m + "px";
                r.style.height = n + "px";
                pa()
            }), p.runEvent("gameResize", "PointJS_resizeGame"))
    };
    var X = !1,
        Hc = function() {
            X || (this.requestFullscreen ? (this.requestFullscreen(), X = !0) : this.mozRequestFullScreen ? (this.mozRequestFullScreen(), X = !0) : this.webkitRequestFullscreen && (this.webkitRequestFullscreen(), X = !0), m = p.getWH().w, n = p.getWH().h, G = m / 2, H = n / 2, q.width = m, q.height = n, r.style.width =
                m + "px", r.style.height = n + "px", pa())
        },
        Eb = function(a) {
            X = cc(k.document.fullscreenElement || k.document.mozFullScreenElement || k.document.webkitFullscreenElement)
        };
    k.document.addEventListener("webkitfullscreenchange", Eb);
    k.document.addEventListener("mozfullscreenchange", Eb);
    k.document.addEventListener("fullscreenchange", Eb);
    this.system.initFullScreen = function() {
        J || X || (k.document.documentElement.onclick = Hc, Ia || (p.addEvent("gameResize", "PointJS_initFullScreen", function() {
            m = p.getWH().w;
            n = p.getWH().h;
            G = m / 2;
            H =
                n / 2;
            q.width = m;
            q.height = n;
            g.textBaseline = t.textBaseline;
            r.style.width = m + "px";
            r.style.height = n + "px";
            pa()
        }), p.runEvent("gameResize", "PointJS_initFullScreen")))
    };
    this.system.exitFullScreen = function() {
        X && (p.delEvent("gameResize", "PointJS_initFullScreen"), k.document.exitFullscreen ? (k.document.exitFullscreen(), X = !1) : k.document.mozCancelFullScreen ? (k.document.mozCancelFullScreen(), X = !1) : k.document.webkitExitFullscreen && (k.document.webkitExitFullscreen(), X = !1), m = ka, n = la, G = m / 2, H = n / 2, q.width = m, q.height = n, r.style.width =
            m + "px", r.style.height = n + "px", pa(), k.document.documentElement.onclick = function() {})
    };
    this.system.isFullScreen = function() {
        return X
    };
    this.system.exitFullPage = function() {
        p.delEvent("gameResize", "PointJS_resizeGame");
        m = ka;
        n = la;
        G = m / 2;
        H = n / 2;
        q.width = m;
        q.height = n;
        r.style.width = m + "px";
        r.style.height = n + "px";
        pa()
    };
    var Y = !1,
        Ia = !1,
        dc = ka,
        ec = la,
        fc = !1;
    this.system.initFullScale = function(a) {
        J || Ia || (a && (fc = !0), p.addEvent("gameResize", "PointJS_initFullScale", function() {
            var a = dc,
                c = ec,
                d = p.getWH();
            fc ? (a = d.w, c = d.h) : d.w < d.h ?
                (c = d.w / m, a = d.w, c *= n) : d.h < d.w && (a = d.h / n, c = d.h, a *= m);
            dc = a;
            ec = c;
            Y = {
                w: a / m,
                h: c / n
            };
            q.style.width = a + "px";
            q.style.height = c + "px";
            r.style.width = a + "px";
            r.style.height = c + "px";
            pa()
        }), p.runEvent("gameResize", "PointJS_initFullScale"), Ia = !0)
    };
    this.system.exitFullScale = function() {
        Ia && (Ia = !1, p.delEvent("gameResize", "PointJS_initFullScale"), q.style.width = ka + "px", q.style.height = la + "px", r.style.width = ka + "px", r.style.height = la + "px")
    };
    this.system.getWH = function() {
        return p.getWH()
    };
    var Fb = !1,
        Ya = {
            LEFT: 37,
            RIGHT: 39,
            UP: 38,
            DOWN: 40,
            SPACE: 32,
            CTRL: 17,
            SHIFT: 16,
            ALT: 18,
            ESC: 27,
            ENTER: 13,
            MINUS: 189,
            PLUS: 187,
            CAPS_LOCK: 20,
            BACKSPACE: 8,
            TAB: 9,
            DELETE: 46,
            Q: 81,
            W: 87,
            E: 69,
            R: 82,
            T: 84,
            Y: 89,
            U: 85,
            I: 73,
            O: 79,
            P: 80,
            A: 65,
            S: 83,
            D: 68,
            F: 70,
            G: 71,
            H: 72,
            J: 74,
            K: 75,
            L: 76,
            Z: 90,
            X: 88,
            V: 86,
            B: 66,
            N: 78,
            M: 77,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            C: 67,
            9: 57,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123
        },
        xa = {
            37: "LEFT",
            39: "RIGHT",
            38: "UP",
            40: "DOWN",
            32: "SPACE",
            17: "CTRL",
            16: "SHIFT",
            18: "ALT",
            27: "ESC",
            13: "ENTER",
            189: "MINUS",
            187: "PLUS",
            20: "CAPS_LOCK",
            8: "BACKSPACE",
            9: "TAB",
            46: "DELETE",
            81: "Q",
            87: "W",
            69: "E",
            82: "R",
            84: "T",
            89: "Y",
            85: "U",
            73: "I",
            79: "O",
            80: "P",
            65: "A",
            83: "S",
            68: "D",
            70: "F",
            71: "G",
            72: "H",
            74: "J",
            75: "K",
            76: "L",
            90: "Z",
            88: "X",
            86: "V",
            66: "B",
            78: "N",
            77: "M",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            67: "C",
            57: "9",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12"
        },
        Ic = {
            8: !0,
            9: !0,
            13: !0,
            18: !0,
            16: !0,
            17: !0,
            27: !0,
            112: !0,
            113: !0,
            114: !0,
            115: !0,
            116: !0,
            117: !0,
            118: !0,
            119: !0,
            120: !0,
            121: !0,
            122: !0,
            123: !0
        };
    this.keyControl.getKeyList = function() {
        var a, b = [];
        for (a in Ya) b.push(a);
        return b
    };
    var Z = {},
        Ja = {},
        qa = {},
        Ka = !1,
        La = !1,
        Za = !1,
        $a = !1,
        Jc = function(a) {
            F(qa, function(a, c, d) {
                1 == a && (d[c] = 2)
            })
        };
    this.keyControl.getCountKeysDown = function() {
        var a = 0;
        F(Z, function(b, c) {
            b && a++
        });
        return a
    };
    this.keyControl.getAllKeysDown = function() {
        var a = [];
        F(Z, function(b, c) {
            b && a.push(xa[c])
        });
        return a
    };
    this.keyControl.getLastKeyPress = function() {
        return $a ? xa[$a] : !1
    };
    this.keyControl.isDown = function(a) {
        return 1 ==
            Z[Ya[a]]
    };
    this.keyControl.isUp = function(a) {
        return 1 == Ja[Ya[a]]
    };
    this.keyControl.isPress = function(a) {
        return 1 == qa[Ya[a]]
    };
    this.keyControl.getInputChar = function() {
        return Ka
    };
    this.keyControl.getInputKey = function() {
        return xa[La]
    };
    this.keyControl.setInputMode = function(a) {
        Za = a
    };
    this.keyControl.isInputMode = function() {
        return Za
    };
    this.keyControl.exitKeyControl = function() {
        k.onkeydown = function() {};
        k.onkeypress = function() {};
        k.onkeyup = function() {};
        C.clear("key:down");
        C.clear("key:press");
        C.clear("key:up");
        p.delEvent("postLoop",
            "PointJS_clearAllKeyUp");
        p.delEvent("preLoop", "PointJS_KeyDownEvent");
        Z = {};
        Ja = {};
        qa = {};
        Fb = Za = La = Ka = !1
    };
    this.keyControl.initControl = this.keyControl.initKeyControl = function() {
        if (Fb) return this;
        Fb = !0;
        k.onkeydown = function(a) {
            if (Za) return La = a.keyCode, Ic[a.keyCode] ? (a.preventDefault(), !1) : !0;
            a.preventDefault();
            2 != qa[a.keyCode] && (qa[a.keyCode] = 1, $a = a.keyCode, C.run("key:press", xa[a.keyCode]));
            Z[a.keyCode] = !0;
            return !1
        };
        k.onkeypress = function(a) {
            var b = !1;
            0 != a.which && 0 != a.charCode && 32 <= a.which && (b = String.fromCharCode(a.which));
            Ka = b
        };
        k.onkeyup = function(a) {
            a.preventDefault();
            1 == Z[a.keyCode] && (Ja[a.keyCode] = !0);
            Z[a.keyCode] = !1;
            C.run("key:up", xa[a.keyCode]);
            delete qa[a.keyCode];
            delete Z[a.keyCode];
            return !1
        };
        p.addEvent("postLoop", "PointJS_clearAllKeyUp", function() {
            Ja = {};
            Jc();
            $a = La = Ka = !1
        });
        p.addEvent("preLoop", "PointJS_KeyDownEvent", function() {
            C.isEvent("key:down") && F(Z, function(a, b) {
                a && C.run("key:down", xa[b])
            })
        });
        return this
    };
    var Ma = !1,
        x = f(0, 0),
        ab = f(0, 0);
    f(0, 0);
    var Na = !0,
        bb = "",
        cb = !1,
        ra = f(0, 0),
        db = !1,
        Gb = {
            LEFT: 1,
            RIGHT: 3,
            MIDDLE: 2
        },
        Hb = {
            1: "LEFT",
            3: "RIGHT",
            2: "MIDDLE"
        },
        eb = !1,
        fb = {},
        gb = {},
        Oa = {},
        ya = 0,
        gc = function() {
            fb = {};
            gb = {};
            Oa = {};
            ya = 0;
            db = !1
        },
        Kc = function() {
            F(Oa, function(a, b, c) {
                1 == a && (c[b] = 2)
            })
        },
        hb = function(a) {
            var b = 0,
                c = 0;
            a && (b = e.x, c = e.y);
            return f(b + x.x, c + x.y)
        };
    this.mouseControl.getPosition = function() {
        return hb(1)
    };
    this.mouseControl.getPositionS = function() {
        return hb()
    };
    this.mouseControl.setCursorImage = function(a) {
        a = "url('" + a + "'), auto";
        if (bb !== a) return bb = a, k.document.body.style.cursor = bb
    };
    this.mouseControl.setVisible = function(a) {
        !Na &&
            !a || Na && a || (Na = 1 == a, k.document.body.style.cursor = Na ? bb : "none")
    };
    this.mouseControl.isVisible = function() {
        return Na
    };
    this.mouseControl.isDown = function(a) {
        return fb[Gb[a]]
    };
    this.mouseControl.isUp = function(a) {
        return gb[Gb[a]]
    };
    this.mouseControl.isPress = function(a) {
        return 1 == Oa[Gb[a]]
    };
    this.mouseControl.isMove = function() {
        return db
    };
    this.mouseControl.isInStatic = function(a) {
        var b = hb(1);
        return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h
    };
    this.mouseControl.isInDynamic = function(a) {
        return oa(hb(1), a)
    };
    this.mouseControl.isInObject =
        function(a) {
            return a.visible ? a.angle ? this.isInDynamic(a.getDynamicBox()) : this.isInStatic(a.getStaticBox()) : !1
        };
    this.mouseControl.isWheel = function(a) {
        return "UP" === a && 0 < ya || "DOWN" === a && 0 > ya
    };
    var hc = function(a) {
            a.preventDefault();
            ya = a.wheelDelta ? a.wheelDelta : -a.detail;
            C.run("mouse:wheel", 0 > ya ? "DOWN" : "UP");
            return !1
        },
        ib = !1,
        ic = function() {
            ib && (cb = v(k.document.pointerLockElement) || v(k.document.mozPointerLockElement) ? !0 : !1)
        };
    this.mouseControl.initMouseLock = function() {
        p.addEvent("onload", "initPointerLock",
            function() {
                ib = r.requestPointerLock || r.mozRequestPointerLock || !1;
                k.document.exitPointerLock = k.document.exitPointerLock || k.document.mozExitPointerLock || !1;
                "onpointerlockchange" in k.document ? k.document.addEventListener("pointerlockchange", ic, !1) : "onmozpointerlockchange" in k.document && k.document.addEventListener("mozpointerlockchange", ic, !1);
                if (!ib) return ca("error in initMouseLock : not supported");
                cb || (r.onclick = ib)
            })
    };
    this.mouseControl.exitMouseLock = function() {
        k.document.exitPointerLock();
        r.onclick =
            function() {};
        ra = f(0, 0)
    };
    this.mouseControl.unlockMouse = function() {
        ra = f(0, 0);
        k.document.exitPointerLock()
    };
    this.mouseControl.isMouseLock = function() {
        return cb
    };
    this.mouseControl.getSpeed = function() {
        return f(ra.x, ra.y)
    };
    this.mouseControl.isPeekStatic = function(a, b) {
        return this.isPress(a) ? this.isInStatic(b) : !1
    };
    this.mouseControl.isPeekDynamic = function(a, b) {
        return this.isPress(a) ? this.isInDynamic(b) : !1
    };
    this.mouseControl.isPeekObject = function(a, b) {
        return this.isPress(a) && b.visible ? this.isInDynamic(b.getDynamicBox()) :
            !1
    };
    this.mouseControl.initControl = this.mouseControl.initMouseControl = function() {
        if (Ma) return this;
        Ma = !0;
        r.onmousemove = function(a) {
            a.preventDefault();
            a.stopPropagation();
            if (cb) {
                var b = a.movementY || a.mozMovementY || 0;
                x.x += a.movementX || a.mozMovementX || 0;
                x.y += b
            } else x.x = a.pageX - Ha.x, x.y = a.pageY - Ha.y, Y && (x.x /= Y.w, x.y /= Y.h);
            x.x /= ma;
            x.y /= na;
            ra.x = x.x - ab.x;
            ra.y = x.y - ab.y;
            ab.x = x.x;
            ab.y = x.y;
            C.run("mouse:move");
            db = !0;
            return !1
        };
        r.onmousedown = function(a) {
            a.preventDefault();
            a.stopPropagation();
            !a.which && a.button &&
                (a.button & 1 ? a.which = 1 : a.button & 4 ? a.which = 2 : a.button & 2 && (a.which = 3));
            C.run("mouse:press", Hb[a.which]);
            eb = Hb[a.which];
            fb[a.which] = !0;
            Oa[a.which] = 1
        };
        r.onmouseup = function(a) {
            a.preventDefault();
            a.stopPropagation();
            !a.which && a.button && (a.button & 1 ? a.which = 1 : a.button & 4 ? a.which = 2 : a.button & 2 && (a.which = 3));
            C.run("mouse:up", Hb[a.which]);
            eb = !1;
            fb[a.which] = !1;
            gb[a.which] = !0;
            delete Oa[a.which]
        };
        r.oncontextmenu = r.onselectstart = r.ondragstart = function() {
            return !1
        };
        r.onmousewheel = hc;
        r.addEventListener("DOMMouseScroll",
            hc, !1);
        p.addEvent("preLoop", "PointJS_MouseEventDown", function() {
            eb && C.run("mouse:down", eb)
        });
        p.addEvent("postLoop", "PointJS_clearAllMouseUp", function() {
            gb = {};
            Kc();
            ya = 0;
            db = !1;
            ra = f(0, 0)
        });
        return this
    };
    this.mouseControl.exitMouseControl = function() {
        C.clear("mouse:press");
        C.clear("mouse:down");
        C.clear("mouse:up");
        C.clear("mouse:move");
        C.clear("mouse:wheel");
        r.onmousemove = r.onmousedown = r.onmouseup = r.oncontextmenu = r.onselectstart = r.ondragstart = r.onmousewheel = function() {};
        p.delEvent("postLoop", "PointJS_clearAllMouseUp");
        p.delEvent("preLoop", "PointJS_MouseEventDown");
        gc();
        Ma = !1
    };
    var Ib = !1,
        Pa = !1,
        jb = 0,
        kb = 0,
        K = 0,
        L = 0,
        y = f(0, 0),
        lb = [],
        Qa = f(0, 0),
        mb = f(0, 0);
    this.touchControl.isTouchSupported = function() {
        return !!("ontouchstart" in window)
    };
    this.touchControl.isMobileDevice = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(k.navigator.userAgent)
    };
    var jc = function() {
        Pa = !1;
        kb = jb = 0;
        y = f(0, 0);
        lb = [];
        L = K = 0
    };
    this.touchControl.getFixPositionS = function() {
        return y.x || y.y ? f(y.x, y.y) : !1
    };
    this.touchControl.getFixPosition =
        function() {
            return y.x || y.y ? f(y.x + e.x, y.y + e.y) : !1
        };
    this.touchControl.getRun = function() {
        var a = 0,
            b = 0;
        y.x && y.x != K && (a = K - y.x);
        y.y && y.y != L && (b = L - y.y);
        return f(a, b)
    };
    this.touchControl.getVector = function() {
        var a = 0,
            b = 0;
        y.x && y.x != K && (a = K > y.x ? 1 : -1);
        y.y && y.y != L && (b = L > y.y ? 1 : -1);
        return f(a, b)
    };
    this.touchControl.getSpeed = function() {
        return f(Qa.x, Qa.y)
    };
    this.touchControl.isDown = function() {
        return Pa
    };
    this.touchControl.isPress = function() {
        return 1 == jb
    };
    this.touchControl.isUp = function() {
        return 1 == kb
    };
    this.touchControl.getPosition =
        function() {
            return f(K + e.x, L + e.y)
        };
    this.touchControl.getPositionS = function() {
        return f(K, L)
    };
    this.touchControl.isPeekStatic = function(a) {
        return this.isPress() ? this.isInStatic(a) : !1
    };
    this.touchControl.isPeekDynamic = function(a) {
        return this.isPress() ? this.isInDynamic(a) : !1
    };
    this.touchControl.isPeekObject = function(a) {
        return this.isPress() && a.visible ? this.isInDynamic(a.getDynamicBox()) : !1
    };
    this.touchControl.isInStatic = function(a) {
        var b = this.getPosition();
        return b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y +
            a.h
    };
    this.touchControl.isInDynamic = function(a) {
        return oa(this.getPosition(), a)
    };
    this.touchControl.isInObject = function(a) {
        return a.visible ? a.angle ? this.isInDynamic(a.getDynamicBox()) : this.isInStatic(a.getStaticBox()) : !1
    };
    this.touchControl.getTouches = function() {
        return lb
    };
    this.touchControl.initControl = this.touchControl.initTouchControl = function() {
        if (Ib) return this;
        Ib = !0;
        k.addEventListener("touchstart", function(a) {
            a.preventDefault();
            K = a.targetTouches[0].pageX;
            L = a.targetTouches[0].pageY;
            lb = a.targetTouches;
            Y && (K /= Y.w, L /= Y.h);
            C.run("touch:press");
            y.x = K;
            y.y = L;
            Pa = !0;
            jb = 1;
            return !1
        }, {
            passive: !1
        });
        k.addEventListener("touchmove", function(a) {
            K = a.targetTouches[0].pageX;
            L = a.targetTouches[0].pageY;
            lb = a.targetTouches;
            Y && (K /= Y.w, L /= Y.h);
            Qa.x = K - mb.x;
            Qa.y = L - mb.y;
            C.run("touch:move");
            return !1
        }, !1);
        k.addEventListener("touchend", function(a) {
            y.x = 0;
            y.y = 0;
            Pa = !1;
            kb = 1;
            C.run("touch:up");
            return !1
        }, !1);
        z.touchControl.vibrate = function(a) {
            if (k.navigator.vibrate) return k.navigator.vibrate(a);
            if (k.navigator.oVibrate) return k.navigator.oVibrate(a);
            if (k.navigator.mozVibrate) return k.navigator.mozVibrate(a);
            if (k.navigator.webkitVibrate) return k.navigator.webkitVibrate(a)
        };
        p.addEvent("preLoop", "PointJS_TouchDownEvent", function() {
            Pa && C.run("touch:down")
        });
        p.addEvent("postLoop", "PointJS_touchStopPress", function() {
            kb = jb = 0;
            mb.x = K;
            mb.y = L;
            Qa = f(0, 0)
        });
        return this
    };
    this.touchControl.exitTouchControl = function() {
        k.ontouchstart = k.ontouchmove = k.ontouchend = function(a) {};
        p.delEvent("postLoop", "PointJS_touchStopPress");
        p.delEvent("preLoop", "PointJS_TouchDownEvent");
        jc();
        Ib = !1
    };
    var nb = function(a, b, c, d) {
            return d ? "rgba(" + a + ", " + b + ", " + c + ", " + d + ")" : "rgb(" + a + ", " + b + ", " + c + ")"
        },
        kc = function(a, b) {
            a = "#" === a[0] ? a.substr(1, 6) : a;
            var c = parseInt(a.substr(0, 2), 16),
                d = parseInt(a.substr(2, 2), 16),
                h = parseInt(a.substr(4, 2), 16);
            return nb(c, d, h, b)
        };
    this.colors.rgb = function(a, b, c) {
        return nb(a, b, c)
    };
    this.colors.rgba = function(a, b, c, d) {
        return nb(a, b, c, d)
    };
    this.colors.hex2rgb = function(a) {
        return kc(a)
    };
    this.colors.hex2rgba = function(a, b) {
        return kc(a, b)
    };
    this.colors.randomColor = function(a,
        b, c) {
        return nb(R(a, b), R(a, b), R(a, b), c || 1)
    };
    this.colors.fromImage = function(a, b, c, d, h) {
        var e = {
            img: k.document.createElement("img"),
            color: null
        };
        e.img.onload = function() {
            var a = k.document.createElement("canvas");
            a.width = d ? d : this.width;
            a.height = h ? h : this.height;
            a.getContext("2d").drawImage(this, 0, 0, a.width, a.height);
            e.color = g.createPattern(a, b);
            "function" === typeof c && (e.onload = c, e.onload(), delete e.onload)
        };
        e.img.src = a;
        return e
    };
    var v = function(a) {
            return "undefined" == typeof a || null == a ? !1 : !0
        },
        cc = function(a) {
            return v(a) &&
                "" !== a && 0 !== a ? !0 : !1
        },
        F = function(a, b, c) {
            var d, h;
            for (d in a)
                if ((!c || a.hasOwnProperty(d)) && "undefined" !== typeof a[d] && (h = b(a[d], d, a)) && "break" === h) break
        },
        u = function(a, b) {
            if (a.length)
                for (var c = a.length - 1, d; 0 <= c && ("undefined" === typeof a[c] || !(d = b(a[c], c, a) || !1) || "break" !== d); c--);
        };
    this.OOP.extractArrElement = function(a, b) {
        var c = a[b];
        a.splice(b, 1);
        return c
    };
    this.OOP.extractRandArrElement = function(a) {
        var b = R(0, a.length - 1),
            c = a[b];
        a.splice(b, 1);
        return c
    };
    this.OOP.drawEach = function(a, b) {
        F(a, function(a) {
            a &&
                a.draw && a.isInCamera() && (a.draw(), b && b(a))
        })
    };
    this.OOP.drawArr = function(a, b) {
        var c;
        var d = 0;
        for (c = a.length; d < c; d += 1) a[d] && a[d].draw && a[d].isInCamera() && (a[d].draw(), b && b(a[d], d))
    };
    this.OOP.getArrInCamera = function(a) {
        var b = [];
        u(a, function(a) {
            a.isInCamera() && b.push(a)
        });
        return b
    };
    this.OOP.getArrOutCamera = function(a) {
        var b = [];
        u(a, function(a) {
            a.isInCamera() || b.push(a)
        });
        return b
    };
    var lc = function(a) {
            a.length = 0
        },
        Lc = function(a, b) {
            var c = !1,
                d = Ab(),
                h = !1,
                e = new XMLHttpRequest,
                f = function() {
                    e.open("GET", a, !0);
                    e.send()
                };
            e.onreadystatechange = function() {
                4 == e.readyState && (b(e.responseText), c && (h ? setTimeout(f, h) : f()))
            };
            this.start = function() {
                a = a.match(/\?/) ? a + ("&session_id=" + d) : a + ("?session_id=" + d);
                f();
                c = !0
            };
            this.setSID = function(a) {
                d = a
            };
            this.setTime = function(a) {
                h = a
            };
            this.stop = function() {
                c = !1
            };
            this.isActive = function() {
                return c
            }
        };
    this.OOP.readJSON = function(a, b, c) {
        var d = {},
            h = new XMLHttpRequest;
        h.open("GET", a, !0);
        A.add();
        h.onreadystatechange = function() {
            4 == h.readyState && (d = h.responseText, c || (d = JSON.parse(d)), A.load(), b(d))
        };
        h.send()
    };
    this.OOP.toString = function(a, b) {
        var c, d = 0,
            h = "[";
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var e = a[c];
                "number" == typeof e && b && (e = parseInt(e));
                h += (0 < d ? ", " : "") + c + " : " + e;
                d += 1
            }
        return h + "]"
    };
    this.OOP.sendGET = function(a, b, c) {
        var d = new XMLHttpRequest,
            h = "?";
        F(b, function(a, b) {
            h += b + "=" + encodeURIComponent(a) + "&"
        });
        d.open("GET", a + h, !0);
        d.onreadystatechange = function() {
            4 == d.readyState && c(d.responseText)
        };
        d.send()
    };
    this.OOP.sendPOST = function(a, b, c) {
        var d = new XMLHttpRequest,
            h = "";
        F(b, function(a, b) {
            h += b + "=" + encodeURIComponent(a) +
                "&"
        });
        d.open("POST", a, !0);
        d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        d.onreadystatechange = function() {
            4 == d.readyState && c(d.responseText)
        };
        d.send(h)
    };
    this.OOP.sendPOSTScreen = function(a, b, c) {
        var d = new XMLHttpRequest;
        b = b + "=" + q.toDataURL("image/png");
        d.open("POST", a, !0);
        d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        d.onreadystatechange = function() {
            4 == d.readyState && c(d.responseText)
        };
        d.send(b)
    };
    this.OOP.isDef = v;
    this.OOP.isSet = cc;
    this.OOP.forEach = F;
    this.OOP.forInt =
        function(a, b) {
            var c, d;
            for (c = 0; c < a && (!(d = b(c)) || "break" != d); c += 1);
        };
    this.OOP.forXY = function(a, b, c) {
        var d, h, e;
        for (h = 0; h < b; h += 1)
            for (d = 0; d < a && (!(e = c(d, h)) || "break" != e); d += 1);
    };
    this.OOP.forArr = u;
    this.OOP.clearArr = lc;
    this.OOP.fillArr = function(a, b, c) {
        a.length = 0;
        var d;
        for (d = 0; d < b; d += 1) a.push(c(d, 0 < d ? a[d - 1] : !1));
        return a
    };
    this.OOP.delObject = function(a, b) {
        var c;
        var d = 0;
        for (c = a.length; d < c; d += 1)
            if (a[d] == b) return a.splice(d, 1), !0
    };
    this.OOP.randArrElement = function(a) {
        return a[R(0, a.length - 1)]
    };
    this.OOP.readJSONSync =
        function(a) {
            var b = new XMLHttpRequest;
            b.open("GET", a, !1);
            b.send();
            a = b.responseText;
            return a = JSON.parse(a)
        };
    this.OOP.sendGETSync = function(a, b) {
        var c = new XMLHttpRequest,
            d = "?";
        F(b, function(a, b) {
            d += b + "=" + encodeURIComponent(a) + "&"
        });
        c.open("GET", a + d, !1);
        c.send();
        return c.responseText
    };
    this.OOP.sendPOSTSync = function(a, b) {
        var c = new XMLHttpRequest,
            d = "";
        F(b, function(a, b) {
            d += b + "=" + encodeURIComponent(a) + "&"
        });
        c.open("POST", a, !1);
        c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        c.send(d);
        return c.responseText
    };
    this.OOP.newAJAXListener = function(a, b) {
        return new Lc(a, b)
    };
    this.OOP.runCode = function(a) {
        (new Function("", a))()
    };
    var M = {};
    this.OOP.includeSync = function(a, b) {
        if (M[a]) M[a].loaded && !b && M[a].code();
        else {
            M[a] = {
                loaded: !1,
                code: function() {
                    console.log(a + " is loading")
                }
            };
            var c = new XMLHttpRequest;
            c.open("GET", a, !1);
            c.send();
            M[a].code = new Function("", c.responseText);
            M[a].loaded = !0;
            M[a].code()
        }
    };
    this.OOP.include = function(a, b, c) {
        if (M[a]) M[a].loaded && !c && M[a].code(), b && b();
        else {
            M[a] = {
                loaded: !1,
                code: function() {
                    console.log(a + " is loading")
                }
            };
            var d = new XMLHttpRequest;
            d.open("GET", a, !0);
            d.onreadystatechange = function() {
                4 === d.readyState && (M[a].code = new Function("", d.responseText), M[a].loaded = !0, M[a].code(), b && b())
            };
            d.send()
        }
    };
    this.OOP.clone = function(a, b) {
        var c = mc(a);
        F(a, function(a, b) {
            -1 === ["id", "type", "anim"].indexOf(b) && (c[b] = a)
        });
        b && (c.onClone = b, c.onClone(c), delete c.onClone);
        return c
    };
    var Mc = function() {
        var a = [];
        this.fillFromArr = function(b) {
            a.length = 0;
            u(b, function(b) {
                a.push(b)
            })
        };
        this.fill =
            function(b, c) {
                a.length = 0;
                z.OOP.fillArr(a, b, c)
            };
        this.draw = function(b) {
            for (var c = a.length - 1; 0 <= c; c--) a[c].isInCamera() && (a[c].draw(), b && b(a[c], c))
        };
        this.update = function(b, c) {
            for (var d = a.length - 1; 0 <= d; d--) c && !a[d].isInCamera() || b(a[d], d)
        };
        this.add = function(b) {
            a.push(b)
        };
        this.del = function(b) {
            z.OOP.delObject(a, b)
        }
    };
    this.OOP.newGroup = function() {
        return new Mc
    };
    var Ra = 20,
        N = Date.now(),
        ob = 0,
        pb = -1,
        nc = N,
        ia = {},
        qb = 0;
    this.game.setFPS = function(a) {
        Ra = 0 < a ? a : 60
    };
    this.game.getDT = function(a) {
        a || (a = 1E3);
        return ob / a
    };
    this.game.getTime =
        function() {
            return N
        };
    var oc = function() {
            return k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.mozRequestAnimationFrame || k.oRequestAnimationFrame || k.msRequestAnimationFrame || function(a) {
                k.setTimeout(a, 1E3 / Ra)
            }
        },
        za = oc(),
        pc = function() {
            N = Date.now();
            Yb && g.clearRect(0, 0, m, n);
            p.runEvent("preLoop")
        },
        qc = function() {
            p.runEvent("postLoop"); - 1 !== pb && (ob = N - pb);
            pb = N
        },
        O = {
            func: function() {
                console.log('please, use a "setLoop" function.');
                za = function() {}
            },
            events: !1,
            start: !1,
            end: !1,
            audio: !1,
            fps: !1,
            name: "NotLoop"
        },
        rc = function() {
            O.audio && u(O.audio, function(a) {
                a.stop()
            })
        };
    this.game.newLoop = function(a, b, c, d, h) {
        "function" === typeof b ? ia[a] = {
            events: h || !1,
            func: b,
            start: c || !1,
            end: d || !1,
            audio: !1,
            fps: !1,
            name: a
        } : ja("error in newLoop : " + b + " is not a function")
    };
    this.game.newLoopFromClassObject = function(a, b) {
        if (!b.update) return ja('error in newLoopFromClassObject : function "update" not found');
        ia[a] = {
            events: b.events || !1,
            func: b.update,
            start: b.entry || !1,
            end: b.exit || !1,
            audio: !1,
            fps: !1,
            name: a
        }
    };
    this.game.newLoopFromConstructor =
        function(a, b) {
            z.game.newLoopFromClassObject(a, new b)
        };
    this.game.setLoopSound = function(a, b) {
        var c;
        ia[a].audio || (ia[a].audio = []);
        for (c = 0; c < b.length; c += 1) ia[a].audio.length = 0, b[c].setNextPlay(b[c + 1 === b.length ? 0 : c + 1]), ia[a].audio.push(b[c])
    };
    this.game.setLoop = function(a) {
        if (!ia[a]) return ja("setLoop : " + a + " is no a Loop");
        rc();
        gc();
        Z = {};
        Ja = {};
        qa = {};
        La = Ka = !1;
        jc();
        Jb(f(0, 0));
        O.end && O.end();
        p.runEvent("exitLoop");
        O = ia[a];
        C.loadFromEvents(O.events);
        O.start && O.start();
        p.runEvent("entryLoop");
        O.audio && O.audio[0].play()
    };
    var C = new function() {
        var a = {
                "mouse:click": []
            },
            b = this;
        this.add = function(b, d) {
            a[b] || (a[b] = []);
            a[b].push(d)
        };
        this.run = function(b, d) {
            a[b] && u(a[b], function(a) {
                return a(d)
            })
        };
        this.clear = function(b) {
            a[b] && (a[b].length = 0)
        };
        this.clearAll = function() {
            F(a, function(a) {
                a.length = 0
            })
        };
        this.loadFromEvents = function(a) {
            b.clearAll();
            a && F(a, function(a, c) {
                b.add(c, a)
            })
        };
        this.isEvent = function(b) {
            return !!a[b]
        }
    };
    this.game.tick = function(a, b) {
        qb === a && b()
    };
    var rb = {};
    this.game.skip = function(a, b, c) {
        v(rb[a]) || (rb[a] = 0);
        rb[a]++ >=
            b && (c(), rb[a] = 0)
    };
    var Kb = function() {
            60 > qb ? qb++ : qb = 0;
            if (60 > Ra) {
                var a = 1E3 / Ra;
                try {
                    N = Date.now(), N - nc > a && (pc(), O.func(ob), nc = N, qc())
                } catch (b) {
                    Da && Va(b), zb && (Da || Va(b), ja())
                }
                za(Kb);
                return !1
            }
            try {
                pc(), O.func(ob), qc()
            } catch (b) {
                Da && Va(b), zb && (Da || Va(b), ja())
            }
            za(Kb)
        },
        sc = function(a) {
            ha || (ha = !0, Ra = a || 60, za(Kb), p.runEvent("gameStart"))
        },
        ja = function(a) {
            ha && (ha = !1, rc(), za = function() {
                "undefined" !== typeof a && ca(a)
            }, p.runEvent("gameStop"))
        };
    this.game.isStopped = function() {
        return !ha
    };
    this.game.getWH = function() {
        return {
            w: m,
            h: n,
            w2: G,
            h2: H
        }
    };
    this.game.getWH2 = function() {
        return {
            w: G,
            h: H
        }
    };
    this.game.getResolution = function() {
        return Math.min(m / ka, n / la)
    };
    this.game.startLoop = function(a, b) {
        this.setLoop(a);
        this.start(b)
    };
    this.game.start = sc;
    this.game.stop = ja;
    this.game.resume = function() {
        if (!ha) return O.audio && O.audio[0].play(), za = oc(), pb = -1, sc(), !1
    };
    var Nc = 0,
        D = function(a) {
            this.type = "BaseObject";
            this.id = Nc += 1;
            this.x = a.x || 0;
            this.y = a.y || 0;
            this.w = a.w || 0;
            this.h = a.h || 0;
            this.ondraw = a.ondraw ? a.ondraw : !1;
            "function" === typeof a.predraw && (this.predraw =
                a.predraw);
            this.parent = !1;
            this.children = [];
            this.fillColor = a.fillColor || !1;
            this.strokeColor = a.strokeColor || t.strokeStyle;
            this.strokeWidth = a.strokeWidth || 0;
            this.angle = a.angle || 0;
            this.alpha = v(a.alpha) ? a.alpha : 1;
            this.center = f(0, 0);
            this.box = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            this.visible = v(a.visible) ? a.visible : !0;
            this.flip = f(0, 0);
            this.__dataset__ = {};
            this.setShadow(a);
            "object" === typeof a.data && F(a.data, function(a, c) {
                this.dataSet(c, a)
            }, !0);
            a.userData && this.setUserData(a.userData);
            a.center && this.setCenter(a.center);
            a.box &&
                this.setBox(a.box);
            a.size && this.setSize(a.size);
            a.sizeC && this.setSizeC(a.sizeC);
            a.position && this.setPosition(a.position);
            a.positionC && this.setPositionC(a.positionC);
            "function" === typeof a.oncreate && (this.oncreate = a.oncreate, this.oncreate(this), delete this.oncreate)
        };
    D.prototype = {
        predraw: function() {},
        getID: function() {
            return this.id
        },
        getType: function() {
            return this.type
        },
        dataDel: function(a) {
            delete this.__dataset__[a]
        },
        dataSet: function(a, b) {
            this.__dataset__[a] = b
        },
        dataGet: function(a, b) {
            return "undefined" !==
                typeof this.__dataset__[a] ? this.__dataset__[a] : "undefined" !== typeof b ? b : !1
        },
        data: function() {
            return this.__dataset__
        },
        getParent: function() {
            return this.parent
        },
        addChild: function(a) {
            a && a.id != this.id && (a.parent = this, this.children.push(a), a.move(this.getPosition()), a.setPositionC(I(a.getPositionC(), this.getPositionC(), this.angle)), a.turn(this.angle))
        },
        delChild: function(a) {
            a.parent = !1;
            var b;
            var c = 0;
            for (b = this.children.length; c < b; c += 1)
                if (this.children[c].id == a.id) {
                    this.children.splice(c, 1);
                    break
                }
        },
        delParent: function() {
            this.parent.delChild(this)
        },
        setBox: function(a) {
            a.offset && (this.box.x = a.offset.x || 0, this.box.y = a.offset.y || 0);
            a.size && (this.box.w = a.size.w || 0, this.box.h = a.size.h || 0)
        },
        isArrIntersect: function(a) {
            var b;
            var c = 0;
            for (b = a.length; c < b; c += 1)
                if (a[c].id !== this.id && this.isIntersect(a[c])) return a[c];
            return !1
        },
        isArrInside: function(a) {
            var b;
            var c = 0;
            for (b = a.length; c < b; c += 1)
                if (this.isDynamicInside(a[c].getDynamicBox())) return a[c];
            return !1
        },
        getNearest: function(a) {
            var b = 0,
                c = !1,
                d;
            var h = 0;
            for (d = a.length; h < d; h += 1)
                if (this.id !== a[h].id) {
                    !1 === c && (c =
                        this.getDistanceC(a[h].getPositionC()), b = h);
                    var e = this.getDistanceC(a[h].getPositionC());
                    e < c && (c = e, b = h)
                }
            return a[b]
        },
        setFlip: function(a, b) {
            v(a) && this.flip.x !== a && (this.flip.x = a);
            v(b) && this.flip.y !== b && (this.flip.y = b)
        },
        setUserData: function(a) {
            for (var b in a) v(this[b]) || (this[b] = a[b])
        },
        setShadow: function(a) {
            this.shadowColor = a.shadowColor || !1;
            this.shadowBlur = v(a.shadowBlur) ? a.shadowBlur : 3;
            this.shadowX = a.shadowX || 0;
            this.shadowY = a.shadowY || 0
        },
        getDynamicBox: function() {
            var a = this.getPosition(1);
            return 0 ===
                this.angle ? [f(this.x + this.box.x, this.y + this.box.y), f(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y), f(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y + this.h + this.box.h), f(this.x + this.box.x, this.y + this.box.y + this.h + this.box.h)] : [I(f(this.x + this.box.x, this.y + this.box.y), a, this.getAngle()), I(f(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y), a, this.getAngle()), I(f(this.x + this.box.x + this.w + this.box.w, this.y + this.box.y + this.h + this.box.h), a, this.getAngle()), I(f(this.x + this.box.x, this.y +
                    this.box.y + this.h + this.box.h), a, this.getAngle())]
        },
        isDynamicIntersect: function(a) {
            if (3 > a.length) return !1;
            var b = this.getDynamicBox(),
                c;
            for (c = b.length - 1; 0 <= c; c--)
                if (oa(b[c], a)) return !0;
            for (c = b.length - 1; 0 <= c; c--)
                if (oa(a[c], b)) return !0;
            return !1
        },
        isIntersect: function(a) {
            return a.visible ? this.angle || a.angle ? this.isDynamicIntersect(a.getDynamicBox()) : this.isStaticIntersect(a.getStaticBox()) : !1
        },
        isDynamicInside: function(a) {
            if (3 > a.length) return !1;
            var b = this.getDynamicBox(),
                c, d = 0;
            var h = 0;
            for (c = b.length; h < c; h +=
                1) oa(b[h], a) && (d += 1);
            return d === b.length ? !0 : !1
        },
        drawDynamicBox: function(a) {
            S(this, 1);
            g.shadowColor = "transparent";
            Aa(f(this.x + this.box.x, this.y + this.box.y), E(this.w + this.box.w, this.h + this.box.h), !1, a || "yellow", 2);
            tc(f(this.x + this.w / 2 + this.center.x, this.y + this.h / 2 + this.center.y), 10, a || "yellow");
            P()
        },
        drawStaticBox: function(a) {
            g.shadowColor = "transparent";
            Aa(f(this.x + this.box.x, this.y + this.box.y), E(this.w + this.box.w, this.h + this.box.h), !1, a || "yellow", 2);
            tc(f(this.x + this.w / 2 + this.center.x, this.y + this.h /
                2 + this.center.y), 10, a || "yellow")
        },
        isStaticIntersect: function(a) {
            return this.y + this.box.y + this.h + this.box.h >= a.y && this.x + this.box.x + this.w + this.box.w >= a.x && this.x + this.box.x < a.x + a.w && this.y + this.box.y < a.y + a.h
        },
        getStaticBoxPosition: function() {
            return {
                x: this.x + this.box.x,
                y: this.y + this.box.y,
                w: this.x + this.box.x + this.w + this.box.w,
                h: this.y + this.box.y + this.h + this.box.h
            }
        },
        getStaticBox: function() {
            return {
                x: this.x + this.box.x,
                y: this.y + this.box.y,
                w: this.w + this.box.w,
                h: this.h + this.box.h
            }
        },
        setAlpha: function(a) {
            this.alpha !==
                a && (this.alpha = 0 <= a ? 1 >= a ? a : 1 : 0)
        },
        transparent: function(a) {
            this.setAlpha(this.alpha + a)
        },
        getAlpha: function() {
            return this.alpha
        },
        rotate: function(a) {
            this.setAngle(Math.atan2(a.y - this.getPosition(1).y, a.x - this.getPosition(1).x) * (180 / Math.PI))
        },
        setCenter: function(a) {
            this.center = f(a.x, a.y)
        },
        nullCenter: function(a) {
            a || (a = f(0, 0));
            this.center = f(-this.w / 2 + a.x, -this.h / 2 + a.y)
        },
        getCenter: function() {
            return f(this.center.x, this.center.y)
        },
        getBox: function() {
            return this.box
        },
        move: function(a) {
            this.x += a.x;
            this.y += a.y
        },
        circling: function(a, b, c) {
            v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = 0);
            this.x = a.x + b * Math.cos(B(this.circlingAnglePointJS));
            this.y = a.y + b * Math.sin(B(this.circlingAnglePointJS));
            this.circlingAnglePointJS = 360 < this.circlingAnglePointJS ? 0 : this.circlingAnglePointJS + c
        },
        circlingC: function(a, b, c) {
            v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = 0);
            this.setPositionC(f(a.x + b * Math.cos(B(this.circlingAnglePointJS)), a.y + b * Math.sin(B(this.circlingAnglePointJS))));
            this.circlingAnglePointJS = 360 <
                this.circlingAnglePointJS ? 0 : this.circlingAnglePointJS + c
        },
        motion: function(a, b, c) {
            v(this.motionPercentPointJS) || (this.motionPercentPointJS = 0);
            this.x = a.x + b.w * Math.cos(B(this.motionPercentPointJS));
            this.y = a.y + b.h * Math.sin(B(this.motionPercentPointJS));
            this.motionPercentPointJS = 360 < this.motionPercentPointJS ? 0 : this.motionPercentPointJS + c
        },
        motionC: function(a, b, c) {
            v(this.motionPercentPointJS) || (this.motionPercentPointJS = 0);
            this.setPositionC(f(a.x + b.w * Math.cos(B(this.motionPercentPointJS)), a.y + b.h * Math.sin(B(this.motionPercentPointJS))));
            this.motionPercentPointJS = 360 < this.motionPercentPointJS ? 0 : this.motionPercentPointJS + c
        },
        scale: function(a) {
            this.w *= a;
            this.h *= a
        },
        scaleC: function(a) {
            var b = this.w,
                c = this.h;
            this.scale(a);
            this.move(f(-((this.w - b) / 2), -((this.h - c) / 2)))
        },
        getPosition: function(a) {
            return 1 === a ? f(this.x + (this.w / 2 + this.center.x), this.y + (this.h / 2 + this.center.y)) : 2 === a ? (a = f(this.x + this.w / 2, this.y + this.h / 2), this.angle && (a = I(a, this.getPosition(1), this.angle)), f(a.x, a.y)) : f(this.x, this.y)
        },
        getPositionC: function() {
            return f(this.x + (this.w /
                2 + this.center.x), this.y + (this.h / 2 + this.center.y))
        },
        getPositionS: function() {
            return f(this.x + e.x, this.y + e.x)
        },
        getPositionCS: function() {
            return f(this.x + (this.w / 2 + this.center.x) + e.x, this.y + (this.h / 2 + this.center.y) + e.y)
        },
        setPosition: function(a) {
            !1 !== a.x && (this.x = a.x);
            !1 !== a.y && (this.y = a.y)
        },
        setPositionS: function(a) {
            !1 !== a.x && (this.x = a.x + e.x);
            !1 !== a.y && (this.y = a.y + e.y)
        },
        setPositionC: function(a) {
            !1 !== a.x && (this.x = -(this.w / 2 + this.center.x) + a.x);
            !1 !== a.y && (this.y = -(this.h / 2 + this.center.y) + a.y)
        },
        setPositionCS: function(a) {
            !1 !==
                a.x && (this.x = -(this.w / 2 + this.center.x) + a.x + e.x);
            !1 !== a.y && (this.y = -(this.h / 2 + this.center.y) + a.y + e.y)
        },
        getSize: function() {
            return E(this.w, this.h)
        },
        setSize: function(a) {
            this.w = a.w;
            this.h = a.h
        },
        setSizeC: function(a) {
            this.w = a.w;
            this.h = a.h;
            this.move(f(-(a.w / 2), -(a.h / 2)))
        },
        turn: function(a) {
            this.angle += a
        },
        rotateForAngle: function(a, b) {
            0 > this.angle && (this.angle += 360);
            0 > a && (a += 360);
            var c = this.angle - a;
            180 < c ? c -= 360 : -180 > c && (c += 360);
            c >= -b - .5 && c <= b + .5 ? this.angle = a : c > b + .5 ? this.angle -= b : c < -b - .5 && (this.angle += b)
        },
        rotateForPoint: function(a,
            b) {
            var c = Fa(this.getPositionC(), a);
            this.rotateForAngle(c, b)
        },
        rotateForObject: function(a, b) {
            var c = Fa(this.getPositionC(), a.getPositionC());
            this.rotateForAngle(c, b)
        },
        moveTo: function(a, b) {
            var c = B(Fa(this.getPosition(), a));
            this.x += b * Math.cos(c);
            this.y += b * Math.sin(c)
        },
        moveToC: function(a, b) {
            var c = B(Fa(this.getPositionC(), a));
            this.x += b * Math.cos(c);
            this.y += b * Math.sin(c)
        },
        moveAngle: function(a, b) {
            b = B(v(b) ? b : this.angle);
            this.x += a * Math.cos(b);
            this.y += a * Math.sin(b)
        },
        moveTime: function(a, b) {
            b = b || 1;
            var c = this.getPosition();
            this.move(f((a.x - c.x) / b, (a.y - c.y) / b))
        },
        moveTimeC: function(a, b) {
            b = b || 1;
            var c = this.getPosition(1);
            this.move(f((a.x - c.x) / b, (a.y - c.y) / b))
        },
        getAngle: function() {
            return this.angle
        },
        setAngle: function(a) {
            this.angle !== a && (this.angle = a % 360)
        },
        getDistance: function(a) {
            return Math.sqrt(Math.pow(a.x - this.getPosition(2).x, 2) + Math.pow(a.y - this.getPosition(2).y, 2))
        },
        getDistanceC: function(a) {
            return Math.sqrt(Math.pow(a.x - this.getPosition(1).x, 2) + Math.pow(a.y - this.getPosition(1).y, 2))
        },
        setVisible: function(a) {
            this.visible = !0 === a
        },
        isVisible: function() {
            return this.visible
        },
        isInCamera: function() {
            return this.angle ? this.isInCameraDynamic() : this.isInCameraStatic()
        },
        isInCameraStatic: function() {
            return this.x + this.w < e.x || this.x > e.x + m || this.y + this.h < e.y || this.y > e.y + n ? !1 : !0
        },
        isInCameraDynamic: function() {
            var a = this.getDynamicBox(),
                b = [f(e.x, e.y), f(e.x + m, e.y), f(e.x + m, e.y + n), f(e.x, e.y + n)],
                c, d = 0;
            var h = 0;
            for (c = a.length; h < c; h += 1) oa(a[h], b) && (d += 1);
            return 0 < d
        },
        draw: function() {}
    };
    this.game.newBaseObject = function(a) {
        return new D(a)
    };
    var sb =
        function(a) {
            D.call(this, a);
            this.type = "TriangleObject"
        };
    da(D, sb);
    sb.prototype.getDynamicBox = function() {
        var a = this.getPositionC();
        return 0 === this.angle ? [f(this.x + this.w / 2, this.y), f(this.x + this.w, this.y + this.h), f(this.x, this.y + this.h)] : [I(f(this.x + this.w / 2, this.y), a, this.getAngle()), I(f(this.x + this.w, this.y + this.h), a, this.getAngle()), I(f(this.x, this.y + this.h), a, this.getAngle())]
    };
    sb.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this),
                a = !0;
            Sa(this.x, this.y, [f(this.w / 2, 0), f(this.w, this.h), f(0, this.h)], this.fillColor, this.strokeWidth ? this.strokeColor : !1, this.strokeWidth);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    this.game.newTriangleObject = function(a) {
        return new sb(a)
    };
    var Lb = function(a) {
        D.call(this, a);
        this.type = "RectObject"
    };
    da(D, Lb);
    Lb.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this), a = !0;
            Aa(f(this.x, this.y), E(this.w, this.h), this.fillColor, this.strokeColor,
                this.strokeWidth);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    this.game.newRectObject = function(a) {
        return new Lb(a)
    };
    var Mb = function(a) {
        D.call(this, a);
        this.type = "RoundRectObject";
        this.radius = a.radius || 1
    };
    da(D, Mb);
    Mb.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this), a = !0;
            tb(f(this.x, this.y), E(this.w, this.h), this.radius, this.fillColor, this.strokeColor, this.strokeWidth);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    this.game.newRoundRectObject =
        function(a) {
            return new Mb(a)
        };
    var sa = function(a) {
        D.call(this, a);
        this.radius = a.radius || 5;
        a.scale && (this.radius *= a.scale);
        this.w = 2 * this.radius;
        this.h = 2 * this.radius;
        this.type = "CircleObject";
        a.positionC && this.setPositionC(a.positionC)
    };
    da(D, sa);
    sa.prototype.draw = function() {
        this.predraw();
        if (this.visible) {
            if (!this.alpha) return this.ondraw ? this.ondraw() : null;
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this), a = !0;
            Ba(f(this.x, this.y), this.radius, this.fillColor, this.strokeColor, this.strokeWidth);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    sa.prototype.scale = function(a) {
        this.w *= a || 0;
        this.h *= a || 0;
        this.radius *= a ? a / 2 : 0
    };
    sa.prototype.scaleC = function(a) {
        var b = this.w,
            c = this.h;
        this.w *= a || 0;
        this.h *= a || 0;
        this.radius *= a;
        this.move(f(-((this.w - b) / 2), -((this.h - c) / 2)))
    };
    sa.prototype.getRadius = function() {
        return this.radius
    };
    sa.prototype.setRadius = function(a) {
        a && this.radius !== a && (this.radius = a, this.w = 2 * a, this.h = 2 * a)
    };
    this.game.newCircleObject = function(a) {
        return new sa(a)
    };
    var Nb = function(a) {
        this.file = a.file;
        this.w =
            a.w;
        this.h = a.h;
        this.read = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        a.read && (this.read.w = a.read.w || 0, this.read.h = a.read.h || 0, this.read.x = a.read.x || 0, this.read.y = a.read.y || 0);
        this.countX = a.countX;
        this.countY = a.countY;
        this.fullW = this.countX * this.w;
        this.fullH = this.countY * this.h;
        this.cnv = k.document.createElement("canvas");
        this.cnv.width = this.w;
        this.cnv.height = this.h;
        this.ctx = this.cnv.getContext("2d");
        this.loaded = !1;
        this.x = a.x || 0;
        this.y = a.y || 0;
        a = k.document.createElement("img");
        var b = this;
        a.onload = function() {
            b.ctx.drawImage(this,
                b.read.x ? b.read.x : 0, b.read.y ? b.read.y : 0, b.read.w ? b.read.w : this.width, b.read.h ? b.read.h : this.height, 0, 0, b.w, b.h);
            b.loaded = !0;
            A.load()
        };
        a.src = this.file;
        A.add()
    };
    Nb.prototype.draw = function() {
        if (this.loaded) {
            var a = -e.x + this.x,
                b = -e.y + this.y,
                c, d;
            for (d = 0; d < this.countY; d += 1)
                if (!(this.y + d * this.h + this.h < e.y || this.y + d * this.h > e.y + n))
                    for (c = 0; c < this.countX; c += 1) this.x + c * this.w + this.w < e.x || this.x + c * this.w > e.x + m || g.drawImage(this.cnv, a + c * this.w, b + d * this.h, this.w, this.h)
        }
    };
    Nb.prototype.getSize = function() {
        return this.loaded ?
            E(this.fullW, this.fullH) : E()
    };
    this.game.newBackgroundObject = function(a) {
        return new Nb(a)
    };
    var Ob = function(a) {
        D.call(this, a);
        this.type = "EllipsObject"
    };
    da(D, Ob);
    Ob.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha) {
            S(this);
            Ba(f(this.x, this.y), this.h / 2, this.fillColor, this.strokeColor, this.strokeWidth);
            if (this.ondraw) this.ondraw();
            P()
        }
    };
    this.game.newEllipsObject = function(a) {
        return new Ob(a)
    };
    var aa = function(a) {
        D.call(this, a);
        this.type = "TextObject";
        this.text = a.text || "TextObject";
        this.color =
            a.color || "";
        this.size = 0 < a.size ? a.size : 10;
        a.scale && (this.size *= a.scale);
        this.font = a.font || "serif";
        this.style = a.style || "";
        this.align = "left";
        this.valign = "top";
        this.radius = a.radius || 0;
        this.padding = a.padding || 0;
        this.w = Pb(this.text, this.style, this.size, this.font) + 2 * this.padding;
        this.h = this.size + 2 * this.padding;
        this.strokeColorText = a.strokeColorText || !1;
        this.strokeWidthText = a.strokeWidthText || !1;
        this.textDY = -this.size / 11;
        a.positionC && this.setPositionC(a.positionC)
    };
    da(D, aa);
    aa.prototype.reStyle = function(a) {
        this.text =
            a.text || this.text;
        this.color = a.color || this.color;
        this.size = a.size || this.size;
        this.font = a.font || this.font;
        this.style = a.style || this.style;
        this.padding = a.padding || this.padding;
        this.w = Pb(this.text, this.style, this.size, this.font) + 2 * this.padding;
        this.h = this.size + 2 * this.padding;
        this.strokeColorText = a.strokeColorText || this.strokeColorText;
        this.strokeWidthText = a.strokeWidthText || this.strokeWidthText;
        this.strokeColor = a.strokeColor || this.strokeColor;
        this.strokeWidth = a.strokeWidth || this.strokeWidth;
        this.fillColor =
            a.fillColor || this.fillColor;
        this.textDY = -this.size / 11
    };
    aa.prototype.setText = function(a) {
        this.text !== a && this.reStyle({
            text: a
        })
    };
    aa.prototype.getText = function() {
        return this.text
    };
    aa.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this), a = !0;
            if (this.fillColor || this.strokeColor) this.radius ? tb(f(this.x, this.y), E(this.w, this.h), this.radius, this.fillColor, this.strokeColor, this.strokeWidth) : Aa(f(this.x, this.y), E(this.w, this.h),
                this.fillColor, this.strokeColor, this.strokeWidth);
            ta(f(this.x + this.padding, this.textDY + this.y + this.padding), this.text, this.color, this.size, this.font, this.style, this.align, this.strokeColorText, this.strokeWidthText);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    aa.prototype.scale = function(a) {
        this.reStyle({
            size: this.size * a
        })
    };
    aa.prototype.scaleC = function(a) {
        var b = this.w,
            c = this.h;
        this.reStyle({
            size: this.size * a
        });
        this.move(f(-((this.w - b) / 2), -((this.h - c) / 2)))
    };
    aa.prototype.setSize = function(a) {
        this.size !== a && this.reStyle({
            size: a
        })
    };
    aa.prototype.setSizeC = function(a) {
        this.size !== a && (this.reStyle({
            size: a
        }), this.move(f(-a / 2, -a / 2)))
    };
    var Pb = function(a, b, c, d) {
        var h = k.document.createElement("canvas").getContext("2d");
        h.font = (b ? b + " " : "") + c + "px " + d;
        return h.measureText(a).width
    };
    this.OOP.getTextWidth = function(a) {
        return Pb(a.text, a.style || "", a.size || 10, a.font || "serif")
    };
    this.game.newTextObject = function(a) {
        return new aa(a)
    };
    var T = function(a) {
        D.call(this, a);
        this.type = "PolygonObject";
        this.points = [];
        this.pointColor = a.pointColor || !1;
        this.w =
            this.h = 0;
        var b = this;
        "undefined" !== typeof a.points && u(a.points, function(a) {
            b.addPoint(a)
        })
    };
    da(D, T);
    T.prototype.addPoint = function(a) {
        this.points.push(a);
        a.x > this.w && (this.w = a.x);
        a.x > this.h && (this.h = a.x)
    };
    T.prototype.delPoint = function(a) {
        this.points.splice(a, 1)
    };
    T.prototype.clearPoints = function() {
        this.points.length = 0
    };
    T.prototype.getPoints = function() {
        return this.points
    };
    T.prototype.getCount = function() {
        return this.points.length
    };
    T.prototype.getPoint = function(a) {
        return this.points[a]
    };
    T.prototype.isIntersect =
        function(a) {
            return a.visible ? this.isDynamicIntersect(a.getDynamicBox()) : !1
        };
    T.prototype.drawDynamicBox = function(a) {
        Sa(this.x, this.y, this.points, !1, "yellow", 1, "red")
    };
    T.prototype.getDynamicBox = function() {
        for (var a = [], b = this.points.length - 1; 0 <= b; b--) a.push(I(this.points[b], f(this.w / 2 + this.center.x, this.h / 2 + this.center.y), this.angle).plus(f(this.x, this.y)));
        return a
    };
    T.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this),
                a = !0;
            Sa(this.x, this.y, this.points, this.fillColor, this.strokeColor, this.strokeWidth, this.pointColor);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    this.game.newPolygonObject = function(a) {
        return new T(a)
    };
    var ua = function(a) {
        D.call(this, a);
        this.type = "ImageObject";
        this.loaded = !1;
        this.file = "";
        this.forOnLoad = a.onload || !1;
        uc(a.file, this, a.scale || 1)
    };
    da(D, ua);
    ua.prototype.draw = function() {
        this.predraw();
        if (this.visible && this.alpha && this.loaded) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor || this.flip.x ||
                this.flip.y) S(this), a = !0;
            vc(f(this.x, this.y), E(this.w, this.h), this.file);
            if (this.ondraw) this.ondraw();
            a && P()
        }
    };
    ua.prototype.simpleDraw = function(a) {
        this.predraw();
        if (this.loaded) {
            var b = !1;
            if (this.angle || 1 !== this.alpha || this.shadowColor) S(this), b = !0;
            vc(f(a.x, a.y), E(this.w, this.h), this.file);
            b && P()
        }
    };
    ua.prototype.setImage = function(a, b) {
        this.file !== a && (v(l[a]) ? (this.file = a, b && b()) : (this.loaded = !1, this.origHeight = this.origWidth = 0, this.forOnLoad = b || !1, uc(a, this)))
    };
    ua.prototype.getImage = function() {
        return this.file
    };
    ua.prototype.resize = function(a) {
        if (!1 !== a.w && !1 === a.h) {
            var b = a.w / this.w;
            this.w = a.w;
            this.h *= b
        } else !1 !== a.h && !1 === a.w ? (b = a.h / this.h, this.h = a.h, this.w *= b) : !1 !== a.w && !1 !== a.h && (this.w = a.w, this.h = a.h)
    };
    this.game.newImageObject = function(a) {
        return new ua(a)
    };
    var Q = function(a) {
        D.call(this, a);
        this.type = "AnimationObject";
        this.frame = 0;
        this.anim = a.animation;
        this.step = a.delay || 10;
        this.toFrameStep = this.difStep = 0;
        a.scale && (this.w *= a.scale, this.h *= a.scale)
    };
    da(D, Q);
    Q.prototype.draw = function() {
        if (this.visible && this.alpha) {
            var a = !1;
            if (this.angle || 1 !== this.alpha || this.flip.x || this.flip.y || this.shadowColor) S(this), a = !0;
            Qb(this.anim, f(this.x, this.y), E(this.w, this.h), this.frame);
            if (this.ondraw) this.ondraw();
            this.difStep > this.step ? (this.frame = this.frame < this.anim.r ? this.frame + 1 : 0, this.difStep = 0) : this.difStep += 1;
            a && P()
        }
    };
    Q.prototype.drawFrames = function(a, b, c) {
        if (this.visible && this.alpha) {
            if (this.frame < a || this.frame > b) this.frame = a;
            c = !1;
            if (this.angle || 1 !== this.alpha || this.flip.x || this.flip.y || this.shadowColor) S(this), c = !0;
            Qb(this.anim,
                f(this.x, this.y), E(this.w, this.h), this.frame);
            if (this.ondraw) this.ondraw();
            this.difStep > this.step ? (this.frame = this.frame < b ? this.frame + 1 : a, this.difStep = 0) : this.difStep += 1;
            c && P()
        }
    };
    Q.prototype.drawFrame = function(a) {
        if (this.visible && this.alpha) {
            var b = !1;
            if (this.angle || 1 !== this.alpha || this.flip.x || this.flip.y || this.shadowColor) S(this), b = !0;
            Qb(this.anim, f(this.x, this.y), E(this.w, this.h), a);
            if (this.ondraw) this.ondraw();
            b && P()
        }
    };
    Q.prototype.drawToFrame = function(a) {
        if (this.visible && this.alpha) {
            if (this.frame <
                a) this.toFrameStep = 1;
            else if (this.frame > a) this.toFrameStep = -1;
            else {
                this.drawFrame(a);
                return
            }
            this.drawFrame(this.frame);
            if (this.ondraw) this.ondraw();
            this.difStep > this.step ? (this.frame = this.frame < this.anim.r ? this.frame + this.toFrameStep : 0, this.difStep = 0) : this.difStep += 1
        }
    };
    Q.prototype.drawReverFrames = function(a, b) {
        if (this.visible && this.alpha) {
            this.drawFrame(this.frame);
            if (this.ondraw) this.ondraw();
            this.difStep > this.step ? (this.frame <= a ? this.toFrameStep = 1 : this.frame >= b && (this.toFrameStep = -1), this.frame +=
                this.toFrameStep, this.difStep = 0) : this.difStep += 1
        }
    };
    Q.prototype.setAnimation = function(a) {
        a !== this.anim && (this.frame = 0, this.anim = a)
    };
    Q.prototype.getAnimation = function() {
        return this.anim
    };
    Q.prototype.setDelay = function(a) {
        this.step = 0 < a ? a : this.step
    };
    Q.prototype.getDelay = function() {
        return this.step
    };
    Q.prototype.getFrame = function() {
        return this.frame
    };
    Q.prototype.setFrame = function(a) {
        this.frame = a
    };
    Q.prototype.getLastFrame = function() {
        return this.anim.endFrame
    };
    this.game.newAnimationObject = function(a) {
        return new Q(a)
    };
    var mc = function(a) {
            var b = !1;
            "RectObject" === a.type ? b = z.game.newRectObject({}) : "CircleObject" === a.type ? b = z.game.newCircleObject({}) : "RoundRectObject" === a.type ? b = z.game.newRoundRectObject({}) : "TextObject" === a.type ? b = z.game.newTextObject({}) : "EllipsObject" === a.type ? b = z.game.newEllipsObject({}) : "ImageObject" === a.type ? b = z.game.newImageObject({
                    file: a.file
                }) : "TriangleObject" === a.type ? b = z.game.newTriangleObject({}) : "PolygonObject" === a.type ? b = z.game.newTriangleObject({
                    points: a.points
                }) : "AnimationObject" ===
                a.type && (b = z.game.newAnimationObject({
                    animation: a.anim
                }));
            return b
        },
        Rb = {},
        Oc = 0,
        va = function(a, b) {
            this.file = a;
            this.loaded = !1;
            this.h = this.w = 0;
            this.id = Oc++;
            this.toLoad = [];
            var c = k.document.createElement("img"),
                d = this;
            Rb[a] = d;
            c.onload = function() {
                d.loaded = !0;
                d.w = this.width;
                d.h = this.height;
                d.img = k.document.createElement("canvas");
                d.img.width = this.width;
                d.img.height = this.height;
                d.context = d.img.getContext("2d");
                d.context.drawImage(this, 0, 0);
                d.toLoad.length && u(d.toLoad, function(a) {
                    a.func(d.context, a.w, a.h, a.r)
                });
                b && (d.onLoad = b, d.onLoad());
                A.load()
            };
            c.src = a;
            A.add()
        };
    va.prototype.onContext = function(a) {
        this.loaded ? a(this.context, this.w, this.h, 1) : this.toLoad.push({
            w: this.w,
            h: this.h,
            r: 1,
            func: a
        })
    };
    va.prototype.getCanvas = function() {
        return this.img
    };
    var Pc = 0;
    va.prototype.getAnimation = function(a, b, c, d, e) {
        var h = function(a, b, c, d, e, h) {
            this.id = Pc++;
            this.image = a;
            this.x = b;
            this.y = c;
            this.w = d;
            this.h = e;
            this.endFrame = this.r = h ? h - 1 : 0;
            this.frameCount = this.r + 1
        };
        h.prototype = {
            onContext: function(a) {
                this.image.loaded ? a(this.image.context,
                    this.w, this.h, this.r) : this.image.toLoad.push({
                    w: this.w,
                    h: this.h,
                    r: this.r,
                    func: a
                })
            },
            getImage: function() {
                return this.image
            },
            getCount: function() {
                return this.r
            }
        };
        return new h(this, a, b, c, d, e)
    };
    var Sb = function(a, b) {
        this.loaded = !0;
        this.w = a;
        this.h = b;
        this.img = k.document.createElement("canvas");
        this.img.width = a;
        this.img.height = b;
        this.context = this.img.getContext("2d")
    };
    Sb.prototype.onContext = va.prototype.onContext;
    Sb.prototype.getAnimation = va.prototype.getAnimation;
    this.tiles.newDrawImage = function(a, b) {
        return new Sb(a,
            b)
    };
    this.tiles.newImage = function(a, b) {
        return Rb[a] ? Rb[a] : new va(a, b)
    };
    this.tiles.newAnimation = function(a, b, c, d) {
        return (new va(a)).getAnimation(0, 0, b, c, d)
    };
    var Qb = function(a, b, c, d) {
            if (a && a.image.loaded) {
                var h = -e.x,
                    f = -e.y;
                a.image.img && g.drawImage(a.image.img, a.x + a.w * d, a.y, a.w, a.h, b.x + h, b.y + f, c.w, c.h)
            }
        },
        l = {},
        uc = function(a, b, c) {
            if (v(l[a])) {
                b.loaded = !0;
                b.file = a;
                if (b.w && !b.h) {
                    var d = b.w / l[a].w;
                    var e = b.w;
                    var f = l[a].h * d
                } else !b.w && b.h ? (d = b.h / l[a].h, f = b.h, e = l[a].w * d) : b.w && b.h ? (e = b.w, f = b.h) : (e = l[a].w, f = l[a].h);
                c && (e *= c, f *= c);
                b.w = e;
                b.h = f;
                b.forOnLoad && b.forOnLoad()
            } else e = k.document.createElement("img"), e.onload = function() {
                l[a] = {};
                l[a].loaded = !0;
                l[a].img = this;
                l[a].w = this.width;
                l[a].h = this.height;
                if (v(b)) {
                    b.loaded = !0;
                    if (b.w && !b.h) {
                        var d = b.w / l[a].w;
                        var e = b.w;
                        var h = l[a].h * d
                    } else !b.w && b.h ? (d = b.h / l[a].h, h = b.h, e = l[a].w * d) : b.w && b.h ? (e = b.w, h = b.h) : (e = l[a].w, h = l[a].h);
                    c && (e *= c, h *= c);
                    b.w = e;
                    b.h = h;
                    b.file = a;
                    b.forOnLoad && b.forOnLoad()
                }
                A.load()
            }, e.src = a, A.add()
        },
        vc = function(a, b, c) {
            if (c) {
                var d = -e.x,
                    h = -e.y;
                l[c] && g.drawImage(l[c].img,
                    0, 0, l[c].w, l[c].h, a.x + d, a.y + h, b.w, b.h)
            }
        },
        wc = function(a) {
            this.type = "Mesh";
            this.objs = [];
            this.x = a.x || 0;
            this.y = a.y || 0;
            this.angle = a.angle || 0;
            this.count = 0;
            var b = this;
            a.add && u(a.add, function(a) {
                b.add(a)
            });
            this.angle && this.setAngle(this.angle)
        };
    wc.prototype = {
        getCount: function() {
            return this.count
        },
        getObjects: function() {
            return this.objs
        },
        add: function(a) {
            this.count += 1;
            this.objs.push(a);
            a.offsetMesh = a.getPosition(1);
            a.turn(this.angle);
            a.setPositionC(f(this.x + a.offsetMesh.x, this.y + a.offsetMesh.y))
        },
        del: function(a) {
            var b =
                this;
            u(this.objs, function(c) {
                c.id == a.id && (b.objs.splice(void 0, 1), b.count--)
            })
        },
        draw: function(a) {
            u(this.objs, function(a) {
                a.draw()
            })
        },
        move: function(a) {
            this.x += a.x || 0;
            this.y += a.y || 0;
            var b = this;
            u(this.objs, function(a) {
                a.setPositionC(f(b.x + a.offsetMesh.x, b.y + a.offsetMesh.y))
            })
        },
        turn: function(a) {
            if (0 != a) {
                this.angle %= 360;
                this.angle += a;
                var b = f(this.x, this.y),
                    c = this;
                u(this.objs, function(d) {
                    d.turn(a);
                    d.setPositionC(I(f(c.x + d.offsetMesh.x, c.y + d.offsetMesh.y), b, c.angle))
                })
            }
        },
        setAngle: function(a) {
            if (a != this.angle) {
                this.angle =
                    a %= 360;
                var b = f(this.x, this.y),
                    c = this;
                u(this.objs, function(d) {
                    d.setAngle(a);
                    d.setPositionC(I(f(c.x + d.offsetMesh.x, c.y + d.offsetMesh.y), b, c.angle))
                })
            }
        },
        setPosition: function(a) {
            if (this.x != a.x || this.y != a.y) {
                this.x = a.x || this.x;
                this.y = a.y || this.y;
                var b = this;
                u(this.objs, function(a) {
                    b.angle ? a.setPositionC(I(f(b.x + a.offsetMesh.x, b.y + a.offsetMesh.y), f(b.x, b.y), b.angle)) : a.setPositionC(f(b.x + a.offsetMesh.x, b.y + a.offsetMesh.y))
                })
            }
        },
        isDynamicIntersect: function(a) {
            if (3 > a.length) return !1;
            var b = !1;
            u(this.objs, function(c) {
                if (c.isDynamicIntersect(a)) return b =
                    c
            });
            return b
        },
        isStaticIntersect: function(a) {
            var b = !1;
            u(this.objs, function(c) {
                if (c.isStaticIntersect(a)) return b = c
            });
            return b
        },
        isIntersect: function(a) {
            var b = !1;
            u(this.objs, function(c) {
                if (c.isIntersect(a)) return b = c
            });
            return b
        }
    };
    this.game.newMesh = function(a) {
        return new wc(a)
    };
    this.camera.shake = function(a, b) {
        e.x = a.x + R(-1, 1, !0) * b.w;
        e.y = a.y + R(-1, 1, !0) * b.h
    };
    this.camera.shakeC = function(a, b) {
        e.x = -G + a.x + R(-1, 1, !0) * b.w;
        e.y = -H + a.y + R(-1, 1, !0) * b.h
    };
    this.camera.scale = function(a) {
        ma *= a.x;
        na *= a.y;
        m /= a.x;
        n /= a.y;
        G =
            m / 2;
        H = n / 2;
        g.scale(a.x, a.y);
        g.save();
        Ma && (x.x /= a.x, x.y /= a.y)
    };
    this.camera.scaleC = function(a) {
        var b = m,
            c = n;
        ma *= a.x;
        na *= a.y;
        m /= a.x;
        n /= a.y;
        G = m / 2;
        H = n / 2;
        g.scale(a.x, a.y);
        g.save();
        e.x += (b - m) / 2;
        e.y += (c - n) / 2;
        Ma && (x.x /= a.x, x.y /= a.y)
    };
    this.camera.circling = function(a, b, c) {
        v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = c);
        e.x = a.x + b * Math.cos(B(this.circlingAnglePointJS));
        e.y = a.y + b * Math.sin(B(this.circlingAnglePointJS));
        this.circlingAnglePointJS = 360 <= this.circlingAnglePointJS ? c : this.circlingAnglePointJS +
            c
    };
    this.camera.circlingC = function(a, b, c) {
        v(this.circlingAnglePointJS) || (this.circlingAnglePointJS = c);
        e.x = -G + a.x + b * Math.cos(B(this.circlingAnglePointJS));
        e.y = -H + a.y + b * Math.sin(B(this.circlingAnglePointJS));
        this.circlingAnglePointJS = 360 <= this.circlingAnglePointJS ? c : this.circlingAnglePointJS + c
    };
    this.camera.motion = function(a, b, c) {
        v(this.motionPercentPointJS) || (this.motionPercentPointJS = b);
        e.x = a.x + b.w * Math.cos(B(this.motionPercentPointJS));
        e.y = a.y + b.h * Math.sin(B(this.motionPercentPointJS));
        this.motionPercentPointJS =
            360 <= this.motionPercentPointJS ? b : this.motionPercentPointJS + c
    };
    this.camera.motionC = function(a, b, c) {
        v(this.motionPercentPointJS) || (this.motionPercentPointJS = b);
        this.setPositionC(f(a.x + b.w * Math.cos(B(this.motionPercentPointJS)), a.y + b.h * Math.sin(B(this.motionPercentPointJS))));
        this.motionPercentPointJS = 360 <= this.motionPercentPointJS ? b : this.motionPercentPointJS + c
    };
    this.camera.follow = function(a, b) {
        this.moveTimeC(a.getPositionC(), b || 10)
    };
    this.camera.move = function(a) {
        e.x += a.x || 0;
        e.y += a.y || 0
    };
    this.camera.moveTime =
        function(a, b) {
            b = b || 1;
            var c = f(e.x, e.y);
            this.move(f(ma * (a.x - c.x) / b, na * (a.y - c.y) / b))
        };
    this.camera.moveTimeC = function(a, b) {
        b = b || 1;
        var c = f(e.x + G, e.y + H);
        this.move(f(ma * (a.x - c.x) / b, na * (a.y - c.y) / b))
    };
    this.camera.setPosition = function(a) {
        Jb(f(!1 !== a.x ? a.x : e.x, !1 !== a.y ? a.y : e.y))
    };
    this.camera.setPositionC = function(a) {
        Jb(f(!1 !== a.x ? a.x - G : e.x, !1 !== a.y ? a.y - H : e.y))
    };
    this.camera.getPosition = function(a) {
        return a ? f(e.x + G, e.y + H) : f(e.x, e.y)
    };
    this.camera.getPositionC = function() {
        return f(e.x + G, e.y + H)
    };
    this.camera.getStaticBox =
        function() {
            return {
                x: e.x,
                y: e.y,
                w: m,
                h: n
            }
        };
    this.camera.getDynamicBox = function() {
        return [f(e.x, e.y), f(e.x + m, e.y), f(e.x + m, e.y + n), f(e.x, e.y + n)]
    };
    var Jb = function(a) {
            e = f(a.x, a.y)
        },
        P = function(a) {
            g.restore();
            g.globalAlpha = t.globalAlpha;
            g.fillStyle = "black";
            g.strokeStyle = "black";
            g.msImageSmoothingEnabled = Ea;
            g.imageSmoothingEnabled = Ea
        },
        S = function(a, b) {
            g.save();
            var c = a.getPositionC();
            a.angle && (g.translate(-e.x + c.x, -e.y + c.y), g.rotate(B(a.angle)), g.translate(-c.x + e.x, -c.y + e.y));
            1 !== a.alpha && (g.globalAlpha = a.alpha);
            if (a.flip.x || a.flip.y) g.translate(-e.x + c.x, -e.y + c.y), g.scale(a.flip.x ? -1 : 1, a.flip.y ? -1 : 1), g.translate(-c.x + e.x, -c.y + e.y);
            a.shadowColor && (g.shadowBlur = a.shadowBlur, g.shadowColor = a.shadowColor, g.shadowOffsetX = a.shadowX, g.shadowOffsetY = a.shadowY);
            if ("EllipsObject" === a.type && !b) {
                c = a.w / 2;
                var d = a.h / 2,
                    h = f(-e.x + a.x, -e.y + a.y);
                g.translate(h.x, h.y);
                g.scale(c / d, 1);
                g.translate(-h.x, -h.y)
            }
        };
    this.system.setContextSettings = function(a) {
        g.save();
        for (var b in a) g[b] = a[b]
    };
    this.system.defaultSettings = function() {
        P()
    };
    this.game.clear = function() {
        g.clearRect(0, 0, m, n)
    };
    this.game.fill = function(a) {
        g.fillStyle = a;
        g.fillRect(0, 0, m, n)
    };
    var Sa = function(a, b, c, d, h, k, l) {
            if (!(3 > c.length)) {
                if (d && !(3 > c.length)) {
                    g.fillStyle = d;
                    d = -e.x + a;
                    var m = -e.y + b;
                    var w;
                    g.beginPath();
                    g.moveTo(d + c[0].x, m + c[0].y);
                    for (w = 1; w < c.length; w += 1) g.lineTo(d + c[w].x, m + c[w].y);
                    g.closePath();
                    g.fill()
                }
                for (d = 0; d < c.length; d += 1) m = d + 1 < c.length ? d + 1 : 0, h && ba(Wa(c[d], f(a, b)), Wa(c[m], f(a, b)), h, k), l && ub(Wa(c[d], f(a, b)), l)
            }
        },
        U = function(a) {
            a.x || (a.x = 0);
            a.y || (a.y = 0);
            a.w || (a.w =
                0);
            a.h || (a.h = 0)
        };
    this.brush.drawPolygon = function(a) {
        var b = a.points || [],
            c = a.fillColor || !1,
            d = a.strokeColor || !1,
            h = a.strokeWidth || 1;
        a = a.pointColor || !1;
        if (!(3 > b.length)) {
            if (c && !(3 > b.length)) {
                g.fillStyle = c;
                c = -e.x;
                var f = -e.y;
                var k;
                g.beginPath();
                g.moveTo(c + b[0].x, f + b[0].y);
                for (k = 1; k < b.length; k += 1) g.lineTo(c + b[k].x, f + b[k].y);
                g.closePath();
                g.fill()
            }
            for (c = 0; c < b.length; c += 1) f = c + 1 < b.length ? c + 1 : 0, d && ba(b[c], b[f], d, h), a && ub(b[c], a)
        }
    };
    this.brush.drawTriangle = function(a) {
        U(a);
        if (a.x + a.w < e.x || a.x > e.x + m || a.y + a.h < e.y ||
            a.y > e.y + n) return !1;
        Sa(a.x, a.y, [f(a.w / 2, 0), f(a.w, a.h), f(0, a.h)], a.fillColor, a.strokeColor, a.strokeWidth)
    };
    this.brush.drawTriangleS = function(a) {
        U(a);
        if (0 > a.x + a.w || a.x > m || 0 > a.y + a.h || a.y > n) return !1;
        Sa(e.x + a.x, e.y + a.y, [f(a.w / 2, 0), f(a.w, a.h), f(0, a.h)], a.fillColor, a.strokeColor, a.strokeWidth)
    };
    var ta = function(a, b, c, d, h, f, k, l, m) {
        g.textAlign = k;
        g.lineWidth = m;
        g.font = (f ? f + " " : "") + d + "px " + h;
        d = -e.x;
        h = -e.y;
        c && (g.fillStyle = c, g.fillText(b, d + a.x, h + a.y));
        l && (g.strokeStyle = l, g.strokeText(b, d + a.x, h + a.y))
    };
    this.brush.drawMultiText =
        function(a) {
            var b, c = a.text.split("\n");
            for (b = 0; b < c.length; b += 1) ta(f(a.x, a.y + a.size * b), c[b], a.color || t.fillStyle, a.size || 10, a.font || t.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
        };
    this.brush.drawMultiTextS = function(a) {
        var b, c = a.text.split("\n"),
            d = a.size || 10;
        for (b = 0; b < c.length; b += 1) ta(f(a.x + e.x, a.y + e.y + d * b), c[b], a.color || t.fillStyle, d || 10, a.font || t.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
    };
    this.brush.drawText = function(a) {
        ta(f(a.x || 0, a.y || 0), a.text,
            a.color || !1, a.size || 10, a.font || t.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
    };
    this.brush.drawTextS = function(a) {
        ta(f((a.x || 0) + e.x, (a.y || 0) + e.y), a.text, a.color || t.fillStyle, a.size || 10, a.font || t.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
    };
    this.brush.drawTextLines = function(a) {
        if (a.lines) {
            var b, c = a.size || 10;
            for (b = 0; b < a.lines.length; b += 1) ta(f(a.x || 0, (a.y || 0) + c * b), a.lines[b], a.color || t.fillStyle, c, a.font || t.font, a.style || !1, a.align || "left", a.strokeColor ||
                !1, a.strokeWidth || 2)
        }
    };
    this.brush.drawTextLinesS = function(a) {
        if (a.lines) {
            var b, c = a.size || 10;
            for (b = 0; b < a.lines.length; b += 1) ta(f((a.x || 0) + e.x, (a.y || 0) + e.y + c * b), a.lines[b], a.color || t.fillStyle, c, a.font || t.font, a.style || !1, a.align || "left", a.strokeColor || !1, a.strokeWidth || 2)
        }
    };
    var tc = function(a, b, c) {
            ba(f(a.x - b, a.y), f(a.x + b, a.y), c, 2);
            ba(f(a.x, a.y - b), f(a.x, a.y + b), c, 2)
        },
        Aa = function(a, b, c, d, h) {
            g.fillStyle = c;
            g.strokeStyle = d;
            d = -e.x;
            var f = -e.y;
            c && g.fillRect(a.x + d, a.y + f, b.w, b.h);
            h && (g.lineWidth = h, c = h / 2, g.strokeRect(a.x +
                d + c, a.y + f + c, b.w - h, b.h - h))
        };
    this.brush.drawRect = function(a) {
        U(a);
        if (a.x + a.w < e.x || a.x > e.x + m || a.y + a.h < e.y || a.y > e.y + n) return !1;
        Aa(f(a.x, a.y), E(a.w, a.h), a.fillColor || !1, a.strokeColor || t.strokeStyle, a.strokeWidth || !1)
    };
    this.brush.drawRectS = function(a) {
        U(a);
        if (0 > a.x + a.w || a.x > m || 0 > a.y + a.h || a.y > n) return !1;
        Aa(f(a.x + e.x, a.y + e.y), E(a.w, a.h), a.fillColor || !1, a.strokeColor || t.strokeStyle, a.strokeWidth || !1)
    };
    var ub = function(a, b) {
        (g.fillStyle = b) && g.fillRect(-e.x + a.x - 1, -e.y + a.y - 1, 2, 2)
    };
    this.brush.drawPoint = function(a) {
        U(a);
        if (a.x < e.x || a.x > e.x + m || a.y < e.y || a.y > e.y + n) return !1;
        ub(f(a.x, a.y), a.fillColor || !1)
    };
    this.brush.drawPointS = function(a) {
        U(a);
        if (0 > a.x || a.x > m || 0 > a.y || a.y > n) return !1;
        ub(f(a.x + e.x, a.y + e.y), a.fillColor || !1)
    };
    var tb = function(a, b, c, d, h, f) {
        g.fillStyle = d;
        g.strokeStyle = h;
        g.lineWidth = f;
        h = -e.x + a.x + f / 2;
        a = -e.y + a.y + f / 2;
        b.w -= +f;
        b.h -= +f;
        g.beginPath();
        g.moveTo(h + c, a);
        g.lineTo(h + b.w - c, a);
        g.quadraticCurveTo(h + b.w, a, h + b.w, a + c);
        g.lineTo(h + b.w, a + b.h - c);
        g.quadraticCurveTo(h + b.w, a + b.h, h + b.w - c, a + b.h);
        g.lineTo(h + c, a + b.h);
        g.quadraticCurveTo(h,
            a + b.h, h, a + b.h - c);
        g.lineTo(h, a + c);
        g.quadraticCurveTo(h, a, h + c, a);
        g.closePath();
        d && g.fill();
        f && g.stroke()
    };
    this.brush.drawRoundRect = function(a) {
        U(a);
        if (a.x + a.w < e.x || a.x > e.x + m || a.y + a.h < e.y || a.y > e.y + n) return !1;
        tb(f(a.x, a.y), E(a.w, a.h), a.radius || 2, a.fillColor || !1, a.strokeColor || t.strokeStyle, a.strokeWidth || !1)
    };
    this.brush.drawRoundRectS = function(a) {
        U(a);
        if (0 > a.x + a.w || a.x > m || 0 > a.y + a.h || a.y > n) return !1;
        tb(f(e.x + a.x, e.y + a.y), E(a.w, a.h), a.radius || 2, a.fillColor || !1, a.strokeColor || t.strokeStyle, a.strokeWidth ||
            !1)
    };
    var Ba = function(a, b, c, d, f) {
        g.fillStyle = c;
        g.strokeStyle = d;
        g.lineWidth = f;
        d = -e.x + b + (f ? f / 2 : 0);
        var h = -e.y + b + (f ? f / 2 : 0);
        g.beginPath();
        g.arc(a.x + d, a.y + h, b, 0, 2 * Math.PI, !0);
        g.closePath();
        c && g.fill();
        f && g.stroke()
    };
    this.brush.drawCircle = function(a) {
        U(a);
        var b = 2 * a.radius;
        if (a.x + b < e.x || a.x > e.x + m || a.y + b < e.y || a.y > e.y + n) return !1;
        Ba(f(a.x, a.y), a.radius, a.fillColor || !1, a.strokeColor || t.strokeStyle, a.strokeWidth || !1)
    };
    this.brush.drawCircleS = function(a) {
        U(a);
        var b = 2 * a.radius;
        if (0 > a.x + b || a.x > m || 0 > a.y + b || a.y > n) return !1;
        Ba(f(a.x + e.x, a.y + e.y), a.radius, a.fillColor || !1, a.strokeColor || t.strokeStyle, a.strokeWidth || !1)
    };
    var ba = function(a, b, c, d) {
        g.strokeStyle = c;
        g.lineWidth = d;
        c = -e.x;
        d = -e.y;
        g.beginPath();
        g.moveTo(c + a.x, d + a.y);
        g.lineTo(c + b.x, d + b.y);
        g.closePath();
        g.stroke()
    };
    this.brush.drawLineAngle = function(a) {
        var b = I(f(a.x + a.length, a.y), f(a.x, a.y), a.angle);
        ba(f(a.x, a.y), f(b.x, b.y), a.strokeColor || t.strokeStyle, a.strokeWidth || 1)
    };
    this.brush.drawLineAngleS = function(a) {
        var b = I(f(e.x + a.x + a.length, e.y + a.y), f(e.x + a.x, e.y + a.y), a.angle);
        ba(f(e.x + a.x, e.y + a.y), f(b.x, b.y), a.strokeColor || t.strokeStyle, a.strokeWidth || 1)
    };
    this.brush.drawLine = function(a) {
        ba(f(a.x1, a.y1), f(a.x1 + a.x2, a.y1 + a.y2), a.strokeColor || t.strokeStyle, a.strokeWidth || 1)
    };
    this.brush.drawLineS = function(a) {
        ba(f(e.x + a.x1, e.y + a.y1), f(e.x + a.x2, e.y + a.y2), a.strokeColor || t.strokeStyle, a.strokeWidth || 1)
    };
    this.brush.drawLineA = function(a) {
        ba(f(a.x1, a.y1), f(a.x2, a.y2), a.strokeColor || t.strokeStyle, a.strokeWidth || 1)
    };
    this.brush.drawLineAS = function(a) {
        ba(f(a.x1 + e.x, a.y1 + e.y), f(a.x2 +
            e.x, a.y2 + e.y), a.strokeColor || t.strokeStyle, a.strokeWidth || 1)
    };
    this.brush.drawEllips = function(a) {
        U(a);
        if (a.x + a.w < e.x || a.x > e.x + m || a.y + a.h < e.y || a.y > e.y + n) return !1;
        var b = a.w / 2,
            c = a.h / 2,
            d = f(-e.x + a.x, -e.y + a.y);
        g.save();
        g.translate(d.x, d.y);
        g.scale(b / c, 1);
        g.translate(-d.x, -d.y);
        Ba(f(a.x, a.y), c, a.fillColor, a.strokeColor, a.strokeWidth);
        g.restore()
    };
    this.brush.drawEllipsS = function(a) {
        U(a);
        if (0 > a.x + a.w || a.x > m || 0 > a.y + a.h || a.y > n) return !1;
        var b = a.w / 2,
            c = a.h / 2,
            d = f(a.x, a.y);
        g.save();
        g.translate(d.x, d.y);
        g.scale(b /
            c, 1);
        g.translate(-d.x, -d.y);
        Ba(f(e.x + a.x, e.y + a.y), c, a.fillColor, a.strokeColor, a.strokeWidth);
        g.restore()
    };
    this.brush.drawImageS = function(a) {
        if (a.file)
            if (v(l[a.file])) {
                if (l[a.file].loaded) {
                    var b = a.x || 0,
                        c = a.y || 0;
                    if (a.w && !a.h) {
                        var d = a.w / l[a.file].w;
                        var e = a.w;
                        var f = l[a.file].h * d
                    } else !a.w && a.h ? (d = a.h / l[a.file].h, f = a.h, e = l[a.file].w * d) : a.w && a.h ? (e = a.w, f = a.h) : (e = l[a.file].w, f = l[a.file].h);
                    a.scale && (e *= a.scale, f *= a.scale);
                    if (0 > b + e || b > m || 0 > c + f || c > n) return !1;
                    g.drawImage(l[a.file].img, 0, 0, l[a.file].w, l[a.file].h,
                        b, c, e, f)
                }
            } else l[a.file] = {
                loaded: !1
            }, b = k.document.createElement("img"), b.onload = function() {
                l[a.file].loaded = !0;
                l[a.file].img = this;
                l[a.file].w = this.width;
                l[a.file].h = this.height;
                A.load()
            }, b.src = a.file, A.add()
    };
    this.brush.drawImage = function(a) {
        if (a.file)
            if (v(l[a.file])) {
                if (l[a.file].loaded) {
                    var b = a.x || 0,
                        c = a.y || 0;
                    if (a.w && !a.h) {
                        var d = a.w / l[a.file].w;
                        var f = a.w;
                        var p = l[a.file].h * d
                    } else !a.w && a.h ? (d = a.h / l[a.file].h, p = a.h, f = l[a.file].w * d) : a.w && a.h ? (f = a.w, p = a.h) : (f = l[a.file].w, p = l[a.file].h);
                    a.scale && (f *= a.scale,
                        p *= a.scale);
                    if (b + f < e.x || b > e.x + m || c + p < e.y || c > e.y + n) return !1;
                    g.drawImage(l[a.file].img, 0, 0, l[a.file].w, l[a.file].h, -e.x + b, -e.y + c, f, p)
                }
            } else l[a.file] = {}, l[a.file].loaded = !1, b = k.document.createElement("img"), b.onload = function() {
                l[a.file].loaded = !0;
                l[a.file].img = this;
                l[a.file].w = this.width;
                l[a.file].h = this.height;
                A.load()
            }, b.src = a.file, A.add()
    };
    this.brush.onContext = function(a) {
        a(g)
    };
    this.brush.getPixelColor = function(a, b) {
        var c = g.getImageData(a, b, 1, 1).data;
        return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")"
    };
    this.brush.setPixelColor =
        function(a, b, c) {
            var d = g.createImageData(1, 1);
            d.data[0] = c.r || d.data[0];
            d.data[1] = c.g || d.data[1];
            d.data[2] = c.b || d.data[2];
            d.data[3] = c.a || 255;
            g.putImageData(d, a, b)
        };
    this.brush.onPixel = function(a, b, c) {
        var d = g.getImageData(a, b, 1, 1),
            e = {
                r: d.data[0],
                g: d.data[1],
                b: d.data[2],
                a: d.data[3] ? d.data[3] : 255
            };
        c(e);
        d.data[0] = e.r;
        d.data[1] = e.g;
        d.data[2] = e.b;
        d.data[3] = e.a;
        g.putImageData(d, a, b)
    };
    this.brush.onPixels = function(a, b, c, d, e) {
        c = g.getImageData(a, b, c, d);
        var f;
        d = 0;
        for (f = c.data.length; d < f; d += 4) {
            var h = {
                r: c.data[d],
                g: c.data[d + 1],
                b: c.data[d + 2],
                a: c.data[d + 3] ? c.data[d + 3] : 255
            };
            e(h);
            c.data[d] = h.r;
            c.data[d + 1] = h.g;
            c.data[d + 2] = h.b;
            c.data[d + 3] = h.a
        }
        g.putImageData(c, a, b)
    };
    this.brush.onRawPixels = function(a, b, c, d, e) {
        c = g.getImageData(a, b, c, d);
        e(c.data, c.data.length);
        g.putImageData(c, a, b)
    };
    var V = k.AudioContext || k.webkitAudioContext || !1;
    (V = V ? new V : !1) && V.listener.setPosition(0, 0, 0);
    var W = function(a, b) {
        V || ca('module "wAudio" is not supported! use a "audio"');
        this.vol = b && 1 >= b && 0 < b ? b : 1;
        this.loadPLay = this.nextPlay = this.loaded =
            this.playing = !1;
        this.pausedTime = this.duration = this.startTime = 0;
        var c = this,
            d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onload = function(a) {
            V.decodeAudioData(this.response, function(a) {
                c.wABuffer = a;
                c.duration = c.wABuffer.duration;
                c.wAGain = V.createGain();
                c.wAGain.gain.value = c.vol;
                c.wAPanner = V.createPanner();
                c.wAPanner.setPosition(0, 0, 1);
                c.wAPanner.panningModel = "equalpower";
                A.load();
                c.loaded = !0;
                c.loadPlay && c.replay()
            }, function(a) {
                ca("error in wAudio.newAudio : error decoding file",
                    a)
            })
        };
        a ? d.send() : ca("error in wAudio.newAudio : Where is file?");
        A.add()
    };
    W.prototype.play = function(a) {
        if (!this.loaded) this.loadPlay = !0;
        else if (!this.playing) {
            this.playing = !0;
            this.wASource = V.createBufferSource();
            this.wASource.buffer = this.wABuffer;
            this.wAListener = V.destination;
            this.wASource.connect(this.wAGain);
            this.wAGain.connect(this.wAPanner);
            this.wAPanner.connect(this.wAListener);
            this.wASource.start(0, this.pausedTime, this.duration);
            this.startTime = V.currentTime;
            var b = this;
            this.wASource.onended =
                function() {
                    b.playing = !1;
                    b.startTime = 0;
                    b.pausedTime = 0;
                    b.nextPlay && b.nextPlay.replay()
                }
        }
    };
    W.prototype.replay = function(a) {
        this.loaded ? (this.stop(), this.play()) : this.loadPlay = !0
    };
    W.prototype.stop = function() {
        this.pause();
        this.pausedTime = this.startTime = 0
    };
    W.prototype.pause = function() {
        if (this.playing) {
            this.pausedTime = this.getProgress();
            this.playing = !1;
            this.wASource.stop(0);
            var a = this;
            this.wASource.onended = function() {
                a.playing = !1
            }
        }
    };
    W.prototype.getProgress = function() {
        return this.playing ? V.currentTime - this.startTime +
            this.pausedTime : this.pausedTime
    };
    W.prototype.playPause = function() {
        this.playing ? this.pause() : this.play()
    };
    W.prototype.setNextPlay = function(a) {
        this.nextPlay = a
    };
    W.prototype.setVolume = function(a) {
        this.vol = a && 1 >= a && 0 < a ? a : this.vol;
        this.wAGain.gain.value = this.vol
    };
    W.prototype.getVolume = function() {
        return this.vol
    };
    W.prototype.setSide = function(a) {
        this.side = a;
        this.wAPanner && this.wAPanner.setPosition(this.side, 0, 1 - Math.abs(this.side))
    };
    W.prototype.getSide = function() {
        return this.side
    };
    this.wAudio.newAudio = function(a,
        b) {
        return new W(a, b)
    };
    var fa = function(a, b) {
        var c, d = k.document.createElement("audio");
        if ("string" == typeof a) {
            var e = k.document.createElement("source");
            e.src = a;
            d.appendChild(e)
        } else {
            var f = 0;
            for (c = a.length; f < c; f += 1) e = k.document.createElement("source"), e.src = a[f], d.appendChild(e)
        }
        this.vol = b && 1 >= b && 0 < b ? b : 1;
        this.playing = 0;
        this.audio = d;
        this.nextPlay = this.loaded = !1;
        d.volume = this.vol;
        var g = this;
        d.onloadeddata = function() {
            g.loaded = !0;
            A.load()
        };
        d.onended = function() {
            g.playing = !1;
            g.nextPlay && g.nextPlay.play()
        };
        d.load();
        A.add()
    };
    fa.prototype.play = function(a) {
        this.playing || (a && (this.vol = a && 1 >= a && 0 < a ? a : this.vol, this.audio.volume = this.vol), this.playing = !0, this.audio.play())
    };
    fa.prototype.replay = function(a) {
        a && this.setVolume(a);
        this.playing = !0;
        this.audio.currentTime = 0;
        this.audio.play()
    };
    fa.prototype.stop = function() {
        this.playing && (this.playing = !1, this.audio.pause(), this.audio.currentTime = 0)
    };
    fa.prototype.pause = function() {
        this.playing && (this.playing = !1, this.audio.pause())
    };
    fa.prototype.playPause = function() {
        this.playing ?
            this.pause() : this.play()
    };
    fa.prototype.setNextPlay = function(a) {
        this.nextPlay = a
    };
    fa.prototype.setVolume = function(a) {
        this.vol = a && 1 >= a && 0 < a ? a : this.vol;
        this.audio.volume = this.vol
    };
    fa.prototype.getVolume = function() {
        return this.vol
    };
    this.audio.newAudio = function(a, b) {
        return new fa(a, b)
    };
    var vb = [],
        wa = [];
    this.zList.useZValue = function() {
        this.update = function() {
            wa.length = 0;
            u(vb, function(a) {
                a.isInCamera() && wa.push(a)
            });
            wa.sort(function(a, b) {
                return a.z - b.z
            })
        }
    };
    this.zList.useYValue = function() {
        this.update = function() {
            wa.length =
                0;
            u(vb, function(a) {
                a.isInCamera() && wa.push(a)
            });
            wa.sort(function(a, b) {
                return a.y + a.h - (b.y + b.h)
            })
        }
    };
    this.zList.add = function(a) {
        vb.push(a)
    };
    this.zList.init = function(a) {
        u(a, function(a) {
            z.zList.add(a)
        })
    };
    this.zList.draw = function(a) {
        z.OOP.drawArr(wa, a)
    };
    this.zList.del = function(a) {
        z.OOP.delObject(vb, a)
    };
    this.zList.useYValue();
    var A = {
        count: 0,
        loaded: 0,
        errored: 0,
        add: function() {
            this.count += 1
        },
        load: function() {
            this.loaded += 1
        },
        error: function() {
            this.errored += 1
        }
    };
    this.resources.isLoaded = function() {
        return A.count ==
            A.loaded
    };
    this.resources.getProgress = function() {
        return Math.ceil(A.loaded / A.count * 100)
    };
    this.levels.forStringArray = function(a, b) {
        var c = a.offset || f(0, 0);
        u(a.source, function(d, e) {
            u(d, function(d, f) {
                " " !== d && b(d, c.x + a.w * f, c.y + a.h * e, a.w, a.h)
            })
        })
    };
    var Qc = function(a) {
            if ("AnimationObject" === a.type && "undefined" !== typeof __LVL_ANIMATIONS && a.__realAnim) {
                var b = __LVL_ANIMATIONS[a.__realAnim];
                a.anim = z.tiles.newImage(b.file).getAnimation(b.x, b.y, b.w, b.h, b.frames)
            }
            var c = mc(a);
            c.name = "";
            F(a, function(a, b) {
                "id" !== b &&
                    "anim" !== b && (c[b] = a)
            });
            return c
        },
        xc = function(a, b) {
            var c = {
                settings: {},
                objects: []
            };
            a = JSON.parse(a);
            c.settings = a.settings;
            u(a.objects, function(a) {
                var d = Qc(a);
                d.name = a.name;
                b && b(d);
                c.objects.push(d)
            });
            return c
        },
        yc = function(a, b, c) {
            var d = [],
                e = {};
            if (a && "json" === b) {
                b = xc(a, c);
                d = b.objects;
                e = b.settings;
                var f = a
            }
            this.backgroundColor = e.backgroundColor ? e.backgroundColor : !1;
            this.reload = function() {
                d = xc(f)
            };
            this.clear = function() {
                lc(d)
            };
            this.add = function(a) {
                d.push(a)
            };
            this.del = function(a) {
                u(d, function(b, c) {
                    if (a === b) return d.splice(c,
                        1), "break"
                })
            };
            this.delById = function(a) {
                d.splice(a, 1)
            };
            this.getObjects = function() {
                return d
            };
            this.getObjectByName = function(a) {
                var b;
                var c = 0;
                for (b = d.length; c < b; c += 1)
                    if (d[c].name == a) return d[c];
                return !1
            };
            this.getObjectById = function(a) {
                var b;
                var c = 0;
                for (b = d.length; c < b; c += 1)
                    if (d[c].id == a) return d[c];
                return !1
            };
            this.draw = function(a) {
                this.backgroundColor && z.game.fill(this.backgroundColor);
                u(d, function(b) {
                    a && a(b);
                    b.isInCamera() && b.draw()
                })
            };
            this.getObjectsInCamera = function() {
                var a = [];
                u(d, function(b) {
                    b.isInCamera() &&
                        a.push(b)
                });
                return a
            };
            this.getLevelAsJSON = function(a, b) {
                var c = '{"settings":' + JSON.stringify({
                    backgroundColor: this.backgroundColor
                }) + ',"objects":[';
                if (!d.length) return c + "]}";
                u(d, function(d, e) {
                    a && a(d);
                    c += "{";
                    F(d, function(a, b) {
                        "function" != typeof a && (c += '"' + b + '":' + JSON.stringify(a) + ",")
                    });
                    c = c.substr(0, c.length - 1) + "},";
                    b && b(d)
                });
                c = c.substr(0, c.length - 1);
                return c + "]}"
            }
        };
    this.levels.newLevelFromJSON = function(a, b) {
        return new yc(a, "json", b || !1)
    };
    this.levels.newEmptyLevel = function(a) {
        return new yc(!1)
    };
    var zc =
        0,
        Ac = 0,
        Tb = 0,
        Bc = !1;
    this.system.initFPSCheck = function() {
        Bc || (Bc = !0, p.addEvent("postLoop", "fpsCheckUpdate", function() {
            Tb += 1;
            1E3 <= N - Ac && (zc = Tb, Tb = 0, Ac = N)
        }))
    };
    this.system.getFPS = function() {
        return zc
    };
    var wb = this.filters;
    wb.setCSSFilter = function(a, b) {
        var c = (b ? b.canvas : q).style,
            d = "";
        F(a, function(a, b) {
            d += " " + b + "(" + a + ")"
        });
        c.OFilter = c.MozFilter = c.WebkitFilter = c.filter = d
    };
    wb.clearCSSFilter = function(a) {
        a = (a ? a.canvas : q).style;
        a.OFilter = a.MozFilter = a.WebkitFilter = a.filter = "none"
    };
    wb.setCSSTransform = function(a,
        b) {
        var c = (b ? b.canvas : q).style,
            d = "perspective(" + m + "px)";
        F(a, function(a, b) {
            d += " " + b + "(" + a + ")"
        });
        c.transform = c.MozTransform = c.WebkitTransform = d
    };
    wb.clearCSSTransform = function(a) {
        a = (a ? a.canvas : q).style;
        a.transform = a.MozTransform = a.WebkitTransform = "none"
    };
    this.OOP.newRever = function(a, b, c) {
        var d = function(a, b, c) {
            this.min = a;
            this.max = b;
            this.step = c;
            this.value = a;
            this.to = c
        };
        d.prototype = {
            update: function() {
                var a = this.value;
                this.value <= this.min ? this.to = this.step : this.value >= this.max && (this.to = -this.step);
                this.value +=
                    this.to;
                return a
            },
            getValue: function() {
                return this.value
            },
            setValue: function(a) {
                this.value = parseFloat(a)
            },
            setStep: function(a) {
                this.step = a
            },
            getStep: function() {
                return this.step
            }
        };
        return new d(a, b, c)
    };
    var Cc = {};
    this.OOP.once = function(a, b) {
        Cc[a] || (Cc[a] = !0, b())
    };
    this.OOP.newTimer = function(a, b) {
        if (0 >= a) return ja("error in system.newTimer : variable < 0, Timer is not created");
        var c = {
            time: 0 < a ? a : 1E3,
            func: b,
            startTime: !1,
            ending: !1,
            start: function() {
                this.ending || this.startTime || (this.startTime = N)
            },
            run: function() {
                !this.ending &&
                    this.startTime && N - this.startTime >= this.time && (this.func(), this.ending = !0)
            },
            end: function() {
                this.ending || (this.ending = !0, this.func())
            },
            restart: function(a) {
                this.startTime || this.start();
                if (this.ending) {
                    if (a && 0 >= a) return ja("error in Timer.restart : variable < 0");
                    a && (this.time = a);
                    this.ending = !1;
                    this.startTime = N
                }
            },
            stop: function() {
                this.ending || (this.ending = !0)
            }
        };
        p.addEvent("postLoop", "timer" + R(-100, 100) * R(-100, 100) + N, function() {
            c.run()
        });
        return c
    };
    this.memory.local = {
        storage: k.localStorage,
        clear: function() {
            this.storage.clear()
        },
        save: function(a, b) {
            this.storage.setItem(a, b)
        },
        saveAsObject: function(a, b) {
            var c = JSON.stringify(b);
            this.storage.setItem(a, c)
        },
        loadAsObject: function(a) {
            return JSON.parse(this.storage.getItem(a) || "false")
        },
        load: function(a) {
            return this.storage.getItem(a)
        },
        loadAsNumber: function(a) {
            return parseFloat(this.storage.getItem(a))
        }
    };
    this.memory.temp = {
        values: {},
        save: function(a, b) {
            this.values[a] = b
        },
        load: function(a) {
            return this.values[a]
        },
        loadAsNumber: function(a) {
            return parseFloat(this.values[a])
        }
    };
    k.addEventListener("load",
        function() {
            if (g) {
                for (var a in t) g[a] = t[a];
                g.save()
            }
            p.runEvent("onload");
            p.loaded = !0;
            J || (k.document.body.style.overflow = "hidden");
            "function" === typeof POINTJS_USER_ONLOAD && POINTJS_USER_ONLOAD();
            return !1
        });
    k.addEventListener("blur", function() {
        if (ha) return p.runEvent("gameBlur"), !1
    });
    k.addEventListener("focus", function() {
        if (!ha) return k.document.activeElement.blur(), k.focus(), p.runEvent("gameFocus"), !1
    });
    k.addEventListener("resize", function() {
        p.runEvent("gameResize");
        g && (g.textBaseline = t.textBaseline,
            m /= ma, n /= na, G = m / 2, H = n / 2, g.scale(ma, na));
        return !1
    });
    (J ? r : k).addEventListener("click", function() {
        k.document.activeElement && k.document.activeElement.blur();
        k.focus()
    });
    if ("undefined" !== typeof POINTJS_LOADED_DOM_IGNORE) k.onload();
    "undefined" !== typeof POINTJS_ENGINE_CREATED_EVENT && POINTJS_ENGINE_CREATED_EVENT(this);
    k._GLOGAL_POINT_JS = this
};
var lang = {
    ru : {
       'robot_not_know'  : 'Робот не знает что ему делать',
       'inventory_is_empty' : 'Инвентарь робота пуст',
       'robot_not_look_there' : 'Робот смотрит не в ту сторону',
       'crashed_the_wall' : 'Робот врезался в стену',
       'robot_not_find_object' : 'Робот не может найти объект который можно подобрать',
       'game_title' : 'SkillCraft - развивайся играя',
        'robot_is_waiting' : 'Робот остановился и ждет дальнейших команд',
        'robot_enter_infinity_cycle' : 'Робот зашёл в бесконечный цикл. Дальнейшее выполнение невозможно',
        'dialog_delete' : 'Удалить?',
        'tooltip_robot' : 'Это робот',
    },
    en : {
    
    },
}//-----------------------------------------------------------------------ЛОГИЧЕСКИЕ ПАРАМЕТРЫ--------------------------------------------------------------------
//Переменные для системы ВВОДА----------------------------------------------------------------------------------
var touchTapTimeOut = 100;//Параметр указывающий сколько миллисекунд надо держать пользователю на элементе в скроле чтобы его переместить(НУЖНО ЧТОБЫ ОТДЕЛЯТЬ ПРОКРУТКУ СКРОЛА ОТ ПЕРЕМЕЩЕНИЙ ЭЛЕМЕНТОВ В СКРОЛЕ)
var distanceOfScroll = 5; //Параметр указывающий на каком расстоянии от точки тапа при движении по экрану начинать отрабатывать события скрола
var scrollStep = 20; //Шаг скрола в пикселях(Когда крутишь колесиком мыши)
var touchScrollVal = 2;//Шаг скрола когда пальцами ресайзишь
var toolTipDelay = 1000000000;//Задержка в миллисекундах после которой всплывают тултипы если держать мышку на элементе
//Игровые параметры---------------------------------------------------------------------------------------------
var labyrinthSize = 3;//Стартовый размер лабиринта(Например если 5, тогда при старте игры сгенерится лабиринт размером 5x5). ДЛЯ АЛГОРИТМА ГЕНЕРАЦИИ ЭТО ДОЛЖНО БЫТЬ НЕЧЕТНОЕ ЧИСЛО
var labyrinthMaxSize = 0;//Ограничение на максимальный размер лабиринта. Если = 0, то максимума нет.
var isLabyrinthGrow = true;//Переключение возможности увеличения лабиринта при прохождении(Увеличивается лабиринт или нет при выходе из него)
var robotMoveDelay = 350; //Задержка при движении робота в милисекундах(ЧЕМ МЕНЬШЕ ТЕМ БЫСТРЕЕ)
var saveTimeout = 1000; //Таймаут для метода который следит за изменениями размера экрана
var difficultyLevel = "EASY";//Уровень сложности(если EASY - робот сам поворачивается куда нужно при движении)
var totalTokensOnMap = 15; //Сколько всего монеток генерится в лабиринте
var inactiveItemsAlpha = 0.5;//Альфа канал неактивных элементов интерфейса(кнопок и тд)
var passiveItemsAlpha = 0.5;//Альфа канал неактивных КОМАНД в кодмапе
var infinityCycleSteps = 5;//Количество итераций которые робот может стоять просто так(Если он простоит 5 итераций ничего не сделав, то это будет считаться бесконечным циклом БЕЗДЕЙСТВИЯ)
//РЕЖИМ ОТОБРАЖЕНИЯ ДОСТУПНЫХ КОМАНД:
// "simple" - только простые команды перемещений и подбора батареек
// "medium" - команды для перемещений не только туда куда едет робот, но и в направлении взгляда, команды подобрать и бросить обьект
// "all" - все доступные команды включая сложные блоки команд
var commandsViewMode = "all";
var isNewGraphicLab = true;//Временная переменная флаг для генерации лабиринта с НОВОЙ ГРАФИК
//ГЛОБАЛЬНЫЕ ПЕРМЕННЫЕ КОТОРЫЕ СОДЕРЖАТ ОБЩЕИГРОВЫЕ ДАННЫЕ(МЕНЯЮТСЯ НА ПРОТЯЖЕНИИ ИГРЫ)-------------------------
var totalSeconds = 0; //Для хранения колличества секунд которые прошли с начала прохождения уровня
var playerInventory = new Array();//Инвентарь робота. На карте он может собирать и перетаскивать элементы
var playerMoveCount = 0;//Счетчик ходов робота
var selectLang = 'ru';
var isDrawFPS = false;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------ГРАФИЧЕСКИЕ ПАРАМЕТРЫ-----------------------------------------------------------------
var currentAsset = "racetrack";
//Параметры для внутриигрового текста
var textOnCodeMapColor = "#1f75fe";//Цвет цифр когда вводишь итерации в команду repeat

//Путь к файлам отображения ИНТЕРФЕЙСА И КОМАНД---------------------------------------
var nonePath = "img/commands/command_none.png";//Картинка пустой команды
var coinPath = "img/assets/"+currentAsset+"/object_battery.png"; //Картинка для отображения монетки
//Пути до файлов с изображениями для интерфейса-------------------------------
var backgroundImgPath = "img/interface/interface_font.png"; //Картинка для фона за либиринтом
var clockPath = "img/interface/interface_clock.png";
var buttonStartImgSrc = "img/interface/interface_button_start.png";
var buttonStopImgSrc = "img/interface/interface_button_pause.png";
var menuButtonImgSrc = "img/interface/interface_button_menu.png";
var reloadButtonImgSrc = "img/interface/interface_button_reload.png";
var okButtonImgSrc = "img/interface/interface_button_ok.png";
var nextStepButtonImgSrc = "img/interface/interface_button_nextstep.png";
var prevStepButtonImgSrc = "img/interface/interface_button_prevstep.png";
var buttonDeleteImgSrc = "img/interface/interface_button_delete.png";
var buttonDialogImgSrc = "img/interface/interface_button_dialog_ok.png"
var guiTextColor = "red";//ЦВЕТ ТЕКСТА ДЛЯ GUI
//Пути для файлов для карты кода------------------------------------------------
var itemDeleteSrc = "img/interface/interface_codeview_delete.png";
var itemReplaceSrc = "img/interface/interface_codeview_replace.png";
var itemAddSrc = "img/interface/interface_codeview_add.png";
var itemMoveSrc = "img/interface/interface_codeview_move.png";
var itemPlusSrc = "img/interface/interface_codeview_plus.png";
//Файлы команд для карты кода---------------------------------------------------
var wallImgComm = "img/commands/command_interact_wall.png";
var coinImgComm = "img/commands/command_interact_coin.png";
var exitImgComm = "img/commands/command_interact_exit.png";
var entryImgComm = "img/commands/command_interact_entry.png";
var groundImgComm = "img/commands/command_interact_road.png";
var lineImg = "img/commands/command_line.png";
//Пути до файлов с изображением робота--------------------------------------------
var playerImgSrc = "img/assets/"+currentAsset+"/object_player.png";
//Пути до файлов с изображением команд--------------------------------------------
var commandNoneImgSrc = "img/commands/command_none.png";
var commandUpImgSrc = "img/commands/command_up.png";
var commandDownImgSrc = "img/commands/command_down.png";
var commandLeftImgSrc = "img/commands/command_left.png";
var commandRightImgSrc = "img/commands/command_right.png";
var commandClockwiseImgSrc = "img/commands/command_clockwise.png";
var commandUnClockwiseImgSrc = "img/commands/command_unclockwise.png";
var commandPickUpImgSrc = "img/commands/command_pickup.png";
var commandDropImgSrc = "img/commands/command_drop.png";
var commandCommandsBlockImgSrc = "img/commands/command_block_commands.png";
var commandWhatIsItImgSrc = "img/commands/command_whatisit.png";
var commandIfImgSrc = "img/commands/command_block_if.png";
var commandRepeatImgSrc = "img/commands/command_block_repeat.png";
var commandRepeatIfImgSrc = "img/commands/command_block_repeatif.png";
var commandBlockAImgSrc = "img/commands/command_block_a.png";
var commandBlockBImgSrc = "img/commands/command_block_b.png";
var commandCounterImgSrc = "img/commands/command_counter.png";
var commandOkImgSrc = "img/commands/command_ok.png";
var commandLookUpImgSrc = "img/commands/command_look_up.png";
var commandLookDownImgSrc = "img/commands/command_look_down.png";
var commandLookLeftImgSrc = "img/commands/command_look_left.png";
var commandLookRightImgSrc = "img/commands/command_look_right.png";
var commandLookCenterImgSrc = "img/commands/command_look_center.png";
var commandElseBlockImgSrc = "img/commands/command_block_else.png";
var commandForwardImgSrc = "img/commands/command_forward.png";
var commandOnLeftImgSrc = "img/commands/command_onleft.png";
var commandOnRightImgSrc = "img/commands/command_onright.png";
var commandBackwardImgSrc = "img/commands/command_backward.png";
var commandDigitsImgSrc = ["img/commands/command_digit_0.png",//Массив изображений для цифровой клавиатуры
"img/commands/command_digit_1.png",
"img/commands/command_digit_2.png",
"img/commands/command_digit_3.png",
"img/commands/command_digit_4.png",
"img/commands/command_digit_5.png",
"img/commands/command_digit_6.png",
"img/commands/command_digit_7.png",
"img/commands/command_digit_8.png",
"img/commands/command_digit_9.png"];
var commandBackspaceImgSrc = "img/commands/command_backspace.png";
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Предзагрузка ВСЕХ КАРТИНОК-------------------------------------------------------------------------------------------------------------------------------------
//Картинки для графики
var graphicsImgs = [
    //картинки внутренных стен
    {
        code : 2,
        value : "img/assets/"+currentAsset+"/field_wall_roundDown.png"
    },
    {
        code : 3,
        value : "img/assets/"+currentAsset+"/field_wall_roundUp.png"
    },
    {
        code : 4,
        value : "img/assets/"+currentAsset+"/field_wall_roundRight.png"
    },
    {
        code : 5,
        value : "img/assets/"+currentAsset+"/field_wall_roundLeft.png"
    },
    {   code : 6,
        value : "img/assets/"+currentAsset+"/field_wall_corner_rightUp.png"
    },
    {   code : 777,
        value : "img/assets/"+currentAsset+"/field_wall_corner_leftUp.png"
    },
    {   code : 888,
        value : "img/assets/"+currentAsset+"/field_wall_corner_leftDown.png"
    },
    {   code : 999,
        value : "img/assets/"+currentAsset+"/field_wall_corner_rightDown.png"
    },
    {   code : 37,
        value : "img/assets/"+currentAsset+"/field_wall_T_down.png"
    },
    {   code : 38,
        value : "img/assets/"+currentAsset+"/field_wall_T_up.png"
    },
    {   code : 39,
        value : "img/assets/"+currentAsset+"/field_wall_T_left.png"
    },
    {   code : 40,
        value : "img/assets/"+currentAsset+"/field_wall_T_right.png"
    },
    {   code : 41,
        value : "img/assets/"+currentAsset+"/field_wall_straight_vertical.png"
    },
    {   code : 42,
        value : "img/assets/"+currentAsset+"/field_wall_straight_horizontal.png"
    },
    {   code : 43,
        value : "img/assets/"+currentAsset+"/field_wall_straight_intersection.png"
    },
    //
    //картинки дорог
    {   code : 10,
        value : "img/assets/"+currentAsset+"/field_road_straight_vertical.png"
    },
    {   code : 14,
        value : "img/assets/"+currentAsset+"/field_road_straight_horizontal.png"
    },
    {   code : 12,
        value : "img/assets/"+currentAsset+"/field_road_intersection.png"
    },
    {   code : 13,
        value : "img/assets/"+currentAsset+"/field_road_corner_rightUp.png"
    },
    {   code : 15,
        value : "img/assets/"+currentAsset+"/field_road_corner_leftDown.png"
    },
    {   code : 16,
        value : "img/assets/"+currentAsset+"/field_road_corner_leftUp.png"
    },
    {   code : 17,
        value : "img/assets/"+currentAsset+"/field_road_corner_rightDown.png"
    },
    {   code : 18,
        value : "img/assets/"+currentAsset+"/field_road_T_up.png"
    },
    {   code : 19,
        value : "img/assets/"+currentAsset+"/field_road_T_down.png"
    },
    {   code : 20,
        value : "img/assets/"+currentAsset+"/field_road_T_left.png"
    },
    {   code : 11,
        value : "img/assets/"+currentAsset+"/field_road_T_right.png"
    },
    {   code : 33,
        value : "img/assets/"+currentAsset+"/field_road_end_right.png"
    },
    {   code : 34,
        value : "img/assets/"+currentAsset+"/field_road_end_left.png"
    },
    {   code : 35,
        value : "img/assets/"+currentAsset+"/field_road_end_up.png"
    },
    {   code : 36,
        value : "img/assets/"+currentAsset+"/field_road_end_down.png"
    },
    //
    //картинки внешних стен
    {   code : 21,
        value : "img/assets/"+currentAsset+"/field_extWall_corner_leftUp.png"
    },
    {   code : 22,
        value : "img/assets/"+currentAsset+"/field_extWall_corner_rightDown.png"
    },
    {   code : 23,
        value : "img/assets/"+currentAsset+"/field_extWall_corner_rightUp.png"
    },
    {   code : 24,
        value : "img/assets/"+currentAsset+"/field_extWall_corner_leftDown.png"
    },
    {   code : 25,
        value : "img/assets/"+currentAsset+"/field_extWall_up.png"
    },
    {   code : 26,
        value : "img/assets/"+currentAsset+"/field_extWall_down.png"
    },
    {   code : 27,
        value : "img/assets/"+currentAsset+"/field_extWall_right.png"
    },
    {   code : 28,
        value : "img/assets/"+currentAsset+"/field_extWall_left.png"
    },
    {   code : 29,
        value : "img/assets/"+currentAsset+"/field_extWall_T_right.png"
    },
    {   code : 30,
        value : "img/assets/"+currentAsset+"/field_extWall_T_left.png"
    },
    {   code : 31,
        value : "img/assets/"+currentAsset+"/field_extWall_T_up.png"
    },
    {   code : 32,
        value : "img/assets/"+currentAsset+"/field_extWall_T_down.png"
    },
    //
    //старт и финиш
    {   code : 44,
        value : "img/assets/"+currentAsset+"/field_start_up.png"
    },
    {   code : 45,
        value : "img/assets/"+currentAsset+"/field_start_down.png"
    },
    {   code : 46,
        value : "img/assets/"+currentAsset+"/field_start_right.png"
    },
    {   code : 47,
        value : "img/assets/"+currentAsset+"/field_start_left.png"
    },
    {   code : 48,
        value : "img/assets/"+currentAsset+"/field_finish_up.png"
    },
    {   code : 49,
        value : "img/assets/"+currentAsset+"/field_finish_down.png"
    },
    {   code : 50,
        value : "img/assets/"+currentAsset+"/field_finish_right.png"
    },
    {   code : 51,
        value : "img/assets/"+currentAsset+"/field_finish_left.png"
    },
    //

];
//Массив картинок команд и интерфейса
var arrInterfaceAndCommandsImagesForLoad = [
    'img/commands/command_none.png',
    'img/assets/'+currentAsset+'/object_battery.png',
    'img/interface/interface_font.png',
    'img/interface/interface_clock.png',
    'img/interface/interface_button_start.png',
    'img/interface/interface_button_pause.png',
    'img/interface/interface_button_menu.png',
    'img/interface/interface_button_reload.png',
    'img/interface/interface_button_ok.png',
    'img/interface/interface_button_nextstep.png',
    'img/interface/interface_button_prevstep.png',
    'img/interface/interface_codeview_delete.png',
    'img/interface/interface_codeview_replace.png',
    'img/interface/interface_codeview_add.png',
    'img/interface/interface_codeview_move.png',
    'img/interface/interface_codeview_plus.png',
    'img/commands/command_interact_wall.png',
    'img/commands/command_interact_coin.png',
    'img/commands/command_interact_exit.png',
    'img/commands/command_interact_entry.png',
    'img/commands/command_interact_road.png',
    'img/commands/command_line.png',
    'img/assets/'+currentAsset+'/object_player.png',
    'img/commands/command_none.png',
    'img/commands/command_up.png',
    'img/commands/command_down.png',
    'img/commands/command_left.png',
    'img/commands/command_right.png',
    'img/commands/command_clockwise.png',
    'img/commands/command_unclockwise.png',
    'img/commands/command_pickup.png',
    'img/commands/command_drop.png',
    'img/commands/command_block_commands.png',
    'img/commands/command_whatisit.png',
    'img/commands/command_block_if.png',
    'img/commands/command_block_repeat.png',
    'img/commands/command_block_repeatif.png',
    'img/commands/command_block_a.png',
    'img/commands/command_block_b.png',
    'img/commands/command_counter.png',
    'img/commands/command_ok.png',
    'img/commands/command_look_up.png',
    'img/commands/command_look_down.png',
    'img/commands/command_look_left.png',
    'img/commands/command_look_right.png',
    'img/commands/command_look_center.png',
    'img/commands/command_block_else.png',
    'img/commands/command_forward.png',
    'img/commands/command_onleft.png',
    'img/commands/command_onright.png',
    'img/commands/command_backward.png',
    'img/commands/command_digit_0.png',
    "img/commands/command_digit_1.png",
    "img/commands/command_digit_2.png",
    "img/commands/command_digit_3.png",
    "img/commands/command_digit_4.png",
    "img/commands/command_digit_5.png",
    "img/commands/command_digit_6.png",
    "img/commands/command_digit_7.png",
    "img/commands/command_digit_8.png",
    "img/commands/command_digit_9.png",
    "img/interface/interface_button_dialog_ok.png",
    "img/interface/interface_button_delete.png"
];

graphicsImgs.forEach(function(e){
    new Image().src = e.value;
});
arrInterfaceAndCommandsImagesForLoad.forEach(function(e){
    new Image().src = e;
});

/*
Содержит переменные для работы с движком
*/

var pjs = new PointJS(640, 480, {
    //backgroundColor : '#3333ff',
    //backgroundColor : '#4b4843' ,// optional
    background: 'url(' + backgroundImgPath + ') no-repeat center ',
    backgroundSize: 'cover'
});
pjs.system.initFullPage(); // for Full Page mode

//Переменные для взаимодействия с движком
var log = pjs.system.log; // log = console.log;
var localMemory = pjs.memory.local;
var system = pjs.system;
var game = pjs.game; // Game Manager
var point = pjs.vector.point; // Constructor for Point
var camera = pjs.camera; // Camera Manager
var layers = pjs.layers;
var levels = pjs.levels;
var brush = pjs.brush; // Brush, used for simple drawing
var OOP = pjs.OOP; // Objects manager
var math = pjs.math; // More Math-methods
var key = pjs.keyControl.initKeyControl();
//var mouse = pjs.mouseControl.initMouseControl();
var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();
system.initFPSCheck();

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

var isOkClose = true;

function PushButton() { //Класс наследуеться от newImageObject, экзепляры класса это кнопки
    var parent = game.newImageObject({
        x: 0,
        y: 0,
        w: 50,
        h: 100,
        file: nonePath
    })
    this.__proto__ = parent;
    //функция вызываеться извне и позволяеть установить  настройки позиции и размеров кнопки
    this.setSetting = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    //функция установки картинки для кнопки, получает на вход путь к картинке
    this.setButtonImgSrc = function (img) {
        //this.file = img
        this.__proto__ = new game.newImageObject({
            x: parent.x,
            x: parent.y,
            x: parent.w,
            x: parent.h,
            file: img
        });
    }
}

function Buttons() { //класс для работы совсеми кнопками, внутри этого класса объявляються новые экзепляры кнопок и их настройки, а так же обработчики данных кнопок
    //из вне создаеться один экземпляр этого класса для того чтобы объявить все кнопки описанные в этом классе

    //создание объектов кнопок
    this.mainButton = new PushButton(); //Кнопка описывающая логику СТАРТ/СТОП/ОК
    this.stepDownButton = new PushButton();
    this.stepUpButton = new PushButton();
    this.backToStartButton = new PushButton();
    this.menuButton = new PushButton();
    this.deleteButton = new PushButton();
    //
    //создание и заполнение массива для хранения кнопок, нужен для того чтобы в дальнейшем рисовать эти кнопки или обходить их для вылавливание событий
    this.buttonsArr = [];
    this.buttonsArr.push(this.mainButton);
    this.buttonsArr.push(this.stepDownButton);
    this.buttonsArr.push(this.stepUpButton);
    this.buttonsArr.push(this.backToStartButton);
    this.buttonsArr.push(this.menuButton);
    this.buttonsArr.push(this.deleteButton);
    //
    var n = 1 // число кнопок, которые расположаны в отдельным местах экрана, а не рядом с кнопками снизу лабиринта
    //получаем количество кнопок в массиве для того чтобы автоматический определить ширину кнопок на экране
    var buttonsCount = this.buttonsArr.length - n; //!!!если кнопка будет создана для того чтобы разместить в другом места, а не снизу, то обратите внимание на эту строку
    //выполняем настройки позиции, размеров картинки для кнопок
    this.mainButton.setSetting(gameSpaceX, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.mainButton.setButtonImgSrc(buttonStartImgSrc)

    this.stepDownButton.setSetting(this.mainButton.x + this.mainButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.stepDownButton.setButtonImgSrc(prevStepButtonImgSrc);

    this.stepUpButton.setSetting(this.stepDownButton.x + this.stepDownButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.stepUpButton.setButtonImgSrc(nextStepButtonImgSrc);

    this.backToStartButton.setSetting(this.stepUpButton.x + this.stepUpButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.backToStartButton.setButtonImgSrc(reloadButtonImgSrc);

    this.menuButton.setSetting(this.backToStartButton.x + this.backToStartButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.menuButton.setButtonImgSrc(menuButtonImgSrc);
    
    this.deleteButton.setSetting(width -(gameSpaceW/100 * 5) ,0, gameSpaceW/100 * 5, gameSpaceW / 100 * 5)
    this.deleteButton.setButtonImgSrc(buttonDeleteImgSrc);
    this.deleteButton.setVisible(false);
    //
    //описывает обработчик onClick для кнопок
    this.mainButton.setUserData({
        onClick: function (el) {
            if (el.file == okButtonImgSrc) isOkClose = onOkBClick(); //Обрабатываем на нажатие по ОК
            else startBClick(); //Обрабатываем клик по СТАРТ/СТОП
            //Задаем картинку кнопке в соответствии с ее состоянием
            if (isOkClose) el.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
        }
    });
    this.stepDownButton.setUserData({
        onClick: function (el) {
            if (!isOkClose || isStarted || isSecondScreen) return;
            setPreviousStateToPlayer();
        }
    });
    this.deleteButton.setUserData({
        onClick: function (el) {
                if(lastClickedElement.commands && lastClickedElement.commands.length >0)
                    dialog.setShowDialog(true);
        }
    });
    this.stepUpButton.setUserData({
        onClick: function (el) {
            if (!isOkClose || isStarted || isSecondScreen) return;
            processRobotMove();
        }
    });
    this.backToStartButton.setUserData({
        onClick: function (el) {
            if (!isOkClose || isSecondScreen) return;
            if (!isStarted) {
                //Останавливаем цикл движения игры
                isStarted = false;
                allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
                //СБрасываем флаг для чтения команд
                OOP.forArr(field, function (el) {
                    el.isCommandsReaded = false;
                });
                //Ставим робота на вход в лабиринт
                playerSetStart();
                //Очищаем карту кода
                codeView.clear();
            }
        }
    });
    this.menuButton.setUserData({
        onClick: function (el) {
            menuBClick();
        }
    });

    this.getPosition = function () {
        return this.mainButton.getPosition();
    }
    //
    //Функция вызывается извне для обрисовки кнопок
    this.ButtonsDraw = function () {
        if (this.buttonsArr) {
            OOP.drawArr(this.buttonsArr)
        }
    }
    //Проверка на клик по кнопке и запуск обработчика кнопки если клик есть
    this.checkButtonsClicked = function (e) {
        if (this.buttonsArr) {
            for (var i = 0; i < this.buttonsArr.length; i++) {
                if (clickIsInObj(e.x, e.y, this.buttonsArr[i])) {
                    this.buttonsArr[i].onClick(this.buttonsArr[i]);
                    return true;
                }
            }
        }
        return false;
    }
}
function ToolTip()
{
    var bgH = height/100*4;
    var toolTipBG = game.newRoundRectObject({x:0,y:0,w:100,h:bgH,radius:5,fillColor:"green",visible : false});
    var toolTipText = game.newTextObject({x:toolTipBG.x,y:toolTipBG.y,text:"test",size: toolTipBG.h,color:"#ff9900",visible: false});
    
    this.setToolTip = function(x,y,toolText)
    {
        var charCOunt = toolText.toString().length;
        toolTipBG.w = charCOunt*(height/100*1.45);
        toolTipBG.x = x;
        toolTipBG.y = y;
        toolTipText.x = x;
        toolTipText.y = y;
        toolTipText.text = toolText;
        toolTipBG.setVisible(true);
        toolTipText.setVisible(true);
    }
    this.hideToolTip = function()
    {
        toolTipBG.setVisible(false);
        toolTipText.setVisible(false);
        toolTipText.text = "test";
    }
    this.isVisible = function(){
        return toolTipText.visible;
    }
    this.draw = function()
    {
        toolTipBG.draw();
        toolTipText.draw();
    }
}function MessageBox()
{
        var base;
        base = pjs.system.newDOM('div',true);
        base.innerHTML = `
            <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 

                <link rel="stylesheet" type="text/css" href="MessageBox/css/style.css" />


            </head>
            <body>
                    <input type="checkbox" class="fire-check" />
                    <section>

                        <div class="tn-box tn-box-color-1">
                            <p class="text" >Ваши персональные настройки были успешно сохранены!</p>
                            <div class="tn-progress"></div>
                        </div>

                    </section>
            </body>
        </html>
        `
        
    this.setText = function(text)
    {
        var div = base.getElementsByTagName('p')[0];
        div.textContent = text;
    }
    this.setShow = function(isShow)
    {
        var div = base.getElementsByTagName('input')[0];
        div.checked = isShow;
    }
    this.isShow = function()
    {
        var div = base.getElementsByTagName('input')[0];
        return div.checked;
    }
}/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.5';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g,
      reTrimStart = /^\s+/,
      reTrimEnd = /\s+$/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Gets the value at `key`, unless `key` is "__proto__".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    return key == '__proto__'
      ? undefined
      : object[key];
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });

        return result;
      }

      if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });

        return result;
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        if (isObject(srcValue)) {
          stack || (stack = new Stack);
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array == null ? 0 : array.length,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor;

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor;

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(object, sources) {
      object = Object(object);

      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;

        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];

          if (value === undefined ||
              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }

      return object;
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = (lodashFunc.name + ''),
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));
function UserAccaunt(login, pass, summ) {
    this.userLogin = login;
    this.userPass = pass;
    this.checkSumm = summ;
    this.labyrinth = ""; //текущий лаберинт
    this.gameTime = 0; //игровое время
    this.gameCoin = ""; // очки
    this.coinsArray = ""; //массив призовых объектов
    this.entrySide = "NONE";
    this.totalWH = 0;
    this.isSaved = false;
    this.gameSpasePos = "";
    this.gameObjsPos = "";
    this.copy = function (obj) {
        this.userLogin = obj.userLogin;
        this.userPass = obj.userPass;
        this.checkSumm = obj.checkSumm;
        this.labyrinth = obj.labyrinth; //текущий лаберинт
        this.gameTime = obj.gameTime; //игровое время
        this.gameCoin = obj.gameCoin; // очки
        this.coinsArray = obj.coinsArray; //массив призовых объектов
        this.entrySide = obj.entrySide;
        this.totalWH = obj.totalWH;
        this.gameSpasePos = obj.gameSpasePos;
        this.isSaved = obj.isSaved;
        this.gameObjsPos = obj.gameObjsPos

    }
    this.save = function (isGameSpaseUp, totalSeconds, field, playerInventory, gameObjects, entrySide) {
        this.labyrinth = JSON.stringify(field,function(key, value){
            return value
        },4);
        this.gameTime = totalSeconds;
        this.gameCoin = JSON.stringify(playerInventory);
        this.coinsArray = JSON.stringify(gameObjects);
        var tmpArr = [];
        for (var i = 0; i < gameObjects.length; i++) {
            tmpArr.push(gameObjects[i].__proto__.position);
        }
        this.gameObjsPos = JSON.stringify(tmpArr);
        this.isSaved = true;
        this.entrySide = entrySide;
        this.totalWH = totalWidth;
        var userID = sessionStorage.getItem("userdata")
        localMemory.saveAsObject(userID, this)
    }
    this.load = function (isGameSpaseUp, gameObjects, playerInventory, initGUI) {
        field = new Array();
        if (this.isSaved) {
            tmpField = JSON.parse(userData.labyrinth)
            tmpGameObjsPos = JSON.parse(userData.gameObjsPos);
            tmpGameObjects = JSON.parse(userData.coinsArray);
            tmpPlayerInventary = JSON.parse(userData.gameCoin);
            var roadEl = Array();
            for (var i = 0; i < tmpField.length; i++) {
                var img = tmpField[i].parent.file;
                var comm = tmpField[i].commands;
                var S = tmpField[i].code;
                var tx = tmpField[i].parent.x;
                var ty = tmpField[i].parent.y;
                var tw = tmpField[i].parent.w;
                var th = tmpField[i].parent.h;
//                if (isGameSpaseUp && this.gameSpasePos != "Up") {
//                    ty -= (height / 100 * 15)
//                }
//                if (!isGameSpaseUp && this.gameSpasePos == "Up") {
//                    ty += (height / 100 * 15)
//                }
                field.push(new fieldElement(img, comm, S, tx, ty, tw, th))
            }

            for (var i = 0; i < tmpGameObjects.length; i++) {
                var obj = new CoinBattery("coin", coinCode, tmpGameObjsPos[i], coinPath, true);
                gameObjects.push(obj)
            }
            for (var i = 0; i < tmpPlayerInventary.length; i++) {
                playerInventory.push(tmpPlayerInventary[i]);
            }
            entrySide = this.entrySide;
            totalHeight = this.totalWH;
            totalWidth = this.totalWH;
            totalSeconds = this.gameTime;
            oneTileWidth = field[0].W;
            oneTileHeight = field[0].H;
        } else {
            totalSeconds = 0;
        }
        initGUI();
        return field;

    }
}
/*
Содержит методы и данные для отрисовки графики(Графическая часть игры)
*/

var playerImageObj = null;//Картинка характеризующая игрока в графике игры

var width = game.getWH().w; // Ширина всего экрана
var height = game.getWH().h; // Высота всего экрана

pjs.system.setTitle(lang[selectLang]['game_title']); // Set Title for Tab or Window

//Обновление графики на экране
function updateScreen() {
    game.clear();
    //Отрисовываем игровое поле
    for (var i = 0; i < field.length; i++) {
        if(field[i].isInCameraStatic())
            field[i].draw();
    }
    //Отрисовываем команды на поле
    drawCommandsOnField();
    //Отрисовываем обьекты на поле
    OOP.forArr(gameObjects, function (el) {
        if(el.isInCameraStatic()) {
            el.draw();
        }
    });
    //Отрисовываем игрока
    if(playerImageObj.isInCameraStatic()) {
        playerImageObj.draw();
    }
    //Отрисовываем карту кода
    if(isVerticalScreen) {
        if (isSecondScreen) {
            codeView.drawCodeMap();
        }
    }
    else if (inputCommandStates == 0) {
        codeView.drawCodeMap();
    }
    //Отрисовываем скролы
    showCommandsMenu();
    //Отрисовываем гуи
    drawGUI();
    if(isDrawFPS) {
        brush.drawTextS({
            y:20,
            text: system.getFPS(),
            color: "lawngreen",
            size: 50
        });
    }
}

function clearAllLayers() {
    allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    game.clear();
}

//Отрисовывает команды на слое команд
function drawCommandsOnField() {
    OOP.forArr(field, function (el) {
        if(el.isInCameraStatic()) {
            //Если это дорога
            if (el.code == roadCode || el.code == entryCode) {
                //Если команда назначена
                if (el.getTotalCommands() > 0 && el.visible) {
                    var img = game.newImageObject({
                        file: COMMANDS[0].imgSource,
                        x: el.x,
                        y: el.y,
                        w: el.w,
                        h: el.h
                    });
                    img.draw();
                }
            }
        }
    });
}

//Рисует на экране меню команд
function showCommandsMenu() {
    if(!Scrolls || Scrolls.length == 0) return;
    //Отображаем скролл бары для выбора команд в клетке
    OOP.forArr(Scrolls, function (scroll) {
        scroll.DrawScrollBar();
    });
}
/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false; //Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)
var isScrollMove = false; //Флаг для того, чтобы отличать скролл от тапа
var scrolled = false; //Флаг того, что пользовател зажал тач и начал скролить
var clickCoord = new point(0, 0); //Актуальные координаты клика пользователя(даже если скролит то точка где находится палец)
var touchPoint = undefined; //Точка в которой кликнул пользователь(не обновляется как clickCoord и становится = undefined при отпускании)
var selectedItem = undefined; //Обьект в левом скроле, который передвигают или удаляют
var swapedItem = undefined; //Обьект в левом скроле с которым нужно поменять местами передвигаемый
var selItemPos = new point(-1, -1); //Буфер для хранения начальных координат элемента в левом скроле для того чтобы вернуть его обратно если его не поменяют местами с другим элементом
var touchTapTimeFlag = false; //Флаг, для отработки событий сдвига(Если пользователь нажал в точку и двигает мышкой = true)
var touchedScroll = undefined; //Буфер для хранения скрола на котором сдвигает элементы пользователь
var labIsMove = false; //Флаг для того чтобы сдвигать поле
var codeMapIsMoved = false; //Флаг для сдвига карты кода
var multiTouchDelta = -1; //Буфер для хранения элемента который сдвигают в нижнем скроле(чтобы вернуть его в исходное состояние если что)
var touchTimespan = undefined;
var toolTipTimeCounter = undefined;
//Отменяем вывод контестного меню на страничке
document.oncontextmenu = function () {
    return false
};

//Функция инициализации обработчиков ввода пользователя
function initInputEvents() {
    addEventListener("mouseup", onMouseUP);
    addEventListener("mousedown", onMouseDOWN);
    addEventListener("mousemove", onMouseMove);
    addEventListener("wheel", onWheel);
    addEventListener("touchstart", onTouchStart);
    addEventListener("touchend", onTouchEnd);
    addEventListener("touchmove", onTouchMove);
}

//Удаляем обработчики ввода пользователя со странички
function removeInputEvents() {
    removeEventListener("mouseup", onMouseUP);
    removeEventListener("mousedown", onMouseDOWN);
    removeEventListener("mousemove", onMouseMove);
    removeEventListener("wheel", onWheel);
    removeEventListener("touchstart", onTouchStart);
    removeEventListener("touchend", onTouchEnd);
    removeEventListener("touchmove", onTouchMove);
}

//Обработчики для событий ввода --------------------
function onMouseUP(e) {
    clickCoord.x = 0;
    clickCoord.y = 0;
    onUp(e);
    selectedItem = undefined;
    touchedScroll = undefined;
    touchPoint = undefined;
    touchTapTimeFlag = false;
    labIsMove = false;
    codeMapIsMoved = false;
    multiTouchDelta = -1;
    touchTimespan = undefined;
    e.cancelBubble = true;
}

function onMouseDOWN(e) {
    clickCoord.x = e.x;
    clickCoord.y = e.y;
    scrolled = false;
    //Запоминаем точку в которую кликнул пользователь
    touchPoint = new point(clickCoord.x, clickCoord.y);
    //Запоминаем время начала тапа
    touchTimespan = Date.now();
    e.cancelBubble = true;
}

function onWheel(e) {
    onRecize(e, e.deltaY, scrollStep);
    e.cancelBubble = true;
}

function onMouseMove(e) {
    onMove(e);

    if (toolTip.isVisible())
        toolTip.hideToolTip();
    toolTipTimeCounter = 0;

    clickCoord.x = e.x;
    clickCoord.y = e.y;
    e.cancelBubble = true;
}

function onTouchStart(e) {
    //isMobile = true;
    clickCoord.x = e.changedTouches[0].clientX;
    clickCoord.y = e.changedTouches[0].clientY;
    scrolled = false;
    for (var i = 0; i < Scrolls.length; i++) {
        var scroll = Scrolls[i];
        //Ищем клик по левому скролу
        if (clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
            touchedScroll = scroll;
        }
    }
    //Запоминаем точку в которую кликнул пользователь
    touchPoint = new point(clickCoord.x, clickCoord.y);
    //Запоминаем время начала тапа
    touchTimespan = Date.now();
}

function onTouchEnd(e) {
    clickCoord.x = 0;
    clickCoord.y = 0;
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    if (touch.getTouches().length == 1)
        onUp(e);
    selectedItem = undefined;
    touchedScroll = undefined;
    touchPoint = undefined;
    touchTapTimeFlag = false;
    labIsMove = false;
    codeMapIsMoved = false;
    multiTouchDelta = -1;
    touchTimespan = undefined;
}

function onTouchMove(e) {
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;

    //Если точек тача одна, то вызываем обработчик
    if (touch.getTouches().length == 1)
        onMove(e);
    else { //Если находимся в режиме ресайза тачпадом(ЕСЛИ ПОЛЬЗОВАТЕЛЬ ДВУМЯ ПАЛЬЦАМИ РЕСАЙЗИТ)
        //Получаем координаты 
        var fP = new point(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        var sP = new point(e.changedTouches[1].clientX, e.changedTouches[1].clientY);
        //Просчитываем дельту двух точек
        var delta = Math.abs(fP.y - sP.y); //Math.abs((fP.y + fP.x) - (sP.y + sP.x));
        //Если это первая итерация то просто запоминаем эту дельту, если нет - делаем ресайз
        if (multiTouchDelta == -1) multiTouchDelta = delta;
        else {
            onRecize(e, delta - multiTouchDelta, touchScrollVal);
        }
        scrolled = true;
        multiTouchDelta = delta;
        return;
    }
    clickCoord.x = e.x;
    clickCoord.y = e.y;
}

function onRecize(e, delta, step) {
    //Инитим нажатый элемент если находим его
    OOP.forArr(Scrolls, function (scroll) {
        if ((scroll.name == "LEFT" || scroll.name == "RIGHT") && clickIsInObj(e.x, e.y, scroll.GetBackGround())) {
            var itms = scroll.getArrayItems();
            OOP.forArr(itms, function (el, i) {
                if (clickIsInObj(e.x, e.y, el)) {
                    touchedScroll = scroll;
                    scrollDynamic(new point(delta * -1, delta * -1), touchedScroll);
                    return;
                }
            });
        }
    });
    if (!isSecondScreen && clickIsInObj(e.x, e.y, labView.getBackGround())) {
        labView.resizeView(delta < 0 ? -1 * step : step);
        return;
    } else if (clickIsInObj(e.x, e.y, codeView.getBackGround())) {
        //Ресайз поля работает только когда игрок не двигается
        if (!isStarted) {
            //Инициализируем карту кода
            //Проверяем надо ли совсем закрывать интерфейс ввода
            if (!field[lastClickedIndx].isStroke) {
                //codeView.createCodeMap(0, 0, lastClickedElement.commands, false, false, 1);
                codeView.resizeView(delta < 0 ? -1 * step : step, true, true);
            } else codeView.resizeView(delta < 0 ? -1 * step : step);
        }
        return;
    }
}

function onUp(e) {
    if (messageBox.isShow()) {
        messageBox.setShow(false);
        return true;
    }
    var clicked = false;
    //log(touchTapTimeFlag);
    if (!scrolled) {
        OOP.forArr(Scrolls, function (scroll) {
            if (scroll.name == "RIGHT") { //ОБРАБОТКА КЛИКОВ ПО СКРОЛ БАРУ СО СПИСКОМ КОММАНД
                //Определяем на какой элемент он КЛИКНУЛ
                OOP.forArr(scroll.getArrayItems(), function (el) {
                    if (clickIsInObj(e.x, e.y, el)) {
                        //alert("touchOn: " + touchedOnClick.toString() + " touch: " + touched.toString())
                        el.onClick(el);
                        clicked = true;
                        return;
                    }
                });
            } else if (scroll.name == "LEFT") {
                var elems = scroll.getArrayItems();
                if (clickIsInObj(e.x, e.y, scroll.GetBackGround()))
                    clicked = true;
                if (elems && elems.length > 0 && selectedItem) {
                    if (touchTapTimeFlag) { //Если перемещаем итем
                        scroll.swapItemPosition(false, selectedItem, undefined, selItemPos)
                        if (swapedItem !== undefined) {

                            var stor = findObjStorage(lastClickedElement.commands, selectedItem.command);
                            var indx1 = -1,
                                indx2 = -1;
                            OOP.forArr(stor, function (el, i) {
                                if (el == selectedItem.command)
                                    indx1 = i;
                                else if (el == swapedItem.command)
                                    indx2 = i;
                            });
                            if (indx1 != -1 && indx2 != -1) {
                                stor.move(indx1, indx2);
                                //Инициализируем карту кода
                                codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
                            }

                            scroll.swapItems(selectedItem, swapedItem);
                            swapedItem = undefined;
                        }
                    }
                }
            }
        });
        if (!clicked && !touchTapTimeFlag) { //Если клик не был обнаружен выше
            if (!allButtons.checkButtonsClicked(e))
                if (isVerticalScreen) {
                    //Если ориентация вертикальная то проверяем клики по полю только когда находимся на экране с полем
                    if (!isSecondScreen)
                        processFieldClick(e);
                    else codeView.isClicked(e);
                }
            else if (!codeView.isClicked(e))
                processFieldClick(e);
        }
    }
}

//Обработчик свайпов и скролов колесиком мышки
function onMove(e) {
    //Если точка куда пользователь кликнул отсутствует, то событие сработало ошибочно(ну вдруг)
    if (!touchPoint) return;

    var scrollSpeed = new point((e.x - clickCoord.x), (e.y - clickCoord.y));
    var scrSpMax = Math.abs(scrollSpeed.x) > Math.abs(scrollSpeed.y) ? Math.abs(scrollSpeed.x) : Math.abs(scrollSpeed.y);
    //Рассчитываем удаленность текущей точки тапа от точки старта нажатия
    var diff = Math.abs(touchPoint.x) > Math.abs(touchPoint.y) ? Math.abs(e.x - touchPoint.x) : Math.abs(e.y - touchPoint.y);
    if (diff < distanceOfScroll) return;
    //Если область в которой пользователь двигает ещё не была определено, то определеяем ее
    if (!touchTapTimeFlag) onTouchCheckMove();

    //Если пользователь двигает игровое поле
    if (labIsMove) {
        labView.elementsMove(scrollSpeed.x, scrollSpeed.y);
        return;
    }
    //Если пользователь двигает карту кода
    if (codeMapIsMoved) {
        codeView.elementsMove(scrollSpeed.x, scrollSpeed.y);
        return;
    }

    if (scrolled && touchTapTimeFlag && touchedScroll && scrSpMax > 3) { //ОБРАБОТКА ПРОКРУТКИ ПО СКРОЛЛУ
        scrollDynamic(scrollSpeed, touchedScroll);
    } else if (!scrolled && touchTapTimeFlag && touchedScroll && touchedScroll.name == "LEFT") { //ЕСЛИ ПОЛЬЗОВАТЕЛЬ ПЕРЕДВИГАЕТ ЭЛЕМЕНТЫ
        var item = touchedScroll.objectEntryC(selectedItem)
        if (selectedItem.isIntersect(touchedScroll.GetBackGround())) {
            touchedScroll.swapItemPosition(true, selectedItem, item, selItemPos)
            if (item !== undefined)
                swapedItem = item;
            //Определяем в какую сторону тащить элемент(Вверх/вниз или вправо/влево)
            //if(Math.abs(scrollSpeed.y) > Math.abs(scrollSpeed.x) && selectedItem.getPositionC().x == selItemPos.x)
            selectedItem.y += (scrollSpeed.y);
            //else if(Math.abs(scrollSpeed.x) >= Math.abs(scrollSpeed.y) && selectedItem.getPositionC().y == selItemPos.y) selectedItem.x += (scrollSpeed.x);
        }
    }
}

function onTouchCheckMove() {
    //Обходим скролы
    for (var i = 0; i < Scrolls.length; i++) {
        var scroll = Scrolls[i];
        //Ищем клик по левому скролу
        if (scroll.name == "LEFT" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
            var itms = scroll.getArrayItems();
            if (itms && itms.length > 0) {
                for (var j = 0; j < itms.length; j++) {
                    if (clickIsInObj(clickCoord.x, clickCoord.y, itms[j])) {
                        if (Date.now() - touchTimespan < touchTapTimeOut) { //Если время не вышло то вопринимаем сдвиг как прокрутку скрола
                            scrolled = true;
                        } else { //Если время вышло, то сдвиг воспринимаем как перемещение элемента
                            selectedItem = scroll.getItem(j);
                            selectedItem.setAlpha(0.7);
                            selItemPos = selectedItem.getPositionC();
                        }
                        touchedScroll = scroll;
                        touchTapTimeFlag = true;
                        return;
                    }
                }
            }
        } else if (scroll.name == "RIGHT" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
            touchedScroll = scroll;
            touchTapTimeFlag = true;
            return;
        }
    };
    var check = true;
    if (isVerticalScreen)
        if (!isSecondScreen)
            check = false;
    //Обходим codeMap
    if (clickIsInObj(clickCoord.x, clickCoord.y, codeView.backGround) && check) {
        codeMapIsMoved = true;
        touchTapTimeFlag = true;
        return;
    }
    //Если указатель в области лабиринта
    for (var i = 0; i < field.length; i++) {
        if (clickIsInObj(clickCoord.x, clickCoord.y, field[i])) {
            labIsMove = true;
            touchTapTimeFlag = true;
            return;
        }
    };
}

//Обработчики всех кликабельных элементов---------------------------
function onOkBClick() { //Вернет TRUE если надо закрыть кнопку OK
    if (infoText.isVisible()) infoText.close();
    initRightScroll([]);
    if (!isVerticalScreen) {
        inputCommandStates = 0;
        codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
        return true;
    }
    //lastClickedIndx = -1; //Очищаем индекс выбранной клетки поля
    choosenCommandInElement = undefined;
    isScrollMove = true; //ПО дефолту скролл(чтобы не было срабатываний на клик при первом отображении интерфейса ввода команд)

    //Если находимся в режиме добавления после определенной команды
    if (itemToAddAfterInCodeMap || itemToReplaceInCodeMap) {
        itemToAddAfterInCodeMap = undefined;
        itemToReplaceInCodeMap = undefined;
        //codeView.resetZoomer();
        inputCommandStates = 1;
    }
    //Проверяем надо ли совсем закрывать интерфейс ввода
    if (inputCommandStates > 0) {
        inputCommandStates = 0;
        OOP.forArr(Scrolls, function (el, i) {
            if (el.name == "LEFT")
                Scrolls.splice(i, 1);
        });
        //Инициализируем карту кода
        if (lastClickedElement)
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
        return false;
    }
    if (!isVerticalScreen) {
        initLeftScroll([]);
        //Инициализируем карту кода без возможности добавления элементов
        codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, false, false, 1, undefined, true);
        field[lastClickedIndx].setStroke(false); //Убираем выделение с поля
    } else {
        allButtons.backToStartButton.setAlpha(1);
        allButtons.stepDownButton.setAlpha(1);
        allButtons.stepUpButton.setAlpha(1);
        isSecondScreen = false;
        game.setLoop("Labyrinth");
    }
    codeView.clear();
    return true;
}

//КНОПКА СТАРТА/СТОПА
function startBClick() {
    isStarted = !isStarted;
    if (isStarted) {
        //Запоминаем время начала движения робота
        startPlayerMoveTime = totalSeconds;
        if (!isVerticalScreen)
            initLeftScroll([]);
        //Увеличиваем счетчик попыток для прохождения
        totalAttempts++;
        if (!isVerticalScreen) {
            var comms = playerCommands && playerCommands.length > 0 ? playerCommands : field[playerPozition].commands;
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, comms, undefined, undefined, passiveItemsAlpha, playerCommands[0]);
        }
        setTimeout("processRobotMove()", robotMoveDelay);
    }
    return true;
}

//КНОПКА МЕНЮ
function menuBClick() {
    clearAllLayers();
    window.location.href = 'index.html'
    return true;
}
//КНОПКА ПЕРЕЗАГРУЗКИ УРОВНЯ
function reloadBClick() {
    if (!isStarted)
        initializeGame();
    return true;
}

function labyrinthRoadClick(index) {
    //Перерисовываем кликнутый элемент
    setFocused(field[index], index);
    return true;
}

//Обработчик события показать тултип 
function toolTipShowEvent(x, y) {
    for (var i = 0; i < field.length; i++) {
        if (clickIsInObj(x, y, field[i])) {
            if (i == playerPozition) {
                toolTip.setToolTip(x, y, lang[selectLang]['tooltip_robot']);
            }
        } else if (clickIsInObj(x, y, gameObjects[i])) {
            toolTip.setToolTip(x, y, "Собирай батарейки");
        }
    }
    var codeViewImages = codeView.getAllElems();
    for (var i = 0; i < codeViewImages.length; i++) {
        if (clickIsInObj(x, y, codeViewImages[i])) {
            toolTip.setToolTip(x, y, codeViewImages[i].command.name);
        }
    }
}

function onCodeMapElementClick(element) {

    if (element.name && element.name == "plus") {
        choosenCommandInElement = element.command;
        codeView.resetZoomer();
        addCommandToCell(element, true);
        return;
    }

    choosenCommandInElement = findObjStorage(lastClickedElement.commands, element.command);
    if (!choosenCommandInElement) return;

    if (element.command.name == "blockA" || element.command.name == "whatisit" || element.command.name == "blockB" || element.command.name == "counter") {
        addCommandToCell(element, true);
        codeView.menu.closeMenu(element);
    } else {
        codeView.menu.openMenu(element, codeView);
    }
}

function onChooseCommandClick(el) {
    //ОБРАБАТЫВАЕМ КЛИК
    addCommandToCell(el);
}

//Обработчик для ввода с цифр
function onKeyboardClick(el) {
    var count = el.command.name != "backspace" ? el.command.value : -1;
    var text = choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count.toString();
    if (count != -1) { //Если элемент добавляют        
        if (text.length < 4) {
            text = text + count.toString();
        }
    } else if (text.length > 0) text = text.substring(0, text.length - 1) //Если стирают
    var parsedInt = parseInt(text);
    parsedInt = isNaN(parsedInt) ? 0 : parsedInt;
    //Инитим текст в блок итераций
    choosenCommandInElement.countBlock.count = parsedInt;
    //Задаем текст в текст бокс
    infoText.setText(text);
    // messengBox.setShow(true);
    // messengBox.setText(text);
}
//------------------------------------------------------------------

//Функция обеспечивающая динамический скролл
function scrollDynamic(speed, scrollElement) {
    if (Math.abs(speed.x) > 5 || Math.abs(speed.y) > 5) {
        if (isMobile) {
            speed.x *= 3;
            speed.y *= 3;
        }
        //ИНИЦИАЛИЗИРУЕМ ФЛАГ СКРОЛА
        isScrollMove = true;
        scrollElement.scrollUpdate(speed);
    }
}

//Обработка кликов на элемент поля
function processFieldClick(e) {
    if (field === null || field.length === 0) return false;
    //Проходим по полю и проверяем кликнули ли мы на элемент поля
    for (var i = 0; i < field.length; i++) {
        //Обрабатываем клики мышкой
        if (field[i].onClick && clickIsInObj(e.x, e.y, field[i])) {
            field[i].onClick(i);
        }
    }
    return false;
}


//Вернет true если клик был внутри координат прямоугольника obj
function clickIsInObj(x, y, obj) {
    if (obj && obj.visible != "false") {
        if (x >= obj.x && y >= obj.y)
            if (x <= obj.x + obj.w && y <= obj.y + obj.h)
                return true;
    }
    return false;
}
/*
Содержит методы и данные для алгоритмической части игры.
Описание алгоритмических блоков, используемых для построения алгоритма прохождения лабиринта
*/

//ОПИСАНИЕ ВСЕХ ВОЗМОЖНЫХ КОМАНД
var COMMANDS = new Array();
//ПРОСТЫЕ КОМАНДЫ ДЛЯ ДЕЙСТВИЙ
COMMANDS.push({
    code: '0',
    name: "none",
    imgSource: commandNoneImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '1',
    name: "up",
    imgSource: commandUpImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '2',
    name: "down",
    imgSource: commandDownImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '3',
    name: "left",
    imgSource: commandLeftImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '4',
    name: "right",
    imgSource: commandRightImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '5',
    name: "clockwise",
    imgSource: commandClockwiseImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '6',
    name: "unclockwise",
    imgSource: commandUnClockwiseImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '8',
    name: "pickup",
    imgSource: commandPickUpImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '9',
    name: "drop",
    imgSource: commandDropImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: 'C',
    name: "commandsblock",
    imgSource: commandCommandsBlockImgSrc,
    actions: [],
    undeletable: false
}); //БЛОК СОДЕРЖАЩИЙ СПИСОК КОМАНД

//БЛОК КОТОРЫЙ ОПРЕДЕЛЯЕТ ЧТО НАХОДИТСЯ ПЕРЕД РОБОТОМ
COMMANDS.push({
    code: 'W',
    name: "whatisit",
    imgSource: commandWhatIsItImgSrc, //[10]
    lookCommand: undefined,
    undeletable: false
});

//БЛОК УСЛОВИЯ, if(blockA == blockC) {actions}
COMMANDS.push({
    code: 'I',
    name: "if",
    imgSource: commandIfImgSrc, //[11]
    blockA: "0",
    blockB: "0",
    redacted: "commands", //Переменная для хранения последнего редактируемого блока(commands или else block)
    commandsBlock: undefined,
    elseBlock: undefined
});

//БЛОК ПОВТОРЕНИЯ, ПОВТОРЯЕТ действия actions count раз
COMMANDS.push({
    code: 'R',
    name: "repeat",
    imgSource: commandRepeatImgSrc,
    countBlock: undefined,
    commandsBlock: undefined, //[12]
});

//БЛОК ВЫОЛНЯЮЩИЙ ДЕЙСТВИЕ ЕСЛИ ВЫПОЛНИТСЯ УСЛОВИЕ
COMMANDS.push({
    code: 'E',
    name: "repeatif",
    imgSource: commandRepeatIfImgSrc,
    blockA: undefined,
    blockB: undefined,
    commandsBlock: undefined, //[13]
    undeletable: false
}); //БЛОК ПОВТОРЯЮЩИЙ actions пока ifBlock.result == true

//ВСПОМОГАТЕЛЬНЫЕ КОМАНДЫ, ДЛЯ СЛОЖНЫХ КОМАНД
COMMANDS.push({
    code: 'A',
    name: "blockA",
    imgSource: commandBlockAImgSrc,
    undeletable: true
}); //[14]
COMMANDS.push({
    code: 'B',
    name: "blockB",
    imgSource: commandBlockBImgSrc,
    undeletable: true
}); //[15]
COMMANDS.push({
    code: 'K',
    name: "counter",
    imgSource: commandCounterImgSrc,
    count: 0,
    undeletable: true
}); //[16]
COMMANDS.push({
    code: 'O',
    name: "ok",
    imgSource: commandOkImgSrc,
    undeletable: true
}); //[17]
//Команды для того чтобы определять направление
COMMANDS.push({
    code: 'Z',
    name: "blockA",
    dir: "lookup",
    imgSource: commandLookUpImgSrc,
    undeletable: true
}); //[18]
COMMANDS.push({
    code: 'X',
    name: "blockA",
    dir: "lookdown",
    imgSource: commandLookDownImgSrc,
    undeletable: true
}); //[19]
COMMANDS.push({
    code: 'L',
    name: "blockA",
    dir: "lookleft",
    imgSource: commandLookLeftImgSrc,
    undeletable: true
}); //[20]
COMMANDS.push({
    code: 'V',
    name: "blockA",
    dir: "lookright",
    imgSource: commandLookRightImgSrc,
    undeletable: true
}); //[21]
COMMANDS.push({
    code: 'Z',
    name: "blockA",
    dir: "lookcenter",
    imgSource: commandLookCenterImgSrc,
    undeletable: true
}); //[22]
COMMANDS.push({
    code: 'Q',
    name: "elseblock",
    imgSource: commandElseBlockImgSrc,
    actions: [],
    undeletable: true
}); //[23]
COMMANDS.push({
    code: '{',
    name: "forward",
    imgSource: commandForwardImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '}',
    name: "onleft",
    imgSource: commandOnLeftImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '[',
    name: "onright",
    imgSource: commandOnRightImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: ']',
    name: "back",
    imgSource: commandBackwardImgSrc,
    undeletable: false
});
//ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ IF
COMMANDS[11].blockA = COMMANDS[14];
COMMANDS[11].blockB = COMMANDS[15];
COMMANDS[11].commandsBlock = COMMANDS[9];
COMMANDS[11].elseBlock = COMMANDS[23];
//ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ REPEAT
COMMANDS[12].countBlock = COMMANDS[16]
COMMANDS[12].commandsBlock = COMMANDS[9];
//ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ repeatIF
COMMANDS[13].blockA = COMMANDS[14];
COMMANDS[13].blockB = COMMANDS[15];
COMMANDS[13].commandsBlock = COMMANDS[9];

function gameFieldElement(fCode, iCode) {
    this.fieldCode = fCode;
    this.itemCode = iCode;
}

//Возвращает объект, находящийся с лицевой стороны робота
function checkWhatIsIt(lookCommand, poz, field, fieldW, gameObj, orient) { //gameObj - игровой объект на этой клетке(монетка, батарейка и тд)
    var indx = poz; //Если передали неправильное направление, то просто возращаем объект на котором стоим
    switch (orient) {
        case 0: //ЕСЛИ ИГРОК СМОТРИТ ВВЕРХ
            if (lookCommand.dir == "lookup") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookright") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookdown") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookleft") indx = poz + 1; //Лево
            break;
        case 1: //ЕСЛИ ИГРОК СМОТРИТ ВПРАВО
            if (lookCommand.dir == "lookleft") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookup") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookright") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookdown") indx = poz + 1; //Лево
            break;
        case 2: //ЕСЛИ ИГРОК СМОТРИТ ВНИЗ
            if (lookCommand.dir == "lookdown") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookleft") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookup") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookright") indx = poz + 1; //Лево
            break;
        case 3: //ЕСЛИ ИГРОК СМОТРИТ НАЛЕВО
            if (lookCommand.dir == "lookright") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookdown") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookleft") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookup") indx = poz + 1; //Лево
            break;
    }
    var element = field[indx];
    var item = undefined;
    for (var i = 0; i < gameObj.length; i++)
        if (gameObj[i].position == indx) {
            item = gameObj[i];
            break;
        }

    return new gameFieldElement(element.code, item === undefined ? undefined : item.code); //ВОЗВРЩАЕМ ЭКЗЕМПЛЯР КЛАССА КОТОРЫЙ ПРЕДСТАВЛЯЕТ ЭЛЕМЕНТ
}

//Возвращает массив действий если count > 0 иначе - пустой массив
function checkConditionREPEAT(countBlock, commandsBlock) {
    if (countBlock.count > 0) {
        countBlock.count--;
        return commandsBlock.actions;
    }
    return new Array();
}

//Возвращает массив действий если условие выполнилось, или пустой массив, если условие не выполнилось
function checkConditionIF(blockA, blockB, commandsBlock, elseBlock) {
    if (blockA.name == "whatisit") {
        blockA = checkWhatIsIt(blockA.lookCommand, playerPozition, field, totalWidth, gameObjects, playerFrontSide)
    }

    if (blockB.code == coinCode) {//Если в условии выбран игровой обьект(монетка и тд)
        if (blockA.itemCode === undefined) return elseBlock ? elseBlock.actions : [];
        else if (blockA.itemCode == blockB.code) return commandsBlock.actions;
    } else {//Если выбран обьект ландшафта(стены, вход или выход)
        //Парсим в int
        var val = parseInt(blockA.fieldCode);
        val = isNaN(val) ? 0 : val;
        //Если стены внутренние то код элемента 0(Любые стены для нас пока равнозначны)
        if(val > 0 && val < 4)
            blockA.fieldCode = borderCode;
        if (blockA.fieldCode == blockB.code)
            return commandsBlock.actions;
    }
    return elseBlock ? elseBlock.actions : [];
}

//Возвращает массив классов oneCommandMenuElement, содержащий картинку команды и её код
//isOnComms - флаг для того, чтобы получить команды с передвижением по направлению взгляда
function getAllCommandsMenu(isOnComms) {
    var src = "";
    if(commandsViewMode == "simple"){
        src = ['12348'];
    }
    else if(commandsViewMode == "medium"){
        src = ['123489{}[]'];
    }
    else if(commandsViewMode == "all") {
        src = isOnComms ? ['{}[]123498REI'] : ['123498REI'];
    }
    return getCommandsMenu(src);
}

var getCommandsMenu = function(src){
    var menuItems = [];
    //Генерим структуру меню(по 4 элемента в ряд)
    levels.forStringArray({
            source: src
        },
        function (S, X, Y, W, H) {
            for (var comm in COMMANDS) {

                if (S == COMMANDS[comm].code) {

                    var obj = game.newImageObject({
                        file: COMMANDS[comm].imgSource,
                        x: X,
                        y: Y,
                        w: W,
                        h: H
                    });

                    obj.setUserData({
                        command: getCopyOfObj(COMMANDS[comm]),
                        onClick: function (el) {
                            return onChooseCommandClick(el);
                        }
                    });

                    menuItems.push(obj);
                }
            }
        });
    return menuItems;
}

function addDataToCommandsBlock(data) {

    if (lastClickedIndx == -1) return;
    //Получаем последнюю добавленную команду для редактирования
    var itm = field[lastClickedIndx].getTopCommands()[0];
    //Если сейчас редактируется REPEAT или REPEATIF то инициализируем команду COMMANDSBLOCK внутри этой команды массивом DATA
    if (itm.name == "repeat") {
        itm.actions = data;
    }
    if (itm.name == "repeatif") {
        itm.ifBlock.actions = data;
    }

}

//ПЕРЕПИСАТЬ ВЕСЬ КОД КАСАЮЩИЙСЯ ИГРОВЫХ ОБЪЕКТОВ. ОБЬЕДИНИТЬ КОДЫ ИГРОВЫХ ЭЛЕМЕНТОВ С ИХ ГРАФИЧЕСКИМ ОТОБРАЖЕНИЕМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Возвращает список всех объектов игры, доступных для взаимодействия с роботом
function getAllInteractGameObjects() {
    var allObj = new Array();
    //СТЕНА
    allObj.push(game.newImageObject({
        file: wallImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: borderCode,
            imgSource: wallImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //МОНЕТКА
    allObj.push(game.newImageObject({
        file: coinImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: coinCode,
            imgSource: coinImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //ВЫХОД
    allObj.push(game.newImageObject({
        file: exitImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: exitCode,
            imgSource: exitImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //ВХОД
    allObj.push(game.newImageObject({
        file: entryImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: entryCode,
            imgSource: entryImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //ДОРОГА
    allObj.push(game.newImageObject({
        file: groundImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: roadCode,
            imgSource: groundImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });

    return allObj;
}

//ВОЗВРАЩАЕТ МАССИВ ОБЪЕКТОВ ПРЕДСТАВЛЯЮЩИЙ НАПРАВЛЕНИЕ КУДА СМОТРЕТЬ(ДЛЯ КОМАНДЫ WHATISIT)
function getAllDirections() {
    var allObj = new Array();
    //ВЕРХ
    allObj.push(game.newImageObject({
        file: COMMANDS[18].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[18],
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //НИЗ
    allObj.push(game.newImageObject({
        file: COMMANDS[19].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[19],
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //ЛЕВО
    allObj.push(game.newImageObject({
        file: COMMANDS[20].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[20],
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //ПРАВО
    allObj.push(game.newImageObject({
        file: COMMANDS[21].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[21],
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    //ПОД НОГАМИ(ЦЕНТР)
    allObj.push(game.newImageObject({
        file: COMMANDS[22].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[22],
        onClick: function (el) {
            return onChooseCommandClick(el);
        }
    });
    return allObj;
}

//Возвращает набор изображений для заполнения команды REPEAT
function getRepeatScrollBarPattern(state, currentCountCommand) {
    var allObj = new Array();
    //Команда для счетчика
    allObj.unshift(game.newImageObject({
        file: currentCountCommand.countBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentCountCommand.countBlock)
    });
    if (state == 3) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд
    allObj.unshift(game.newImageObject({
        file: currentCountCommand.commandsBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentCountCommand.commandsBlock)
    });
    if (state == 4) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    return allObj;
}

//Возвращает набор изображений для заполнения команды REPEATIF
function getRepeatIFScrollBarPattern(state, currentIFCommand) {
    var allObj = new Array();
    //blockA
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockA.name == "whatisit" ? currentIFCommand.blockA.lookCommand.imgSource : currentIFCommand.blockA.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockA)
    });
    if (state == 1) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //blockB
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockB.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockB)
    });
    if (state == 2) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.commandsBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.commandsBlock)
    });
    if (state == 4) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    return allObj;
}

//Возвращает набор изображений для заполнения команды IF
function getIFScrollBarPattern(state, currentIFCommand) {
    var allObj = new Array();
    //blockA
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockA.name == "whatisit" ? currentIFCommand.blockA.lookCommand.imgSource : currentIFCommand.blockA.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockA)
    });
    if (state == 1) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //blockB
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockB.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockB)
    });
    if (state == 2) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.commandsBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.commandsBlock)
    });
    if (state == 4) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд ИНАЧЕ
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.elseBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.elseBlock)
    });
    if (state == 5) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    return allObj;
}

function getDigitKeyboardImages() {
    var allObj = new Array();
    //Числа от 1 до 9
    for (var i = 1; i < 10; i++) {
        allObj.unshift(game.newImageObject({
            file: commandDigitsImgSrc[i],
            x: 0,
            y: 0,
            w: 10,
            h: 10
        }));
        allObj[0].setUserData({
            command: {
                name: "digit",
                value: i
            },
            onClick: function (el) {
                return onKeyboardClick(el);
            }
        });
    }
    //0
    allObj.unshift(game.newImageObject({
        file: commandDigitsImgSrc[0],
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: {
            name: "digit",
            value: 0
        },
        onClick: function (el) {
            return onKeyboardClick(el);
        }
    });
    //backspace
    allObj.unshift(game.newImageObject({
        file: commandBackspaceImgSrc,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: {
            name: "backspace"
        },
        onClick: function (el) {
            return onKeyboardClick(el);
        }
    });
    return allObj;
}

function getCommandsImgArr(allCommands) {
    var result = [];

    OOP.forArr(allCommands, function (comm) {

        var obj = game.newImageObject({
            file: comm.imgSource,
            x: 0,
            y: 0,
            w: 15,
            h: 15
        });

        obj.setUserData({
            command: comm
        });
        result.push(obj);
    });
    return result;
}

//Возвращает копию обьекта
function getCopyOfObj(obj) {
    return _.cloneDeep(obj);
}
var isOne = true;
var isSwaped = false;
item1Pos = new point(-1, -1);
item2Pos = new point(-1, -1);

function ScrollBar(posX, posY, orientation, arr, name) {
    //Локализуем полученные данные внутри класса
    this.name = name;
    var barPositionX = posX;
    var barPositionY = posY;
    var backGroundPosX = barPositionX;
    var backGroundPosY = barPositionY;
    var backGroundW = 0;
    var backGroundH = 0;
    var barOrientation = orientation;
    var arrayForBar = arr;
    var lineCount = 1;
    var backGroundAplha = 0.31;
    var backGround = undefined;
    var indicator = undefined;
    var scrollBarCase = undefined;
    var items = undefined;
    this.itemW = 0
    var caseVisible = false;

    if (orientation == "Vertical") {
        // backGroundH = gameSpaceH - (height - gameSpaceH);
        // backGroundW = (height - gameSpaceH)*lineCount;
        backGroundH = height; // / 100 * 100;
        backGroundW = (height / 100 * 15) * lineCount;
    }
    if (orientation == "Horizontal") {
        // backGroundW = gameSpaceW - (height - gameSpaceH);
        // backGroundH = (height - (gameSpaceY+gameSpaceH))*lineCount;
        backGroundH = (height / 100 * 15) * lineCount;
        backGroundW = height / 100 * 70;
    }
    //методы для установкии получения  координат скролл скроллБара
    this.setPosition = function (x, y) {
        barPositionX = x;
        barPositionY = y;
    }

    this.getScrollBarCase = function () {
        return scrollBarCase;
    }

    this.getPositionX = function () {
        var tmpX = barPositionX;
        return tmpX;
    }

    this.swapItems = function (item1, item2) {
        var items = this.getArrayItems();
        if (items !== undefined) {
            items.move(items.indexOf(item1), items.indexOf(item2));
            //var i =  this.sortElements(this.getArrayItems(),this.GetBackGround());
            // this.setArrayItems(i)
        }
    }

    this.swapItemPosition = function (isTuped, item1, item2, selItemPos) {
        if (isTuped) { //log("тапнули позиция выделенного элемента "+ selItemPos.x)

            if (isOne && item2 !== undefined) { //log("зашли в первый раз")
                item1Pos = selItemPos;
                isOne = false;
            }
            if (item2 !== undefined) { //log("второй элемент не андефайн меняем позиции")
                item2Pos = item2.getPositionC();
                item1.setPositionC(item2Pos);
                item2.setPositionC(item1Pos);

                if (Math.floor(item2.getPositionC().y) == Math.floor(item1Pos.y)) { //log("установили новую позицию выделенному элементу")
                    item1Pos = item1.getPositionC();
                }
                isSwaped = true;
            } //else  log("второй элемент андефайн")

        } else {
            log("отпустили тап")
            if (item1Pos.y < 0) {
                log("item1Pos < 0")
                item1.setPositionC(selItemPos);
            } else {
                if (isSwaped) {
                    item1.setPositionC(item1Pos);
                    isSwaped = false;
                } else item1.setPositionC(selItemPos);
                log("item1Pos > 0 " + item1Pos.x + " selectItemPos " + selItemPos.x)
            }
            isOne = true;
            item1.setAlpha(1);
        }

    }
    this.isItemWhollyInGB = function (itemY, itemH) {
        var bg = this.GetBackGround();
        if (itemY + 10 >= bg.w && ((itemY + itemH) - 10 <= (bg.y + bg.h)))
            return true;
        else return false;
    }
    this.objectEntryC = function (obj1) {
        var item;
        var objX = Math.floor(obj1.getPositionC().y);
        var items = this.getArrayItems();
        if (items !== undefined) {
            var rectW = 20;
            OOP.forArr(items, function (el, i) {
                if (el != obj1) {
                    var elX = Math.floor(el.getPositionC().y);
                    if ((objX < elX + rectW && objX > elX - rectW)) {
                        item = el;
                    }
                }
            });
            return item;
        }
    }
    this.getPositionY = function () {
        var tmpY = barPositionY;
        return tmpY;
    }
    //
    this.setWidthScroll = function (w) {
        backGround.setWidth(w)
        items = this.sortElements(arrayForBar, this.GetBackGround());
        indicator = new Indicator(this.GetBackGround());
        this.setArrayItems(items);
    }
    this.setHeightScroll = function (h) {
        backGround.setHeight(h)
        items = this.sortElements(arrayForBar, this.GetBackGround());
        indicator = new Indicator(this.GetBackGround());
        this.setArrayItems(items);
    }
    //методы для работы с массивом элементов скролл бара
    this.setArrayItems = function (arrayItems) {
        arrayForBar = arrayItems;
    }

    this.initArrayItems = function (arrayToInit) {
        //arrayForBar = arrayToInit;
        items = this.sortElements(arrayToInit, backGround.getBackGround());
        this.setArrayItems(items);
        indicator = new Indicator(backGround.getBackGround());
    }
    this.getArrayItems = function () {
        var tmpArray = arrayForBar;
        return tmpArray;
    }
    this.AddItem = function (item) {
        if (imte.type == "ImageObject()") //проверяем тип объекта, который передали для добавления
        {
            arrayForBar.push(item);
            items = this.sortElements(arrayForBar, backGround.getBackGround());
            this.setArrayItems(items);
        } else
            log("Тип передоваемого объекта не  ImageObject()");
    }
    this.getItem = function (i) {
        if (arrayForBar.length > 0 && (arrayForBar.length - 1) >= i)
            return arrayForBar[i];
        else
            log("Всего элементов в массиве: " + arrayForBar.length + " Вы хотете получить из массива: " + i + " Элемент, правильно?");
    }
    this.removeItem = function (i) {
        if (arrayForBar.length > 0 && (arrayForBar.length - 1) >= i) {
            arrayForBar.splice(i, 1);
            items = this.sortElements(arrayForBar, backGround.getBackGround());
            this.setArrayItems(items);
        } else
            log("Всего элементов в массиве: " + arrayForBar.length + " Вы хотете удалить из массива: " + i + " Элемент, правильно?");
    }
    this.isEmptyBarArray = function () {
        if (arrayForBar === undefined || arrayForBar.length <= 0)
            return true;
        else return false;
    }
    //
    this.getIndicator = function () {
        var tmpInd = indicator;
        return tmpInd;
    }
    //Задний фон скороллбара, кнему будут привязаны элементы движения, изчезнования будут зависить от него, это не просто обычный фон, это основа бара
    function BackGround(x, y, w, h) {
        var bgX = x;
        var bgY = y;
        var bgW = w;
        var bgH = h;
        var alpha = 1;

        //      /e1edeb
        var bgColor = "#000000";
        if (orientation == "Vertical") {
            bgW *= lineCount;
        }
        if (orientation == "Horizontal") {
            bgH *= lineCount;
        }
        var tmpBackGround = game.newRoundRectObject({
            x: bgX,
            y: bgY,
            w: bgW,
            h: bgH,
            radius: 0,
            fillColor: bgColor
        });
        this.setWidth = function (w) {
            tmpBackGround.w = w;
            //       items = sortElements(arrayForBar,this.GetBackGround());
            // indicator = new Indicator(this.GetBackGround());
            // this.setArrayItems(items);
        }
        this.setHeight = function (h) {
            tmpBackGround.h = h;
        }
        this.setX = function (x) {
            tmpBackGround.x = x;
        }
        this.setY = function (y) {
            tmpBackGround.y = y;
        }
        this.setColor = function (color) {
            tmpBackGround.fillColor = color;
        }
        this.setAlphaBG = function (alph) {
            if (alph >= 0 && alph <= 1)
                tmpBackGround.setAlpha(alph);
        }
        this.getBackGround = function () {
            return tmpBackGround;
        }
        this.getActivityArea = function () {
            var area = game.newRoundRectObject({
                x: bgX,
                y: bgY - bgH,
                w: bgW + oneTileWidth,
                h: bgH * 3,
                radius: 20,
                fillColor: bgColor
            });
            return area;
        }
    }
    //кейс для скроллБара на вход получаем задний фон Скролла и левую и правую картинку дальше рисуем кейс соответствующим методом
    //внимание!! рисовать кейс для бара нужно обязательно на слове выше чем сам скроллБар
    function ScrollBarrCase(scrollBackGround, leftImg, rightImg) {
        var X = scrollBackGround.x;
        var Y = scrollBackGround.y;
        var W = scrollBackGround.w;
        var H = scrollBackGround.h;
        var LImg = leftImg;
        var RImg = rightImg;
        var tmpH = 0;
        var tmpX = 0;
        var tmpY = 0;
        var tmpW = 0;
        if (orientation == "Vertical") {
            tmpH = H;
            tmpW = W;
            tmpY = Y + H + W;
        }
        if (orientation == "Horizontal") {
            tmpH = H;
            tmpW = W;
            tmpY = Y;
        }

        this.setLeftImg = function (img) {
            /*if(img === undefined)
              img = game.newImageObject({x: 0, y: 0, h: 0, w: 0, file: nonePath});*/
            img.x = X;
            img.y = Y - tmpW;
            img.h = tmpW;
            img.w = tmpW;
            LImg = img;
        }
        this.setRightImg = function (img) {
            img.x = X;
            //scrollBackGround.h -= tmpW;
            //H = scrollBackGround.h;
            img.y = H + tmpW;
            img.h = tmpW;
            img.w = tmpW;
            RImg = img;
        }
        this.setLeftImgVisible = function (visible) {
            LImg.setVisible(visible);
        }
        this.setRightImgVisible = function (visible) {
            RImg.setVisible(visible);
        }

        this.getLeftImg = function () {
            var tmpLImg = LImg;
            return tmpLImg;
        }
        this.getRightImg = function () {
            var tmpRImg = RImg;
            return tmpRImg;
        }
        this.getImgWidth = function () {
            return tmpH;
        }
        if (LImg == undefined) {
            var tmp = game.newImageObject({
                x: 0,
                y: 0,
                h: 0,
                w: 0,
                file: nonePath
            });
            this.setLeftImg(tmp);
        } else this.setLeftImg(LImg);
        if (RImg == undefined) {
            var tmp = game.newImageObject({
                x: 0,
                y: 0,
                h: 0,
                w: 0,
                file: nonePath
            });
            this.setRightImg(tmp);
        } else this.setRightImg(RImg);

        this.DrawCase = function () {
            if (LImg != undefined)
                LImg.draw();
            if (RImg != undefined)
                RImg.draw();
        }
    }
    //индикатор который показывает сколько в скоролле элементов полоской, на вход получает задний фон скролла и по соответствии него рисует полоску
    function Indicator(scrollBackGround) {
        var X = 0;
        var Y = 0;
        var W = 0;
        var H = 0;
        var barBackGroud = undefined;
        var bar = undefined;
        var tmpW = 0;
        var tmpH = 0;

        if (orientation == "Vertical") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            tmpW = 5;
            tmpH = H;
        }
        if (orientation == "Horizontal") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            tmpW = W;
            tmpH = 5;
        }

        this.setBarAlpha = function (alpha) {
            if (indicator != undefined) {
                if (alpha >= 0 && alpha <= 1)
                    bar.setAlpha(alpha);
            }
        }
        this.setBarBackGroundAlpha = function (alpha) {
            if (barBackGroud != undefined) {
                if (alpha >= 0 && alpha <= 1)
                    barBackGroud.setAlpha(alpha);
            }
        }

        this.setBarReletion = function () {
            if (arrayForBar === undefined || arrayForBar.length == 0) return;
            if (orientation == "Horizontal")
                bar.w *= backGround.getBackGround().w / ((arrayForBar.length * (backGround.getBackGround().h / lineCount)) / lineCount);
            else if (orientation == "Vertical")
                bar.h *= backGround.getBackGround().h / ((arrayForBar.length * (backGround.getBackGround().w / lineCount)) / lineCount);
        }

        this.getBar = function () {
            if (bar != undefined)
                return bar;
        }
        this.setX = function (x) {
            bar.x = x;
            barBackGroud.x = x;
        }

        bar = game.newRoundRectObject({
            x: X,
            y: Y,
            h: H,
            w: W,
            radius: 8,
            fillColor: "red"
        });

        bar.h = tmpH;
        this.setBarReletion();
        //bar.y = Y + H - bar.h;
        if (name == "LEFT")
            bar.y = Y + H - bar.h;
        else bar.y = Y
        bar.w = tmpW;
        bar.x = (scrollBackGround.x + scrollBackGround.w) - bar.w;
        if (orientation == "Horizontal")
            barBackGroud = game.newRoundRectObject({
                x: scrollBackGround.x,
                y: bar.y,
                h: tmpH,
                w: tmpW,
                radius: 8,
                fillColor: "#ffba42"
            });
        else barBackGroud = game.newRoundRectObject({
            x: bar.x,
            y: Y,
            h: tmpH,
            w: tmpW,
            radius: 8,
            fillColor: "#ffba42"
        });

        this.DrawIndicator = function () {
            if (arrayForBar != undefined) {
                if (barOrientation == "Vertical") {
                    var tmp = (backGround.getBackGround().w / lineCount) * arrayForBar.length / lineCount; //видемые элементы, если больше то врубаем скролл
                    if (tmp > backGround.getBackGround().h) {
                        barBackGroud.draw();
                        bar.draw();
                    }
                } else {
                    var tmp = (backGround.getBackGround().h / lineCount) * arrayForBar.length / lineCount; //видемые элементы, если больше то врубаем скролл
                    if (tmp > backGround.getBackGround().w) {
                        barBackGroud.draw();
                        bar.draw();
                    }
                }
            }
        }
    }

    this.setLineCount = function (count) {
        lineCount = count;
        backGround = new BackGround(backGroundPosX, backGroundPosY, backGroundW, backGroundH);
        items = this.sortElements(arrayForBar, backGround.getBackGround());
        indicator = new Indicator(backGround.getBackGround());
        this.setArrayItems(items);
        backGround.setAlphaBG(backGroundAplha);
        this.scrollUpdate(0);
    }
    this.getLineCount = function () {
        var tmpCount = lineCount;
        return tmpCount;
    }
    this.scrollToEnd = function () {
        if (arrayForBar !== undefined) {
            var BGRx = backGround.getBackGround().y + backGround.getBackGround().h;
            var lastItemRx = arrayForBar[0].y + arrayForBar[0].h;
            var dw = 0;
            if (BGRx !== undefined && lastItemRx !== undefined) {
                if (lastItemRx > BGRx) {
                    dw = lastItemRx - BGRx;
                    OOP.forArr(arrayForBar, function (el) {
                        el.move(point(0, -dw));
                        if (el.isIntersect(backGround.getBackGround())) {
                            el.setVisible(true);
                        } else el.setVisible(false)
                    });
                }
            }
        }
    }
    this.sortElements = function (array, scrollBackGround) {
        if (array === undefined || array.length <= 0)
            return;
        var X = 0;
        var Y = 0;
        var W = 0;
        var H = 0;
        var oldX = 0;
        var oldY = 0;
        var tmpH = 0;
        var tmpX = 0;
        var bgW = scrollBackGround.w;
        var bgH = scrollBackGround.h;
        var scrollLineCount = lineCount;
        var sortArr = array;
        var arrMediana = Math.ceil(sortArr.length / scrollLineCount);
        var itemHW = 0;
        if (orientation == "Vertical") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            if (this.name != "LEFT") {
                if (!isVerticalScreen)
                    scrollBackGround.h = (gameSpaceX + gameSpaceH) - 1;
            }
            tmpH = W;
            //  tmpH =  (gameSpaceY+gameSpaceH)- (height / 100 * 15)
            oldX = Y;
            oldY = X;
            tmpX = Y;
        }
        if (orientation == "Horizontal") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            tmpH = H;
            oldX = X;
            oldY = Y;
            tmpX = X;
        }
        //считываем сколько процентов размер беграунда составляет от общего размера, делим на 10 и берем по меньшей части через floor это и будет количество строк элементов
        if (tmpH >= (height / 100 * 40)) {
            //if(!isVerticalScreen)
            //{
            var d = tmpH * 100 / width;
            if (!isVerticalScreen)
                d = Math.floor(d / 10);
            else d = Math.floor(d / 20);
            scrollLineCount = d;
            lineCount = d;
            //}
            arrMediana = Math.ceil(sortArr.length / scrollLineCount);
        }
        itemHW = tmpH / scrollLineCount;
        this.itemW = itemHW;
        //
        var iter = 0;
        var rowCount = 1;
        OOP.forArr(sortArr, function (el, i) {
            iter++;
            el.w = itemHW;
            el.h = itemHW;
            if (orientation == "Vertical") {
                el.x = oldY;
                el.y = oldX;
                if (iter % scrollLineCount == 0) {
                    rowCount++;
                    oldY = X - itemHW;
                    oldX += itemHW
                    iter = 0;
                }
                oldY += itemHW;
                if (lineCount > 1) {}
            } else {
                el.x = oldX;
                el.y = oldY;
                oldX += itemHW;
            }
            if (el.isIntersect && !el.isIntersect(backGround.getBackGround())) {
                el.setVisible(false);
            }
        });
        return sortArr;
    }
    this.GetBackGround = function () {
        if (backGround != undefined) {
            return backGround.getBackGround();
        }
    }
    //ВОЗВРАЩАЕТ ОБЛАСТЬ ВОКРУГ ЗАДНЕГО ФОНА СКРОЛА
    this.GetActivityArea = function () {
        if (backGround != undefined) {
            return backGround.getActivityArea();
        }
    }

    this.getOrientation = function () {
        var tmpOrin = barOrientation;
        return tmpOrin;
    }

    this.setCaseVisible = function (visible) {
        if (lineCount == 1) {
            if (visible) {
                if (orientation == "Vertical") {
                    backGround.setY(backGroundPosY + backGroundW);
                }
                if (orientation == "Horizontal") {
                    backGround.setX(backGroundPosX + backGroundH);
                }
                scrollBarCase = new ScrollBarrCase(this.GetBackGround());
                items = this.sortElements(arrayForBar, this.GetBackGround());
                indicator = new Indicator(this.GetBackGround());
                this.setArrayItems(items);
                caseVisible = true;
            } else {
                caseVisible = false;
            }
        }
    }

    this.isCaseVisible = function () {
        return caseVisible;
    }

    backGround = new BackGround(backGroundPosX, backGroundPosY, backGroundW, backGroundH);
    if (arrayForBar != undefined) {
        items = this.sortElements(arrayForBar, this.GetBackGround());
        indicator = new Indicator(this.GetBackGround());
        this.setArrayItems(items);
    }
    backGround.setAlphaBG(backGroundAplha);

    this.scrollUpdate = function (scrollVal) {
        if (!this.isEmptyBarArray()) {
            var rXElLast = arrayForBar[0].x + arrayForBar[0].w; // координаты правого верхнего по Х  угла 0 элемент
            var rYElLast = arrayForBar[0].y + arrayForBar[0].w;
            var FrsElemX = arrayForBar[arrayForBar.length - 1].x;
            var FrsElemY = arrayForBar[arrayForBar.length - 1].y;
            var rXBG = backGround.getBackGround().x + backGround.getBackGround().w; // координаты правого верхнегопо Х заднего
            var rYBG = backGround.getBackGround().y + backGround.getBackGround().h;
            var dx = 0;
            var dy = 0;
            var ctxtW = (arrayForBar.length / lineCount) * arrayForBar[0].w;
            var ctxtH = arrayForBar.length / lineCount * arrayForBar[0].w;
            indicator.setBarAlpha(1);
            this.lastElRX = rXElLast;
            this.fristElX = FrsElemX;
            //обход всех дочерных элементов (графические элементы меню)
            OOP.forArr(arrayForBar, function (el) {
                if (barOrientation === "Horizontal") {
                    if (scrollVal.x > 0) {
                        if (FrsElemX < backGround.getBackGround().x) {
                            dx = scrollVal.x * scrollSpeed;
                            if (FrsElemX + dx > backGround.getBackGround().x) {
                                dx = 0;
                            }
                        }
                    } else if (scrollVal.x < 0) {
                        if (rXElLast >= rXBG) {
                            dx = scrollVal.x * scrollSpeed;
                            if (rXElLast + dx < rXBG) {
                                var dSpeed = rXBG - (rXElLast + dx)
                                dx = 0;
                            }
                        }
                    }
                    el.x += dx; // перемещаем элементы по Х с динамической скорость
                    if (el.isIntersect(backGround.getBackGround())) {
                        el.setVisible(true);
                    } else el.setVisible(false)
                } else {
                    if (scrollVal.y > 0) {
                        if (FrsElemY < backGround.getBackGround().y) {
                            dy = scrollVal.y * scrollSpeed;
                            if (FrsElemY + dy > backGround.getBackGround().y) {
                                dy = 0;
                            }
                        }
                    } else if (scrollVal.y < 0) {
                        if (rYElLast >= rYBG) {
                            dy = scrollVal.y * scrollSpeed;
                            if (rYElLast + dy < rYBG) {
                                var dSpeed = rYBG - (rYElLast + dy);
                                dy = 0;
                            }
                        }
                    }
                    el.y += dy;

                    if (el.isIntersect(backGround.getBackGround())) {
                        el.setVisible(true);
                    } else el.setVisible(false)
                    //            if(el.y < backGround.getBackGround().y)
                    //                {
                    //                    el.transparent(-0.1)
                    //                }
                    //            if((el.y+el.h) > backGround.getBackGround().y + backGround.getBackGround().h)
                    //                {
                    //                    el.transparent(-0.1)
                    //                }
                }
            });


            indicator.getBar().x += (this.GetBackGround().w / 100) * -((dx / ctxtW) * 100);
            indicator.getBar().y += (this.GetBackGround().h / 100) * -((dy / ctxtH) * 100);
        }
    }


    this.DrawScrollBar = function () {
        this.GetBackGround().draw();
        if (arrayForBar != undefined) {
            OOP.forArr(arrayForBar, function (el) {
                if(el.isInCameraStatic()) {
                    el.draw();
                }
            });
            indicator.DrawIndicator();
        }
        if (this.isCaseVisible()) {
            scrollBarCase.DrawCase();
        }
    }
}
function Label(x,y,text)
{
    var X = x;
    var Y = y;
    var textLoc = text;
    var wl=10;
    var hl=10;
    var sizel;
    var colorl = "red";
    var textObj = game.newTextObject({x : X,y : Y,h : hl, w: wl, text : textLoc, size: sizel, color : colorl});

    this.getTextObject = function()
    {
        if(textObj !== undefined)
            return textObj;
        else return -1;
    }
    this.setText= function(text)
    {
        textLoc = text;
        textObj.text = textLoc;
    }
    this.setTextSize = function(sizel)
    {
        size = sizel;
        textObj.size = sizel;
    }
    this.setTextColor = function(colorll)
    {
        colorl = colorll;
        textObj.color = colorl;
    }
    this.setTextPosition = function(x,y)
    {
        X = x;
        Y = y;
        textObj.x = X;
        textObj.y = Y;
    }
    this.textDraw = function()
    {
        if(textObj !== undefined)
            textObj.draw();
        else return -1;
    }
    this.getObj = function()
    {
        return textObj;
    }
    this.setWAndH = function(w,h)
    {
        wl =w;
        hl = h;
        textObj.w = wl;
        textObj.h = hl;
    }
}
function Dialog()
{
    var bgW = width/100 * 20;
    var bgH = height/100 * 10;
    var bgX = width/2 - (bgW/2);
    var bgY = height/2 - (bgH/2);
    var text = lang[selectLang]['dialog_delete'];
    var bg = game.newRoundRectObject(   { 
     x : bgX, 
     y : bgY, 
     w : bgW, 
     h : bgH, 
     radius : 5, 
     fillColor : "#f6db7b",
     visible : false,
   });
    //bgX+bgW/2 - (bgH/100*50)
    var dialogText = game.newTextObject(   { 
     x : bgX+2, 
     y : bgY+2, 
     text : text, 
     size : bgH/100*28, 
     color : "#000000", 
     visible : false,
   });
    
    this.dialogOkButton = new PushButton();
    this.dialogCancelButton = new PushButton();
    
    allButtons.buttonsArr.push(this.dialogOkButton);
    allButtons.buttonsArr.push(this.dialogCancelButton);
    
    this.dialogOkButton.setSetting(bgX+bgW - (bgH/100*60*2) ,bgY+bgH-(bgH/100*60), bgH/100*60, bgH/100*60)
    this.dialogOkButton.setButtonImgSrc(buttonDialogImgSrc);
    this.dialogOkButton.setVisible(false);
    
    this.dialogCancelButton.setSetting(this.dialogOkButton.x+this.dialogOkButton.w, bgY+bgH-(bgH/100*60), bgH/100*60, bgH/100*60)
    this.dialogCancelButton.setButtonImgSrc(buttonDeleteImgSrc);
    this.dialogCancelButton.setVisible(false);
    
    
    this.dialogOkButton.setUserData({
        onClick: function (el) {
            lastClickedElement.commands.splice(0);
            setFocused(field[lastClickedIndx],lastClickedIndx);
            dialog.setShowDialog(false);
        }
    });
    this.dialogCancelButton.setUserData({
        onClick: function (el) {
            dialog.setShowDialog(false);
        }
    });
    
    
    
    this.dialogDraw = function()
    {
        bg.draw();
        dialogText.draw();
    }
    
    this.setShowDialog = function(isShow)
    {
        bg.setVisible(isShow);
        dialogText.setVisible(isShow);
        this.dialogCancelButton.setVisible(isShow);
        this.dialogOkButton.setVisible(isShow);
    }
}//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними

var timerText = null; //текст таймера
var progressText = null; // количество ходов
var inputCounterText = null; //Текстовое поле для ввода чисел

var menuItemH = 0; // стандартная высота элемента меню
var menuItemW = 0; // стандартная ширина элемента меню
var textbackGroundItem = null; //задний фон текстов
var codeMapBG = undefined;
var scrollSpeed = 0.5;
var clockItem = undefined;
var coinItem = undefined;
var allButtons = undefined; //Класс для всех кнопок
var Scrolls = new Array(); // массив всех скролбаров
var infoText = undefined;
var toolTip = new ToolTip();
var messageBox = new MessageBox();

//Отрисовывает элементы интерфейса
function drawGUI() {
    //Отрисовываем кнопки
    //Отрисовываем текстовые поля
    textbackGroundItem.draw();
    updateTextOnGui();
    timerText.textDraw();
    progressText.textDraw();
    coinItem.draw();
    clockItem.draw();
    infoText.draw();
    dialog.dialogDraw();
    if(toolTip.isVisible()) toolTip.draw();
    if (inputCounterText !== null) inputCounterText.draw();
    //Отрисовываем интерфейс выбора команд
    //showCommandsMenu();
    allButtons.ButtonsDraw();
}


function initGUI() { //поочередность иницилизаии ОБЯЗАТЕЛЬНА для правильного расположения меню
    menuItemH = (height / 100) * 8;
    menuItemW = (width / 100) * 8;
    allButtons = new Buttons();
    dialog = new Dialog();
    infoText = new TextWithBG(gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH);
    timerTextInit();
    progressTextInit();
    textbackGroundInit("#000000", 0);
    codeMapBackGroundInit("#000000", 0.4)
    if (!isVerticalScreen) {
        //ИНИЦИАЛИЗИРУЕМ ИНТЕРФЕЙС РЕДАКТОРА КОМАНД
        if (Scrolls.length == 0) {
            Scrolls = new Array();
            initLeftScroll([]);
        }
    }
}

//Обновляет запись об общем колличестве команд на поле
function updateTextOnGui() {
    //Смотрим сколько комманл уже есть на поле
    var totalCommands = getTotalCommandsOnField();
    //Обновляем текст об этом
    progressText.setText(playerInventory.length);
    //Обновляем инфу о времени
    var min = Math.floor(totalSeconds / 60);
    var sec = totalSeconds - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timerText.setText((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec))
}


function timerTextInit() {
    clockItem = game.newImageObject({
        x: gameSpaceX,
        y: 0,
        w: gameSpaceW / 100 * 4,
        h: gameSpaceW / 100 * 4,
        file: clockPath
    })
    timerText = new Label(0, 0, "00:00");
    timerText.setTextPosition((clockItem.x + clockItem.w) + 5, 0);
    timerText.setTextSize(clockItem.w);
    timerText.setTextColor(guiTextColor);
}

function progressTextInit() {
    coinItem = game.newImageObject({
        x: timerText.getObj().x + timerText.getObj().w * 4,
        y: 0,
        w: gameSpaceW / 100 * 4,
        h: gameSpaceW / 100 * 4,
        file: coinPath
    })
    progressText = new Label(0, 0, "00");
    progressText.setTextPosition(coinItem.x + coinItem.w + 5, 0);
    progressText.setTextSize(coinItem.w);
    progressText.setTextColor(guiTextColor);
}

function textbackGroundInit(color, alpha) {
    textbackGroundItem = game.newRoundRectObject({
        x: gameSpaceX,
        y: 0,
        w: (gameSpaceW),
        h: gameSpaceW / 100 * 4,
        radius: 0,
        fillColor: color
    });
    textbackGroundItem.setAlpha(alpha);
}

function codeMapBackGroundInit(color, alpha) {
    if (!isVerticalScreen) {
        codeMapBG = game.newRoundRectObject({
            x: (gameSpaceX + gameSpaceW),
            y: 0,
            w: (width - (gameSpaceX + gameSpaceW)),
            h: height,
            radius: 0,
            fillColor: color
        });
        codeMapBG.setAlpha(alpha);
    } else if (isSecondScreen) {
        gameSpaceH = gameSpaceW;
        if (inputCommandStates > 0) {
            codeMapBG = game.newRoundRectObject({
                x: height / 100 * 15,
                y: textbackGroundItem.h,
                w: width - (height / 100 * 15),
                h: allButtons.getPosition().y - textbackGroundItem.h,
                radius: 0,
                fillColor: color
            });
        }
        else{
            codeMapBG = game.newRoundRectObject({
                x: 0,
                y: textbackGroundItem.h,
                w: width,
                h: allButtons.getPosition().y - textbackGroundItem.h,
                radius: 0,
                fillColor: color
            });
        }
        codeMapBG.setAlpha(alpha);
    }
}

function initRightScroll(initArray) {
    var isDel = false;
    if (!initArray || initArray.length == 0) {
        isDel = true;
    }
    var found = -1;
    OOP.forArr(Scrolls, function (scroll, i) {
        //Ищем верхний скролл
        if (scroll.name == "RIGHT") {
            if (isDel)
                Scrolls.splice(i, 1);
            else found = i;
            return;
        }
    });
    if (isDel){
        //inputCommandStates = 0;
        //Показываем кнопку старт или стоп
        if(!isVerticalScreen)
            allButtons.mainButton.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
        return;
    }
    if (found == -1) {
        if (!isVerticalScreen) {
            //Инииализируем скролл БАР ВСЕХ КОМАНД(ПРАВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
            Scrolls.push(new ScrollBar(gameSpaceX + gameSpaceW, 0, "Vertical", initArray, "RIGHT"));
            Scrolls[Scrolls.length - 1].setLineCount(2);
            Scrolls[Scrolls.length - 1].setWidthScroll(width - (gameSpaceX + gameSpaceW))
            Scrolls[Scrolls.length - 1].setHeightScroll(height); //gameSpaceX+gameSpaceH);
        } else {
            Scrolls.push(new ScrollBar(height / 100 * 15, textbackGroundItem.h, "Vertical", initArray, "RIGHT"));
            //Scrolls[Scrolls.length - 1].setLineCount(1);
            Scrolls[Scrolls.length - 1].setWidthScroll(width - Scrolls[Scrolls.length - 1].GetBackGround().x)
            Scrolls[Scrolls.length - 1].setHeightScroll(allButtons.getPosition().y - textbackGroundItem.h); //gameSpaceX+gameSpaceH);
        }
        found = Scrolls.length - 1;
    }
    Scrolls[found].initArrayItems(initArray);
    Scrolls[found].scrollUpdate(0);
    //Очищаем массив codeView при инициализиации скрола
    if (codeView && codeView.elems.length > 0) codeView.clear();
    //Показываем кнопку ok
    allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
    allButtons.deleteButton.setVisible(false);
}

//Возвращает графическое представление ЛЕВОГО БОКОВОГО СКРОЛА которое соответствует текущему состоянию в интерфейсе
function initLeftScroll(initMass) {
    //Берем верхнюю команду из стека редактора вложенных комманд
    //Если стек пуст - инициализируем меню редактором скриптов в клетке
    //ИНИЦИАЛИЗИРУЕМ СКРОЛЛ БАР СТЕКА ВЛОЖЕННЫХ КОМАНД(ЛЕВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
    var isDel = false;
    if (!initMass)
        isDel = true;
    var found = -1;
    OOP.forArr(Scrolls, function (el, i) {
        if (el.name == "LEFT") {
            if (isDel) {
                Scrolls.splice(i, 1);
            } else {
                el.initArrayItems(initMass);
                found = i;
                el.scrollToEnd();
                if (initMass.length == 0)
                    isDel = true;
            }
            return;
        }
    });
    if (isDel) return;
    if (found == -1) {
        if (isVerticalScreen) {
            Scrolls.push(new ScrollBar(0, textbackGroundItem.h, "Vertical", initMass, "LEFT"));
            found = Scrolls.length - 1;
            Scrolls[found].setHeightScroll(allButtons.getPosition().y - textbackGroundItem.h);
        } else {
            Scrolls.push(new ScrollBar(0, 0, "Vertical", initMass, "LEFT"));
        }
    }
}

function TextWithBG(X, Y, W, H) { //класс для рисования текста с задним фоном, первоначально была разработана для того чтобы над лаберинтом выводить цифры введенные в блоки цикла по количеству
    var textSize = height/100*30;
    var _radius = 0;
    var alphaBG = 0.7;
    var textColor = "#ffffff"
    var BGcolor = "#000000"
    var BG = game.newRoundRectObject({
        x: X,
        y: Y,
        w: W,
        h: H,
        radius: _radius,
        fillColor: BGcolor
    })
    var textX = (BG.x + BG.w / 2) - textSize / 2;
    var textY = (BG.y + BG.h / 2) - textSize / 2;
    var text = game.newTextObject({
        x: textX,
        y: textY,
        text: "test",
        color: textColor,
        size: textSize,
        alpha: 1
    })
    BG.setAlpha(alphaBG)
    BG.setVisible(false)
    text.setVisible(false)

    this.isVisible = function () {
        return text.visible;
    }

    this.draw = function () {
        BG.draw();
        text.draw();
    }
    this.getText = function () {
        return text.text;
    }
    this.setText = function (t) {
        text.text = t;
        var sz = height/100*30;
        text.size = sz
        text.x = (BG.x + BG.w / 2) - text.w + textSize - text.x / 2;
        text.y = (BG.y + BG.h / 2) - text.h / 2;
        BG.setVisible(true)
        text.setVisible(true)
    }
    this.close = function () {
        BG.setVisible(false)
        text.setVisible(false)
    }
}
function GameObject(NAME, TYPE, LOCATION, IMAGE) { // основной класс, который наследуеться от ImageObject
    //внем описаны все общие методы для игровых объектов

    //Индекс элемента field к которому обьект привязан
    this.position = LOCATION;
    //Название объекта
    this.name = NAME;
    //Его код для логической части игры
    this.code = TYPE;
    //Указываем в качестве родителя ImageObject
    this.__proto__ = game.newImageObject({
        file: IMAGE,
        x: field[this.position].x,// + field[this.position].w / 4,
        y: field[this.position].y, //+ field[this.position].h / 4,
        w: field[this.position].w,/// 2,
        h: field[this.position].h// / 2,
    });

    this.setImage = function (img) {
        this.file = img;
    }
    this.setNewPosition = function (pos) {
        this.position = pos;
        this.setSize(field[this.position]);
        this.setVisible(field[this.position].visible);
    };
    this.getPositionInField = function () {
        if (this.position !== undefined)
            return this.position;
    }
    
    this.getImageObj = function(){
        return this.__proto__;
    }
    
    this.setSize = function (imgObj) {
        this.x = imgObj.x,
        this.y = imgObj.y,
        this.w = imgObj.w,
        this.h = imgObj.h
    }

}

function CoinBattery(NAME, TYPE, LOCATION, IMAGE, isROTATE) {
    var isRotate = isROTATE;
    var parent = new GameObject(NAME, TYPE, LOCATION, IMAGE);
    this.__proto__ = parent;

    this.startRotation = function () {
        this.startRotating(50, 2);
    }
    //Запускает анимацию вращения монетки
    this.startRotating = function (speed, angle) {
        isRotate = true;
        setTimeout(rotate, speed, angle, this, speed);
    };
    
    this.stopRotating = function(){
        isRotate = false;
    }

    function rotate(angle, obj, speed) {
        if (isRotate) {
            obj.angle += angle;
            setTimeout(rotate, speed, angle, obj, speed);
        }
    }
    this.startRotation();
}
/*Содержит методы и данные для работы с картой лабиринта и его генерации.
 */

var roadCode = '7'; //Представление элемента дороги в виде числа
var borderCode = '0'; //Представление элемента внешних стенок в виде числа
var entryCode = '8'; //Представление элемента входа в лаюиринт в виде числа
var exitCode = '9'; //Представление элемента выхода из лабиринта в виде числа
var wallCode = '1'; //Всего доступно 3 типа стенок внутри игры КОДЫ 1,2,3
//Коды игровых предметов
var coinCode = '4'; //КОД МОНЕТКИ

//Массив содержащий игровые код всех игровых элементов
var allGameItemsCode = [roadCode, borderCode, coinCode, exitCode, entryCode, wallCode];

//Разрешение одного тайла на поле
var oneTileWidth = 100;
var oneTileHeight = 100;
//Переменная для хранения бинарного представления поля
var binMap = null;
//Массив хранящий игровые объекты(монетки)
var gameObjects = new Array();

var entrySide = "NONE" //Хранит местоположение входа в лабиринте - необходимо для инициализации робота

var field = new Array(); //Массив хранящий экземпляры fieldElement, представляющие элементы поля

//Класс описывающий элемент поля. Содержит в себе элементы для графической части, и массив команд.
function fieldElement(imgSource, comm, elemcode, fx, fy, fw, fh) {
    //Параметры элемента
    this.code = elemcode;
    this.commands = comm;
    this.commandsImgs = undefined;
    this.isCommandsReaded = false;
    this.isStroke = false;

    //Объекты изображений
    //Объект который хранит графическое представление элемента с исходным изображением
    //var this.__proto__ = newImageObj(this.imgSrc, fx, fy, fw, fh);
    this.__proto__ = newImageObj(imgSource, fx, fy, fw, fh);
    this.parent = this.__proto__;

    //Добавляем обработчик на клик если этот элемент дорога либо вход
    if (this.code == roadCode || this.code == entryCode) {
        this.setUserData({
            onClick: function (index) { //index - индекс элемента в массиве где он хранится
                return labyrinthRoadClick(index)
            }
        });
    }

    //Задает полностью новое изображение для элемента
    this.setNewImageSrc = function (src) {
        this.__proto__.file = imgPath;
    }

    //Задает файл с картинкой элемента
    this.setNewSourceImage = function (imgPath) {
        this.imgSrc = imgPath;
        this.__proto__ = newImageObj(this.imgSrc, this.__proto__.x, this.__proto__.y, this.__proto__.w, this.__proto__.h);
    }

    //Задает размер элемента
    this.setNewSize = function (x, y, w, h) {
        this.__proto__.x = x;
        this.__proto__.y = y;
        this.__proto__.w = w;
        this.__proto__.h = h;
    }

    //Возвращает текущее графическое представление элемента по исходному изображению
    this.getImageObject = function () {
        return this.__proto__;
    }

    //Отрисовывает элемент на экране
    this.draw = function () {
        this.__proto__.draw();
        if (this.__proto__.strokeWidth !== 0) {
            this.__proto__.drawStaticBox();
        }
    }

    //Задает наличие выделения элемента.(Нужно для отображения когда добавляем команды на поле)
    this.setStroke = function (isStroke) {
        this.isStroke = isStroke;
        if (this.isStroke) {
            this.__proto__.strokeWidth = 100;
        } else {
            this.__proto__.strokeWidth = 0;
        }
    }
    //Возвращает массив ImageObject-ов элементов команд по заданному index из стека
    this.getCommandsImagesArr = function () {
        var result = [];
        OOP.forArr(this.commands, function (comm) {

            var obj = game.newImageObject({
                file: comm.imgSource,
                x: 0,
                y: 0,
                w: 15,
                h: 15
            });

            obj.setUserData({
                command: comm
            });
            result.push(obj);
        });
        return result;
    }

    //Возвращает общее число команд в этом элементе
    this.getTotalCommands = function () {
        return this.commands.length;
    }

    //Удаляем indexElem элемент из indexMass массива
    this.removeCommand = function (indexElem) {
        //Потому что индексация в графике идет с начала списка, а тут - с конца
        var indx = this.commands.length - 1 - indexElem;
        //log("Индекс в командах : " + indx);
        //Удаляем элемент
        this.commands.splice(indx, 1);
    }

    //Полностью очищает стек команд элемента
    this.commandsClear = function () {
        this.commands = new Array();
    }

    this.getTopCommand = function (isRead) {
        if (this.commands[0]) {
            var result = this.commands.length - 1;
            if (isRead !== undefined && isRead)
                if (isRead !== undefined && isRead) {
                    if (this.isCommandsReaded && this.code != entryCode) return undefined;
                    this.isCommandsReaded = true;
                }
            return result;
        }
    }

    //Если isDelete = true - то он удаляется
    this.getCommands = function (isRead) {
        //Если флаг не поставлен то просто возвращаем команды
        if (!isRead) return this.commands;
        //Если читаем команды с флагом, то надо пометить что они уже были считаны
        if (this.isCommandsReaded) return [];
        //Помечаем считанные команды
        this.isCommandsReaded = true;
        return this.commands;
    }

    //Добавляет elem в массив комманд
    this.addCommand = function (elem) {
        if (this.commands) {
            this.commands.push(elem);
        }
    }

    //comms - массив ImageObjectов с данными в commands
    this.addCommands = function (comms, isClear) {
        if (isClear) //Если удаляем предыдущие элементы
            this.commands = new Array();
        for (var i = 0; i < comms.length; i++)
            this.commands.unshift(comms[i].command);
    }

    //Создает новый ImageObject этого элемента - приватный метод
    function newImageObj(src, X, Y, W, H) {
        var res = game.newImageObject({
            file: src,
            x: X,
            y: Y,
            w: W,
            h: H
        });
        res.file = src;
        return res;
    }
}

//Перерасчитывает размеры существующего поля
function calcField(w, h, x, y, elemsInLine, elemsInColumn) {

    oneTileWidth = w / elemsInLine; //Расчет ширины одного элемента
    oneTileHeight = h / elemsInColumn; //Расчет высоты одного элемента
    //Обходим все элементы лабиринта
    pjs.levels.forStringArray({
            w: oneTileWidth,
            h: oneTileHeight,
            source: binMap
        },
        function (S, X, Y, W, H) {
            //Извлекаем старый элемент
            var element = field.shift();
            var img = element.imgSrc;
            var comm = element.commands;
            //На его место добавляем новый
            var newElem = new fieldElement(img, comm, S, X + x, Y + y, oneTileWidth, oneTileHeight);
            if (element.this.__proto__ectSource.strokeWidth != 0)
                newElem.setStroke(true);
            field.push(newElem);
        });
    if (gameObjects !== undefined)
        for (var i = 0; i < gameObjects.length; i++)
            gameObjects[i].setSize(field[gameObjects[i].position]);
}

//Смещает всю карту в нужный размер
function calcMapPosition() {
    oneTileWidth = gameSpaceW / totalWidth; //Расчет ширины одного элемента
    oneTileHeight = gameSpaceH / totalHeight; //Расчет высоты одного элемента
    var poz = new point(gameSpaceX, gameSpaceY);
    var counter = 0;
    //Обходим все элементы поля
    for (var i = field.length - 1; i > -1; i--) {
        field[i].setNewSize(poz.x, poz.y, oneTileWidth, oneTileHeight);
        counter++;
        //Если надо сместить координаты на строку вниз
        if (counter == totalWidth) {
            poz.x = gameSpaceX;
            poz.y += oneTileHeight;
            counter = 0;
        } else poz.x += oneTileWidth; //Если это следующий элемент в строке поля
    }
}

function generateMap(w, h, x, y, elemsInLine, elemsInColumn, isNewGraphic) {
    isNewGraphic = isNewGraphicLab;
    oneTileWidth = w / elemsInLine; //Расчет ширины одного элемента
    oneTileHeight = h / elemsInColumn; //Расчет высоты одного элемента
    //Получаем массив сгенерированного поля
    binMap = genBin(elemsInColumn, elemsInLine, [], [], [0, 0]);
    var newGraphicMap = undefined;
    if(isNewGraphic){
        log(binMap);
        newGraphicMap = graphicsMapSort(binMap);
        log(newGraphicMap);
    }
    var codes = new Array();
    var indx = 0;
    //Обходим каждый элемент сгенерированного поля и создаем объекты характеризующие элементы поля
    pjs.levels.forStringArray({
            w: oneTileWidth,
            h: oneTileHeight,
            source: binMap
        },
        function (S, X, Y, W, H) {
            codes.push(S);
        }
    );
    //Обходим каждый элемент сгенерированного поля и создаем объекты характеризующие элементы поля
    pjs.levels.forStringArray({
            w: oneTileWidth,
            h: oneTileHeight,
            source: isNewGraphic ? newGraphicMap : binMap
        },
        function (S, X, Y, W, H) {
            var img = "";
            var comm = new Array();
            if (codes[indx] == entryCode) {
                if (entrySide == "DOWN") comm.push(COMMANDS[1]);
                else if (entrySide == "UP") comm.push(COMMANDS[2]);
                else if (entrySide == "LEFT") comm.push(COMMANDS[4]);
                else if (entrySide == "RIGHT") comm.push(COMMANDS[3]);
                comm[0].undeletable = true; //Делаем эту команду неудаляемой
            }
            for (var i = 0; i < graphicsImgs.length; i++) {
                if (S == graphicsImgs[i].code.toString()) {
                    img = graphicsImgs[i].value;
                }
            }
            var fEl = new fieldElement(img, comm, codes[indx], X + x, Y + y, oneTileWidth, oneTileHeight);
            indx++;
            //Заполняем массив элементов лабиринта
            field.push(fEl);
        });

    //ГЕНЕРИМ МЕСТОПОЛОЖЕНИЕ ИГРОВЫХ ОБЪЕКТОВ ЕСЛИ НАДО
    if (totalTokensOnMap !== 0) {
        gameObjects = new Array();
        var roadElems = new Array();
        //Индексируем все элементы дороги на поле
        OOP.forArr(field, function (el, i) {
            if (el.code == roadCode)
                roadElems.push(i);
        });
        //Защита от того, чтобы вдруг не случилось так чтобы все боле было усыпано монетками
        var total = totalTokensOnMap > (roadElems.length / 3) ? roadElems.length / 3 : totalTokensOnMap;
        //Ставим в случайных точках карты монетки
        for (var i = 0; i < total; i++) {
            var rndIndx = getRandomInt(0, roadElems.length);
            var obj = new CoinBattery("coin", coinCode, roadElems[rndIndx], coinPath, true);
            roadElems.splice(rndIndx, 1);
            gameObjects.push(obj);
        }
    }
}

//Генерит лабиринт в виде строк с кодами элементов поля
function genBin(hate, width, maze, walls, currentPosition) {
    //7 - дорога, 0 - стена, 1,2,3 другие стены, 8 - вход, 9 - выход
    hate = hate % 2 == 0 ? hate + 1 : hate;
    width = width % 2 == 0 ? width + 1 : width;
    hate -= 2;
    width -= 2;

    var mazeTmp = [];
    for (var y = 0; y < hate + 2; y++) {
        maze[y] = [];
        mazeTmp[y] = [];
        for (var x = 0; x < width + 2; maze[y][x++] = borderCode) {
            mazeTmp[y][x] = borderCode;
        }
    }

    function amaze(y, x, addBlockWalls) {
        maze[y][x] = roadCode;
        log(y + " " + x);
        if (addBlockWalls && valid(y + 1, x) && (maze[y + 1][x] == borderCode)) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && valid(y - 1, x) && (maze[y - 1][x] == borderCode)) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && valid(y, x + 1) && (maze[y][x + 1] == borderCode)) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && valid(y, x - 1) && (maze[y][x - 1] == borderCode)) walls.push([y, x - 1, [y, x]]);
    }

    function valid(a, b) {
        return (a < hate && a >= 0 && b < width && b >= 0) ? true : false;
    };
    amaze(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        var randomWall = walls[Math.floor(Math.random() * walls.length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
        if (valid(opposite[0], opposite[1])) {
            if (maze[opposite[0]][opposite[1]] == roadCode) walls.splice(walls.indexOf(randomWall), 1);
            else amaze(randomWall[0], randomWall[1], false), amaze(opposite[0], opposite[1], true);
        } else walls.splice(walls.indexOf(randomWall), 1);
    }

    for (var i = 1; i < mazeTmp.length - 1; i++) {
        for (var j = 1; j < mazeTmp.length - 1; j++) {
            mazeTmp[i][j] = maze[i - 1][j - 1];
            if (mazeTmp[i][j] == borderCode) {
                mazeTmp[i][j] = wallCode; //Генерит случайную стенку внутри лабиринта КОДЫ 1 2 3
            }
        }
    }

    //Генерим местоположение входа и выхода из лабиринта
    var indx = 0;
    //Рэндомим вход или выход
    var isEntry = getRandomInt(0, 2) == 1;
    //Если вход/выход будет на левой и правой стенке
    if (getRandomInt(0, 2) == 1) {

        //Инициализируем местоположение входа
        if (isEntry) entrySide = "LEFT";
        else entrySide = "RIGHT";

        //Генерим рэндомный индекс из левой стенки для входа
        indx = getRandomInt(1, mazeTmp.length - 2);
        //Проверяем, чтобы прямо перед элементом не было стены
        if (mazeTmp[indx][1] != roadCode) indx++;
        //Ставим вход или выход на левую стенку
        mazeTmp[indx][0] = isEntry ? entryCode : exitCode;

        //Генерим рэндомный индекс из правой стенки для входа
        indx = getRandomInt(1, mazeTmp.length - 2);
        //Проверяем, чтобы прямо пере элементом не было стены
        if (mazeTmp[indx][mazeTmp[0].length - 2] != roadCode) indx++;
        //Ставим вход или выход на правую стенку
        mazeTmp[indx][mazeTmp[0].length - 1] = isEntry ? exitCode : entryCode;
    } else { //Если вход и выход будет на верхней и нижней стенке

        //Инициализируем местоположение входа
        if (isEntry) entrySide = "UP";
        else entrySide = "DOWN";

        //Генерим рэндомный индекс из верхней стенки для входа
        indx = getRandomInt(1, mazeTmp[0].length - 2);
        //Проверяем, чтобы прямо перед элементом не было стены
        if (mazeTmp[1][indx] != roadCode) indx++;
        //Ставим вход или выход на верхней стенке
        mazeTmp[0][indx] = isEntry ? entryCode : exitCode;

        //Генерим рэндомный индекс из нижней стенки для выходв
        indx = getRandomInt(1, mazeTmp[mazeTmp.length - 1].length - 2);
        //Проверяем, чтобы прямо перед элементом не было стены
        if (mazeTmp[mazeTmp.length - 2][indx] != roadCode) indx++;
        //Ставим вход или выход на нижней стенке
        mazeTmp[mazeTmp.length - 1][indx] = isEntry ? exitCode : entryCode;
    }
    return mazeTmp;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function graphicsMapSort(arr) {
    // 1 - стена обычная, 2- стена с двойным округлением вниз, 3- стена с двойным окружением вверх, 4- стена с двойным окружением вправо
    // 5- стена с двойным окружением влево, 6- стена с одним окружением право-верх, 7-стена с одним окружением лево-верх, 8- стена с одной стеной лево-низ
    // 9- стена с одним окружением право-низ, 10- дорога прамая-вертикальная, 11- дорога Т-образная на право, 12- дорога перекресток, 13- дорога угловая правый верхний угол
    //14- дорога прямая-горизонтальная, 15- дорога угловая левый-нижний, 16- дорога угловая левый верхний угол, 17- дорога угловая правый нижний угол, 18- дорога Т-образная вверх,
    //19- дорога Т-образная вниз, 20- дорога Т-образная влево, 21 -внешняя стена левый верхний угол, 22- внешняя стена правый нижний угол, 23- внешняя стена правый верхний угол
    // 24- внешняя стена левый нижний угол, 25- внешняя стена верхняя часть, 26-внешняя стена нижняя часть, 27- внешняя стена правая часть, 28- внешняя стена левая часть
    // 29- внешняя стена Т-образный право, 30- внешная стена Т-образный лево, 31- внешнаняя стена Т-образный вверх, 32-внешняя стена Т-образный вниз
    // 33- дорога конечная точка право, 34-дорога конечная точка влево, 35-дорога конечная точка верх, 36-дорога конечная точка вниз, 37- внутренная стена Т-образная вниз
    // 38- внутренная стена Т-образная верх, 39-внутренная стена Т-образная-лево, 40-внутренная стена Т-образная-право, 41-внутренная стена прямая вертикальная, 
    // 42-внутренная стена прямая горизонтальная, 43-внутренная стена перекресток
    var rouColCount = labyrinthSize;
    var isLeftWall = false;
    var isRightWall = false;
    var isTopWall = false;
    var isBottomWall = false;

    var isLeftRoad = false;
    var isRightRoad = false;
    var isTopRoad = false;
    var isBottomRoad = false;

    var newArr = getCopyOfObj(arr);
    for (var i = 0; i < rouColCount; i++) {
        for (var j = 0; j < rouColCount; j++) {
            isLeftWall = false;
            isRightWall = false;
            isTopWall = false;
            isBottomWall = false;
            isLeftRoad = false;
            isRightRoad = false;
            isTopRoad = false;
            isBottomRoad = false;

            if (newArr[i][j] == entryCode || newArr[i][j] == exitCode)
                {
                    if(newArr[i][j] == entryCode)
                    {
                    if(i==0)
                        {
                            newArr[i][j] ="44";
                            continue;
                        }
                        if(i== rouColCount-1)
                        {
                            newArr[i][j] ="45";
                            continue;
                        }
                        if(j==0)
                        {
                            newArr[i][j] ="47";
                            continue;
                        }
                       if(j== rouColCount-1)
                        {
                            newArr[i][j] ="46";
                            continue;
                        }
                            
                    }
                if(newArr[i][j] == exitCode)
                    {
                    if(i==0)
                        {
                            newArr[i][j] ="48";
                            continue;
                        }
                        if(i== rouColCount-1)
                        {
                            newArr[i][j] ="49";
                            continue;
                        }
                        if(j==0)
                        {
                            newArr[i][j] ="51";
                            continue;
                        }
                       if(j== rouColCount-1)
                        {
                            newArr[i][j] ="50";
                            continue;
                        }
                            
                    }
                }
               
            //внешние стены
            if (j == 0) { //картинка для левого верхнего угла внешних стен
                if (i == 0) {
                    //картинка 20
                    newArr[i][j] = "21";
                    continue;
                }
                if (i == rouColCount - 1) {
                    //картинка 23
                    newArr[i][j] = "24";
                    continue;
                }
                if (arr[i][j + 1] == "1") {
                    newArr[i][j] = "29";
                    continue;
                }
                //картинка 27
                newArr[i][j] = "28";
                continue;
            }
            if (j == rouColCount - 1) { //картинка для правого верхнего угла внешних стен
                if (i == 0) {
                    //картинка 21
                    newArr[i][j] = "23";
                    continue;
                }
                if (i == rouColCount - 1) {
                    //картинка 22
                    newArr[i][j] = "22";
                    continue;
                }
                if (arr[i][j - 1] == "1") {
                    newArr[i][j] = "30";
                    continue;
                }
                //картинка 26
                newArr[i][j] = "27";
                continue;
            }
            if (i == rouColCount - 1) {
                if (arr[i - 1][j] == "1") {
                    newArr[i][j] = "31";
                    continue;
                }
                newArr[i][j] = "26";
                continue;
            }
            //
            if (i == 0 && j != 0 && j != rouColCount - 1) {
                if (arr[i + 1][j] == "1") {
                    newArr[i][j] = "32";
                    continue;
                }
                //картинка 24
                newArr[i][j] = "25";
                continue;
            }
            //если дорога
            if (arr[i][j] == "7") {
                //определяем наличие стен посторонам дороги
                // если справо стена любого типа
                if (arr[i][j + 1] != "7" && arr[i][j + 1] != entryCode && arr[i][j + 1] != exitCode) {
                    isRightWall = true;
                }
                //если слева стена
                if (arr[i][j - 1] != "7" && arr[i][j - 1] != entryCode && arr[i][j - 1] != exitCode) {
                    isLeftWall = true;
                }
                //если снизу стена
                if (arr[i + 1][j] != "7" && arr[i + 1][j] != entryCode && arr[i + 1][j] != exitCode) {
                    isBottomWall = true;
                }
                //если сверху стена
                if (arr[i - 1][j] != "7" && arr[i - 1][j] != entryCode && arr[i - 1][j] != exitCode) {
                    isTopWall = true;
                }
                //

                if (isLeftWall && isRightWall && !isTopWall && !isBottomWall) {
                    //картинка 1) из бумажки
                    newArr[i][j] = "10";
                    continue;
                }
                if (!isTopWall && !isLeftWall && !isRightWall && isBottomWall) {
                    //картинка 9)
                    newArr[i][j] = "18";
                    continue;
                }
                if (isTopWall && isBottomWall && !isLeftWall && !isRightWall) {
                    //картинка 5)
                    newArr[i][j] = "14";
                    continue;
                }
                if (!isTopWall && !isLeftWall && !isBottomWall && isRightWall) {
                    //картинка 11)
                    newArr[i][j] = "20";
                    continue;
                }
                if (!isTopWall && isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 2)
                    newArr[i][j] = "11";
                    continue;
                }
                if (!isTopWall && !isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 3)
                    newArr[i][j] = "12";
                    continue;
                }
                if (isTopWall && !isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 10)
                    newArr[i][j] = "19";
                    continue;
                }
                if (isTopWall && !isLeftWall && !isBottomWall && isRightWall) {
                    //картинка 4)
                    newArr[i][j] = "13";
                    continue;
                }
                if (!isTopWall && isLeftWall && isBottomWall && !isRightWall) {
                    //картинка 6)
                    newArr[i][j] = "15";
                    continue;
                }
                if (isTopWall && isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 7)
                    newArr[i][j] = "16";
                    continue;
                }
                if (!isTopWall && !isLeftWall && isBottomWall && isRightWall) {
                    //картинка 8)
                    newArr[i][j] = "17";
                    continue;
                }
                if (isTopWall && !isLeftWall && isBottomWall && isRightWall) {
                    newArr[i][j] = "33";
                    continue;
                }
                if (isTopWall && isLeftWall && isBottomWall && !isRightWall) {
                    newArr[i][j] = "34";
                    continue;
                }
                if (isTopWall && isLeftWall && !isBottomWall && isRightWall) {
                    newArr[i][j] = "35";
                    continue;
                }
                if (!isTopWall && isLeftWall && isBottomWall && isRightWall) {
                    newArr[i][j] = "36";
                    continue;
                }
            }
            if (arr[i][j] == "1") {
                // если справо дорога любого типа
                if (arr[i][j + 1] == "7" || arr[i][j + 1] == entryCode || arr[i][j + 1] == exitCode) {
                    isRightRoad = true;
                }
                //если слева дорога
                if (arr[i][j - 1] == "7" || arr[i][j - 1] == entryCode || arr[i][j - 1] == exitCode) {
                    isLeftRoad = true;
                }
                //если снизу дорога
                if (arr[i + 1][j] == "7" || arr[i + 1][j] == entryCode || arr[i + 1][j] == exitCode) {
                    isBottomRoad = true;
                }
                //если сверху дорога
                if (arr[i - 1][j] == "7" || arr[i - 1][j] == entryCode || arr[i - 1][j] == exitCode) {
                    isTopRoad = true;
                }
                //

                if (isLeftRoad && isRightRoad && isBottomRoad && !isTopRoad) {
                    //картинка 12
                    newArr[i][j] = "2";
                    continue;
                }
                if (isLeftRoad && isRightRoad && !isBottomRoad && isTopRoad) {
                    //картинка 13
                    newArr[i][j] = "3";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && isBottomRoad && isTopRoad) {
                    //картинка 14
                    newArr[i][j] = "4";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && isBottomRoad && isTopRoad) {
                    //картинка 15
                    newArr[i][j] = "5";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && !isBottomRoad && isTopRoad) {
                    //картинка 16
                    newArr[i][j] = "6";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && !isBottomRoad && isTopRoad) {
                    //картинка 17
                    newArr[i][j] = "777";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && isBottomRoad && !isTopRoad) {
                    //картинка 18
                    newArr[i][j] = "888";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && isBottomRoad && !isTopRoad) {
                    //картинка 19
                    newArr[i][j] = "999";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && !isBottomRoad && isTopRoad) {
                    newArr[i][j] = "37";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "38";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "39";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "40";
                    continue;
                }
                if (isLeftRoad && isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "41";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && isBottomRoad && isTopRoad) {
                    newArr[i][j] = "42";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "43";
                    continue;
                }
            }

        }
    }
    return newArr;
}
var iEL;
var iEF;

//Базовый класс в иерархии классов View
function GraphicView(elements, backX, backY, backW, backH, fillCol) {
    //Массив графических обьектов
    this.elems = elements;
    //Обьект заднего фона
    this.backGround = game.newRectObject({
        x: backX,
        y: backY,
        w: backW,
        h: backH,
        fillColor: fillCol
    });
    //Центр бэкргаунда
    this.backC = new point(this.backGround.x + this.backGround.w / 2, this.backGround.y + this.backGround.h / 2);
    //Текущее смещение на скроле
    this.currentShift = new point(this.backGround.x, this.backGround.y);
    //Переменная хранящяя величину увеличения
    this.zoomer = 0;

    this.getBackGround = function () {
        return this.backGround;
    }

    var getCenterElemOnScreen = function (elems, background) {
        var buff = [];
        var indx = 0;
        //Центральный элемент
        var centrElem = elems[0];
        //Буфер для разности между центрами
        var diffXBuff = background.w + background.x, diffYBuff = background.h + background.y, diffX = 0, diffY = 0;
        //Центр экрана
        var bCX = (background.x + background.w) / 2;
        var bCY = (background.y + background.h) / 2;
        //log("ЦЕНТР " + bCX + " : " + bCY);
        OOP.forArr(elems, function (el, i) {
            //Если элемент входит в бэкграунд игрового поля
            if (el.isIntersect(background)) {
                //buff.push(el);
                //Рассчитываем удаленность элемента от центра бэкграунда как сумму разностей координат по модулю
                var elC = el.getPositionC();
                diffX = Math.abs(bCX - elC.x);
                diffY = Math.abs(bCY - elC.y);
                if(diffX <= diffXBuff && diffY <= diffYBuff) {
                    indx = i > 0 ? i - 1 : i;
                    centrElem = elems[indx];
                    diffXBuff = diffX;
                    diffYBuff = diffY;
                }
                //log(indx);
            }
        });
        //log("ВСЕГО: " + elems.length + " ЦЕНТР : " + indx);
        return centrElem;
    }

    //Ресайзит все так, чтобы elem был в центре background-а
    this.setFocusOnElement = function(elem, isCodeView) {
        //Ресайзим как надо
        if(isCodeView) {
            this.resizeView((this.backGround.h / 6) - this.elems[0].h, true, undefined, true);
        }
        //Ищем элемент который должен быть в центре и сдвигаем его в центр
        for(var i = 0 ; i < this.elems.length; i++){
            if(this.elems[i] == elem){
                var bgC = this.backGround.getPositionC();
                var elC = this.elems[i].getPositionC();
                this.elementsMove(bgC.x - elC.x,bgC.y - elC.y,undefined,undefined,isCodeView);
                break;
            }
        }
    }

    //Смещает все объекты objects на shiftX и shiftY
    this.elementsMove = function (shiftX, shiftY, dontSave, dontCheck, isCodeView) {

        if (!this.elems || this.elems.length == 0 || (shiftX == 0 && shiftY == 0))
            return;
        var bX = this.backGround.x;
        var bY = this.backGround.y;
        var bW = this.backGround.w;
        var bH = this.backGround.h;

        var minX = bX,
            minY = bY,
            maxX = bX,
            maxY = bY,
            elemWH = this.elems[0].w; //Такак как все элементы у нас квадратные и одинаковые по размеру запоминаем размер самого первого
        //Ищем левый верхний и правый нижний элементы
        OOP.forArr(this.elems, function (el) {
            if (el.x < minX) minX = el.x;
            if (el.y < minY) minY = el.y;
            if (el.x > maxX) maxX = el.x;
            if (el.y > maxY) maxY = el.y;
        });
        //iEF - правый нижний элемент квадрата
        //iEL - левый верхний элемент квадрата
        iEL = game.newRectObject({
            x: minX,
            y: minY,
            w: elemWH,
            h: elemWH
        });
        iEF = game.newRectObject({
            x: maxX,
            y: maxY,
            w: elemWH,
            h: elemWH
        });
        if (dontCheck) {
            //Cмещаем все элементы
            OOP.forArr(this.elems, function (el) {
                //el.move(new point(shiftX, shiftY));
                if (el.setNewSize)
                    el.setNewSize(el.x + shiftX, el.y + shiftY, el.w, el.h);
                else
                    el.move(new point(shiftX, shiftY));
                if(el.textObj){
                    el.textObj = getTextObject(el,el.w);
                }
            });
            if (!dontSave) {
                this.currentShift.x = this.elems[0].x;
                this.currentShift.y = this.elems[0].y;
            }
        }
        //Проверяем, выходят ли крайние элементы поля за пределы поля
        else if ((iEL.x < bX || iEL.y < bY) || ((iEF.x + iEF.w > bX + bW) || (iEF.y + iEF.h > bY + bH))) {

            if (iEL.x + shiftX > bX) //Если левый край входит в бэкграунд
                shiftX = bX - iEL.x; //То возвращаем его на место(Он не должен заходить внутрь)
            else if (iEF.x + iEF.w + shiftX < bX + bW)
                shiftX = isCodeView ? 0 : ((bX + bW) - (iEF.x + iEF.w));

            if (iEL.y + shiftY > bY)
                shiftY = bY - iEL.y;
            else if (iEF.y + iEF.h + shiftY < bY + bH)
                shiftY = ((bY + bH) - (iEF.y + iEF.h));

            //Cмещаем все элементы
            OOP.forArr(this.elems, function (el) {
                //el.move(new point(shiftX, shiftY));
                if (el.setNewSize)
                    el.setNewSize(el.x + shiftX, el.y + shiftY, el.w, el.h);
                else {
                    //el.move(new point(shiftX, shiftY));
                    el.x += shiftX;
                    el.y += shiftY;
                }
                if(el.textObj){
                    el.textObj = getTextObject(el,el.w);
                }
            });
            if (!dontSave) {
                this.currentShift.x = this.elems[0].x;
                this.currentShift.y = this.elems[0].y;
            }
        }
        //this.backGround.draw();
    }
    //Ресайзит this.elements на величину delta
    this.resizeView = function (delta, dontCheckZoomer, isCodeView, dontMove) {
        //Если ресайзить нечего
        if (!this.elems || this.elems.length == 0)
            return;
        //Проверяем можно ли зумить
        if (!dontCheckZoomer) {
            //Проверяем на то чтобы не скролить меньше минимального порога
            if (this.zoomer == 0 && delta < 0) return;
            //Проверяем на то чтобы не скролить больше максимального порога
            if (delta > 0){
                //Если высота одного элемента в массиве элементов больше чем одна шестая бэкграунда то не увеличиваем больше
                if(this.elems && this.elems.length > 0 && this.elems[0].h > (this.backGround.h / 6))
                    return;
            }
            var z = this.zoomer + delta;
            if (z < 0) delta = delta + Math.abs(z);
            this.zoomer += delta;
        }
        else this.zoomer = this.elems[0].w + delta;
        //Начинаем ЗУМ
        //Запоминаем левую верхнюю точку бэкграунда
        var GSX = this.backGround.x;
        var GSY = this.backGround.y;
        var itemWH;
        var counterX = 0;
        var counterY = 0;
        //Запоминаем нужные параметры для сдвига в центр после ресайза
        //var cIndx = Math.floor(this.elems.length / 2);
        var cEl = getCenterElemOnScreen(this.elems, this.backGround); //this.elems[cIndx];
        var xl, yl, wl, hl;
        //Обходим все элементы массива
        OOP.forArr(this.elems, function (el, i) {
            //el = el.getImageObject ? el.getImageObject() : el;
            itemWH = el.w;
            //Увеличиваем ширину и высоту
            wl = el.w + delta;
            hl = el.h + delta;
            //Рассчитываем сдвиг элемента (его расстояние от левого верхнего угла бэкграунда / ширину элемента ДО изменения размера)
            counterX = (el.x - GSX) / itemWH;
            counterY = (el.y - GSY) / itemWH;
            //Сдвигаем элемент на нужное число
            xl = el.x + (counterX * delta);
            yl = el.y + (counterY * delta);
            //Изменяем размер элемента
            if (el.setNewSize) {
                el.setNewSize(xl, yl, wl, hl);
            }
            else {
                el.x = xl;
                el.y = yl;
                el.w = wl;
                el.h = hl;
            }
            if(el.textObj){
                el.textObj = getTextObject(el,el.w);
            }
        });
        //log("delta : " + delta + "pozX: " + (cEl.getPositionC().x - oldX) + "pozY: " + (cEl.getPositionC().y - oldY));
        //Смещаем всю карту в центр(чтобы ресайзить в центр текущей области)
        if(!dontMove)
            this.elementsMove((cEl.getPositionC().x - this.backC.x) * -1, (cEl.getPositionC().y - this.backC.y) * -1, undefined, undefined, isCodeView);
    }

    //Проверяет, находятся ли объекты objs внутри квадрата области полностью. Если она за пределами - setVisible(false)
    this.checkObjsInArea = function (full) {
        var bg = this.backGround;
        var arr = [];
        var arr1 = []
        OOP.forArr(this.elems, function (el) {
            if (bg !== undefined) {
                var itm = el.getImageObject ? el.getImageObject() : el;
                var iP = itm.getPositionC();
                var bgC = new point((bg.x + bg.w) / 2, (bg.y + bg.h) / 2);
                //Рассчитываем удаленность итема от границ бэкргаунда(Если будет > 0 то итем вышел за границу)
                var d = [(bgC.x - iP.x) - (bgC.x - bg.x),//Удаленность от левой границы 0
                         (bgC.y - iP.y) - (bgC.y - bg.y),//Удаленность от верхней границы 1
                         (iP.x - bgC.x) - ((bg.x + bg.w) - bgC.x),//Удаленность от правой границы 2
                         (iP.y - bgC.y) - ((bg.y + bg.h) - bgC.y)];//Удаленность от нижней границы 3
                //Если этот итем от центра дальше чем границы бэкргаунда то меняем альфу на величину удалённости
                if(d[0] <= 0 && d[1] <= 0 && d[2] <= 0 && d[3] <= 0) {//Если итем НЕ ВЫХОДИТ за границы
                    var max = height * -1;
                    for(var i = 0 ; i < d.length; i++){
                        if(d[i] > max)
                            max = d[i];
                    }
                    //log("MIN : " + max);
                    var alpha = full ? 1 : itm.getAlpha() - max / 100;
                    itm.setAlpha(alpha);
                    if(itm.textObj) itm.textObj.setAlpha(alpha);
                }
                else{//Если вышел за границы
                    for(var i = 0 ; i < d.length; i++){
                        if(d[i] > 0){
                            var alpha = full ? 1 : itm.getAlpha() - d[i] / 100;
                            itm.setAlpha(alpha);
                            if(itm.textObj) itm.textObj.setAlpha(alpha);
                        }
                    }
                }
                if (itm.getAlpha() == 0) {
                    itm.setVisible(false);
                    if(itm.textObj) itm.textObj.setVisible(false);
                }
                else {
                    itm.setVisible(true);
                    if(itm.textObj) itm.textObj.setVisible(true);
                }
            }
        });
    }

    //Проверяет входят ли координаты e.x и e.y в один из элемент в this.elems и вызывает обработчик если входят
    this.isClicked = function (e) {
        var result = false;
        if (this.elems && this.elems.length > 0) {
            OOP.forArr(this.elems, function (el) {
                if (clickIsInObj(e.x, e.y, el)) {
                    if (el.onClick)
                        el.onClick(el);
                    result = true;
                    return;
                }
            });
        }
        return result;
    }
}

//Класс описывающий карту кода
function CodeMapView(backX, backY, backW, backH, fillCol) {
    var parent = new GraphicView([], backX, backY, backW, backH, fillCol);
    this.__proto__ = parent;
    this.elemWH = backW * 0.1;
    var lX = backX;
    var lY = backY;
    this.menu = new ItemMenu();

    this.setElements = function (elements) {
        parent.elems = elements;
    }

    this.clear = function () {
        parent.elems.splice(0, parent.elems.length);
        this.menu.closeMenu();
        allButtons.deleteButton.setVisible(false);
    }

    //Добавляет элемент с плюсиком в кодмап
    var addPlusComm = function (X, Y, WH, comm, images, commName) {
        images.push(game.newImageObject({
            x: X,
            y: Y,
            w: WH,
            h: WH,
            file: itemPlusSrc
        }));
        images[images.length - 1].setUserData({
            command: comm,
            commandName : commName,
            onClick: function (el) {
                onCodeMapElementClick(el);
            }
        });
        images[images.length - 1].name = "plus";
    }

    //Добавляет линии в строку в кодмап
    var addLinesToMap = function (X, Y, WH, images) {
        //Создаем линии для блоков команд
        for (var j = X; j >= parent.backGround.x + WH; j -= WH) {
            images.push(game.newImageObject({
                x: j - WH,
                y: Y,
                w: WH,
                h: WH,
                file: lineImg
            }));
        }
    }

    //Добавляет команду в код мап
    var addUsualCommand = function (X, Y, WH, images, imgSrc, comm, isOnClick) {
        //Позиционируем текущий элемент
        images.push(game.newImageObject({
            x: X,
            y: Y,
            w: WH,
            h: WH,
            file: imgSrc,
        }));
        images[images.length - 1].setUserData({
            command: comm
        });
        if (isOnClick)
            images[images.length - 1].setUserData({
                onClick: function (el) {
                    onCodeMapElementClick(el);
                }
            });
        images[images.length - 1].strokeWidth = 100;
    }

    var buildCodeMap = function (x, y, arr, images, elemWH, isPlusAdd, isOnClick, isActions) {
        this.images = [];
        if (x !== undefined && y !== undefined) {
            lX = x;
            lY = y
        }
        //Алгоритм построения элементов в виде карты кода
        for (var i = 0; i < arr.length; i++) {

            var el = arr[i];
            if (!el) continue;

            //Добавляем линии
            addLinesToMap(lX, lY, elemWH, images);
            //Позиционируем текущий элемент
            addUsualCommand(lX, lY, elemWH, images, el.imgSource, el, isOnClick);

            //Если сложная команда
            if (el.commandsBlock) {
                //Позиционируем el.img
                if (el.name == "if" || el.name == "repeatif") {
                    lX += elemWH;
                    var imgS = el.blockA.lookCommand ? el.blockA.lookCommand.imgSource : el.blockA.imgSource;
                    //Позиционируем blockA текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, imgS, el.blockA, isOnClick);
                    lX += elemWH;
                    //Позиционируем blockB текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, el.blockB.imgSource, el.blockB, isOnClick);
                    lX -= elemWH;
                } else if (el.name == "repeat") {
                    lX += elemWH;
                    //Позиционируем countBlock текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, el.countBlock.imgSource, el.countBlock, isOnClick);
                    images[images.length - 1].setUserData({
                        textObj : getTextObject(images[images.length - 1],images[images.length - 1].w)
                    });
                }
                lY += elemWH;
                if (el.commandsBlock.actions.length > 0) {

                    buildCodeMap(undefined, undefined, el.commandsBlock.actions, images, elemWH, isPlusAdd, isOnClick, true);
                    var comCount = el.commandsBlock.actions.length * elemWH;
                    // lY += comCount
                }

                //Добавляем команду с плюсиком
                if (isPlusAdd) {
                    addPlusComm(lX, lY, elemWH, el.commandsBlock.actions, images, el.name);
                    addLinesToMap(lX, lY, elemWH, images);
                    lY += elemWH;
                }

                lX -= elemWH;
                if (el.name == "if") {
                    //Добавляем линии
                    addLinesToMap(lX, lY, elemWH, images);
                    //Позиционируем elseBlock текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, el.elseBlock.imgSource, el.elseBlock, isOnClick);
                    lY += elemWH;
                    lX += elemWH;
                    //Если в elseblock есть команды то добавляем их
                    if (el.elseBlock.actions.length > 0) {
                        buildCodeMap(undefined, undefined, el.elseBlock.actions, images, elemWH, isPlusAdd, isOnClick, true);
                        var elseComCount = el.elseBlock.actions.length * elemWH;
                    }

                    //Добавляем команду с плюсиком
                    if (isPlusAdd) {
                        addPlusComm(lX, lY, elemWH, el.elseBlock.actions, images, el.name);
                        addLinesToMap(lX, lY, elemWH, images);
                        lY += elemWH;
                    }

                    lX -= elemWH;

                }
            } else {
                lY += elemWH;
            }
        };
        //Добавляем команду с плюсиком в начало если элементов нету
        if (isPlusAdd && !isActions) {
            addPlusComm(lX, lY, elemWH, lastClickedElement.commands, images, "empty");
            addLinesToMap(lX, lY, elemWH, images);
            lY += elemWH;
        }
    }

    //Метод располагающий элементы this.elems в правильном порядке
    this.createCodeMap = function (x, y, arr, isPlusAdd, isOnClick, alpha, activeELement) {
        //Если на экран выведен правый скролл то вообще нету смысла создавать кодмап
        for(var i = 0 ; i < Scrolls.length; i++){
            if(Scrolls[i].name == "RIGHT" && Scrolls[i].getArrayItems().length > 0){
                return;
            } 
        }
        
        this.clear();
        
        if(!isVerticalScreen)
            buildCodeMap(codeMapBG.x, codeMapBG.y, arr, parent.elems, this.elemWH, isPlusAdd, isOnClick, false);
        else buildCodeMap(x, y, arr, parent.elems, this.elemWH, isPlusAdd, isOnClick, false);

        if(isPlusAdd){
            allButtons.deleteButton.setVisible(true);
        }
        else allButtons.deleteButton.setVisible(false);

        //Если есть параметр alpha - то присваиваем его всем элементам
        if (alpha && alpha >= 0 && alpha <= 1 && parent.elems.length > 0) {
            //Если alpha - значит необходимо видеть весь код мап в поле видимости - поэтому перерасчитваем размеры элементов
            //this.recizeAllElementsToScreen();
            this.setAlphaToElement(alpha,activeELement);
        } else {
            this.elementsMove(parent.currentShift.x - parent.backGround.x, parent.currentShift.y - parent.backGround.y, true, undefined);
        }
        //Если карта не кликабельна, то сбрасываем ресайз(потому что она сразу в максимальном размере отрисуется)
        if(!isOnClick){
            parent.zoomer = 0;
        }
        //addTextFieldsToMap(this.elemWH, parent.elems);
        //Добавляем кнопки меню элемента
        //parent.elems = parent.elems.concat(this.menu.itemsArray);
        if(alpha >= 1)
        parent.checkObjsInArea();
    }

    //Выставляет альфу всем элементам кодмапа равной disactiveAlpha и ставит альфу у activeElement = 1
    this.setAlphaToElement = function(disactiveAlpha, activeELement){
        //Меняем альфу всех элементов
        //Устанавливает alpha у элемента elem из parent.elems равной 1(Чтобы выделить ее во время исполнения команд роботом)
        if (parent.elems) {
            for (var i = 0; i < parent.elems.length; i++) {
                var el = parent.elems[i];
                //Если нашли нужную команду
                if (activeELement && el.command && el.command == activeELement) {
                    el.setAlpha(1);
                    if(el.command.name == "repeat"){
                        i += 1;
                        parent.elems[i].setAlpha(1);
                        parent.elems[i].textObj = getTextObject(parent.elems[i],this.elemWH);
                    }
                    else if(el.command.name == "repeatif" || el.command.name == "if"){
                        i += 1;
                        parent.elems[i].setAlpha(1);
                        i += 1;
                        parent.elems[i].setAlpha(1);
                    }
                    parent.setFocusOnElement(el,true);
                }
                else el.setAlpha(disactiveAlpha);
            }
        }
    }

    //ресайзит все элементы так, чтобы они влезли в экран все
    this.recizeAllElementsToScreen = function(){
        var levels = 2;
        var YBuff = parent.elems[0].y;
        OOP.forArr(parent.elems, function (el) {
            if (YBuff != el.y) {
                YBuff = el.y;
                levels++;
            }
        });
        var sz = (parent.backGround.y + parent.backGround.h) / levels;
        if (sz > (height * 0.15)) sz = height * 0.15;
        else if (sz > parent.backGround.w) sz = parent.backGround.w;
        parent.resizeView(sz - this.elemWH, true);
        //запоминаем новый размер для элемента
        this.elemWH = parent.elems[0].w;
    }

    this.resetZoomer = function(){
        parent.zoomer = 0;
    }

    this.resizeView = function (delta, dontAddPlus,dontClick) {
        if(!parent.elems || parent.elems.length == 0) return;
        parent.resizeView(delta, undefined, true);
        //запоминаем новый размер для элемента
        this.elemWH = parent.elems[0].w;

        if (this.menu !== undefined)
            this.menu.setSettings();
        //this.elementsMove(parent.currentShift.x - parent.backGround.x, parent.currentShift.y - parent.backGround.y, true, undefined);
        this.checkObjsInArea(1);
        //Проверяем надо ли смещать код мап после ресайза(Да знаю, что для этого мы и писали универсальную функцию ресайза в родительском классе, но тут особый случай, не могу придумать способа его обрабатывать без специального кода тут)
        //Считаем разность нижней точки кодмапа с нижней точкой последнего элемента
        var lastElemDiff =(codeMapBG.y + codeMapBG.h) - (parent.elems[parent.elems.length - 1].y + parent.elems[parent.elems.length - 1].h);
        var shift = lastElemDiff;
        //Если разность больше 0 то надо сдвигать
        if(lastElemDiff > 0 ){
            //Но если после сдвига верхние жлементы сдвинутся внутрь codeMapBG то это будет неправильно поэтому проверяем
            if(parent.elems[0].y + parent.elems[0].h + lastElemDiff > codeMapBG.y){
                shift = codeMapBG.y - (parent.elems[0].y);
            }
            this.elementsMove(0,shift, true, true);
        }
        //ПАРАМЕТР alpha = -1 КАК ФЛАГ ТОГО ЧТОБЫ НЕ СБРАСЫВАТЬ ZOOMER при этом вызове функции(Исправить)
        //codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, !dontAddPlus, !dontClick, -1);
    }

    this.elementsMove = function (shiftX, shiftY, dontSave, dontCheck) {
        parent.elementsMove(shiftX, shiftY, dontSave, dontCheck, true);
        if (this.menu !== undefined)
            this.menu.setSettings();
        parent.checkObjsInArea();
    }

    this.drawCodeMap = function () {
        if (codeMapBG && isVerticalScreen && isSecondScreen) codeMapBG.draw();
        else if (!isVerticalScreen && codeMapBG) codeMapBG.draw();

        if (parent.elems && parent.elems.length > 0) {
            for(var i=0;i<parent.elems.length;i++)
                {
                    parent.elems[i].draw();
                    if(parent.elems[i].textObj)
                        parent.elems[i].textObj.draw();
                }
            this.menu.draw(); //Отрисовываем дополнительные элементы если нужно
        }
    }

    this.isClicked = function (e) {
        if (!this.menu.isClicked(e)) {
            if (!parent.isClicked(e)){
                this.resizeView(0);
                this.menu.closeMenu();
            }
            else return true;
        } else return true;

        if (clickIsInObj(e.x, e.y, codeMapBG))//clickIsInObj(e.x, e.y, parent.backGround) && parent.elems && parent.elems > 0) return true;
            return true;
        return false;
    }

    //Возврашает элемент по x,y если такого нет то вернет undefined
    this.getCommandAt = function(x,y){
        var r = undefined;
        OOP.forArr(parent.elems, function(el){
            if(clickIsInObj(x,y,el))
                r = el.command;
                return;
        });
        return r;
    }

    //Возвращает выбранный элемент
    this.getChoosenElement = function () {
        return this.menu.getElement();
    }

    this.getAllElems = function () {
        return parent.elems;
    }

    this.getBackground = function () {
        return parent.backGround;
    }
}

function LabyrinthView(elements, backX, backY, backW, backH, fillCol) {
    var parent = new GraphicView(elements, backX, backY, backW, backH, fillCol);
    this.__proto__ = parent;

    this.checkGameObjects = function () {
        OOP.forArr(gameObjects, function (coin) {
            if (parent.elems[coin.position].visible) {
                coin.setNewPosition(coin.position);
            } else coin.setVisible(false);
        });
        if (playerImageObj && parent.elems[playerPozition].visible) {
            playerImageObj.x = parent.elems[playerPozition].x;
            playerImageObj.y = parent.elems[playerPozition].y;
            playerImageObj.w = parent.elems[playerPozition].w;
            playerImageObj.h = parent.elems[playerPozition].h;
            playerImageObj.setVisible(true);
        } else if(playerImageObj) playerImageObj.setVisible(false);
    }

    this.resizeView = function (delta) {
        //иницилизируем объекты и плеера в игровом поле
        parent.resizeView(delta);
        this.checkGameObjects();
    }

    this.elementsMove = function (shiftX, shiftY) {
        //иницилизируем объекты и плеера в игровом поле
        parent.elementsMove(shiftX, shiftY);
        this.checkGameObjects();
    }
}

//Вспомогательные функции
//Создает обьект текстового поля и возвращает его
var getTextObject = function (el, elemWH) {
    //ДОБАВИТЬ ТЕКСТОВОЕ ПОЛЕ
    if (el.command && el.command.name == "counter") {
        var count = el.command.count;
        var countStr =  count.toString();
        var obj = game.newTextObject({
            x: el.x,
            y: el.y,
            text: countStr.length > 2 ? "*" : countStr,
            size: elemWH / 2,
            padding : elemWH * 0.3,
            color: textOnCodeMapColor,
        });
        return obj;
    }
}

//Функция возвращает массив команд в котором находится obj. Из иерархии массивов container
var findObjStorage = function (container, obj) {
    for (var i = 0; i < container.length; i++) {
        var el = container[i];
        //Проверяем на поиск вложения(ситуации когда искомый обьект - blockA,blockB или countBlock)
        if (el == obj) {
            //Если нашли искомый обьект, то возвращаем его
            return container;
        } else if (el.name == "if" || el.name == "repeatif") {
            if (obj.name == "blockA" || obj.name == "whatisit")
                if (el.blockA == obj)
                    return el;
            if (obj.name == "blockB")
                if (el.blockB == obj)
                    return el;
        } else if (el.name == "repeat") {
            if (obj.name == "counter")
                if (el.countBlock == obj)
                    return el;
        }
        //Если в команде есть массив команд то рекурсивно вызваем функцию для этого массива
        if (el.commandsBlock) {
            if (el.commandsBlock.actions.length > 0) {
                //Рекурсивно вызываем функцию поиска
                var res = findObjStorage(el.commandsBlock.actions, obj);
                //Если функция вернет результат, то возвращаем его
                if (res) return res;
            }
            if (el.elseBlock && el.elseBlock.actions.length > 0) {
                //Рекурсивно вызываем функцию поиска
                var res = findObjStorage(el.elseBlock.actions, obj);
                //Если функция вернет результат, то возвращаем его
                if (res) return res;
            }
        }
    }
    //Если обошли все и ненагли искомый обьект то возвращаем undefined
    return undefined;
}

function ItemMenu() {
    //создаем элементы для кнопок
    var itemDelete = game.newImageObject({
        file: itemDeleteSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    var itemMove = game.newImageObject({
        file: itemMoveSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    var itemReplace = game.newImageObject({
        file: itemReplaceSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    var itemAdd = game.newImageObject({
        file: itemAddSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    //
    //массив для хранения всех кнопок, для дальнейшго обхода по ним в поиске клика
    this.itemsArray = [];
    //переменная для хранения ссылки на объект по которому кликнули
    var element = undefined;
    this.itemsArray.push(itemDelete);
    this.itemsArray.push(itemMove);
    this.itemsArray.push(itemReplace);
    this.itemsArray.push(itemAdd);
    //отключаем видимость кнопок
    // this.setMenuVisible(false);
    //рисуем кнопки
    // OOP.drawArr(itemsArray);
    //Возвращает элемент к которому привязаны кнопки меню
    this.getElement = function () {
        return element;
    }
    this.setMenuVisible = function (visible) {
        if (this.itemsArray !== undefined) {
            OOP.forArr(this.itemsArray, function (el) {
                el.setVisible(visible)
            })
        }
    }

    this.draw = function () {
        OOP.drawArr(this.itemsArray);
    }

    this.isClicked = function (e) {
        var result = false;
        if (this.itemsArray && this.itemsArray.length > 0) {
            OOP.forArr(this.itemsArray, function (el) {
                if (el.visible && clickIsInObj(e.x, e.y, el)) {
                    el.onClick();
                    result = true;
                    return;
                }
            });
        }
        return result;
    }

    itemDelete.setUserData({
        onClick: function () {
            //описать клик удаление
            var stor = findObjStorage(lastClickedElement.commands, element.command);
            OOP.delObject(stor, element.command);
            codeView.menu.setMenuVisible(false);
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
            if(!isVerticalScreen) 
                initLeftScroll(getCommandsImgArr(stor));
        }
    });
    itemMove.setUserData({
        onClick: function () {
            //описать клик перемещение
        }
    });
    itemReplace.setUserData({
        onClick: function () {
            itemToReplaceInCodeMap = element;
            choosenCommandInElement = findObjStorage(lastClickedElement.commands,itemToReplaceInCodeMap.command);
            initLeftScroll(getCommandsImgArr(choosenCommandInElement));
            //описать клик замена
            initRightScroll(getAllCommandsMenu(true));
            codeView.menu.setMenuVisible(false);
        }
    });
    itemAdd.setUserData({
        onClick: function () {
            //описать клик добавление
            itemToAddAfterInCodeMap = element;
            //описать клик замена
            initRightScroll(getAllCommandsMenu(true));
            initLeftScroll(getCommandsImgArr(choosenCommandInElement));
            codeView.menu.setMenuVisible(false);
        }
    });
    this.getMenuItems = function () {
        if (this.itemsArray !== undefined && this.itemsArray.length > 0)
            return this.itemsArray;
    }

    this.setSettings = function (parent) {
        if (element !== undefined) {
            var x = element.x;
            var y = element.y;
            var WH = element.w;
            OOP.forArr(this.itemsArray, function (el) {
                el.w = WH;
                el.h = WH;
            });
            itemMove.x = x - WH;
            itemMove.y = y - WH;
            itemReplace.x = x + WH;
            itemReplace.y = y - WH;
            itemAdd.x = x - WH;
            itemAdd.y = y + WH;
            itemDelete.x = x + WH;
            itemDelete.y = y + WH;
        }
        //Если в функцию передали родителя, то проверяем надо ли сместить все элементы вниз или вверх, чтобы меню было видно полностью
        if (parent) {
            var bG = parent.getBackground();
            var minY = bG.y + bG.h;
            var maxY = 0;
            var minX = bG.x + bG.w;
            var maxX = 0;

            OOP.forArr(this.itemsArray, function (el) {
                if (el.y + el.h > maxY) maxY = el.y + el.h;
                if (el.y < minY) minY = el.y;
                if (el.x + el.w > maxX) maxX = el.x + el.w;
                if (el.x < minX) minX = el.x;
            });
            var shiftY = 0;
            var shiftX = 0;

            if (minY < bG.y) shiftY = (minY - bG.y) * -1;
            else if (maxY > bG.y + bG.h) shiftY = (bG.y + bG.h) - maxY;

            if (minX < bG.x) shiftX = bG.x - minX;
            else if (maxX > bG.x + bG.w) shiftX = (bG.x + bG.w) - maxX;

            if (shiftY != 0 || shiftX != 0) parent.elementsMove(shiftX, shiftY, true, true);
        }
    }
    this.openMenu = function (item, parent) { //функция испотльзуеться извне, получает ссылку на элемент по которому кликнули, устанавливает позиции в соответствующих местах и включает видимость элементов
        element = item;
        //var con = findObjStorage(lastClickedElement.commands, item.command);
        this.setSettings(parent);
        this.setMenuVisible(true)
    }
    this.closeMenu = function () { //удаляем ссылку на элемент, отключаем видимость меню
        element = undefined;
        this.setMenuVisible(false);
    }
}
//СКРИПТ ОПИСЫВАЕТ МЕТОДЫ И ДАННЫЕ ИГРОКА, КОТОРЫЙ ПРОХОДИТ ЛАБИРИНТ
//Позиция игрока на поле
var playerPozition = 0,
    lastPlayerPoz = 0;
//Текущая команда для выполнения
var playerCommands = new Array(); //стек команд игрока
var lastReadedCommands = new Array(); //буфер для хранения последнего считанного с карты набора команд(для отображения его в код мапе)
var playerStatesBuff = new Array(); //стек состояний игрока
//Текущая лицевая сторона
var playerFrontSide = 0; //0 верх, 1 право, 2 низ, 3 лево
//Время старта движения робота, с отсчетом от глобального таймера в милисекундах
var startPlayerMoveTime = 0;
var startPoz = 0;
var freezCounter = 0;//Счетчик того сколько ходов уже робот стоит на месте
//Инициализация игрока
function playerSetStart() {
    //Ищем местоположение двери
    OOP.forArr(field, function (f, indx) {
        //Если нашли вход в лабиринт
        if (f.code == entryCode) {
            //Запоминаем позицию на поле
            playerPozition = indx;
            startPoz = indx;
            //Генерим графическое представление игрока для отображение
            movePlayerToFieldElement(field[playerPozition]);
            //Задаем направление, куда смотрит персонаж
            playerSetDirection(getPlayerDirFromSide());
            //Обнуляем счетчик времени
            startPlayerMoveTime = 0;
            freezCounter = 0;
            //Обнуляем счетчик ходов робота
            playerMoveCount = 0;
            lastPlayerPoz = -1;
            //Инициализируем стек команд
            playerCommands = new Array();
            //Инициализируем стек состояний игрока
            playerStatesBuff = new Array();
            //Инициализируем буфер для хранения последнего считанного с карты набора команд(для отображения его в код мапе)
            lastReadedCommands = new Array();
            return;
        }
    });
}

//Делает ход. Обрабатывает исходную команду и запоминает новую
//Возвращает end - если робот достиг выхода из лабиринта
//Возвращает "", если робот все сделал правильно и выполнил команду
//Возвращает любую другую строку с текстом, если у робота возникли сложности
function playerMove(canRead) {
    playerMoveCount++;
    var code = field[playerPozition].code;
    var dir = 0;

    var pPoz = playerPozition;
    var pozBuff = pPoz;
    var isTrueDir = true;
    var isShift = true;
    if (!canRead) { //Добавляем команды из текущего элемента поля в стек команд игрока
        addCommandsToPlayer(field[playerPozition].getCommands(true));
    }
    //Если стек пустой, то возвращаем ошибку
    if (playerCommands.length === 0) return lang[selectLang]['robot_not_know'];
    //Обрабатываем самую верхнюю команду
    var comm = playerCommands[0];

    //Обрабатываем команды
    switch (comm.name) { //Обрабатываем верхнюю команду
        case "up": //Вверх
            code = field[playerPozition + totalWidth].code;
            pPoz += totalWidth;
            isTrueDir = playerFrontSide == 0;
            dir = 0;
            break;
        case "down": //Вниз
            code = field[playerPozition - totalWidth].code;
            pPoz -= totalWidth;
            isTrueDir = playerFrontSide == 2;
            dir = 2;
            break;
        case "left": //Влево
            code = field[playerPozition + 1].code;
            pPoz++;
            isTrueDir = playerFrontSide == 3;
            dir = 3;
            break;
        case "right": //Вправо
            code = field[playerPozition - 1].code;
            pPoz--;
            isTrueDir = playerFrontSide == 1;
            dir = 1;
            break;
        case "forward":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[1];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[4];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[2];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[3];
            return playerMove(false);
            break;
        case "back":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[2];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[3];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[1];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[4];
            return playerMove(false);
            break;
        case "onleft":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[3];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[1];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[4];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[2];
            return playerMove(false);
            break;
        case "onright":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[4];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[2];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[3];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[1];
            return playerMove(false);
            break;
        case "clockwise": //Повернуться по часовой стрелке
            //Задаем направление того, куда смотрит робот
            playerSetDirection(playerFrontSide + 1);
            break;
        case "unclockwise": //Повернуться против часовой стрелк
            //Задаем направление того, куда смотрит робот
            playerSetDirection(playerFrontSide - 1);
            break;
        case "stop": //Остановиться на текущей клетке
            playerCommands = new Array();
            //Запоминаем новую позицию игрока на поле
            playerPozition = pPoz;
            lastPlayerPoz = playerPozition + 1; //Для того чтобы при следующем ходе снова считать команды
            return "stop";
            break;
        case "pickup":
            var res = tryToPickUp();
            if (res != "") return res;
            break;
        case "drop":
            if (playerInventory === undefined || playerInventory.length == 0) return lang[selectLang]['inventory_is_empty'];
            //Если инвентарь не пуст, то выгружаем последний подобранный элемент на текущую позицию карты
            playerInventory[0].setNewPosition(playerPozition);
            playerInventory[0].startRotation();
            gameObjects.push(playerInventory[0]);
            playerInventory.splice(0, 1);
            break;
        case "repeat":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionREPEAT(comm.countBlock, comm.commandsBlock);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                //addCommandsToPlayer(comms, true);
                insertArrayAt(playerCommands, 0, comms);
                drawCommState();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            else {//Если блок условия не дал true
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            break;
        case "repeatif":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionIF(comm.blockA, comm.blockB, comm.commandsBlock, undefined);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                //addCommandsToPlayer(comms, true);
                insertArrayAt(playerCommands, 0, comms);
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            else {//Если блок условия не дал true
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            break;
        case "if":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionIF(comm.blockA, comm.blockB, comm.commandsBlock, comm.elseBlock);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                insertArrayAt(playerCommands, 0, comms);
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            else{//Если блок условия не дал true
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            break;
    }

    //Если направление в котором планирует сдвинутся робот не совпадает с его передней стороной
    if (!isTrueDir) {
        if (difficultyLevel == "EASY") { //Если уровень сложности изи то поворачиваем робота в нужную сторону
            turnToTrueDirection(dir);
            return playerMove(false);
        } else return lang[selectLang]['robot_not_look_there'];
    }
    //Проверяем на бесконечный цикл
    if(freezCounter >= infinityCycleSteps){
        return lang[selectLang]['robot_enter_infinity_cycle'];
    }
    freezCounter++;
    //Проверяем - сможет ли робот сдвинуться в эту сторону или нет
    if (code == roadCode || code == exitCode || code == entryCode) {

        //Убираем из стека обработанную команду
        if (isShift) {
            removeUpperCommandFromPlayer();
        }
        //Запоминаем предыдущее местоположение робота
        lastPlayerPoz = playerPozition;
        //Запоминаем новую позицию игрока на поле
        playerPozition = pPoz;
        //Если достигли выхода из лабиринта
        if (code == exitCode) {
            return "end";
        }
    } else if(pozBuff !== pPoz) return lang[selectLang]['crashed_the_wall'];
    //Передвигаем игрока в нужную клетку
    movePlayerToFieldElement(field[playerPozition]);
    if(pPoz !== pozBuff) freezCounter = 0;//Если робот дошёл до этой строчки кода, значит он ствинулся следовательно сбрасываем счетчик
    drawCommState();
    return "";
}

//Вызывает отрисовку текущей выполняемой команды на карте кода
function drawCommState(isRegenCodeMap){
    if(!isVerticalScreen) {
        if(isRegenCodeMap)
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastReadedCommands, undefined, undefined, passiveItemsAlpha, playerCommands[0]);
        codeView.setAlphaToElement(passiveItemsAlpha,playerCommands[0]);
    }
}

//Удаляет верхнюю команду из стека команд робота и сохраняет состояние робота в буфер состояний
function removeUpperCommandFromPlayer() {
    //Сохранаяем текущее состояние стека команд в буфер
    var copy = [];
    OOP.forArr(playerCommands, function (el) {
        copy.push(el);
    });
    //ДОбавляем состояние игрока в буфер состояний
    playerStatesBuff.unshift(new PlayerState(playerPozition, playerFrontSide, copy));
    //Удаляем верхнюю команду из стека команд игрока
    playerCommands.shift();
}

//Возвращает робота на шаг назад
function setPreviousStateToPlayer() {
    if (playerStatesBuff && playerStatesBuff.length > 0) {
        playerPozition = playerStatesBuff[0].position;
        //Возвращаем игрока на предыдущую позицию
        if (playerStatesBuff[0].position == startPoz) {
            playerSetStart();
            addCommandsToPlayer(field[playerPozition].getCommands());
            //СБрасываем флаг для чтения команд
            OOP.forArr(field, function (el) {
                el.isCommandsReaded = false;
            });
            return;
        } else movePlayerToFieldElement(field[playerStatesBuff[0].position]);
        //Разворачиваем его куда нужно
        playerSetDirection(playerStatesBuff[0].direction);
        //Инициализируем стек команд робота
        playerCommands = [];
        OOP.forArr(playerStatesBuff[0].commands, function (el) {
            playerCommands.push(el);
        });
        //Убираем обработанный элемент
        playerStatesBuff.shift();
        drawCommState(true);
    }
}

//Добавляет набор команд в текущий буфер(стек) команд игрока
function addCommandsToPlayer(comm, dontClear) {
    //Если добавлять нечего
    if (!comm || comm.length === 0) return;
    //Если считали команды с клетки поля
    if (!dontClear) {
        playerCommands = new Array();
    }
    //Добавляем все элементы из comm в НАЧАЛО стека
    //Только если мы сдвинулись с прошлой клетки(Запись в буфер команд происходит только один раз с клетки) ну или робот не знает что делать
    //if(lastPlayerPoz != playerPozition){
    for (var i = comm.length - 1; i >= 0; i--) {
        playerCommands.unshift(getCopyOfObj(comm[i]));
    }
    //Если команды были считаны с клетки поля то сохраняем их в буфер для построения карты кода
    if (!dontClear) {
        lastReadedCommands = new Array();
        OOP.forArr(playerCommands, function (el) {
            lastReadedCommands.unshift(el);
        });
    }
    drawCommState(true);
}

function turnToTrueDirection(dir) {

    if (dir != playerFrontSide) {
        if ((dir == 3 && playerFrontSide == 0) || (dir < playerFrontSide && dir != 0)) playerCommands.unshift(COMMANDS[6]); //Чтобы робот не крутился а просто повернулся против часовой если смотрит вверх
        else if ((dir == 0 && playerFrontSide == 3) || dir > playerFrontSide) playerCommands.unshift(COMMANDS[5]); //Поворачиваем робота по часовой
        else playerCommands.unshift(COMMANDS[6]);
    }

}

//Метод для сбор вещей в инвентарь(возвращает строку с текстом ошибки или пустую строку)
function tryToPickUp() {
    if (gameObjects !== undefined && gameObjects.length > 0) {
        //Ищем игровой обьект, который находится на той же клетке что и игрок
        for (var i = 0; i < gameObjects.length; i++) {
            //Если нашли
            if (gameObjects[i].position == playerPozition) {
                gameObjects[i].stopRotating();
                //Переносим его в инвентарь
                playerInventory.push(gameObjects[i]);
                playerInventory[playerInventory.length - 1].__proto__ = gameObjects[i].__proto__;
                gameObjects.splice(i, 1);
                return "";
            }
        }
    }
    return lang[selectLang]['robot_not_find_object'];
}

//Устанавливает текущее направление обзора робота
function playerSetDirection(direction) {
    //Контролируем идентификаторы поворота робота
    if (direction < 0) direction = 3;
    else if (direction > 3) direction = 0;
    //Обрабатываем сторону
    if (direction === 0) playerImageObj.angle = 0;
    else if (direction == 2) playerImageObj.angle = 180;
    else if (direction == 3) playerImageObj.angle = -90;
    else if (direction == 1) playerImageObj.angle = 90;
    playerFrontSide = direction;
}

//Перемещает игрока на заданный элемент поля
function movePlayerToFieldElement(fEl) {
    //Если объект игрока ещё не создан
    if (playerImageObj === null) {
        playerImageObj = game.newImageObject({
            file: playerImgSrc,
            x: fEl.x,
            y: fEl.y,
            w: fEl.w,
            h: fEl.h
        });
    } else //Если он уже есть, то просто смещаем его в нужную позицию
    {
        playerImageObj.x = fEl.x;
        playerImageObj.y = fEl.y;
        playerImageObj.w = fEl.w;
        playerImageObj.h = fEl.h;
    }
    if(labView) labView.setFocusOnElement(field[playerPozition],false);
}

//Задает направление для персонажа, исходя из того, где находится вход в лабиринт
function getPlayerDirFromSide() {
    if (entrySide == "LEFT") return 1;
    if (entrySide == "UP") return 2;
    if (entrySide == "RIGHT") return 3;
    return 0;
}

//Возвращает время в милисекундах от старта движения робота
function getPlayerMoveTime() {
    return totalMiliSeconds - startPlayerMoveTime;
}

function insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
}

function PlayerState(pos, dir, comms) {
    this.position = pos;
    this.direction = dir;
    this.commands = comms;
}

function wait(miliSec){
    var e = new Date().getTime() + miliSec;
    while (new Date().getTime() <= e) {

    };
}
var back = undefined;
game.newLoopFromConstructor('SecondScreen', function () {
    //Код для старта игры
    this.entry = function () {
        initInputEvents();
        isSecondScreen = true;
        codeMapBackGroundInit("#000000", 0.4);
        codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
        initRightScroll([]);
        codeView.resetZoomer();
        codeView.createCodeMap(0, textbackGroundItem.h, lastClickedElement.commands, true, true, 1, true);
        if(lastClickedElement.commands.length == 0){
            onCodeMapElementClick(codeView.getAllElems()[0]);
        }
    }
    //Код для завершения цикла
    this.exit = function () {
        removeInputEvents();
        codeView.clear();
    };

    //Код для апдейта игры
    this.update = function () {
        if (inputCommandStates == 0)
            codeView.drawCodeMap();
        showCommandsMenu();
        //Отрисовываем элементы интерфейса
        drawGUI();
        if(isDrawFPS) {
            brush.drawTextS({
                x:width / 2,
                text: system.getFPS(),
                color: "lawngreen",
                size: 30
            });
        }
    };
});
/*
Главный скрипт игры. Содержит логику игрового процесса.
Методы и данные для работы игровой логики
*/
//Переменные для хранения размера области игрbы(Области где будет отображаться игра)
var gameSpaceX = 0,
    gameSpaceY = 0;
var gameSpaceW = 0,
    gameSpaceH = 0;

var totalWidth = labyrinthSize; //Колличество блоков в строку(в начале игры)
var totalHeight = labyrinthSize; //Колличество блоков в столбец(в начале игры)
var totalCommandsAllowed = 0; //Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)
var totalLabCompleted = 0; //Счетчик пройденных лабиринтов
var totalAttempts = 0; //Счетчик попыток прохождения уровня
var lastClickedElement = undefined; //Последний элемент карты по которому кликал пользователь(нужно для построения карты кода)
var choosenCommandInElement = undefined; //Индекс команды в массиве команд которую редактирует игрок
var menuStatesArr = new Array();
var isEntried = false; //Флаг для обозначения того, что игра уже была инициализирована и не нужно пересоздавать всю игру при перезагрузке
var isStarted = false; //Флаг для старта/стопа игры
var itemToReplaceInCodeMap = undefined; //Переменная для хранения ссылки на обьект который нужно заменить в codeView
var itemToAddAfterInCodeMap = undefined; //Переменная которая хранит обьект из codeMap после которого надо добавить элемент
var timeTimerLaunched = false;
var isSecondScreen = false;
var isVerticalScreen = undefined;
var widthBuff = width;
var dialog = undefined;
//Переменная для хранения состояний меню ввода команд:
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - counter или repeat
// 4 - commandBlock или count
// 5 - elseBlock
var inputCommandStates = 0;
var labView, codeView;
var test = 0;
//Игровой цикл
game.newLoopFromConstructor('Labyrinth', function () {
    //Код для старта игры
    this.entry = function () {
        var userID = sessionStorage.getItem("userdata")
        var isNewGame = sessionStorage.getItem("typeGame") //получаем информацию о том, загружаемся или это новая игра
        sessionStorage.removeItem("typeGame") //удаляем из сессии информацию о том загрузка это или новая игра
        var buf = localMemory.loadAsObject(userID);
        userData = new UserAccaunt();
        if (buf && isNewGame != "NewGame") {
            //userData = new UserAccaunt();
            userData.copy(buf);
        }
        //Инициализируем события для перехвата ввода
        initInputEvents();
        if (isEntried) return;
        //Смотрим смартфон или ПК у нас
        isMobile = touch.isMobileDevice();
        //Создаем все объекты для игры
        initializeGame(true);
        //Запускаем таймер который сохраняет состояние игры
        saveTimer();
        //Инициализируем таймер времени
        if (!timeTimerLaunched) {
            totalTimeTimer();
            logicEventTimer();
        }
        timeTimerLaunched = true;
        //mainbackGround = new mainBackGroundDrow();
        isEntried = true;
    };
    //Код для завершения игры
    this.exit = function () {
        //Удаляем обработчики ввода со странички
        removeInputEvents();
    };
    //Код для апдейта игры
    this.update = function () {
        //Обновляем графику
        updateScreen();
    };
});

//Запускает таймер который следит за изменениями параметров экрана
function saveTimer() {
    //сохраняем состояние игры
    if (userData !== undefined) {
        userData.save(true, totalSeconds, field, playerInventory, gameObjects, entrySide);
    }
    setTimeout("saveTimer()", saveTimeout);
}

//Таймер, который контролирует логические процессы игры(Смена ориентации экрана, события тултипов)-----------------------------------------------------------
function logicEventTimer(){
    //Проверяем смену ориентации экрана
    if(game.getWH().w != width){
        recalcScreen();
    }
    if(toolTip && !toolTip.isVisible() && toolTipTimeCounter >= toolTipDelay){
        toolTipShowEvent(clickCoord.x,clickCoord.y);
        toolTipTimeCounter = 0;
    }
    else toolTipTimeCounter += 40;
    setTimeout("logicEventTimer()", 40);
}

function totalTimeTimer() {
    totalSeconds++;
    setTimeout("totalTimeTimer()", 1000);
}
//Функция перерасчитывает параметры всех графических элементов
function recalcScreen(){
    if(isSecondScreen){
        allButtons.backToStartButton.setAlpha(1);
        allButtons.stepDownButton.setAlpha(1);
        allButtons.stepUpButton.setAlpha(1);
        isSecondScreen = false;
        game.setLoop("Labyrinth");
    }
    if (lastClickedElement) lastClickedElement.setStroke(false);
    width = game.getWH().w;
    height = game.getWH().h;
    //Пересчитываем позиции всех элементов
    initGameSpace();
    calcMapPosition();
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    labView.checkGameObjects();//Ставим обьекты на место
    Scrolls.splice(0,Scrolls.length);
    initGUI();
    //Инициализируем обьект для вывода карты кода
    if (!codeMapBG) {
        codeView = new CodeMapView(0, 0, 0, 0, "white");
    } else codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
    //Показываем кнопку старт или стоп
    allButtons.mainButton.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
    //Если у робота есть команды в инвентаре или игра запущена
    if(isStarted || playerCommands && playerCommands.length > 0){
        //Если игра перешла в горизонтальное отображение, то надо перегенерит кодмап
        if(!isVerticalScreen){
            drawCommState(true);
        }
    }
    labView.setFocusOnElement(field[playerPozition],true);
}

//Инициализация лабиринта
function initializeGame(isInit) {
    game.clear();
    initGameSpace();
    menuStatesArr = null;
    menuStatesArr = new Array();
    //Создаем новое поле
    if (isInit) {
        if (userData) {
            field = userData.load(true, gameObjects, playerInventory, initGUI)
            if (field.length <= 0)
                generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
        } else {
            initLabirint();
        }
    } else {
        initLabirint();
    }
    allButtons = new Buttons();
    dialog = new Dialog();
    //Рассчитываем сколько команд можно поставить на этом поле для прохождения
    totalCommandsAllowed = (totalWidth + totalHeight) * 2;
    //Инициализируем обьекты для вывода графики лабиринта
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    //Создаем игрока
    playerSetStart();
    totalAttempts = 0;
    //mainbackGround = new mainBackGroundDrow();
    //Инициализируем обьект для вывода карты кода
    if (!codeMapBG) {
        codeView = new CodeMapView(0, 0, 0, 0, "white");
    } else codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
    if(Scrolls) Scrolls.splice(0);
    recalcScreen();
}

function initLabirint() {
    //Запоминаем команды в клетке с входом, чтобы перенести их в следующий лабиринт(Если там больше одной команды)
    var comms = undefined;
    if (field) {
        OOP.forArr(field, function (el) {
            if (el.code == entryCode && el.commands.length > 1) {
                comms = el.commands;
                return;
            }
        });
    }
    //Генерим лабиринт
    field = new Array();
    initGUI();
    generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
    //Сбрасываем счетчик времени
    totalSeconds = 0;
    //Если из прошлого лабиринта были команды в клетке entry то переносим их в текущий лабиринт
    if (comms) {
        OOP.forArr(field, function (el) {
            if (el.code == entryCode) {
                el.commands = comms;
                return;
            }
        });
    }
}

function initGameSpace() {

    if (width < height) {
        gameSpaceX = 0;
        gameSpaceY = height / 100 * 15
        gameSpaceW = width;
        gameSpaceH = gameSpaceW;
        isVerticalScreen = true;

    } else {
        gameSpaceX = height / 100 * 15;
        gameSpaceY = (height / 100 * 15) / 5;
        gameSpaceH = height / 100 * 85;
        gameSpaceW = gameSpaceH
        isVerticalScreen = false;
    }
}

//Возвращает число команд на поле всего
function getTotalCommandsOnField() {
    var counter = 0;
    OOP.forArr(field, function (el) {
        counter += el.getTotalCommands();
    });
    //counter += playerCommands.length;
    return counter;
}

//Обработка нажатий на поле
function setFocused(fieldElem, indx) {

    //Если нажали на недоспустимый элемент
    if ((fieldElem.code != roadCode && fieldElem.code != entryCode) || isStarted) {
        return;
    }
    //Cохраняем номер текущего
    lastClickedIndx = indx;
    if (lastClickedElement) lastClickedElement.setStroke(false);
    //Запоминаем последний кликнутый пользователь элемент
    lastClickedElement = field[lastClickedIndx];
    inputCommandStates = 0;
    dialog.setShowDialog(false);
    //Выделяем в рамку объект по которому нажали
    field[indx].setStroke(true);
    //Если ориентация экрана горизонтальная, то
    if (!isVerticalScreen) {
        //Инициализируем левый скролл
        initLeftScroll(field[lastClickedIndx].getCommandsImagesArr());
        initRightScroll([]);
        codeView.resetZoomer();
        codeView.createCodeMap(0, textbackGroundItem.h, lastClickedElement.commands, true, true, 1, true);
        if(lastClickedElement.commands.length == 0){
            onCodeMapElementClick(codeView.getAllElems()[0]);
        }
        
    } else { //Если ориентация экрана вертикальная
        clearAllLayers();
        allButtons.backToStartButton.setAlpha(inactiveItemsAlpha);
        allButtons.stepDownButton.setAlpha(inactiveItemsAlpha);
        allButtons.stepUpButton.setAlpha(inactiveItemsAlpha);
        //Показываем кнопку ok
        allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
        
        game.setLoop("SecondScreen")
    }
}

//Функция обработчик для добавления команды в клетку
//CommandImg - ImgObj по которому кликнули
//dontAdd - флаг для того чтобы не добавлять элемент а выбирать как активный
function addCommandToCell(commandImg, dontAdd) {

    if (!dontAdd) { //Если добавляем команду

        if (inputCommandStates == 1) { //Если у нас простая команда и мы добавляем ее тупо в клетку
            choosenCommandInElement.push(getCopyOfObj(commandImg.command));
            if (commandImg.command.commandsBlock) onOkBClick();
            else initLeftScroll(getCommandsImgArr(choosenCommandInElement));
        } else if (inputCommandStates == 2) { //Если выбираем blockA
            var comm = getCopyOfObj(COMMANDS[10]); //Инициализируем команду whatisit
            comm.lookCommand = commandImg.command; //Инитим параметр lookCommand
            choosenCommandInElement.blockA = comm;
            inputCommandStates = 0;
            if(isVerticalScreen) initLeftScroll();
            else initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(codeMapBG.x,codeMapBG.y, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 3) { //Если выбираем blockB
            choosenCommandInElement.blockB = commandImg.command;
            inputCommandStates = 0;
            if(isVerticalScreen) initLeftScroll();
            else initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(codeMapBG.x,codeMapBG.y, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 0) { //Если редактируем команды из codeView
            if (itemToReplaceInCodeMap) { //Если нужно заменить элемент
                //Находим массив в котором хранится команда для замены
                var elemStor = findObjStorage(lastClickedElement.commands, itemToReplaceInCodeMap.command);
                //Находим ее в массиве и заменяем
                OOP.forArr(elemStor, function (el, i) {
                    if (el == itemToReplaceInCodeMap.command) {
                        elemStor[i] = commandImg.command;
                        return;
                    }
                });
                //Очищаем буфер для хранения обьекта для замены и скролл
                itemToReplaceInCodeMap = undefined;
                initLeftScroll(getCommandsImgArr(elemStor));
                initRightScroll([]);
                if(isVerticalScreen) initLeftScroll();
                codeView.createCodeMap(codeMapBG.x,codeMapBG.y, lastClickedElement.commands, true, true);
            }
            if (itemToAddAfterInCodeMap) { //Если нужно добавить элемент не в конец списка а после опредленного
                //Находим массив в котором хранится команда для замены
                var elemStor = findObjStorage(lastClickedElement.commands, itemToAddAfterInCodeMap.command);
                var indx = 0;
                //Находим ее в массиве и заменяем
                OOP.forArr(elemStor, function (el, i) {
                    if (el == itemToAddAfterInCodeMap.command) {
                        indx = i + 1;
                        return;
                    }
                });
                var clone = getCopyOfObj(commandImg.command);
                elemStor.splice(indx, 0, clone);
                itemToAddAfterInCodeMap.command = clone;
                if (commandImg.command.commandsBlock) onOkBClick();
                initLeftScroll(getCommandsImgArr(choosenCommandInElement));
            }
        }
        return;
    }
    //Меняем состояние меню в зависимости от типа команды
    changeMenuState(commandImg);
}

//Задает состояние меню в зависимости от типа команды
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - blockC
// 4 - commandBlock или count
// 5 - elseBlock
function changeMenuState(commandImg) {

    var commName = commandImg.name ? commandImg.name : commandImg.command.name;
    //Скрываем текстовое поле ввода итераций в цикле, если оно не скрыто
    if (inputCounterText && inputCounterText.visible && choosenCommandInElement.name != "repeat") inputCounterText.visible = false;

    if (commName == "plus") {
        inputCommandStates = 1;
        //initLeftScroll([]);
        initLeftScroll(getCommandsImgArr(choosenCommandInElement))
        initRightScroll(getAllCommandsMenu(commandImg.commandName && commandImg.commandName != "empty"));
    } else if (commName == "blockA" || commName == "whatisit") {
        inputCommandStates = 2;
        initLeftScroll([]);
        initRightScroll(getAllDirections());

    } else if (commName == "blockB") {
        inputCommandStates = 3;
        initLeftScroll([]);
        initRightScroll(getAllInteractGameObjects());

    } else if (commName == "counter") {
        inputCommandStates = 4;
        initLeftScroll([]);
        //Инициализируем клавиатуру для ввода цифр
        initRightScroll(getDigitKeyboardImages());
        infoText.setText(choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count + "");
    }
}

//indexArray - индекс массива команд клетки в стеке команд клетки, indexELem - индекс элемента из этого массива команд для удаления
function removeCommandFromCell(indexArray, indexElem) {
    if (inputCommandStates == 0) { //ОБЫЧНЫЙ ЭЛЕМЕНТ НА ПОЛЕ
        //Удаляем команду из списка команд
        field[lastClickedIndx].removeCommand(indexElem);
        //инициазируем скролл новым списком
        //initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
        initLeftScroll(field[lastClickedIndx].getCommandsImagesArr());
    } else if (menuStatesArr.length > 0 && (inputCommandStates == 4 || inputCommandStates == 5)) { //COMMANDSBLOCK

        if (menuStatesArr[0].name == "if") {
            if (menuStatesArr[0].redacted == "commands") {
                var indx = menuStatesArr[0].commandsBlock.actions.length - 1 - indexElem;
                menuStatesArr[0].commandsBlock.actions.splice(indx, 1);
                //initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
                initLeftScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
            } else if (menuStatesArr[0].redacted == "else") {
                var indx = menuStatesArr[0].elseBlock.actions.length - 1 - indexElem;
                menuStatesArr[0].elseBlock.actions.splice(indx, 1);
                //initDownScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));
                initLeftScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));
            }
        } else if (menuStatesArr[0].name == "repeatif" || menuStatesArr[0].name == "repeat") {
            var indx = menuStatesArr[0].commandsBlock.actions.length - 1 - indexElem;
            menuStatesArr[0].commandsBlock.actions.splice(indx, 1);
            //initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
            initLeftScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
        }
    }
}

//Обработчик поведения робота
function processRobotMove() {
    var res = playerMove();

    if (res == "end") { //Если мы прошли до конца карты
        robotOn = false;
        if (isLabyrinthGrow) {
            if (labyrinthMaxSize !== 0 && totalWidth + 2 > labyrinthMaxSize && totalHeight + 2 > labyrinthMaxSize) {
                log("Лабиринт достиг максимально допустимого размера");
            } else {
                labyrinthSize += 2;
                totalWidth = labyrinthSize;
                totalHeight = labyrinthSize;
            }
        }
        isStarted = false;
        allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
        totalLabCompleted++;
        //Перезагружаем уровень с новым лабиринтом
        initializeGame();
    } else if (res == "stop") {
        showMessage(lang[selectLang]['robot_is_waiting']);
        isStarted = false;
        //allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    } else if (res != "") //Если у робота возникли проблемы
    {
        //alert(res); //Выводим их на экран
        //Останавливаем цикл движения игры
        isStarted = false;
        allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
        //СБрасываем флаг для чтения команд
        OOP.forArr(field, function (el) {
            el.isCommandsReaded = false;
        });
        //Ставим робота на вход в лабиринт
        playerSetStart();
        //Очищаем карту кода
        codeView.clear();
        showMessage(res);
    } else if (isStarted) setTimeout("processRobotMove()", robotMoveDelay);
    //camera.follow( playerImageObj, 1 );
}

function showMessage(text) {
    messageBox.setShow(true);
    messageBox.setText(text);
    //allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
}

game.startLoop('Labyrinth');
//game.startLoop('menu');
