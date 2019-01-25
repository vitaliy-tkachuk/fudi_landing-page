/* eslint-disable func-names */
import 'owl.carousel';
import 'jquery-inview';
import 'jquery.mmenu';

// =========== mmenu ====================
const $menu = $('#my-menu').mmenu(
  {
    //   options
    setSelected: {
      hover: true,
    },
    extensions: ['position-behind', 'position-right', 'border-full', 'theme-dark'],
  },
  {
    // configuration
    offCanvas: {
      pageSelector: '#page-wrapper',
    },
  }
);
const $icon = $('#my-icon');
const API = $menu.data('mmenu');

$icon.on('click', () => {
  API.open();
});

API.bind('open:finish', () => {
  setTimeout(() => {
    $icon.addClass('is-active');
  }, 100);
});
API.bind('close:finish', () => {
  setTimeout(() => {
    $icon.removeClass('is-active');
  }, 100);
});
$('#my-menu a').click(() => {
  API.close();
});

// =========== initializing owlCarousel ====================
$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  items: 1,
  autoplay: true,
});

// =========== using jquery-inview for animations ====================

// makes sure that all content of webpage is loaded (including images)
window.addEventListener('load', () => {
  $('.animated.hidden').bind('inview', function() {
    const effect = $(this).attr('data-animated');
    $(this).removeClass('hidden');
    $(this).addClass(effect);
  });
});
// =========== cuisine-composition animation ====================
$('.cuisine-composition').hover(
  function() {
    $(this)
      .find('p')
      .removeClass('hidden bounceOutDown')
      .addClass('animated bounceInUp');
  },
  function() {
    $(this)
      .find('p')
      .removeClass('bounceInUp')
      .addClass('bounceOutDown');
  }
);

// =========== counters animation ====================
let a = 0;
$(window).scroll(() => {
  const oTop = $('#counter').offset().top - window.innerHeight;
  if (a === 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      const $this = $(this);

      const countTo = $this.attr('data-count');
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },

        {
          duration: 2000,
          easing: 'swing',
          step() {
            $this.text(Math.floor(this.countNum).toLocaleString());
          },
          complete() {
            $this.text(this.countNum.toLocaleString());
          },
        }
      );
    });
    a = 1;
  }
});

$(window).on('load', () => {
  // makes sure the whole site is loaded
  $('.pulse').fadeOut(); // will first fade out the loading animation
  $('.preloader')
    .delay(350)
    .fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body')
    .delay(350)
    .css({ overflow: 'visible' });
});
