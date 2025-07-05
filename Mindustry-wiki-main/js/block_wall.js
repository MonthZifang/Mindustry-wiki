// START   参数处理/markdown加载
const urlParams = new URLSearchParams(window.location.search); // 获取网址后参数
const id = urlParams.get("id");

console.log(id);

if (id == null) {
  // 没有参数
  output.innerHTML = "<p>网址错误！请确认你是否是通过页面链接进入该网页！</p>";
  console.error("网址错误！请确认你是否是通过页面链接进入该网页！");
} else {
  // 有参数
  fetch("/items/blocks/" + id + ".json") // 获取 JSON 文件并替换数据 ###未作安全处理！###
    .then((res) => res.text())
    .then((text) => {
      const obj = JSON.parse(text);
      console.log(obj.name.zh);
      if (obj.type == "block_wall") {
        fetch("/items/blocks/" + obj.describe + ".md") // 获取 Markdown 文件 ###未作安全处理！###
          .then((res) => res.text())
          .then((text) => {
            output.innerHTML = marked.parse(text); // 解析并显示 Markdown
            console.log("/items/blocks/" + obj.describe + ".md");
            console.log(output.innerHTML);
            setList();
          })
          .catch((error) => {
            console.error("Error loading README.md:", error);
            output.innerHTML = "<p>抱歉，数据加载失败...请尝试刷新网页。</p>";
          });
        // START   数据替换
        document.getElementById("pic").src = "/src/datas/buildings/" + obj.pic; // 图片
        document.getElementById("pic").alt = "/src/datas/buildings/" + obj.pic;
        document.getElementById("name").textContent = obj.name.zh; // 名字
        document.getElementById("type").textContent = "城墙方块";
        document.getElementById("notes").textContent = obj.notes.zh;
        document.getElementById("health").textContent = obj.info.health;
        document.getElementById("size").textContent = obj.info.size;
        document.getElementById("build_time").textContent = obj.info.build_time;
        var build_uses = "";
        for (var i = 0; i < obj.info.build_uses; i++) {
          build_uses = build_uses + obj.info.build_uses[i];
        }
        document.getElementById("build_uses").textContent = build_uses;


        document.getElementById("different").textContent = obj.info.different.zh;
        // END   数据替换
      }
    })
    .catch((error) => {
      console.error("Error loading README.md:", error);
      output.innerHTML = "<p>抱歉，数据加载失败...请尝试刷新网页。</p>";
    });
}
// END   参数处理/markdown加载

// START 目录处理
function setList() {
  const div_output = document.getElementById("output");
  /*
  // 1. 先确认能获取到div
  console.log("div元素:", div_output); // 应该是非null

  // 2. 检查div是否有子元素
  console.log("子元素数量:", document.getElementById("output").children.length);

  // 3. 检查是否能找到任何带id的元素
  console.log("带id的元素:", div_output.querySelectorAll("[id]").length);
  */
  const elementsWithIds = div_output.querySelectorAll("[id]");
  console.log(
    "方法1结果:",
    Array.from(elementsWithIds).map((el) => el.id)
  );

  const list = document.getElementById("list");

  list.innerHTML = ""; // 清空
  for (const el of elementsWithIds) {
    const id = el.id;
    list.innerHTML += '<li><a href="#' + id + '">' + id + "</a></li>";
  }
}
// END 目录处理
