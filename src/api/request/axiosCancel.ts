import type { AxiosRequestConfig } from 'axios';

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, AbortController>();

export function getPendingUrl(config: AxiosRequestConfig) {
  return [config.method, config.url].join('&');
}
export class AxiosCanceler {
  /**
   * @description: 添加请求
   * @param {Object} config
   * @return void
   */
  addPending(config: AxiosRequestConfig) {
    // 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingMap.set(url, controller);
  }

  /**
   * @description: 移除请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    // 如果在 pending 中存在当前请求标识，需要取消当前请求
    const controller = pendingMap.get(url);
    controller && controller.abort();
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach((controller) => {
      controller && controller.abort();
    });
    pendingMap.clear();
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, AbortController>();
  }
}
