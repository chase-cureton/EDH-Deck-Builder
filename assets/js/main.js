/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Search
		var $search = $('#name');
		var $results = $('#card-results-section');

		$search.on('keyup', function(e) {
			if (e.keyCode == 13) {
				var http = new XMLHttpRequest();

				http.onreadystatechange = function() {
					if (this.readyState==4 && this.status==200) {
						$results.empty();

						var cardList = JSON.parse(this.responseText);

						//mustache to template these...
						cardList.forEach(function(item, index) {
							if (item['ImageUrl'] != null) {
								var article = $('<article>');

								var span = $('<span>');
								span.addClass('image');

								var img = $('<img id="card-image-' + index + '" src="' + item['ImageUrl'] + '">');

								span.append(img);
								article.append(span);

								var section = $('<section id="card-' + index + '-button-section" imageurl="'+ item['ImageUrl'] +'">');

								var cmdBtn = $('<button id="card-' + index +'-cmd-button">');
								cmdBtn.append('Make Commander');

								var deckBtn = $('<button id="card-' + index +'-deck-button">');
								deckBtn.append('Add to Deck')

								section.append(cmdBtn);
								section.append(deckBtn);

								article.append(section);

								$results.append(article);
								
								cmdBtn.on('click', function(event) {
									var $parentElement = document.getElementById(event.currentTarget.parentElement.id);
									var imageUrl = $parentElement.getAttribute('imageurl');
					
									$('#commander-image').prop('src', imageUrl);

									$('#left-menu-button').click();
								});
							}
						});
					}
				};

				var url = "https://vol4sqhda6.execute-api.us-east-1.amazonaws.com/Prod/mtg-services/searchcards";

				//Content Filter
				if ($('#name-radio').prop('checked')) {
					var requestDto = {
						'NameFilter': $search.val()
					}
				}
				else {
					var requestDto = {
						'TextFilter': $search.val()
					}
				}

				//Color Filter
				var colorInput = {};

				if ($('#filter-red').prop('checked'))
					colorInput["R"] = true;

				if ($('#filter-white').prop('checked'))
					colorInput["W"] = true;

				if ($('#filter-blue').prop('checked'))
					colorInput["U"] = true;

				if ($('#filter-black').prop('checked'))
					colorInput["B"] = true;

				if ($('#filter-green').prop('checked'))
					colorInput["G"] = true;

				requestDto["ColorFilter"] = colorInput;


				//Mana Cost Filter
				var manaInput = {};

				$('#mana-filter-section').children('input').each(function(index) {
					if ($('#m' + index).prop('checked'))
						manaInput[index] = true;
					else
						manaInput[index] = false;
				});

				requestDto['ManaCostFilter'] = manaInput;

				//Base Type Filter
				var typeInput = {}

				if ($('#creature-filter').prop('checked'))
					typeInput["Creature"] = true;

				if ($('#enchant-filter').prop('checked'))
					typeInput["Enchantment"] = true;

				if ($('#artifact-filter').prop('checked'))
					typeInput["Artifact"] = true;

				if ($('#planeswalker-filter').prop('checked'))
					typeInput["Planeswalker"] = true;

				if ($('#land-filter').prop('checked'))
					typeInput["Land"] = true;

				if ($('#instant-filter').prop('checked')) {
					typeInput["Instant"] = true;
					typeInput["Interrupt"] = true;
				}

				if ($('#sorcery-filter').prop('checked')) 
					typeInput["Sorcery"] = true;

				requestDto['BaseTypeFilter'] = typeInput;
				
				http.open('POST', url, true);

				http.setRequestHeader('Content-Type', 'application/json');

				http.send(JSON.stringify(requestDto));
			}
		});

	//Card Results (Will need to be done for each card result)

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});
	
	// Left Menu.
		var $menuLeft = $('#menu-left');

		$menuLeft.wrapInner('<div class="inner"></div>');

		$menuLeft._locked = false;

		$menuLeft._lock = function() {

			if ($menuLeft._locked)
				return false;

			$menuLeft._locked = true;

			window.setTimeout(function() {
				$menuLeft._locked = false;
			}, 350);

			return true;

		};

		$menuLeft._show = function() {

			if ($menuLeft._lock())
				$body.addClass('is-left-menu-visible');

		};

		$menuLeft._hide = function() {

			if ($menuLeft._lock())
				$body.removeClass('is-left-menu-visible');

		};

		$menuLeft._toggle = function() {

			if ($menuLeft._lock())
				$body.toggleClass('is-left-menu-visible');

		};

		$menuLeft
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', '#deck-details-button', function(event) {
				var modal = document.getElementById('deck-modal');
				var span = document.getElementsByClassName('close')[0];

				modal.style.display = "block";
			})
			.append('<a class="close" href="#menu-left">Close</a>');

		$body
			.on('click', 'a[href="#menu-left"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menuLeft._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menuLeft._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menuLeft._hide();

			});		

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.on('click', '#add-metric-button', function(event) {
				var $metricTable = $('#metric-table');

				var tr = $('<tr>');
				var tdName = $('<td>');

				var nameSelect = $('<select class="metric">')

				$.getJSON('keywords.json', function(json) {
					json.Keywords.forEach(function(item, index) {
						var option = $('<option>');
						option.append(item);

						nameSelect.append(option);
					});
				});

				tdName.append(nameSelect);
				tr.append(tdName);

				var tdTarget = $('<td>');

				var targetSelect = $('<select class="metric-set">');

				for(i = 1; i < 16; i++) {
					var option = $('<option value="' + i + '">');
					option.append(i);

					targetSelect.append(option);
				}

				tdTarget.append(targetSelect);
				tr.append(tdTarget);

				var tdActual = $('<td>');

				var actualInput = $('<input class="metric-count" value="' + 1 + '">');

				tdActual.append(actualInput);
				tr.append(tdActual);

				$metricTable.append(tr);
			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);