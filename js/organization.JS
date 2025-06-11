const items = document.querySelectorAll(".Jump");
const tooltip = document.getElementById("tooltip");
const tooltipContent = document.getElementById("tooltipContent");
const closeBtn = document.getElementById("closeBtn");

let hoverTimer = null;
let tooltipVisible = false;

// 初始化为隐藏状态
tooltip.classList.add("hide");

items.forEach(item => {
  item.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      const info = item.dataset.info;
      tooltipContent.innerText = info;
      tooltip.classList.remove("hide");
      tooltip.classList.add("show");
      tooltipVisible = true;
    }, 2000);
  });

  item.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
  });
});

closeBtn.addEventListener("click", () => {
  tooltip.classList.remove("show");
  tooltip.classList.add("hide");
  tooltipVisible = false;
});

document.addEventListener("click", (e) => {
  const insideTooltip = tooltip.contains(e.target);
  const insideItem = [...items].some(item => item.contains(e.target));

  if (!insideTooltip && !insideItem && tooltipVisible) {
    tooltip.classList.remove("show");
    tooltip.classList.add("hide");
    tooltipVisible = false;
  }
});
