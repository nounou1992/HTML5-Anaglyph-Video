/*
 *  HTML5 Anaglyph Video
 * 
 *  Copyright (C) 2012 Kevin Tong (logicmd AT gmail.com)
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 var processor={timerCallback:function(){if(!this.video.paused&&!this.video.ended){this.splitFrame();this.computeFrame();var c=this;setTimeout(function(){c.timerCallback()},0)}},doLoad:function(c,a,d,i,f){this.srcType=c;this.stereoMode=a;this.glassType=d;this.video=document.getElementById("videoDiv");this.isFullScreen=!1;this.cvs=document.getElementById("display");this.ctx=this.cvs.getContext("2d");this.buf=document.createElement("canvas");this.bufCtx=this.buf.getContext("2d");var h=this;this.video.addEventListener("play",
function(){h.width=0==h.video.width?h.video.clientWidth:h.video.width;h.height=0==h.video.height?h.video.clientHeight:h.video.height;h.vwidth=0==h.video.videoWidth?i:h.video.videoWidth;h.vheight=0==h.video.videoHeight?f:h.video.videoHeight;h.prepareSizeLoc();h.timerCallback()},!1)},prepareSizeLoc:function(){var c=this.vwidth,a=this.vheight;switch(this.srcType){case "StereoUD":case "StereoDU":this.buf.width=c;this.buf.height=2*a;this.imageData=this.ctx.createImageData(c,a);break;case "StereoLR":case "StereoRL":this.buf.width=
2*c,this.buf.height=a,this.imageData=this.ctx.createImageData(c,a)}this.cvs.style.position="relative";this.isFullScreen?this.enterFullScreen():this.enterNormMode()},computeFrame:function(){var c=this.glassType,a=0,d=this.iData1,i=this.iData2,f=this.imageData,h=this.imageData.width*this.imageData.height;switch(this.stereoMode){case "TrueAnaglyph":if("RedCyan"==c)var e=d,j=i,d=i;else if("GreenMagenta"==c)e=i,j=d;else return;for(x=0;x++<h;)r=0.299*e.data[a+0]+0.587*e.data[a+1]+0.114*e.data[a+2],"GreenMagenta"==
c?(g=0.299*j.data[a+0]+0.587*j.data[a+1]+0.114*j.data[a+2],b=0):(g=0,b=0.299*d.data[a+0]+0.587*d.data[a+1]+0.114*d.data[a+2]),r=Math.min(Math.max(r,0),255),b=Math.min(Math.max(b,0),255),f.data[a++]=r,f.data[a++]=g,f.data[a++]=b,f.data[a++]=255;break;case "GrayAnaglyph":if("RedCyan"==c)e=d,d=j=i;else if("GreenMagenta"==c)e=i,j=d,d=i;else return;for(x=0;x++<h;)r=0.299*e.data[a+0]+0.587*e.data[a+1]+0.114*e.data[a+2],g=0.299*j.data[a+0]+0.587*j.data[a+1]+0.114*j.data[a+2],b=0.299*d.data[a+0]+0.587*d.data[a+
1]+0.114*d.data[a+2],r=Math.min(Math.max(r,0),255),g=Math.min(Math.max(g,0),255),b=Math.min(Math.max(b,0),255),f.data[a++]=r,f.data[a++]=g,f.data[a++]=b,f.data[a++]=255;break;case "ColorAnaglyph":if("RedCyan"==c)e=d,d=j=i;else if("GreenMagenta"==c)e=i,j=d,d=i;else return;for(x=0;x++<h;)f.data[a]=e.data[a++],f.data[a]=j.data[a++],f.data[a]=d.data[a++],f.data[a]=255,a++;break;case "OptimizedAnaglyph":if("RedCyan"==c)e=d,d=j=i;else if("GreenMagenta"==c)e=i,j=d,d=i;else return;for(x=0;x++<h;)r=0.7*e.data[a+
1]+0.3*e.data[a+2],g=j.data[a+1],b=d.data[a+2],r=Math.min(Math.max(r,0),255),f.data[a++]=r,f.data[a++]=g,f.data[a++]=b,f.data[a++]=255;break;case "Optimized+Anaglyph":if("RedCyan"==c)e=d,d=j=i;else if("GreenMagenta"==c)e=i,j=d,d=i;else return;for(x=0;x++<h;)g=e.data[a+1]+0.45*Math.max(0,e.data[a+0]-e.data[a+1]),b=e.data[a+2]+0.25*Math.max(0,e.data[a+0]-e.data[a+2]),r=0.749*g+0.251*b,g=j.data[a+1]+0.45*Math.max(0,j.data[a+0]-j.data[a+1]),b=d.data[a+2]+0.25*Math.max(0,d.data[a+0]-d.data[a+2]),r=Math.min(Math.max(r,
0),255),g=Math.min(Math.max(g,0),255),b=Math.min(Math.max(b,0),255),f.data[a++]=r,f.data[a++]=g,f.data[a++]=b,f.data[a++]=255}this.tmpCvs.getContext("2d").putImageData(this.imageData,0,0);this.ctx.drawImage(this.tmpCvs,0,0)},splitFrame:function(){var c=this.vwidth,a=this.vheight;this.bufCtx.drawImage(this.video,0,0,c,a,0,0,this.buf.width,this.buf.height);switch(this.srcType){case "StereoUD":this.iData1=this.bufCtx.getImageData(0,0,c,a);this.iData2=this.bufCtx.getImageData(0,a,c,a);break;case "StereoDU":this.iData2=
this.bufCtx.getImageData(0,0,c,a);this.iData1=this.bufCtx.getImageData(0,a,c,a);break;case "StereoLR":this.iData1=this.bufCtx.getImageData(0,0,c,a);this.iData2=this.bufCtx.getImageData(c,0,c,a);break;case "StereoRL":this.iData2=this.bufCtx.getImageData(0,0,c,a),this.iData1=this.bufCtx.getImageData(c,0,c,a)}},enterNormMode:function(){this.tmpCvs=document.createElement("canvas");this.tmpCvs.width=this.imageData.width;this.tmpCvs.height=this.imageData.height;this.cvs.width=this.width;this.cvs.height=
this.height;this.cvs.style.top=0-this.height-1+"px";this.cvs.style.left="-1px";this.cvs.style.zIndex="2";var c=(this.cvs.height+1)/this.imageData.height,a=(this.cvs.width+1)/this.imageData.width,c=c<a?c:a;this.ctx.scale(c,c);this.ctx.translate((this.cvs.width+1-this.imageData.width*c)/2/c,(this.cvs.height+1-this.imageData.height*c)/2/c);this.isFullScreen=!1},enterFullScreen:function(c,a){this.tmpCvs=document.createElement("canvas");this.tmpCvs.width=this.imageData.width;this.tmpCvs.height=this.imageData.height;
this.cvs.width=window.screen.width;this.cvs.height=window.screen.height-45;this.cvs.style.zIndex="2147483647";0!=c?this.offsetX=c:c=this.offsetX;0!=a?this.offsetY=a:c=this.offsetY;this.cvs.style.top=0-this.height-a+"px";this.cvs.style.left=0-c+"px";var d=window.screen.height/this.imageData.height,i=this.cvs.width/this.imageData.width,d=d<i?d:i;this.ctx.scale(d,d);this.ctx.translate((this.cvs.width-this.imageData.width*d)/2/d,(window.screen.height-this.imageData.height*d)/2/d);this.isFullScreen=!0},
exitFullScreen:function(){this.enterNormMode();this.isFullScreen=!1}};