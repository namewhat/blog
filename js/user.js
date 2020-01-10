/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
	return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function (args) {
	var result = this;
	if (arguments.length < 1) { return result; }

	var data = arguments; // 如果模板参数是数组
	if (arguments.length === 1 && typeof (args) === "object") {// 如果模板参数是对象
		data = args;
	}
	for (var key in data) {
		var value = data[key];
		if (undefined != value) {
			result = result.replaceAll("\\{" + key + "\\}", value);
		}
	}
	return result;
}

$(document).ready(function() {
	let tool = new Tool();
}).click(function() {
	$('a.sMenu').children('span').removeClass('layui-nav-mored');
	$('a.sMenu').siblings().last().removeClass('layui-show layui-anim layui-anim-upbit');
});


class Tool {
	constructor() {
		// 初始化layui
		layui.use('layer');
		// 初始化导航栏
		this.initMenu();
		// 初始化左则菜单
		this.initLeftMenu();
		// 初始化代码高亮
		hljs.initHighlightingOnLoad();
		// 代码块添加行号
		this.initCodeNumber();
		// 添加复制代码按钮
		this.initCodeCopy()
		// 回到顶部
		this.initBackTop();
		// 百度统计
		this.initTongJi();

	}

	static msg(content, icon = false, shade = 0.5, timeout = 1000) {
		layer.style(layer.msg(content, {
			icon: icon,
			shade: shade,
			time: timeout
		}), {
			'top': '50%'
		});
	}

	initCodeNumber() {
		$("code").each(function() {
			$(this).html("<ol><li>" + $(this).html().replace(/\n/g, "\n</li><li>") + "\n</li></ol>");
		});
	}

	initCodeCopy() {
		let btn = document.createElement('button');
		btn.className = 'copy-code';
		btn.textContent = '复制代码';
		btn.setAttribute('onclick', 'copyCode(this)');
		$('pre').prepend(btn);
	}

	initMenu() {
		let main = document.querySelector('#readme'),
			menu = document.createElement('div');
		menu.id = 'menu';
		main.insertBefore(menu, main.firstChild);

		let html = `<ul class="layui-nav" lay-filter="">
					  	<li class="layui-nav-item"><a href="/instance.com">首页</a></li>
					  	<li class="layui-nav-item"><a href="python3.html">Python3</a></li>
					  	<li class="layui-nav-item"><a href="javascript.html">Javascript</a></li>
					  	<li class="layui-nav-item"><a href="c.html">C语言</a></li>
					  	<li class="layui-nav-item"><a href="cpp.html">C++语言</a></li>
					  	<li class="layui-nav-item"><a href="algorithm.html">数据结构与算法</a></li>
					  	<li class="layui-nav-item"><a href="sql.html">数据库</a></li>
					  	<li class="layui-nav-item">
					    	<a class="sMenu" href="javascript:void(0);">其他
						    	<span class="layui-nav-more"></span>
					    	</a>
					    	<dl class="layui-nav-child"> <!-- 二级菜单 -->
					      		<dd><a href="sbt3.html">使用sublime text 3</a></dd>
					      		<dd><a href="">后台模版</a></dd>
					      		<dd><a href="">电商平台</a></dd>
					    	</dl>
					  	</li>
					  	<li class="layui-nav-item"><a href="none">社区</a></li>
					</ul>`,
			url = window.location.href;
		// 一级菜单
		$('#menu').html(html);
		$('#menu ul li').each(function(i, e) {
			if ($(e).children('a')[0].href == url) {
				$(e).addClass('layui-this');
				$(e).children('a')[0].href = '#';
			}
		});
		// 二级菜单
		$('a.sMenu').mouseenter(function() {
			$(this).children('span').addClass('layui-nav-mored');
			$(this).siblings().last().addClass('layui-show layui-anim layui-anim-upbit').mouseleave(function() {
				$('a.sMenu').children('span').removeClass('layui-nav-mored');
				$(this).removeClass('layui-show layui-anim layui-anim-upbit');
			});
		});
		// title
		$('title').text(url.split('/').slice(-1)[0].split('.')[0]);

	}

	initLeftMenu() {
		$('#tree').ztree_toc({
			is_auto_number: true,
			documment_selector: '.markdown-body',
			_header_nodes: [{
				id: 1,
				pId: 0,
				name: '目录',
				open: true
			}]
		});
	}

	initBackTop() {
		let html = `<footer class="back-top" title="回到顶部">
			        	<a id="btop" href="javascript:void(0)"><img src="images/top.png"></a>
			        </footer>`
		$('#readme').after(html);
		// 屏幕滚动事件
		window.onscroll = function() {
			let clientHeight = document.body.clientHeight || document.documentElement.clientHeight,
				top = document.body.scrollTop || document.documentElement.scrollTop;
			top >= clientHeight ? $('.back-top').show() : $('.back-top').hide();
		}

		$('#btop').click(function() {
			let timer = setInterval(function() {
				if (document.body.scrollTop) {
					let top = document.body.scrollTop,
						speed = top / 5;
					document.body.scrollTop = top - speed;
				} else if (document.documentElement.scrollTop) {
					let top = document.documentElement.scrollTop,
						speed = top / 5;
					document.documentElement.scrollTop = top - speed;
				} else {
					clearInterval(timer);
				}
			}, 30);
		});
	}

	initTongJi() {
		$('body').append(`
			<script>
				var _hmt = _hmt || [];
				(function() {
				  	var hm = document.createElement("script");
				  	hm.src = "https://hm.baidu.com/hm.js?753df37e8b198522b4f5bd61bd74ab56";
				  	var s = document.getElementsByTagName("script")[0];
				  	s.parentNode.insertBefore(hm, s);
				})();
			</script>`);
	}
}

function copyCode(node) {
	let range = document.createRange();
	range.selectNode($(node).next()[0]);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand('copy') ? Tool.msg('复制成功', 1) : Tool.msg('复制失败', 5);
	window.getSelection().removeAllRanges();
}