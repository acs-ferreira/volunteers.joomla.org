/* jce - 2.6.33 | 2018-10-10 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(tinymce){var lastExtID,DOM=tinymce.DOM,Event=tinymce.dom.Event,extend=tinymce.extend,each=tinymce.each,Cookie=tinymce.util.Cookie,explode=tinymce.explode;tinymce.ThemeManager.requireLangPack("advanced"),tinymce.create("tinymce.themes.AdvancedTheme",{controls:{bold:["bold_desc","Bold"],italic:["italic_desc","Italic"],underline:["underline_desc","Underline"],strikethrough:["striketrough_desc","Strikethrough"],justifyleft:["justifyleft_desc","JustifyLeft"],justifycenter:["justifycenter_desc","JustifyCenter"],justifyright:["justifyright_desc","JustifyRight"],justifyfull:["justifyfull_desc","JustifyFull"],outdent:["outdent_desc","Outdent"],indent:["indent_desc","Indent"],undo:["undo_desc","Undo"],redo:["redo_desc","Redo"],unlink:["unlink_desc","unlink"],cleanup:["cleanup_desc","mceCleanup"],help:["help_desc","mceHelp"],code:["code_desc","mceCodeEditor"],removeformat:["removeformat_desc","RemoveFormat"],sub:["sub_desc","subscript"],sup:["sup_desc","superscript"],forecolor:["forecolor_desc","ForeColor"],forecolorpicker:["forecolor_desc","mceForeColor"],backcolor:["backcolor_desc","HiliteColor"],backcolorpicker:["backcolor_desc","mceBackColor"],visualaid:["visualaid_desc","mceToggleVisualAid"],newdocument:["newdocument_desc","mceNewDocument"],blockquote:["blockquote_desc","mceBlockQuote"]},stateControls:["bold","italic","underline","strikethrough","justifyleft","justifycenter","justifyright","justifyfull","sub","sup","blockquote"],init:function(ed,url){var s,v,t=this;t.editor=ed,t.url=url,t.onResolveName=new tinymce.util.Dispatcher(this),t.onResize=new tinymce.util.Dispatcher(this),s=ed.settings,ed.forcedHighContrastMode=ed.settings.detect_highcontrast&&t._isHighContrast(),ed.settings.skin=ed.forcedHighContrastMode?"highcontrast":ed.settings.skin,s.theme_advanced_buttons1||(s=extend({theme_advanced_buttons1:"bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",theme_advanced_buttons2:"bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",theme_advanced_buttons3:"hr,removeformat,visualaid,|,sub,sup,|,charmap"},s)),t.settings=s=extend({theme_advanced_path:!0,theme_advanced_toolbar_location:"top",theme_advanced_blockformats:"p,address,pre,h1,h2,h3,h4,h5,h6",theme_advanced_toolbar_align:"left",theme_advanced_statusbar_location:"bottom",theme_advanced_fonts:"Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",theme_advanced_more_colors:1,theme_advanced_row_height:23,theme_advanced_resize_horizontal:1,theme_advanced_resizing_use_cookie:1,theme_advanced_font_sizes:"1,2,3,4,5,6,7",theme_advanced_font_selector:"span",theme_advanced_show_current_color:0,readonly:ed.settings.readonly},s),(v=s.theme_advanced_path_location)&&"none"!=v&&(s.theme_advanced_statusbar_location=s.theme_advanced_path_location),"none"==s.theme_advanced_statusbar_location&&(s.theme_advanced_statusbar_location=0),ed.settings.compress.css||ed.settings.content_css===!1||ed.contentCSS.push(ed.baseURI.toAbsolute(url+"/skins/"+ed.settings.skin+"/content.css")),ed.onInit.add(function(){ed.settings.readonly||(ed.onNodeChange.add(t._nodeChanged,t),ed.onKeyUp.add(t._updateUndoStatus,t),ed.onMouseUp.add(t._updateUndoStatus,t),ed.dom.bind(ed.dom.getRoot(),"dragend",function(){t._updateUndoStatus(ed)}))}),ed.onPostRender.add(function(){DOM.setStyle(ed.id+"_tbl","width","");var e=DOM.get(ed.id+"_parent"),ifr=DOM.get(ed.id+"_ifr");s.height&&DOM.setStyle(ifr,"height",s.height),s.width&&(DOM.setStyle(e.parentNode,"max-width",s.width+"px"),DOM.setStyle(ifr,"max-width",s.width+"px"))}),ed.onSetProgressState.add(function(ed,b,ti){var co,tb,id=ed.id;b?t.progressTimer=setTimeout(function(){co=ed.getContainer(),co=co.insertBefore(DOM.create("DIV",{style:"position:relative"}),co.firstChild),tb=DOM.get(ed.id+"_tbl"),DOM.add(co,"div",{id:id+"_blocker",class:"mceBlocker",style:{width:tb.clientWidth+2,height:tb.clientHeight+2}}),DOM.add(co,"div",{id:id+"_progress",class:"mceProgress",style:{left:tb.clientWidth/2,top:tb.clientHeight/2}})},ti||0):(DOM.remove(id+"_blocker"),DOM.remove(id+"_progress"),clearTimeout(t.progressTimer))}),ed.settings.compress.css||(DOM.loadCSS(s.editor_css?ed.documentBaseURI.toAbsolute(s.editor_css):url+"/skins/"+ed.settings.skin+"/ui.css"),s.skin_variant&&DOM.loadCSS(url+"/skins/"+ed.settings.skin+"/ui_"+s.skin_variant+".css"))},_isHighContrast:function(){var actualColor,div=DOM.add(DOM.getRoot(),"div",{style:"background-color: rgb(171,239,86);"});return actualColor=(DOM.getStyle(div,"background-color",!0)+"").toLowerCase().replace(/ /g,""),DOM.remove(div),"rgb(171,239,86)"!=actualColor&&"#abef56"!=actualColor},createControl:function(n,cf){var cd,c;return(c=cf.createControl(n))?c:(cd=this.controls[n])?cf.createButton(n,{title:"advanced."+cd[0],cmd:cd[1],ui:cd[2],value:cd[3]}):void 0},execCommand:function(cmd,ui,val){var f=this["_"+cmd];return!!f&&(f.call(this,ui,val),!0)},renderUI:function(o){var n,ic,sc,p,t=this,ed=t.editor,s=t.settings;ed.settings&&(ed.settings.aria_label=s.aria_label+ed.getLang("advanced.help_shortcut"));var skin="defaultSkin";return"default"!==ed.settings.skin&&(skin+=" "+ed.settings.skin+"Skin",s.skin_variant&&(skin+=" "+ed.settings.skin+"Skin"+t._ufirst(s.skin_variant))),n=p=DOM.create("div",{role:"application","aria-labelledby":ed.id+"_voice",id:ed.id+"_parent",class:"mceEditor "+skin+("rtl"==ed.settings.directionality?" mceRtl":"")}),DOM.add(n,"span",{class:"mceVoiceLabel",style:"display:none;",id:ed.id+"_voice"},s.aria_label),n=sc=DOM.add(n,"div",{role:"presentation",id:ed.id+"_tbl",class:"mceLayout"}),ic=t._createLayout(s,n,o,p),n=o.targetNode,DOM.addClass(sc.firstChild,"mceFirst"),DOM.addClass(sc.lastChild,"mceLast"),DOM.insertAfter(p,n),Event.add(ed.id+"_path_row","click",function(e){if(e=DOM.getParent(e.target,"a"),e&&"A"==e.nodeName)return t._sel(e.className.replace(/^.*mcePath_([0-9]+).*$/,"$1")),!1}),ed.getParam("accessibility_focus")||Event.add(DOM.add(p,"a",{href:"#"},"<!-- IE -->"),"focus",function(){tinyMCE.get(ed.id).focus()}),"external"==s.theme_advanced_toolbar_location&&(o.deltaHeight=0),t.deltaHeight=o.deltaHeight,o.targetNode=null,ed.onKeyDown.add(function(ed,evt){var DOM_VK_F10=121,DOM_VK_F11=122;if(evt.altKey){if(evt.keyCode===DOM_VK_F10)return tinymce.isWebKit&&window.focus(),t.toolbarGroup.focus(),Event.cancel(evt);if(evt.keyCode===DOM_VK_F11)return DOM.get(ed.id+"_path_row").focus(),Event.cancel(evt)}}),{iframeContainer:ic,editorContainer:ed.id+"_parent",sizeContainer:sc,deltaHeight:o.deltaHeight}},getInfo:function(){return{longname:"Advanced theme",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",version:tinymce.majorVersion+"."+tinymce.minorVersion}},resizeBy:function(dw,dh){var e=DOM.get(this.editor.id+"_ifr");this.resizeTo(e.clientWidth+dw,e.clientHeight+dh)},resizeTo:function(w,h,store){var ed=this.editor,s=this.settings,e=DOM.get(ed.id+"_parent"),ifr=DOM.get(ed.id+"_ifr");w=Math.max(s.theme_advanced_resizing_min_width||100,w),h=Math.max(s.theme_advanced_resizing_min_height||100,h),w=Math.min(s.theme_advanced_resizing_max_width||65535,w),h=Math.min(s.theme_advanced_resizing_max_height||65535,h),DOM.setStyle(ifr,"height",h),s.theme_advanced_resize_horizontal&&(DOM.setStyle(e.parentNode,"max-width",w+"px"),DOM.setStyle(ifr,"max-width",w+"px")),store&&s.theme_advanced_resizing_use_cookie&&Cookie.setHash("TinyMCE_"+ed.id+"_size",{cw:w,ch:h}),this.onResize.dispatch()},destroy:function(){var id=this.editor.id;Event.clear(id+"_resize"),Event.clear(id+"_path_row"),Event.clear(id+"_external_close")},_createLayout:function(s,tb,o,p){var n,ic,c,t=this,ed=t.editor,lo=s.theme_advanced_toolbar_location,sl=s.theme_advanced_statusbar_location;return s.readonly?ic=DOM.add(tb,"div",{class:"mceIframeContainer"}):("top"==lo&&t._addToolbars(tb,o),"external"==lo&&(n=c=DOM.create("div",{style:"position:relative"}),n=DOM.add(n,"div",{id:ed.id+"_external",class:"mceExternalToolbar"}),DOM.add(n,"a",{id:ed.id+"_external_close",class:"mceExternalClose"}),n=DOM.add(n,"div",{id:ed.id+"_tblext",cellSpacing:0,cellPadding:0}),p.insertBefore(c,p.firstChild),t._addToolbars(n,o),ed.onMouseUp.add(function(){var e=DOM.get(ed.id+"_external");DOM.show(e),DOM.hide(lastExtID);var f=Event.add(ed.id+"_external_close","click",function(){return DOM.hide(ed.id+"_external"),Event.remove(ed.id+"_external_close","click",f),!1});DOM.show(e),DOM.setStyle(e,"top",0-DOM.getRect(ed.id+"_tblext").h-1),DOM.hide(e),DOM.show(e),e.style.filter="",lastExtID=ed.id+"_external",e=null})),"top"==sl&&t._addStatusBar(tb,o),n=ic=DOM.add(tb,"div",{class:"mceIframeContainer"}),"bottom"==lo&&t._addToolbars(tb,o),"bottom"==sl&&t._addStatusBar(tb,o),ic)},_addControls:function(v,tb){var di,t=this,s=t.settings,cf=(t.editor,t.editor.controlManager);s.theme_advanced_disable&&!t._disabled?(di={},each(explode(s.theme_advanced_disable),function(v){di[v]=1}),t._disabled=di):di=t._disabled,each(explode(v),function(n){var c;di&&di[n]||(c=t.createControl(n,cf),c&&tb.add(c))})},_addToolbars:function(c,o){var i,tb,v,n,a,toolbarGroup,t=this,ed=t.editor,s=t.settings,cf=ed.controlManager,h=[],toolbarsExist=!1;for(toolbarGroup=cf.createToolbarGroup("toolbargroup",{name:ed.getLang("advanced.toolbar"),tab_focus_toolbar:ed.getParam("theme_advanced_tab_focus_toolbar")}),t.toolbarGroup=toolbarGroup,a=s.theme_advanced_toolbar_align.toLowerCase(),a="mce"+t._ufirst(a),n=DOM.add(c,"div",{class:"mceToolbar "+a,role:"toolbar"}),i=1;v=s["theme_advanced_buttons"+i];i++)toolbarsExist=!0,tb=cf.createToolbar("toolbar"+i,{class:"mceToolbarRow"+i}),s["theme_advanced_buttons"+i+"_add"]&&(v+=","+s["theme_advanced_buttons"+i+"_add"]),s["theme_advanced_buttons"+i+"_add_before"]&&(v=s["theme_advanced_buttons"+i+"_add_before"]+","+v),t._addControls(v,tb),toolbarGroup.add(tb),o.deltaHeight-=s.theme_advanced_row_height;toolbarsExist||(o.deltaHeight-=s.theme_advanced_row_height),h.push(toolbarGroup.renderHTML()),h.push(DOM.createHTML("a",{href:"#",accesskey:"z",title:ed.getLang("advanced.toolbar_focus"),onfocus:"tinyMCE.getInstanceById('"+ed.id+"').focus();"},"<!-- IE -->")),DOM.setHTML(n,h.join(""))},_addStatusBar:function(tb,o){var n,td,t=this,ed=t.editor,s=t.settings;n=td=DOM.add(tb,"div",{class:"mceStatusbar"}),n=DOM.add(n,"div",{id:ed.id+"_path_row",role:"group","aria-labelledby":ed.id+"_path_voice",class:"mcePathRow"}),s.theme_advanced_path?DOM.add(n,"span",{id:ed.id+"_path_voice",class:"mcePathLabel"},ed.translate("advanced.path")+": "):DOM.add(n,"span",{},"&#160;"),s.theme_advanced_resizing&&(DOM.add(td,"a",{id:ed.id+"_resize",onclick:"return false;",class:"mceResize",tabIndex:"-1"}),s.theme_advanced_resizing_use_cookie&&ed.onPostRender.add(function(){var o=Cookie.getHash("TinyMCE_"+ed.id+"_size");DOM.get(ed.id+"_tbl");o&&t.resizeTo(o.cw,o.ch,!1)}),ed.onPostRender.add(function(){Event.add(ed.id+"_resize","click",function(e){e.preventDefault()}),Event.add(ed.id+"_resize","mousedown",function(e){function resizeOnMove(e){e.preventDefault(),width=startWidth+(e.screenX-startX),height=startHeight+(e.screenY-startY),t.resizeTo(width,height)}function endResize(e){Event.remove(DOM.doc,"mousemove",mouseMoveHandler1),Event.remove(ed.getDoc(),"mousemove",mouseMoveHandler2),Event.remove(DOM.doc,"mouseup",mouseUpHandler1),Event.remove(ed.getDoc(),"mouseup",mouseUpHandler2),width=startWidth+(e.screenX-startX),height=startHeight+(e.screenY-startY),t.resizeTo(width,height,!0),ed.nodeChanged()}var mouseMoveHandler1,mouseMoveHandler2,mouseUpHandler1,mouseUpHandler2,startX,startY,startWidth,startHeight,width,height,ifrElm;e.preventDefault(),startX=e.screenX,startY=e.screenY,ifrElm=DOM.get(t.editor.id+"_ifr"),startWidth=width=ifrElm.clientWidth,startHeight=height=ifrElm.clientHeight,mouseMoveHandler1=Event.add(DOM.doc,"mousemove",resizeOnMove),mouseMoveHandler2=Event.add(ed.getDoc(),"mousemove",resizeOnMove),mouseUpHandler1=Event.add(DOM.doc,"mouseup",endResize),mouseUpHandler2=Event.add(ed.getDoc(),"mouseup",endResize)})})),o.deltaHeight-=21,n=tb=null},_updateUndoStatus:function(ed){var cm=ed.controlManager,um=ed.undoManager;cm.setDisabled("undo",!um.hasUndo()&&!um.typing),cm.setDisabled("redo",!um.hasRedo())},_nodeChanged:function(ed,cm,n,co,ob){function getParent(name){var i,parents=ob.parents,func=name;for("string"==typeof name&&(func=function(node){return node.nodeName==name}),i=0;i<parents.length;i++)if(func(parents[i]))return parents[i]}function isLink(n){return!!n&&n.href&&(!n.name||!n.id)}var p,v,c,t=this,de=0,s=t.settings;tinymce.each(t.stateControls,function(c){cm.setActive(c,ed.queryCommandState(t.controls[c][1]))}),cm.setActive("visualaid",ed.hasVisual),t._updateUndoStatus(ed),cm.setDisabled("outdent",!ed.queryCommandState("Outdent"));var link=getParent("A");getParent("IMG");if((c=cm.get("unlink"))&&(c.setDisabled(!isLink(link)),c.setActive(isLink(link))),s.theme_advanced_path&&s.theme_advanced_statusbar_location){p=DOM.get(ed.id+"_path")||DOM.add(ed.id+"_path_row","span",{id:ed.id+"_path",class:"mcePathPath"}),t.statusKeyboardNavigation&&(t.statusKeyboardNavigation.destroy(),t.statusKeyboardNavigation=null),DOM.setHTML(p,""),getParent(function(n){var pi,na=n.nodeName.toLowerCase(),ti="";if(!(1!=n.nodeType||"br"===na||n.getAttribute("data-mce-bogus")||DOM.hasClass(n,"mce-item-hidden")||DOM.hasClass(n,"mce-item-removed")||DOM.hasClass(n,"mce-item-shim"))){switch(tinymce.isIE&&n.scopeName&&"HTML"!==n.scopeName&&(na=n.scopeName+":"+na),na=na.replace(/mce\:/g,"")){case"b":na="strong";break;case"img":(v=DOM.getAttrib(n,"src"))&&(ti+="src: "+v+" ");break;case"a":(v=DOM.getAttrib(n,"href"))&&(ti+="href: "+v+" ");break;case"font":(v=DOM.getAttrib(n,"face"))&&(ti+="font: "+v+" "),(v=DOM.getAttrib(n,"size"))&&(ti+="size: "+v+" "),(v=DOM.getAttrib(n,"color"))&&(ti+="color: "+v+" ");break;case"span":(v=DOM.getAttrib(n,"style"))&&(ti+="style: "+v+" ")}(v=DOM.getAttrib(n,"id"))&&(ti+="id: "+v+" "),(v=DOM.getAttrib(n,"class"))&&(v=v.replace(/mce-item-[\w]+/g,""),v=tinymce.trim(v),v&&(ti+="class: "+v+" ",(ed.dom.isBlock(n)||"img"==na||"span"==na)&&(na+="."+v))),na=na.replace(/(html:)/g,""),na={name:na,node:n,title:ti},t.onResolveName.dispatch(t,na),ti=na.title,na=na.name,pi=DOM.create("a",{href:"javascript:;",role:"button",onmousedown:"return false;",title:ti,class:"mcePath_"+de++},'<span class="mceText">'+na+"</span>"),p.hasChildNodes()?(p.insertBefore(DOM.create("span",{"aria-hidden":"true"}," » "),p.firstChild),p.insertBefore(pi,p.firstChild)):p.appendChild(pi)}},ed.getBody()),DOM.select("a",p).length>0&&(t.statusKeyboardNavigation=new tinymce.ui.KeyboardNavigation({root:ed.id+"_path_row",items:DOM.select("a",p),excludeFromTabOrder:!0,onCancel:function(){ed.focus()}},DOM));var row=DOM.get(ed.id+"_path_row"),status=row.parentNode,mod=20;tinymce.each(status.childNodes,function(n){return!!DOM.hasClass(n,"mcePathRow")||void(mod+=n.offsetWidth)}),tinymce.each(DOM.select("a",p),function(n){DOM.removeClass(n,"mcePathHidden"),p.offsetWidth+mod+DOM.getPrev(p,".mcePathLabel").offsetWidth>status.offsetWidth&&DOM.addClass(n,"mcePathHidden")})}},_sel:function(v){this.editor.execCommand("mceSelectNodeDepth",!1,v)},_mceHelp:function(){var ed=this.editor;ed.windowManager.open({url:ed.getParam("site_url")+"index.php?option=com_jce&view=help&tmpl=component&lang="+ed.getParam("language")+"&section=editor&category=editor&article=about",inline:!0,width:780,height:560},{theme_url:this.url})},_mceNewDocument:function(){var ed=this.editor;ed.windowManager.confirm("advanced.newdocument",function(s){s&&ed.execCommand("mceSetContent",!1,"")})},_ufirst:function(s){return s.substring(0,1).toUpperCase()+s.substring(1)}}),tinymce.ThemeManager.add("advanced",tinymce.themes.AdvancedTheme)}(tinymce);