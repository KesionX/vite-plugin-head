const pluginHead = require('../packages/vite-plugin-head/dist').default;


const res = pluginHead({
    title: 'kesion',
    transformLink(attrs) {
        attrs['custom-key'] = "hello";
        attrs['rel'] = "mo-preload";
        return attrs;
    }
}).transformIndexHtml(`
<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      #oil-saas__app-loading {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
            -ms-flex-align: center;
                align-items: center;
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 10;
      }

      .oil-saas__yuntan {
        font-size: 16px;
        margin: -124px 0px 42px 0px;
      }

      .oil-saas__loading-title {
        margin: 24px 0px;
        color: #999;
      }

      .oil-saas-cube-grid {
        width: 40px;
        height: 40px;
      }

      .oil-saas-cube-grid .oil-saas-cube {
        width: 33%;
        height: 33%;
        background-color: #053dc8;
        float: left;
        -webkit-animation: oil-saas-cubeGridScaleDelay 1.3s infinite ease-in-out;
        animation: oil-saas-cubeGridScaleDelay 1.3s infinite ease-in-out;
      }
      .oil-saas-cube-grid .oil-saas-cube1 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }
      .oil-saas-cube-grid .oil-saas-cube2 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }
      .oil-saas-cube-grid .oil-saas-cube3 {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
      .oil-saas-cube-grid .oil-saas-cube4 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }
      .oil-saas-cube-grid .oil-saas-cube5 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }
      .oil-saas-cube-grid .oil-saas-cube6 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }
      .oil-saas-cube-grid .oil-saas-cube7 {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
      }
      .oil-saas-cube-grid .oil-saas-cube8 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }
      .oil-saas-cube-grid .oil-saas-cube9 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }

      @-webkit-keyframes oil-saas-cubeGridScaleDelay {
        0%,
        70%,
        100% {
          -webkit-transform: scale3D(1, 1, 1);
          transform: scale3D(1, 1, 1);
        }
        35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
      }

      @keyframes oil-saas-cubeGridScaleDelay {
        0%,
        70%,
        100% {
          -webkit-transform: scale3D(1, 1, 1);
          transform: scale3D(1, 1, 1);
        }
        35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
      }
    </style>
    <script type="module" crossorigin="" src="/assets/index.316cbf01.js"></script>
    <link rel="modulepreload" href="/js/vue/vue.e1734731.js">
    <link rel="modulepreload" href="/js/vendor/vendor.cccc5a1a.js">
    <link rel="modulepreload" href="/js/ant-design-vue/ant-design-vue.703bce3a.js">
    <link rel="modulepreload" href="/js/antv/antv.da5d1929.js">
    <link rel="modulepreload" href="/js/saas-ui/saas-ui.fc447ec7.js">
    <link rel="preload" href="/assets/ant-design-vue/ant-design-vue-ebf9950e.css">
    <link rel="preload" href="/assets/saas-ui/saas-ui-634b0a9c.css">
    <link rel="preload" href="/assets/index/index-8df8383a.css">
  </head>
  <body>
    <div id="oil-saas__app-loading">
      <div class="oil-saas__yuntan">云碳时代·现代化SaaS加油站服务商</div>
      <div class="oil-saas-cube-grid">
        <div class="oil-saas-cube oil-saas-cube1"></div>
        <div class="oil-saas-cube oil-saas-cube2"></div>
        <div class="oil-saas-cube oil-saas-cube3"></div>
        <div class="oil-saas-cube oil-saas-cube4"></div>
        <div class="oil-saas-cube oil-saas-cube5"></div>
        <div class="oil-saas-cube oil-saas-cube6"></div>
        <div class="oil-saas-cube oil-saas-cube7"></div>
        <div class="oil-saas-cube oil-saas-cube8"></div>
        <div class="oil-saas-cube oil-saas-cube9"></div>
      </div>
      <div class="oil-saas__loading-title">加载中，请稍等……</div>
    </div>
    <div id="app"></div>
    
  

</body></html>
`)

console.log(res);
