(function(b){if(!navigator.geolocation){b.support.geolocation="shim";var x=function(){throw"document.write is overwritten by geolocation shim. This method is incompatibel with this plugin";},t=0;navigator.geolocation=function(){var l,g={getCurrentPosition:function(h,p,v){var m=function(){clearTimeout(u);if(!(l||!window.google||!google.loader||!google.loader.ClientLocation)){var A=google.loader.ClientLocation;l={latitude:A.latitude,longitude:A.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,
heading:parseInt("NaN",10),velocity:null}}if(l)h({coords:l,timestamp:(new Date).getTime()});else p&&p({code:2,message:"POSITION_UNAVAILABLE"})},u;if(!window.google||!google.loader){if(b.htmlExt.loader.modules.geolocation.options.destroyWrite){document.write=x;document.writeln=x}b(document).one("google-loaderReady",m);b.htmlExt.loader.loadScript("http://www.google.com/jsapi",false,"google-loader");if(v&&v.timeout)u=setTimeout(function(){b(document).unbind("google-loader",m);p&&p({code:3,message:"TIMEOUT"})},
v.timeout)}else setTimeout(m,1)},clearWatch:b.noop};g.watchPosition=function(h,p,v){g.getCurrentPosition(h,p,v);t++;return t};return g}()}})(jQuery);
(function(b){if(!b.support.validity){var x=parseInt("a",10),t=function(a){return typeof a=="number"||a&&a==a*1},l={radio:1,checkbox:1},g=function(a){return(a.getAttribute("type")||"").toLowerCase()},h=function(a,e){var f=b.attr(a,"step");if(f==="any")return f;e=e||g(a);if(!m[e]||!m[e].step)return f;f=m.number.asNumber(f);return(!isNaN(f)&&f>0?f:m[e].step)*m[e].stepScaleFactor},p=function(a,e,f){if(!(a+"AsNumber"in f)){f[a+"AsNumber"]=m[f.type].asNumber(e.attr(a));if(isNaN(f[a+"AsNumber"])&&a+"Default"in
m[f.type])f[a+"AsNumber"]=m[f.type][a+"Default"]}},v=function(a,e){a=""+a;e-=a.length;for(var f=0;f<e;f++)a="0"+a;return a};(function(){var a={11:"INVALID_STATE_ERR"};return function(e){throw{code:e,name:a[e],message:a[e]+": DOM Exception "+e};}})();var m={};b.htmlExt.addInputType=function(a,e){m[a]=e};var u={customError:false,typeMismatch:false,rangeUnderflow:false,rangeOverflow:false,stepMismatch:false,tooLong:false,patternMismatch:false,valueMissing:false,valid:true},A={valueMissing:function(a,
e){if(!a.attr("required"))return false;return l[a[0].type]?!b(a[0].form&&a[0].name?a[0].form[a[0].name]:[]).filter(":checked")[0]:!e},tooLong:function(a,e){if(e==="")return false;var f=a.attr("maxlength"),r=false,k=e.length;if(k&&f>=0&&e.replace&&t(f)){if(r=k>f)return r;e.replace(/\u0A/g,function(){k++});r=k>f}return r},typeMismatch:function(a,e,f){if(e==="")return false;var r=false;if(!("type"in f))f.type=g(a[0]);if(m[f.type]&&m[f.type].mismatch)r=m[f.type].mismatch(e,a);return r},stepMismatch:function(a,
e,f){if(e==="")return false;if(!("type"in f))f.type=g(a[0]);if(f.type=="date")return false;var r=false;if(m[f.type]&&m[f.type].step){if(!("step"in f))f.step=h(a[0],f.type);if(f.step=="any")return false;if(!("valueAsNumber"in f))f.valueAsNumber=m[f.type].asNumber(e);if(isNaN(f.valueAsNumber))return false;p("min",a,f);a=f.minAsNumber;if(isNaN(a))a=m[f.type].stepBase||0;r=Math.abs((f.valueAsNumber-a)%f.step);r=!(r<=1.0E-7||Math.abs(r-f.step)<=1.0E-7)}return r},patternMismatch:function(a,e){if(e==="")return false;
var f=a.attr("pattern");if(!f)return false;return!RegExp("^(?:"+f+")$").test(e)}};b.each([{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}],function(a,e){A[e.name]=function(f,r,k){var q=false;if(r==="")return q;if(!("type"in k))k.type=g(f[0]);if(m[k.type]&&m[k.type].asNumber){if(!("valueAsNumber"in k))k.valueAsNumber=m[k.type].asNumber(r);if(isNaN(k.valueAsNumber))return false;p(e.attr,f,k);if(isNaN(k[e.attr+"AsNumber"]))return q;q=k[e.attr+"AsNumber"]*e.factor<=
k.valueAsNumber*e.factor-1.0E-7}return q}});b.htmlExt.addMethod("checkValidity",function(){var a,e=function(f){var r,k=b.attr(f,"validity");if(k)b.data(f,"cachedValidity",k);else k={valid:true};if(!k.valid){r=b.Event("invalid");var q=b(f).trigger(r);if(!r.isDefaultPrevented()){a||b.htmlExt.validityAlert.showFor(q);a=true}}b.data(f,"cachedValidity",false);return k.valid};return function(){a=false;if(b.nodeName(this,"form")||b.nodeName(this,"fieldset")){for(var f=true,r=this.elements||b("input, textarea, select",
this),k=0,q=r.length;k<q;k++)e(r[k])||(f=false);return f}else return this.form?e(this):true}}());b.event.special.invalid={add:function(){b.data(this,"invalidEventShim")||b.event.special.invalid.setup.call(this)},setup:function(){b(this).bind("submit",b.event.special.invalid.handler).data("invalidEventShim",true);var a=b(this).data("events").submit;a&&a.length>1&&a.unshift(a.pop())},teardown:function(){b(this).unbind("submit",b.event.special.invalid.handler).data("invalidEventShim",false)},handler:function(a){if(!(a.type!=
"submit"||!b.nodeName(a.target,"form")||b.attr(a.target,"novalidate")))if(!b(a.target).checkValidity()){!a.originalEvent&&!window.debugValidityShim&&window.console&&console.log&&console.log("submit");a.stopImmediatePropagation();return false}}};b.htmlExt.attr("validity",{elementNames:["input","select","textarea"],getter:function(a){var e=b.data(a,"cachedValidity");if(e)return e;e=b.extend({},u);if(!b.attr(a,"willValidate"))return e;var f=b(a),r=f.val(),k={};e.customError=!!b.data(a,"customvalidationMessage");
if(e.customError)e.valid=false;if((a.nodeName||"").toLowerCase()=="select")return e;b.each(A,function(q,s){if(s(f,r,k)){e[q]=true;e.valid=false}});return e}});b.htmlExt.addMethod("setCustomValidity",function(a){b.data(this,"customvalidationMessage",""+a)});b.htmlExt.attr("validationMessage",{elementNames:["input","select","textarea"],getter:function(a,e){var f=e()||b.data(a,"customvalidationMessage");return!f||!b.attr(a,"willValidate")?"":f}});b.htmlExt.createBooleanAttrs("required",["input","textarea"]);
b.htmlExt.attr("willValidate",{elementNames:["input","select","textarea"],getter:function(){var a={button:1,reset:1,add:1,remove:1,"move-up":1,"move-down":1,hidden:1,submit:1};return function(e){return!!(e.name&&e.form&&!e.disabled&&!e.readonly&&!a[e.type]&&!b.attr(e.form,"novalidate"))}}()});b.htmlExt.attr("valueAsNumber",{elementNames:["input"],getter:function(a){var e=g(a);return m[e]&&m[e].asNumber?m[e].asNumber(b.attr(a,"value")):x},setter:function(a,e,f){var r=g(a);if(m[r]&&m[r].numberToString)if(isNaN(e))b.attr(a,
"value","");else{e=m[r].numberToString(e);if(e!==false)b.attr(a,"value",e);else throw"INVALID_STATE_ERR: DOM Exception 11";}else f()}});b.htmlExt.attr("valueAsDate",{elementNames:["input"],getter:function(a){var e=g(a);return m[e]&&m[e].asDate&&!m[e].noAsDate?m[e].asDate(b.attr(a,"value")):null},setter:function(a,e,f){var r=g(a);if(m[r]&&m[r].dateToString)if(e===null)b.attr(a,"value","");else{e=m[r].dateToString(e);if(e!==false)b.attr(a,"value",e);else throw"INVALID_STATE_ERR: DOM Exception 11";}else f()}});
b.htmlExt.attr("type",{elementNames:["input"],getter:function(a){var e=g(a);return m[e]?e:a.type||a.getAttribute("type")},setter:true});b.htmlExt.addInputType("email",{mismatch:function(){var a=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|(\x22((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?\x22))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
return function(e){return!a.test(e)}}()});b.htmlExt.addInputType("url",{mismatch:function(){var a=/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
return function(e){return!a.test(e)}}()});b.htmlExt.addInputType("number",{mismatch:function(a){return!t(a)},step:1,stepScaleFactor:1,asNumber:function(a){return t(a)?a*1:x},numberToString:function(a){return t(a)?a:false}});b.htmlExt.addInputType("range",b.extend({},m.number,{minDefault:0,maxDefault:100}));b.htmlExt.addInputType("date",{mismatch:function(a){if(!a||!a.split||!/\d$/.test(a))return true;var e=a.split(/\u002D/);if(e.length!==3)return true;var f=false;b.each(e,function(r,k){if(!(t(k)||
k&&k=="0"+k*1)){f=true;return false}});if(f)return f;if(e[0].length!==4||e[1].length!=2||e[1]>12||e[2].length!=2||e[2]>33)f=true;return a!==this.dateToString(this.asDate(a,true))},step:1,stepScaleFactor:864E5,asDate:function(a,e){if(!e&&this.mismatch(a))return null;return new Date(this.asNumber(a,true))},asNumber:function(a,e){var f=x;if(e||!this.mismatch(a)){a=a.split(/\u002D/);f=Date.UTC(a[0],a[1]-1,a[2])}return f},numberToString:function(a){return t(a)?this.dateToString(new Date(a)):false},dateToString:function(a){return a&&
a.getFullYear?a.getUTCFullYear()+"-"+v(a.getUTCMonth()+1,2)+"-"+v(a.getUTCDate(),2):false}});b.htmlExt.addInputType("time",b.extend({},m.date,{mismatch:function(a,e){if(!a||!a.split||!/\d$/.test(a))return true;a=a.split(/\u003A/);if(a.length<2||a.length>3)return true;var f=false,r;if(a[2]){a[2]=a[2].split(/\u002E/);r=parseInt(a[2][1],10);a[2]=a[2][0]}b.each(a,function(k,q){if(!(t(q)||q&&q=="0"+q*1)||q.length!==2){f=true;return false}});if(f)return true;if(a[0]>23||a[0]<0||a[1]>59||a[1]<0)return true;
if(a[2]&&(a[2]>59||a[2]<0))return true;if(r&&isNaN(r))return true;if(r)if(r<100)r*=100;else if(r<10)r*=10;return e===true?[a,r]:false},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var e=x;a=this.mismatch(a,true);if(a!==true){e=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0);if(a[1])e+=a[1]}return e},dateToString:function(a){if(a&&a.getUTCHours){var e=v(a.getUTCHours(),2)+":"+v(a.getUTCMinutes(),2),f=a.getSeconds();
if(f!="0")e+=":"+v(f,2);f=a.getUTCMilliseconds();if(f!="0")e+="."+v(f,3);return e}else return false}}));b.htmlExt.addInputType("datetime-local",b.extend({},m.time,{mismatch:function(a,e){if(!a||!a.split||(a+"special").split(/\u0054/).length!==2)return true;a=a.split(/\u0054/);return m.date.mismatch(a[0])||m.time.mismatch(a[1],e)},noAsDate:true,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var e=x,f=this.mismatch(a,true);if(f!==true){a=a.split(/\u0054/)[0].split(/\u002D/);
e=Date.UTC(a[2],a[1]-1,a[0],f[0][0],f[0][1],f[0][2]||0);if(f[1])e+=f[1]}return e},dateToString:function(a,e){return m.date.dateToString(a)+"T"+m.time.dateToString(a,e)}}));(function(){var a=b.htmlExt.loader.modules.validity.options,e=function(k,q,s){s=s||{};if(!("type"in s))s.type=g(k);if(!("step"in s))s.step=h(k,s.type);if(!("valueAsNumber"in s))s.valueAsNumber=m[s.type].asNumber(b.attr(k,"value"));var D=s.step=="any"?m[s.type].step*m[s.type].stepScaleFactor:s.step;p("min",b(k),s);p("max",b(k),s);
if(isNaN(s.valueAsNumber))s.valueAsNumber=m[s.type].stepBase||0;if(s.step!=="any")s.valueAsNumber=Math.round((s.valueAsNumber-(s.valueAsNumber-(s.minAsnumber||0))%s.step)*1E7)/1E7;k=s.valueAsNumber+D*q;if(k<s.minAsNumber)k=s.valueAsNumber>s.minAsNumber?s.minAsNumber:s.maxAsNumber;else if(k>s.maxAsNumber)k=s.valueAsNumber<s.maxAsNumber?s.maxAsNumber:s.minAsNumber;return k},f=function(k,q,s){if(!(k.disabled||k.readOnly||b(s).hasClass("step-controls"))){b.attr(k,"value",m[q].numberToString(e(k,b(s).hasClass("step-up")?
1:-1,{type:q})));b(k).unbind("blur.stepeventshim").trigger("input");if(document.activeElement){if(document.activeElement!==k)try{k.focus()}catch(D){}setTimeout(function(){if(document.activeElement!==k)try{k.focus()}catch(J){}b(k).one("blur.stepeventshim",function(){b(k).trigger("change")})},0)}}};if(a.stepArrows){var r={elementNames:["input"],setter:function(k,q,s){s();if(q=b.data(k,"step-controls"))q[k.disabled||k.readonly?"addClass":"removeClass"]("disabled-step-control")}};b.htmlExt.attr("disabled",
r);b.htmlExt.attr("readonly",r)}b.htmlExt.addReady(function(k){b("form",k).bind("invalid",b.noop);a.stepArrows&&b("input",k).each(function(){var q=g(this);if(!(!m[q]||!m[q].asNumber||!a.stepArrows||a.stepArrows!==true&&!a.stepArrows[q])){var s=this,D=b(this).css("direction")=="rtl"?{action:"insertBefore",side:"Left",otherSide:"right"}:{action:"insertAfter",side:"Right",otherSide:"left"},J=b('<span class="step-controls" unselectable><span class="step-up" tabindex="-1" /><span class="step-down" tabindex="-1" /></span>')[D.action](this).bind("mousedown mousepress",
function(F){f(s,q,F.target);return false});b(this).addClass("has-step-controls").data("step-controls",J).attr({readonly:this.readOnly,disabled:this.disabled});if(a.recalcWidth){var K=J.outerWidth(true)+(parseInt(b(this).css("padding"+D.side),10)||0),B=parseInt(b(this).css("border"+D.side+"width"),10)||0;J.css(D.otherSide,(B+K)*-1);K++;b(this).css("width",b(this).width()-K).css("padding"+D.side,K)}}})})})()}})(jQuery);
(function(b){if(b.support.validity!==true){b.support.validity="shim";b.support.fieldsetValidation="shim";var x={input:1,textarea:1},t={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,color:1,range:1},l=function(g){var h;g[0].getAttribute("type");var p=g.val(),v=function(u){if(g){var A=g.val();if(A!==p){p=A;if(!u||u.type!="input")g.trigger("input")}}},m=function(){g.unbind("focusout",m).unbind("input",v);clearInterval(h);v();g=null};clearInterval(h);h=setInterval(v,150);setTimeout(v,9);g.bind("focusout",
m).bind("input",v)};b(document).bind("focusin",function(g){if(g.target&&g.target.type&&!g.target.readonly&&!g.target.readOnly&&!g.target.disabled&&x[(g.target.nodeName||"").toLowerCase()]&&!t[g.target.type])l(b(g.target))})}})(jQuery);
(function(b){if(!b.support.validationMessage){b.support.validationMessage="shim";b.htmlExt.validityMessages=[];b.htmlExt.validityMessages[""]={typeMismatch:{email:"{%value} is not a legal email address",url:"{%value} is not a valid web address",number:"{%value} is not a number!",date:"{%value} is not a date",time:"{%value} is not a time",range:"{%value} is not a number!","datetime-local":"{%value} is not a correct date-time format."},rangeUnderflow:"{%value} is too low. The lowest value you can use is {%min}.",
rangeOverflow:"{%value}  is too high. The highest value you can use is {%max}.",stepMismatch:"The value {%value} is not allowed for this form. Only certain values are allowed for this field. {%title}",tooLong:"The entered text is too large! You used {%valueLen} letters and the limit is {%maxlength}.",patternMismatch:"{%value} is not in the format this page requires! {%title}",valueMissing:"You have to specify a value"};b.htmlExt.validityMessages.de={typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",
url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen.",rangeOverflow:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen.",stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",
tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Buchstaben eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr diese Seite ein falsches Format! {%title}",valueMissing:"Sie m\u00fcssen einen Wert eingeben"};var x;b(document).bind("htmlExtLangChange",function(){b.htmlExt.activeLang(b.htmlExt.validityMessages,"validation-message",function(t){x=t})});b.htmlExt.attr("validationMessage",{elementNames:["input","select","textarea"],getter:function(t){var l=
"";if(!b.attr(t,"willValidate"))return l;if(l="validationMessage"in t?t.validationMessage:b.data(t,"customvalidationMessage"))return l;var g=b.attr(t,"validity")||{valid:1};if(g.valid)return"";b.each(g,function(h,p){if(!(h=="valid"||!p)){if((l=x[h])&&typeof l!=="string")l=l[(t.getAttribute("type")||"").toLowerCase()]||l.defaultMessage;if(l)return false}});l&&b.each(["value","min","max","title","maxlength"],function(h,p){if(l.indexOf("%"+p)!==-1){var v=b.attr(t,p)||"";l=l.replace("{%"+p+"}",v);if("value"==
p)l=l.replace("{%valueLen}",v.length)}});return l||""}})}})(jQuery);(function(b){if(!(b.support.validity!==true||b.support.fieldsetValidation||window.noHTMLExtFixes)){b.support.fieldsetValidation="shim";b.htmlExt.addMethod("checkValidity",function(){if(b.nodeName(this,"fieldset")){var x=true;b(this.elements||"input, textarea, select",this).each(function(){if(this.checkValidity)this.checkValidity()||(x=false)});return x}else if(this.checkValidity)return this.checkValidity()})}})(jQuery);
(function(b){b.support.inputUI="shim";var x=b.htmlExt.loader.modules["input-ui"].options;x.availabeLangs="af ar az bg bs cs da de el en-GB eo es et eu fa fi fo fr fr-CH he hr hu hy id is it ja ko it lt lv ms nl no pl pt-BR ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");if(x.juiSrc&&(!b.fn.slider||!b.fn.datepicker))b.htmlExt.loader.loadScript(x.juiSrc,false,"jquery-ui");else b.fn.slider&&b.fn.datepicker&&b.htmlExt.createReadyEvent("jquery-ui");var t=function(l){b("input",l).each(function(){var g=
b.attr(this,"type");t[g]&&t[g](b(this))})};t.common=function(l,g,h){x.nativeIsReplaced&&l.bind("invalid",function(v){setTimeout(function(){if(!v.isDefaultPrevented())throw"you have to handle invalid events, if you replace native input-widgets.";},0)});var p={css:{marginRight:l.css("marginRight"),marginLeft:l.css("marginLeft")},outerWidth:l.outerWidth()};g.addClass(l[0].className).data("html5element",l);l.after(g).data("inputUIReplace",{visual:g,methods:h}).hide();return p};t.date=function(l){if(b.fn.datepicker){var g=
b('<input type="text" class="input-date" />'),h=this.common(l,g,t.date.attrs),p=function(){t.date.blockAttr=true;l.attr("value",b.datepicker.formatDate("yy-mm-dd",g.datepicker("getDate")));t.date.blockAttr=false;l.trigger("change")};if(h.css){g.css(h.css);h.outerWidth&&g.outerWidth(h.outerWidth)}g.datepicker(b.extend({},x.date,{onSelect:p})).bind("change",p).data("datepicker").dpDiv.addClass("input-date-datepicker-control");b.each(["disabled","min","max","value"],function(v,m){l.attr(m,function(u,
A){return A||""})})}};t.date.attrs={disabled:function(l,g,h){g.datepicker("option","disabled",!!h)},min:function(l,g,h){try{h=b.datepicker.parseDate("yy-mm-dd",h)}catch(p){h=false}h&&g.datepicker("option","minDate",h)},max:function(l,g,h){try{h=b.datepicker.parseDate("yy-mm-dd",h)}catch(p){h=false}h&&g.datepicker("option","maxDate",h)},value:function(l,g,h){if(!t.date.blockAttr){try{var p=b.datepicker.parseDate("yy-mm-dd",h)}catch(v){p=false}p?g.datepicker("setDate",p):g.attr("value",h)}}};t.range=
function(l){if(b.fn.slider){var g=b('<span class="input-range" />'),h=this.common(l,g,t.range.attrs);if(h.css){g.css(h.css);h.outerWidth&&g.outerWidth(h.outerWidth)}g.slider(b.extend(x.slider,{change:function(p,v){if(p.originalEvent){t.range.blockAttr=true;l.attr("value",v.value);t.range.blockAttr=false;l.trigger("change")}}}));b.each(["disabled","min","max","value","step"],function(p,v){l.attr(v,function(m,u){return u||""})})}};t.range.attrs={disabled:function(l,g,h){g.slider("option","disabled",
!!h)},min:function(l,g,h){h=h?h*1||0:0;g.slider("option","min",h)},max:function(l,g,h){h=h||h===0?h*1||100:100;g.slider("option","max",h)},value:function(l,g,h){h=b(l).attr("valueAsNumber");if(isNaN(h)){h=(g.slider("option","max")-g.slider("option","min"))/2;l.value=h}t.range.blockAttr||g.slider("option","value",h)},step:function(l,g,h){h=h?h*1||1:1;g.slider("option","step",h)}};b.each(["disabled","min","max","value","step"],function(l,g){b.htmlExt.attr(g,{elementNames:["input"],setter:function(h,
p,v){var m=b.data(h,"inputUIReplace");v();m&&m.methods[g]&&m.methods[g](h,m.visual,p)},getter:true})});(function(l){var g=function(h){if(h){h=l.extend({},h,x.date);l("input.input-date.hasDatepicker").datepicker("option",h).each(function(){var p=l.data(this,"html5element");p&&l.each(["disabled","min","max","value"],function(v,m){p.attr(m,function(u,A){return A||""})})});l.datepicker.setDefaults(h)}};l(document).one("jquery-uiReady",function(){l(document).bind("htmlExtLangChange",function(){l.htmlExt.activeLang(l.datepicker.regional,
"input-ui",g)})})})(jQuery);b.htmlExt.addReady(function(l){b(document).bind("jquery-uiReady",function(){t(l)})})})(jQuery);
(function(b){if(!b.support.placeholder){b.support.placeholder="shim";var x=function(){var g=function(u){if(!this.value||u===true){b(this).addClass("placeholder-visible");this.value=this.getAttribute("placeholder")||""}},h=function(){if(b(this).hasClass("placeholder-visible")){this.value="";b(this).removeClass("placeholder-visible")}},p=0,v=/\n|\r|\f|\t/g,m={text:1,search:1,url:1,email:1,password:1,tel:1,url:1};return{create:function(u){if(!b.data(u,"placeHolder")){var A=function(){h.apply(u)};p++;
b.data(u,"placeHolder",p);b(u).bind("blur",g).bind("focus",h);b(window).bind("unload.id-"+p,A);b(u.form).bind("submit.id-"+p,A)}},changesValidity:function(u,A){if(b.support.validity===true&&b.attr(u,"willValidate")){if(b.attr(u,"required"))return true;var a=b.attr(u,"value");b.attr(u,"value",A);b.attr(u,"validity");b.attr(u,"value",a)}return false},update:function(u,A){var a=b.attr(u,"type");if(m[a]||b.nodeName(u,"textarea"))if(A){a=b(u);A=A.replace(v,"");u.setAttribute("placeholder",A);if(x.changesValidity(u,
A))x.destroy(u);else{x.create(u);a.val()||g.call(u,true)}}else{x.destroy(u);u.removeAttribute("placeholder")}},destroy:function(u){var A=b.data(u,"placeHolder");if(A){b.data(u,"placeHolder",false);b(u).unbind("blur",g).unbind("focus",h);b(window).unbind("unload.id-"+A);b(u.form).unbind("submit.id-"+A);h.apply(this)}}}}();b.htmlExt.attr("placeholder",{elementNames:["input","textarea"],setter:function(g,h){x.update(g,h)},getter:function(g){return g.getAttribute("placeholder")}});var t={elementNames:["input",
"textarea"],setter:function(g,h,p){var v=g.getAttribute("placeholder");if(v&&"value"in g)h?b(g).removeClass("placeholder-visible"):x.update(g,v);p()},getter:function(g,h){if(b(g).hasClass("placeholder-visible"))return"";return h()}};b.htmlExt.attr("value",t);var l=b.fn.val;b.fn.val=function(g){if(g===undefined){if(this[0]&&b(this[0]).hasClass("placeholder-visible"))return"";return l.apply(this,arguments)}else{var h=l.apply(this,arguments);this.each(function(){this.nodeType===1&&this.getAttribute("placeholder")&&
t.setter(this,g,b.noop)});return h}};b.htmlExt.addReady(function(g){b("input[placeholder], textarea[placeholder]",g).attr("placeholder",function(h,p){return p})})}})(jQuery);
document.createElement("canvas").getContext||function(b){function x(){return this.context_||(this.context_=new A(this))}function t(c,d){var i=Q.call(arguments,2);return function(){return c.apply(d,i.concat(Q.call(arguments)))}}function l(c){var d=c.srcElement;switch(c.propertyName){case "width":d.style.width=d.attributes.width.nodeValue+"px";d.getContext().clearRect();break;case "height":d.style.height=d.attributes.height.nodeValue+"px";d.getContext().clearRect();break}}function g(c){c=c.srcElement;
if(c.firstChild){c.firstChild.style.width=c.clientWidth+"px";c.firstChild.style.height=c.clientHeight+"px"}}function h(){return[[1,0,0],[0,1,0],[0,0,1]]}function p(c,d){for(var i=h(),j=0;j<3;j++)for(var n=0;n<3;n++){for(var y=0,w=0;w<3;w++)y+=c[j][w]*d[w][n];i[j][n]=y}return i}function v(c,d){d.fillStyle=c.fillStyle;d.lineCap=c.lineCap;d.lineJoin=c.lineJoin;d.lineWidth=c.lineWidth;d.miterLimit=c.miterLimit;d.shadowBlur=c.shadowBlur;d.shadowColor=c.shadowColor;d.shadowOffsetX=c.shadowOffsetX;d.shadowOffsetY=
c.shadowOffsetY;d.strokeStyle=c.strokeStyle;d.globalAlpha=c.globalAlpha;d.arcScaleX_=c.arcScaleX_;d.arcScaleY_=c.arcScaleY_;d.lineScale_=c.lineScale_}function m(c){var d,i=1;c=String(c);if(c.substring(0,3)=="rgb"){d=c.indexOf("(",3);var j=c.indexOf(")",d+1);j=c.substring(d+1,j).split(",");d="#";for(var n=0;n<3;n++)d+=R[Number(j[n])];if(j.length==4&&c.substr(3,1)=="a")i=j[3]}else d=c;return{color:d,alpha:i}}function u(c){switch(c){case "butt":return"flat";case "round":return"round";case "square":default:return"square"}}
function A(c){this.m_=h();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=B*1;this.globalAlpha=1;this.canvas=c;var d=c.ownerDocument.createElement("div");d.style.width=c.clientWidth+"px";d.style.height=c.clientHeight+"px";d.style.overflow="hidden";d.style.position="absolute";c.appendChild(d);this.element_=d;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}function a(c,d,i,j){c.currentPath_.push({type:"bezierCurveTo",
cp1x:d.x,cp1y:d.y,cp2x:i.x,cp2y:i.y,x:j.x,y:j.y});c.currentX_=j.x;c.currentY_=j.y}function e(c,d,i){var j;a:{for(j=0;j<3;j++)for(var n=0;n<2;n++)if(!isFinite(d[j][n])||isNaN(d[j][n])){j=false;break a}j=true}if(j){c.m_=d;if(i)c.lineScale_=K(J(d[0][0]*d[1][1]-d[0][1]*d[1][0]))}}function f(c){this.type_=c;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}function r(){}var k=Math,q=k.round,s=k.sin,D=k.cos,J=k.abs,K=k.sqrt,B=10,F=B/2,Q=Array.prototype.slice,P={init:function(c){if(/MSIE/.test(navigator.userAgent)&&
!window.opera){c=c||document;c.createElement("canvas");b(t(this.init_,this,c))}},init_:function(c){c.namespaces.g_vml_||c.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");c.namespaces.g_o_||c.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!c.styleSheets.ex_canvas_){var d=c.createStyleSheet();d.owningElement.id="ex_canvas_";d.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}c=
c.getElementsByTagName("canvas");for(d=0;d<c.length;d++)this.initElement(c[d])},initElement:function(c){if(!c.getContext){c.getContext=x;c.innerHTML="";c.attachEvent("onpropertychange",l);c.attachEvent("onresize",g);var d=c.attributes;if(d.width&&d.width.specified)c.style.width=d.width.nodeValue+"px";else c.width=c.clientWidth;if(d.height&&d.height.specified)c.style.height=d.height.nodeValue+"px";else c.height=c.clientHeight}return c}};P.init();for(var R=[],z=0;z<16;z++)for(var N=0;N<16;N++)R[z*16+
N]=z.toString(16)+N.toString(16);z=A.prototype;z.clearRect=function(){this.element_.innerHTML=""};z.beginPath=function(){this.currentPath_=[]};z.moveTo=function(c,d){var i=this.getCoords_(c,d);this.currentPath_.push({type:"moveTo",x:i.x,y:i.y});this.currentX_=i.x;this.currentY_=i.y};z.lineTo=function(c,d){var i=this.getCoords_(c,d);this.currentPath_.push({type:"lineTo",x:i.x,y:i.y});this.currentX_=i.x;this.currentY_=i.y};z.bezierCurveTo=function(c,d,i,j,n,y){n=this.getCoords_(n,y);c=this.getCoords_(c,
d);i=this.getCoords_(i,j);a(this,c,i,n)};z.quadraticCurveTo=function(c,d,i,j){c=this.getCoords_(c,d);i=this.getCoords_(i,j);j={x:this.currentX_+2/3*(c.x-this.currentX_),y:this.currentY_+2/3*(c.y-this.currentY_)};a(this,j,{x:j.x+(i.x-this.currentX_)/3,y:j.y+(i.y-this.currentY_)/3},i)};z.arc=function(c,d,i,j,n,y){i*=B;var w=y?"at":"wa",o=c+D(j)*i-F,C=d+s(j)*i-F;j=c+D(n)*i-F;n=d+s(n)*i-F;if(o==j&&!y)o+=0.125;c=this.getCoords_(c,d);o=this.getCoords_(o,C);j=this.getCoords_(j,n);this.currentPath_.push({type:w,
x:c.x,y:c.y,radius:i,xStart:o.x,yStart:o.y,xEnd:j.x,yEnd:j.y})};z.rect=function(c,d,i,j){this.moveTo(c,d);this.lineTo(c+i,d);this.lineTo(c+i,d+j);this.lineTo(c,d+j);this.closePath()};z.strokeRect=function(c,d,i,j){var n=this.currentPath_;this.beginPath();this.moveTo(c,d);this.lineTo(c+i,d);this.lineTo(c+i,d+j);this.lineTo(c,d+j);this.closePath();this.stroke();this.currentPath_=n};z.fillRect=function(c,d,i,j){var n=this.currentPath_;this.beginPath();this.moveTo(c,d);this.lineTo(c+i,d);this.lineTo(c+
i,d+j);this.lineTo(c,d+j);this.closePath();this.fill();this.currentPath_=n};z.createLinearGradient=function(c,d,i,j){var n=new f("gradient");n.x0_=c;n.y0_=d;n.x1_=i;n.y1_=j;return n};z.createRadialGradient=function(c,d,i,j,n,y){var w=new f("gradientradial");w.x0_=c;w.y0_=d;w.r0_=i;w.x1_=j;w.y1_=n;w.r1_=y;return w};z.drawImage=function(c){var d,i,j,n,y,w,o,C;j=c.runtimeStyle.width;n=c.runtimeStyle.height;c.runtimeStyle.width="auto";c.runtimeStyle.height="auto";var G=c.width,H=c.height;c.runtimeStyle.width=
j;c.runtimeStyle.height=n;if(arguments.length==3){d=arguments[1];i=arguments[2];y=w=0;o=j=G;C=n=H}else if(arguments.length==5){d=arguments[1];i=arguments[2];j=arguments[3];n=arguments[4];y=w=0;o=G;C=H}else if(arguments.length==9){y=arguments[1];w=arguments[2];o=arguments[3];C=arguments[4];d=arguments[5];i=arguments[6];j=arguments[7];n=arguments[8]}else throw Error("Invalid number of arguments");var E=this.getCoords_(d,i),I=[];I.push(" <g_vml_:group",' coordsize="',B*10,",",B*10,'"',' coordorigin="0,0"',
' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var L=[];L.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",q(E.x/B),",","Dy=",q(E.y/B),"");var M=this.getCoords_(d+j,i),O=this.getCoords_(d,i+n);d=this.getCoords_(d+j,i+n);E.x=k.max(E.x,M.x,O.x,d.x);E.y=k.max(E.y,M.y,O.y,d.y);I.push("padding:0 ",q(E.x/B),"px ",q(E.y/B),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",L.join(""),", sizingmethod='clip');")}else I.push("top:",
q(E.y/B),"px;left:",q(E.x/B),"px;");I.push(' ">','<g_vml_:image src="',c.src,'"',' style="width:',B*j,"px;"," height:",B*n,'px;"',' cropleft="',y/G,'"',' croptop="',w/H,'"',' cropright="',(G-y-o)/G,'"',' cropbottom="',(H-w-C)/H,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",I.join(""))};z.stroke=function(c){var d=[],i=m(c?this.fillStyle:this.strokeStyle),j=i.color;i=i.alpha*this.globalAlpha;d.push("<g_vml_:shape",' filled="',!!c,'"',' style="position:absolute;width:',10,
"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',B*10," ",B*10,'"',' stroked="',!c,'"',' path="');for(var n={x:null,y:null},y={x:null,y:null},w=0;w<this.currentPath_.length;w++){var o=this.currentPath_[w];switch(o.type){case "moveTo":d.push(" m ",q(o.x),",",q(o.y));break;case "lineTo":d.push(" l ",q(o.x),",",q(o.y));break;case "close":d.push(" x ");o=null;break;case "bezierCurveTo":d.push(" c ",q(o.cp1x),",",q(o.cp1y),",",q(o.cp2x),",",q(o.cp2y),",",q(o.x),",",q(o.y));break;case "at":case "wa":d.push(" ",
o.type," ",q(o.x-this.arcScaleX_*o.radius),",",q(o.y-this.arcScaleY_*o.radius)," ",q(o.x+this.arcScaleX_*o.radius),",",q(o.y+this.arcScaleY_*o.radius)," ",q(o.xStart),",",q(o.yStart)," ",q(o.xEnd),",",q(o.yEnd));break}if(o){if(n.x==null||o.x<n.x)n.x=o.x;if(y.x==null||o.x>y.x)y.x=o.x;if(n.y==null||o.y<n.y)n.y=o.y;if(y.y==null||o.y>y.y)y.y=o.y}}d.push(' ">');if(c)if(typeof this.fillStyle=="object"){j=this.fillStyle;o=0;c={x:0,y:0};i=0;var C=1;if(j.type_=="gradient"){o=j.x1_/this.arcScaleX_;n=j.y1_/
this.arcScaleY_;w=this.getCoords_(j.x0_/this.arcScaleX_,j.y0_/this.arcScaleY_);o=this.getCoords_(o,n);o=Math.atan2(o.x-w.x,o.y-w.y)*180/Math.PI;if(o<0)o+=360;if(o<1.0E-6)o=0}else{w=this.getCoords_(j.x0_,j.y0_);i=y.x-n.x;C=y.y-n.y;c={x:(w.x-n.x)/i,y:(w.y-n.y)/C};i/=this.arcScaleX_*B;C/=this.arcScaleY_*B;w=k.max(i,C);i=2*j.r0_/w;C=2*j.r1_/w-i}n=j.colors_;n.sort(function(O,S){return O.offset-S.offset});y=n.length;var G=n[0].color,H=n[y-1].color,E=n[0].alpha*this.globalAlpha,I=n[y-1].alpha*this.globalAlpha,
L=[];for(w=0;w<y;w++){var M=n[w];L.push(M.offset*C+i+" "+M.color)}d.push('<g_vml_:fill type="',j.type_,'"',' method="none" focus="100%"',' color="',G,'"',' color2="',H,'"',' colors="',L.join(","),'"',' opacity="',I,'"',' g_o_:opacity2="',E,'"',' angle="',o,'"',' focusposition="',c.x,",",c.y,'" />')}else d.push('<g_vml_:fill color="',j,'" opacity="',i,'" />');else{c=this.lineScale_*this.lineWidth;if(c<1)i*=c;d.push("<g_vml_:stroke",' opacity="',i,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',
this.miterLimit,'"',' endcap="',u(this.lineCap),'"',' weight="',c,'px"',' color="',j,'" />')}d.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",d.join(""))};z.fill=function(){this.stroke(true)};z.closePath=function(){this.currentPath_.push({type:"close"})};z.getCoords_=function(c,d){var i=this.m_;return{x:B*(c*i[0][0]+d*i[1][0]+i[2][0])-F,y:B*(c*i[0][1]+d*i[1][1]+i[2][1])-F}};z.save=function(){var c={};v(this,c);this.aStack_.push(c);this.mStack_.push(this.m_);this.m_=p(h(),this.m_)};
z.restore=function(){v(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};z.translate=function(c,d){e(this,p([[1,0,0],[0,1,0],[c,d,1]],this.m_),false)};z.rotate=function(c){var d=D(c);c=s(c);e(this,p([[d,c,0],[-c,d,0],[0,0,1]],this.m_),false)};z.scale=function(c,d){this.arcScaleX_*=c;this.arcScaleY_*=d;e(this,p([[c,0,0],[0,d,0],[0,0,1]],this.m_),true)};z.transform=function(c,d,i,j,n,y){e(this,p([[c,d,0],[i,j,0],[n,y,1]],this.m_),true)};z.setTransform=function(c,d,i,j,n,y){e(this,[[c,d,0],[i,j,0],
[n,y,1]],true)};z.clip=function(){};z.arcTo=function(){};z.createPattern=function(){return new r};f.prototype.addColorStop=function(c,d){d=m(d);this.colors_.push({offset:c,color:d.color,alpha:d.alpha})};G_vmlCanvasManager=P;CanvasRenderingContext2D=A;CanvasGradient=f;CanvasPattern=r;b.support.canvas="shim";G_vmlCanvasManager.fixElement_=function(c){var d=c.outerHTML,i=c.ownerDocument.createElement(d);if(d.slice(-2)!="/>"){d="/"+c.tagName;for(var j;(j=c.nextSibling)&&j.tagName!=d;)j.removeNode();j&&
j.removeNode()}else return c;c.parentNode.replaceChild(i,c);return i};G_vmlCanvasManager.fixDynamicElement=function(c){return G_vmlCanvasManager.initElement(G_vmlCanvasManager.fixElement_(c))};b.htmlExt.addMethod("getContext",function(c){this.getContext||P.fixDynamicElement(this);return this.getContext(c)})}(jQuery);
