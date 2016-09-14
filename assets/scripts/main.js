// Created by sam mok 2015(Siso brand interactive team).

"use strict";

//  limit browser drag move
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
},true);

var app = {
    bindScene01: function () {
        $('.scene01').addClass('active');

        setTimeout(function () {
            $('.loading').remove();
            $('.scene01 .mask').remove();

            $('.machine-switch').on('touchstart', bindVideoPrepare);
        }, 1200);

        function bindVideoPrepare () {
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

                if (Math.abs(curPoint - touchStartPoint) >= 100) {
                    scene01
                        .off('touchstart', setTouchStartPoint)
                        .off('touchmove', bindShowContent);

                    showContent();
                }
            }

            function showContent (e) {
                $('.scene01 .mask').remove();
                $('.scene01').addClass('showContent');

                //  bind scroll
                setTimeout(function () {
                    $('.scene01').addClass('viewContent');
                    scroll = new IScroll('#content', { bounce: false, mouseWheelSpeed: 30 });

                    //  go to 快门 scene
                    // setTimeout(app.bindScene02, 2000);
                }, 2000);
            }
        }
    },

    bindScene02: function () {
        $('.scene02').css({'display': 'block'});

        setTimeout(function () {
            $('.scene02').addClass('active');

            //  main scene leave
            setTimeout(function () {
                $('.main').addClass('leave');

                setTimeout(function () {
                    app.bindFinalScene();
                }, 2500);
            }, 2200);
        }, 100);
    },

    bindFinalScene: function () {
        $('.scene-final').addClass('active');

        setTimeout(function () {
            $('.main').remove();
        }, 2000);

        $('.scene-final').on('touchstart', function () {
            $('.scene-final .tips').addClass('active');

            setTimeout(function () {
                $('.scene-final .tips').removeClass('active');
            }, 3000);
        });
    },

    create: function (){
        setTimeout(start, 2000);

        function start () {
            $('.loading').addClass('active');

            //  show scene 01
            setTimeout(app.bindScene01, 1600);
        }
    },

    start: function (){
        this.create();
    }
};

$(function (){
    window.onload = window.onresize = function(){
        pageResponse({
            selectors : '.page',     //模块选择器，使用querySelectorAll的方法
            mode : 'cover',     // auto || contain || cover
            width : '1080',      //输入页面的宽度，只支持输入数值，默认宽度为320px
            height : '1920'      //输入页面的高度，只支持输入数值，默认高度为504px
        })
    };

    // init app
    app.start();
    console.log('app started success...');
});

