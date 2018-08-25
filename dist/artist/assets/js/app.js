'use strict';
var carousels = document.querySelectorAll('.b-slider');
for (let carousel of carousels){
	let btn_pre = carousel.querySelector('.control.pre_slide');
	let btn_next = carousel.querySelector('.control.next_slide');
	let items = carousel.querySelector('.b-slider_list');

	let current = items.querySelector('.active');
	btn_next.onclick = () => {
		'use strict';
		if ( !current.nextElementSibling ) {
			let first = items.firstElementChild;
			first.remove;
			items.append(first);
		}
		current.classList.remove('active');
		current.nextElementSibling.classList.add('active')
		
		current = items.querySelector('.b-slider_item.active');
	}
	btn_pre.onclick = () => {
		'use strict';
		if ( !current.previousElementSibling ) {
			let last = items.lastElementChild;
			last.remove;
			items.prepend(last);
		}
		current.classList.remove('active');
		current.previousElementSibling.classList.add('active')
		
		current = items.querySelector('.b-slider_item.active');
	}
}
function play_demo(object, type) {
	'use strict';
	let player = document.querySelector('.b-player');
	if(type=='track'){
		if(!object.parentElement.classList.contains('active')){
			object.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rage-pause');
			object.parentElement.classList.add('active')
		}else{
			object.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rage-play');
			object.parentElement.classList.remove('active')
		}
	}
	else if(type=='button'){
		if(!object.classList.contains('active')){
			object.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rage-pause');
			object.classList.add('active');
			object.querySelector('.text').innerHTML = 'Pause';
		}else{
			object.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rage-play');
			object.classList.remove('active');
			object.querySelector('.text').innerHTML = 'Play';
		}
	}
	player.classList.add('active')
}

function demo_fullscreen(object){
	'use strict';
	if(!object.parentElement.classList.contains('fullscreen')){
		object.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rage-minimize');
		object.parentElement.classList.toggle('fullscreen');
		document.getElementById('wave').classList.add('player');
	}else{
		object.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#rage-maximize');
		object.parentElement.classList.remove('fullscreen');
		document.getElementById('wave').classList.remove('player');
	}
}
var fields = document.querySelectorAll('.b-field_input');
for (let field of fields) {
	field.onchange = () => {
		'use strict';
		if(this.value != ''){
			field.classList.add('b-field_input__completed')
		}else{
			field.classList.remove('b-field_input__completed')
		}
	}
}
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