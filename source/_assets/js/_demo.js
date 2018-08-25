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