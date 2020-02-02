document.addEventListener('click', function(event) {
    "use strict";
    if (!event.target.classList.contains('dropdown_control')) {
        let targets = document.querySelectorAll('.dropdown_list__active');
        if(targets){
            targets.forEach(function(target){
                target.classList.remove('dropdown_list__active')
                console.log('missclick')
            })
        }
        return;
    };
    event.target.parentNode.querySelector('.dropdown_list').classList.contains('dropdown_list__active') ? event.target.parentNode.querySelector('.dropdown_list').classList.remove('dropdown_list__active') : event.target.parentNode.querySelector('.dropdown_list').classList.add('dropdown_list__active');
}, false)