// custom code
$(function() {
  // heading design

  $(".dropdown-toggle").mouseover(function() {
    $(this).parent().children(".dropdown-menu").slideDown(100);
  });

  $(".dropdown").mouseleave(function() {
    $(this).children(".dropdown-menu").slideUp(100);
  });

  $(".search").submit((event) => {
    event.preventDefault();
  });

  $(".search_input").on('keyup', () => {
    event.preventDefault();
    var searchValue = event.target.value;
    var chnageKeyword = $('.search_result h4 span').text(searchValue);
    if (searchValue !== "") {
      $(".search_result").show();
    } else {
      $(".search_result").hide();
    }
  });

  $('.search_result_close').click(() => {
    $(".search_result").hide();
    $(".search_input").val("");
  });

  $(".menu_btn").click((e) => {
    e.stopPropagation();
    $(".navbar").toggleClass("active");
  });

  $(".navbar").click((e) => {
    var getNav = e.target;
    if (!$(getNav).closest('.menu').length && !$(getNav).hasClass('menu_btn')) {
      $(".navbar").removeClass("active");
    }
  });

  $(".search_icon").click(() => {
    $(".search").addClass("active")
  });

  $(".search").click((e) => {
    var getNav = e.target;
    if (!$(getNav).closest('.search_box').length && !$(getNav).hasClass('search_result')) {
      $(".search").removeClass("active");
    }
  });

  var categoriesGrid = new Swiper('.categories_grid', {
    slidesPerView: "auto",
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    navigation: {
      nextEl: '.category_swiper_buttons .swiper-button-next',
      prevEl: '.category_swiper_buttons .swiper-button-prev',
    },
  });

  var dealSlider = new Swiper('.deal_slider', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 2,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    breakpoints: {
      // jab screen ki width 576px ya kam ho
      576: {
        slidesPerView: 1,
      },
      // jab screen ki width 768px ya kam ho
      768: {
        slidesPerView: 2,
      },
      // jab screen ki width 992px ya kam ho
      992: {
        slidesPerView: 3,
      },
    },
  });


  var heroWrapper = new Swiper('.hero_wrapper', {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    spaceBetween: 10,
    grabCursor: true,
    speed: 800,
  });

  var companiesSlider = new Swiper('.companies_slider', {
    slidesPerView: 'auto',
    loop: true,
    freeMode: true,
    spaceBetween: 50,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
  });

  // $(".modal").modal("show");

  var quickViewSlider = new Swiper('.quick_view_slider', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var singleCategorySlider = new Swiper('.single_category_slider', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
    grabCursor: true,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  priceRangeSlider(0, 300);

  $(".filter_btn").click(function(e) {
    e.stopPropagation();
    $(".filter_sidebar").addClass('active');
  });

  $(document).click((e) => {
    var getNav = e.target;
    if (!$(getNav).closest('.filter_sidebar').length && !$(getNav).hasClass('filter_btn')) {
      $(".filter_sidebar").removeClass("active");
    }
  });

  var count = 0;

  $('#increment').click(function() {
    count++;
    $('#count').text(count);
  });

  $('#decrement').click(function() {
    if (count > 0) {
      count--;
      $('#count').text(count);
    }
  });

  var galleryThumbs = new Swiper('.product_images_thumb', {
    spaceBetween: 10,
    slidesPerView: "auto",
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var galleryTop = new Swiper('.product_images_slider', {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  $("#product-tabs").tabs();

  $("#writeReview").click(function() {
    $(".write_review_form").slideToggle();
  });

  reviewForm();

  $("#addAdddressField").click(function() {
    const addressField = `<div class="col-md-12"><div class="mb-3"><input type="text" class="form-control" placeholder="Address"></div></div>`;
    $(this).parent().before(addressField);
  });

  $(".contact_form .form-control").on("input", function() {
    if ($(this).val() !== "") {
      $(this).addClass("focused");
    } else {
      $(this).removeClass("focused");
    }
  });

  $('.otp_input').keydown(function(e) {
    var $this = $(this);
    if (e.keyCode === 8 && $this.val().length === 0) {
      $this.prev('.otp_input').focus();
    }
  });

  $('.otp_input').on("input", function(e) {
    var $this = $(this);
    if ($this.val().length === 1 && e.which !== 8) {
      $this.next('.otp_input').focus();
    }
  });

  $('#liveToastBtn').click(function(){
      $('#liveToast').toast('show');
    });
});

// price range filter
const priceRangeSlider = (min, max) => {
  $(".min_value input").val(min);
  $(".max_value input").val(max);
  $(".highest_price p").text(`The highest price is $${max}`)

  $("#slider-range").slider({
    range: true,
    min: min,
    max: max,
    values: [min, max],
    slide: function(event, ui) {
      $(".min_value input").val(ui.values[0]);
      $(".max_value input").val(ui.values[1]);
    }
  });

  $(".min_value input").change(function(event) {
    var minValue = parseInt($(this).val());
    if (minValue < min) {
      minValue = min;
    } else if (minValue > max) {
      minValue = max;
    }
    $(this).val(minValue);
    $("#slider-range").slider("values", 0, minValue);
  });

  $(".max_value input").change(function() {
    var maxValue = parseInt($(this).val());
    if (maxValue < min) {
      maxValue = min;
    } else if (maxValue > max) {
      maxValue = max;
    }
    $(this).val(maxValue);
    $("#slider-range").slider("values", 1, maxValue);
  });

  $(".price_rest").click(function() {
    $("#slider-range").slider("values", [min, max]);
    $(".min_value input").val(min);
    $(".max_value input").val(max);
  });
}

// review form validation
const reviewForm = () => {
  let currentAlertType = null;

  const appendAlert = (message, type) => {
    if (currentAlertType !== type) {
      $('body').find('.alert').remove();
      const wrapper = $('<div>').addClass(`alert alert-${type} alert-dismissible fade show`).attr('role', 'alert');
      const messageDiv = $('<div>').text(message);
      const closeButton = $('<button>').addClass('btn-close').attr({ 'type': 'button', 'data-bs-dismiss': 'alert' });
      wrapper.append(messageDiv, closeButton);
      $('.form_wrapper').before(wrapper);
      currentAlertType = type;
    }
  };

  $('.review_form').submit(function(event) {
    var name = $('#review_name').val();
    var email = $('#review_email').val();
    var review = $('#review_text').val();

    if (name.trim() === '' || email.trim() === '' || review.trim() === '') {
      appendAlert('Please fill in all fields.', 'danger');
      event.preventDefault();
    } else {
      appendAlert('Review has been successfully submitted.', 'success');
      event.preventDefault();
    }
  });
}
// marquee animation
function Marquee(selector, speed) {
  const parentSelector = $(selector);
  const clone = parentSelector.html();
  const firstElement = parentSelector.children().first();
  let i = 0;
  let marqueeInterval;

  parentSelector.append(clone);
  parentSelector.append(clone);
  parentSelector.append(clone);
  parentSelector.append(clone);

  function startMarquee() {
    marqueeInterval = setInterval(function() {
      firstElement.css('margin-left', `-${i}px`);
      if (i > firstElement.width()) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }

  function stopMarquee() {
    clearInterval(marqueeInterval);
  }

  parentSelector.on('mouseenter', stopMarquee);
  parentSelector.on('mouseleave', startMarquee);

  startMarquee();
}

$(window).on('load', () => Marquee('.marquee', 0.2));