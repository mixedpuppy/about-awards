about:awards
===============

This is experimental software, expect glitches and incomplete features.

This is a small experimental project I started up in reaction to sites like AwardWallet, etc.
that ask users for their username and passwords to all of their travel award programs.  While
I do not feel these sites are evil, I do feel they take the wrong approach and are sacrificing
the security of their users.  Recently AwardWallet has taken a similar approach in order to
work around American Airlines blocking their service.  Both that effort and this experiment show
that there is no reason why travel sites like AwardWallet should be asking users for their accounts
on other sites.

You can see a screenshot at https://github.com/mixedpuppy/about-awards/blob/master/addon/about-awards.png

This addon uses the password manager in Firefox to discover what award programs you are a member of,
and will automatically list them on the page.  You need to click 'refresh' to retreive the data.  If
a program you have does not appear, you can use the dropdown menu at the upper left corner to add
any supported award program.

Currently supported award programs include:

* Aeroplan
* Alaska Air
* American Airlines
* Club Carlson
* Marriott
* Priority Club
* Starwood
* United Airlines

If you are interested in adding more, and know some amount of JavaScript, you may contact me for
some guidance.

Installation
===============

I may get around to pushing this up onto addons.mozilla.org, however for now you may download
the addon from https://github.com/mixedpuppy/about-awards/raw/master/addon/awards.xpi

Once you have downloaded it, open it in firefox to install, then in the URL bar, enter "about:awards".

Developers can continue with the instructions below.

PreRequisite
===============

* Firefox
* Python
* Git
* make

Getting setup
=====================

To pull and run:
  
    git clone https://github.com/mixedpuppy/about-awards
    cd about-awards
    make pull
    make run
  
You can build an xpi:

    make xpi
  
You can run the tests:

    make test
  

If you want to run (using make run) in a specific profile:

    FIREFOX_PROFILE=/path/to/firefox/profile make run
  
Tests cannot be run in a specific profile.


Prepare your firefox profile
-----------------------------

You probably want a test firefox profile so open up the [Profile Manager](http://kb.mozillazine.org/Profile_manager).

In the Mac:

    /Applications/Firefox.app/Contents/MacOS/firefox -ProfileManager

On Windows:

    firefox.exe -P

In the profile manager, create a profile with the name `awardstest`, then exit the profile manager.
