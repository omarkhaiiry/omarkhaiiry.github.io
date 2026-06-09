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

	// Content protection
	(function () {
		// Disable right-click everywhere
		document.addEventListener('contextmenu', function (e) {
			e.preventDefault();
		});

		// Block inspect / view-source keyboard shortcuts
		document.addEventListener('keydown', function (e) {
			var k = e.key || e.keyCode;
			// F12
			if (k === 'F12' || k === 123) { e.preventDefault(); return; }
			if (e.ctrlKey || e.metaKey) {
				// Ctrl+U (view source), Ctrl+S (save), Ctrl+P (print)
				if (k === 'u' || k === 'U' || k === 's' || k === 'S' || k === 'p' || k === 'P') {
					e.preventDefault(); return;
				}
				if (e.shiftKey) {
					// Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
					if (k === 'i' || k === 'I' || k === 'j' || k === 'J' || k === 'c' || k === 'C') {
						e.preventDefault(); return;
					}
				}
			}
		});

		// Prevent image drag
		document.addEventListener('dragstart', function (e) {
			if (e.target.tagName === 'IMG') e.preventDefault();
		});
	})();

	// Branded preloader — hide when page is ready
	var $preloader = document.getElementById('g-preloader');
	if ($preloader) {
		$preloader.classList.add('hidden');
		setTimeout(function() { $preloader.style.display = 'none'; }, 650);
	}

	// 50/50 number rotation — alternates between two consultant numbers each session
	var NUMBERS = {
		A: { tel: '+201069933221', wa: '201069933221' },
		B: { tel: '+201011039552', wa: '201011039552' }
	};
	var lastSlot = localStorage.getItem('gdev_slot') || 'B';
	var activeSlot = lastSlot === 'A' ? 'B' : 'A';
	localStorage.setItem('gdev_slot', activeSlot);
	var activeNum = NUMBERS[activeSlot];

	// Swap all tel: links
	document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
		a.href = 'tel:' + activeNum.tel;
	});

	// Swap all WhatsApp links
	document.querySelectorAll('a[href*="wa.me"]').forEach(function(a) {
		a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + activeNum.wa);
	});

	// Swap any displayed phone number text
	document.querySelectorAll('.contact-display-phone').forEach(function(el) {
		el.textContent = activeNum.tel.replace('+2', '+2 ').replace(/(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
	});

	// "Call Now" nav button: dial on mobile, go to contact page on desktop
	function updateCallNowLinks() {
		var isMobile = window.innerWidth <= 736;
		document.querySelectorAll('a.button.primary[href^="tel:"]').forEach(function(a) {
			a.href = isMobile ? 'tel:' + activeNum.tel : 'contact.html';
		});
	}
	updateCallNowLinks();
	window.addEventListener('resize', updateCallNowLinks);

})(jQuery);