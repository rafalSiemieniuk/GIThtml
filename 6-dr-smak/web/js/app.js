var _btn = document.querySelector("[data-js='navbtn']");

_btn.addEventListener('click',function(){
    document.body.classList.toggle('nav-open');
});


var _videoCont = document.querySelector("[data-js=\"video\"]"),
    _btnPlay = document.querySelector("[data-js=\"videoplay\"]"),
    _btnPause = document.querySelector("[data-js=\"videopause\"]"),
    _video = document.querySelector("[data-js=\"videoel\"]");


_btnPlay.addEventListener('click', function(){
    _videoCont.classList.add('playing');
    _video.play();
});
_btnPause.addEventListener('click', function(){
    _videoCont.classList.remove('playing');
    _video.pause();
});