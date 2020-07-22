 

// JavaScript Document
(function($){
		  $.fn.slides=function(option){option=$.extend({},$.fn.slides.option,option);return this.each(function(){$('.'+option.container,$(this)).children().wrapAll('<div class="slides_control"/>');var elem=$(this),control=$('.slides_control',elem),total=control.children().size(),width=control.children().outerWidth(),height=control.children().outerHeight(),start=option.start-1,effect=option.effect.indexOf(',')<0?option.effect:option.effect.replace(' ','').split(',')[0],paginationEffect=option.effect.indexOf(',')<0?effect:option.effect.replace(' ','').split(',')[1],next=0,prev=0,number=0,current=0,loaded,active,clicked,position,direction;if(total<2){return;}if(start<0){start=0;};if(start>total){start=total-1;};if(option.start){current=start;};if(option.randomize){control.randomize();}$('.'+option.container,elem).css({overflow:'hidden',position:'relative'});control.css({position:'relative',width:(width*3),height:height,left:-width});control.children().css({position:'absolute',top:0,left:width,zIndex:0,display:'none'});if(option.autoHeight){control.animate({height:control.children(':eq('+start+')').outerHeight()},option.autoHeightSpeed);}if(option.preload&&control.children()[0].tagName=='IMG'){elem.css({background:'url('+option.preloadImage+') no-repeat 50% 50%'});var img=$('img:eq('+start+')',elem).attr('src')+'?'+(new Date()).getTime();$('img:eq('+start+')',elem).attr('src',img).load(function(){$(this).fadeIn(option.fadeSpeed,function(){$(this).css({zIndex:5});elem.css({background:''});loaded=true;});});}else{control.children(':eq('+start+')').fadeIn(option.fadeSpeed,function(){loaded=true;});}if(option.bigTarget){control.children().css({cursor:'pointer'});control.children().click(function(){animate('next',effect);return false;});}if(option.hoverPause&&option.play){control.children().bind('mouseover',function(){stop();});control.children().bind('mouseleave',function(){pause();});}if(option.generateNextPrev){$('.'+option.container,elem).after('<a href="#" class="'+option.prev+'">Prev</a>');$('.'+option.prev,elem).after('<a href="#" class="'+option.next+'">Next</a>');}$('.'+option.next,elem).click(function(e){e.preventDefault();if(option.play){pause();};animate('next',effect);});$('.'+option.prev,elem).click(function(e){e.preventDefault();if(option.play){pause();};animate('prev',effect);});if(option.generatePagination){elem.append('<ul class='+option.paginationClass+'></ul>');control.children().each(function(){$('.'+option.paginationClass,elem).append('<li><a href="#'+number+'">'+(number+1)+'</a></li>');number++;});}else{$('.'+option.paginationClass+' li a',elem).each(function(){$(this).attr('href','#'+number);number++;});}$('.'+option.paginationClass+' li a[href=#'+start+']',elem).parent().addClass('current');$('.'+option.paginationClass+' li a',elem).click(function(){if(option.play){pause();};clicked=$(this).attr('href').replace('#','');if(current!=clicked){animate('pagination',paginationEffect,clicked);}return false;});$('a.link',elem).click(function(){if(option.play){pause();};clicked=$(this).attr('href').replace('#','')-1;if(current!=clicked){animate('pagination',paginationEffect,clicked);}return false;});if(option.play){playInterval=setInterval(function(){animate('next',effect);},option.play);elem.data('interval',playInterval);};function stop(){clearInterval(elem.data('interval'));};function pause(){if(option.pause){clearTimeout(elem.data('pause'));clearInterval(elem.data('interval'));pauseTimeout=setTimeout(function(){clearTimeout(elem.data('pause'));playInterval=setInterval(function(){animate("next",effect);},option.play);elem.data('interval',playInterval);},option.pause);elem.data('pause',pauseTimeout);}else{stop();}};function animate(direction,effect,clicked){if(!active&&loaded){active=true;switch(direction){case'next':prev=current;next=current+1;next=total===next?0:next;position=width*2;direction=-width*2;current=next;break;case'prev':prev=current;next=current-1;next=next===-1?total-1:next;position=0;direction=0;current=next;break;case'pagination':next=parseInt(clicked,10);prev=$('.'+option.paginationClass+' li.current a',elem).attr('href');if(next>prev){position=width*2;direction=-width*2;}else{position=0;direction=0;}current=next;break;}if(effect==='fade'){option.animationStart();if(option.crossfade){control.children(':eq('+next+')',elem).css({zIndex:10}).fadeIn(option.fadeSpeed,function(){control.children(':eq('+prev+')',elem).css({display:'none',zIndex:0});$(this).css({zIndex:0});option.animationComplete(next+1);active=false;});}else{option.animationStart();control.children(':eq('+prev+')',elem).fadeOut(option.fadeSpeed,function(){if(option.autoHeight){control.animate({height:control.children(':eq('+next+')',elem).outerHeight()},option.autoHeightSpeed,function(){control.children(':eq('+next+')',elem).fadeIn(option.fadeSpeed);});}else{control.children(':eq('+next+')',elem).fadeIn(option.fadeSpeed,function(){if($.browser.msie){$(this).get(0).style.removeAttribute('filter');}});}option.animationComplete(next+1);active=false;});}}else{control.children(':eq('+next+')').css({left:position,display:'block'});if(option.autoHeight){option.animationStart();control.animate({left:direction,height:control.children(':eq('+next+')').outerHeight()},option.slideSpeed,function(){control.css({left:-width});control.children(':eq('+next+')').css({left:width,zIndex:5});control.children(':eq('+prev+')').css({left:width,display:'none',zIndex:0});option.animationComplete(next+1);active=false;});}else{option.animationStart();control.animate({left:direction},option.slideSpeed,function(){control.css({left:-width});control.children(':eq('+next+')').css({left:width,zIndex:5});control.children(':eq('+prev+')').css({left:width,display:'none',zIndex:0});option.animationComplete(next+1);active=false;});}}if(option.pagination){$('.'+option.paginationClass+' li.current',elem).removeClass('current');$('.'+option.paginationClass+' li a[href=#'+next+']',elem).parent().addClass('current');}}};});};$.fn.slides.option={preload:false,preloadImage:'/img/loading.gif',container:'slides_container',generateNextPrev:false,next:'next',prev:'prev',pagination:true,generatePagination:true,paginationClass:'pagination',fadeSpeed:350,slideSpeed:350,start:1,effect:'slide',crossfade:false,randomize:false,play:0,pause:0,hoverPause:false,autoHeight:false,autoHeightSpeed:350,bigTarget:false,animationStart:function(){},animationComplete:function(){}};$.fn.randomize=function(callback){function randomizeOrder(){return(Math.round(Math.random())-0.5);}return($(this).each(function(){var $this=$(this);var $children=$this.children();var childCount=$children.length;if(childCount>1){$children.hide();var indices=[];for(i=0;i<childCount;i++){indices[indices.length]=i;}indices=indices.sort(randomizeOrder);$.each(indices,function(j,k){var $child=$children.eq(k);var $clone=$child.clone(true);$clone.show().appendTo($this);if(callback!==undefined){callback($child,$clone);}$child.remove();});}}));};})(jQuery);
$(function(){
	$('.slide').slides({
		preload: true,
		preloadImage: 'img/loading.gif',
		container:'slide_container',
		play: 3000,
		pause: 2500,
		hoverPause: true,
		animationComplete: function(current){}
	});
	$('.slide_ad').slides({
		preload: true,
		preloadImage: 'img/loading.gif',
	    next:'next_ad',
	    prev:'prev_ad',
		container:'slide_ad_container',
		play: 3000,
		pause: 2500,
		hoverPause: true,
		animationComplete: function(current){}
	});
	$('.star_rayli').slides({
		preload: true,
		preloadImage: 'img/loading.gif',
	    next:'next_star',
	    prev:'prev_star',
		container:'slide_star',
		play: 3000,
		pause: 2500,
		hoverPause: true,
		animationComplete: function(current){}
	});
});

//头部横向滚动
//$(function(){
//		  $(".slide dl:gt(1)").css("left","960px")
//		  $(".slide dl:eq(0)").css("left","-960px")
//		  var i=1;
//		  var play=function(){
//			  if(i<2){
//				  i++;
//			  }else{
//				  i=0;
//			  }
//			  $(".slide dl").eq(i-1).animate({left:"-960px"}, 500);
//			  $(".slide dl").eq(i).animate({left:"0"}, 500);
//			  $(".slide dl").not(i).css("left","960px") ;
//			  $(".slide dl").not(i-1).css("left","960px") ;
//		  }
//		  $(".prev").click(function(){
//									  $(".slide dl").eq(i-1).animate({left:"0"}, 500);
//									  $(".slide dl").eq(i).animate({left:"960px"}, 500);
//									  $(".slide dl").not(i).css("left","-960px") ;
//									  $(".slide dl").not(i-1).css("left","-960px") ;
//									  if(i>0){
//										  i--;
//									  }else{
//										  i=2;
//									  }
//									  });
//		  $(".next").click(play);
//		  var setinterval;
//		  var stop = function(){window.clearInterval(setinterval);};
//		  var go = function(){
//			  setinterval = window.setInterval(function(){play();},8000);
//		  }; //endof go
//		  $(".slide").mouseover(function(){stop()})
//		  $(".slide").mouseout(function(){go()})
//		  go();
//		  })
//头部横向滚动 ad
//$(function(){
//		  $(".slide_ad dl:gt(1)").css("left","680px")
//		  $(".slide_ad dl:eq(0)").css("left","-680px")
//		  var i=1;
//		  var play=function(){
//			  if(i<2){
//				  i++;
//			  }else{
//				  i=0;
//			  }
//			  $(".slide_ad dl").eq(i-1).animate({left:"-680px"}, 500);
//			  $(".slide_ad dl").eq(i).animate({left:"0"}, 500);
//			  $(".slide_ad dl").not(i).css("left","680px") ;
//			  $(".slide_ad dl").not(i-1).css("left","680px") ;
//		  }
//		  $(".prev_ad").click(function(){
//									  $(".slide_ad dl").eq(i-1).animate({left:"0"}, 500);
//									  $(".slide_ad dl").eq(i).animate({left:"680px"}, 500);
//									  $(".slide_ad dl").not(i).css("left","-680px") ;
//									  $(".slide_ad dl").not(i-1).css("left","-680px") ;
//									  if(i>0){
//										  i--;
//									  }else{
//										  i=2;
//									  }
//									  });
//		  $(".next_ad").click(play);
//		  var setinterval;
//		  var stop = function(){window.clearInterval(setinterval);};
//		  var go = function(){
//			  setinterval = window.setInterval(function(){play();},8000);
//		  }; //endof go
//		  $(".slide_ad").mouseover(function(){stop()})
//		  $(".slide_ad").mouseout(function(){go()})
//		  go();
//		  })
//热点文字滚动
function AutoScroll(obj){
        $(obj).find("ul:first").animate({
                marginTop:"-27px"
        },500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
        });
}
$(document).ready(function(){
						   setInterval('AutoScroll("#scrollDiv")',5000)
});
//焦点图和tab
function cur(ele,currentClass,tag){
        ele= $(ele)? $(ele):ele;
        if(!tag){
            ele.addClass(currentClass).siblings().removeClass(currentClass);
            }else{
                ele.addClass(currentClass).siblings(tag).removeClass(currentClass);
                }
        }
    $.fn.tab=function(options){
    var org={
        tabId:    "",
		tabTag:"li",
        conId:    "",
		conTag:"dl",
        curClass: "cur",
        act:      "click",
        dft:      0,
        effact:   "fade",
        auto:     false,
        autotime: 3000,
        aniSpeed: 500
        }

    $.extend(org,options);

    var t=false;
    var k=0;
    var _this=$(this);
    var tagwrp=$(org.tabId);
    var conwrp=$(org.conId);
    var tag=tagwrp.find(org.tabTag);
    var con=conwrp.find(org.conTag);
    var len=tag.length;
    var curtag=tag.eq(org.dft);
    cur(curtag,org.curClass);
    con.eq(org.dft).show().siblings(org.conTag).hide();




    tag.each(function(i){
        tag.eq(i).bind(org.act,function(){
                cur(this,org.curClass);
                k=i;
				//广告
				var sdli=$("#rlsdtag li");
				var j=0;
				sdli.click(function(){
									j=$(this).index();
									if(j==1){$("#tac").show();}
									if(j!=1){$("#tac").hide()}
									})
				//广告
                switch(org.effact){
                    case "fade"    : con.eq(i).fadeIn("fast").siblings(org.conTag).fadeOut("fast");
                    break;
                    case "fades"    : con.eq(i).fadeIn(500).siblings(org.conTag).fadeOut(500);
                    break;
                    default        : con.eq(i).show().siblings(org.conTag).hide();
                    break;
                    }
                }
            )
        })

    if(org.auto){
        var drive=function(){
            if(org.act=="mouseover"){
                tag.eq(k).mouseover();
                }else if(org.act=="click"){
                tag.eq(k).click();
                }
            k++;
            if(k==len) k=0;
            }
        t=setInterval(drive,org.autotime);
        }
	}

$(function(){
		   $("#rlfxtab").tab({
							 tabId:"#rlfxtag",
							 conId:"#rlfxcon"
							 })

		   $("#rltoptab").tab({
							 tabId:"#rltoptag",
							 conId:"#rltopcon"
							 })
		   $("#rlphonetab").tab({
							 tabId:"#rlphonetag",
							 conId:"#rlphonecon"
							 })
		   $("#trytab").tab({
							 act:"mouseover",
							 tabId:"#trytag",
							 conId:"#trycon"
							 })
		   $("#zbdctab").tab({
							 tabId:"#zbdctag",
							 conId:"#zbdccon"
							 })
		   $("#rdmstab").tab({
							 tabId:"#rdmstag",
							 conId:"#rdmscon"
							 })
		   $("#crjptab").tab({
							 tabId:"#crjptag",
							 conId:"#crjpcon"
							 })
		   $("#cpjtab").tab({
							 tabId:"#cpjtag",
							 conId:"#cpjcon"
							 })
		   $("#cpfltab").tab({
							 tabId:"#cpfltag",
							 conId:"#cpflcon"
							 })
		   $("#bjsctab").tab({
							 tabId:"#bjsctag",
							 conId:"#bjsccon"
							 })
		   $("#jzjctab").tab({
							 tabId:"#jzjctag",
							 conId:"#jzjccon"
							 })
		   $("#jzsjtab").tab({
							 tabId:"#jzsjtag",
							 conId:"#jzsjcon"
							 })
		   $("#yslxtab").tab({
							 tabId:"#yslxtag",
							 conId:"#yslxcon"
							 })
		   $("#ssmwtab").tab({
							 tabId:"#ssmwtag",
							 conId:"#ssmwcon"
							 })
		   $("#qgcstab").tab({
							 tabId:"#qgcstag",
							 conId:"#qgcscon"
							 })
		   $("#xzystab").tab({
							 tabId:"#xzystag",
							 conId:"#xzyscon"
							 })
		   $("#rxsqtab").tab({
							 tabId:"#rxsqtag",
							 conId:"#rxsqcon"
							 })
		   $("#dzzztab").tab({
							 tabId:"#dzzztag",
							 conId:"#dzzzcon"
							 })
		   $("#appyytab").tab({
							 tabId:"#appyytag",
							 conId:"#appyycon"
							 })
		   $("#sjdwtab").tab({
							 tabId:"#sjdwtag",
							 conId:"#sjdwcon"
							 })
})
$(function(){
		   $("#rlsdfoc").tab({
							 tabId:"#rlsdtag",
							 conId:"#rlsdcon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#videofoc").tab({
							 tabId:"#videotag",
							 conId:"#videocon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#fashionfoc").tab({
							 tabId:"#fashiontag",
							 conId:"#fashioncon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#beautyfoc").tab({
							 tabId:"#beautytag",
							 conId:"#beautycon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#luxuryfoc").tab({
							 tabId:"#luxurytag",
							 conId:"#luxurycon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#decofoc").tab({
							 tabId:"#decotag",
							 conId:"#decocon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#lifestylefoc").tab({
							 tabId:"#lifestyletag",
							 conId:"#lifestylecon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#modelfoc").tab({
							 tabId:"#modeltag",
							 conId:"#modelcon",
							 auto:true,
							 effact: "fades"
							 })
		   $("#nrfsfoc").tab({
							 tabId:"#nrfstag",
							 conId:"#nrfscon",
							 auto:true,
							 effact: "fades"
							 })
})
function select_layer(obj){
	    $("#"+obj+"_cont").hide();
		$("#"+obj).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("zbk_f2").removeClass("zbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$(this).blur();
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
					var txt=$(this).text();
					$("#"+obj+"_name").text(txt);
					$("#"+obj+"_cont").hide();
					$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
			  });
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
				};
		});

		$(document).click(function(event){
          if( $(event.target).attr("id") != obj ){
             $("#"+obj+"_cont").hide();
			 $("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
          }
       });
		$("#"+obj).children($("#"+obj+"_name")).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("zbk_f2").removeClass("zbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
					var txt=$(this).text();
					$("#"+obj+"_name").text(txt);
					$("#"+obj+"_cont").hide();
					$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");

				});
				return false;
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("zbk_f1").removeClass("zbk_f2");
				return false;
			   }
		});

 };
$(function(){
      select_layer("select_1");
	  select_layer("select_2");
	  select_layer("select_3");
});


function select_layer1(obj){
	    $("#"+obj+"_cont").hide();
		//alert("a")
		$("#"+obj).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("wbk_f2").removeClass("wbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
			    var txt=$(this).text();
				$("#"+obj+"_name").text(txt);
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
				//$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
			  });
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
				}
		});
		$(document).click(function(event){
          if( $(event.target).attr("id") != obj ){
             $("#"+obj+"_cont").hide();
			 $("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
          }
      });
	  $("#"+obj).children($("#"+obj+"_name")).click(function(){
			if($("#"+obj+"_cont").is(":hidden")){
				$("#"+obj).addClass("wbk_f2").removeClass("wbk_f1");
				$("#"+obj+"_cont").show().addClass("border1");
				$("#"+obj+"_cont").children("ul").children("li").children("div").children("p").click(function(){
					var txt=$(this).text();
					$("#"+obj+"_name").text(txt);
					$("#"+obj+"_cont").hide();
					$("#"+obj).addClass("wbk_f1").removeClass("zbk_f2");

				});
				return false;
			}
			else{
				$("#"+obj+"_cont").hide();
				$("#"+obj).addClass("wbk_f1").removeClass("wbk_f2");
				return false;
			   }
		});

};

$(function(){
	  select_layer1("select_4");
	  select_layer1("select_5");
	  select_layer1("select_6");
});



//照片墙
	var imgwidth=81;
	var painum=3;//一行放几列
	var hangshu;//行数
	var lieshu;//第几列。
	function pblimgover(n){

		$(".zpqimglh img").eq(n).css("opacity",1);
		$("#zqpaid").attr("href",zpqurl[n+1]);
		$("#zpqwz").html(zpqwenzi[n+1]);

		$(".zpqhong").css("display","block");
		$(".zpqhtit").css("display","block");
		hangshu=Math.floor(n/painum);
		lieshu=(n%painum);
		$(".zpqhong").css("top",imgwidth*hangshu);
		$(".zpqhong").css("left",imgwidth*lieshu);

		$(".zpqhtit").css("top",imgwidth*hangshu);
		var lastlie=(n+1)%painum;
		if(lastlie!=0){
			$(".zpqhtit").css("left",imgwidth*(lieshu+1));
		}else{
			$(".zpqhtit").css("left",imgwidth*(painum-2));
		}
	}
	function closezpq(){
			$(".zpqimglh img").css("opacity",0.7);
			$(".zpqhong").css("display","none");
			$(".zpqhtit").css("display","none");
		}
	$(document).ready(function(e) {
        $(".zpqimglh").mouseover(function(){
			var nowimg=$(".zpqimglh").index(this);
			pblimgover(nowimg);
		})
		$(".zpqhong").mouseout(function(){
			closezpq();
		});
		$(".zqpacss").mouseout(function(){closezpq()});
    });

//社区下照片墙
$(function(){
		   $(".photo_sq").mouseover(function(){
											 $(this).addClass("photo_sq_on");
											 })
		   $(".photo_sq").mouseout(function(){
											 $(this).removeClass("photo_sq_on");
											 })
		   $(".photo_sq_right").mouseover(function(){
											 $(".photo_sq_right").addClass("photo_sq_on");
											 $("#right_sqphoto").addClass("borderlee").removeClass("borderldd")
											 })
		   $(".photo_sq_right").mouseout(function(){
											 $(".photo_sq_right").removeClass("photo_sq_on");
											 $("#right_sqphoto").addClass("borderldd").removeClass("borderlee")
											 })
		   })

    ///*滚动*/
	//var speed=30;
	//var Direction = 0;
	//document.getElementById("demo2").innerHTML = document.getElementById("demo1").innerHTML;
	//document.getElementById("demo").scrollLeft = 0;
	//function Marquee(){
	//  if(Direction==0){
	//	  if(document.getElementById("demo2").offsetWidth - document.getElementById("demo").scrollLeft <= 0){
	//		  document.getElementById("demo").scrollLeft -= document.getElementById("demo2").offsetWidth;
	//	  }else{
	//		  document.getElementById("demo").scrollLeft++;
	//	  }
	//  }else{
	//	  if(document.getElementById("demo").scrollLeft == 0){
	//		  document.getElementById("demo").scrollLeft = document.getElementById("demo2").offsetWidth;
	//	  }else{
	//		  document.getElementById("demo").scrollLeft--;
	//	  }
	//  }
	//}
	function setDirection(val)
	{
		Direction = val;
	}

	var MyMar = setInterval("Marquee()",speed);

	document.getElementById("demo").onmouseover=function(){
	  clearInterval(MyMar);
	}

	document.getElementById("demo").onmouseout=function(){
	  MyMar = setInterval("Marquee()", speed);
	}
    /*滚动_美容*/
	var speedb=30;
	var Directionb = 0;
	document.getElementById("demob2").innerHTML = document.getElementById("demob1").innerHTML;
	document.getElementById("demob").scrollLeft = 0;
	function Marqueeb(){
	  if(Directionb==0){
		  if(document.getElementById("demob2").offsetWidth - document.getElementById("demob").scrollLeft <= 0){
			  document.getElementById("demob").scrollLeft -= document.getElementById("demob2").offsetWidth;
		  }else{
			  document.getElementById("demob").scrollLeft++;
		  }
	  }else{
		  if(document.getElementById("demob").scrollLeft == 0){
			  document.getElementById("demob").scrollLeft = document.getElementById("demob2").offsetWidth;
		  }else{
			  document.getElementById("demob").scrollLeft--;
		  }
	  }
	}
	function setDirectionb(val)
	{
		Directionb = val;
	}

	var MyMarb = setInterval("Marqueeb()",speedb);

	document.getElementById("demob").onmouseover=function(){
	  clearInterval(MyMarb);
	}

	document.getElementById("demob").onmouseout=function(){
	  MyMarb = setInterval("Marqueeb()", speedb);
	}
