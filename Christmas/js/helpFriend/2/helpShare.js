$(function(){
	getHelp2GetSponsorRecByIdService();
	//查看规则
	$('.rule-js-btn').on('click',function(){
		$('.rule-js-mask').show();
	});
	//删除按钮
	$('.del').on('click',function(){
		$('.mask').hide();
	});
	//点击装扮
	$('.js-water-btn').on('click',function(){
			var index=$(this).attr('data-num');
			$('img[data-num='+index+']').removeClass('swing');
			var strObj=$('#gift'+index).attr('class');
			if(strObj.indexOf('translateXY')>-1){
				return;
			}
//			$('.lightStar').attr('src','../../../../img/helpFriend/2/light2.png');
//			$('#gift'+index).addClass('translateXY'+index);
//			$('#text'+index).text('已经装扮').css('color','#ccc');
//			$('.translateXY'+index).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//				var timer=setTimeout(function(){
//					$('.lightStar').attr('src','../../../../img/helpFriend/2/light1.png');
//					clearTimeout(timer);
//				},600);
//			});
			if(isSubscribe==1){//	如果是粉丝
				getHelp2HelpService(indexSeq);
			}else{//非粉丝
				getHelp2HelpPreService(indexSeq,isNewUser);
			}
		});	
	//我也要500M
	$("body").on('click','.js-takePart-btn',function(){
		window.location.href=getRootUrl() + "helpFriend2.do?op=sponsor&a="+activityId+'&aw='+aw;
	});
	//根据id查询参与记录(分享页)
	function getHelp2GetSponsorRecByIdService(){
		_showPopBoxById('loadingToast');//loading
		 BWFRI.Help2GetSponsorRecByIdService({'activityId':activityId,'sponsorId':sponsorId},{'onResult':function(result){
		 	hiddenBox('loadingToast');//loading
		 	if(result.code!=0){
		 		console.log("BWFRI.Help2GetSponsorRecByIdService请求失败："+result.message);
				popBoxAlert("网络不给力  请刷新重试");
		 	}else{
		 		if(result.data.headimgurl!=undefined&&result.data.headimgurl!=null&&result.data.headimgurl!=""){
		 			$('#userImg').attr('src',result.data.headimgurl);
		 		}
		 		if(result.data.nickname!=undefined&&result.data.nickname!=null&&result.data.heanicknamedimgurl!=""){
		 			$('.nick').empty().text(result.data.nickname);
		 		}
		 		if(result.data.result==1){
		 			$('.help-water').html('<p class="center help-title ">该发起人不存在</p>');
		 			$('.promptPage').show();
		 		}else{
	 				var localResult=result.data.helpList;
	 				if(result.data.state==1){
	 					if(localResult.length>0){
			 				for(var i=0;i<localResult.length;i++){
			 					$('#gift'+posSeqIndex).removeClass('css-'+posSeqIndex+'-water').addClass('css-'+posSeqIndex+'-water-'+posSeqIndex);
			 				}
	 					}
		 			}else if(result.data.state==2){//助力成功
		 				for(var j=1;j<6;j++){
							$('img[data-num='+j+']').removeClass('swing');
			 				$('#gift'+j).removeClass('css-'+j+'-water').addClass('css-'+j+'-water-'+j);
			 			}
		 				$('.help-water').html('<p class="center help-title ">好友已装饰成功！</p>');
			 			$('.promptPage').show();
			 			$('.getfive').addClass('hide');
			 			$('.takePart').show();
		 			}else{
		 				$('.help-water').html('<p class="center help-title ">请刷新重试</p>');
			 			$('.promptPage').show();
		 			}
		 		}
		 	}
		 }});
	}
	//助力活动2-粉丝助力
	function getHelp2HelpService(posSeq){
		_showPopBoxById('loadingToast');//loading
		 BWFRI.Help2HelpService({'from':'web/subscribe','sponsorId':sponsorId,'openid':openid,'newfan':false,'posSeq':posSeq},{'onResult':function(result){
		 	hiddenBox('loadingToast');//loading
		 	if(result.code!=0){
		 		console.log("BWFRI.Help2HelpService请求失败："+result.message);
				popBoxAlert("网络不给力  请刷新重试");
		 	}else{
	//	 		助力结果：(-1)-失败，0-成功， 1-活动未开始， 2-活动已结束，3-非粉丝， 4-发起人助力自己，5-不允许反复帮同一个人，6-已助力成功，7-奖项没设置，8-奖品发完了，9-活动未启用，10-帮人助力次数达上限")
		 		if(result.data.result==0){
		 			dressUp(index);
		 		}else{
		 			if(result.data.result==1){
			 			$('.help-water').html('<p class="center help-title ">来早啦！活动还未开始呢！敬请期待~</p>');
			 		}else if(result.data.result==2){
			 			$('.help-water').html('<p class="center help-title ">来迟啦！活动已结束啦！</p>');
			 		}else if(result.data.result==3){
			 			$('.help-water').html('<p class="center help-title ">哎呀,礼物逃走了,刷新页面重试吧!</p>');
			 		}else if(result.data.result==4){
			 			$('.help-water').html('<p class="center help-title ">自己不能给自己装扮哦</p>');
			 		}else if(result.data.result==5){
			 			$('.help-water').html('<p class="center help-title ">亲只能给同一好友装扮一次哦!</p>');
			 		}else if(result.data.result==6){
			 			$('.js-water-btn').removeClass('swing kettle').attr('src',root+'/img/helpFriend/1/waterafter.png').addClass('water');
		 				$('.help-water').html('<p class="center act-end fs18"> 对不起，你来晚了</p><p class="center">好友已经完成了活动</p>');
			 		}else if(result.data.result==7){
			 			$('.help-water').html('<p class="center help-title ">手脚太慢啦！奖品都被抢光啦~</p>');
			 		}else if(result.data.result==8){
			 			$('.help-water').html('<p class="center act-end fs18"> 对不起，你来晚了</p><p class="center">奖品库存不够了~~</p>');
			 		}else if(result.data.result==9){
			 			$('.help-water').html('<p class="center help-title ">活动正在赶来的路上，敬请期待~</p>');
			 		}else if(result.data.result==10){
			 			$('.help-water').html('<p class="center help-title ">亲只能帮'+helpCntLimit+'个好友装扮哦</p>');
			 		}else{
			 			$('.help-water').html('<p class="center help-title ">哎呀,礼物逃走了,刷新页面重试吧!</p>');
			 		}
			 		$('.promptPage').show();
			 	}
		 	}
		 }});
	}
	
	//助力活动2-非粉丝预备助力
	function getHelp2HelpPreService(posSeq,isNewUser){
		_showPopBoxById('loadingToast');//loading
		 BWFRI.Help2HelpPreService({'sponsorId':sponsorId,'fansOpenid':openid,'fansUnionid':unionid,'posSeq':posSeq},{'onResult':function(result){
		 	hiddenBox('loadingToast');//loading
		 	if(result.code!=0){
		 		console.log("BWFRI.Help2HelpPreService请求失败："+result.message);
				popBoxAlert("网络不给力  请刷新重试");
		 	}else{ 
		 		//0-成功， 1-活动未开始， 2-活动已结束，3-粉丝已关注， 9-活动未启用
		 	    if(result.data.result==1){
		 	    	$('.help-water').html('<p class="center help-title">来早啦！活动还未开始呢！敬请期待~</p>');
		 	    	$('.promptPage').show();
		 		}else if(result.data.result==2){
		 			$('.help-water').html('<p class="center help-title">来迟啦！活动已结束啦！</p>');
		 			$('.promptPage').show();
		 		}else if(result.data.result==3){
		 			$('.help-water').html('<p class="center help-title">哎呀,礼物逃走了,刷新页面重试吧!</p>');
		 			$('.promptPage').show();
		 		}else if(result.data.result==9){
		 			$('.help-water').html('<p class="center help-title">活动正在赶来的路上，敬请期待~</p>');
		 			$('.promptPage').show();
		 		}else{
		 			if(result.data.prizeFlag==1){
		 				$('.code-prom').html('<p class="center codewrapper-p-1 fs18">识别二维码得'+result.data.prizeName+'!</p><p class="center water-p-2 fs16">并帮好友装扮!</p>');
		 			}else if(result.data.prizeFlag==2){
		 				if(isNewUser==1){//从未关注过的用户
			 				$('.code-prom').html('<p class="center codewrapper-p-1 fs18">识别二维码得'+result.data.prizeName+'!</p><p class="center water-p-2 fs16">并帮好友装扮!</p>');
				 		}else{
				 			$('.code-prom').html('<p class="center codewrapper-p-3 fs18">识别二维码帮好友装扮</p>');
				 		}
		 			}else{
		 				$('.code-prom').html('<p class="center codewrapper-p-3 fs18">识别二维码帮好友装扮</p>');
		 			}
					$('.codewrap').show();
		 		}
		 	}
		 }});
	}
});

//装扮圣诞树
function dressUp(index){
	$('img[data-num='+index+']').removeClass('swing');
	$('.lightStar').attr('src','../../../../img/helpFriend/2/light2.png');
	$('#gift'+index).addClass('translateXY'+index);
	$('#text'+index).text('已经装扮').css('color','#ccc');
	$('.translateXY'+index).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		var timer=setTimeout(function(){
			$('.lightStar').attr('src','../../../../img/helpFriend/2/light1.png');
			clearTimeout(timer);
		},600);
		$('.help-water').html('<p class="center help-title ">装扮成功!</p>');
		$('.promptPage').fadeIn();
	});
}