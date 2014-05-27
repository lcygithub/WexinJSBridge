var shareConfig = {
  img: 'http://static.bootcss.com/www/assets/ico/apple-touch-icon-144-precomposed.png',
  url: location.href,
  desc: 'test',
  title: 'LExam',
  timeline_title: "Lexam \nLexam Weixin desc test"
};
(function() {
  if (typeof window.WeixinJSBridge == "object" && isFunction(window.WeixinJSBridge.invoke)) {
    WXReadyFn();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", WXReadyFn, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", WXReadyFn);
      document.attachEvent("onWeixinJSBridgeReady", WXReadyFn);
    }
  }

  function isFunction(obj) {
    return typeof obj == 'function';
  }

  function WXReadyFn() {
    try {
      WeixinJSBridge.on("menu:share:timeline", function() {
        alert(window.shareConfig.desc);
        WeixinJSBridge.invoke("shareTimeline", {
          "img_url": window.shareConfig.img,
          "img_width": 55,
          "img_height": 55,
          "link": isFunction(window.shareConfig.url) ? window.shareConfig.url(1) : window.shareConfig.url,
          "desc": "Lexam Weixin Test",
          "title": window.shareConfig.timeline_title ? window.shareConfig.timeline_title : window.shareConfig.title
        }, function() {
          try {
            isFunction(window.shareConfig.callback) && window.shareConfig.callback();
          } catch (e) {

          }
        });
      });
      if (/android/i.test(navigator.userAgent)) {
        WeixinJSBridge.on("menu:share:weibo", function() {
          WeixinJSBridge.invoke("shareWeibo", {
            "url": isFunction(window.shareConfig.url) ? window.shareConfig.url(2) : window.shareConfig.url,
            "content": window.shareConfig.title + ':' + window.shareConfig.desc
          }, function() {
            try {
              isFunction(window.shareConfig.callback) && window.shareConfig.callback();
            } catch (e) {

            }
          });
        });
      } else {
        WeixinJSBridge.on("menu:share:weibo", function() {
          WeixinJSBridge.invoke("shareWeibo", {
            "img_url": window.shareConfig.img,
            "img_width": 55,
            "img_height": 55,
            "link": isFunction(window.shareConfig.url) ? window.shareConfig.url(2) : window.shareConfig.url,
            "desc": window.shareConfig.desc,
            "title": window.shareConfig.title
          }, function() {
            try {
              isFunction(window.shareConfig.callback) && window.shareConfig.callback();
            } catch (e) {

            }
          });
        });
      }
      WeixinJSBridge.on("menu:share:appmessage", function() {
        WeixinJSBridge.invoke("sendAppMessage", {
          "img_url": window.shareConfig.img,
          "img_width": 55,
          "img_height": 55,
          "link": isFunction(window.shareConfig.url) ? window.shareConfig.url(3) : window.shareConfig.url,
          "desc": window.shareConfig.desc,
          "title": window.shareConfig.title
        }, function() {
          try {
            isFunction(window.shareConfig.callback) && window.shareConfig.callback();
          } catch (e) {

          }
        });
      });
      isFunction(window.shareConfig.readycallback) && window.shareConfig.readycallback();
    } catch (e) {}
  }
})();