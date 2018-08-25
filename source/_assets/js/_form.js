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