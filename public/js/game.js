// jshint esversion:9

// Initial time
let initialTime = Date.now();
let errors = 0;

// Display cards randomly
for(let i = $(".deck").children().length; i >= 0; i--) {
  $(".deck").append($(".deck").children()[Math.random() * i | 0]);
}

// Flip card animation
$(".card-container").each(function() {
  $(this).click(function() {
    if($(".error-info").css("display") != "block") {
      if(!$(this).hasClass("animation")) {
        $(this).addClass("animation");
        $(this).addClass("selected");

        checkCards();
      }
    }
  });
});

// Check if cards match
function checkCards() {
  if($(".card-container.selected").length == 2) {
    if($(".card-container.selected img")[0].src == $(".card-container.selected img")[1].src) {
      $(".card-container.selected").each(function() {
        $(this).removeClass("selected");
      });

      if($(".card-container.animation").length == 20) {
        let finalTime = Date.now();
        let totalTime = ((finalTime - initialTime) / 1000).toFixed(0);

        $(".time .result").text(totalTime + " sec");
        $(".errors .result").text(errors);

        $(".win-info").show(600);
        $(".background").delay(2000).show(200);
        $(".score").delay(2000).show(200);

        $.post("/game", {
          name: localStorage.getItem("usernameMemGame"),
          time: totalTime,
          mistakes: errors
        });
      }
    }
    else {
      $(".card-container.selected").each(function() {
        $(this).removeClass("selected");
        $(this).delay(1500).queue(function(next) {
          $(this).removeClass("animation");
          next();
        });
      });

      errors++;

      $(".error-info").fadeIn(600).delay(600).fadeOut(600);

      // Javascript vanilla

      // $(".error-info").removeClass("hide");
      // $(".error-info").addClass("show");

      // setTimeout(function() {
      //   $(".error-info").addClass("hide");
      //   $(".error-info").removeClass("show");
      // }, 2000);
    }
  }
}
