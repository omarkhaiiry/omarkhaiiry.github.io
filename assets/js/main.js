/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch mode.
	if (browser.mobile)
		$body.addClass('is-touch');

	// Scrolly links.
	$('.scrolly').scrolly({
		speed: 2000
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		alignment: 'right',
		hideDelay: 350
	});

	// Nav.

	// Title Bar.
	$(
		'<div id="titleBar">' +
		'<a href="#navPanel" class="toggle"></a>' +
		'<span class="title">' + $('#logo').html() + '</span>' +
		'</div>'
	)
		.appendTo($body);

	// Panel.
	$(
		'<div id="navPanel">' +
		'<nav>' +
		$('#nav').navList() +
		'</nav>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'navPanel-visible'
		});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
	if (browser.name == 'ie'
		|| browser.mobile) {

		$.fn._parallax = function () {

			return $(this);

		};

	}
	else {

		$.fn._parallax = function () {

			$(this).each(function () {

				var $this = $(this),
					on, off;

				on = function () {

					$this
						.css('background-position', 'center 0px');

					$window
						.on('scroll._parallax', function () {

							var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

							$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

						});

				};

				off = function () {

					$this
						.css('background-position', '');

					$window
						.off('scroll._parallax');

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

			return $(this);

		};

		$window
			.on('load resize', function () {
				$window.trigger('scroll');
			});

	}

	// Spotlights.
	var $spotlights = $('.spotlight');

	$spotlights
		._parallax()
		.each(function () {

			var $this = $(this),
				on, off;

			on = function () {

				var top, bottom, mode;

				// Use main <img>'s src as this spotlight's background.
				$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

				// Side-specific scrollex tweaks.
				if ($this.hasClass('top')) {

					mode = 'top';
					top = '-20%';
					bottom = 0;

				}
				else if ($this.hasClass('bottom')) {

					mode = 'bottom-only';
					top = 0;
					bottom = '20%';

				}
				else {

					mode = 'middle';
					top = 0;
					bottom = 0;

				}

				// Add scrollex.
				$this.scrollex({
					mode: mode,
					top: top,
					bottom: bottom,
					initialize: function (t) { $this.addClass('inactive'); },
					terminate: function (t) { $this.removeClass('inactive'); },
					enter: function (t) { $this.removeClass('inactive'); },

					// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

					//leave:	function(t) { $this.addClass('inactive'); },

				});

			};

			off = function () {

				// Clear spotlight's background.
				$this.css('background-image', '');

				// Remove scrollex.
				$this.unscrollex();

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

	// Wrappers.
	var $wrappers = $('.wrapper');

	$wrappers
		.each(function () {

			var $this = $(this),
				on, off;

			on = function () {

				$this.scrollex({
					top: 250,
					bottom: 0,
					initialize: function (t) { $this.addClass('inactive'); },
					terminate: function (t) { $this.removeClass('inactive'); },
					enter: function (t) { $this.removeClass('inactive'); },

					// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

					//leave:	function(t) { $this.addClass('inactive'); },

				});

			};

			off = function () {
				$this.unscrollex();
			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

	// Banner.
	var $banner = $('#banner');

	$banner
		._parallax();


	// AJAX Form Handling
	$('form').on('submit', function (e) {
		e.preventDefault();
		var $this = $(this);

		// Disable button to prevent double submit
		$this.find('input[type="submit"], button').prop('disabled', true).addClass('disabled');

		$.ajax({
			url: $this.attr('action'),
			method: 'POST',
			data: $this.serialize(),
			dataType: 'json',
			headers: {
				'Accept': 'application/json'
			}
		}).done(function () {
			$this[0].reset();
			// Show Modal
			$('#success-modal').fadeIn();
		}).fail(function () {
			alert('Oops! Something went wrong. Please check your internet connection and try again.');
		}).always(function () {
			// Re-enable button
			$this.find('input[type="submit"], button').prop('disabled', false).removeClass('disabled');
		});
	});

	// Modal Close Logic
	var $modal = $('#success-modal');
	var $closeBtn = $('#close-modal-btn');
	var $closeSpan = $('.close-modal');

	$closeBtn.on('click', function () {
		$modal.fadeOut();
	});

	$closeSpan.on('click', function () {
		$modal.fadeOut();
	});

	$(window).on('click', function (event) {
		if ($(event.target).is($modal)) {
			$modal.fadeOut();
		}
	});

	// Video Autoplay Handler
	// Handle autoplay restrictions by attempting to play video after user interaction
	var videoPlayed = false;
	var $video = $('#two video');

	function playVideo() {
		if ($video.length && !videoPlayed) {
			$video[0].play().then(function () {
				videoPlayed = true;
				console.log('Video started playing');
			}).catch(function (error) {
				console.log('Video autoplay prevented:', error);
			});
		}
	}

	// Try to play on load
	$window.on('load', function () {
		setTimeout(playVideo, 500);
	});

	// Try to play when section comes into view
	if ($video.length) {
		$(window).on('scroll', function () {
			var videoTop = $video.offset().top;
			var videoBottom = videoTop + $video.height();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();

			if (videoBottom > viewportTop && videoTop < viewportBottom) {
				playVideo();
			}
		});
	}

	// Try to play on any user interaction
	var userInteractionEvents = 'click touchstart keydown scroll';
	$(document).one(userInteractionEvents, function () {
		setTimeout(playVideo, 100);
	});

	// Contact Number Rotation (Even 50/50 split per session)
	var phoneNumbers = [
		{ tel: "+201069933221", wa: "201069933221", display: "+20 106 993 3221" },
		{ tel: "+201011039552", wa: "201011039552", display: "+20 101 103 9552" }
	];

	// Use sessionStorage to keep the number consistent while the user browses different pages
	var contactIndex = sessionStorage.getItem('assignedContactIndex');
	if (contactIndex === null) {
		// Randomly assign 0 or 1 on their first page load for an even 50/50 split
		contactIndex = Math.random() < 0.5 ? 0 : 1;
		sessionStorage.setItem('assignedContactIndex', contactIndex);
	} else {
		contactIndex = parseInt(contactIndex, 10);
	}

	var contact = phoneNumbers[contactIndex];
	
	// Update all phone and whatsapp links on the page
	$('a[href^="tel:"]').attr('href', 'tel:' + contact.tel);
	$('a[href^="https://wa.me/"]').attr('href', 'https://wa.me/' + contact.wa);
	
	// Update visible text
	$('.contact-display-phone').text(contact.display);

	/* Custom Select Logic */
	document.querySelectorAll('.custom-select-wrapper').forEach(function(wrapper) {
		const select = wrapper.querySelector('.custom-select');
		const hiddenInput = wrapper.querySelector('input[type="hidden"]');
		
		wrapper.addEventListener('click', function(e) {
			const trigger = e.target.closest('.custom-select__trigger');
			if (trigger) {
				select.classList.toggle('open');
			}
			
			const option = e.target.closest('.custom-option');
			if (option) {
				const value = option.getAttribute('data-value');
				const text = option.textContent;
				
				// Update hidden input
				if (hiddenInput) hiddenInput.value = value;
				
				// Update trigger text
				select.querySelector('.custom-select__text').textContent = text;
				
				// Update selected class
				select.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
				option.classList.add('selected');
				
				select.classList.remove('open');
			}
		});
	});

	window.addEventListener('click', function(e) {
		document.querySelectorAll('.custom-select').forEach(function(select) {
			if (!select.contains(e.target)) {
				select.classList.remove('open');
			}
		});
	});

	// Branded preloader — hide when page is ready
	var $preloader = document.getElementById('g-preloader');
	if ($preloader) {
		$preloader.classList.add('hidden');
		setTimeout(function() { $preloader.style.display = 'none'; }, 650);
	}

	// "Call Now" nav button: dial on mobile, go to contact page on desktop
	function updateCallNowLinks() {
		var isMobile = window.innerWidth <= 736;
		document.querySelectorAll('a.button.primary[href^="tel:"]').forEach(function(a) {
			a.dataset.tel = a.dataset.tel || a.getAttribute('href');
			a.href = isMobile ? a.dataset.tel : 'contact.html';
		});
	}
	updateCallNowLinks();
	window.addEventListener('resize', updateCallNowLinks);

})(jQuery);