jQuery(document).ready(function($) {
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocksOnInit(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    // $(window).on('scroll', function() {
    //     (!window.requestAnimationFrame) ? setTimeout(function() {
    //         showBlocks(timelineBlocks, offset);
    //         // hideBlocksWithAnimation(timelineBlocks, offset);
    //     }, 100): window.requestAnimationFrame(function() {
    //         showBlocks(timelineBlocks, offset);
    //         // hideBlocksWithAnimation(timelineBlocks, offset);
    //     });
    // });

    var scrollTopBefore = $(window).scrollTop();

    $(window).on('scroll', function() {
        var scrollTopAfter = $(window).scrollTop();
        var delta = scrollTopAfter - scrollTopBefore;
        console.log(delta);
        if (delta == 0) return false;
        if (delta > 0) {
            // scroll down
            (!window.requestAnimationFrame) ? setTimeout(function() {
                showBlocks(timelineBlocks, offset);
                // hideBlocksWithAnimation(timelineBlocks, offset);
            }, 100): window.requestAnimationFrame(function() {
                showBlocks(timelineBlocks, offset);
                // hideBlocksWithAnimation(timelineBlocks, offset);
            });
        } else {
            // scroll up
            (!window.requestAnimationFrame) ? setTimeout(function() {
                hideBlocksWithAnimation(timelineBlocks, offset);
            }, 100): window.requestAnimationFrame(function() {
                hideBlocksWithAnimation(timelineBlocks, offset);
            });
        }
        scrollTopBefore = scrollTopAfter;
    });


    function hideBlocksOnInit(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function hideBlocksWithAnimation(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() && $(this).find('.cd-timeline-img').hasClass('bounce-in')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('bounce-in').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }
});