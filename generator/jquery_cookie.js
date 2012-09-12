/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(e,h,i){function j(c){return c}function k(c){return decodeURIComponent(c.replace(l," "))}var l=/\+/g,d=e.cookie=function(c,b,a){if(b!==i){a=e.extend({},d.defaults,a);null===b&&(a.expires=-1);if("number"===typeof a.expires){var f=a.expires,g=a.expires=new Date;g.setDate(g.getDate()+f)}b=d.json?JSON.stringify(b):String(b);return h.cookie=[encodeURIComponent(c),"=",d.raw?b:encodeURIComponent(b),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}b=d.raw?j:k;a=h.cookie.split("; ");for(f=0;g=a[f]&&a[f].split("=");f++)if(b(g.shift())===c)return c=b(g.join("=")),d.json?JSON.parse(c):c;return null};d.defaults={};e.removeCookie=function(c,b){return null!==e.cookie(c,b)?(e.cookie(c,null,b),!0):!1}})(jQuery,document);