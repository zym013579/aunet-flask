/******获取本地时间对象******/
var myDate = new Date();					
document.getElementsByTagName("year")[0].innerHTML = myDate.getFullYear();


/*********
获取头部循环图片的地址
及其是否被选中flag
替换大图标题
*********/
function _getimg(m)
{
	document.getElementById("show_").src = m.src;//地址
	news = document.getElementsByClassName("news");
	for(var loop = 0;loop < 5;loop++)
		news[loop].id = "";
	m.id = "on";//被选中
	document.getElementById("picture_title").innerHTML = m.alt;//替换标题
}
/*******
循环预览图片
*********/
function LoopNews()
{
	var news = document.getElementsByClassName("news");
	var loop = 0;
	var s = setInterval(function(){
		_getimg(news[loop]);
		loop++;
		if(loop >= 5) loop = 0;	
	},5000	)
}


/*****兼容性菜单的解决办法*****/
flag_funcMenu = 0;
function _menu(){
	if(!flag_funcMenu)
	{
		document.getElementById("top_menu_menu").style.display = "block";
		flag_funcMenu = 1;
	}
	else
	{	
		document.getElementById("top_menu_menu").style.display = "none";
		flag_funcMenu = 0;
	}
}

function DisplayNews(page)
{
	document.getElementsByClassName("goto")[0].getElementsByTagName("input")[1].setAttribute("value",page.news_Length);
	document.getElementsByClassName("goto")[0].getElementsByTagName("input")[0].setAttribute("value",page.news_Current_Page);
	var news = document.getElementsByClassName("news_2_x");
	var loop;
	for(loop = 0;loop < 10;loop++)
		news[loop].setAttribute("style","display:none");
	for(loop = 0;loop < page.news_Length;loop++)
	{
		news[loop].setAttribute("style","display:block");
		/******一下的json访问可能存在问题******/
		news[loop].getElementsByClassName("news_title")[0].innerHTML = page.news_Title[loop][loop];
		news[loop].getElementsByClassName("article")[0].innerHTML = page.news_Outline[loop][loop];
		news[loop].getElementsByTagName("img")[0].setAttribute("src",page.news_Img_Url[loop][loop]);
		news[loop].getElementsByClassName("time")[0].innerHTML = page.Post_Time[loop][loop];
	}
}

/*******
获取不同浏览器内核的ajax请求对象
*******/
function GetHttpObject() 	//解决兼容性
{
	return new XMLHttpRequest();
}

/*****
ajax提交请求并获取数据
******/
function GetNews(posts)
{
	var request = GetHttpObject();
	// /alert(post['Sort'])
	if(request)
	{
		
		request.open("POST","news/news2Json",true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var tt = JSON.stringify(post);
		alert(tt);
		request.send(tt);//提交一个json对象
		request.onreadystatechange = function(){
			if(request.readyState == 4)
					{
						var page=request.responseText;//返回一个json对象
						DisplayNews(page);
					}
			}

	}
	else
	{
		alert("error");
	}
	
	
// $.ajax{
// 	type:'POST',
// 	dataType:'json',
// 	url:'news/news2Json',
// 	data:post,
// }
// 
// 
// $().ajax({
//     type: 'POST',
//     url: 'news/news2Json',
//     data: JSON.stringify(posts),
//     contentType: 'application/json; charset=UTF-8',
//     dataType: 'json',
//     success: function(data) { 
//     },
//     error: function(xhr, type) {
//     }
// });
// 
}
/*****
新闻部分的条件搜索栏
更改其class值
******/
function GetSearchPart(e)
{
	var parent = e.parentNode;
	var loop = 0;
	for(loop;loop < 4;loop++)
	{
		//alert(parent.getElementsByTagName("li")[loop].getAttribute("name"));
		parent.getElementsByTagName("li")[loop].setAttribute("class","");
	}
	e.setAttribute("class","on");
	GetAllOn();
}

/******获取所有需要传递的值********/
function GetAllOn()
{
	var on = document.getElementsByClassName("search_option")[0].getElementsByTagName("li");
	var loop = 0;
	var jsonData = {};
	for(loop;loop < 12;loop++)
	{
		if(on[loop].getAttribute("class") == "on")
		{
			var object = on[loop].parentNode.getAttribute("name");
			var value = on[loop].getAttribute("name");
			jsonData[object] = value;
		}	
	}
	//alert(jsonData['Time']);
	//alert(jsonData.object);
	var gotoPage = document.getElementsByClassName("goto")[0];
	if(parseInt(gotoPage.getElementsByTagName("input")[1].value) < parseInt(gotoPage.getElementsByTagName("input")[0].value))
		alert("跳转的页数不能大于总页数哦！");			//待后期再来修改本提示信息及其提示方式
	else
		jsonData["gotoPage"]= gotoPage.getElementsByTagName("input")[0].value;
		// jsonData.goto_Page = gotoPage.getElementsByTagName("input")[0].value;
	//alert(jsonData["gotoPage"]);
	GetNews(jsonData);
}

/*****前后页跳转及错误处理：开始*****/
function PageUp(e)
{
	var pageUp = document.getElementsByClassName("goto")[0].getElementsByTagName("input")[0];
	if(parseInt(pageUp.getAttribute("value")) <= 1)
	{

	}
	else 
	{
		pageUp.setAttribute("value",parseInt(pageUp.getAttribute("value"))-1);
		//alert(pageUp.getAttribute("value"));
		GetAllOn();
	}
}
function PageDown(e)
{
	var pageUp = document.getElementsByClassName("goto")[0].getElementsByTagName("input")[0];
	if(parseInt(pageUp.getAttribute("value")) >= parseInt(document.getElementsByClassName("goto")[0].getElementsByTagName("input")[1].getAttribute("value")))
	{

	}
	else 
	{
		pageUp.setAttribute("value",parseInt(pageUp.getAttribute("value"))+1);
		//alert(pageUp.getAttribute("value"));
		GetAllOn();
	}
}
/****结束***/


/****文档加载完成后的执行代码*****/
window.onload=function()
{
}