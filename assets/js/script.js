/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
  'use strict';

  // Preloader
  $(window).on('load', function () {
    $('#preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });

  
  // Instagram Feed
  if (($('#instafeed').length) !== 0) {
    var accessToken = $('#instafeed').attr('data-accessToken');
    var userFeed = new Instafeed({
      get: 'user',
      resolution: 'low_resolution',
      accessToken: accessToken,
      template: '<a href="{{link}}"><img src="{{image}}" alt="instagram-image"></a>'
    });
    userFeed.run();
  }

  setTimeout(function () {
    $('.instagram-slider').slick({
      dots: false,
      speed: 300,
      // autoplay: true,
      arrows: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }, 1500);


  // e-commerce touchspin
  $('input[name=\'product-quantity\']').TouchSpin();


  // Video Lightbox
  $(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
  });


  // Count Down JS
  $('#simple-timer').syotimer({
    year: 2022,
    month: 5,
    day: 9,
    hour: 20,
    minute: 30
  });

  //Hero Slider
  $('.hero-slider').slick({
    // autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'heroSliderArrow prevArrow tf-ion-chevron-left\'></button>',
    nextArrow: '<button type=\'button\' class=\'heroSliderArrow nextArrow tf-ion-chevron-right\'></button>',
    dots: true,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false
  });
  $('.hero-slider').slickAnimation();


})(jQuery);

function getCartInfo(){
  let userId = localStorage.getItem('user');

  if(userId){
    let checkoutLink = document.getElementById('checkoutLink');
    checkoutLink.href = `/checkout?userId=${userId}`
    let header = new Headers();
    header.append('Content-Type','application/json');
    fetch(`/cart/userCart?id=${userId}`,{
      headers:header,
      method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('cart',JSON.stringify(data));
      let cartDiv = document.getElementById('cartDiv');
      cartDiv.innerHTML=''
      let totalCartValue = 0;
      data.forEach(ele=>{
        totalCartValue += parseInt(ele.quantity) * parseInt(ele.product.price);
        cartDiv.innerHTML+=
      `
      <!-- Cart Item -->
      <div class="media">
        <a class="pull-left" href="#!">
          <img class="media-object" src="../productImg/${ele.product.primaryImage}" alt="image" />
        </a>
        <div class="media-body">
          <h4 class="media-heading"><a href="#!">${ele.product.name} (${ele.size})</a></h4>
            <div class="cart-price">
              <span>${ele.quantity} X </span>
              <span>${ele.product.price}</span>
            </div>
          <h5><strong>₹ ${parseInt(ele.quantity) * parseInt(ele.product.price)}</strong></h5>
        </div>
      </div>
          `
        })
      document.getElementById('totalCartValue').innerHTML = "₹ " + totalCartValue;
      })

      .catch(err=>console.log(err))
    }
  }
getCartInfo();

function getOrderDetail(){
  let orderDetailLink = document.getElementById('orderDetailLink');
  let userId = localStorage.getItem('user');
  if(userId){
    orderDetailLink.href = `/order?user=${userId}`;
  }
  else{
    orderDetailLink.href = `/order`;
  }
}

let user = localStorage.getItem('user');
if(user){
  $('#userLogin').hide()
  $('#userSignUp').hide()
}
else{
  $('#userLogOut').hide();
}

function logOutUser(){
  localStorage.clear();
  window.location.href = '/'
}