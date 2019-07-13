(IN DEV) Front-end for the EDH Deck Building Tool.

Features:
- Card Search (Categories)
	1.) Name
	2.) Card Text
	3.) Keywords (In Dev)
		- Ex. 
	* Card search includes filters for mana cost and (in dev) color
	
- Deck Building
	* Ability to select a commander from search card results and store as part of deck.
		* Once commander is selected, card search filters will automatically be applied for color identity. This is to 
		  ensure that all cards selected for a deck are valid EDH cards.
	* Ability to drag and drop card results into the deck being constructed. As cards are added, the underlying metrics for the 
	  cards are counted and displayed to the user. Ex. After adding several removal spells to a deck, upon searching Keywords
	  for "Removal", the deck metrics displayed on the right will show how many creature/enchant/artifact/planeswalker/land removal 
	  spells are in the deck. This is done for all sorts of metrics, from mana ramp to card draw.
	* Ability to save decks and edit at a later time.
	* Show graphs on mana curve / color devotion / etc..
	* Future Goal:
		* Include the ability to generate cart with CardKingdom / TCG Player from built deck.


CREDITS:

(BUILT USING): Phantom by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

This is Phantom, a simple design built around a grid of large, colorful, semi-interactive
image tiles (of which you can have as many or as few as you like). Makes use of some
SVG and animation techniques I've been experimenting with on that other project of mine
you may have heard about (https://carrd.co), and includes a handy generic page for whatever.

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use for pretty much whatever.

(* = not included)

AJ
aj@lkn.io | @ajlkn


Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Responsive Tools (github.com/ajlkn/responsive-tools)
