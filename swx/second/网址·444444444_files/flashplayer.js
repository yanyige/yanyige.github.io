/*! TenVideoPlayer_V2 - v2.0.0 - 2016-05-05 16:58:17
 * Copyright (c) 2016
 * Powered by Tencent-Video Web Front End Team 
*/
!function(a,b){a.BaseFlash=function(){this.swfPathRoot="",this.flashobj=null,this.flashVarsKeyMapToCfg={}},"number"!=typeof a.BaseFlash.maxId&&(a.BaseFlash.maxId=0),a.BaseFlash.prototype=new a.BasePlayer,b.extend(a.BaseFlash.prototype,{getFlashVar:function(){return""},getFlashVarVal:function(){var a={},c=this.config;return b.each(this.flashVarsKeyMapToCfg,function(d,e){var f=e;if(f in c){var g=b.type(c[f]);"boolean"==g?a[d]=c[f]?1:0:("number"==g||"string"===g)&&(a[d]=c[f])}else a[d]=""}),a},getFlashSwfUrl:function(){var c="";if(this.config.type==a.PLAYER_DEFINE.LIVE)b.isString(this.config.liveFlashUrl)&&this.config.liveFlashUrl.length>0?c=this.config.liveFlashUrl:(c=this.swfPathRoot+this.config.liveFlashSwfType.replace(/[^\w+]/gi,"")+".swf",c+="?max_age=86400&v="+this.config.flashVersionTag||"20140615");else{b.isString(this.config.vodFlashUrl)&&this.config.vodFlashUrl.length>0?c=this.config.vodFlashUrl:(c=this.swfPathRoot+this.config.vodFlashType.replace(/[^\w+]/gi,"")+".swf",c+="?max_age=86400&v="+this.config.flashVersionTag||"20140615");var d=navigator.userAgent;d.indexOf("Maxthon")>0&&d.indexOf("Chrome")>0&&(c+=(c.indexOf("?")>0?"&":"?")+"_="+a.$.now())}if(c=b.filterXSS(c),"undefined"!=typeof window.console&&b.isFunction(window.console.warn)&&c.indexOf("TencentPlayer.swf")>0&&-1==b.inArray(document.location.hostname,["v.qq.com","film.qq.com"])){var e="\u60a8\u5f53\u524d\u4f7f\u7528\u7684flash\u64ad\u653e\u5668\u662f\u817e\u8baf\u89c6\u9891\u5b98\u7f51\u4e13\u7528\u7248\uff0c\u5982\u65e0\u5fc5\u8981\u8bf7\u4f7f\u7528\u5916\u8d34\u7248\u672c";b.browser.chrome?window.console.warn("%c"+e,"background: rgba(252,234,187,1)"):window.console.warn(e)}return c},getFlashHTML:function(){var a=this.getFlashVar(),c=this.getFlashSwfUrl(),d=b.formatSize(this.config.width),e=b.formatSize(this.config.height);this.playerid||(this.config.playerid?this.playerid=this.config.playerid:this.playerid="tenvideo_flash_player_"+(new Date).getTime());var f=['<param name="allowScriptAccess" value="always" />','<param name="movie" value="'+c+'" />','<param name="quality" value="high" />','<param name="allowFullScreen" value="true"/>','<param name="play" value="true" />','<param name="wmode" value="'+b.filterXSS(this.config.flashWmode)+'" />','<param name="flashvars" value="'+a+'"/>','<param name="type" value="application/x-shockwave-flash" />','<param name="pluginspage" value="http://get.adobe.com/cn/flashplayer/" />'].join("\n"),g="";return b.browser.ie?(g+=11==b.browser.version?'<object data="'+c+'" type="application/x-shockwave-flash" width="'+d+'" height="'+e+'" id="'+this.playerid+'" codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=10,2,0,0">\n':'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+d+'" height="'+e+'" id="'+this.playerid+'" codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=10,2,0,0">\n',g+=f,g+='	<div id="tvp_flash_install" style="line-height:'+e+';background:#000000;text-align:center"><a href="http://www.adobe.com/go/getflashplayer" target="_blank" style="color:#ffffff;font-size:14px;padding:10px;">\u70b9\u51fb\u6b64\u5904\u5b89\u88c5\u64ad\u653e\u89c6\u9891\u9700\u8981\u7684flash\u63d2\u4ef6</a></div>\n',g+="</object>"):g+='<embed wmode="'+b.filterXSS(this.config.flashWmode)+'" flashvars="'+a+'" src="'+c+'" quality="high" name="'+this.playerid+'" id="'+this.playerid+'" bgcolor="#000000" width="'+d+'" height="'+e+'" align="middle" allowScriptAccess="always" allowFullScreen="true"  type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></embed>',g},write:function(c){var d=null;if("object"==b.type(c)&&1==c.nodeType?(d=c,this.$mod=b("#"+c.id),this.modId=this.$mod.attr("id")||""):(d=a.$.getByID(c),this.modId=c,this.$mod=b(d)),d){var e=this.getFlashHTML(),f=b.now(),g=this.getFlashSwfUrl(),h=3544,i=this,j="mod_"+this.playerid;this.on(a.ACTION.onFlashPlayerInited,function(){a.report({cmd:h,speed:b.now()-f,appId:i.config.appid,contentId:i.config.contentId,vid:i.curVideo.getFullVid()||i.curVideo.getChannelId(),str3:i.getPlayerType(),str4:g})}),a.report({cmd:h,appId:i.config.appid,contentId:i.config.contentId,vid:i.curVideo.getFullVid()||i.curVideo.getChannelId(),str3:i.getPlayerType(),str4:g}),window.jQuery?jQuery(d).html('<div id="'+j+'" class="tenvideo_player">'+e+"</div>"):d.innerHTML='<div id="'+j+'" class="tenvideo_player">'+e+"</div>",this.flashobj=b.browser.ie?document.getElementById(this.playerid):document.embeds[this.playerid],this.videomod=b.getByID(j);var k=this.config.height+"",l=b.getByID("tvp_flash_install");k.indexOf("%")>0&&l&&(l.style.lineHeight=d.offsetHeight)}},getPlayer:function(){return this.flashobj},listenerFlashCrash:function(){function c(){if(e){var b={ftime:(+new Date+"").slice(0,11),uin:a.$.cookie.get("uin")||a.$.cookie.get("luin"),playerverion:e.player,streamtype:e.steam,p2pvertion:e.p2p,os:e.os,flashersion:e.flash,browser:d(),browserverstion:a.$.browser.version,ua:navigator.userAgent.toLowerCase(),playtype:1===f.config.type?"live":"vod",vurl:document.URL},c=new Image(1,1);c.src="http://btrace.video.qq.com/kvcollect?BossId=3353&Pwd=1856399576&_dc="+Math.random()+"&"+a.$.param(b)}}function d(){return a.$.browser.ie?"ie":a.$.browser.chrome?"chrome":a.$.browser.firefox?"firefox":a.$.browser.safari?"safari":"other"}if(!this.timer_flash_crash&&this.flashobj&&"function"===b.type(this.flashobj.getFPInfo)){var e=this.flashobj.getFPInfo(),f=this;this.timer_flash_crash=setInterval(function(){var a;f&&f.flashobj&&"function"===b.type(f.flashobj.getFPInfo)?(a=f.flashobj.getFPInfo())&&(e=a):(clearInterval(f.timer_flash_crash),c())},15e3)}}})}(tvp,tvp.$);var preplay=tvp.$.noop,nextplay=tvp.$.noop,attrationstop=tvp.$.noop,thisplay=tvp.$.noop,playerInit=tvp.$.noop;!function(a,b){var c="",d=-1,e=null;a.FlashPlayer=function(c,d){this.config=b.extend({},this.config),e=this,this.flashVarsKeyMapToCfg={cid:"coverId",tpid:"typeId",showend:"isVodFlashShowEnd",showcfg:"isVodFlashShowCfg",searchbar:"isVodFlashShowSearchBar",loadingswf:"loadingswf",share:"isVodFlashShowShare",pic:"pic",oid:"oid",skin:"vodFlashSkin",shownext:"isVodFlashShowNextBtn",list:"vodFlashListType",autoplay:"autoplay"},this.swfPathRoot="http://imgcache.qq.com/tencentvideo_v1/player/",this.swfPathRoot=a.common.get_request_url("swf_root"),a.BaseFlash.maxId++,this.isStartPlay=!1,this.getPlayerType=function(){return"flash"},this.config.width=a.$.filterXSS(c),this.config.height=a.$.filterXSS(d),window.__flashplayer_ismax=function(a){e.callCBEvent("onfullscreen",a)},window.__tenplay_popwin=function(){a.$.isFunction(e.onflashpopup)&&e.callCBEvent("onflashpopup")},window._showPlayer=function(){e.showPlayer()},window._hidePlayer=function(){e.hidePlayer()}},a.FlashPlayer.fn=a.FlashPlayer.prototype=new a.BaseFlash,b.extend(a.FlashPlayer.fn,{play:function(e){function f(a){var c={vid:a.getVidList()||a.getIdx(),duration:a.getDuration()||"",start:j,end:k,history:a.getHistoryStart()||0,vstart:h,vend:i,title:a.getTitle()||"",exid:l,pay:a.getPay(),cdntype:a.getCDNType(),bulletid:b.isFunction(a.getBulletId)?a.getBulletId():""};return c}if(!this.flashobj)throw new Error("\u672a\u627e\u5230\u89c6\u9891\u64ad\u653e\u5668\u5bf9\u8c61\uff0c\u8bf7\u786e\u8ba4flash\u64ad\u653e\u5668\u662f\u5426\u5b58\u5728");if(b.isUndefined(e)&&"function"==typeof this.flashobj.setPlaytime)return void(-1==d?"function"==typeof this.flashobj.loadAndPlayVideoV2&&this.flashobj.loadAndPlayVideoV2(f(this.getCurVideo())):(this.flashobj.setPlaytime(d),d=-1,this.isStartPlay=!0));if(!e instanceof a.VideoInfo)throw new Error("\u4f20\u5165\u7684\u5bf9\u8c61\u4e0d\u662ftvp.VideoInfo\u7684\u5b9e\u4f8b");var g=c!=e.getFullVid();this.setCurVideo(e),g&&this.callCBEvent("onchange",this.curVideo.getFullVid()),c=this.curVideo.getFullVid(),this.isStartPlay=!1;var h=0,i=0,j=0,k=0;0==e.getIdx()?(h=e.getPrefix()||0,i=e.getEndOffset()||0):(j=e.getTagStart(),k=e.getTagEnd());var l=0==e.getIdx()?0:"k"+e.getIdx();if(this.curVideo.getVidList()!=e.getVidList()||0==e.getIdx()){var m=f(e);0==this.config.starttips&&(m.t=e.getHistoryStart()||0),"function"==typeof this.flashobj.loadAndPlayVideoV2&&this.flashobj.loadAndPlayVideoV2(m)}else e.getTagEnd()-e.getTagStart()>0&&this.flashobj.attractionUpdate(e.getTagStart(),e.getTagEnd(),l);this.isStartPlay=!0,this.callCBEvent("onplay",e.getFullVid()),"function"==typeof this.flashobj.setNextEnable&&this.flashobj.setNextEnable(this.callCBEvent("ongetnextenable",this.curVideo.getFullVid())?1:0)},pause:function(){e.isStartPlay&&this.flashobj&&"function"==typeof this.flashobj.getPlaytime&&"function"==typeof this.flashobj.pauseVideo&&(d=this.flashobj.getPlaytime(),this.flashobj.pauseVideo(),this.isStartPlay=!1)},getFlashVar:function(){var c="",d=this.getFlashVarVal();if(c+="vid="+this.curVideo.getVidList(),this.curVideo.getTagEnd()-this.curVideo.getTagStart()>0&&(c+="&attstart="+a.$.filterXSS(this.curVideo.getTagStart()),c+="&attend="+a.$.filterXSS(this.curVideo.getTagEnd())),this.curVideo.getDuration()>0&&(c+="&duration="+(this.curVideo.getDuration()||"")),this.curVideo.getHistoryStart()>0&&(c+="&history="+a.$.filterXSS(this.curVideo.getHistoryStart())),this.curVideo.getTstart()>0&&(c+="&t="+a.$.filterXSS(this.curVideo.getTstart())),0==this.curVideo.getIdx()&&(this.curVideo.getPrefix()>0||this.curVideo.getTail()>0)){var e=this.curVideo.getPrefix(),f=this.curVideo.getEndOffset();(e>0||f)&&(c+="&vstart="+a.$.filterXSS(e),c+="&vend="+a.$.filterXSS(f))}a.$.each(d,function(d,e){(b.isString(e)&&e.length>0||"number"==b.type(e))&&(c+="&"+d+"="+a.$.filterXSS(e))}),this.curVideo.getPay()&&(c+="&pay="+(b.isTrue(this.curVideo.getPay())?1:0)),this.curVideo.getIdx()&&(c+="&exid=k"+a.$.filterXSS(this.curVideo.getIdx())),this.curVideo.getCDNType()>0&&(c+="&cdntype="+this.curVideo.getCDNType());for(var g in this.config.vodFlashExtVars)c+=["&",encodeURIComponent(g),"=",encodeURIComponent(this.config.vodFlashExtVars[g])].join("");return b.isFunction(this.curVideo.getBullet)&&this.curVideo.getBullet()===!0&&(c+="&bullet=1",b.isFunction(this.curVideo.getBulletId)&&(c+="&bulletid="+this.curVideo.getBulletId())),this.curVideo.getTitle().length>0&&(c+="&title="+encodeURIComponent(this.curVideo.getTitle())),c},getPlaytime:function(){return this.flashobj&&"function"==typeof this.flashobj.getPlaytime?this.flashobj.getPlaytime():-1},setPlaytime:function(a,b){return this.flashobj&&"function"==typeof this.flashobj.setPlaytime?this.flashobj.setPlaytime(a,b):void 0},showPlayer:function(){if(this.flashobj){var a=""+this.config.width,b=""+this.config.height;a.indexOf("px")<0&&(a=parseInt(a)+"px"),b.indexOf("px")<0&&(b=parseInt(b)+"px"),this.flashobj.style.width=a,this.flashobj.style.height=b}},hidePlayer:function(){this.flashobj&&(this.flashobj.style.width="1px",this.flashobj.style.height="1px")}}),window.__tenplay_onMessage=function(b,c){if(a.Player&&a.Player.instance&&b){var d=a.Player.instance[b]||{},e="";switch(parseInt(c,10)){case 1:e="onpause";break;case 3:e="onresume";break;case 4:e="onvolumechange"}e&&"function"==typeof d.callCBEvent&&d.callCBEvent(e)}},window.thisplay=function(c,d){var e;d&&d.id&&a.Player&&a.Player.instance&&(e=a.Player.instance[d.id]||{},e.isStartPlay=!0,e.instance&&(e.instance.isStartPlay=!0),"function"==typeof e.callCBEvent&&e.callCBEvent("onplaying",e.getCurVid(),d),"function"===b.type(e.listenerFlashCrash)&&e.listenerFlashCrash.call(e))},window.toggleFakeFullScreen=function(b){var c,d,e;return b&&b.id&&a.Player&&a.Player.instance?(c=a.Player.instance[b.id]||{},c.playerid?(d=a.$("#"+c.playerid),d&&d.length?(e=d.parent()[0],b.enter?(c._cache_flash_style=d[0].style.cssText,c._cache_flash_parent_style=d.parent()[0].style.cssText,d.css({width:"100%",height:"100%"}).parent().css({position:"fixed",top:0,left:0,width:"100%",height:"100%","z-index":c.config.flashFakeFullscreenZindex||9999}),$j("html,body").css({overflow:"hidden"}),c._cache_flash_isfullscreen=!0,"function"===a.$.type(c.onFlashFakeFullScreenChange)&&c.onFlashFakeFullScreenChange.call(c,{isFull:1,flash:d}),!0):(d[0].style.cssText=c._cache_flash_style,d.parent()[0].style.cssText=c._cache_flash_parent_style,$j("html,body").css({overflow:"auto"}),c._cache_flash_isfullscreen=!1,"function"===a.$.type(c.onFlashFakeFullScreenChange)&&c.onFlashFakeFullScreenChange.call(c,{isFull:0,flash:d}),!0)):!1):!1):!1},window.playerInit=function(b){var c,d,e;if(b&&a.Player&&a.Player.instance){if(c=a.Player.instance[b],!c)return;e=2===c.config.type?c.curVideo.getFullVid():c.curVideo.getChannelId(),d=c.callCBEvent("ongetnextenable",e)?1:0,c.execFlashMethod("setNextEnable",d),c.trigger(a.ACTION.onFlashPlayerInited),c.callCBEvent("oninited"),c.callCBEvent("onready"),c.callCBEvent("onplay",e)}},window._flash_play_error||(window._flash_play_error=function(b,c){var d;b&&a.Player&&a.Player.instance&&(d=a.Player.instance[b],d.callCBEvent("onerror",c))}),window.attrationstop=window.nextplay=function(b,c){var d,e;if(c&&c.id&&a.Player&&a.Player.instance)d=a.Player.instance[c.id]||{};else if(a.Player&&a.Player.instance)for(e in a.Player.instance)if(a.Player.instance.hasOwnProperty(e)){d=a.Player.instance[e];break}if(d instanceof a.Player){d.callCBEvent("onended",b);var f=d.callCBEvent("ongetnext",b);return f?void d.play(f):void d.callCBEvent("onallended")}},window.__adldstart=function(b){var c;if(b&&a.Player&&a.Player.instance){if(c=a.Player.instance[b],!c)return;c.callCBEvent("onadplay")}}}(tvp,tvp.$);