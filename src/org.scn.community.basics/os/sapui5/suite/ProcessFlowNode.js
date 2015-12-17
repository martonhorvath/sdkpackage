/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.ProcessFlowNode");jQuery.sap.require("sap.suite.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.suite.ui.commons.ProcessFlowNode",{metadata:{library:"sap.suite.ui.commons",properties:{"title":{type:"string",group:"Misc",defaultValue:null},"isTitleClickable":{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},"laneId":{type:"string",group:"Misc",defaultValue:null},"nodeId":{type:"string",group:"Misc",defaultValue:null},"state":{type:"sap.suite.ui.commons.ProcessFlowNodeState",group:"Misc",defaultValue:sap.suite.ui.commons.ProcessFlowNodeState.Neutral},"children":{type:"string[]",group:"Misc",defaultValue:null},"titleAbbreviation":{type:"string",group:"Misc",defaultValue:null},"stateText":{type:"string",group:"Misc",defaultValue:null},"texts":{type:"string[]",group:"Misc",defaultValue:null},"highlighted":{type:"boolean",group:"Misc",defaultValue:false},"focused":{type:"boolean",group:"Misc",defaultValue:false},"tag":{type:"object",group:"Misc",defaultValue:null}},associations:{"parents":{type:"sap.suite.ui.commons.ProcessFlowNode",multiple:true,singularName:"parent"}},events:{"titlePress":{deprecated:true},"press":{}}}});sap.suite.ui.commons.ProcessFlowNode.M_EVENTS={'titlePress':'titlePress','press':'press'};jQuery.sap.require("sap.ui.core.IconPool");jQuery.sap.require("sap.m.Text");sap.suite.ui.commons.ProcessFlowNode.prototype._zoomLevel=sap.suite.ui.commons.ProcessFlowZoomLevel.Two;sap.suite.ui.commons.ProcessFlowNode.prototype._tag=null;sap.suite.ui.commons.ProcessFlowNode.prototype._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.Regular;sap.suite.ui.commons.ProcessFlowNode.prototype._oResBundle=null;sap.suite.ui.commons.ProcessFlowNode.prototype._foldedCorner=false;sap.suite.ui.commons.ProcessFlowNode.prototype._foldedCornerControl=null;sap.suite.ui.commons.ProcessFlowNode.prototype._parent=null;sap.suite.ui.commons.ProcessFlowNode.prototype._headerControl=null;sap.suite.ui.commons.ProcessFlowNode.prototype._stateTextControl=null;sap.suite.ui.commons.ProcessFlowNode.prototype._iconControl=null;sap.suite.ui.commons.ProcessFlowNode.prototype._text1Control=null;sap.suite.ui.commons.ProcessFlowNode.prototype._text2Control=null;sap.suite.ui.commons.ProcessFlowNode.prototype._navigationFocus=false;sap.suite.ui.commons.ProcessFlowNode.prototype._sMouseEvents=" mousedown mouseup mouseenter mouseleave ";sap.suite.ui.commons.ProcessFlowNode.prototype._sMouseTouchEvents=(sap.ui.Device.support.touch)?'saptouchstart saptouchcancel touchstart touchend':'';if(sap.ui.Device.browser.msie){sap.suite.ui.commons.ProcessFlowNode.prototype._grabCursorClass="sapSuiteUiGrabCursorIEPF";sap.suite.ui.commons.ProcessFlowNode.prototype._grabbingCursorClass="sapSuiteUiGrabbingCursorIEPF";}else{sap.suite.ui.commons.ProcessFlowNode.prototype._grabCursorClass="sapSuiteUiGrabCursorPF";sap.suite.ui.commons.ProcessFlowNode.prototype._grabbingCursorClass="sapSuiteUiGrabbingCursorPF";}sap.suite.ui.commons.ProcessFlowNode.prototype._nodeHoverClass="sapSuiteUiCommonsProcessFlowNodeHover";sap.suite.ui.commons.ProcessFlowNode.prototype._nodeActiveClass="sapSuiteUiCommonsProcessFlowNodeActive";sap.suite.ui.commons.ProcessFlowNode.prototype._nodeFCHoverClass="sapSuiteUiCommonsProcessFlowFoldedCornerNodeHover";sap.suite.ui.commons.ProcessFlowNode.prototype._nodeFCActiveClass="sapSuiteUiCommonsProcessFlowFoldedCornerNodeActive";sap.suite.ui.commons.ProcessFlowNode.prototype._nodeFCIconHoverClass="sapSuiteUiCommonsProcessFlowFoldedCornerNodeIconHover";
sap.suite.ui.commons.ProcessFlowNode.prototype.init=function(){sap.ui.core.IconPool.addIcon("context-menu","businessSuite","PFBusinessSuiteInAppSymbols","e02b",true);if(!this._oResBundle){this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");}};
sap.suite.ui.commons.ProcessFlowNode.prototype.exit=function(){if(this._foldedCornerControl){this._foldedCornerControl.destroy();this._foldedCornerControl=null;}if(this._headerControl){this._headerControl.destroy();this._headerControl=null;}if(this._stateTextControl){this._stateTextControl.destroy();this._stateTextControl=null;}if(this._iconControl){this._iconControl.destroy();this._iconControl=null;}if(this._text1Control){this._text1Control.destroy();this._text1Control=null;}if(this._text2Control){this._text2Control.destroy();this._text2Control=null;}this.$().unbind(this._sMouseEvents,this._handleEvents);if(sap.ui.Device.support.touch){this.$().unbind(this._sMouseTouchEvents,this._handleEvents);}};
sap.suite.ui.commons.ProcessFlowNode.prototype.onBeforeRendering=function(){this.$().unbind(this._sMouseEvents,this._handleEvents);if(sap.ui.Device.support.touch){this.$().unbind(this._sMouseTouchEvents,this._handleEvents);}};
sap.suite.ui.commons.ProcessFlowNode.prototype._setParentFlow=function(c){this._parent=c;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getFoldedCornerControl=function(){if(this._foldedCornerControl){this._foldedCornerControl.destroy();}this._foldedCornerControl=new sap.ui.core.Icon({id:this.getId()+"-corner-icon",src:sap.ui.core.IconPool.getIconURI("context-menu","businessSuite"),visible:true});this._foldedCornerControl.addStyleClass("sapUiIconPointer");switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel1");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel2");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel3");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel4");break;}this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1");return this._foldedCornerControl;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getHeaderControl=function(){if(this._headerControl){this._headerControl.destroy();}var n=0;var w="";var v=true;var t=this.getTitle();switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:n=3;break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:n=3;break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:n=2;t=this.getTitleAbbreviation();break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:t="";n=0;w="0px";v=false;break;}this._headerControl=new sap.m.Text({id:this.getId()+"-nodeid-anchor-title",text:t,visible:v,wrapping:true,width:w,maxLines:n});if(this.getIsTitleClickable()){this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleClickable");}switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel1");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel2");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel3");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel4");break;}this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3Title");return this._headerControl;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getIconControl=function(){if(this._iconControl){this._iconControl.destroy();}var s=null;var v=true;var a=this.getStateText();switch(this.getState()){case sap.suite.ui.commons.ProcessFlowNodeState.Positive:s="sap-icon://message-success";break;case sap.suite.ui.commons.ProcessFlowNodeState.Negative:case sap.suite.ui.commons.ProcessFlowNodeState.PlannedNegative:s="sap-icon://message-error";break;case sap.suite.ui.commons.ProcessFlowNodeState.Planned:s=null;break;case sap.suite.ui.commons.ProcessFlowNodeState.Neutral:s="sap-icon://process";break;}this._iconControl=new sap.ui.core.Icon({id:this.getId()+"-icon",src:s,visible:v});this._iconControl.addStyleClass("sapUiIconPointer");var r=sap.ui.getCore().getConfiguration().getRTL();if(r){this._iconControl.addStyleClass("sapUiIconSuppressMirrorInRTL");}switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:var i="sapSuiteUiCommonsProcessFlowNode3StateIconLeft";if(r){i="sapSuiteUiCommonsProcessFlowNode3StateIconRight";}this._iconControl.addStyleClass(i);break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconCenter");break;}switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel1");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel2");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel3");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel4");break;}this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIcon");return this._iconControl;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getStateTextControl=function(){if(this._stateTextControl){this._stateTextControl.destroy();}var n=2;var w="";var v=true;var s=this.getState();var t=(s===sap.suite.ui.commons.ProcessFlowNodeState.Planned)?"":this.getStateText();if(s===sap.suite.ui.commons.ProcessFlowNodeState.PlannedNegative&&t.length===0){t="Planned Negative";}switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:n=2;break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:t="";n=0;w="0px";v=false;break;}this._stateTextControl=new sap.m.Text({id:this.getId()+"-stateText",text:t,visible:v,wrapping:true,width:w,maxLines:n});switch(s){case sap.suite.ui.commons.ProcessFlowNodeState.Positive:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StatePositive");break;case sap.suite.ui.commons.ProcessFlowNodeState.Negative:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNodeStateNegative");break;case sap.suite.ui.commons.ProcessFlowNodeState.Planned:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StatePlanned");break;case sap.suite.ui.commons.ProcessFlowNodeState.Neutral:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateNeutral");break;case sap.suite.ui.commons.ProcessFlowNodeState.PlannedNegative:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StatePlanned");break;}switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel1");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel2");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel3");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel4");break;}this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateText");return this._stateTextControl;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getTextControlInternal=function(t,a,c){if(c){c.destroy();}var n=2;var w="";var v=true;var T=a;switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:n=2;break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:n=0;w="0px";v=false;break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:T="";n=0;w="0px";v=false;break;}if(this.getState){c=new sap.m.Text({id:this.getId()+t,text:T,visible:v,wrapping:true,width:w,maxLines:n});}return c;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getText1Control=function(){var t=this.getTexts();if(t&&t.length>0){t=t[0];}this._text1Control=this._getTextControlInternal("-text1-control",t,this._text1Control);switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextWithGapZoomLevel1");this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel1");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextWithGapZoomLevel2");this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel2");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel3");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel4");break;}this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3Text");return this._text1Control;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getText2Control=function(){var t=this.getTexts();if(t&&t.length>1){t=t[1];}else{t="";}this._text2Control=this._getTextControlInternal("-text2-control",t,this._text2Control);switch(this._getZoomLevel()){case sap.suite.ui.commons.ProcessFlowZoomLevel.One:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel1");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Two:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel2");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Three:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel3");break;case sap.suite.ui.commons.ProcessFlowZoomLevel.Four:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel4");break;}this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3Text");return this._text2Control;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getZoomLevel=function(){return this._zoomLevel;};
sap.suite.ui.commons.ProcessFlowNode.prototype._setZoomLevel=function(z){this._zoomLevel=z;};
sap.suite.ui.commons.ProcessFlowNode.prototype._setNavigationFocus=function(n){this._navigationFocus=n;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getNavigationFocus=function(){return this._navigationFocus;};
sap.suite.ui.commons.ProcessFlowNode.prototype._setFoldedCorner=function(f){this._foldedCorner=f;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getFoldedCorner=function(){return this._foldedCorner;};
sap.suite.ui.commons.ProcessFlowNode.prototype.setTag=function(t){this._tag=t;};
sap.suite.ui.commons.ProcessFlowNode.prototype.getTag=function(){return this._tag;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getDisplayState=function(){var i=this.getFocused();var I=this.getHighlighted();if(i&&I){this._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.HighlightedFocused;}else if(i){this._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.RegularFocused;}else if(I){this._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.Highlighted;}else{if(this._displayState==sap.suite.ui.commons.ProcessFlowDisplayState.HighlightedFocused||this._displayState==sap.suite.ui.commons.ProcessFlowDisplayState.RegularFocused||this._displayState==sap.suite.ui.commons.ProcessFlowDisplayState.Highlighted){this._setRegularState();}}return this._displayState;};
sap.suite.ui.commons.ProcessFlowNode.prototype._setDimmedState=function(){var i=this.getFocused();var I=this.getHighlighted();if(I){throw new Error("Cannot set dimmed state to highlighed node "+this.getNodeId());}this._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.Dimmed;if(i){this._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.DimmedFocused;}};
sap.suite.ui.commons.ProcessFlowNode.prototype._setRegularState=function(){this._displayState=sap.suite.ui.commons.ProcessFlowDisplayState.Regular;};
sap.suite.ui.commons.ProcessFlowNode.prototype._handleClick=function(e){if(this._getDisplayState()===sap.suite.ui.commons.ProcessFlowDisplayState.Dimmed||this._getDisplayState()===sap.suite.ui.commons.ProcessFlowDisplayState.DimmedFocused){jQuery.sap.log.info("Event ignored, node in dimmend state.");}else{if(this._parent){if(e.target.id.indexOf("title")>=0&&this.getIsTitleClickable()){this._parent.fireNodeTitlePress(this);}else{this._parent.fireNodePress(this);}this.getParent()._changeNavigationFocus(this.getParent()._lastNavigationFocusNode,this);}}if(e&&!e.isPropagationStopped()){e.stopPropagation();}if(e&&!e.isImmediatePropagationStopped()){e.stopImmediatePropagation();}};
sap.suite.ui.commons.ProcessFlowNode.prototype.onclick=function(e){if(e&&!e.isDefaultPrevented()){e.preventDefault();}this._handleClick(e);};
sap.suite.ui.commons.ProcessFlowNode.prototype.onAfterRendering=function(e){if(e&&!e.isDefaultPrevented()){e.preventDefault();}this._sMouseEvents=this._sMouseEvents.concat(' ',this._sMouseTouchEvents);this.$().bind(this._sMouseEvents,jQuery.proxy(this._handleEvents,this));if(e&&!e.isPropagationStopped()){e.stopPropagation();}if(e&&!e.isImmediatePropagationStopped()){e.stopImmediatePropagation();}};
sap.suite.ui.commons.ProcessFlowNode.prototype._handleEvents=function(e){var t=this.$().find('*');var T=this.$().attr('id');var i=this._getFoldedCorner();var s=this.getParent();if(e&&!e.isDefaultPrevented()){e.preventDefault();}switch(e.type){case'mousedown':this.$().removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);t.removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);if(i){jQuery('#'+T).removeClass(this._nodeFCHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);}break;case'mouseup':if(s.$().hasClass(this._grabbingCursorClass)){s.$().removeClass(this._grabbingCursorClass);}this.$().removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);t.removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);if(i){jQuery('#'+T).removeClass(this._nodeHoverClass).addClass(this._nodeFCHoverClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);}break;case'mouseenter':if(!s.$().hasClass(this._grabbingCursorClass)){this.$().addClass(this._nodeHoverClass);t.addClass(this._nodeHoverClass);if(i){jQuery('#'+T).removeClass(this._nodeHoverClass).addClass(this._nodeFCHoverClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);}}break;case'mouseleave':this.$().removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);t.removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);if(i){jQuery('#'+T).removeClass(this._nodeFCActiveClass+' '+this._nodeFCHoverClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);}if(!s.$().hasClass(this._grabbingCursorClass)){s.$().addClass(this._grabCursorClass);}break;case'touchstart':if(sap.ui.Device.support.touch){this.$().addClass(this._nodeActiveClass);t.addClass(this._nodeActiveClass);if(i){jQuery('#'+T).removeClass(this._nodeActiveClass).addClass(this._nodeFCActiveClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeActiveClass).addClass(this._nodeFCActiveClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeActiveClass).addClass(this._nodeFCActiveClass);}}break;case'saptouchstart':this.$().removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);t.removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);if(i){jQuery('#'+T).removeClass(this._nodeFCHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);}break;case'touchend':if(sap.ui.Device.support.touch){this.$().removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);t.removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);if(i){jQuery('#'+T).removeClass(this._nodeFCActiveClass+' '+this._nodeFCHoverClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);}}this._handleClick(e);break;case'saptouchcancel':this.$().removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);t.removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);if(i){jQuery('#'+T).removeClass(this._nodeFCActiveClass+' '+this._nodeHoverClass).addClass(this._nodeFCHoverClass);jQuery('div[id^='+T+'][id$=-corner-container]').removeClass(this._nodeFCActiveClass+' '+this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);jQuery('span[id^='+T+'][id$=-corner-icon]').removeClass(this._nodeFCActiveClass+' '+this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);}break;}};
sap.suite.ui.commons.ProcessFlowNode.prototype._hasChildren=function(){var c=this.getChildren();if(c&&c.length>0){return true;}return false;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getAriaText=function(){var c=this.getParents().length;var a=0;if(this._hasChildren()){a=this.getChildren().length;}var l="";var b=this._getLane();if(b){l=b.getText();if(!l){l=this._oResBundle.getText('PF_VALUE_UNDEFINED');}}var d="";var e=this.getTexts();if(e){for(var i in e){if(e[i]){var v=e[i].concat(", ");d=d.concat(v);}}d=d.slice(0,-1);}var t=this.getTitle();if(!t){t=this._oResBundle.getText('PF_VALUE_UNDEFINED');}var s=this.getState();if(!s){s=this._oResBundle.getText('PF_VALUE_UNDEFINED');}var f=this.getStateText();if(this.getState()===sap.suite.ui.commons.ProcessFlowNodeState.Planned){f="";}var g=this._oResBundle.getText('PF_ARIA_NODE',[t,s,f,l,d,c,a]);return g;};
sap.suite.ui.commons.ProcessFlowNode.prototype._getLane=function(){var p=this.getParent();var l;if(p){l=p._getLane(this.getLaneId());}return l;};
