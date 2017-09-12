$(function(){
	new WOW().init();

    $('.link-btn .chose').on('click',function(){
        var $idx = $(this).index();
        var intxt = $(this).attr('title');
        $('.cen-tit .name').text(intxt);
        $('.show').eq($idx).show().siblings('.show').hide();
    });
});