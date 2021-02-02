jQuery(document).ready(function($){
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function(){
        if (window.requestAnimationFrame) {
            return window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset) });
        }
        return setTimeout(function(){ showBlocks(timelineBlocks, offset) }, 100)
    });

    function hideBlocks(blocks, offset) {
        blocks.each(function(){
            if ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) {
                $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden')
            }
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function(){
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset &&
                $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in')
                }
        });
    }

    $('.sort-workshop-time').click(function(){
        console.log('sort event - time')
        var time = $(this).attr('id');
        var place = $('.sort-workshop-locale').length ? $('.sort-workshop-locale').val() : 'all';
        $('.sort-workshop-time').removeClass('active');
        $(this).addClass('active');
        sortWorkshops(time, place);
    });

    $('.sort-workshop-locale').change(function(){
        console.log('sort event - locale')
        var time = $('.sort-workshop-time.active').length ? $('.sort-workshop-time.active').attr('id') : 'all';
        var place = $(this).val();
        sortWorkshops(time, place);
    }).trigger('change');


    function sortWorkshops(time, place){
        if (time == 'all' && place == 'all'){
            $('.workshop-well').removeClass('d-none')
        }
        if (time == 'all' && place != 'all'){
            $('.workshop-well[data-location="'+place+'"]').removeClass('d-none')
            $('.workshop-well:not([data-location="'+place+'"])').addClass('d-none')
        }
        if (time != 'all' && place == 'all'){
            $('.workshop-well[data-length="'+time+'"]').removeClass('d-none')
            $('.workshop-well:not([data-length="'+time+'"])').addClass('d-none')
        }
        if (time != 'all' && place != 'all'){
            $('.workshop-well[data-length="'+time+'"][data-location="'+place+'"]').removeClass('d-none')
            $('.workshop-well:not([data-length="'+time+'"][data-location="'+place+'"])').addClass('d-none')
        }
    }

    var lhash = decodeURIComponent(location.hash);
    if ($(lhash+'-id').length){
        setTimeout(function() {
            toggleSpeaker(lhash);
        }, 300);
    }

//    function toggleSpeaker(target){
//        if (!$(target+'-id').hasClass('selected')){
//                $('.speaker-info').removeClass('show');
//                $('.speaker-box').removeClass('selected');
//                $(target+'-info').addClass('show');
//                $(target+'-id').addClass('selected');
//            } else {
//                $(target+'-info').removeClass('show');
//                $(target+'-id').removeClass('selected');
//            }
//    }

    function toggleSpeaker(target){
        var shownHeight;

        if ($('.speaker-info.show').length){
            shownHeight = $('.speaker-info.show').height();
        } else {
            shownHeight = 0;
        }

        $('html, body').animate({
            scrollTop: $(target+'-id').offset().top - shownHeight
        }, 500);
        if (!$(target+'-id').hasClass('show')){
                $('.speaker-info').removeClass('show');
                $('.speaker-box').removeClass('selected');
                $(target+'-info').addClass('show');
                $(target+'-id').addClass('selected');
                $(target+'-id + div.speaker-info a' ).attr('tabindex', '0');
            } else {
                $(target+'-info').removeClass('show');
                $(target+'-id').removeClass('selected');
            }
    }

    $('.speaker-info-toggle').click(function(e){
        e.preventDefault();
        var target = $(this).data('target');
        toggleSpeaker(target);
    });

    resetOrders = function(){
        var windowWidth = window.innerWidth,
            infoOrder = 1,
            i = 1,
            ik = 1;

        $('.speaker-sequence .speaker-box').each(function(){
            var infoTarget = $(this).data('speaker-info');
            if (windowWidth >= 935){
                $(this).css('order',i);
                infoOrder = i + 3;
                $(infoTarget).css('order',infoOrder);
                if ((i%3) == 0){
                    i = i+4;
                } else {
                    i++;
                }
            } else if (windowWidth >= 635){
                $(this).css('order',i);
                infoOrder = i + 2;
                $(infoTarget).css('order',infoOrder);
                if ((i%2) == 0){
                    i = i+3;
                } else {
                    i++;
                }
            } else {
                $(this).css('order',i);
                infoOrder = i + 1;
                $(infoTarget).css('order',infoOrder);
                i = i+2;
            }
        });
        $('.keynote-sequence .speaker-box').each(function(){
            var infoTarget = $(this).data('speaker-info')
            if (windowWidth >= 635) {
                $(this).css('order', ik)
                infoOrder = i + 2
                $(infoTarget).css('order', infoOrder)
                ik++
            } else {
                $(this).css('order',ik)
                infoOrder = i + 1
                $(infoTarget).css('order', infoOrder)
                ik = ik + 2
            }
        });
    }

    resetOrders()

    var window_frame = $(window)
    var response_change = {}

    response_change.waitForIdle = function(fn, delay) {
      var timer = null
      return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }

    window_frame.on('resize', response_change.waitForIdle(function() {

      if ($('.speaker-box' ).length) {
        resetOrders()
      }
    }, 100))

    // For testing:
    //var date = new Date('2018-02-15T01:00:00');
    var date = new Date();
    $('.event-day').each(function(){
        var eventDate = new Date($(this).data('date'));
        if (date > eventDate) {
            $(this).addClass('past');
        }
        if (date.getMonth() == eventDate.getMonth() && date.getDate() == eventDate.getDate()) {
            $(this).addClass('active');
        }
    });

});
