document.addEventListener('click', function(event) {
    "use strict";
    if (!event.target.classList.contains('nav-trigger') && !event.target.classList.contains('sidebar')) {
        document.querySelector('.sidebar').classList.remove('sidebar__active');
        console.log('Click')
        return;
    };
    document.querySelector('.sidebar').classList.toggle('sidebar__active');
    let touchobjStart = 0;
    let startX = 0;
    let touchobjEnd = 0;
    let endX = 0;
    document.querySelector('.sidebar').addEventListener('touchstart', function(event){
        touchobjStart = event.changedTouches[0];
        startX = touchobjStart.pageX;
        return;
    })
    document.querySelector('.sidebar').addEventListener('touchend', function(subevent){
        touchobjEnd = subevent.changedTouches[0];
        endX = touchobjEnd.pageX;
        if ( (endX-startX)>110 ) {
            document.querySelector('.sidebar').classList.remove('sidebar__active');
        }
        return;
    });
}, false)