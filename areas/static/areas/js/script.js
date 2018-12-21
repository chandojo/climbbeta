$('.video-card').on('click', function(){
  $('.video-card.active-video').removeClass('active-video');

  var embed = $('iframe', this).attr('src');
  var htmlEmbed = embed + "&autoplay=1"
  $('.video').attr('src', htmlEmbed);

  $(this).addClass('active-video');
});


$('.play-all').on('click', function(){

});
