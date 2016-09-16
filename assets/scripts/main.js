// Created by sam mok 2015(Siso brand interactive team).

"use strict";

//  limit browser drag move
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
},true);

var app = {
    preload: function () {
        var imgAmounts = $('img').length;
        var loadedAmounts = 0;
        var imgBgArr = [
            { css: '.machine-switch', src: 's01-switchs.png'},
            { css: '.machine-switch .bd', src: 's01-switchs-on.png'},
            { css: '.video .bd', src: 'video-bd.jpg'},
            { css: '.content .bd', src: 's01-content.png'},   
            { css: '.scene-final .tips', src: 's-final-tips.png'}
        ];

        imgAmounts += imgBgArr.length;

        $('img').each(function (item) {
            var originImg = $(this);

            var img = new Image();
            img.src = originImg.attr('lazy-src');
            img.onload = function () {
                originImg.attr('src', this.src);
                loadedAmounts += 1;
                start();
            }
        });

        for (var i = 0; i < imgBgArr.length; i++) {
            (function (index) {
                var img = new Image();
                img.src = 'http://7xp6iq.com1.z0.glb.clouddn.com/tx_yingye/images/' + imgBgArr[index].src;
                img.onload = function () {
                    $(imgBgArr[index].css).css('background-image', 'url(' + this.src + ')');
                    loadedAmounts += 1;
                    start();
                }
            })(i);
        }

        function start () {
            renderNum(Math.floor((loadedAmounts / imgAmounts) * 100));

            if (loadedAmounts == imgAmounts) {
                setTimeout(function () {
                    app.create()
                }, 1000);
            }
        }

        function renderNum (num) {
            var digit = num % 10;
            var ten = Math.floor(num / 10);

            var hundredDom = $('.loading .hundred');
            var tenDom = $('.loading .ten');
            var digitDom = $('.loading .digit');

            if (num == 100) {
                hundredDom.addClass('num1');
                tenDom.attr('class', tenDom.attr('class').replace(/ num./g, ' num0'));
                digitDom.attr('class', digitDom.attr('class').replace(/ num./g, ' num0'));
            } else {
                tenDom.attr('class', tenDom.attr('class').replace(/ num./g, '')).addClass('num' + ten);
                digitDom.attr('class', digitDom.attr('class').replace(/ num./g, '')).addClass('num' + digit);
            }
        }
    },

    bindScene01: function () {
        $('.scene01').addClass('active');

        setTimeout(function () {
            $('.loading').remove();
            $('.scene01 .mask').remove();

            $('.machine-switch').on('touchstart', bindVideoPrepare);
        }, 1400);

        function bindVideoPrepare () {
            var audioMubu = $('.mubu')[0];
            audioMubu.play();
            audioMubu.pause();

            setTimeout(function () {
                audioMubu.play();
            }, 1200);


            $('.scene01').addClass('videoPrepare');

            //  prepare content
            bindScene01Content();

            $(this).off('touchstart', bindVideoPrepare);
        }

        function bindScene01Content () {
            var scene01 = $('.scene01');
            var scroll;
            var touchStartPoint = 0;

            scene01
                .on('touchstart', setTouchStartPoint)
                .on('touchmove', bindShowContent);

            function setTouchStartPoint(e) {
                touchStartPoint = e.originalEvent.touches[0].pageY;
            }

            function bindShowContent (e) {
                var curPoint = e.originalEvent.touches[0].pageY;

                if (Math.abs(curPoint - touchStartPoint) >= 30) {
                    scene01
                        .off('touchstart', setTouchStartPoint)
                        .off('touchmove', bindShowContent);

                    showContent();
                }
            }

            function showContent (e) {
                $('.scene01 .mask').remove();
                $('.scene01').addClass('showContent noAnimation');

                //  bind scroll
                setTimeout(function () {
                    $('.scene01').addClass('viewContent');
                    scroll = new IScroll('#content', { bounce: true, mouseWheelSpeed: 20 });

                    //  go to 快门 scene
                    setTimeout(app.bindScene02, 5000);
                }, 2000);
            }
        }
    },

    bindScene02: function () {
        $('.scene02').css({'display': 'block'});

        setTimeout(function () {
            $('.scene01').addClass('leave');
            $('.scene02').addClass('active');

            //  main scene leave
            setTimeout(function () {
                $('.scene01').remove();
                $('.scene-final').show();
                $('.scene02').addClass('leave');

                setTimeout(function () {
                    app.bindFinalScene();
                }, 300);
            }, 4400);
        }, 100);
    },

    bindFinalScene: function () {
        $('.scene-final').addClass('active');

        setTimeout(function () {
            $('.main').remove();
        }, 2000);

        $('.scene-final .toucharea').on('touchstart', function () {
            location.reload();
            // $('.scene-final .tips').addClass('active');

            // setTimeout(function () {
            //     $('.scene-final .tips').removeClass('active');
            // }, 3000);
        });
    },

    create: function (){
        $('.loading-num').remove();
        $('.loading').addClass('prepare');

        setTimeout(function () {
            start();
        }, 2000);

        function start () {
            $('.loading').addClass('active');

            //  show scene 01
            setTimeout(app.bindScene01, 1650);
        }
    },

    start: function (){
        this.preload();
    }
};

$(function (){
    window.onload = window.onresize = function(){
        var mode = window.innerWidth > 510 ? 'contain' : 'cover';

        pageResponse({
            selectors : '.page',     //模块选择器，使用querySelectorAll的方法
            mode : mode,     // auto || contain || cover
            width : '1080',      //输入页面的宽度，只支持输入数值，默认宽度为320px
            height : '1920'      //输入页面的高度，只支持输入数值，默认高度为504px
        });
    };

    (function () {
        var loadedAmounts = 0;
        var imgArr = [
            { css: '.loading-num', src: 'loading-bg.jpg'},
            { css: '.loading-num .num', src: 'sprite-num.png'},
            { css: '.loading-bd', src: 'loading-bg.jpg'},
            { css: '.scene01 .scene-bd', src: 's01-bg.jpg'}
        ];

        for (var i = 0; i < imgArr.length; i++) {
            (function (index) {
                var img = new Image();
                img.src = 'http://7xp6iq.com1.z0.glb.clouddn.com/tx_yingye/images/' + imgArr[index].src;
                img.onload = function () {
                    $(imgArr[index].css).css('background-image', 'url(' + this.src + ')');
                    start();
                }
            })(i);
        }

        var img = new Image();
        var percentImg = $('.loading-num .percent');
        img.src = percentImg.attr('lazy-src');
        img.onload = function () {
            percentImg.attr('src', this.src);
            start();
        };

        function start () {
            loadedAmounts += 1;

            if (loadedAmounts == imgArr.length + 1) {

                /** init app */
                setTimeout(function () {
                    $('.page').show();
                    app.start();
                }, 200);
            }
        }
    })();

    console.log('app started success...');
});

