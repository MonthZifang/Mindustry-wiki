// START   参数处理/markdown加载
const urlParams = new URLSearchParams(window.location.search); // 获取网址后参数
const id = urlParams.get("id");

console.log(id);

if (id == null) {
  // 没有参数
  output.innerHTML = "<p>网址错误！请确认你是否是通过页面链接进入该网页！</p>";
  console.error("网址错误！请确认你是否是通过页面链接进入该网页！");
} else {
  fetch("/items/types.json")
    .then((res) => res.text())
    .then((text) => {
      const types = JSON.parse(text);
      console.log(types);
      console.log(types[id])
      if (types[id] == null) {
        output.innerHTML = "<p>网址错误！请确认你是否是通过页面链接进入该网页！</p>";
        console.error("该物品不存在！");
      } else if (types[id] == "unit_friendly") {
        // 单位 友方 非制作
        fetch("/items/units/" + id + ".json") // 获取 JSON 文件并替换数据 ###未作安全处理！###
          .then((res) => res.text())
          .then((text) => {
            const obj = JSON.parse(text);
            console.log(obj.name.zh);
            if (obj.build == 0) {
              fetch("/items/units/" + obj.describe + ".md") // 获取 Markdown 文件 ###未作安全处理！###
                .then((res) => res.text())
                .then((text) => {
                  output.innerHTML = marked.parse(text); // 解析并显示 Markdown
                  console.log("/items/units/" + obj.describe + ".md");
                  console.log(output.innerHTML);
                  setList();
                })
                .catch((error) => {
                  console.error("Error loading README.md:", error);
                  output.innerHTML = "<p>抱歉，数据加载失败...请尝试刷新网页。</p>";
                });
              // START   数据替换
              document.getElementById("pic").src = "/src/datas/unit/" + obj.pic;
              document.getElementById("name").textContent = obj.name.zh; // 名字

              table =
                "<tr><th>属性</th><th>值</th></tr>" +
                "<tr><td>名称</td><td>" + obj.name.zh + "</td></tr>" +
                "<tr><td>类型</td><td>己方单位</td></tr>" +
                "<tr><td>生命值</td><td>" + obj.info.health + "</td></tr>" +
                "<tr><td>护甲值</td><td>" + obj.info.armor + "</td></tr>" +
                "<tr><td>大小</td><td>" + obj.info.size + "</td></tr>";
              
              var build_uses = "";
              if (obj.info.build_use == 0) {

              } else {
                for (var i = 0; i < obj.info.build_use; i++) {
                  build_uses =
                    build_uses + obj.info.build_uses1[i];
                }
                table = table + "<tr><td>建造花费</td><td>" + build_uses + "</td></tr>"
              }
              
              if (obj.info.fly == true) {
                table = table + "<tr><td>空中单位</td><td>是</td></tr>";
              } else {
                table = table + "<tr><td>空中单位</td><td>否</td></tr>";
              }
              table = table +
                "<tr><td>速度</td><td>" + obj.info.speed + "</td></tr>";
              if (obj.info.fast == true) {

              } else {
                table = table + "<tr><td>可助推</td><td>否</td></tr>";
              }
              table = table +
                "<tr><td>建造速度</td><td>" + obj.info.build_speed + " %</td></tr>" +
                "<tr><td>挖掘速度</td><td>" + obj.info.mining_speed + " %</td></tr>";
              if (obj.info.different.zh == "") {
              } else {
                table = table + "<tr><td>能力</td><td>" + obj.info.different.zh + "</td></tr>";
              }
              var collectable_minerals = "";
              if (obj.info.collectable_mineral == 0) {

              } else {
                for (var i = 0; i < obj.info.collectable_mineral; i++) {
                  collectable_minerals =
                    collectable_minerals + obj.info.collectable_minerals[i];
                }
                table = table +
                "<tr><td>采集列表</td><td>" + collectable_minerals + "</td></tr>"
              }
              table = table +
                "<tr><td>物品容量</td><td>" + obj.info.item_capacity + " 个</td></tr>" +
                "<tr><td>武器</td><td>" + "开火速率：" + obj.info.weapons.fire_rate + " / 秒<br>伤害：" + obj.info.weapons.injuries + "<br>" + obj.info.weapons.notes.zh + "</td></tr>" +
                "<tr><td>攻击范围</td><td>" + obj.info.weapons.range + "</td></tr>";


              if (obj.info.weapons.attacking.airborne_unit == true) {
                table = table + "<tr><td>攻击空中单位</td><td>是</td></tr>";
              } else {
                table = table + "<tr><td>攻击空中单位</td><td>否</td></tr>";
              }
              if (obj.info.weapons.attacking.ground_unit == true) {
                table = table + "<tr><td>攻击地面单位</td><td>是</td></tr>";
              } else {
                table = table + "<tr><td>攻击地面单位</td><td>否</td></tr>";
              }
              






              document.getElementById("table").innerHTML = table;
              // END   数据替换
            } else {
              output.innerHTML =
                "<p>网址错误！请确认你是否是通过页面链接进入该网页！</p>";
              console.error("网址错误！请确认你是否是通过页面链接进入该网页！");
            }
          })
          .catch((error) => {
            console.error("Error loading data:", error);
            output.innerHTML =
              "<p>抱歉，数据加载失败，原因未知。请尝试刷新网页。</p>";
          });
      } else if (types[id] == "block_wall") {
        // 方块 墙体
        fetch("/items/blocks/" + id + ".json") // 获取 JSON 文件并替换数据 ###未作安全处理！###
          .then((res) => res.text())
          .then((text) => {
            const obj = JSON.parse(text);
            console.log(obj.name.zh);
            
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
              document.getElementById("pic").src = "/src/datas/buildings/" + obj.pic;
              document.getElementById("name").textContent = obj.name.zh; // 名字

              table =
                "<tr><th>属性</th><th>值</th></tr>" +
                "<tr><td>名称</td><td>" + obj.name.zh + "</td></tr>" +
                "<tr><td>类型</td><td>墙体</td></tr>" +
                "<tr><td>生命值</td><td>" + obj.info.health + "</td></tr>" +
                "<tr><td>大小</td><td>" + obj.info.size + "</td></tr>";
              
              var build_uses = "";
              if (obj.info.build_use == 0) {

              } else {
                for (var i = 0; i < obj.info.build_use; i++) {
                  build_uses =
                    build_uses + obj.info.build_uses1[i];
                }
                table = table + "<tr><td>建造花费</td><td>" + build_uses + "</td></tr>"
              }
              
              table = table +
                "<tr><td>建造耗时</td><td>" + obj.info.build_time + " 秒</td></tr>";
              if (obj.info.different.zh == "") {
              } else {
                table = table + "<tr><td>能力</td><td>" + obj.info.different.zh + "</td></tr>";
              }
              
              document.getElementById("table").innerHTML = table;
              // END   数据替换
            
            
          })
          .catch((error) => {
            console.error("Error loading data:", error);
            output.innerHTML =
              "<p>抱歉，数据加载失败，原因未知。请尝试刷新网页。</p>";
          });
      }
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
