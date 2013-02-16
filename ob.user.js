// ==UserScript==
// @name                Omerta Beyond
// @id                  Omerta Beyond
// @version             2.0
// @date                15-02-2013
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
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource    favicon https://raw.github.com/OmertaBeyond/OBv2/master/images/favicon.png
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

// some global defines

const OB_WEBSITE = "http://www.omertabeyond.com";
const OB_API_WEBSITE = "http://gm.omertabeyond.com";
const OB_NEWS_WEBSITE = "http://news.omertabeyond.com";

function on_page(str) {
	if (window.location.hash.indexOf(str) != -1) {
		return true;
	} else {
		return false;
	}
}

if (document.getElementById('game_container') !== null) {
	document.getElementById('game_container').addEventListener('DOMNodeInserted', function(event) {
		if (event.target.nodeType != 1) {
			return false;
		}
		if ($(event.target).attr('data-beyond-fired') !== undefined) {
			return false;
		}

		$(event.target).attr('data-beyond-fired', 'true');

		var wlh = window.location.hash;
		var nn  = event.target.tagName.toLowerCase();

		if (on_page('/family.php') && nn == 'center') {

			// add HR, Deaths and Worth
			var famid = wlh.split('=')[1];
			var famIdFromImg = $('img[src*="family_image.php"]').attr('src').match(/\d+/g)[0];
			var famname = $('td.profilerow').text().split(' ')[0].trim().toLowerCase();
			var url = (famid === famIdFromImg) ? 'id='+famid : 'ing='+famname;

			$.getJSON(OB_API_WEBSITE + '/?p=stats&w=fampage&v=com&' + url, function(data) {

				// add HR
				$('table.thinline').first().find('tbody').append(
					$('<tr>').append(
						$('<td>').addClass('subtableheader').css({'padding-left': '4px', 'text-align': 'left'}).text('Ranks:'),
						$('<td>').addClass('profilerow').append(
							$('<table>').attr('width', '100%').append(
								$('<tr>').append($('<td>').text('Godfather/First Lady:'), $('<td>').addClass('bold').text(data['hr']['gf'])),
								$('<tr>').append($('<td>').text('Capodecina:'), $('<td>').addClass('bold').text(data['hr']['cd'])),
								$('<tr>').append($('<td>').text('Bruglione:'), $('<td>').addClass('bold').text(data['hr']['brug'])),
								$('<tr>').append($('<td>').text('Chief:'), $('<td>').addClass('bold').text(data['hr']['chief'])),
								$('<tr>').append($('<td>').text('Local Chief:'), $('<td>').addClass('bold').text(data['hr']['lc'])),
								$('<tr>').append($('<td>').text('Assassin:'), $('<td>').addClass('bold').text(data['hr']['assa'])),
								$('<tr>').append($('<td>').text('Swindler:'), $('<td>').addClass('bold').text(data['hr']['swin'])),
								$('<tr>').append($('<td>').attr('colspan', '2').append($('<hr />'))),
								$('<tr>').append($('<td>').text('Total points:'), $('<td>').addClass('bold').text(data['hr']['pts']))
							)
						)
					)
				);

				// add Famlog
				$('table.thinline:eq(1)').closest('td').append(
					$('<br />'),
					$('<table>').addClass('thinline').css('width', '100%').attr('cellspacing', '0').attr('cellpadding', '2').attr('rules', 'none').append(
						$('<tr>').append(
							$('<td>').addClass('tableheader').attr('colspan', '100%').text('Last family changes').append(
								$('<div>').css({'float': 'right', 'margin-right': '5px', 'margin-top': '3px'}).append(
									$('<a>').attr('href', 'http://news.omertabeyond.com/famlog/' + famid).attr('target', '_blank').append(
										$('<img>').addClass('brcImg').attr('title', 'View full changelog')
									)
								)
							)
						),
						$('<tr>').append(
							$('<td>').attr('colspan', '100%').attr('bgcolor', 'black').attr('height', '1')
						),
						$('<tr>').append(
							$('<td>').addClass('bold').css('width', '28%').attr('align', 'left').text('Date'),
							$('<td>').addClass('bold').attr('align', 'left').text('Change')
						)
					)
				);

				var changes_body = $('table.thinline:eq(2)').find('tbody');
				if (data['changes']) {
					$.each(data['changes'], function(k, v) {
						changes_body.append(
							$('<tr>').append(
								$('<td>').css('width', '28%').attr('align', 'left').attr('valign', 'top').text(v['date']),
								$('<td>').attr('align', 'left').text(v['text'])
							)
						);
					});
				} else {
					changes_body.append(
						$('<tr>').append(
							$('<td>').addClass('red').css('text-align', 'center').attr('colspan', '2').text('There are no changes yet!')
						)
					);
				}

			});

		}

	}, true);
}

$('input[name="email"]').focus();

// Replace Omerta's favicon
$('<link rel="shortcut icon" type="image/x-icon"/>').appendTo('head').attr('href', GM_getResourceURL('favicon'));

// Replace Omerta's logo
$('#game_header_left').children('img').attr('src', GM_getResourceURL('logo'));
