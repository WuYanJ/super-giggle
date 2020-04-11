<template>
  <div id="div_read_area_scrool" class="no-scrollbar--x" :style="'text-align:center;height:'+ '500px;'+'overflow: auto;'">
    <div id="div_read_area"></div>
  </div>
</template>

<script>
  // 参数：the-document={}
  //    属性：
  import pdfjs from 'pdfjs-dist'
  import $ from 'jquery'
  export default {
    name: 'ReadByPdf',
    data () {
      return {
        theReadOnline: {
          current: 1,
          numPages: 0,
          html: ''
        }
      }
    },
    methods: {
      // 初始化pdfjs
      initThePDFJSLIB: function () {
        pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
      },
      // 根据页码获取pdf内容
      loadPDFForTheDocument (index) {
        // 实例化pdfjs
        const url = require('url')
        pdfjs.getDocument(url)
          .then(pdf => {
            // eslint-disable-next-line no-console
            console.log(pdf.numPages)
            // 通过页码获取每页内容
            pdf.getPage(index).then(page => {
              // 获得总页数
              this.theReadOnline.numPages = pdf.numPages

              // eslint-disable-next-line no-console
              console.log(pdf.numPages)
              // 设置页面显示倍数 842×595
              let _clientWidth = document.documentElement.clientWidth * 0.618
              let view = _clientWidth % 842 > 0 ? 1.33 : 1

              // 实例化画布
              let canvas = document.createElement('canvas')
              let context = canvas.getContext('2d')

              let dpr = window.devicePixelRatio || 1
              let bsr = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1
              let ratio = dpr / bsr

              let viewport = page.getViewport(view)

              canvas.width = viewport.width * ratio
              canvas.height = viewport.height * ratio
              // canvas.style.width = viewport.width + 'px'
              // canvas.style.height = viewport.height + 'px'

              // context.setTransform(ratio, 0, 0, ratio, 0, 0)

              let renderContext = {
                canvasContext: context,
                viewport: viewport
              }
              // 追加上新的一页空间
              document.getElementById('div_read_area').appendChild(canvas)
              // 赋值上显示内容
              page.render(renderContext).then(() => {
              })
            })
          })
      },
      watchTheReadScroll: function () {
        let _theVue = this
        // 获取节点
        let _scrollContent = document.getElementById('div_read_area_scrool')
        // 绑定事件
        _scrollContent.addEventListener('scroll', function () {
          var viewH, contentH, scrollTop
          viewH = $(this).height()
          contentH = $(this).get(0).scrollHeight
          scrollTop = $(this).scrollTop()

          // 后期改成传递给父级
          if (scrollTop / (contentH - viewH) >= 1) { // 到达底部时,加载新内容
            _theVue.theReadOnline.current++
            if (_theVue.theReadOnline.current <= _theVue.theReadOnline.numPages) {
              _theVue.loadPDFForTheDocument(_theVue.theReadOnline.current)
            }
          }
        })
      }
    },
    mounted: function () {
      this.initThePDFJSLIB()
      this.watchTheReadScroll()
      this.loadPDFForTheDocument(1)
    }
  }
</script>
