odoo.define('spellbound_voice_control_menu_v10c', function (require) {
"use strict";

    var _t = openerp._t;
    var _lt = openerp._lt;
    var QWeb = openerp.qweb;
    var NBR_LIMIT_HISTORY = 20;
    var USERS_LIMIT = 20;
    var im_microphone = openerp.im_microphone = {};
    var mode = ""
    
    im_microphone.ImTopMicrophone = openerp.Widget.extend({
        template:'voice_control_menu.voice_control_microphone',
        events: {
            "click": "clicked",
        },
        clicked: function(ev) {
            ev.preventDefault();
            this.trigger("clicked");
            var self = this
            var header_menu = "/"
            var $header_menu = []
            _.each($(".oe_application_menu_placeholder li") , function(li){
	           	 if ($(li).css('display') != 'none'){
	           		 header_menu+=$(li).find(".oe_menu_text").text().trim(" ")+"|"
	           		 $header_menu.push({'name':$(li).find(".oe_menu_text").text().trim(), "$e":$(li)})
	           	 }
            })
            header_menu+="/g"
            var secondary_menu = "/"
            var $secondary_menu = []
            _.each($(".o_sub_menu_content .oe_secondary_menu"), function(div){
            	_.each($(div).find("ul li .oe_menu_text"), function(a){
            		secondary_menu+=$(a).text().trim(" ")+"|"
            		if($(div).css('display') && $(div).css('display') == 'none'){
            			$secondary_menu.push({'name':$(a).text().trim(" "), "$e":$(a), 'active':false})
            		}else{
            			$secondary_menu.push({'name':$(a).text().trim(" "), "$e":$(a), 'active':true})
            		}
            		
            	})
            })
            secondary_menu+="/g"
            if($('.oe_voice_start_stop a i').attr('status') == "start"){
            	$('.oe_voice_start_stop a i').css('color','red')
            	$('.oe_voice_start_stop a i').attr('status', 'stop')
            	SPEECH.stop()
            }else{
            	$('.oe_voice_start_stop a i').css('color','green')
            	$('.oe_voice_start_stop a i').attr('status', 'start')
            	
	            if ( SPEECH.isCapable() ) { // the browser supports speech recognition
	                	SPEECH.onStart(function() {
	                });
	                SPEECH.onStop(function() {
	                	if($('.oe_voice_start_stop a i').attr('status') == 'start'){
	                		SPEECH.start()
	                	}
	                });
	                SPEECH.min_confidence = .2; // the default minimum confidence you're willing to accept as a command
	                SPEECH.addVoiceCommands([
	                    {
	                        command: /create| create/g,
	                        callback: function() {
	                        	if($(".o-kanban-button-new").length){
	                        		$(".o-kanban-button-new")[0].click()
	                        	}else if($(".o_form_button_create").length) {
	                        		$(".o_form_button_create").click()
	                        	}else if($(".o_list_button_add").length) {
	                        		$(".o_list_button_add").click()
	                        	}
	                        },
	                    },
	                    {
	                        command: /edit| edit/g,
	                        callback: function() {
	                        	if($(".o_form_button_edit").length) {
	                        		$(".o_form_button_edit").click()
	                        	}
	                        }
	                    },{
	                        command: /discard| discard/g,
	                        callback: function() {
	                        	if($(".o_form_button_cancel").length) {
	                        		$(".o_form_button_cancel").click()
	                        	}
	                        }
	                    },{
	                        command: /save| save/g,
	                        callback: function() {
	                        	if($(".o_form_button_save").length) {
	                        		$(".o_form_button_save").click()
	                        	}
	                        }
	                    },{
	                        command: /next| next/g,
	                        callback: function() {
	                        	if($(".o_pager_next").length) {
	                         		$(".o_pager_next").click()
	                        		
	                        	}
	                        }
	                    },{
	                        command: /previous| previous/g,
	                        callback: function() {
	                        	if($(".o_pager_previous").length) {
	                        		$(".o_pager_previous").click()
	                        		
	                        	}
	                        }
	                    },{
	                        command: /bar| baar| line| pie/g,
	                        callback: function() {
	                        	if($(".btn-group-sm").length) {
	                        		SPEECH.onResult(function(result) {
	                        			_.each($(".btn-group-sm button"), function(button){
	                        				if($(button).data('mode') == result.transcript.trim(" ")){
	                        					$(button).click()
	                        				}
	                        			})
	                                });
	                        	}
	                        }
	                    },{
	                        command: /kanban| kanban|list| list|form| form|graph| graph|calendar| calendar/g,
	                        callback: function() {
	                        	if($(".o_cp_switch_buttons").length) {
	                        		SPEECH.onResult(function(result) {
	                        			
	                        			_.each($(".o_cp_switch_buttons button"), function(button){
	                        				if($(button).data('view-type').trim(" ") == result.transcript.trim(" ")){
	                        					$(button).click()
	                        				}
	                        			})
	                                });
	                        	}
	                        }
	                    },{
	                        command: header_menu, 
	                        callback: function() {
	                        	SPEECH.onResult(function(result) {
	                        		_.each($header_menu, function(data){
	                        			 if (data['name'].toUpperCase() == result.transcript.trim(" ").toUpperCase()){
		   	                           	     $(data['$e']).find("a").click()
		   	                           		secondary_menu = "/"
								            $secondary_menu = []
								            _.each($(".o_sub_menu_content .oe_secondary_menu"), function(div){
								            	_.each($(div).find("ul li .oe_menu_text"), function(a){
								            		secondary_menu+=$(a).text().trim(" ")+"|"
								            		if($(div).css('display') && $(div).css('display') == 'none'){
								            			$secondary_menu.push({'name':$(a).text().trim(" "), "$e":$(a), 'active':false})
								            		}else{
								            			$secondary_menu.push({'name':$(a).text().trim(" "), "$e":$(a), 'active':true})
								            		}
								            		
								            	})
								            })
								            secondary_menu+="/g"
		   	                           	 }
	                        		})
                                });
	                        	
	                        }
	                    },{
	                        command: secondary_menu, 
	                        callback: function() {
	                        	SPEECH.onResult(function(result) {
	                        		_.each($secondary_menu, function(data){
	                        			 if (data['active'] && data['name'].toUpperCase() == result.transcript.trim(" ").toUpperCase()){
		   	                           		 $(data['$e']).click()
		   	                           	 }
	                        		})
                                });
	                        	
	                        }
	                    }
	                ]);
	                SPEECH.onResult(function(result) {
	                	result.transcript = result.transcript.trim()
                         
	                });
	
	                SPEECH.start({
	                });
	            }
            }
        },
    });
    openerp.web.UserMenu.include({
        do_update: function(){
            var self = this;
            var button = new openerp.im_microphone.ImTopMicrophone(this);
            button.appendTo(window.$('.oe_systray'));
            return this._super.apply(this, arguments);
        },
    });
    return im_microphone;
});






































