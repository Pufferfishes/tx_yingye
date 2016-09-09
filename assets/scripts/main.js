// Created by sam mok 2015(Siso brand interactive team).

"use strict";

//  limit browser drag move
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
},true);

var app = {
    create: function (){

    },

    start: function (){
        this.create();
    }
};

$(function (){
    window.onload = window.onresize = function(){
        pageResponse({
            selectors : '.page',     //模块选择器，使用querySelectorAll的方法
            mode : 'contain',     // auto || contain || cover
            width : '1080',      //输入页面的宽度，只支持输入数值，默认宽度为320px
            height : '1920'      //输入页面的高度，只支持输入数值，默认高度为504px
        })
    };

    // init app
    app.start();
    console.log('app started success...');
});

