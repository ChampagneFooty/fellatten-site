(function(){
  // mobile nav
  var t=document.querySelector('.nav-toggle'),l=document.getElementById('nav-links');
  t&&t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o)});
  l&&l.addEventListener('click',function(e){if(e.target.tagName==='A'){l.classList.remove('open');t.setAttribute('aria-expanded',false)}});

  // countdown
  var cd=document.getElementById('countdown');
  if(cd){var target=new Date(cd.dataset.target).getTime();
    var tick=function(){var d=Math.max(0,target-Date.now());
      document.getElementById('cd-d').textContent=Math.floor(d/864e5);
      document.getElementById('cd-h').textContent=String(Math.floor(d/36e5)%24).padStart(2,'0');
      document.getElementById('cd-m').textContent=String(Math.floor(d/6e4)%60).padStart(2,'0');};
    tick();setInterval(tick,30000);}

  // reduced motion: pause looping videos, show poster
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){document.querySelectorAll('video[autoplay]').forEach(function(v){v.removeAttribute('autoplay');v.pause()})}

  // click-to-load YouTube (privacy-enhanced)
  document.querySelectorAll('.yt').forEach(function(el){
    el.addEventListener('click',function(){
      if(el.querySelector('iframe'))return;
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+el.dataset.id+'?autoplay=1&rel=0';
      f.title=el.dataset.title||'YouTube video';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen=true; el.appendChild(f);
    });
  });

  // Fell moods
  var vid=document.getElementById('fell-video'),still=document.getElementById('fell-still');
  var btns=document.querySelectorAll('.moods button');
  ['idle','suspicious','shocked','laughing','shrug','facepalm','talking'].forEach(function(p){var i=new Image();i.src='assets/fell-poses/'+p+'.jpg'});
  function setPose(p){
    btns.forEach(function(b){b.classList.toggle('on',b.dataset.pose===p)});
    if(p==='play'){still.hidden=true;if(!reduce)vid.play();return}
    still.src='assets/fell-poses/'+p+'.jpg';still.alt='Fell looking '+p;still.hidden=false;vid.pause();
  }
  btns.forEach(function(b){
    b.addEventListener('click',function(){setPose(b.dataset.pose)});
    b.addEventListener('mouseenter',function(){if(window.matchMedia('(hover:hover)').matches&&b.dataset.pose!=='play')setPose(b.dataset.pose)});
  });

  // mailing list placeholder (no backend)
  var f=document.getElementById('signup'),m=document.getElementById('form-msg');
  f&&f.addEventListener('submit',function(e){e.preventDefault();var v=f.email.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){m.textContent='That email looks a bit off. Try again?';return}
    m.textContent="Nice one. (Draft site: nothing was saved yet.)";f.reset();});
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
