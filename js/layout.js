/** 
 * PrimeFaces Ultima Layout
 */



 
PrimeFaces.widget.Ultima = PrimeFaces.widget.BaseWidget.extend({
    
    init: function(cfg) {
        this._super(cfg);
        this.wrapper = $(document.body).find('.layout-wrapper');
        this.topbar = this.wrapper.find('.topbar');
        this.menu = this.jq;
        this.menuWrapper = this.menu.closest('.layout-menu');
        this.menulinks = this.menu.find('a');
        this.expandedMenuitems = this.expandedMenuitems || [];
        this.rightPanel = this.wrapper.children('.layout-rightpanel');
        this.layoutMask = this.wrapper.children('.layout-mask');
        this.profileButton = $('#profile-options');
        this.profileMenu = $('#profile-menu');
        this.topbarItems = this.topbar.find('.topbar-items');
        this.topbarLinks = this.topbarItems.find('> li > a');
        this.menuButton = $('#menu-button');
        this.topbarMenuButton = $('#topbar-menu-button');
        this.rightPanelButton = $('.rightpanel-btn');
        this.menuActive = false;
        this.topbarLinkClick = false;
        this.topbarMenuClick = false;
        this.menuClick = false;
        this.menuButtonClick = false;
        this.isMobileDev = this.isMobileDevice();
        this.isRTL = this.wrapper.hasClass('layout-rtl');
        
        if(this.wrapper.hasClass('layout-menu-slim')) {
            this.profileButton = $('.profile');
        }

        this._bindEvents();
        
        if(this.cfg.stateful && !this.wrapper.hasClass('menu-layout-horizontal') && !this.wrapper.hasClass('layout-menu-slim')) {
            this.restoreMenuState();
        }
        
    },
    
    _bindEvents: function() {
        var $this = this;
        
        this.menuWrapper.on('click', function(e) {
            $this.menuClick = true;
        });
        
        this.menuButton.off('click.menuButton').on('click.menuButton', function(e) {
            $this.menuButton.toggleClass('menu-button-rotate');
            $this.topbarItems.removeClass('topbar-items-visible');
            $this.menuButtonClick = true;
            
            //overlay
            if($this.wrapper.hasClass('menu-layout-overlay')) {
                $this.wrapper.toggleClass('layout-menu-overlay-active');
                
                if($this.wrapper.hasClass('layout-menu-overlay-active')) {
                    $this.enableModal();
                    $this.enableSwipe();
                }
                else {
                    $this.disableModal();
                    $this.disableSwipe();
                }
            }
            //static
            else {
                if($this.isDesktop()) {
                    $this.wrapper.toggleClass('layout-menu-static-inactive')
                }
                else {
                    if($this.wrapper.hasClass('layout-menu-static-active')) {
                        $this.wrapper.removeClass('layout-menu-static-active');
                        $this.disableModal();
                        $this.disableSwipe();
                    }
                    else {
                        $this.wrapper.addClass('layout-menu-static-active');
                        $this.wrapper.removeClass('layout-menu-static-inactive');
                        $this.enableModal();
                        $this.enableSwipe();
                    }
                }
                
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 200);  
            }
            
            e.preventDefault();
        });
        
        this.topbarMenuButton.off('click.topbarButton').on('click.topbarButton', function(e) {
            $this.topbarMenuClick = true;
            $this.topbarItems.find('ul').removeClass('fadeInDown fadeOutUp');
            $this.closeOverlayMenu();

            if($this.topbarItems.hasClass('topbar-items-visible')) {
                $this.topbarItems.addClass('fadeOutUp');
                
                setTimeout(function() {
                    $this.topbarItems.removeClass('fadeOutUp topbar-items-visible');
                },500);
            }
            else {
                $this.topbarItems.addClass('topbar-items-visible fadeInDown');
            }
            
            $this.rightPanel.removeClass('layout-rightpanel-active');
            $this.rightPanelButton.removeClass('rightpanel-btn-active');
            
            e.preventDefault();
        });
        
        this.rightPanelButton.on('click', function(e) {
            $this.rightPanelButtonClick = true;
            $this.rightPanel.toggleClass('layout-rightpanel-active');
            $this.closeOverlayMenu();
            
            
            e.preventDefault();
        });
        
        this.rightPanel.on('click', function(e) {
            $this.rightPanelClick = true;
        });
        
        this.menulinks.off('click').on('click', function(e) {
            var link = $(this),
            item = link.parent(),
            submenu = item.children('ul'),
            horizontal = $this.isHorizontal() && $this.isDesktop();
            
            if($this.isSlim() && item.parent().hasClass('ultima-menu')) {
                if(item.hasClass('active-menuitem')) {
                    if(submenu.length) {
                        $this.removeMenuitem(item.attr('id'));
                        item.removeClass('active-menuitem');
                        submenu.hide();
                    }
                    
                    if(item.parent().is($this.jq)) {
                        $this.menuActive = false;
                    }
                }
                else {
                    item.addClass('active-menuitem');
                    $this.addMenuitem(item.attr('id'));
                    $this.deactivateItems(item.siblings(), false);
                    submenu.show();

                    $this.updateSubPosOnSlimMenu(submenu, item);
                    
                    if(item.parent().is($this.jq)) {
                        $this.menuActive = true;
                    }
                }
            }
            else {
                if(item.hasClass('active-menuitem')) {
                    if(submenu.length) {
                        $this.removeMenuitem(item.attr('id'));
                        item.removeClass('active-menuitem');
                        
                        if(horizontal) {
                            if(item.parent().is($this.jq)) {
                                $this.menuActive = false;
                            }
                            
                            submenu.hide();
                        }
                        else {
                            submenu.slideUp();
                        }
                    }
                }
                else {
                    $this.addMenuitem(item.attr('id'));
                    
                    if(horizontal) {
                        $this.deactivateItems(item.siblings());
                        item.addClass('active-menuitem');
                        $this.menuActive = true;
                        submenu.show();
                    }
                    else {
                        $this.deactivateItems(item.siblings(), true);
                        $this.activate(item);
                    }
                }
                
                if($this.isSlim()) {
                    var activeParentItem = submenu.parents('.active-menuitem:last');
                    setTimeout(function() {
                        $this.updateSubPosOnSlimMenu(activeParentItem.children('ul'), activeParentItem);
                    }, 350);
                }
            }
            
            
                                    
            if(submenu.length) {
                e.preventDefault();
            }
        });
        
        this.menu.find('> li').on('mouseenter', function(e) {    
            if(($this.isHorizontal() && $this.isDesktop()) || $this.isSlim()) {
                var item = $(this);
                
                if(!item.hasClass('active-menuitem')) {
                    $this.menu.find('.active-menuitem').removeClass('active-menuitem');
                    $this.menu.find('ul:visible').hide();
                    $this.menu.find('.ink').remove();
                    
                    if($this.menuActive) {
                        item.addClass('active-menuitem');
                        item.children('ul').show();
                    }
                }
            }
        });
        
        this.profileButton.off('click.profileButton').on('click.profileButton', function(e) {
            var profile = $this.profileMenu.prev('.profile'),
            expanded = profile.hasClass('profile-expanded');
            
            if($this.isSlim()) {
                $this.deactivateItems($this.menu.children('.active-menuitem'), false);
            }
            
            $this.profileMenu.slideToggle();
            
            $this.profileMenu.prev('.profile').toggleClass('profile-expanded');
            
            if($this.cfg.stateful) {
                $this.setInlineProfileState(!expanded);
            }
            
            
            e.preventDefault();
        });
        
    
        
        $this.topbarItems.children('.search-item').on('click', function(e) {
            $this.topbarLinkClick = true;
        });
        

    },

   
    
 
    closeOverlayMenu: function() {
        var $this = this;
        
        if($this.wrapper.hasClass('layout-menu-overlay-active')||$this.wrapper.hasClass('layout-menu-static-active')) {
            $this.menuButton.removeClass('menu-button-rotate');
            $this.wrapper.removeClass('layout-menu-overlay-active layout-menu-static-active');
            $this.disableModal();
        }
    },
    
            
  
    restoreMenuState: function() {
        var menucookie = $.cookie('ultima_expandeditems');
        if (menucookie) {
            this.clearActiveItems();
            
            this.expandedMenuitems = menucookie.split(',');
            for (var i = 0; i < this.expandedMenuitems.length; i++) {
                var id = this.expandedMenuitems[i];
                if (id) {
                    var menuitem = $("#" + this.expandedMenuitems[i].replace(/:/g, "\\:"));
                    menuitem.addClass('active-menuitem');
                    
                    var submenu = menuitem.children('ul');
                    if(submenu.length) {
                        submenu.show();
                    }
                }
            }
        }
        
        var inlineProfileCookie = $.cookie('ultima_inlineprofile_expanded');
        if (inlineProfileCookie) {
            this.profileMenu.show().prev('.profile').addClass('profile-expanded');
        }
    },
    
   
    
    isMobileDevice: function() {
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(window.navigator.userAgent.toLowerCase());
    },
    
   
});

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));




