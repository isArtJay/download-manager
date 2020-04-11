/* eslint-disable no-undef */

const storage = {
  parseBoolean(value) {
    if (typeof value === 'boolean') {
      return value
    } else if (typeof value === 'string') {
      return value === 'true'
    } else {
      return false
    }
  },

  /**
   * 是否同步设置
   * 利用chrome.storage API实现登录谷歌账户时能够异地同步设置数据
   * @param value {boolean}
   */
  setSync(value) {
    chrome.storage.sync.set({'sync': this.parseBoolean(value)})
  },
  /**
   * 获取同步设置
   * @return {Promise}
   */
  getSync() {
    return new Promise(resolve => {
      chrome.storage.sync.get(['sync'], result => resolve(result.sync))
    })
  },

  /**
   * 设置配置
   * 将同步和未同步时的方法统一包装下，方便使用
   * @param key {String}
   * @param value
   */
  setItem(key, value) {
    this.getSync().then(isSync => {
      if (isSync) {
        chrome.storage.sync.set({[key]: value})
      } else {
        chrome.storage.local.set({[key]: value})
      }
    })
  },
  /**
   * 将同步和未同步时的方法统一包装下，方便使用
   * @param key {String}
   * @return {Promise}
   */
  getItem(key) {
    return new Promise(resolve => {
      this.getSync().then(result => {
        if (result) {
          chrome.storage.sync.get([key], result => resolve(result[key]))
        } else {
          chrome.storage.local.get([key], result => resolve(result[key]))
        }
      })
    })
  },

  /**
   * 设置是否关闭tooltip
   * @param value {boolean}
   */
  setCloseTooltip(value) {
    this.setItem('close_tooltip', value)
  },
  /**
   * @return {Promise}
   */
  getCloseTooltip() {
    return this.getItem('close_tooltip')
  },

  /**
   * 是否关闭左键打开文件
   * @param value {boolean}
   */
  setLeftClickFile(value) {
    this.setItem('left_click_file', value)
  },
  /**
   * @return {Promise}
   */
  getLeftClickFile() {
    return this.getItem('left_click_file')
  },

  /**
   * 是否启用右键复制文件名
   * @param value {boolean}
   */
  setRightClickFile(value) {
    this.setItem('right_click_file', value)
  },
  /**
   * @return {Promise}
   */
  getRightClickFile() {
    return this.getItem('right_click_file')
  },

  /**
   * 是否启用左键打开文件下载链接
   * @param value {boolean}
   */
  setLeftClickUrl(value) {
    this.setItem('left_click_url', value)
  },
  /**
   * @return {Promise}
   */
  getLeftClickUrl() {
    return this.getItem('left_click_url')
  },

  /**
   * 是否启用右键复制下载链接
   * @param value {boolean}
   */
  setRightClickUrl(value) {
    this.setItem('right_click_url', value)
  },
  /**
   * @return {Promise}
   */
  getRightClickUrl() {
    return this.getItem('right_click_url')
  },

  /**
   * 下载开始时是否通知消息
   * @param value {boolean}
   */
  setDownloadStartedNotification(value) {
    this.setItem('download_started_notification', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadStartedNotification() {
    return this.getItem('download_started_notification')
  },

  /**
   * 下载完成时是否通知消息
   * @param value {boolean}
   */
  setDownloadCompletedNotification(value) {
    this.setItem('download_completed_notification', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadCompletedNotification() {
    return this.getItem('download_completed_notification')
  },

  /**
   * 下载有危险文件时是否通知消息
   * @param value {boolean}
   */
  setDownloadWarningNotification(value) {
    this.setItem('download_warning_notification', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadWarningNotification() {
    return this.getItem('download_warning_notification')
  },

  /**
   * 下载开始时是否声音提示
   * @param value {boolean}
   */
  setDownloadStartedTone(value) {
    this.setItem('download_started_tone', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadStartedTone() {
    return this.getItem('download_started_tone')
  },

  /**
   * 下载完成后是否声音提示
   * @param value {boolean}
   */
  setDownloadCompletedTone(value) {
    this.setItem('download_completed_tone', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadCompletedTone() {
    return this.getItem('download_completed_tone')
  },

  /**
   * 下载危险文件时是否声音提示
   * @param value {boolean}
   */
  setDownloadWarningTone(value) {
    this.setItem('download_warning_tone', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadWarningTone() {
    return this.getItem('download_warning_tone')
  },

  /**
   * 浏览器手动下载文件的上下文菜单
   * @param value {boolean}
   */
  setDownloadContextMenus(value) {
    this.setItem('download_context_menus', value)
  },
  /**
   * @return {Promise}
   */
  getDownloadContextMenus() {
    return this.getItem('download_context_menus')
  },

  /**
   * 设置图标颜色
   * @param value {String}
   */
  setIconColor(value) {
    this.setItem('icon_color', value)
  },
  /**
   * @return {Promise}
   */
  getIconColor() {
    return this.getItem('icon_color')
  },

  /**
   * 设置图标下载动画颜色
   * @param value {String}
   */
  setIconDownloadingColor(value) {
    this.setItem('icon_downloading_color', value)
  },
  /**
   * @return {Promise}
   */
  getIconDownloadingColor() {
    return this.getItem('icon_downloading_color')
  },

  /**
   * 如果对应key的value为null的话，就设置默认的value
   * @param key {String}
   * @param defaultValue
   */
  async setDefaultIfNull(key, defaultValue) {
    let value = await this.getItem(key)
    if (typeof value === 'undefined' || value === null) {
      this.setItem(key, defaultValue)
    }
  },

  /**
   * 当获取配置为null时，提前设置默认配置
   * 只需要执行一次
   */
  async defaultSettings() {
    // 插件设置默认启用同步
    await this.setDefaultIfNull('sync', true)
    // 图标默认颜色
    await this.setDefaultIfNull('icon_color', '#000000')
    await this.setDefaultIfNull('icon_downloading_color', '#ffa500')
    // 插件设置默认不展示提示信息
    await this.setDefaultIfNull('close_tooltip', true)
    await this.setDefaultIfNull('left_click_file', true)
    await this.setDefaultIfNull('right_click_file', true)
    await this.setDefaultIfNull('left_click_url', true)
    await this.setDefaultIfNull('right_click_url', true)
    // 插件默认关闭下载过程中的通知
    await this.setDefaultIfNull('close_download_notification', true)
    await this.setDefaultIfNull('download_started_notification', false)
    await this.setDefaultIfNull('download_completed_notification', false)
    await this.setDefaultIfNull('download_warning_notification', false)
    await this.setDefaultIfNull('download_started_tone', false)
    await this.setDefaultIfNull('download_completed_tone', false)
    await this.setDefaultIfNull('download_warning_tone', false)
    // 插件默认关闭下载完成提示音
    await this.setDefaultIfNull('download_completion_tone', false)
    // 插件默认创建下载文件上下文菜单
    await this.setDefaultIfNull('download_context_menus', true)
  }

}

export default storage
