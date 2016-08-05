jQuery(function(a){
	function b(a){
		m?(a.removeClass("active"),
			k.removeClass("menu-active"),
			setTimeout(function(){
				a.removeClass("initial"),
				k.removeClass("menu-initial")
			},300),m=!1):(k.addClass("menu-initial"),
		a.addClass("initial"),
		setTimeout(function(){
			k.addClass("menu-active"),
			a.addClass("active")
		},1),m=!0)
	}
	function c(){
		a(".menu-list-item a").each(function(){
			var b=a(this);
			b.removeClass("current"),
			b.attr("href")==window.location.href&&b.addClass("current")
		})
	}
	function d(){
		a(".post-list .post .post-image img").each(
			function(){
			var b=a(this);
			b.load(function(){
				b.parents(".post-image").css({
					height:"0","padding-bottom":100/b.width()*b.height()+"%"
				})
			})});
		var b=a(".post-list").masonry({
			itemSelector:".post",isAnimated:!1,
			gutter:0,columnWidth:1,transitionDuration:0
		}).imagesLoaded().always(function(){
			b.masonry("layout")
		})
	}
	function e(){
		a("pre code").each(function(b,c){
			hljs.highlightBlock(c);
			var d=a(this),e=d.html().split(/\n/).length,
			f=[];for(b=1;e>b;b++)f+='<span class="line">'+b+"</span>";
			d.parent().addClass("codeblock").append('<div class="lines">'+f+"</div>")
		})
	}
	function f(){
		a("#wrapper").fitVids()
	}
	function g(){
		if("undefined"!=typeof disqus&&document.getElementById("disqus_thread")){
			if(window.DISQUS)return DISQUS.reset({
				reload:!0,config:function(){
					this.page.identifier=location.pathname,
					this.page.url=location.origin+location.pathname
				}
			});
				a.ajax({
					type:"GET",url:"//"+disqus+".disqus.com/embed.js",dataType:"script",cache:!0
				})
			}else a(".post-comments").css({
				display:"none"
			})
	}
	function h(){
		if("/"!==location.pathname){
			var a=l.find("article"),b=a.find(".post-reading-time");
			a.readingTime({
				readingTimeTarget:b.find(".estimated-reading-time"),
				wordCountTarget:b.find(".word-count"),
				error:function(){
					b.find(".post-reading-time").remove()
				}
			})}
	}
	function i(){
		d(),j(),e(),f(),g(),c(),h()
	}
	function j(){
		a('a[href^="'+window.location.origin+'"],.post-image a,.post-title a, .post-more a, .post-meta a, .post-tags a, #pagination a').each(function(){
			var b=a(this);
			b.hasClass("rss")||(b.addClass("js-ajax-link"),
				b.attr("href").indexOf("page")>-1&&b.addClass("js-archive-index"),
				b.attr("href")==window.location.origin&&b.addClass("js-show-index"),
				b.attr("href").indexOf("tag")>-1&&b.addClass("js-tag-index"),
				b.attr("href").indexOf("author")>-1&&b.addClass("js-author-index"))
		})
	}
	var k=a("html"),l=a("body");
	l.on("click",'[data-action="menu"]',
		function(){
			var c=(a(this).data("action"),a('[data-target="'+a(this).data("target")+'"]').not("[data-action]"));
			b(c)
		});
	var m=!1;
	l.on("click",".overlay, #menu a",function(){
		if(k.hasClass("menu-active")){
			var c=a('[data-target="menu"]').not("[data-action]");
			b(c)}}),c(),d(),e(),f(),g(),h(),j();
	var n=window.History,o=!1,p=a("#ajax-container");
	return n.enabled?(n.Adapter.bind(window,"statechange",function(){
		k.addClass("loading");
		var b=n.getState();
		a.get(b.url,function(b){
			var c=a(b),d=a("#ajax-container",c).contents(),e=b.match(/<title>(.*?)<\/title>/)[1];
			p.fadeOut(500,function(){
				k.hasClass("push-next")&&(k.removeClass("push-next"),
					k.addClass("pushed-next")),k.hasClass("push-prev")&&(k.removeClass("push-prev"),
					k.addClass("pushed-prev")),document.title=a("<textarea/>").html(e).text(),
					p.html(d),l.removeClass(),l.addClass(a("#body-class").attr("class")),
					NProgress.done(),p.fadeIn(500),a(document).scrollTop(0),setTimeout(function(){
					k.removeClass("loading")
				},50),i(),o=!1
			})
		})
	}),
	a("body").on("click",".js-ajax-link",function(b){
		b.preventDefault();
		var c=a(this);
		if(c.hasClass("post-nav-item")||c.hasClass("pagination-item")?
			((c.hasClass("post-nav-next")||c.hasClass("pagination-next"))&&
				(k.removeClass("pushed-prev"),k.addClass("push-next")),
				(c.hasClass("post-nav-prev")||c.hasClass("pagination-prev"))&&
				(k.removeClass("pushed-next"),k.addClass("push-prev"))):
			(k.removeClass("pushed-next"),k.removeClass("pushed-prev")),o===!1){
			var d=n.getState(),e=a(this).prop("href"),f=a(this).attr("title")||null;
		e.replace(/\/$/,"")!==d.url.replace(/\/$/,"")&&(o=!0,k.addClass("loading"),
			NProgress.start(),n.pushState({},f,e))}
	}),void a("body").on("click","#post-index .post .js-ajax-link",function(){
		var b=a(this).parents(".post");
		b.addClass("initial"),setTimeout(function(){
			b.addClass("active")
		},1)
	})):!1
});