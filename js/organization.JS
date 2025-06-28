const items = document.querySelectorAll(".Jump");
const tooltip = document.getElementById("tooltip");
const tooltipContent = document.getElementById("tooltipContent");
const closeBtn = document.getElementById("closeBtn");

let hoverTimer = null; // 控制悬停弹出
let hideTimer = null;  // 控制移开隐藏

// 初始化为隐藏状态
tooltip.classList.add("hide");

// 加载 Font.json 并填充 data-info
fetch('/items/units/unit_describe.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // 遍历所有带有 .Jump 类的元素
    items.forEach(item => {
      const key = item.getAttribute("data-key"); // 获取 data-key 的值
      if (data.units[key]) {
        item.setAttribute("data-info", data.units[key]); // 从 JSON 中填充 data-info
      } else {
        item.setAttribute("data-info", "暂无简介信息"); // 如果未找到，设置默认值
      }
    });
  })
  .catch(error => console.error("加载 单位描述文件(unit_describe.json) 时出错:", error));

// 悬浮事件
items.forEach(item => {
  item.addEventListener("mouseenter", () => {
    // 清除隐藏定时器，防止鼠标快速移入移出导致闪烁
    clearTimeout(hideTimer);

    // 设置悬停定时器，延迟 2 秒显示浮窗
    hoverTimer = setTimeout(() => {
      const info = item.getAttribute("data-info"); // 获取 data-info 的值
      tooltipContent.innerText = info; // 设置浮窗内容
      tooltip.classList.remove("hide");
      tooltip.classList.add("show");
    }, 2000); // 延迟 2 秒显示浮窗
  });

  item.addEventListener("mouseleave", () => {
    // 清除悬停定时器，防止鼠标快速移出导致浮窗仍然弹出
    clearTimeout(hoverTimer);

    // 设置隐藏定时器，延迟 1.5 秒隐藏浮窗
    hideTimer = setTimeout(() => {
      tooltip.classList.remove("show");
      tooltip.classList.add("hide");
    }, 1500); // 延迟 1.5 秒隐藏浮窗
  });
});

// 点击关闭按钮立即隐藏浮窗
closeBtn.addEventListener("click", () => {
  clearTimeout(hoverTimer);
  clearTimeout(hideTimer);
  tooltip.classList.remove("show");
  tooltip.classList.add("hide");
});

// 点击窗口外部立即隐藏浮窗
document.addEventListener("click", (e) => {
  if (!tooltip.contains(e.target) && ![...items].some(item => item.contains(e.target))) {
    clearTimeout(hoverTimer);
    clearTimeout(hideTimer);
    tooltip.classList.remove("show");
    tooltip.classList.add("hide");
  }
});