/*
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.2
 */
(function (c, b) {
    var a = a || function (k) {
            var f = {
                element: null,
                dragger: null,
                disable: "none",
                addBodyClasses: true,
                hyperextensible: true,
                resistance: 0.5,
                flickThreshold: 50,
                transitionSpeed: 0.3,
                easing: "ease",
                maxPosition: 266,
                minPosition: -266,
                tapToClose: true,
                touchToDrag: true,
                slideIntent: 40,
                minDragDistance: 5
            }, e = {
                simpleStates: {
                    opening: null,
                    towards: null,
                    hyperExtending: null,
                    halfway: null,
                    flick: null,
                    translation: {absolute: 0, relative: 0, sinceDirectionChange: 0, percentage: 0}
                }
            }, h = {}, d = {
                hasTouch: (b.ontouchstart === null), eventType: function (m) {
                    var l = {
                        down: (d.hasTouch ? "touchstart" : "mousedown"),
                        move: (d.hasTouch ? "touchmove" : "mousemove"),
                        up: (d.hasTouch ? "touchend" : "mouseup"),
                        out: (d.hasTouch ? "touchcancel" : "mouseout")
                    };
                    return l[m]
                }, page: function (l, m) {
                    return (d.hasTouch && m.touches.length && m.touches[0]) ? m.touches[0]["page" + l] : m["page" + l]
                }, klass: {
                    has: function (m, l) {
                        return (m.className).indexOf(l) !== -1
                    }, add: function (m, l) {
                        if (!d.klass.has(m, l) && f.addBodyClasses) {
                            m.className += " " + l
                        }
                    }, remove: function (m, l) {
                        if (f.addBodyClasses) {
                            m.className = (m.className).replace(l, "").replace(/^\s+|\s+$/g, "")
                        }
                    }
                }, dispatchEvent: function (l) {
                    if (typeof h[l] === "function") {
                        return h[l].call()
                    }
                }, vendor: function () {
                    var m = b.createElement("div"), n = "webkit Moz O ms".split(" "), l;
                    for (l in n) {
                        if (typeof m.style[n[l] + "Transition"] !== "undefined") {
                            return n[l]
                        }
                    }
                }, transitionCallback: function () {
                    return (e.vendor === "Moz" || e.vendor === "ms") ? "transitionend" : e.vendor + "TransitionEnd"
                }, canTransform: function () {
                    return typeof f.element.style[e.vendor + "Transform"] !== "undefined"
                }, deepExtend: function (l, n) {
                    var m;
                    for (m in n) {
                        if (n[m] && n[m].constructor && n[m].constructor === Object) {
                            l[m] = l[m] || {};
                            d.deepExtend(l[m], n[m])
                        } else {
                            l[m] = n[m]
                        }
                    }
                    return l
                }, angleOfDrag: function (l, o) {
                    var n, m;
                    m = Math.atan2(-(e.startDragY - o), (e.startDragX - l));
                    if (m < 0) {
                        m += 2 * Math.PI
                    }
                    n = Math.floor(m * (180 / Math.PI) - 180);
                    if (n < 0 && n > -180) {
                        n = 360 - Math.abs(n)
                    }
                    return Math.abs(n)
                }, events: {
                    addEvent: function g(m, l, n) {
                        if (m.addEventListener) {
                            return m.addEventListener(l, n, false)
                        } else {
                            if (m.attachEvent) {
                                return m.attachEvent("on" + l, n)
                            }
                        }
                    }, removeEvent: function g(m, l, n) {
                        if (m.addEventListener) {
                            return m.removeEventListener(l, n, false)
                        } else {
                            if (m.attachEvent) {
                                return m.detachEvent("on" + l, n)
                            }
                        }
                    }, prevent: function (l) {
                        if (l.preventDefault) {
                            l.preventDefault()
                        } else {
                            l.returnValue = false
                        }
                    }
                }, parentUntil: function (n, l) {
                    var m = typeof l === "string";
                    while (n.parentNode) {
                        if (m && n.getAttribute && n.getAttribute(l)) {
                            return n
                        } else {
                            if (!m && n === l) {
                                return n
                            }
                        }
                        n = n.parentNode
                    }
                    return null
                }
            }, i = {
                translate: {
                    get: {
                        matrix: function (n) {
                            if (!d.canTransform()) {
                                return parseInt(f.element.style.left, 10)
                            } else {
                                var m = c.getComputedStyle(f.element)[e.vendor + "Transform"].match(/\((.*)\)/), l = 8;
                                if (m) {
                                    m = m[1].split(",");
                                    if (m.length === 16) {
                                        n += l
                                    }
                                    return parseInt(m[n], 10)
                                }
                                return 0
                            }
                        }
                    }, easeCallback: function () {
                        f.element.style[e.vendor + "Transition"] = "";
                        e.translation = i.translate.get.matrix(4);
                        e.easing = false;
                        clearInterval(e.animatingInterval);
                        if (e.easingTo === 0) {
                            d.klass.remove(b.body, "snapjs-right");
                            d.klass.remove(b.body, "snapjs-left")
                        }
                        d.dispatchEvent("animated");
                        d.events.removeEvent(f.element, d.transitionCallback(), i.translate.easeCallback)
                    }, easeTo: function (l) {
                        if (!d.canTransform()) {
                            e.translation = l;
                            i.translate.x(l)
                        } else {
                            e.easing = true;
                            e.easingTo = l;
                            f.element.style[e.vendor + "Transition"] = "all " + f.transitionSpeed + "s " + f.easing;
                            e.animatingInterval = setInterval(function () {
                                d.dispatchEvent("animating")
                            }, 1);
                            d.events.addEvent(f.element, d.transitionCallback(), i.translate.easeCallback);
                            i.translate.x(l)
                        }
                        if (l === 0) {
                            f.element.style[e.vendor + "Transform"] = ""
                        }
                    }, x: function (m) {
                        if ((f.disable === "left" && m > 0) || (f.disable === "right" && m < 0)) {
                            return
                        }
                        if (!f.hyperextensible) {
                            if (m === f.maxPosition || m > f.maxPosition) {
                                m = f.maxPosition
                            } else {
                                if (m === f.minPosition || m < f.minPosition) {
                                    m = f.minPosition
                                }
                            }
                        }
                        m = parseInt(m, 10);
                        if (isNaN(m)) {
                            m = 0
                        }
                        if (d.canTransform()) {
                            var l = "translate3d(" + m + "px, 0,0)";
                            f.element.style[e.vendor + "Transform"] = l
                        } else {
                            f.element.style.width = (c.innerWidth || b.documentElement.clientWidth) + "px";
                            f.element.style.left = m + "px";
                            f.element.style.right = ""
                        }
                    }
                }, drag: {
                    listen: function () {
                        e.translation = 0;
                        e.easing = false;
                        d.events.addEvent(f.element, d.eventType("down"), i.drag.startDrag);
                        d.events.addEvent(f.element, d.eventType("move"), i.drag.dragging);
                        d.events.addEvent(f.element, d.eventType("up"), i.drag.endDrag)
                    }, stopListening: function () {
                        d.events.removeEvent(f.element, d.eventType("down"), i.drag.startDrag);
                        d.events.removeEvent(f.element, d.eventType("move"), i.drag.dragging);
                        d.events.removeEvent(f.element, d.eventType("up"), i.drag.endDrag)
                    }, startDrag: function (n) {
                        var m = n.target ? n.target : n.srcElement, l = d.parentUntil(m, "data-snap-ignore");
                        if (l) {
                            d.dispatchEvent("ignore");
                            return
                        }
                        if (f.dragger) {
                            var o = d.parentUntil(m, f.dragger);
                            if (!o && (e.translation !== f.minPosition && e.translation !== f.maxPosition)) {
                                return
                            }
                        }
                        d.dispatchEvent("start");
                        f.element.style[e.vendor + "Transition"] = "";
                        e.isDragging = true;
                        e.hasIntent = null;
                        e.intentChecked = false;
                        e.startDragX = d.page("X", n);
                        e.startDragY = d.page("Y", n);
                        e.dragWatchers = {current: 0, last: 0, hold: 0, state: ""};
                        e.simpleStates = {
                            opening: null,
                            towards: null,
                            hyperExtending: null,
                            halfway: null,
                            flick: null,
                            translation: {absolute: 0, relative: 0, sinceDirectionChange: 0, percentage: 0}
                        }
                    }, dragging: function (s) {
                        if (e.isDragging && f.touchToDrag) {
                            var v = d.page("X", s), u = d.page("Y", s), t = e.translation, o = i.translate.get.matrix(4), n = v - e.startDragX, p = o > 0, q = n, w;
                            if ((e.intentChecked && !e.hasIntent)) {
                                return
                            }
                            if (f.addBodyClasses) {
                                if ((o) > 0) {
                                    d.klass.add(b.body, "snapjs-left");
                                    d.klass.remove(b.body, "snapjs-right")
                                } else {
                                    if ((o) < 0) {
                                        d.klass.add(b.body, "snapjs-right");
                                        d.klass.remove(b.body, "snapjs-left")
                                    }
                                }
                            }
                            if (e.hasIntent === false || e.hasIntent === null) {
                                var m = d.angleOfDrag(v, u), l = (m >= 0 && m <= f.slideIntent) || (m <= 360 && m > (360 - f.slideIntent)), r = (m >= 180 && m <= (180 + f.slideIntent)) || (m <= 180 && m >= (180 - f.slideIntent));
                                if (!r && !l) {
                                    e.hasIntent = false
                                } else {
                                    e.hasIntent = true
                                }
                                e.intentChecked = true
                            }
                            if ((f.minDragDistance >= Math.abs(v - e.startDragX)) || (e.hasIntent === false)) {
                                return
                            }
                            d.events.prevent(s);
                            d.dispatchEvent("drag");
                            e.dragWatchers.current = v;
                            if (e.dragWatchers.last > v) {
                                if (e.dragWatchers.state !== "left") {
                                    e.dragWatchers.state = "left";
                                    e.dragWatchers.hold = v
                                }
                                e.dragWatchers.last = v
                            } else {
                                if (e.dragWatchers.last < v) {
                                    if (e.dragWatchers.state !== "right") {
                                        e.dragWatchers.state = "right";
                                        e.dragWatchers.hold = v
                                    }
                                    e.dragWatchers.last = v
                                }
                            }
                            if (p) {
                                if (f.maxPosition < o) {
                                    w = (o - f.maxPosition) * f.resistance;
                                    q = n - w
                                }
                                e.simpleStates = {
                                    opening: "left",
                                    towards: e.dragWatchers.state,
                                    hyperExtending: f.maxPosition < o,
                                    halfway: o > (f.maxPosition / 2),
                                    flick: Math.abs(e.dragWatchers.current - e.dragWatchers.hold) > f.flickThreshold,
                                    translation: {
                                        absolute: o,
                                        relative: n,
                                        sinceDirectionChange: (e.dragWatchers.current - e.dragWatchers.hold),
                                        percentage: (o / f.maxPosition) * 100
                                    }
                                }
                            } else {
                                if (f.minPosition > o) {
                                    w = (o - f.minPosition) * f.resistance;
                                    q = n - w
                                }
                                e.simpleStates = {
                                    opening: "right",
                                    towards: e.dragWatchers.state,
                                    hyperExtending: f.minPosition > o,
                                    halfway: o < (f.minPosition / 2),
                                    flick: Math.abs(e.dragWatchers.current - e.dragWatchers.hold) > f.flickThreshold,
                                    translation: {
                                        absolute: o,
                                        relative: n,
                                        sinceDirectionChange: (e.dragWatchers.current - e.dragWatchers.hold),
                                        percentage: (o / f.minPosition) * 100
                                    }
                                }
                            }
                            i.translate.x(q + t)
                        }
                    }, endDrag: function (m) {
                        if (e.isDragging) {
                            d.dispatchEvent("end");
                            var l = i.translate.get.matrix(4);
                            if (e.dragWatchers.current === 0 && l !== 0 && f.tapToClose) {
                                d.dispatchEvent("close");
                                d.events.prevent(m);
                                i.translate.easeTo(0);
                                e.isDragging = false;
                                e.startDragX = 0;
                                return
                            }
                            if (e.simpleStates.opening === "left") {
                                if ((e.simpleStates.halfway || e.simpleStates.hyperExtending || e.simpleStates.flick)) {
                                    if (e.simpleStates.flick && e.simpleStates.towards === "left") {
                                        i.translate.easeTo(0)
                                    } else {
                                        if ((e.simpleStates.flick && e.simpleStates.towards === "right") || (e.simpleStates.halfway || e.simpleStates.hyperExtending)) {
                                            i.translate.easeTo(f.maxPosition)
                                        }
                                    }
                                } else {
                                    i.translate.easeTo(0)
                                }
                            } else {
                                if (e.simpleStates.opening === "right") {
                                    if ((e.simpleStates.halfway || e.simpleStates.hyperExtending || e.simpleStates.flick)) {
                                        if (e.simpleStates.flick && e.simpleStates.towards === "right") {
                                            i.translate.easeTo(0)
                                        } else {
                                            if ((e.simpleStates.flick && e.simpleStates.towards === "left") || (e.simpleStates.halfway || e.simpleStates.hyperExtending)) {
                                                i.translate.easeTo(f.minPosition)
                                            }
                                        }
                                    } else {
                                        i.translate.easeTo(0)
                                    }
                                }
                            }
                            e.isDragging = false;
                            e.startDragX = d.page("X", m)
                        }
                    }
                }
            }, j = function (l) {
                if (l.element) {
                    d.deepExtend(f, l);
                    e.vendor = d.vendor();
                    i.drag.listen()
                }
            };
            this.open = function (l) {
                d.dispatchEvent("open");
                d.klass.remove(b.body, "snapjs-expand-left");
                d.klass.remove(b.body, "snapjs-expand-right");
                if (l === "left") {
                    e.simpleStates.opening = "left";
                    e.simpleStates.towards = "right";
                    d.klass.add(b.body, "snapjs-left");
                    d.klass.remove(b.body, "snapjs-right");
                    i.translate.easeTo(f.maxPosition)
                } else {
                    if (l === "right") {
                        e.simpleStates.opening = "right";
                        e.simpleStates.towards = "left";
                        d.klass.remove(b.body, "snapjs-left");
                        d.klass.add(b.body, "snapjs-right");
                        i.translate.easeTo(f.minPosition)
                    }
                }
            };
            this.close = function () {
                d.dispatchEvent("close");
                i.translate.easeTo(0)
            };
            this.expand = function (l) {
                var m = c.innerWidth || b.documentElement.clientWidth;
                if (l === "left") {
                    d.dispatchEvent("expandLeft");
                    d.klass.add(b.body, "snapjs-expand-left");
                    d.klass.remove(b.body, "snapjs-expand-right")
                } else {
                    d.dispatchEvent("expandRight");
                    d.klass.add(b.body, "snapjs-expand-right");
                    d.klass.remove(b.body, "snapjs-expand-left");
                    m *= -1
                }
                i.translate.easeTo(m)
            };
            this.on = function (l, m) {
                h[l] = m;
                return this
            };
            this.off = function (l) {
                if (h[l]) {
                    h[l] = false
                }
            };
            this.enable = function () {
                d.dispatchEvent("enable");
                i.drag.listen()
            };
            this.disable = function () {
                d.dispatchEvent("disable");
                i.drag.stopListening()
            };
            this.settings = function (l) {
                d.deepExtend(f, l)
            };
            this.state = function () {
                var l, m = i.translate.get.matrix(4);
                if (m === f.maxPosition) {
                    l = "left"
                } else {
                    if (m === f.minPosition) {
                        l = "right"
                    } else {
                        l = "closed"
                    }
                }
                return {state: l, info: e.simpleStates}
            };
            j(k)
        };
    if ((typeof module !== "undefined") && module.exports) {
        module.exports = a
    }
    if (typeof ender === "undefined") {
        this.Snap = a
    }
    if ((typeof define === "function") && define.amd) {
        define("snap", [], function () {
            return a
        })
    }
}).call(this, window, document);
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function (a) {
    a && (a.fn.headroom = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("headroom"), e = "object" == typeof b && b;
            e = a.extend(!0, {}, Headroom.options, e), d || (d = new Headroom(this, e), d.init(), c.data("headroom", d)), "string" == typeof b && d[b]()
        })
    }, a("[data-headroom]").each(function () {
        var b = a(this);
        b.headroom(b.data())
    }))
}(window.Zepto || window.jQuery);
/*--------------------------------------------------------------
 Custom js
 --------------------------------------------------------------*/
var snapper = new Snap({
    element: document.getElementById('page'),
    dragger: document.getElementsByClassName('page'),
    disable: 'right',
    slideIntent: 10,
});
var addEvent = function addEvent(element, eventName, func) {
    if (element.addEventListener) {
        return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
};
addEvent(document.getElementById('open-left'), 'click', function () {
    snapper.open('left');
});
jQuery(document).ready(function ($) {
    'use strict';

    // search in menu
    var $search_btn = $('.search-box > i'),
        $search_form = $('form.search-form');

    $search_btn.on('click', function () {
        $search_form.toggleClass('open');
    });

    $(document).on('click', function (e) {
        if ($(e.target).closest($search_btn).length == 0
            && $(e.target).closest('input.search-field').length == 0
            && $search_form.hasClass('open')) {
            $search_form.removeClass('open');
        }
    });
    if ($('.one-page-scroll').length > 0) {
        onePageScroll();
        $(window).resize(function () {
            onePageScroll();
        });
    }
    // Set height for onepage-scroll
    function onePageScroll() {
        var $opScroll = $('.one-page-scroll'),
            $hWindows = $(window).height(),
            $hHeader = $('.site-header').outerHeight(),
            $hFooter = $('.site-footer').outerHeight();
        $opScroll.onepage_scroll({
            sectionContainer: '.one-page-scroll > .vc_row',
            loop: false
        });

        $opScroll.css('height', $hWindows - ( $hHeader + $hFooter ) + 'px');
    }

    var $window = $(window);
    // Scroll up
    var $scrollup = $('.scrollup');

    $window.scroll(function () {
        if ($window.scrollTop() > 100) {
            $scrollup.addClass('show');
        } else {
            $scrollup.removeClass('show');
        }
    });

    $scrollup.on('click', function (evt) {
        $("html, body").animate({scrollTop: 0}, 600);
        evt.preventDefault();
    });

    // Menu mobile
    var $menu = $( '.mobile-menu' );

    $menu.find( '.sub-menu-toggle' ).on( 'click', function( e ) {
        var subMenu = $( this ).next();

        if ( subMenu.css( 'display' ) == 'block' ) {
            subMenu.css( 'display', 'block' ).slideUp().parent().removeClass( 'expand' );
        } else {
            subMenu.css( 'display', 'none' ).slideDown().parent().addClass( 'expand' );
        }
        e.stopPropagation();
    } );

});

/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function (a, b) {
    "use strict";
    function c(a) {
        this.callback = a, this.ticking = !1
    }

    function d(b) {
        return b && "undefined" != typeof a && (b === a || b.nodeType)
    }

    function e(a) {
        if (arguments.length <= 0)throw new Error("Missing arguments in extend function");
        var b, c, f = a || {};
        for (c = 1; c < arguments.length; c++) {
            var g = arguments[c] || {};
            for (b in g)f[b] = "object" != typeof f[b] || d(f[b]) ? f[b] || g[b] : e(f[b], g[b])
        }
        return f
    }

    function f(a) {
        return a === Object(a) ? a : {down: a, up: a}
    }

    function g(a, b) {
        b = e(b, g.options), this.lastKnownScrollY = 0, this.elem = a, this.debouncer = new c(this.update.bind(this)), this.tolerance = f(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop
    }

    var h = {
        bind: !!function () {
        }.bind,
        classList: "classList"in b.documentElement,
        rAF: !!(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame)
    };
    a.requestAnimationFrame = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, c.prototype = {
        constructor: c,
        update: function () {
            this.callback && this.callback(), this.ticking = !1
        },
        requestTick: function () {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
        },
        handleEvent: function () {
            this.requestTick()
        }
    }, g.prototype = {
        constructor: g, init: function () {
            return g.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
        }, destroy: function () {
            var a = this.classes;
            this.initialised = !1, this.elem.classList.remove(a.unpinned, a.pinned, a.top, a.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
        }, attachEvent: function () {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
        }, unpin: function () {
            var a = this.elem.classList, b = this.classes;
            (a.contains(b.pinned) || !a.contains(b.unpinned)) && (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
        }, pin: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
        }, top: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
        }, notTop: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
        }, getScrollY: function () {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (b.documentElement || b.body.parentNode || b.body).scrollTop
        }, getViewportHeight: function () {
            return a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight
        }, getDocumentHeight: function () {
            var a = b.body, c = b.documentElement;
            return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight)
        }, getElementHeight: function (a) {
            return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
        }, getScrollerHeight: function () {
            return this.scroller === a || this.scroller === b.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        }, isOutOfBounds: function (a) {
            var b = 0 > a, c = a + this.getViewportHeight() > this.getScrollerHeight();
            return b || c
        }, toleranceExceeded: function (a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
        }, shouldUnpin: function (a, b) {
            var c = a > this.lastKnownScrollY, d = a >= this.offset;
            return c && d && b
        }, shouldPin: function (a, b) {
            var c = a < this.lastKnownScrollY, d = a <= this.offset;
            return c && b || d
        }, update: function () {
            var a = this.getScrollY(), b = a > this.lastKnownScrollY ? "down" : "up", c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
        }
    }, g.options = {
        tolerance: {up: 0, down: 0},
        offset: 0,
        scroller: a,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            initial: "headroom"
        }
    }, g.cutsTheMustard = "undefined" != typeof h && h.rAF && h.bind && h.classList, a.Headroom = g
}(window, document);
/************************分享评论点赞******************************/
jQuery(document).on("click", ".share-icons span",
function() {
    var e = jQuery(this),
    t = e.data("type"),
    r = e.parent(),
    a = r.data("title"),
    n = r.data("url"),
    o = r.data("thumb"),
    c = ["toolbar=0,status=0,resizable=1,width=640,height=560,left=", (screen.width - 640) / 2, ",top=", (screen.height - 560) / 2].join(""),
    i;
    switch (t) {
    case "weibo":
        i = "http://service.weibo.com/share/share.php?title=" + a + "&appkey=4221439169&url=" + n;
        window.open(i, "分享", c);
        break;
	case "tweibo":
        i = "http://v.t.qq.com/share/share.php?title=" + a + "&url=" + n;
        window.open(i, "分享", c);
        break;
	case "qzone":
        i = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + a + "&url=" + n;
        window.open(i, "分享", c);
        break;
	case "qq":
        i = "http://connect.qq.com/widget/shareqq/index.html?title=" + a + "&url=" + n;
        window.open(i, "分享", c);
        break;
	case "renren":
        i = "http://share.renren.com/share/buttonshare.do?link=" + n;
        window.open(i, "分享", c);
        break;
	case "tieba":
        i = "http://tieba.baidu.com/f/commit/share/openShareApi?title=" + a + "&url=" + n;
        window.open(i, "分享", c);
        break;
	case "wangyi":
        i = "http://t.163.com/article/user/checkLogin.do?link="+ n;
        window.open(i, "分享", c);
        break;
    case "wechat":
        i = "http://qr.liantu.com/api.php?text=" + n;
        window.open(i, "分享", c);
        break;
	case "twitter":
        i = "http://twitter.com/share?text=" + a + "&url=" + n;
        window.open(i, "分享", c);
        break;
	case "facebook":
        i = "http://www.facebook.com/sharer.php?text=" + a + "&url=" + n;
        window.open(i, "分享", c);
        break
    }
    return false
});