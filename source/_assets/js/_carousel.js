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