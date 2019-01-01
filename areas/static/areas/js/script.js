$('.video-card').on('click', function(){
  $('.video-card.active-video').removeClass('active-video');

  var embed = $('iframe', this).attr('src');
  var vimeoEmbed = embed + "&autoplay=1"
  var youtubeEmbed = "https://www.youtube.com/embed/" + embed + "?autoplay=1&origin=climbbeta.com"

  if(embed.includes('vimeo')){
    $('.video').attr('src', vimeoEmbed);
  } else {
    $('.video').attr('src', youtubeEmbed);
  }

  $(this).addClass('active-video');
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
