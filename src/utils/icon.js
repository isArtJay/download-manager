const icon = {

  message: {
    offset: 0,
    running: false
  },

  /**
   * 设置自定义颜色的图标
   * @param color {String} 颜色
   */
  setBrowserActionIcon(color) {
    let imageData = this.drawIcon(color, 'black', false)
    if (imageData) {
      chrome.browserAction.setIcon({imageData: imageData})
    }
  },

  /**
   * 设置自定义颜色的图标
   * @param color1 {String} 图标颜色1。没有下载文件时的图标颜色
   * @param color2 {String} 图标颜色2。下载文件时的图标滚动颜色
   */
  setRunningBrowserActionIcon(color1, color2) {
    setTimeout(() => {
      let imageData = this.drawIcon(color1, color2, true)
      if (imageData) {
        chrome.browserAction.setIcon({imageData: imageData})
      }

      if (this.message.running) {
        this.setRunningBrowserActionIcon(color1, color2)
      }
    }, 80)
  },

  /**
   * 设置自定义颜色的图标
   * @param color1 {String} 图标颜色1。没有下载文件时的图标颜色
   * @param color2 {String} 图标颜色2。下载文件时的图标滚动颜色
   */
  startRunning(color1, color2) {
    icon.message.running = true
    icon.setRunningBrowserActionIcon(color1, color2)
  },

  /**
   * 停止运行。也就是icon停止滚动动画
   */
  stopRunning() {
    icon.message.running = false
  },

  /**
   * 停止运行。也就是icon停止滚动动画
   * @param color {String} 颜色
   */
  restoreDefaultIcon(color) {
    icon.message.running = false
    this.setBrowserActionIcon(color)
  },

  /**
   * 设置自定义颜色的图标
   * @param color1 {String} 图标颜色1。没有下载文件时的图标颜色
   * @param color2 {String} 图标颜色2。下载文件时的图标滚动颜色
   * @param loop {Boolean}
   * @return ImageData
   */
  drawIcon(color1, color2, loop) {
    let canvas = document.createElement('canvas')
    canvas.width = canvas.height = 19
    document.body.appendChild(canvas)
    let ctx = canvas.getContext('2d')

    ctx.strokeStyle = 'rgba(0, 0, 0, 0)'
    ctx.scale(0.0185546875, 0.0185546875)
    ctx.beginPath()
    ctx.moveTo(900.58513906, 509.43943584)
    ctx.lineTo(524.45655459, 882.01902676)
    ctx.bezierCurveTo(517.3594666, 889.11611475, 506.71518331, 889.11611475, 499.61809531, 882.01902675)
    ctx.lineTo(123.48861084, 509.43943584)
    ctx.bezierCurveTo(112.84432754000001, 497.01975663999997, 119.59694932000001, 479.27748535, 135.90829004, 479.27748536)
    ctx.lineTo(325.7470795, 479.27748536)
    ctx.lineTo(325.74707949, 156.1742501)
    ctx.bezierCurveTo(325.74707949, 145.52906768, 334.61866426, 136.65748202999998, 345.26294756, 136.65748202999998)
    ctx.lineTo(678.81170146, 136.65748202999998)
    ctx.bezierCurveTo(689.45598476, 136.65748202999998, 698.32756953, 145.52906679999998, 698.32756953, 157.94784688)
    ctx.lineTo(698.32756953, 479.27748535)
    ctx.lineTo(888.16635898, 479.27748535)
    ctx.bezierCurveTo(904.13233438, 479.27838535, 911.22942237, 498.79515254, 900.58513906, 509.43943584)
    ctx.closePath()

    if (loop) {
      // 绘制下载滚动动画
      let gradient = ctx.createLinearGradient(320, 160, 320, 900)

      let v1 = this.message.offset
      if (v1 <= 0.6) {
        gradient.addColorStop(0, color2)
        gradient.addColorStop(v1, color2)
        gradient.addColorStop(v1, color1)
        gradient.addColorStop(1, color1)
      } else {
        let v2 = v1 - 0.6
        gradient.addColorStop(0, color1)
        gradient.addColorStop(v2, color2)
        if (v2 < 0.4) {
          // "#00A213"
          gradient.addColorStop(v1, color2)
          gradient.addColorStop(v1, color1)
          gradient.addColorStop(1, color1)
        } else {
          gradient.addColorStop(1, color2)
        }
      }

      if ((this.message.offset += 0.09) > 1.6) {
        this.message.offset = 0
      }

      ctx.fillStyle = gradient
    } else {
      ctx.fillStyle = color1
    }

    ctx.fill()

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    canvas.parentNode.removeChild(canvas)

    return imageData
  }

}

export default icon