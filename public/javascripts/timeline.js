jQuery(document).ready(function($) {
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocksOnInit(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function() {
        (!window.requestAnimationFrame) ? setTimeout(function() {
            showBlocks(timelineBlocks, offset);
            // hideBlocksWithAnimation(timelineBlocks, offset);
        }, 100): window.requestAnimationFrame(function() {
            showBlocks(timelineBlocks, offset);
            // hideBlocksWithAnimation(timelineBlocks, offset);
        });
    });


    function hideBlocksOnInit(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function hideBlocksWithAnimation(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('bounce-out');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }
});