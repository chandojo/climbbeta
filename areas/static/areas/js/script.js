$('.video-card').on('click', function(){
  $('.video-card.active-video').removeClass('active-video');

  var embed = $('iframe', this).attr('src');
  var htmlEmbed = embed + "&autoplay=1"
  $('.video').attr('src', htmlEmbed);

  $(this).addClass('active-video');
});


$('.play-all').on('click', function(){

});

$('.weather-card').hover(function(){
  $(this).addClass("weather-hover");},
  function(){$(this).removeClass("weather-hover");}
  );

$('button.five-day').click(function(){
  $('.weather-forecast.hidden').slideToggle();
});

$('button.map-embed').click(function(){
  $('.city-map.hidden').slideToggle();
});

$('.todays-weather').click(function(){
  $('.weather').slideToggle(function(){
    $('.weather').toggleClass('hidden');
  });
});
