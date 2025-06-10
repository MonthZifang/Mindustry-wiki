/* ========================================================== 
             js框架，对框架加载等基础服务提供支持
                禁止乱动，否则会导致网站错误！
========================================================== */

class HeaderComponent extends HTMLElement {// 链接<app-header></app-header>，实现加载框架frame.html
  constructor() {
    super();
    fetch('/html/frames/frame.html')
      .then(res => res.text())
      .then(html => this.innerHTML = html);
  }
}
customElements.define('app-header', HeaderComponent);

