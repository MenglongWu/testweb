<!DOCTYPE html>
<html lang="en">
<title>测试野火的上电时序</title>

<head>
    <meta name="description" content="Bomberman II is a classic action-puzzle game developed by Hudson Soft for the NES. The player controls Bomberman, navigating through mazes while placing bombs to defeat enemies and clear obstacles.">
    <meta name="keywords" content="[&#39;Bomberman II&#39;, &#39;NES Bomberman&#39;, &#39;Hudson Soft&#39;, &#39;classic NES games&#39;, &#39;Bomberman series&#39;, &#39;action puzzle games&#39;, &#39;retro games&#39;, &#39;1993 NES games&#39;]">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>


<style>
    body {
        display: flex;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    #logo {
        padding: 20px;
    }

    #sidebar {
        width: 250px;
        min-width: 250px;
        height: 100vh;
        overflow-y: auto;
        position: sticky;
        top: 0;
        background-color: #f8f9fa;
        padding: 20px;
        box-sizing: border-box;
        border-right: 1px solid #e1e4e8;
    }


    #content {
        flex: 1;
        /* max-width: 800px; */
        margin: 0 auto;


        max-width: min(800px, calc(90vw - 250px));
        /* max-width:100%; */
        /* 避免超出屏幕，考虑 sidebar */
        padding: 20px;
        padding-bottom: 200px;
        box-sizing: border-box;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }

    #content img {
        max-width: 800%;
        height: auto;
    }


    #content img {
        max-width: 100%;
        height: auto;
        display: block;
    }


    .toc-item {
        padding: 0px 0px;
        margin-top: 0px;
        margin-bottom: 0px;

        padding-top: 0px;
        padding-bottom: 0px;
        list-style: none;
        border-radius: 6px;
        cursor: pointer;
        /* line-height: 0;  */
    }

    .toc-item:hover {
        background-color: #e9ecef;
    }

    .toc-item.active {
        background-color: #dee2e6;
        font-weight: bold;
    }



    .toc-item a {
        display: block;
        /* padding: 20px; */
        /* padding-top: 4px; */
        /* padding-bottom: 10px; */
        padding: 4px 10px;
        width: 100%;
    }

    @media (max-width: 768px) {
        body {
            flex-direction: column;
        }

        #sidebar {
            width: 100%;
            height: auto;
            position: relative;
            border-right: none;
            border-bottom: 1px solid #e1e4e8;
        }


        #content {
            max-width: 100vw;
            /* max-width: 100%; */
            padding-top: 60px;
        }


    }



    /*  */
    /* 汉堡按钮 */
    .menu-button {
        display: none;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1001;
        background-color: #dee2e6;
        color: white;
        font-size: 24px;
        padding: 6px 12px;
        /* padding-left: 20px;
        padding-right: 20px; */
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    /* 移动端样式 */
    @media (max-width: 768px) {
        .menu-button {
            display: block;
        }

        #sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100%;
            background-color: #f8f9fa;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transition: left 0.3s ease;
        }

        #sidebar.active {
            left: 0;
        }

        #content {
            padding-top: 60px;
            /* 给按钮让出位置 */
        }
    }
</style>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const content = document.getElementById("content");
        if (!content) return; // 确保 #content 存在

        // 获取所有 img 元素（转换为数组，避免动态修改时的遍历问题）
        const imgs = Array.from(content.getElementsByTagName("img"));

        imgs.forEach(img => {
            // 跳过已经被包裹的图片（防止重复处理）
            if (img.parentElement.tagName === "A") return;

            const src = img.getAttribute("src");
            if (!src) return; // 如果没有 src，跳过

            // 创建 <a> 标签
            const link = document.createElement("a");
            link.href = src;
            link.setAttribute("target", "_blank"); // 在新标签页打开
            link.setAttribute("rel", "noopener noreferrer"); // 安全优化

            // 用 <a> 包裹 <img>
            img.parentNode.insertBefore(link, img);
            link.appendChild(img);
        });
    });
    // mermaid.initialize({ startOnLoad: true });
</script>

<body>


    <button id="menu-toggle" class="menu-button">☰</button>
    <aside id="sidebar">

        <div id="logo">
            <a href=/blog/imx6>Home</a>

        </div>
        <hr>

        <list id="toc-container">

        </list>
    </aside>
    <section id="content">
        <div><h1 id="_1">测试野火的上电时序</h1>
<blockquote>
<p>2025-04-03</p>
</blockquote>
<p>下面的任何修改，处理器都可以启动，usb能识别到。
<strong>下载led_sram都能执行。</strong>
并且验证没有DDR电源，的确可以下载程序到SRAM，并执行</p>
<p>参考：</p>
<blockquote>
<p><strong>《IMX6ULLRM.pdf》51.5.1 External POR using SRC_POR_B、51.5.2 Internal POR</strong>
<strong>手册框图“Figure 51-1. Chip reset scheme under PMU control”</strong>
POR_B是外部复位，处理器还有内部POR复位，
当使用外部复位时，POR_B下拉多久都行
当使用内部复位，VDD_SOC_IN不能超前VDD_ARM_IN 1ms</p>
</blockquote>
<h1 id="_2">实验</h1>
<p><img alt="" src="/static/blog/imx6/history/2025//03/images/yehuo-power.png" /></p>
<p>原始野火原理图</p>
<ul>
<li>CH1:U9-pin5 </li>
<li>CH2:U9-pin1 </li>
</ul>
<p><strong>间接表明VCC_SNVS_IN和VDD_SOC_IN存在先后顺序</strong>
延迟190ms
<img alt="" src="/static/blog/imx6/history/2025//03/images/imx6/yh-u6-p5-p1_000.png" /></p>
<h1 id="_3">实验</h1>
<p>去掉R74</p>
<ul>
<li>CH1:U9-pin5  </li>
<li>CH2:U9-pin4 使能</li>
</ul>
<p>可知，MAX809的RESET特性是没法到达低电平
并且断开后，同时测量PMIC_ON_REG，开始上电时候该IO是低电平，上电稳定后是高电平，所以猜测该IO是高阻。
可知，MT9700的EN上拉后大概10ms后OUT才能输出</p>
<p><img alt="" src="/static/blog/imx6/history/2025//03/images/yehuo-rmr74.png" />
<img alt="" src="/static/blog/imx6/history/2025//03/images/imx6/yh-u6-p5-p4-r74nc-p4pu15k_000.png" />
<img alt="" src="/static/blog/imx6/history/2025//03/images/reset-pull-up.png" /></p>
<h1 id="_4">实验</h1>
<p>将野火电路图改成与我的（基本）一样（R74还没焊接回去）：</p>
<ul>
<li>去掉R74</li>
<li>pin4和pin5构成15K上拉</li>
</ul>
<p><img alt="" src="/static/blog/imx6/history/2025//03/images/yehuo-rmr74-rmu16-p14up15k.png" /></p>
<p><img alt="" src="/static/blog/imx6/history/2025//03/images/imx6/yh-u6-p5-p4-r74nc-p4pu15k-u16nc_000.png" /></p></div>
    </section>
</body>





<link rel="stylesheet" href="/static/md/github-light.css.gz">
<!-- <link rel="stylesheet" href="/static/md/medium.css"> -->
<link rel="stylesheet" href="/static/md/code.css.gz">

<!-- <script async src="/static/md/tex-mml-chtml.js.gz"></script> -->
<script>
    // 当存在 "<p>&&"" 才加载
    document.addEventListener('DOMContentLoaded', function () {
        const paragraphs = document.getElementsByTagName('p');
        let hasMathJaxContent = false;

        for (let p of paragraphs) {
            if (p.textContent.includes('$$')) {
                hasMathJaxContent = true;
                break;
            }
        }
        if (hasMathJaxContent) {
            const script = document.createElement('script');
            script.async = true;
            script.src = '/static/md/tex-mml-chtml.js.gz';

            document.head.appendChild(script);
        }
    });
</script>


<!-- <script type="text/javascript" async src="/static/md/mermaid.min.js.gz" charset="UTF-8"></script> -->
<script>
    // 当存在<div class="mermaid">才加载
    document.addEventListener('DOMContentLoaded', function () {
        var mermaidDivs = document.querySelectorAll('div.mermaid');
        if (mermaidDivs.length > 0) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = '/static/md/mermaid.min.js.gz';
            script.charset = 'UTF-8';
            document.head.appendChild(script);

            // 可选：加载完成后初始化mermaid
            script.onload = function () {
                if (typeof mermaid !== 'undefined') {
                    mermaid.initialize({ startOnLoad: true });
                }
            };
        }
    });
</script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const tocContainer = document.getElementById("toc-container");
        if (!tocContainer) return;

        // fetch("/index/blog/core")
        fetch("/index/blog/imx6")
            .then(response => response.json())
            .then(data => {
                const currentPath = window.location.pathname;

                // 1. 先统一生成所有目录项
                data.forEach(item => {
                    const li = document.createElement("li");
                    li.className = "toc-item";

                    const link = document.createElement("a");
                    link.href = item.url;
                    // link.innerHTML = `<i>${item.title}</i>`;
                    link.innerHTML = `${item.title}`;
                    link.style.textDecoration = "none";
                    link.style.color = "inherit";

                    li.appendChild(link);

                    tocContainer.appendChild(li);
                });

                // data.forEach(item => {
                //     const li = document.createElement("li");
                //     li.className = "toc-item";

                //     const link = document.createElement("a");
                //     link.href = item.url;
                //     link.innerHTML = `${item.title}`;
                //     link.style.textDecoration = "none";
                //     link.style.color = "inherit";
                //     // link.style.display = "block"; // 设置为块级元素
                //     // link.style.width = "100%"; // 使链接宽度为 100%
                //     link.style.padding = "10px"; // 添加一些内边距以增加点击区域

                //     li.appendChild(link);
                //     tocContainer.appendChild(li);
                // });

                // 2. 所有目录加载完毕后，再判断匹配项
                const tocItems = tocContainer.querySelectorAll("li.toc-item");
                let matchedItem = null;

                tocItems.forEach(li => {
                    const a = li.querySelector("a");
                    if (!a) return;

                    const itemPath = new URL(a.href, window.location.origin).pathname;

                    if (
                        currentPath === itemPath ||
                        currentPath.startsWith(itemPath)
                    ) {
                        matchedItem = li;
                    }
                });

                // // 3. 激活并滚动
                // if (matchedItem) {
                //     matchedItem.classList.add("active");

                //     // 将其滚动到容器顶部
                //     matchedItem.scrollIntoView({
                //         behavior: "auto",    // 或 "smooth" 平滑滚动
                //         block: "start",      // 滚到容器顶部
                //         inline: "nearest"
                //     });
                // }
                // 3. 激活并滚动
                if (matchedItem) {
                    matchedItem.classList.add("active");

                    // 将其滚动到侧边栏容器的顶部
                    const sidebar = document.getElementById("sidebar");
                    if (sidebar) {
                        // 计算匹配项相对于侧边栏的顶部位置
                        const itemTop = matchedItem.offsetTop;
                        // 滚动侧边栏而不是整个页面
                        sidebar.scrollTop = itemTop - sidebar.offsetTop;
                    }
                }
            })
            .catch(error => {
                console.error("加载目录失败:", error);
                tocContainer.innerText = "目录加载失败";
            });
    });
</script>




<script>
    document.addEventListener("DOMContentLoaded", function () {
        const toggleBtn = document.getElementById("menu-toggle");
        const sidebar = document.getElementById("sidebar");

        toggleBtn.addEventListener("click", function () {
            sidebar.classList.toggle("active");
        });
    });
</script>


<style>
#content h1:first-of-type {
  font-size: 2.5rem; /* 更大的字号 */
  text-align: left;
  /* color: var(--color-primary);  */
}


    
    
</style>
</html>

</html>