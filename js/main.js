function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());

  if (t < 0) {
      t = 0;
  }

  var seconds = Math.floor((t / 1000) % 60 );
  var minutes = Math.floor((t / 60000) % 60 );
  var hours = Math.floor(( t / (1000*60*60)) % 24 );
  var days = Math.floor(t / (1000*60*60*24) );

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);

  var updateClock = function() {
    var t = getTimeRemaining(endtime);

    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;
    secondsSpan.innerHTML = t.seconds;

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  };

  updateClock(); // run function once at first to avoid delay

  var timeinterval = setInterval(updateClock, 1000);
}

$(document).ready(function() {
  $(".button-collapse").sideNav();

  var deadline = '2018-04-14T09:00:00Z';
  initializeClock('clock', deadline);

  $('.info-section form').on('submit', function(e) {
    e.preventDefault();

    $form = $(this);

    $.ajax({
      url: $form.attr('action'),
      method: $form.attr('method'),
      data: $form.serialize()
    }).done(function(data) {
      var message = data.success ? 'Submitted form!' : 'Error submitting...';
      Materialize.toast(message, 4000);

      if (data.success) {
        $form.find(':input').val('');
      }
    });
  });
});
