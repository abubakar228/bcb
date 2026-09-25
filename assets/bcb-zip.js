document.addEventListener('DOMContentLoaded',function(){
  var btn=document.querySelector('[data-bcb-mobile-toggle]');
  var nav=document.querySelector('[data-bcb-mobile-nav]');
  if(btn&&nav){
    btn.addEventListener('click',function(){nav.classList.toggle('is-open');btn.setAttribute('aria-expanded',nav.classList.contains('is-open')?'true':'false');});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');});});
  }
});