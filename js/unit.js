/*
fetch('http://example.com/data.txt')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.log(error));
// ...........................
*/


// START   参数处理/markdown加载
const urlParams = new URLSearchParams(window.location.search); // 获取网址后参数
const id = urlParams.get("id");

console.log(id);

if (id == null) { // 没有参数
  output.innerHTML = "<p>网址错误！请确认你是否是通过页面链接进入该网页！</p>";
  console.error("网址错误！请确认你是否是通过页面链接进入该网页！");
} else { // 有参数
  fetch("/items/units/" + id + ".json") // 获取 JSON 文件并替换数据 ###未作安全处理！###
    .then((res) => res.text())
    .then((text) => {
      const obj = JSON.parse(text);
      console.log(obj.name.zh);
      
      fetch("/items/units/" + obj.describe + ".md") // 获取 Markdown 文件 ###未作安全处理！###
        .then((res) => res.text())
        .then((text) => {
          output.innerHTML = marked.parse(text); // 解析并显示 Markdown
          console.log("/items/units/" + obj.describe + ".md");
        })
        .catch((error) => {
          console.error("Error loading README.md:", error);
          output.innerHTML = "<p>抱歉，数据加载失败...请尝试刷新网页。</p>";
        });
      // START   数据替换
      document.getElementById("pic").src = "/src/datas/unit/" + obj.pic;// 图片
      document.getElementById("pic").alt = "/src/datas/unit/" + obj.pic;
      document.getElementById("name").textContent = obj.name.zh;// 名字
      if (obj.type == "unit_friendly"){
        document.getElementById("type").textContent = '己方单位';
      }
      document.getElementById("health").textContent = obj.info.health;
      document.getElementById("armor").textContent = obj.info.armor;
      document.getElementById("size").textContent = obj.info.size;
      if (obj.info.fly == true){
        document.getElementById("fly").textContent = "是";
      } else {
        document.getElementById("fly").textContent = "否";
      }
      document.getElementById("speed").textContent = obj.info.speed;
      document.getElementById("build_speed").textContent = obj.info.build_speed;
      document.getElementById("mining_speed").textContent = obj.info.mining_speed;
      var collectable_minerals = "";
      for (var i = 0; i < obj.info.collectable_mineral; i++){
        collectable_minerals = collectable_minerals + obj.info.collectable_minerals[i];
        // .................................... BUG ................................
      }
      document.getElementById("collectable_minerals").textContent = collectable_minerals;
      document.getElementById("item_capacity").textContent = obj.info.item_capacity;
      document.getElementById("weapons").innerHTML = "开火速率：" + obj.info.weapons.fire_rate + " / 秒<br>伤害：" + obj.info.weapons.injuries + "<br>" + obj.info.weapons.notes.zh;
      console.log("开火速率：" + obj.info.weapons.fire_rate + " / 秒\n伤害：" + obj.info.weapons.injuries + "\n" + obj.info.weapons.notes.zh);
      document.getElementById("range").textContent = obj.info.weapons.range;
      if (obj.info.weapons.attacking.airborne_unit == true){
        document.getElementById("airborne_unit").textContent = "是";
      } else {
        document.getElementById("airborne_unit").textContent = "否";
      }
      if (obj.info.weapons.attacking.ground_unit == true){
        document.getElementById("ground_unit").textContent = "是";
      } else {
        document.getElementById("ground_unit").textContent = "否";
      }
      // END   数据替换

    })
    .catch((error) => {
      console.error("Error loading README.md:", error);
      output.innerHTML = "<p>抱歉，数据加载失败...请尝试刷新网页。</p>";
    });
}
// END   参数处理/markdown加载



// START 目录处理
// ***********************************************************************************
/*
unit.js:104  Uncaught ReferenceError: container is not defined
    at HTMLDocument.<anonymous> (unit.js:104:36)

109：36
*/

document.addEventListener('DOMContentLoaded', () => {
      const div_output = document.getElementById('output');
      
      // 方法1：querySelectorAll
      const elementsWithIds = div_output.querySelectorAll('[id]');
      console.log('方法1结果:', Array.from(elementsWithIds).map(el => el.id));
      
      // 方法2：递归检查
      function getIds(el) {
        let ids = [];
        if (el.id) ids.push(el.id);
        for (const child of el.children) {
          ids = ids.concat(getIds(child));
        }
        return ids;
      }
      console.log('方法2结果:', getIds(container));

      // 1. 先确认能获取到div

console.log('div元素:', div_output); // 应该是非null

// 2. 检查div是否有子元素
console.log('子元素数量:', div_output.children.length);

// 3. 检查是否能找到任何带id的元素
console.log('带id的元素:', div_output.querySelectorAll('[id]').length);
    });

/*
document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('container');
      
      // 方法1：querySelectorAll
      const elementsWithIds = container.querySelectorAll('[id]');
      console.log('方法1结果:', Array.from(elementsWithIds).map(el => el.id));
      
      // 方法2：递归检查
      function getIds(el) {
        let ids = [];
        if (el.id) ids.push(el.id);
        for (const child of el.children) {
          ids = ids.concat(getIds(child));
        }
        return ids;
      }
      console.log('方法2结果:', getIds(container));
    });
*/
// END 目录处理