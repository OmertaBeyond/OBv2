// ==UserScript==
// @name                Omerta Beyond
// @id                  Omerta Beyond
// @version             2.0
// @date                10-07-2013
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
// @require             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @resource	css		https://raw.github.com/OmertaBeyond/OBv2/master/scripts/beyond.css
// @resource    favicon https://raw.github.com/OmertaBeyond/OBv2/master/images/favicon.png
// @resource    logo    https://raw.github.com/OmertaBeyond/OBv2/master/images/logo.png
// @resource    prev    https://raw.github.com/OmertaBeyond/OBv2/master/images/prev.png
// @resource    next    https://raw.github.com/OmertaBeyond/OBv2/master/images/next.png
// @resource    reply   https://raw.github.com/OmertaBeyond/OBv2/master/images/reply.png
// @resource    delete  https://raw.github.com/OmertaBeyond/OBv2/master/images/delete.png
// @resource    log     https://raw.github.com/OmertaBeyond/OBv2/master/images/changelog.png
// @include             http://*.omerta3.com/*
// @include             http://omerta3.com/*
// @include             http://*.barafranca.com/*
// @include             http://barafranca.com/*
// @include             http://*.barafranca.nl/*
// @include             http://barafranca.nl/*
// @include             http://*.barafranca.us/*
// @include             http://barafranca.us/*
// ==/UserScript==

// Prevent Omerta's jQuery to conflict with our
this.$ = this.jQuery = jQuery.noConflict(true);

/*
* Define constants for our website
*/

const OB_WEBSITE = 'http://www.omertabeyond.com';
const OB_API_WEBSITE = 'http://gm.omertabeyond.com';
const OB_NEWS_WEBSITE = 'http://news.omertabeyond.com';
const OB_STATS_WEBSITE = 'http://stats.omertabeyond.com';
const OB_RIX_WEBSITE = 'http://rix.omertabeyond.com';
const cur_v = '4.1';

function whatV(hostname) {
	switch (hostname || window.location.hostname) {
		case 'www.omerta3.com':
		case 'omerta3.com':
		case 'www.barafranca.com':
		case 'barafranca.com':
		case 'www.barafranca.us':
		case 'barafranca.us':
			return 'com';
		case 'deathmatch.barafranca.com':
		case 'dm.barafranca.com':
			return 'dm';
		case 'www.barafranca.nl':
		case 'barafranca.nl':
			return 'nl';
		case 'www.barafranca.gen.tr':
		case 'barafranca.gen.tr':
			return 'tr';
		default:
			return undefined;
	}
}

var v = whatV();
var ranks = ['Empty-suit', 'Delivery Boy', 'Delivery Girl', 'Picciotto', 'Shoplifter', 'Pickpocket', 'Thief', 'Associate', 'Mobster', 'Soldier', 'Swindler', 'Assassin', 'Local Chief', 'Chief', 'Bruglione', 'Capodecina', 'Godfather', 'First Lady'];
var cities = ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone'];
var boozenames = ['NO BOOZE', 'Wine', 'Beer', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'];
var narcnames = ['NO NARCS', 'Morphine', 'Marijuana', 'Glue', 'Heroin', 'Opium', 'Cocaine', 'Tabacco'];

/*
* Helper functions
*/

function on_page(str) {
	if (window.location.hash.indexOf(str) != -1) {
		return true;
	} else {
		return false;
	}
}
function getV(name, standard) {
    return localStorage[name+'_'+v] || standard;
}
function setV(name, value) {
    return localStorage[name+'_'+v] = value;
}
function time() {
	return Math.floor(parseInt(new Date().getTime(), 10) / 1000);
}
function GetParam(name) {
    var results = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href);
    return results[1] || 0;
}
function isVisible(node) {
	var win = $(window);

	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();

	var bounds = node.offset();
	bounds.right = bounds.left + node.outerWidth();
	bounds.bottom = bounds.top + node.outerHeight();

	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
}
function voteNow(save) {
	$('a[name="forticket"]').each(function() {
		window.open(this);
	});
	if (save) {//store last voting time
		setV('lastvote', time());
	}
}
function delMsg(what, name) {
	$('tr[class*="color"]').each(function() {
		var tr = $(this);
		var title = tr.find('td:eq(1)').text().replace(/\s/g, '').replace(/(\[\d+\])/g, '');
		var thismsgid = tr.find('td:eq(1)').find('a').attr('href').split('iMsgId=')[1];
		name = name.replace(/\s/g, '').replace(/(\[\d+\])/g, '');
		if(what == 'id'){
			if(name == thismsgid) {
				$.get('http://'+document.location.hostname+'/BeO/webroot/index.php?module=Mail&action=delMsg&iId='+thismsgid+'&iParty=2', function(data) {
					$('font[color="red"]').text('Message deleted.');
				});
				tr.hide();
				tr.next().hide();
			}
		} else if (what == 'name') {
			if(name == title) {
				$.get('http://'+document.location.hostname+'/BeO/webroot/index.php?module=Mail&action=delMsg&iId='+thismsgid+'&iParty=2', function(data) {
					$('font[color="red"]').text('Message deleted.');
				});
				tr.hide();
				tr.next().hide();
			}
		}
	});
}
function commafy(num) {
	var str = (num + '').split('.'),
		dec = str[1] || '',
		num = str[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
	return (dec) ? num + '.' + dec : num;
}
function getPow(name, i, def) {
	var info = getV(name, '' + def);
	if (name == 'bninfo') {
		var w = 2; //set width of buckets
	} else if (name == 'prefs') {
		var w = 1;
	}
	return (1 * info.substr((i * w), w)); //return int version of bucket
}
function setPow(name, i, value) {
	var info = getV(name, '0');
	if (name == 'bninfo') {
		var w = 2; //set width of buckets
	} else if (name == 'prefs') {
		var w = 1;
	}
	i = i * w; //set string index
	value += ''; //toString
	while (value.length < w) {
		value = '0' + value; //pad with zeros
	}
	if (i > 0 && (i + w) < info.length) {
		info = info.substring(0, i) + value + info.substring(i + w); //value goes in middle
	} else if (i === 0) {
		info = value + info.substring(w); //value goes at beginning
	} else if ((i + w) >= info.length) {
		info = info.substring(0, i) + value; //value goes at end
	} else {
		return;
	}
	setV(name, info); //store string
}
function bnUpdate(current){
	var xpath = current ? '#game_container' : '#str2dom';//use current page OR xhr str2dom

	var nick = $(xpath+' > table > tbody > tr > td:eq(0) > table > tbody > tr:eq(2) > td:eq(1) > a').text();
	var rank = $(xpath+' > table > tbody > tr > td:eq(0) > table > tbody > tr:eq(7) > td:eq(1)').text();
	var type = $(xpath+' > table > tbody > tr > td:eq(0) > table > tbody > tr:eq(9) > td:eq(1) > a').text();
	var city = $(xpath+' > table > tbody > tr > td:eq(0) > table > tbody > tr:eq(10) > td:eq(1) > a').text();
	var health = 100 - parseInt($(xpath+' > table > tbody > tr > td:eq(2) > table > tbody > tr:eq(3) > td:eq(1) > a > table > tbody > tr > td').attr('width'), 10);
	var ride = $(xpath+' > table > tbody > tr > td:eq(2) > table:eq(1) > tbody > tr:eq(2) > td:eq(1)').text();

	setV('bloodType', type);
	setV('nick', nick);

	//define max b/n judging by rank
	var maxBooze = [1, 2, 2, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 70, 70];
	var maxNarcs = [0, 0, 0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 20, 20, 20];
	for(booze=0,narc=0, i=0;i<=17;i++){
		if(ranks[i]==rank){
			booze = maxBooze[i]; narc = maxNarcs[i];
			break;
		}
	}
	setPow('bninfo', 0, narc);
	setPow('bninfo', 1, booze);

	//parse city to ID
	for(var cityCode=0, i=0;i<8;i++){
		if(city == cities[i]){
			cityCode = i+4;
			break;
		}
	}
	setPow('bninfo', 2, cityCode);//save

	//parse plane to ID
	var rides = ['none', 'geen', 'Fokker DR-1' ,'Havilland DH 82A' ,'Fleet 7', 'Douglas DC-3'];
	for(plane=0, i=0;i<=5;i++){
		if(rides[i] == ride){
			plane = [0, 0, 1, 2, 3, 4][i];
			break;
		}
	}
	setPow('bninfo', 3, plane);//save
}
function CheckBmsg() {
	setTimeout(function() {
		var lastbmsg = getV('lastbmsg', 0);
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://gm.omertabeyond.com/index.php?p=bmsg&v='+v+'&last='+lastbmsg,
			onload: function(xhr) {
				var response = JSON.parse(xhr.responseText);
				var deaths = response["deaths"].length;
				var news = response["news"].length;
				if (news==1) {
					if(getV('bmsgNews', 0)>0) {
						var text = 'A new article is posted http://news.omertabeyond.com\n\n';
						var title = response['news'][0]['title'];
						var type = response['news'][0]['type'];
						text += response['news'][0]['preview'];
	
						var notification = new Notification(title, {
							dir: "auto",
							lang: "",
							body: text,
							tag: "news",
							icon: "https://si0.twimg.com/profile_images/652064165/red-star.png", 
						});
						notification.onclose = function() { setTimeout(CheckBmsg(), 60000); }
						notification.onclick = function() { window.open('http://news.omertabeyond.com/'+response['news'][0]['id']) }
						setV('lastbmsg', response["news"][0]["ts"]);
					}
				} else {
					if(getV('bmsgDeaths', 0)>0) {
						if(deaths>=1) {
							var text = response["deaths"].length+' people died:\n\n';
							var am = (response["deaths"].length<10?response["deaths"].length:10);
							for (var i=0;i<am;i++) {
								var d =  new Date(response['deaths'][i]['ts']*1000);
								var time = (d.getHours()<10?'0':'') + d.getHours()+':'+(d.getMinutes()<10?'0':'') + d.getMinutes()+':'+(d.getSeconds()<10?'0':'') + d.getSeconds();
								var extra = (response['deaths'][i]['akill'] == 1)?'(A)':(response['deaths'][i]['bf'] == 1)?'(BF)':'';
								var fam = (response['deaths'][i]['fam'] == '')?'(none)':'('+response['deaths'][i]['fam']+')';
								text += extra+' '+time+' '+response['deaths'][i]['name']+' '+response['deaths'][i]['rank_text']+' '+fam+'\n';
							}
			
							var notification = new Notification('Deaths!', {
								dir: "auto",
								lang: "",
								body: text,
								tag: "deaths",
								icon: "http://icongal.com/gallery/image/263615/rest_peace_rip.png", 
							});
							notification.onclose = function() { setTimeout(CheckBmsg() ,60000); }
							setV('lastbmsg', response["deaths"][0]["ts"]);
						}
					}
					setTimeout(function() {
						CheckBmsg();
					}, 60000);
				}
			}
		});
	},0);
}
/*
* Main game listener
*/

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
		var nid  = event.target.getAttribute('id');
		
		// unbind events
		if (!on_page('garage.php')) {
			$(window).unbind('scroll');
		}
		if (!on_page('action=showMsg')) {
			$(window).unbind('keydown');
		}

		if (on_page('family.php') && nn == 'center') {

			// add HR, Deaths and Worth
			var famid = wlh.split('=')[1];
			var famIdFromImg = $('img[src*="family_image.php"]').attr('src').match(/\d+/g)[0];
			var famname = $('td.profilerow').text().split(' ')[0].trim().toLowerCase();
			var url = (famid === famIdFromImg) ? 'id='+famid : 'ing='+famname;
			var ownfam = getV('family', '');

			// Count rows
			tr = $('table.thinline:eq(0) > tbody > tr').length;

			// add HQ space to members
			var hq = $('table.thinline:eq(0) > tbody > tr:eq('+(tr-3)+') > td:last').text()
			var members = $('table.thinline:eq(0) > tbody > tr:eq('+(tr-5)+') > td:last').text()
			$('table.thinline:eq(0) > tbody > tr:eq('+(tr-5)+') > td:last').text(members+'/'+hq);

			// add color to HQ space
			var hqperc = ((members/hq)*100);
			$('table.thinline:eq(0) > tbody > tr:eq('+(tr-5)+') > td:last').css({'background-image': '-moz-linear-gradient(left, #CCCCCC '+hqperc+'%, #F0F0F0 '+hqperc+'%)'})

			// add color to donating %
			var doperc = $('table.thinline:eq(0) > tbody > tr:eq('+(tr-4)+') > td:last').text().split(' (')[0];
			$('table.thinline:eq(0) > tbody > tr:eq('+(tr-4)+') > td:last').css({'background-image': '-moz-linear-gradient(left, #CCCCCC '+doperc+', #F0F0F0 '+doperc+')'})

			// add color to rankprogress
			if(famname == ownfam.toLowerCase()) {
				var rankperc = $('table.thinline:eq(0) > tbody > tr:last > td:last').text().split(' (')[1].replace(')', '');
				$('table.thinline:eq(0) > tbody > tr:last > td:last').css({'background-image': '-moz-linear-gradient(left, #CCCCCC '+rankperc+', #F0F0F0 '+rankperc+')'})
			}

			// get tops
			var tops = [];
			var anchors = $('table.thinline:eq(0) > tbody > tr > td:has(a)').each(function() {
				tops.push($(this).text());
			});

			var nTop = tops.length; //# tops
			var SorC = (nTop == 3) ? 2 : /Consi/.test($('table.thinline:eq(0) > tbody > tr:eq(7) > td:first').text());//Sotto or Consi
			var don = $.trim(tops[0]);
			var sotto = (nTop > 1 && (nTop == 3 || SorC == 0)) ? tops.pop() : null;
			var cons = (nTop > 1 && (nTop == 3 || SorC == 1)) ? tops.pop() : null;

			//get capos
			var capos = [];
			var anchors = $('table.thinline:last > tbody > tr > td > a.tableheader').each(function() {
				capos.push($(this).text());
			});

			//get objectowners
			var objects = [];
			var anchors = $('table.thinline:eq(2) > tbody > tr > td:has(a)').each(function() {
				objects.push($(this).text());
			});

			//get spotowners
			var spots = [];
			var anchors = $('table.thinline:eq(3) > tbody > tr > td:has(a)').each(function() {
				spots.push($(this).text());
			});

			$('a[href*="user.php"]').each(function() {
				var n = $(this).text();//nick
				var color = 'blue';//default online color
				var vip = tPos = '';
				if (n == don) { $(this).html('<u>'+n+'</u><small><sup>[D]</sup></small>'); color = 'red'; vip='[D]'; }
				if (n == sotto) { $(this).html('<u>'+n+'</u><small><sup>[S]</sup></small>'); color = 'red'; vip='[S]'; }
				if (n == cons) { $(this).html('<u>'+n+'</u><small><sup>[C]</sup></small>'); color = 'red'; vip='[C]'; }
				if ($.inArray(n, capos) != -1) { $(this).html('<u>'+n+'</u><small><sup>'+vip+'(c)</sup></small>'); color = (tPos?'red':'orange'); vip = vip+'(c)'; }
				if ($.inArray(n, objects) != -1) {
					$(this).html((vip==''?'<u>':'')+n+(vip==''?'</u>':'')+'<small><sup>'+vip+'(o)</sup></small>');
					vip = vip+'(o)';
					if (vip == '') {
						color = 'green';
					}
				}
				if ($.inArray(n, spots) != -1) {
					$(this).html((vip==''?'<u>':'')+n+(vip==''?'</u>':'')+'<small><sup>'+vip+'(s)</sup></small>');
					vip = vip+'(s)';
					if (vip == '') {
						color = 'purple';
					}
				}
			});

			$.getJSON(OB_API_WEBSITE + '/?p=stats&w=fampage&v='+v+'&' + url, function(data) {
				// Family position and worth
				$('td.subtableheader').first().closest('tr').after(
					$('<tr>').append(
						$('<td>').addClass('subtableheader').text('Position:'),
						$('<td>').addClass('profilerow').text('#'+data['pos']+' - Worth: '+data['worth']+'')
					)
				);

				// add HR
				$('table.thinline').first().find('tbody').append(
					$('<tr>').append(
						$('<td>').addClass('subtableheader').text('Ranks:'),
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

				setTimeout(function () {
					// Family deaths
					$('table.thinline:eq(1)').closest('td').append(
						$('<br />'),
						$('<table>').addClass('thinline').css('width', '100%').attr('cellspacing', '0').attr('cellpadding', '2').attr('rules', 'none').append(
							$('<tr>').append(
								$('<td>').addClass('tableheader').attr('colspan', '100%').text('Last family deaths')
							),
							$('<tr>').append(
								$('<td>').attr('colspan', '100%').attr('bgcolor', 'black').attr('height', '1')
							),
							$('<tr>').append(
								$('<td>').addClass('bold').css('width', '28%').attr('align', 'left').text('Name'),
								$('<td>').addClass('bold').attr('align', 'center').text('Rank'),
								$('<td>').addClass('bold').attr('align', 'center').text('Date'),
								$('<td>').addClass('bold').css('text-align', 'right').text('Ago')
							)
						)
					);
					if(v==='com') {
						$('<div>').css({'float': 'right', 'margin-right': '5px', 'margin-top': '3px'}).append(
							$('<a>').attr({'href': OB_NEWS_WEBSITE + '/deathslog/'+cur_v+'/' + famid, 'target': '_blank'}).append(
								$('<img>').addClass('brcImg').attr({src: GM_getResourceURL('log'), title: 'View full deathslog'})
							)
						).appendTo($('table.thinline:eq(2)>tbody>tr:eq(0)>td'))
					}

					var deaths_body = $('table.thinline:eq(2)').find('tbody');
					if (data['deaths']) {
						$.each(data['deaths'], function(k, v) {
							var extra = (v['Akill'] == 1)?'(<b>A</b>) ':(v['BF'] == 1)?'(<b>BF</b>) ':'';
							deaths_body.append(
								$('<tr>').append(
									$('<td>').html(extra).append(
										$('<a>').attr('href', 'user.php?name=' + v['Name']).text(v['Name'])
									),
									$('<td>').attr('align', 'center').append(
										$('<a>').attr('href', OB_STATS_WEBSITE + '/history.php?v='+v+'&name=' + v['Name']).text(v['Rank'])
									),
									$('<td>').attr('align', 'center').text(v['Date']),
									$('<td>').css('text-align', 'right').text(v['Agod'] + 'd ' + v['Agoh'] + 'h ' + v['Agom'] + 'm')
								)
							);
						});
					} else {
						deaths_body.append(
							$('<tr>').append(
								$('<td>').addClass('red').css('text-align', 'center').attr('colspan', '4').text('There are no deaths yet!')
							)
						);
					}

					// add Famlog
					$('table.thinline:eq(1)').closest('td').append(
						$('<br />'),
						$('<table>').addClass('thinline').css('width', '100%').attr('cellspacing', '0').attr('cellpadding', '2').attr('rules', 'none').append(
							$('<tr>').append(
								$('<td>').addClass('tableheader').attr('colspan', '100%').text('Last family changes')
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
					if(v==='com') {
						$('<div>').css({'float': 'right', 'margin-right': '5px', 'margin-top': '3px'}).append(
							$('<a>').attr({'href': OB_NEWS_WEBSITE + '/famlog/'+cur_v+'/' + famid, 'target': '_blank'}).append(
								$('<img>').addClass('brcImg').attr({src: GM_getResourceURL('log'), title: 'View full changelog'})
							)
						).appendTo($('table.thinline:eq(3)>tbody>tr:eq(0)>td'))
					}

					var changes_body = $('table.thinline:eq(3)').find('tbody');
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
				}, 0);
			});
		} // end of family page

//---------------- My account ----------------
		if (on_page('/information.php') && nn == 'table') {
			bnUpdate(1);
		}

//---------------- 1-click voter ----------------
		if (on_page('/vfo.php') && nn == 'center') {
			$('a[href*="votelot.php"]').attr('name', 'forticket');

			$('td.tableheader:first').html(
				$('<span>').addClass('orange').css({'cursor': 'pointer', 'color': 'orange'}).attr({'id': 'votelink', 'title': ''}).text($('td.tableheader:first').text())
			).click(function () {
					voteNow(false);
			});
			var lastVote = getV('lastvote', 0); //get last voting time
			if (lastVote === 0) {
				if (confirm('You haven\'t used the 1-click voter yet!\nDo you want to use it now?')) {
					voteNow(true);
				}
			} else { //not first run
				var till = (parseInt(lastVote, 10) + 86400) - time(); // time till next vote
				var msg = '';
				if (till <= 0) { // user can vote again so ask
					var ago = time() - lastVote; // time since last vote
					msg += 'You haven\'t used the 1-click voter today!' + '\n' + 'Since you last used the 1-click voter, it\'s been:\n';
					msg += Math.floor(ago / 86400) + ' days, '; // days
					msg += Math.floor((ago % 86400) / 3600) + ' hours, '; // hours
					msg += Math.floor((ago % 3600) / 60) + ' minutes and '; // minutes
					msg += Math.floor(ago % 60) + ' seconds.'; // seconds
					msg += '\n' + 'Do you want to use the 1-click voter now?';
				} else { // can't vote yet
					msg += 'You can\'t vote again yet!\nPlease wait another:\n';
					msg += Math.floor(till / 3600) + ' hours, '; // hours
					msg += Math.floor((till % 3600) / 60) + ' minutes and '; // minutes
					msg += Math.floor(till % 60) + ' seconds.'; // seconds
					msg += '\n' + 'Do you still want to vote?';
				}
				if (confirm(msg)) {
					voteNow(true);
				}
			}
		}
//---------------- Group Crimes ----------------
		// GroupCrime general accept focus
		if (on_page('module=GroupCrimes') && nn == 'center') {
			//focus on accept
			$('a').filter(function(){
				return (/Accept/i).test($(this).text());
			}).focus();
			//focus on transfer
			$('a').filter(function(){
				return (/Make Transfer/i).test($(this).text());
			}).focus();
		}
		//Heist LE autoform
		if (on_page('module=Heist') && nn == 'center') {
			$('input[name="bullets"]').val('50');
			$('select[name="gun"]').val('real');
			if(GetParam('driver')) {
				var dr = GetParam('driver');
				$('input[name="driver"]').val(dr)
				$('input[type="submit"]').focus();
			} else {
				$('input[name="driver"]').focus();
			}
		}
		//OC accept focus
		if (on_page('/orgcrime2.php') && nn == 'br') {
			//focus on accept
			$('a').filter(function(){
				return (/Yes/i).test($(this).text());
			}).focus();
		}
		//OC Participants autoform
		if (on_page('?takepart=yes') && nn == 'form') {
			//WE
			$('input[name="bulletz"]').val('100');
			$('select[name="guns"]').val('2');
			//EE
			$('input:radio[name="exploz"]').prop('checked', true);
			//ALL
			$('input[type="submit"]').focus();
		}
		//MOC Participants autoform
		if (on_page('module=MegaOC') && nn == 'form') {
			//WE
			$('input[type="text"]').val('500');
			//EE
			$('input:radio:eq(2)').prop('checked', true);
			//ALL
			$('input[type="submit"]').focus();
		}
		//Raid LE autoform
		if (on_page('module=Spots') && nn == 'form') {
			$('input[name="bullets"]').val('200');
			if(GetParam('driver')) {
				var dr = GetParam('driver');
				$('input[name="driver"]').val(dr)
			} else {
				$('input[name="driver"]').focus;
			}
		}
//---------------- Mail ----------------
		//Inbox
		if (on_page('action=inbox') && nn == 'center'){
			//save unread msg and msg ids
			var msg = $('td[style="cursor:pointer;cursor:hand"]').length;
			var unreadmsg = $('tr.color2').length;
			var id = [];
			for(var i=0;i<msg;i++){ //find first open spot
				id[i] = $('a[href*="showMsg"]:eq('+i+')').attr('href').split('?')[1].match(/\d+/g);
				setV('msgids', id.join(',')); //join and save values
			}
			var unreadid = [];
			for(var a=0;a<unreadmsg;a++){ //find first open spot
				unreadid[a] = $('tr.color2 > td:eq(1) > a').attr('href').split('?')[1].match(/\d+/g);
				setV('unread', unreadid.join(',')); //join and save values
			}
			//delete and reply icons
			var num = 1;
			setTimeout(function () {
				$('tr[class*="color"]').each(function() {
					var id = $(this).children('td:eq(1)').children('a').attr('href').split('?')[1].match(/\d+/g)[0];
					$(this).children('td:eq(0)').append(
						$('<img />').addClass('inboxImg').attr({src: GM_getResourceURL('delete'), title: 'Delete'}).click(function() {
							delMsg('id', id)
						})
					);
					if ($(this).children('td:eq(2)').children('a').length) { //add reply icon
						$(this).children('td:eq(0)').append(
							$('<a>').attr('href', 'BeO/webroot/index.php?module=Mail&action=sendMsg&iReply='+id).html(
								$('<img />').addClass('inboxImg').attr({src: GM_getResourceURL('reply'), title: 'Reply'})
							)
						);
					}
					if (num < 11) { //add msg hotkeys
						var title = $(this).children('td:eq(1)').children();
						title.html('['+(num == 10 ? 0 : num)+'] '+title.html());
						title.attr('accesskey', (num == 10 ? 0 : num));
						num++;
					}
				});
			}, 0);
			//hotkeys for system delete
			var keys = ['-', '=', '[', ']', ';', '\''];
			var selectors = $('td[align="right"][colspan="100%"] > a');
			for (i = -1; ++i < selectors.length;) {
				$('td[align="right"][colspan="100%"] > a:eq('+i+')').attr({accesskey: keys[i], title: 'Hotkey: '+keys[i]});
			}
			//select all button
			$('td[align="right"][colspan="100%"]').prepend(
				$('<span>').css('float', 'left').append(
					$('<input />').attr({type: 'button', value: '(Un)Select All'}).click(function() {
						$('[name="selective[]"]').each(function() {
							$(this).prop('checked', !$(this).prop('checked'));
						});
					})
				)
			);
			//add custom system delete
			$('td[align="right"][colspan="100%"] > a:eq(0)').before($('<br />'));
			$('td[align="right"][colspan="100%"]').append(
				$('<br />'),
				$('<span>').text('Delete System: '),
				$('<span>').css('cursor', 'pointer').text('Super Lottery').click(function() {
					delMsg('name', 'Omerta Super Lottery');
				}),
				$('<span>').text(' | '),
				$('<span>').css('cursor', 'pointer').text('Target not found').click(function() {
					delMsg('name', 'Target not found');
				}),
				$('<span>').text(' | '),
				$('<span>').css('cursor', 'pointer').text('Target found').click(function() {
					delMsg('name', 'Target found');
				}),
				$('<span>').text(' | '),
				$('<span>').css('cursor', 'pointer').text('Promoted').click(function() {
					delMsg('name', 'Promoted');
				})
			);
		}

		//Outbox
		if (on_page('action=outbox') && nn == 'center'){
			setTimeout(function () {
				$('a[href*="showSentMsg"]').each(function() {
					var id = $(this).attr('href').split('?')[1].match(/\d+/g)[0];
					$(this).parent().prepend(
						$('<a>').attr('href', 'BeO/webroot/index.php?module=Mail&action=delMsg&iId='+id+'&iParty=1').html(
							$('<img />').addClass('inboxImg').attr({src: GM_getResourceURL('delete'), title: 'Delete'})
						)
					);
				});
			}, 0);
		}

		//Show message
		if (on_page('action=showMsg') && nn == 'center') {
			var id = wlh.split('iMsgId=')[1].match(/\d+/g)[0];
			var ids = getV('msgids', '').split(',');
			for(var i = 0;i<ids.length;i++){
				if (ids[i] == id) {
					var next = ids[i-1];
					var prev = ids[i+1];
				}
			}
			//check unread msg and grab obay bullets
			var unread = getV('unread', '').split(',');
			for (var x = 0; x < unread.length; ++x) {
				if (unread[x] !== '' && unread[x] == id) { //msg is unread
					var msgTyp = $('tr.tableitem').text().split('Type:')[1].split('Sent:')[0];
					var arr = $('table.thinline > tbody > tr:eq(7) > td').html().split(' ');
					var bulletmsg = new RegExp('Obay bid succesful');
					if (bulletmsg.test(msgTyp)) { //grab obay bullets from message
						setV('obaybul', (getV('obaybul', 0) + parseInt(arr[2], 10)));
					}
					// resave unread msg's, without our msg
					var str = '';
					for (var y = 0; y < unread.length; ++y) {
						if (unread[y] !== '' && unread[y] != id) {
							str += ','+unread[y];
						}
					}
					setV('unread', str.substr(1));
					x = unread.length; // not needed to continue because we found our id
				}
			}
			//add previous and next arrows
			setTimeout(function () {
				$('table.thinline > tbody > tr > td.tableheader:eq(1)').append(
					$('<span>').css({'float': 'right', 'padding-top': '2px'}).append(
						$('<a>').attr({id: 'prev', href: '/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId='+prev}).append(
							$('<img>').addClass('inboxImg').attr({title: 'Previous', src: GM_getResourceURL('prev')})
						)
					).append(
						$('<a>').attr({id: 'next', href: '/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId='+next}).append(
							$('<img>').addClass('inboxImg').attr({title: 'Next', src: GM_getResourceURL('next')})
						)
					)
				);
				for(var j = 0;j<ids.length;j++){
					if (ids[j] == id) {
						if(j===0) {
							$('a#next').css('visibility', 'hidden');
						}
						if (j==ids.length-1) {
							$('a#prev').css('visibility', 'hidden');
						}
					}
				}
			}, 0);
			//replace reply and delete links
			var linkz = $('table.thinline > tbody > tr:eq(9) > td > a');
			if (linkz.length == 1) {
				setTimeout(function () {
					$('table.thinline > tbody > tr:eq(9) > td > a').html(
						$('<img />').addClass('inboxImg').attr({src: GM_getResourceURL('delete'), title: 'Delete ([)'})
					).attr('accesskey', '[');
				}, 0);
			} else {
				setTimeout(function () {
					$('table.thinline > tbody > tr:eq(9) > td > a:first').html(
						$('<img />').addClass('inboxImg').attr({src: GM_getResourceURL('delete'), title: 'Delete ([)'})
					).attr('accesskey', '[');
					$('table.thinline > tbody > tr:eq(9) > td > a:last').html(
						$('<img />').addClass('inboxImg').attr({src: GM_getResourceURL('reply'), title: 'Reply (])'})
					).attr('accesskey', ']');
				}, 0);
			}
			// Add arrow hotkeys
			$(window).keydown(function(event){
				var key = event.which;
				if(key==39){ //right, reply
					window.location.href = 'http://'+document.location.hostname+'/game.php#http://'+document.location.hostname+'/BeO/webroot/index.php?module=Mail&action=sendMsg&iReply='+id;
				}
				if(key==38 && id != ids[0]) { //up, select previous
					window.location.href = 'http://'+document.location.hostname+'/game.php#http://'+document.location.hostname+'/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId='+next;
				}
				if(key==40 && id != ids[ids.length-1]) { //down, select next
					window.location.href = 'http://'+document.location.hostname+'/game.php#http://'+document.location.hostname+'/BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId='+prev;
				}
				if(key==37) { //left, delete
					window.location.href = 'http://'+document.location.hostname+'/game.php#http://'+document.location.hostname+'/BeO/webroot/index.php?module=Mail&action=delMsg&iId='+id+'&iParty=2';
				}
			});
		}
		//focus on text area
		if (on_page('iReply=') && nn == 'center') {
			$('textarea').focus();
		}
		//redirect on send message
		if (on_page('action=sendMsg') && nn == 'b') {//needs testing
			if ($('font:eq(0)').text().indexOf('Message sent to') != -1) {
				setTimeout(function () {
					$('a[href*="inbox"]')[0].click();
				}, 1000);
			}
		}

		//look its me
		if ((on_page('users_online') && nn == 'center') || (on_page('allusers.php') && nn == 'div') || (on_page('global_stats')) && nn == 'center') {
			var nick = getV('nick', '');
			if (nick !== '') {
				$('a[class!="link"]').each(function() {
					if ($(this).text() == nick || $(this).text() == nick + '+') {
						$(this).html('<span style="color:green;font-weight:bold;">' + $(this).html() + '</span>');
					}
				});
			}
		}
//---------------- Bank ----------------
		if (on_page('/bank.php') && nn == 'center') {
			//auto reload after transfer
			if ($('center').html().search('<table') == -1) {
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			}
			// Add amount of interest next to %
			if($('table.thinline:eq(1) > tbody > tr:eq(1) > td:eq(1)').length) { // check for banked money
				var money = $('table.thinline:eq(1) > tbody > tr:eq(1) > td:eq(1)').text();
				var rx = $('table.thinline:eq(1) > tbody > tr:eq(3) > td:eq(1)').text(); // get recieved amount
				var tmp = 1 * rx.replace(/\D/g, '') - 1 * money.replace(/\D/g, ''); // calculate interest
				$('table.thinline:eq(1) > tbody > tr:eq(2) > td:eq(1)').html($('table.thinline:eq(1) > tbody > tr:eq(2) > td:eq(1)').text()+' &rarr; ($'+commafy(tmp)+')');
				setTimeout(function() {
					setV('interest', tmp);
				}, 0);

				// Interest reminder
				var seconds = 0;
				seconds = (seconds + (parseInt($('span:eq(14)').html().split(' hours')[0], 10) * 3600));
				seconds = (seconds + (parseInt($('span:eq(14)').html().split(' hours')[1].split(' minutes')[0], 10) * 60));
				seconds = (seconds + parseInt($('span:eq(14)').html().split(' minutes')[1].split(' seconds')[0], 10));
				setTimeout(function() {
					setV('banktleft', (time() + seconds));
				}, 0);
			}
			// Calculators
			if($('td[width="33%"]:eq(2)').length) {
				$('td[width="33%"]:eq(2)').append(
					$('<br />'),
					$('<table>').addClass('thinline').attr({width: '100%', align: 'center', rules: 'none'}).append(
						$('<tr>').append(
							$('<td>').addClass('tableheader').attr('colspan', '4').text('Calculators')
						), $('<tr>').append(
							$('<td>').attr({'align': 'left', 'width': '20%'}).text('You send:'),
							$('<td>').attr({'align': 'left', 'width': '25%'}).append(
								$('<input>').attr({'name': 'amount', 'type': 'text', 'value': '', 'maxlength': '11', 'size': '13'}).keyup(function() {
									var amt = $(this).val().replace(/\D+/g, '');
									$('#get').text('$'+commafy(Math.round(amt*0.9)));
								})
							),
							$('<td>').attr({'align': 'left', 'width': '23%'}).text('User gets:'),
							$('<td>').attr({'align': 'left', 'id': 'get'}).text('$0')
						), $('<tr>').append(
							$('<td>').attr({'align': 'left', 'width': '20%'}).text('You want:'),
							$('<td>').attr({'align': 'left', 'width': '25%'}).append(
								$('<input>').attr({'name': 'amount', 'type': 'text', 'value': '', 'maxlength': '11', 'size': '13'}).keyup(function() {
									var amt = $(this).val().replace(/\D+/g, '');
									$('#give').text('$'+commafy(Math.round(amt/0.9)));
								})
							),
							$('<td>').attr({'align': 'left', 'width': '23%'}).text('User sends:'),
							$('<td>').attr({'align': 'left', 'id': 'give'}).text('$0')
						), $('<tr>').append(
							$('<td>').attr({'align': 'left', 'width': '20%'}).text('Deposit:'),
							$('<td>').attr({'align': 'left', 'width': '25%'}).append(
								$('<input>').attr({'name': 'amount', 'type': 'text', 'value': '', 'maxlength': '11', 'size': '13'}).keyup(function() {
									var amt = $(this).val().replace(/\D+/g, '');
									$('#int').text('$'+commafy(Math.round(amt* (amt >= 1000000 ? (amt >= 3000000 ? (amt >= 6000000 ? (amt >= 10000000 ? (amt >= 15000000 ? (amt >= 21000000 ? (amt >= 27000000 ? (amt >= 35000000 ? 1.01 : 1.015) : 1.02) : 1.025 ) : 1.03) : 1.035) : 1.04) : 1.045) : 1.05 ))));
								})
							),
							$('<td>').attr({'align': 'left', 'width': '23%'}).text('Receive:'),
							$('<td>').attr({'align': 'left', 'id': 'int'}).text('$0')
						)
					)
				)
			}
			// m/k usage
			var inputs = $('input[name="amount"], input#amount');
			inputs.each(function() {
				$(this).keydown(function(event) {
					var symcode = event.which;
					if(symcode == 75){
						$(this).val($(this).val() + '000');
					}
					if(symcode == 77){
						$(this).val($(this).val() + '000000');
					}
					$(this).val($(this).val().replace(/k|m/g, ''));
					return (symcode == 75 || symcode == 77)?false:true;
				});
			});
		}
//---------------- All users ----------------
		if (on_page('/allusers.php') && nn == 'div') {
			//add pagenumber
			var page = GetParam('start');
			page = (page/15)+1;
			$('a[href*="/allusers.php"]:eq(2)').before($('<p>').text('Page: '+page));

			//edit show/hide dead link
			var dead = GetParam('dead');
			if(dead !== null) {
				var url = wlh.replace('#', '');
				var hs = (dead == 'HIDE') ? 'SHOW' : 'HIDE';
				$('a[href*="/allusers.php?dead="]').attr('href', url.replace(dead, hs));
			}
		}
//---------------- TOP 3 ----------------
		//Control Panel
		if (on_page('module=Family') && nn == 'div') {
			//linkify CP log
			if(nid == 'jsprogbar_fam_rank_progress') {
				$('table.color2:eq(0) > tbody > tr > td').not(':first').not(':last').each(function( ) {
					if ($(this).text() !== '') {
						var len = $(this).html().trim().split(' ').length - 1;
						var who = $(this).html().trim().split(' ');
						if (who[0].match(/[A-Z]/g)) {
							who[0] = '<a href="/user.php?nick=' + who[0] + '"><b>' + who[0] + '</b></a>';
						}
						if (who[len].match(/[A-Z]/g)) {
							if(who[len] != 'Capo(s)') {
								if(who[len] != 'Object(s)') {
									if(who[len] != 'Unlocked') {
										who[len] = '<a href="/user.php?nick=' + who[len].match(/\D+/g)[0].replace('.', '') + '"><b>' + who[len] + '</b></a>';
									}
								}
							}
						}
						$(this).html(who.join(' '));
					}
				});
				// Add promo calculation for CD/GF/FL.
				var brugP = parseInt($('table.color2:eq(1) > tbody > tr:eq(8) > td > table > tbody > tr:eq(6) > td:eq(1)').text().replace(/\D/g, ''), 10);
				var perc = (brugP != '0') ? $('input[name="ppercentage"]').val() : 0;
				var cdP = parseInt((((brugP/100)*perc)+brugP), 10);
				var gfP = parseInt((((cdP/100)*perc)+parseInt(cdP, 10)), 10);
				$('table.color2:eq(1) > tbody > tr:eq(8) > td > table > tbody > tr:eq(6) > td:eq(1)').removeAttr('colspan');
				$('table.color2:eq(1) > tbody > tr:eq(8) > td > table > tbody > tr:eq(6)').append(
					$('<td>').text('Capodecina'),
					$('<td>').text('$ '+commafy(cdP))
				);
				$('table.color2:eq(1) > tbody > tr:eq(8) > td > table > tbody').append(
					$('<tr>').append(
						$('<td>').text('GF / FL'),
						$('<td>').text('$ '+commafy(gfP))
					)
				);
			}
		}
		//linkify opened CP log
		if (on_page('/familylog.php') && nn == 'table') {
			$('table.color2 > tbody > tr > td').not(':first').each(function( ) {
				if ($(this).text() !== '') {
					var len = $(this).html().trim().split(' ').length - 1;
					var who = $(this).html().trim().split(' ');
					if (who[0].match(/[A-Z]/g)) {
						who[0] = '<a href="/user.php?nick=' + who[0] + '"><b>' + who[0] + '</b></a>';
					}
					if (who[len].match(/[A-Z]/g)) {
						if(who[len] != 'Capo(s)') {
							if(who[len] != 'Object(s)') {
								if(who[len] != 'Unlocked') {
									who[len] = '<a href="/user.php?nick=' + who[len].match(/\D+/g)[0].replace('.', '') + '"><b>' + who[len] + '</b></a>';
								}
							}
						}
					}
					$(this).html(who.join(' '));
				}
			});
		}
		//Family bank
		if (on_page('/cpbank.php') && nn == 'center') {
			$('table.thinline:eq(0)').after($('<br />'), $('<table>').addClass('thinline').attr({width: '600', align: 'center', rules: 'none'}).append(
				$('<tr>').append(
					$('<td>').addClass('tableheader').attr('colspan', '4').text('Calculators')
				), $('<tr>').append(
					$('<td>').attr({'align': 'right', 'width': '25%'}).text('You send:'),
					$('<td>').attr({'align': 'center', 'width': '25%'}).append(
						$('<input>').attr({'name': 'amount', 'type': 'text', 'value': '', 'maxlength': '11', 'size': '15'}).keyup(function() {
							var amt = $(this).val().replace(/\D+/g, '');
							$('#get').text('$'+commafy(Math.round(amt*0.85)));
						})
					),
					$('<td>').attr({'align': 'right', 'width': '25%'}).text('User gets:'),
					$('<td>').attr({'align': 'center', 'width': '25%', 'id': 'get'}).text('$0')
				), $('<tr>').append(
					$('<td>').attr({'align': 'right', 'width': '25%'}).text('You want:'),
					$('<td>').attr({'align': 'center', 'width': '25%'}).append(
						$('<input>').attr({'name': 'amount', 'type': 'text', 'value': '', 'maxlength': '11', 'size': '15'}).keyup(function() {
							var amt = $(this).val().replace(/\D+/g, '');
							$('#give').text('$'+commafy(Math.round(amt/0.85)));
						})
					),
					$('<td>').attr({'align': 'right', 'width': '25%'}).text('User sends:'),
					$('<td>').attr({'align': 'center', 'width': '25%', 'id': 'give'}).text('$0')
				)
			));

			// m/k usage
			var inputs = $('input[name="amount"]');
			inputs.each(function() {
				$(this).keydown(function(event) {
					var symcode = event.which;
					if(symcode == 75){
						$(this).val($(this).val() + '000');
					}
					if(symcode == 77){
						$(this).val($(this).val() + '000000');
					}
					$(this).val($(this).val().replace(/k|m/g, ''));
					return (symcode == 75 || symcode == 77)?false:true;
				});
			});
		}
//---------------- SlotsTracker ----------------
		if (on_page('/gambling/slotmachine.php') && nn == 'center') {
			var slotjp =  parseInt(getV('slotjp', 0), 10);
			var slotbar = parseInt(getV('slotbar', 0), 10);
			var slotgames = parseInt(getV('slotgames', 0), 10);
			var slotgwon =  parseInt(getV('slotgwon', 0), 10);
			var slotmwon =  parseInt(getV('slotmwon', 0), 10);
			var slotspent =  parseInt(getV('slotspent', 0), 10);
			var slotbet =  parseInt(getV('slotbet', 0), 10);
			var jpmwon =  parseInt(getV('jpmwon', 0), 10);
			var str = $('#game_container').text().replace(/,/g, '');
			var betinput = $('input[name="betted"]');
			betinput.focus();
			betinput.keyup(function() {
				setV('slotbet', parseInt($(this).val(), 10));
			});

			if ($('#game_container:contains(Congratulations!)').length > 0 || $('#game_container:contains(YOU WON THE JACKPOT)').length > 0) {
				var S1 = $('img[src*="slotmachine"]:eq(0)').attr('src').replace(/">/g, '').split('/');
				var S2 = $('img[src*="slotmachine"]:eq(1)').attr('src').replace(/">/g, '').split('/');
				var S3 = $('img[src*="slotmachine"]:eq(2)').attr('src').replace(/">/g, '').split('/');
				if (S1[6] == "a.gif" && S2[6] == "a.gif" && S3[6] == "a.gif") { // Jackpot
					var rexjp = new RegExp('You Win \\$(\\d+)');
					var jpm = str.match(rexjp); // get money
					jpmwon += parseInt(jpm[1], 10); // jp money won;
					setV('jpmwon', jpmwon);
					slotmwon += parseInt(jpm[1], 10); // money won;
					setV('slotmwon', slotmwon);
					slotjp += 1; // jackpot +1;
					setV('slotjp', slotjp);
				}
				if (S1[6] == "b.gif" && S2[6] == "b.gif" && S3[6] == "b.gif") { // Triple Bar
					slotbar += 1; //triple bar +1;
					setV('slotbar', slotbar);
				}
				var rex = new RegExp('Congratulations! You won \\$(\\d+)');
				var smw = str.match(rex); // get money
				slotgames += 1; // games played +1;
				setV('slotgames', slotgames);
				slotgwon += 1; // games won +1;
				setV('slotgwon', slotgwon);
				slotmwon += parseInt(smw[1], 10); // money won;
				slotmwon += parseInt(slotbet, 10); // bet back;
				setV('slotmwon', slotmwon);
				slotspent += parseInt(slotbet, 10);// money spent
				setV('slotspent', slotspent);
			}
			if ($('#game_container:contains(Bummer)').length > 0) {//lost
				slotgames += 1; //games played +1;
				setV('slotgames', slotgames);
				slotspent += parseInt(slotbet, 10);//money spent
				setV('slotspent', slotspent);
			}

			var slotprofit = slotmwon - slotspent;
			if (slotspent >= 0) {
				if (slotprofit >= 0) slotprofit = '$'+commafy(slotprofit);
				else slotprofit = '-$'+commafy(slotspent - slotmwon);
			}
			var sgamesWon = Math.round((slotgwon / slotgames) * 100);
			var sgamesWon2 = isNaN(sgamesWon) ? 0 : sgamesWon;

			var SlTtop = parseInt(getV('SlTtop', '225'), 10);
			var SlTleft = parseInt(getV('SlTleft', '300'), 10);
			if($('#SlTracker').length == 0) {
				$('#game_container').append(
					$('<div>').addClass('tracker').attr({id: 'SlTracker'}).css({top: SlTtop, left: SlTleft}).append(
						$('<div>').attr({id: 'slthead'}).append(
							$('<center>').text('SlotsTracker').css({fontWeight: 'bold'})
						).click(function() {
							$('#SlTracker').draggable();
						}),
						$('<hr>').css({color: 'gray'}),
						$('<div>').attr({id: 'sltbody'}).html('Games played:<font style="float:right;"><b>'+commafy(slotgames)+'</b></font><br />Games won:<font style="float:right;"><b>'+commafy(slotgwon)+' ('+sgamesWon2+'%)</b></font><br />Jackpot:<font style="float:right;"><b>'+slotjp+' ($'+commafy(jpmwon)+')</b></font><br />Triple BAR:<font style="float:right;"><b>'+slotbar+'</b></font><br />Money spent:<font style="float:right;"><b>$'+commafy(slotspent)+'</b></font><br />Money won:<font style="float:right;"><b>$'+commafy(slotmwon)+'</b></font><br />Profit:<font style="float:right;"><b>'+slotprofit+'</b></font>'),
						$('<hr>').css({color: 'gray'}),
						$('<div>').attr({id: 'sltreset'}).addClass('reset').text('Reset stats').click(function() {
							$(this).text('Stats have been reset!');
							$('#sltbody').html('Games played:<font style="float:right;"><b>0</b></font><br />Games won:<font style="float:right;"><b>0 (0%)</b></font><br />Jackpot:<font style="float:right;"><b>0 ($0)</b></font><br />Triple BAR:<font style="float:right;"><b>0</b></font><br />Money Spent:<font style="float:right;"><b>$0</b></font><br />Money won:<font style="float:right;"><b>$0</b></font><br />Profit:<font style="float:right;"><b>$0</b></font>');
							setV('slotgames', 0);
							setV('slotgwon', 0);
							setV('slotmwon', 0);
							setV('slotspent', 0);
							setV('slotjp', 0);
							setV('slotbar', 0);
							setV('jpmwon', 0);
						})
					)
				);
			}
			$('#SlTracker').mouseup(function() {
				var divOffset = $("#SlTracker").offset();
				var left = divOffset.left;
				var top = divOffset.top;
				setV('SlTleft', left);
				setV('SlTtop', top);
			});
			// m/k usage
			var inputs = $('input[name="betted"]');
			inputs.each(function() {
				$(this).keydown(function(event) {
					var symcode = event.which;
					if(symcode == 75){
						$(this).val($(this).val() + '000');
					}
					if(symcode == 77){
						$(this).val($(this).val() + '000000');
					}
					$(this).val($(this).val().replace(/k|m/g, ''));
					return (symcode == 75 || symcode == 77)?false:true;
				});
			});
		}
//---------------- Scratchtracker ----------------
		if (on_page('/scratch.php') && (nn == 'center' || nn == 'form')) {
			var unopened = getV('unopened', 0);
			var monin = parseInt(getV('monin', 0), 10);
			var mils = parseInt(getV('mils', 0), 10);
			var bullets = parseInt(getV('bullets', 0), 10);
			var scratches = parseInt(getV('scratches', 0), 10);

			if ($('#game_container:contains(Congratulations!)').length) { //grab winning event
				if ($('#game_container:contains(They have been added to your account!)').length) { //bullets
					var rex = new RegExp('won (\\d+) bullets');
					var r = $('#game_container').text().match(rex);
					bullets += parseInt(r[1], 10);
					setV('bullets', bullets);
				}
				if ($('#game_container:contains(It has been added to your account!)').length) { //money
					var rex = new RegExp('You have won \\$ (\\d+)');
					var str = $('#game_container').text().replace(/,/g, '');
					var r = str.match(rex);
					monin += parseInt(r[1], 10);
					setV('monin', monin);
					if (parseInt(r[1], 10) == 1000000) {
						mils += 1;
						setV('mils', mils);
					}
					$('input[name="scratch"]').focus()
				}
			}
			if ($('#game_container:contains(Start scratching)').length) { //grab scratching event
				scratches += 1;
				setV('scratches', scratches);
				if($('input[name="Check"]').length) {
					$('input[name="Check"]').focus();
				} else {
					$('input[type="submit"]').focus();
				}
			} else {
				if ($('input[name="codescratch"]').length) {//focus on unclaimed prices
					$('input[type="submit"]:eq(1)').focus()
				} else { //focus on scratch
					$('input[name="scratch"]').focus()
				}
			}

			var monout = (scratches * 5000);
			if ((monin - monout) < 0) {
				var profit = '-$'+commafy(monout - monin);
			} else {
				var profit = '$'+commafy(monin - monout);
			}
			var ppk = Math.round((((monout - monin) / bullets) * 100000) / 100000);
			if (isNaN(ppk) || bullets == 0) {
				ppk = 0;
			}

			var STtop = parseInt(getV('STtop', '225'), 10);
			var STleft = parseInt(getV('STleft', '300'), 10);
			if($('#STracker').length == 0) {
				$('#game_container').append(
					$('<div>').addClass('tracker').attr({id: 'STracker'}).css({top: STtop, left: STleft}).append(
						$('<div>').attr({id: 'sthead'}).append(
							$('<center>').text('ScratchTracker').css({fontWeight: 'bold'})
						).click(function() {
							$('#STracker').draggable();
						}),
						$('<hr>').css({color: 'gray'}),
						$('<div>').attr({id: 'stbody'}).html('Scratched:<font style="float:right;"><b>'+commafy(scratches)+'</b></font><br />Money spent:<font style="float:right;"><b>$'+commafy(monout)+'</b></font><br />Money won:<font style="float:right;"><b>$'+commafy(monin)+'</b></font><br />Profit:<font style="float:right;"><b>'+profit+'</b></font><br />Millions:<font style="float:right;"><b>'+commafy(mils)+'</b></font><br />Bullets won:<font style="float:right;"><b>'+commafy(bullets)+'</b></font><br />Price per bullet:<font style="float:right;"><b>$'+commafy(ppk)+'</b></font>'),
						$('<hr>').css({color: 'gray'}),
						$('<div>').attr({id: 'streset'}).addClass('reset').text('Reset stats').click(function() {
							$(this).text('Stats have been reset!');
							$('#stbody').html('Scratched:<font style="float:right;"><b>0</b></font><br />Money spent:<font style="float:right;"><b>$0</b></font><br />Money won: <font style="float:right;"><b>$0</b></font><br />Profit:<font style="float:right;"><b>$0</b></font><br />Millions:<font style="float:right;"><b>0</b></font><br />Bullets won:<font style="float:right;"><b>0</b></font><br />Price per bullet:<font style="float:right;"><b>$0</b></font>');
							setV('monin', 0);
							setV('mils', 0);
							setV('bullets', 0);
							setV('scratches', 0);
						})
					)
				);
			}
			$('#STracker').mouseup(function() {
				//alert('Set the x and y values using GM_getValue.');
				var divOffset = $("#STracker").offset();
				var left = divOffset.left;
				var top = divOffset.top;
				setV('STleft', left);
				setV('STtop', top);
			});
		}
//---------------- BulletTracker ----------------
		if (on_page('/bullets2.php') && nn == 'center') {
			var d = new Date();
			var btdate = getV('btdate', 0);
			if(d.getDate()>btdate){ setV('bttoday', 0); }
			var obaybul = parseInt(getV('obaybul', 0), 10);
			var btbullets = parseInt(getV('btbullets', 0), 10);
			var bttoday = parseInt(getV('bttoday', 0), 10);
			var btmoney = parseInt(getV('btmoney', 0), 10);
			var btmode = parseInt(getV('btmode', 1), 10);
			if ($('#game_container:contains(Success, you bought)').length) {
				var rex = new RegExp('Success you bought (\\d+) bullets for \\$ (\\d+)');
				var str = $('#game_container').text().split('Bulletfactory')[0].replace(/,/g, '');;
				var r = str.match(rex);
				btbullets += parseInt(r[1], 10);
				bttoday += parseInt(r[1], 10);
				btmoney += parseInt(r[2], 10);
				setV('btbullets', btbullets);
				setV('bttoday', bttoday);
				setV('btmoney', btmoney);
				setV('btdate', d.getDate());
			}
			if (btbullets == 0) {
				var btdolpbul = 0;
			} else {
				var btdolpbul = Math.round((btmoney / btbullets) * 100) / 100;
			}

			var BTtop = parseInt(getV('BTtop', '300'), 10);
			var BTleft = parseInt(getV('BTleft', '225'), 10);
			if($('#BTracker').length == 0) {
				$('#game_container').append(
					$('<div>').addClass('tracker').attr({id: 'BTracker'}).css({top: BTtop, left: BTleft}).append(
						$('<div>').attr({id: 'bthead'}).append(
							$('<center>').text('BulletTracker').css({fontWeight: 'bold'})
						).click(function() {
							$('#BTracker').draggable();
						}),
						$('<hr>').css({color: 'gray'}),
						$('<div>').attr({id: 'btbody'}).html('Bullets bought:<font style="float:right;"><b>'+commafy(btbullets)+'</b></font><br />Bought today:<font style="float:right;"><b>'+commafy(bttoday)+'</b></font><br />Money spent:<font style="float:right;">$<b>'+commafy(btmoney)+'</b></font><br />Price per bullet:<font style="float:right;">$<b>'+commafy(btdolpbul)+'</b></font><br />Bought on Obay:*<font style="float:right;"><b>'+commafy(obaybul)+'</b></font><br /><font size="1">*not included in total or price per bullet</font>'),
						$('<hr>').css({color: 'gray'}),
						$('<div>').attr({id: 'btreset'}).addClass('reset').text('Reset stats').click(function() {
							$(this).text('Stats have been reset!');
							$('#btbody > font:not(:last-child) > b').text('0');
							setV('btbullets', 0);
							setV('btmoney', 0);
							setV('bttoday', 0);
							setV('btdate', 0);
							setV('obaybul', 0);
						})
					)
				);
			}
			$('#BTracker').mouseup(function() {
				//alert('Set the x and y values using GM_getValue.');
				var divOffset = $("#BTracker").offset();
				var left = divOffset.left;
				var top = divOffset.top;
				setV('BTleft', left);
				setV('BTtop', top);
			});
		}
//---------------- User Profile ----------------
		if (on_page('user.php') && nn == 'center') {
			var str = (v=='nl'?'Dead':'Dood');
			var status = $('span#status').text();
			var inFam = ($('span#family > a').length?$('span#family > a').text():$('span#family').text());
			var alive = (status.search(str));
			var unick = $('span#username').text();

			// DEAD or AKILLED ?
			if (!alive) {
				var rankings = '<a href="'+document.location.hostname+'/BeO/webroot/index.php?module=Rankings&nick='+unick+'">View Rankings</a>';
				if($('img[src*="/userbadges/rip.gif"]').parent().get(0).tagName != 'A'){
					var akill = '<span style="color:red; font-weight:bold;"> (Akill) </span>';
					status += akill;
				}
				$.getJSON(OB_API_WEBSITE + '/?p=stats&w=deaths&v='+v+'&ing='+unick, function(data) {
					if (data["DiedAt"] === null) {
						$('span#status').text(status + ' | Death date is not known');
					} else {
						$('span#status').html(status + ' | '+rankings+' | Died at '+data['Date']+' OT ('+data['Agod']+'d '+data['Agoh']+'h '+data['Agom']+'m ago)');
					}
				});
			}
			if(status === 'Alive'||status === 'Levend') {
				$.getJSON(OB_API_WEBSITE + '/?p=stats&w=laston&v='+v+'&ing='+unick, function(data) {
					if (data['LastOn'] === 0) { // 1970, thus not seen by logger
						$('span#status').text(status+' | This user has not been seen online by our logger yet');
					} else {
						$('span#status').html(status+' | Last on: '+data['Date']+' OT ('+data['Agod']+'d '+data['Agoh']+'h '+data['Agom']+'m ago)');
					}
				});
			}

			// Wealth
			var tr, x, y, z, xpath;
			tr = 10;
			x = $('#game_container').html().search('Marital status:');
			y = $('#game_container').html().search('SMS Status');
			z = $('#game_container').html().search('Family Buster of');

			if (x == -1) { tr--; }
			if (y == -1) { tr--; }
			if (z == -1) { tr--; }

			var wlth = $('#wealth').attr('value')

			var kind = [' ($0 - $50.000)', ' ($50.001 - $100.000)', ' ($100.001 - $500.000)', ' ($1.000.001 - $5.000.000)', ' ($5.000.001 - $15.000.000)', ' ( > $15.000.001)', ' ($500.001 - $1.000.000)'], i=1;
			var wealth = (v=='nl'?['Sloeber', 'Arm', 'Modaal', 'Erg rijk', 'Te rijk om waar te zijn', 'Rijker dan God ', 'Rijk']:['Straydog', 'Poor', 'Nouveau Riche', 'Very rich', 'Too rich to be true', 'Richer than God', 'Rich']);
			var a = wealth.indexOf(wlth);
			$('#wealth').text(wlth+kind[a])

			// Raceform
			var rf = $('#raceform').attr('value')
			var driver = ['Rookie', 'Co-Driver', 'Driver', 'Advanced Driver', 'Master Driver', 'Chauffeur', 'Advanced Chauffeur', 'Master Chauffeur', 'Racing Driver', 'Race Supremo', 'Champion'];
			var a = driver.indexOf(rf);
			$('#raceform').text((a+1)+' - '+rf)

			// Bust ranks
			var bustrank = $('table.thinline > tbody > tr:eq('+(tr+2)+') > td:eq(1) > span').attr('value') // until span id is changed
			var amount = [' (0-500)', ' (501-1.000)', ' (1.001-2.500)', ' (2.501-5.000)', ' (5.001-10.000)', ' (10.001-15.000)', ' (15.001-20.000)', ' (20.001-25.000)', ' (25.001-27.500)', ' (27.501+)'], i=1;
			var brank = ['Rookie', 'Novice', 'Initiate', 'Decent', 'Apprentice', 'Intermediate', 'Professional', 'Expert', 'Ultimate', 'Extreme Expert'];
			var a = brank.indexOf(bustrank);
			$('table.thinline > tbody > tr:eq('+(tr+2)+') > td:eq(1)').text(bustrank+amount[a]) // until span id is changed

//			Rookie (0-500)
//			Novice (501-1.000)
//			Initiate (1.001-2.500)
//			Decent (2.501-5.000)
//			Apprentice (5.001-10.000)
//			Intermediate (10.001-15.000)
//			Professional (15.001-20.000)
//			Expert (20.001-25.000)
//			Ultimate (25.001-27.500)
//			Extreme Expert (27.501+)

			// Actions
			var self = ($('table.thinline > tbody > tr:eq(2) > td:eq(1) > a > span').text() == getV('nick', ''));
			$('td.tableheader').parent().after(
				$('<tr>').append(
					$('<td>').addClass('profilerow').attr({'id': 'actions', 'colspan': '2', 'align': 'center'}).css('display', 'none').html('<a href="BeO/webroot/index.php?module=Heist&action=&driver='+unick+'">Heist</a> | <a href="http://www.barafranca.com/BeO/webroot/index.php?module=Spots&driver='+unick+'">Raid</a> | <a href="/BeO/webroot/index.php?module=Detectives?search='+unick+'">Hire Detectives</a>')
				)
			)
			if(!self && alive) {
				$('td.tableheader').append(
					$('<span>').text(' | '),
					$('<span>').text('View History').css('cursor', 'pointer').click(function() {
						$.get(OB_STATS_WEBSITE + '/history.php?v='+v+'&name='+unick, function(data) {
							$('#game_container').empty();
							$('#game_container').html(data);
						});
					}),
					$('<span>').text(' | '),
					$('<span>').text('Actions').css('cursor', 'pointer').click(function() {
						$('#actions').toggle()
					})
				)
			} else {
				$('td.tableheader').append(
					$('<span>').text(' | '),
					$('<span>').text('View History').css('cursor', 'pointer').click(function() {
						$.get(OB_STATS_WEBSITE + '/history.php?v='+v+'&name='+unick, function(data) {
							$('#game_container').empty();
							$('#game_container').html(data);
						});
					})
				)
			}
			if (parseInt(getPow('bninfo',4,-1), 10) === 3 && inFam === 'None') {
				$('#actions').html($('#actions').html()+' | <a href="/BeO/webroot/index.php?module=Family&who='+unick+'">Invite to Family</a>');
			}
		}
//---------------- Linkify ----------------
		// Messages
		if (on_page('action=showMsg') && nn == 'center') {
			var msgType = $('.tableheader:eq(1) > b > strong').text();
			var msgType2 = $('.tableheader:eq(1) > b').text();
			var msgTxt = '.thinline:eq(1) > tbody > tr:eq(4) > td';
			var arr = $(msgTxt).html().split(' ');
			var linkify = ['Route 66 heist', 'Organised Crime', 'Mega Organized Crime', 'Target not found', 'Carrace invite', 'Target found', 'Kill success', 'Witness statement', 'Condolences', 'found', 'Ticket update', 'Crashed Message', 'Invitation', 'Raid Notification', 'Married', 'Wedding Gift', 'Wedding', 'Wedding Invitation', 'shot!'];

			function setArr(num) {
				return arr[num] = '<a href="/user.php?nick=' + arr[num].match(/\w+/g)[0] + '"><b>' + arr[num].match(/\w+/g)[0] + '</b></a>';
			}

			var WitnessMsg = new RegExp(linkify[7]); // Witness statement
			if (WitnessMsg.test(msgType)) {
				setArr(3);
				setArr(5);
				$(msgTxt).html(arr.join(' '));
			}
			var TnFMsg = new RegExp(linkify[3]); // Target not found
			if (TnFMsg.test(msgType)) {
				setArr(5);
				$(msgTxt).html(arr.join(' '));
			}
			var HeistMsg = new RegExp(linkify[0]); // Route 66 heist
			if (HeistMsg.test(msgType)) {
				if(arr[2] == 'inviting') {
					setArr(0);
					setArr(13);
					$(msgTxt).html(arr.join(' '));
				} else {
					$(msgTxt).html($(msgTxt).html());
				}
			}
			var RaceMsg = new RegExp(linkify[4]); // Car Race invite
			if (RaceMsg.test(msgType)) {
				setArr(9);
				arr[arr.length - 15] = '<a href="/races.php"><strong>' + arr[arr.length - 15];
				arr[arr.length - 14] = arr[arr.length - 14] + '</strong></a>';
				$(msgTxt).html(arr.join(' '));
			}
			var RaidMsg = new RegExp(linkify[13]); // Raid Notification
			if (RaidMsg.test(msgType)) {
				setArr(9);
				arr[arr.length - 8] = arr[arr.length - 8].split('<br>')[0]+'<br /><br /><a href="/BeO/webroot/index.php?module=Spots"><strong>' + arr[arr.length - 8].split('<br>')[2] + '</strong></a>';
				$(msgTxt).html(arr.join(' '));
			}
			var OCMsg = new RegExp(linkify[1]); // Organised Crime
			if (OCMsg.test(msgType)) {
				if(arr[2] == 'inviting') {
					setArr(0);
					setArr(arr.length - 8);
					$(msgTxt).html(arr.join(' '));
				} else {
					$(msgTxt).html($(msgTxt).html());
				}
			}
			var MOCMsg = new RegExp(linkify[2]); // Mega Organized Crime
			if (MOCMsg.test(msgType2)) {
				if(arr[2] == 'invited') {
					setArr(0);
					arr[arr.length - 8] = '<a href="/BeO/webroot/index.php?module=MegaOC"><strong>' + arr[arr.length - 8];
					arr[arr.length - 7] = arr[arr.length - 7] + '</strong></a>';
					$(msgTxt).html(arr.join(' '));
				} else {
					$(msgTxt).html($(msgTxt).html());
				}
			}
		}
//---------------- Lackeys ----------------
		if (on_page('module=Lackeys') && nn == 'div') {
			//General
			var logpath = 'table[data-info="log"] > tbody > tr';
			var credits = $('td[data-info="credits"]').text();
			var money = $('td[data-info="money"]').text().replace(/,/g, '');
			// Sluggs
			if (on_page('type=6') && nn == 'div') {
				var sluggsHideLaughing = getV('sluggsHideLaughing', 'true');
				var price = $('input#setting_bullets_max_price_price_6').val();

				// commafy and alert money
				var needed = (credits/5)*(price*1000);
				var short = money.substr(1)-needed;
				var enough = (short<0)?'<p style="color:red;">'+commafy(money)+' ($'+commafy(short)+')</p>':'<p style="color:green;">'+commafy(money)+'</p>';
				$('td[data-info="money"]').html(enough);

				// Price per bullet
				var x = 0;
				$(logpath).each(function() {
					// show price per bullet when Sluggs bought
					if ($(logpath+':eq('+x+') > td:eq(1)').html().replace(/,/g, '').match(/Sluggs bought (\d+) bullets for \$(\d+)/) && x != logpath.length) {
						var r = $(logpath+':eq('+x+') > td:eq(1)').html().replace(/,/g, '').match(/Sluggs bought (\d+) bullets for \$(\d+)/);
						var ppb = Math.round(r[2]/r[1]);
						$(logpath+':eq('+x+') > td:eq(1)').html($(logpath+':eq('+x+') > td:eq(1)').html()+' ($'+ppb+'/bullet)')
					}
					++x;
				});
				// Hide useless entries
				function hideLaughing(hide) {
					setV('sluggsHideLaughing', hide);
					sluggsHideLaughing = hide;
					x = 0;
					$(logpath).each(function() {
						if($(logpath+':eq('+x+') > td:eq(1)').html().match(/Sluggs is laughing at your measly limit/) && x != logpath.length) {
							if (hide) {
								$(this).hide();
							} else {
								$(this).show();
							}
						}
						++x;
					});
				}
				$('div.oheader:last').append(
					$('<span>').append(
						$('<input>').attr({id: 'cb', type: 'checkbox'}).click(function() {
							if (sluggsHideLaughing === true) {
								hideLaughing(false);
							} else {
								hideLaughing(true);
							}
						}),
						$('<label />').attr('for', 'cb').text('Hide "Sluggs is laughing" entries')
					)
				)
				if (sluggsHideLaughing === 'true') {
					$('#cb').prop('checked', true);
					hideLaughing(true);
				}
			}
		}
//---------------- BRC ----------------
		if ((on_page('prices.php') && nn == 'center') || (on_page('smuggling.php') && nn == 'center')) {
			var carry_n, carry_b;
			bninfo = getV('bninfo', -1);
			if (bninfo != '' && bninfo != -1) { //extra checker for undefined crap
				if (bninfo.search(/[^0-9]/) != -1) {
					setV('bninfo', -1);
				}
			}
			//grab Lex
			if ($('span#lexhelpsyou').length) {
				lex = parseInt($('span#lexhelpsyou').html().replace(/[^0-9]/g,''), 10);
				setV('lex', lex);
				d = new Date();
				lexDay = d.getDay();
				lexHour = d.getHours();
				setV('lexHour', lexHour);
				setV('lexDay', lexDay);
			} else {
				lex = getV('lex', 0);
				lexDay = getV('lexDay', -1);
				lexHour = getV('lexHour', -1);
			}

			function fillBRC(n, b, mode) { //actually filling the forms
				values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //set defaults
				// booze    - narcs    == maximum user can buy
				// carry_b  - carry_n  == total user is carrying
				// b_amount - n_amount == amount per item user is carrying
				// b        - n        == item we want
				if (n > -1 && !lnarcs && mode != 3) { //do we want narcs?
					if (carry_n == 0) { //nothing in pocket, fill it all
						values[7+n] = narcs;
						$('input[name="typedrugs"]:eq(1)').prop('checked', true); //buy
					} else { //something in pocket
						if (carry_n < narcs) { // we got space for more
							if (n_amount[n] < narcs) { //not full of wanted
								if (n_amount[n] != carry_n) { //there is unwanted stuff
									for (i=0; i<=6; i++) {
										if (i != n || mode == 1) { //only sell what we don't want
											values[i+7] = n_amount[i];
										}
									}
									$('input[name="typedrugs"]:eq(0)').prop('checked', true); //sell
								} else { //only carrying wanted narcs
									values[7+n] = narcs - carry_n; //if any, fill missing amount
									$('input[name="typedrugs"]:eq(1)').prop('checked', true); //buy
								}
							} else { //full of wanted
								if (mode > 0) { //CD/RP mode, sell all
									values[7+n] = n_amount[n];
									$('input[name="typedrugs"]:eq(0)').prop('checked', true); //sell
								}
							}
						} else { // we go too much, guess it was a good heist
							for(i=0;i<=6;i++) { //check what we carry
								if(mode==0 && i == n) {
									values[i+7] = 0;
								} else {
									values[i+7] = n_amount[i];
									$('input[name="typedrugs"]:eq(0)').prop('checked', true); //sell
								}
							}
						}
					}
				}
				if(n == -1 && mode == 4 && !lnarcs) {
					for (i=0; i<=6; i++) {
						values[i+7] = n_amount[i];
						$('input[name="typedrugs"]:eq(0)').prop('checked', true); //sell
					}
				}

				//check for scenario: failed selling narcs in high
				selling_n = 0;
				for (i=0; i<=6; i++) {
					selling_n += values[i+7];
				}
				fail_n = (carry_b == 0 && carry_n == narcs && mode == 0 && selling_n > 0) ? 1 : 0;

				if (b > -1 && !fail_n && !lbooze && mode != 3) { //do we want booze? Or are we still selling narcs in high?
					if (carry_b == 0) {
						values[b] = booze; //nothing in pocket, fill it all
						$('input[name="typebooze"]:eq(1)').prop('checked', true); //buy
					} else {
						if (carry_b < booze) { // we got space for more
							if (b_amount[b] < booze) { //not full of wanted
								if (b_amount[b] != carry_b) { //there is unwanted stuff
									for (i=0; i<=6; i++) {
										if ( (i != b || true) || mode == 1) { //only sell what we don't want or in CD mode
											values[i] = b_amount[i];
										}
									}
									$('input[name="typebooze"]:eq(0)').prop('checked', true); //sell
								} else { //only carrying wanted narcs
									if(mode = 2) {
										values[b] = carry_b; //if any, fill missing amount
										$('input[name="typebooze"]:eq(0)').prop('checked', true); //sell
									} else {
										values[b] = booze - carry_b; //if any, fill missing amount
										$('input[name="typebooze"]:eq(1)').prop('checked', true); //buy
									}
								}
							} else { //full of wanted
								if (mode > 0) { //CD/RP mode, sell all
									values[b] = b_amount[b];
									$('input[name="typebooze"]:eq(0)').prop('checked', true); //sell
								}
							}
						} else { // we go too much, guess it was a good heist
							for(i=0;i<=6;i++) { //check what we carry
								if(mode==0 && i == b) {
									values[i] = 0;
								} else {
									values[i] = b_amount[i];
									$('input[name="typebooze"]:eq(0)').prop('checked', true); //sell
								}
							}
						}
					}
				}
				if(b == -1 && mode == 4 && !lbooze) {
					for (i=0; i<=6; i++) {
						values[i] = b_amount[i];
						$('input[name="typebooze"]:eq(0)').prop('checked', true); //sell
					}
				}

				//fill in the fields with the calculated values
				var sorts = ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum', 'morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue'];
				var start = (lbooze)?7:0;
				var end = (lnarcs)?6:13;
				for (i=start; i<=end; i++) {
					var box = $('input[name="'+sorts[i]+'"]');
					box.val(values[i]);
				}

				//focus
				$('input#ver').focus();
			}

			function appBRC(BN) {
				if(!lboth) {
					var getInfo = $('div#info:eq(0)').text();
					getInfo = getInfo.split('*');
					narc = getInfo[0];
					booze = getInfo[1];
					city = getInfo[2];
					plane = getInfo[3];
					fam = getInfo[4];
					lex = parseInt(getInfo[8], 10);
					lexHour = parseInt(getInfo[9], 10);
					lexDay = parseInt(getInfo[10], 10);

					// extra city checker
					if (on_page('smuggling.php') && nn == 'center') {
						smugCity = $('h3').text();
						for (i = 0; i < 8; i++) {
							if (smugCity.search(cities[i]) != -1) {
								city = i + 4;
								setPow('bninfo', 2, city);
							}
						}
					}
					// calc profits per item per city
					lex = 1 + 0.01*lex;
					for (nCityprofit = [], bCityprofit = [], i = 0; i <= 7; i++) { // get profit per single unit of b/n
						for (nCityprofit[i] = [], bCityprofit[i] = [], j = 0; j <= 6; j++) { // price there - price here
							nCityprofit[i].push(Math.round(BN[0][j][(i + 2)]*lex) - Math.round(BN[0][j][(city - 4 + 2)])); //-4 correction for city ID,
							bCityprofit[i].push(Math.round(BN[1][j][(i + 2)]*lex) - Math.round(BN[1][j][(city - 4 + 2)])); //+2 correction for min/max @ [0]+[1] in BN array
						}
						nCityprofit[i].unshift(Math.max.apply(null, nCityprofit[i])); //most profit per unit in this city
						bCityprofit[i].unshift(Math.max.apply(null, bCityprofit[i]));
					}
					// create BRC table
					var table = $('<table>').addClass('thinline').attr('id', 'brc').css('width', '500').append(
						$('<tr>').append(
							$('<td>').addClass('tableheader').attr('colspan', '5').text('Best Run Calculator')
						),
						$('<tr>').append(
							$('<td>').attr({colspan: '5', height: '1'}).css('background-color', '#000')
						),
						$('<tr>').css({'border-bottom': '1px solid #000', 'background-color': '#F0F0F0'}).append(
							$('<td>').html('&nbsp; City'),
							$('<td>').html('&nbsp; Booze'),
							$('<td>').html('&nbsp; Narc'),
							$('<td>').html('&nbsp; Profit'),
							$('<td>').html('&nbsp;')
						)
					)
					// add city rows with individual profits
					for (allProfits = [], bestBN = [], i = 0; i <= 7; i++) {
						var tr  = $('<tr>').attr('id', '2row'+(i+2));
						tr.hover(function(event) {
							$(this).css('backgroundColor', '#888');
						}, function(event) {
							$(this).css('backgroundColor', '#F0F0F0');
						})

						var td = $('<td>').attr('colspan', '5').css({'border-bottom': '1px solid #000', 'heigth': '19px'});

						//--Calc profits
						if (i == city - 4) { // This is the current city
							td.css('text-align', 'center');
							td.html('<i>You are in '+cities[i]+'</i>')
							tr.append(td);
							allProfits.push(0);
							bestBN.push([0, 0]);
						} else if (plane == 0 && (((city == 6 || city == 11) && (i + 4) != 6 && (i + 4) != 11) || ((city != 6 && city != 11) && ((i + 4) == 6 || (i + 4) == 11)))) { // No plane to travel there
							td.css('text-align', 'center');
							td.html('<i>You can\'t fly to '+cities[i]+'</i>')
							tr.append(td);
							allProfits.push(0);
							bestBN.push([0, 0]);
						} else { //Nothing wrong, clear to go
							bestNarc = nCityprofit[i][0] < 0 ? 0 : nCityprofit[i].lastIndexOf(nCityprofit[i][0]); //best, if any, narc?
							profitNarc = (bestNarc == 0) ? 0 : nCityprofit[i][bestNarc]; //profit per unit
							profitNarc = profitNarc * narc;

							bestBooze = bCityprofit[i][0] < 0 ? 0 : bCityprofit[i].lastIndexOf(bCityprofit[i][0]); //best, if any, booze?
							profitBooze = (bestBooze == 0) ? 0 : bCityprofit[i][bestBooze]; //profit per unit
							profitBooze = profitBooze * booze;

							//calc travelcost
							travelPrices = [ //travelcosts from A to B
								[    0,   600, 10350, 1575,  3600, 1350,  1050, 10800], //det
								[  600,     0, 11025, 2025,  3000, 1725,  1425, 11400], //chi
								[10350, 11025,     0, 9075, 14025, 9450,  9750,  1875], //pal
								[ 1575,  2025,  9075,    0,  5025,  375,   675,  9375], //ny
								[ 3600,  3000, 14025, 5025,     0, 4650,  4350, 14400], //lv
								[ 1350,  1725,  9450,  375,  4650,    0,   300,  9750], //phi
								[ 1050,  1425,  9750,  675,  4350,  300,     0, 10050], //bal
								[10800, 11400,  1875, 9375, 14400, 9750, 10050,     0]  //cor
							];  //det   chi    pal    ny    lv     phi   bal    cor
							travelCost = travelPrices[i][(city - 4)];
							if (plane == 0) { //no plane => half travelcost
								travelCost /= 2;
							}

							//Our total profit in this city
							totalProfit = (profitNarc + profitBooze) - Math.round(travelCost);

							//save all profits in array for later
							if (totalProfit < 0) {
								bestBN.push([0, 0]); //push dummy to complete array
							}
							bestBN.push([bestNarc, bestBooze]);
							var wnarc = (bestNarc == 0)?0:bestNarc-1;
							var wbooze = (bestBooze == 0)?0:bestBooze-1;
							var narcsell = (BN[0][wnarc][0] * narc) * lex;
							var boozesell = (BN[1][wbooze][0] * booze) * lex;
							var pay = (Math.round(narcsell * [0, 0.11, 0.11, 0, 0.1][fam])+Math.round(boozesell * [0, 0.11, 0.11, 0, 0.1][fam])); // famless, member no capo, capo, top3, member with capo
							totalProfit = totalProfit - pay;
							allProfits.push(totalProfit);

							//What's the result
							if (totalProfit < 0) { //no profit :(
								td.css('text-align', 'center');
								td.html('<i>You won\'t make any profit in '+cities[i]+'</i>');
								tr.append(td);
							} else { //profit \o/
								td.html('&nbsp;'+cities[i])
								td.attr('colspan', '1');
								tr.append(td);
								tr.append(
									$('<td>').css({'border-left': '1px solid #000','border-bottom': '1px solid #000'}).html('&nbsp; '+boozenames[bestBooze]),
									$('<td>').css({'border-left': '1px solid #000','border-bottom': '1px solid #000'}).html('&nbsp; '+narcnames[bestNarc]),
									$('<td>').css({'border-left': '1px solid #000','border-bottom': '1px solid #000'}).html('&nbsp; $'+commafy(totalProfit))
								)

								if (on_page('smuggling.php') && nn == 'center') { //we need JS links @ smuggling and don't want to waste clicks
									key = [0, 4, 6, 1, 2, 3, 5]; //convert b/n - botprices order to smuggling order
									n1 = key[bestNarc-1];
									b1 = key[bestBooze-1];

									tr.append(
										$('<td>').css({'border-left': '1px solid #000','border-bottom': '1px solid #000'}).html('&nbsp;').append(
											$('<span>').attr({id: 'go'+i, n: n1, b: b1}).css({'font-weight': 'inherit', 'text-align': 'center', 'cursor': 'pointer'}).text('Go!').click(function () {
												fillBRC(parseInt($(this).attr('n'), 10), parseInt($(this).attr('b'), 10), 0)
											})
										)
									)
								} else { //we need to GET to smuggling too
									tr.append(
										$('<td>').css({'border-left': '1px solid #000','border-bottom': '1px solid #000'}).html('&nbsp;').append(
											$('<a>').attr({id: 'go'+i, href: 'http://www.barafranca.com/smuggling.php?n=' + (bestNarc - 1) + '&b=' + (bestBooze - 1)}).css({'font-weight': 'inherit', 'text-align': 'center', 'cursor': 'pointer'}).text('Go!')
										)
									)
								}
							}
						}
						table.append(tr);
					}
					// add lex row
					if(lex>1) {
						d = new Date();
						table.append(
							$('<tr>').append(
								$('<td>').attr('colspan', '5').css({'text-align': 'center', 'font-size': '10px'}).text('Lex Level: ' + parseInt((lex-1)*100, 10) + ' - Seen ' + ((d.getDay() != lexDay)?'1 Day ago':d.getHours() - lexHour + ' Hours ago'))
							)
						)
					}
					// add table to page
					if (on_page('prices.php') && nn == 'center') {
						if($('#brc').length == 0) {
							$('#game_container').append(
								$('<br />'),
								table
							)
						}
					} else {
						if($('#brc').length == 0) {
							$('#game_container').append(
								$('<br />'),
								table
							)
						}
					}
					// bold-ify Best Run
					bestRun = allProfits.lastIndexOf(Math.max.apply(null, allProfits));
					$('#brc > tbody > tr:eq(' + (3 + bestRun) + ')').css('font-weight', 'bold');

					if (on_page('smuggling.php') && nn == 'center') {
						function AF(sel,Xn,Xb) {
							n = -1;
							b = -1;
							//assemble info for AF
							inputs = $('input');
							bn_xp = 'form > table > tbody > tr:eq(0) > td';
							bn_text = $(bn_xp).html().split('|');

							cash = parseInt(bn_text[0].replace(/[^0-9.]/g, ''), 10);
							booze = parseInt(bn_text[1].replace(/[^0-9.]/g, ''), 10); //max amount user can carry
							narcs = parseInt(bn_text[2].replace(/[^0-9.]/g, ''), 10);

							b_amount = [0, 0, 0, 0, 0, 0, 0];
							n_amount = [0, 0, 0, 0, 0, 0, 0]; //what is user carrying
							var xpb = 'table.thinline > tbody > tr:eq(';
							var xpn = 'table.thinline:eq(1) > tbody > tr:eq(';
							for (i = 0; i <= 13; i++) { //define how much of this item is being carried
								if (i < 7 && !lbooze) {
									b_amount[i] = parseInt($(xpb + (i + 3) + ') > td:eq(2)').text(), 10);
								}
								if (i > 6 && !lnarcs) {
									n_amount[(i - 7)] = parseInt($(xpn + (i - 4) + ') > td:eq(2)').text(), 10);
								}
							}
							carry_n = array_sum(n_amount);
							carry_b = array_sum(b_amount); //how much is the user carrying already
							//which item do we want?
							key = [0, 4, 6, 1, 2, 3, 5];
							if (sel == 0) { //Calc for Best Run
								n = key[(bestBN[bestRun][0] - 1)]; //this trick works, even I'm amazed
								b = key[(bestBN[bestRun][1] - 1)];
							}
							if (sel == 1) { //CD Run
								for (i = 0; i <= 6; i++) {
									nItem = parseInt(BN[0][i][(city - 4 + 2)], 10);
									highNarc = ((i == 0) ? nItem : ((highNarc > nItem) ? highNarc : nItem));
									if (highNarc == nItem) {
										n = i;
									}
									bItem = parseInt(BN[1][i][(city - 4 + 2)], 10);
									highBooze = ((i == 0) ? bItem : ((highBooze > bItem) ? highBooze : bItem));
									if (highBooze == bItem) {
										b = i;
									}
								}
								n = key[n];
								b = key[b];
							}
							if (sel == 2) { //RP Run
								for (i = 0; i <= 6; i++) {
									nItem = parseInt(BN[0][i][(city - 4 + 2)], 10);
									lowNarc = ((i == 0) ? nItem : ((lowNarc < nItem) ? lowNarc : nItem));
									if (lowNarc == nItem) {
										n = i;
									}
									bItem = parseInt(BN[1][i][(city - 4 + 2)], 10);
									lowBooze = ((i == 0) ? bItem : ((lowBooze < bItem) ? lowBooze : bItem));
									if (lowBooze == bItem) {
										b = i;
									}
								}

								n = key[n];
								b = key[b];

								//don't fill in if we can't earn RP and AF would want to buy
								if(!lbooze) {
									if (!$('form > table > tbody > tr:eq(1) > td[align="center"]:eq(0)').text().match('NOW') && $('input[name="typebooze"]:eq(1)').prop('checked') === true) {
										b = -1;
									}
								}
								if(!lnarcs) {
									if (!$('form > table > tbody > tr:eq(1) > td[align="center"]:eq(1)').text().match('NOW') && $('input[name="typedrugs"]:eq(1)').prop('checked') === true) {
										n = -1;
									}
								}
							}
							if (sel == 3) { //None
								n = b = -1;
							}
							if (document.location.search != '') { //user manual override using external Go! link
								n = key[(GetParam('n'))];
								b = key[(GetParam('b'))];
							}

							//overrule with hotkeys [ ] =
							if(Xn) { var n = -1; }
							if(Xb) { var b = -1; }

							//we know our n and b => fill it in!
							fillBRC(n, b, sel);
						}
						AF(getInfo[5]);

						var AFtop = parseInt(getV('AFtop', '225'), 10);
						var AFleft = parseInt(getV('AFleft', '300'), 10);
						if(!$('#AF').length) {
							var top = (getInfo[6] == -1) ? '-95px' : '10px';
							$('#game_container').append(
								$('<div>').addClass('BRCinfo').attr({id: 'AF'}).css({top: AFtop, left: AFleft}).append(
									$('<center>').text('Auto-Fill').css('font-weight', 'bold'),
									$('<hr>').css({'color': 'gray'}),
									$('<span>').append(
										$('<input>').attr({id: 'brc0', type: 'radio', name: 'brc'}).click(function() {
											AF(0);
											try {
												setV('brcAF', 0);
											} catch (e) {}
										}),
										$('<a>').attr({id: 'a1', acceskey: '8', title: 'Fill in the most profitable b/n (Hotkey: 8 )'}).text('Best: (8)')
									),
									$('<span>').append(
										$('<br />'),
										$('<input>').attr({id: 'brc1', type: 'radio', name: 'brc'}).click(function() {
											AF(1);
											try {
												setV('brcAF', 1);
											} catch (e) {}
										}),
										$('<a>').attr({id: 'a2', acceskey: '9', title: 'Fill in the most expensive b/n (Hotkey: 9 )'}).text('CD: (9)')
									),
									$('<span>').append(
										$('<br />'),
										$('<input>').attr({id: 'brc2', type: 'radio', name: 'brc'}).click(function() {
											AF(2);
											try {
												setV('brcAF', 2);
											} catch (e) {}
										}),
										$('<a>').attr({id: 'a3', acceskey: '0', title: 'Fill in the cheapest b/n (Hotkey: 0 )'}).text('RP: (0)')
									),
									$('<span>').append(
										$('<br />'),
										$('<input>').attr({id: 'brc3', type: 'radio', name: 'brc'}).click(function() {
											AF(3);
											try {
												setV('brcAF', 3);
											} catch (e) {}
										}),
										$('<a>').attr({id: 'a4', acceskey: '-', title: 'Don\'t fill anything (Hotkey: - )'}).text('None: (-)')
									)
								)
							)
						}
						$(function() {
							$('#AF').draggable();
						});
						$('#AF').mouseup(function() {
							//alert('Set the x and y values using GM_getValue.');
							var divOffset = $("#AF").offset();
							var left = divOffset.left;
							var top = divOffset.top;
							setV('AFleft', left);
							setV('AFtop', top);
						});

						$('a#a1').attr('href', 'javascript:document.getElementById("brc0").click();');
						$('a#a2').attr('href', 'javascript:document.getElementById("brc1").click();');
						$('a#a3').attr('href', 'javascript:document.getElementById("brc2").click();');
						$('a#a4').attr('href', 'javascript:document.getElementById("brc3").click();');

						var mode = getV('brcAF', 0);

						var xp = 'form > table > tbody > tr:eq(0) > td';
						if($('#do_n').length == 0) {
							$(xp).append(
								$('<br />'),
								$('<span>').attr({id: 'do_n', title: 'AutoFill just narcs according to selected BRC mode (Hotkey: [ )', acceskey: '['}).css('cursor', 'pointer').text('Narcs'),
								$('<span>').text(' | '),
								$('<span>').attr({id: 'do_b', title: 'AutoFill just booze according to selected BRC mode (Hotkey: ] )', acceskey: ']'}).css('cursor', 'pointer').text('Booze'),
								$('<span>').text(' | '),
								$('<span>').attr({id: 'do_sell', title: 'Sell all you have (Hotkey: = )', acceskey: '='}).css('cursor', 'pointer').text('Sell All'),
								$('<br />')
							)
						}
						$('#do_n').click(function(){ AF(getV('brcAF', 0),0,1); });
						$('#do_b').click(function(){ AF(getV('brcAF', 0),1,0); });
						$('#do_sell').click(function(){ AF(4,1,1); });

						$('input#brc'+mode).prop('checked', true);
					}
				}
			}
			if (getV('bninfo', -1) > 0) { //do we have info data?
				//create infodiv to transfer data to XHR function
				narc = getPow('bninfo', 0, -1);
				booze = getPow('bninfo', 1, -1);
				city = getPow('bninfo', 2, -1);
				plane = getPow('bninfo', 3, -1);
				fam = getPow('bninfo', 4, -1);

				if($('#info').length == 0) {
					$('#game_container').append(
						$('<div>').attr('id', 'info').css('display', 'none').text(narc + '*' + booze + '*' + city + '*' + plane + '*' + fam + '*' + getV('brcAF', 0) + '*' + lex + '*' + lexHour + '*' + lexDay)
					)
				}

				//get all prices
				if (on_page('prices.php') && nn == 'center') { //prices are on the page
					for (BN = [], i = 0; i <= 1; i++) { //B/N
						for (BN[i] = [], j = 0; j <= 6; j++) { //type
							for (BN[i][j] = [], k = 0; k <= 7; k++) { //city
								BN[i][j].push(parseInt($('center:eq('+i+') > table > tbody > tr:eq('+(3+k)+') > td:eq('+(1+j)+')').text().replace(/[^0-9]/g, ''), 10));
							}
							BN[i][j].unshift(Math.min.apply(null, BN[i][j])); //get min
							BN[i][j].unshift(Math.max.apply(null, BN[i][j])); //get max
						}
					}
					appBRC(BN);
				} else {
					function parsePrices(resp, url) {
						parser = new DOMParser();
						dom = parser.parseFromString(resp, 'application/xml');

						for (BN = [], i = 0; i <= 1; i++) { //B/N
							for (BN[i] = [], j = 0; j <= 6; j++) { //type
								for (BN[i][j] = [], k = 0; k <= 7; k++) {
									BN[i][j].push(parseInt(dom.getElementsByTagName((i == 0 ? (narcnames[(j + 1)]).replace('abacco', 'obacco') : boozenames[(j + 1)]).toLowerCase())[k].textContent, 10)); //city
								}
								BN[i][j].unshift(Math.min.apply(null, BN[i][j])); //get min
								BN[i][j].unshift(Math.max.apply(null, BN[i][j])); //get max
							}
						}
						appBRC(BN); //send prices to BRC function
					}
					function grabHTML(url, func) {
						var r = 0;
						if (window.XMLHttpRequest) {
							r = new XMLHttpRequest();
						}
						r.onreadystatechange = function () {
							if (r.readyState == 4) {
								if (r.status == 200) {
									func(r.responseText, url);
								}
							}
						};
						r.open('GET', url, true);
						r.send(null);
					}
					grabHTML('http://' + document.location.hostname + '/BeO/webroot/index.php?module=API&action=smuggling_prices', parsePrices);
				}
			}

			if (on_page('prices.php') && nn == 'center') {
				noBRC = false; //asume working BRC table
				if (typeof BN == 'undefined') { //see if prices are grabbed already
					noBRC = true; //no BRC mean no need to try and HL 'em
					for (BN = [], i = 0; i <= 1; i++) { // B/N
						for (BN[i] = [], j = 0; j <= 6; j++) { // type
							for (BN[i][j] = [], k = 0; k <= 7; k++) { // city
								BN[i][j].push(parseInt($('center:eq('+i+') > table > tbody > tr:eq('+(3+k)+') > td:eq('+(1+j)+')').text().replace(/[^0-9]/g, ''), 10));
							}
							BN[i][j].unshift(Math.min.apply(null, BN[i][j])); //get min
							BN[i][j].unshift(Math.max.apply(null, BN[i][j])); //get max
						}
					}
				}
				for (i = 0; i <= 1; i++) {
					for (j = 0; j <= 6; j++) {
						for (k = 2; k <= 9; k++) {
							if (j == 0) { //add mouseover effects
								row = $('center:eq('+i+') > table > tbody > tr:eq('+(k+1)+')');
								row.attr('id', i+'row'+k);
								row.css('borderTop', '1px solid #000');
								row.hover(function(event) {
									$(this).css('backgroundColor', '#888');
									$('#'+(i ? 0 : 1)+'row'+k).css('backgroundColor', '#888');
								}, function(event) {
									$(this).css('backgroundColor', '#F0F0F0');
									$('#'+(i ? 0 : 1)+'row'+k).css('backgroundColor', '#F0F0F0');
								})
							}

							item = $('center:eq('+i+') > table > tbody > tr:eq('+(k+1)+') > td:eq('+(j+1)+')');
							item.css({'borderTop': '1px solid #000', 'text-align': 'center', 'width': '12%'});
							if (!(j % 2)) { //add colors to rows
								item.css('backgroundColor', '#B0B0B0');
							}
							if (BN[i][j][k] == BN[i][j][0]) { //HL max
								item.css('fontWeight', 'bold');
								item.css('color', '#FF0000');
							}
							if (BN[i][j][k] == BN[i][j][1]) { //HL min
								item.css('fontWeight', 'bold');
								item.css('color', '#16E54A');
							}
							if (j == 5 && i == 0) { //bold-ify cocaine
								item.css('fontWeight', 'bold');
							}
						}
					}
				}
			}
		}
//---------------- Smuggling ----------------
		if (on_page('smuggling.php') && nn == 'center') {
			var lbooze = 0, lnarcs = 0, lboth = 0, lex = 0;

			//check if lackeys on
			if ($('#game_container').html().match('/orourke.jpg') != null && $('#game_container').html().match('/freekowski.jpg') != null) {
				lboth = 1;
			}
			else if ($('#game_container').html().match('/orourke.jpg') != null) {
				lbooze = 1;
			}
			else if ($('#game_container').html().match('/freekowski.jpg') != null) {
				lnarcs = 1;
			}

			//get input fields
			inputs = $('input');
			bn_xp = 'form > table > tbody > tr:eq(0) > td';
			bn_text = $(bn_xp).html().split('<br>');

			var cash = parseInt(bn_text[3].replace(/[^0-9.]/g, ''), 10);
			var booze = parseInt(bn_text[4].match(/\d+/), 10); //max amount user can carry
			var narcs = parseInt(bn_text[5].match(/\d+/), 10);
			d = new Date();
			lexDay = d.getDay();
			lexHour = d.getHours();
			if(bn_text[6]) {
				lex = parseInt(bn_text[6].match(/\d+/), 10);
				setV('lex', lex);
				setV('lexHour', lexHour);
				setV('lexDay', lexDay);
			} else {
				setV('lex', 0);
				setV('lexHour', lexHour);
				setV('lexDay', lexDay);
			}

			b_amount = [0, 0, 0, 0, 0, 0]; //what is user carrying
			n_amount = [0, 0, 0, 0, 0, 0];

			var xpb = 'table.thinline > tbody > tr:eq(';
			var xpn = 'table.thinline:eq(1) > tbody > tr:eq(';

			if(!lboth) {
				for (var i = 0; i <= 13; i++) { //add click to fill stuff and hotkeys
					if (i < 7 && !lbooze) { //booze
						var x = i + 3;
						var bname = $(xpb + x + ') > td:eq(0)').text()
						b_amount[i] = parseInt($(xpb + x + ') > td:eq(2)').html(), 10); //define how much of this item is being carried
						$(xpb + x + ') > td:eq(0)').empty()
						$(xpb + x + ') > td:eq(0)').append(
							$('<span>').attr({id: 'bh'+i, index: i, acceskey: (i + 1), title: 'Fill in this booze (Hotkey: '+(i+1)+')'}).css('cursor', 'pointer').text((i + 1)+' '+bname).click(function() {
								var i = parseInt($(this).attr('index'), 10);
								var inpt = $('input[type="text"]')
								for(var j=0;j<=6;j++) {//reset form
									if (j!=i) {
										inpt[j+1].value = 0;
									}
								}
								var total = array_sum(b_amount);
								var missing = booze - b_amount[i];
								var value = inpt[(i + 1)].value;
								if (b_amount[i] == 0 && total < booze) {
									if (value == 0) {
										inpt[(i + 1)].value = booze;
										$('input[type="radio"]:eq(1)').prop('checked', true)
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (b_amount[i] == booze) {
									if (value == 0) {
										inpt[(i + 1)].value = booze;
										$('input[type="radio"]:eq(0)').prop('checked', true)
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (b_amount[i] < booze && total < booze) {
									if (value == 0) {
										inpt[(i + 1)].value = missing;
										$('input[type="radio"]:eq(1)').prop('checked', true)
									} else if (value == missing) {
										inpt[(i + 1)].value = b_amount[i];
										$('input[type="radio"]:eq(0)').prop('checked', true)
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (n_amount[i-9] > booze) {
									if (value == 0) {
										inpt[(i + 1)].value = b_amount[i];
										$('input[type="radio"]:eq(0)').prop('checked', true)
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (b_amount[i] < booze && total > booze){
									if (value == 0) {
										inpt[(i + 1)].value = b_amount[i];
										$('input[type="radio"]:eq(0)').prop('checked', true)
									} else {
										inpt[(i + 1)].value = 0;
									}
								}
								$('input#ver').focus();
							})
						)
					}
					if (i > 6 && !lnarcs) { //narcs
						var x = i - 4;
						var nname = $(xpn + x + ') > td:eq(0)').text()
						n_amount[(i - 7)] = parseInt($(xpn + x + ') > td:eq(2)').html(), 10); //define how much of this item is being carried
						$(xpn + x + ') > td:eq(0)').empty()
						$(xpn + x + ') > td:eq(0)').append(
							$('<span>').attr({id: 'nh'+i, index: i, title: 'Fill in this narc'}).css('cursor', 'pointer').text(nname).click(function() {
								var i = parseInt($(this).attr('index'), 10);
								var inpt = $('input[type="text"]')
								for(var j=0;j<=6;j++) {//reset form
									if (j!=i-7) {
										if(lbooze) {
											inpt[j].value = 0;
										} else {
											inpt[j+8].value = 0;
										}
									}
								}
								var total = array_sum(n_amount);
								var missing = narcs - n_amount[i-7];
								if(lbooze) {
									var value = parseInt(inpt[i-7].value, 10);
								} else {
									var value = parseInt(inpt[(i + 1)].value, 10);
								}
								if (n_amount[i-7] == 0 && total < narcs) {
									if (value == 0) {
										if(lbooze) {
											inpt[i-7].value = narcs;
											$('input[type="radio"]:eq(1)').prop('checked', true)
										} else {
											inpt[(i + 1)].value = narcs;
											$('input[type="radio"]:eq(3)').prop('checked', true)
										}
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (n_amount[i-7] == narcs) {
									if (value == 0) {
										if(lbooze) {
											inpt[i-7].value = narcs;
											$('input[type="radio"]:eq(0)').prop('checked', true)
										} else {
											inpt[(i + 1)].value = narcs;
											$('input[type="radio"]:eq(2)').prop('checked', true)
										}
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (n_amount[i-7] < narcs && total < narcs) {
									if (value == 0) {
										if(lbooze) {
											inpt[i-7].value = missing;
											$('input[type="radio"]:eq(1)').prop('checked', true)
										} else {
											inpt[(i + 1)].value = missing;
											$('input[type="radio"]:eq(3)').prop('checked', true)
										}
									} else if (value == missing) {
										if(lbooze) {
											inpt[i-7].value = n_amount[i-7];
											$('input[type="radio"]:eq(0)').prop('checked', true)
										} else {
											inpt[(i + 1)].value = n_amount[i-7];
											$('input[type="radio"]:eq(3)').prop('checked', true)
										}
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (n_amount[i-7] > narcs) {
									if (value == 0) {
										if(lbooze) {
											inpt[i-7].value = n_amount[i-7];
											$('input[type="radio"]:eq(0)').prop('checked', true)
										} else {
											inpt[(i + 1)].value = n_amount[i-7];
											$('input[type="radio"]:eq(3)').prop('checked', true)
										}
									} else {
										inpt[(i + 1)].value = 0;
									}
								} else if (b_amount[i] < narcs && total > narcs){
									if (value == 0) {
										if(lbooze) {
											inpt[i-7].value = n_amount[i-7];
											$('input[type="radio"]:eq(0)').prop('checked', true)
										} else {
											inpt[(i + 1)].value = n_amount[i-7];
											$('input[type="radio"]:eq(2)').prop('checked', true)
										}
									} else {
										inpt[(i + 1)].value = 0;
									}
								}
								$('input#ver').focus();
							})
						)
					}
				}
			}

			var inp = $('input[name="typebooze"], input[name="typedrugs"]');
			inp.each(function(){
				$(this).click(function() {
					if ($('input#ver').length) {
						$('input#ver').focus();
					}
				});
			});

			//visual fix
			if(lnarcs) {
				$('form > table > tbody > tr:eq(1) > td:eq(1)').prepend(
					$('<br />'),
					$('<br />')
				)
				$('table.thinline:eq(1)').append(
					$('<br />')
				)
			}
			if(lbooze) {
				$('form > table > tbody > tr:eq(1) > td:eq(0)').prepend(
					$('<br />'),
					$('<br />')
				)
				$('table.thinline:eq(0)').append(
					$('<br />')
				)
			}

			//create more efficient info text
			var str = $('<span>').text('Pocket: $ '+commafy(cash)+' | Booze: '+booze+' | Narcs: '+narcs+' | Lex: '+lex);
			$(bn_xp).html(str).append(
				$('<br />'),
				$('<a>').attr({href: 'prices.php', target: 'main'}).text('Current Booze/Narcotics Prices')
			)
			if(!lboth) {
				$('input#ver').focus(); //focus captcha field
			}
		}
//---------------- Crimes ----------------
		if (on_page('module=Crimes') && nn == 'br') {
			setTimeout(function () {
				$('input.option:last').prop('checked', true);
			},100);
		}
//---------------- Obay ----------------
		if (on_page('obay.php') && !on_page('specific') && nn == 'center') {
			$('table.thinline:eq(2) > tbody > tr').each(function() {
				if(['one','two','three'].indexOf($(this).attr('class')) > -1) { //this row has an object
					var sort_b = (on_page('type=11'))?1:0; //are we sorting on bullets?
					//add price per bullets
					if($(this).text().indexOf('bullets') != -1) {
						var bullets = parseInt($(this).find('td:eq('+(2-sort_b)+')').text().replace(/[^0-9.]/g, ''), 10);
						var money = parseInt($(this).find('td:eq('+(3-sort_b)+')').text().replace(/[^0-9.]/g, ''), 10);
						var ppb = parseInt(money/bullets, 10);
						$(this).find('td:eq('+(2-sort_b)+')').text($(this).find('td:eq('+(2-sort_b)+')').text()+' ($'+commafy(ppb)+')')
					}
				}
			})
		}
		if (on_page('obay.php?specific=') && nn == 'center') {
			$('input#anon:first').prop('checked', 'checked');
			$('input[type="submit"]').focus()
		}

//---------------- Garage ----------------
		if (on_page('garage.php') && nn == 'h2') {
			var rows = $('table.thinline > tbody > tr').length;
			var totVal = 0;
			var types = [['h', 8, 9, 13, 15, 16, 17, 18, 19, 21, 22, 27, 32, 34, 35, 40, 43], ['oc', 23, 25, 26, 28, 29, 30, 31, 33, 39, 41, 42], ['moc', 45, 47, 48], ['tr', 23, 47, 54]];
			$('tr.thinline').each(function() { //loop rows
				var carType = '';
				var carid = $(this).find('td:eq(0)').text();
				var car = $(this).find('td:eq(1)').find('a').attr('href').match(/\d*$/);
				var carVal = parseInt($(this).find('td:eq(3)').html().replace(',', '').replace('$', ''), 10); //get value
				totVal += carVal;
				$(this).click(function() {
					var check = $(this).find('input[value="'+carid+'"]');
					if(check.prop('checked') === false) {
						check.prop('checked', true)
					} else {
						check.prop('checked', false)
					}
				})
				$(this).find('input[value="'+carid+'"]').click(function() {
					if($(this).prop('checked') === false) {
						$(this).prop('checked', true)
					} else {
						$(this).prop('checked', false)
					}
				})
			})
			//add amount of bullets
			var head = $('h2');
			var cars = head.text().match(/\d+/g)[2];
			if(cars>0){
				head.append(
					$('<span>').text(' | Potential Bullets: '+cars*12)
				)
			}
			//add amount of money
			if(totVal>0){
				head.append(
					$('<span>').text(' | Total car value of this page: $'+commafy(totVal))
				)
			}
			// scrolldown link
			$('<div>').css({float: 'right', cursor: 'pointer'}).append(
				$('<span>').text('Scroll down').click(function() {
					$('html').animate({scrollTop: $('#game_wrapper_master').height()}, 1000);
				})
			).insertBefore('table.thinline')
			// show footerdiv only when last tr is not visible
			$(window).scroll(function() {
				if(isVisible($('#game_container').find('tr:eq('+(rows-1)+')'))) {
					$('#footer').css('display', 'none');
				} else {
					$('#footer').css('display', 'block');
				}
			});
			// add footerdiv only window is bigger then 1024px
			if(window.innerWidth>1024) {
				$('center').append(
					$('<div>').attr({id: 'footer'}).css({'position': 'fixed', 'bottom': '0px', 'background': '#F0F0F0', 'border': '1px solid black', 'width': '70%', 'color': '#000'}).html($('tr:has(input[name="shipcity"])').html())
				)
			}
			$('tr:has(input[name="shipcity"])>td').append(
				$('<select>').attr({id: 'selsort'}).append(
					$('<option>').attr('value', '0').text('-----'),
					$('<option>').attr('value', '1').text('Above'),
					$('<option>').attr('value', '2').text('Below')
				),
				$('<input>').attr({type: 'text', id: 'selval', size: '9'}),
				$('<input>').attr({type: 'button', id: 'selgo', value: 'Select'}).click(function() {
					if($('#selval').val() != '' && $('#selsort').val()!= '-----') {
						var sort = $('#selsort').val();
						var val = $('#selval').val();
						$('tr.thinline').each(function() { //loop rows
							var carid = $(this).find('td:eq(0)').text();
							var carVal = parseInt($(this).find('td:eq(3)').html().replace(',', '').replace('$', ''), 10); //get value
							var check = $(this).find('input[value="'+carid+'"]');
							if(check.prop('checked') === true) {
								check.prop('checked', false)
							}
							if((carVal>val && sort == 1)||(carVal<val && sort == 2)) {
								check.prop('checked', true)
							}
						})
					}
				})
			)
		}
//---------------- quick lookup ----------------
		if (on_page('user.php') && nn == 'span') {
			var input = GetParam('nick');
			var str = (v=='nl'?'Deze speler bestaat niet':'This user does not exist');
			if($('#game_container:contains('+str+')').length && input != false){
				setTimeout(function () { //needed because $.get only works on same domain
					GM_xmlhttpRequest({ //grab data from xml
						method: 'GET',
						url: 'http://rix.omertabeyond.com/obxml/quicklookup.xml.php?v='+v+'&input='+input,
						onload: function(resp){
							var parser = new DOMParser();
							var xml = parser.parseFromString(resp.responseText, 'application/xml');
							var total = xml.getElementsByTagName('totalresults')[0].textContent;
								$('#game_container').html(str+': '+input);
							if(input.length<3){
								$('#game_container').html(str+': '+input+'<br />This will give too many results. Try to be more specific.');
							}
							else if(total!='0'){
								$('#game_container').html((total<=50)?str+': '+input+'<br />Maybe this is what you were looking for:<br />':str+': '+input+'<br />Maybe this is what you were looking for:<br />Total results: '+total+' Showing first 50 results<br />');
								var num = (total<=50)?total:50;
								for(var i=0;i<num;i++){
									var results = xml.getElementsByTagName('name')[i].textContent;
									$('#game_container').html($('#game_container').html()+'<br /><a href="user.php?nick='+results+'" id="'+i+'" class="sel">'+results+'</a>');
								}
								$('#0').focus();
								var j = 0;
								$(window).keydown(function(event){ if(event.keyCode == 40) { if(j<num-1) { j++; $('#'+j).focus(); } } });
								$(window).keydown(function(event){ if(event.keyCode == 38) { if(j!=0) { j--; $('#'+j).focus(); } } });
							} else {
								$('#game_container').html(str+': '+input+'<br />Sorry, we also couldn\'t find any alternatives.');
							}
						}
					});
				},100);
			}
		}
// Kill page
		if (on_page('module=Detectives') && nn == 'div') {
			if(nid=='wrappertest') {
				if(GetParam('search')) {
					$('input[name="target"]').val(GetParam('search'))
				}
			}
		}
//end
	}, true);
}

/*
* Notifications trigger
*/

$('#game_container').one('DOMNodeInserted', function() {
	setTimeout(function() {
		CheckBmsg();
	}, 1000);
});

/*
* Prices in topbar
*/

$('#omerta_bar').one('DOMNodeInserted', function() {
	function buildMarquee() {
		setTimeout(function() {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.barafranca.com/BeO/webroot/index.php?module=API&action=smuggling_prices',
				onload: function(resp){
					var parser = new DOMParser();
					var dom = parser.parseFromString(resp.responseText, 'application/xml');

					function getPrice(drug, city) {
						return dom.getElementsByTagName(drug)[city].textContent;
					}
					function refreshMarquee(h,m) {
						h = (m>=31?h+1:h);
						m = (m>=31?1:31);
						var d = new Date();
						d.setHours( h );
						d.setMinutes( m );
						d.setSeconds( 0 );
						d.setMilliseconds( 0 );
						return ( d.getTime() - unsafeWindow.omerta.server.clock.getTime() ) ;
					}

					var p = [];
					var q = [];

					for (i=0;i<=7;i++){ p[i]=getPrice('cocaine', i); q[i]=p[i]; }

					var max = p.sort( function(a, b){ return b-a; } )[0];
					var min = p[(p.length-1)];

					i=0;
					q.forEach(function($n){
						if($n==min){
							q[i] = '<span style="color:#00ff00;">' + $n + '</span>';
						}
						if($n==max){
							q[i] = '<span style="color:#ff0000;">' + $n + '</span>';
						}
						i++;
					});

					var time = dom.getElementsByTagName('humantime')[0].textContent;
					time = time.split(' ')[0];
					time = time.split(':');
					time = (time[1]<30)?time[0]+':00 OT':time[0]+':30 OT';

					function hovermenu(city, x) {
						$('#hiddenbox').css({display: 'inline', left: x}).html('Morphine: ' + getPrice('morphine', city) + ' | ' + 'Heroin: ' + getPrice('heroin', city) + ' | ' + 'Opium: ' + getPrice('opium', city) + ' | ' + 'Whiskey: ' + getPrice('whiskey', city) + ' | ' + 'Amaretto: ' + getPrice('amaretto', city) + ' | ' + 'Rum: ' + getPrice('rum', city))
					}

					function flytolink(city, priceStr, priceToFly, cityId) {
						var mycity = getPow('bninfo', 2, -1);
						var link = $('<a>').attr({id: cities[city], href: '#'}).css({color: '#FFF', fontSize: '10px'}).click(function () {
							if (mycity-4 == city) {
								alert('You are already staying in this city!');
							} else if (confirm('Are you sure you want to travel to ' + cities[city] + '?')) {
								window.location = '#/BeO/webroot/index.php?module=Travel&action=FetchInfo&CityId='+((city == 'nul') ? 0 : city)+'&travel=yes';
							}
						});

						if (city == 5 || city == 6 || city == 7) {
							link.mouseover(function(event) {
								hovermenu(city, event.clientX - 560);
								$(this).css('textDecoration', 'underline')
							});
						} else if (city == 0 || city == 1 || city == 2) {
							link.mouseover(function(event) {
								hovermenu(city, event.clientX + 25);
								$(this).css('textDecoration', 'underline')
							});
						} else {
							link.mouseover(function(event) {
								hovermenu(city, event.clientX - 200);
								$(this).css('textDecoration', 'underline')
							});
						}
						link.mouseout(function(event) {
							$('#hiddenbox').css('display', 'none');
							$(this).css('textDecoration', 'none')
						});
						link.html(priceStr);
	
						return link;
					}

					var span = $('<span>').append(
						$('<span>').text(time+' : ')
					)

					i=0;
					p.forEach(function($n){
						span.css('color', '#FFF')
						span.append(flytolink(i, cities[i]+':'+q[i], 500, i), $('<span>').text(' | '))
						i++;
					});

					span.append(
						$('<a>').attr({href: 'http://gm.omertabeyond.com/prices.php?v='+v, target: 'main'}).text('All Prices').css({color: '#FFF', fontSize: '10px'}).hover(function() {
							$(this).css('textDecoration', 'underline')
						}, function() {
							$(this).css('textDecoration', 'none')
						})
					)

					$('#marquee').html(span)
					setTimeout(buildMarquee, refreshMarquee(new Date().getHours(),new Date().getMinutes()));
				}
			});
		});
	}

	$('.menu > ul').append(
		$('<li>').addClass('right').append(
			$('<div>').attr('id', 'marquee').css({align: 'center', width: '100%', paddingTop: '5px'}),
			$('<div>').attr('id', 'hiddenbox').addClass('marqueebox')
		)
	)

	buildMarquee();

	city = getPow('bninfo', 2, -1);
	if(city > 0){
		city = cities[city-4];
		$('#'+city).css('font-style', 'italic')
	}
});

/*
* Menu listener
*/

$('#game_menu').one('DOMNodeInserted', function() {
	//change all users link
	$('a[href*="/allusers.php"]').attr('href', '/allusers.php?start=0&order=lastrank&sort=DESC&dead=HIDE');

	//add beyond menu
	var a = $('<a>').addClass('link').attr({'href': '#', 'data-box': 'true'}).append(
		$('<span>').addClass('title').css('background', 'url("https://raw.github.com/OmertaBeyond/OBv2/master/images/favicon.png") no-repeat scroll left center transparent').text('Beyond'),
		$('<span>').addClass('menu_open')
	);
	var div = $('<div>').addClass('menu').append(
		$('<span>').css({'color': 'rgb(255, 255, 255)', 'display': 'block', 'font-size': '11px', 'margin': '0px', 'padding': '3px 15px', 'text-decoration': 'none', 'cursor': 'pointer'}).text('Preferences').click(function() {
			$('#game_container').empty();
			$('#game_container').append(prefs_page);
		}),
		$('<span>').css({'color': 'rgb(255, 255, 255)', 'display': 'block', 'font-size': '11px', 'margin': '0px', 'padding': '3px 15px', 'text-decoration': 'none', 'cursor': 'pointer'}).text('Live Famstats').click(function() {
			window.open(OB_RIX_WEBSITE + '/stats.php?v='+v+'&d=n');
		})
	);

	$('a.link:eq(2)').before(a)
	$('a.link:eq(3)').before(div)
	
	var getnews = (getV('bmsgNews', 0)==0?false:true);
	var getdeaths = (getV('bmsgDeaths', 0)==0?false:true);

	var prefs_page = $('<div>').attr({id: 'prefsDiv'}).css({border: '1px solid red'}).append(
		$('<div>').attr({id: 'bmsgDiv'}).css({border: '1px solid blue', width: '250px'}).append(
			$('<div>').attr('id', 'Authmsg'),
			$('<button>').text('Authorize for notifications').click(function() {
				var rex = new RegExp(/Firefox\/([0-9]+)\./);
				var r = navigator.userAgent.match(rex);
				if(r[1] !== '22') $('#Authmsg').text('You need Firefox 22.0 to use this feature, update your browser!');
				Notification.requestPermission(function(perm) {
					$('#Authmsg').text('Authorization for notication is: '+perm);
				})
			}),
			$('<br>'),
			$('<input>').attr({id: 'ts', type: 'text', placeholder: 'timestamp'}),
			$('<button>').text('Show deaths').click(function() {
				setV('lastbmsg', $('#ts').val());
			}),
			$('<br>'),
			$('<input>').attr({id: 'deaths', type: 'checkbox', checked: getdeaths}).click(function() {
				setV('bmsgDeaths', $('#deaths:checked').length);
			}),
			$('<label>').attr('for', 'deaths').text('Deaths'),
			$('<br>'),
			$('<input>').attr({id: 'news', type: 'checkbox', checked: getnews}).click(function() {
				setV('bmsgNews', $('#news:checked').length);
			}),
			$('<label>').attr('for', 'news').text('News')
		)
	); //here we can build prefs page
});

/*
* Info grabber
*/

var d = new Date();//check once every hour for new info
if(getV('nick', '') == '' || getV('bninfo', -1) == -1 || getV('brcDate', -1) != d.getHours()) {
	$.get('/information.php', function(data) {
		var a = data.split('<tbody');
		if(a[2]){ // fails on clicklimit or other error
			$('#game_wrapper').append(
				$('<div>').css('display', 'none').attr('id', 'str2dom').html(data)
			)
			bnUpdate(0);//call update fucntion
			$.get('/user.php?nick='+getV('nick', ''), function(data) {
				var a = data.split('<script');
				$('#game_wrapper').append(
					$('<div>').css('display', 'none').attr('id', 'xhr').html(a[0])
				)
				if($('#xhr').length) {
					var role = 1;//default is in a family
					var pos = $('span#position').attr('value');
					var fam = ($('span#family > a').length?$('span#family > a').text():$('span#family').text());
					var hascapo = ($('span#capo').length)?1:0;
					if(/None|Geen/.test(fam)){
						role = 0;
					} else {
						if(/Capo (of|van):/.test(pos)){
							role = 2;
						}
						if(/(Sottocapo|Consiglieri|Don) (of|van):/.test(pos)){
							role = 3;
						}
						if(hascapo) {
							role = 4;
						}
					}
					setV('family',fam);
					setPow('bninfo',4,role);//save
				}
				var d = new Date();//set check date
				setV('brcDate', d.getHours());
			});
		}
	});
}

// Add focus on front page
$('input[name="email"]').focus();

// Replace Omerta's favicon
$('<link rel="shortcut icon" type="image/x-icon"/>').appendTo('head').attr('href', GM_getResourceURL('favicon'));

// Replace Omerta's logo
$('#game_header_left').children('img').attr('src', GM_getResourceURL('logo'));

GM_addStyle(GM_getResourceText('css'));