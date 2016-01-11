![OBv2](images/logo.png "Omerta Beyond v2")

[![GitHub version](https://badge.fury.io/gh/OmertaBeyond%2FOBv2.svg)](https://github.com/OmertaBeyond/OBv2/releases)
[![Repo Size](https://reposs.herokuapp.com/?path=OmertaBeyond/OBv2)](https://github.com/OmertaBeyond/OBv2/archive/master.zip)
[![Linux Build Status](https://img.shields.io/travis/OmertaBeyond/OBv2/master.svg?label=Linux%20build)](https://travis-ci.org/OmertaBeyond/OBv2)
[![Windows Build Status](https://img.shields.io/appveyor/ci/vBm/OBv2/master.svg?label=Windows%20build)](https://ci.appveyor.com/project/vBm/obv2)
[![Codacy Badge](https://img.shields.io/codacy/3b9bd8fcf7254a0f86bcc5db152a39a5.svg)](https://www.codacy.com/public/OmertaBeyond/OBv2)
[![devDependency Status](https://img.shields.io/david/dev/OmertaBeyond/OBv2.svg)](https://david-dm.org/OmertaBeyond/OBv2#info=devDependencies)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg)](http://opensource.org/licenses/GPL-3.0)

# About

Omerta Beyond is, simply, an userscript for the MMORPG [Omerta](http://www.barafranca.com).

This is complete rewrite of our old script [OmertaBeyond v1](https://github.com/OmertaBeyond/OmertaBeyond)


# Compatibility

At the moment OB is compatible with:

* Firefox (fully working)
  * [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  * [Scriptish](https://addons.mozilla.org/en-US/firefox/addon/scriptish/)
* Google Chrome/Opera Next (fully working)
 * [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
* Opera 12 (semi working)
 * [ViolentMonkey](https://addons.opera.com/en/extensions/details/violent-monkey/)
* Safari
 * [TamperMonkey](https://extensions.apple.com/details/?id=net.tampermonkey.safari-G3XV72R5TC)
* Dolphin
 * [TamperMonkey](https://play.google.com/store/apps/details?id=net.tampermonkey.dolphin)
  * Note: minimum 1GB RAM and a fast dual-core CPU is recommended

Works on:
 * .com
 * .nl
 * .dm
 * .gen.tr (missing some features like logger)
 * .pt (not fully tested)

Note: if you have time/knowledge, help us to make it fully working/compatible.


# Team

* Active
 * [vBm](https://github.com/vBm) - Founder, Minor code tweaks
 * [Rix](https://github.com/Gwildor) - Admin, Developer
 * [MrWhite](https://github.com/Ivdbroek85) - Admin, Developer
 * [MurderInc](https://github.com/baelor) - Admin, Developer
 * [Brainscrewer](https://github.com/Brainscrewer) - Code contributor
 * [Sebbe](https://github.com/Sebbe) - Code contributor
* Inactive
 * [Dopedog](https://github.com/TheDopedog) - Admin, Developer
 * [sbanks](https://github.com/susanbanks) - Admin, Website

Many thanks to everyone who supported development without having direct push access.

[OmertaBeyond](http://www.omertabeyond.net/) © 2007-2016 (info@omertabeyond.com)


# Info

You can find us at:

 * [**#beyond**](irc://irc.barafranca.com/beyond "irc://irc.barafranca.com/beyond") on Barafranca network.
 * [news.omertabeyond.net](http://news.omertabeyond.net)
 * [Facebook](http://www.facebook.com/OmertaBeyond)
 * [Twitter](http://twitter.com/omertabeyond)


# How to contribute

* Install [Node.js](http://nodejs.org/download/)
* Install grunt: `npm install -g grunt-cli`
* Install the Node.js dependencies via npm: `npm install`
* Hack and poke around the source
* Run `grunt` to check source with `jscs`, `jshint`, `csslint` and `lintspaces`
* Open `Pull Request` for review :-)
