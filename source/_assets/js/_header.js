document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	var header = document.querySelector('.b-header'),
		header__white = header.classList.contains('white'),
		heroscreen = document.querySelector('.b-heroscreen');
	window.onscroll = function () {
		'use strict';
		if (header__white && heroscreen !== null) {
			let scrolled = window.scrollY || document.documentElement.scrollTop;
			if (scrolled >= heroscreen.offsetHeight) {
				header.classList.remove('white');
				document.getElementById('wave').classList.remove('heroscreen')
				document.getElementById('wave').classList.add('fixed-top')
			} else {
				header.classList.add('white');
				document.getElementById('wave').classList.add('heroscreen')
				document.getElementById('wave').classList.remove('fixed-top')
			}
		}
	}
})

function search_trigger(trigger){
	'use strict';
	if ( !trigger.classList.contains('active') ) {
		trigger.classList.add('active')
		document.querySelector('.b-header_search').classList.add('active')
		document.querySelector('#wave').classList.add('search')
	} else {
		trigger.classList.remove('active')
		document.querySelector('.b-header_search').classList.remove('active')
		document.querySelector('#wave').classList.remove('search')
	}
}