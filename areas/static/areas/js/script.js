$('.video-card').on('click', function(){
  $('.video-card.active-video').removeClass('active-video');

  var embed_iframe = $('iframe', this).attr('src');
  var vimeoEmbed = embed_iframe + "&autoplay=1"
  var embed_class = $('.embed', this).html()
  var embed_youtube = $.trim(embed_class)
  var youtubeEmbed = "https://www.youtube.com/embed/" + embed_youtube + "?autoplay=1&origin=climbbeta.com"

  if(embed_iframe){
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

$('.hidden').hide();

$('button.five-day').click(function(){
  $('.weather-forecast.hidden').slideToggle();
});

$('button.map-embed').click(function(){
  $('.city-map.hidden').slideToggle();
});
