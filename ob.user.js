// ==UserScript==
// @name                Omerta Beyond
// @id                  Omerta Beyond
// @version             2.0
// @date                12-02-2013
// @description         Omerta Beyond 2.0 (We're back to reclaim the throne ;))
// @homepageURL         http://www.omertabeyond.com/
// @namespace           v4.omertabeyond.com
// @updateURL           https://raw.github.com/OmertaBeyond/OBv2/master/beyond.meta.js
// @supportURL          https://github.com/OmertaBeyond/OBv2/issues
// @icon                https://raw.github.com/OmertaBeyond/OBv2/master/images/logo.small.png
// @screenshot          https://raw.github.com/OmertaBeyond/OBv2/master/images/logo.small.png
// @author              OBDev Team <info@omertabeyond.com>
// @author              vBm <vbm@omertabeyond.com>
// @author              Dopedog <dopedog@omertabeyond.com>
// @author              Rix <rix@omertabeyond.com>
// @author              MrWhite <mrwhite@omertabeyond.com>
// @license             GNU General Public License v3
// @contributionURL     https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=sbanks%40omertabeyond%2ecom&lc=GB&item_name=Omerta%20Beyond&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
// @contributionAmount  €3.00
// @encoding            UTF-8
// @priority            1
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @resource    favicon https://raw.github.com/OmertaBeyond/OBv2/master/images/favicon.png
// @resource    comLogo https://raw.github.com/OmertaBeyond/OBv2/master/images/logo-com.png
// @resource    dmLogo  https://raw.github.com/OmertaBeyond/OBv2/master/images/logo-dm.png
// @resource    nlLogo  https://raw.github.com/OmertaBeyond/OBv2/master/images/logo-nl.png
// @resource    logo    https://raw.github.com/OmertaBeyond/OBv2/master/images/logo.png
// @include             http://www.omerta3.com/*
// @include             http://omerta3.com/*
// @include             http://www.barafranca.com/*
// @include             http://barafranca.com/*
// @include             http://www.barafranca.us/*
// @include             http://barafranca.us/*
// ==/UserScript==

// Prevent Omerta's jQuery to conflict with our
this.$ = this.jQuery = jQuery.noConflict(true);

if (document.getElementById('game_container') !== null) {
	document.getElementById('game_container').addEventListener('DOMNodeInserted', function(event) {
		if (event.target.nodeType == 1) {
			event.target.setAttribute('style', 'border: 1px solid red');
		}
	}, true);
}

$('input[name="email"]').focus();

// Replace Omerta's favicon
$('<link rel="shortcut icon" type="image/x-icon"/>').appendTo('head').attr('href', GM_getResourceURL('favicon'));

$('#game_header_left').children('img').attr('src', GM_getResourceURL('comLogo'));
