$(function(){
	getHelp2SponsorService(title, desc, img);
	getHelp2GetPrizeNeedSendService();
	//我的卡券
	$('.card-js-btn').on('click',function(){
		window.location.href=getRootUrl() + "helpFriend2.do?op=recvPrize&a="+activityId+'&aw='+aw;//刷新页面，再来一轮
	});
	//分享遮罩层显示
	$('body').on('click','.shareflow',function(){
		$('.sharePage').show();
		var timer=setTimeout(function(){
			$('.sharePage').hide();
			clearTimeout(timer);
		},2000);
	});
	//期待下一期
	$('body').on('click','.js-water-complete',function(){
		$('.help-water').html('<p class="center help-title-index">已完成本期活动，期待下一期吧~</p>');
		$('.promptPage').show();
	});
	//分享遮罩层消失
	$('.sharePage').on('click',function(){
		$('.sharePage').hide();
	});
	//删除按钮
	$('.del').on('click',function(){
		$('.mask').hide();
	});
	//刷新领奖页面
	$('body').on('click','.once-again',function(){
		window.location.href=getRootUrl() + "helpFriend2.do?op=sponsor&a="+activityId+'&aw='+aw;//刷新页面，再来一轮
	});
	//立即领取
	$("body").on('click','.js-gift-btn',function(){
		var sponsorId=$('.shareImag').attr('data-spon');
//		如果不是会员,跳注册页
		if(isMember==1){
			getHelp2RecvPrizeByRecIdService(sponsorId);
		}else{
			window.location.href=getRootUrl() + "helpFriend2.do?op=sponsor&a="+activityId+'&reg=1&aw='+aw;
		}
	});
	
});

var url="";

//助力活动2-发起助力
function getHelp2SponsorService(title, desc, img){
	_showPopBoxById('loadingToast');//loading
	 BWFRI.Help2SponsorService({'activityId':activityId,'openid':openid,'unionid':unionid},{'onResult':function(result){
	 	hiddenBox('loadingToast');//loading
	 	if(result.code!=0){
	 		console.log("BWFRI.Help2SponsorService请求失败："+result.message);
			popBoxAlert("网络不给力  请刷新重试");
	 	}else{
			$('#targetCnt').empty().text(result.data.targetCnt);
	 		$('#prizeName').empty().text(result.data.prizeName);
//	 		$('.shareImag').attr('data-spon',result.data.sponsorId);
	 		
	 		if(result.data.sponsorId!=""&&result.data.sponsorId!=null&&result.data.sponsorId!=undefined){
	 			url = getRootUrl() + "helpFriend2.do?op=shareHelp&a="+activityId+'&recid='+result.data.sponsorId+'&aw='+aw;//分享链接
	 		}else{
	 			url = getRootUrl() + "helpFriend2.do?op=index&a="+activityId+'&aw='+aw;//分享链接
	 		}
	 		wxShare(title, desc, img, url);
//	 		result   0-成功，1-活动未开始，2-活动已结束，3-参加次数达到限制，4-奖项没设置，5-奖品发完了，6-有进行中的记录，7-有未领奖的记录，9-活动未启用
	 		if(result.data.result==6||result.data.result==3||result.data.result==7){
	 			var localResult=result.data.helpList;
		 		if(localResult.length>0){
	 				var htmlContent='';
	 				var headimgUrl='';
	 				for(var i=0;i<localResult.length;i++){
	 					var posSeqIndex=localResult[i].posSeq;
	 					if(localResult[i].headimgurl!=""&&localResult[i].headimgurl!=null&&localResult[i].headimgurl!=undefined){
	 						headimgUrl=localResult[i].headimgurl;
	 					}else{
	 						headimgUrl=root+'/img/gg01.jpg';
	 					}
	 					htmlContent+='<div class="flexing"><div class="box1"><img id="userImgPart" src="'+headimgUrl+'" /></div><div class="box2">'+localResult[i].nickname+'</div><div class="box3">已帮你装扮成功!</div></div>';
	 					$('#gift'+posSeqIndex).removeClass('css-'+posSeqIndex+'-water').addClass('css-'+posSeqIndex+'-water-'+posSeqIndex);
	 				}
	 				if(localResult.length==5){
	 					$('.lightStar').attr('src','../../../../img/helpFriend/2/light2.png');
	 				}
	 				$('.waterInfo').html(htmlContent);
	 			}
	 		}
	 		if(result.data.result==3){
	 			for(var j=1;j<6;j++){
	 				$('#gift'+j).removeClass('css-'+j+'-water').addClass('css-'+j+'-water-'+j);
	 			}
	 			$('.award-box').html('<p class="center award-title">'+result.data.prizeName+'奖励<br/>已放入我的卡券</p><img src="'+root+'/img/helpFriend/1/get01.png" class="getGift js-get-btn btn"/>');
	 			$('.shareImag').removeClass('shareflow').addClass('js-water-complete');
	 			$('.light').show();
	 			var timer=setTimeout(function(){
					$('.light').hide();
					clearTimeout(timer);
				},5000);
	 		}else if(result.data.result==7){
	 			for(var j=1;j<6;j++){
	 				$('#gift'+j).removeClass('css-'+j+'-water').addClass('css-'+j+'-water-'+j);
	 			}
	 			$('.award-box').html('<p class="center award-title">恭喜获得'+result.data.prizeName+'</p><img src="'+root+'/img/helpFriend/1/get02.png" class="getGift js-gift-btn btn"/>');
	 			$('.light').show();
	 		}else if(result.data.result==1){
	 			$('.help-water').html('<p class="center help-title-index">来早啦！活动还未开始呢！敬请期待~</p>');
	 			$('.promptPage').show();
	 		}else if(result.data.result==2){
	 			$('.help-water').html('<p class="center help-title-index">来迟啦！活动已结束啦！</p>');
	 			$('.promptPage').show();
	 		}else if(result.data.result==5){
	 			$('.help-water').html('<p class="center help-title-index">手脚太慢啦！奖品都被抢光啦~</p>');
	 			$('.promptPage').show();
	 		}else if(result.data.result==4){
	 			$('.help-water').html('<p class="center help-title-index">手脚太慢啦！奖品都被抢光啦~</p>');
	 			$('.promptPage').show();
	 		}else if(result.data.result==9){
	 			$('.help-water').html('<p class="center help-title-index">活动正在赶来的路上，敬请期待~</p>');
	 			$('.promptPage').show();
	 		}
	 	}
	 }});
}
//助力活动2-查询待发奖数据,即未领取卡券
function getHelp2GetPrizeNeedSendService(){
	_showPopBoxById('loadingToast');//loading
	BWFRI.Help2GetPrizeNeedSendService({'activityId':activityId,'openid':openid,'unionid':unionid},{'onResult':function(result){
		hiddenBox('loading');
		if(result.code!=0){
			console.log("BWFRI.Help2GetPrizeNeedSendService请求失败："+result.message);
			popBoxAlert("网络不给力  请刷新重试");
		}else{
			if(result.data.prizeCnt>0){
				$('.notice-water').empty().text(result.data.prizeCnt).show();
			}
		}
	}});
}
//助力活动2-根据参与id领取奖品
function getHelp2RecvPrizeByRecIdService(sponsorId){
	_showPopBoxById('loadingToast');//loading
	 BWFRI.Help2RecvPrizeByRecIdService({'activityId':activityId,'sponsorId':sponsorId,'openid':openid,'unionid':unionid},{'onResult':function(result){
	 	hiddenBox('loadingToast');//loading
	 	if(result.code!=0){
	 		console.log("Help2RecvPrizeByRecIdService请求失败："+result.message);
			popBoxAlert("网络不给力  请刷新重试");
	 	}else{
	 		//0-成功，1-还没有助力成功，2-没有奖品/没有资格领奖，3-奖品类别有误，4-奖项设置不存在，5-调第三方领奖失败，6-发奖中状态，7-领奖失败（可重试）
	 		if(result.data.result==0){
	 			if(result.data.sponsorFlag==1){
	 				$('.award-box').html('<p class="center award-again">您还能再发起一次得'+result.data.prizeName+'的装扮游戏哦</p>');
	 				$('#del').removeClass('del').addClass('once-again');
	 				$('.light').show();
	 				var timer=setTimeout(function(){
						window.location.href=getRootUrl() + "helpFriend2.do?op=sponsor&a="+activityId+'&aw='+aw;//刷新页面，再来一轮
						clearTimeout(timer);
					},5000);
					
	 			}else if(result.data.sponsorFlag==0){
	 					$('.award-box').html('<p class="center award-title">'+result.data.prizeName+'奖励<br/>已放入我的卡券</p><img src="'+root+'/img/helpFriend/1/get01.png" class="getGift js-get-btn btn"/>');
			 			$('.light').show();
			 			var timer=setTimeout(function(){
							$('.light').hide();
							clearTimeout(timer);
						},5000);
	 			}
	 		}else if(result.data.result==1){
	 			popBoxAlert("小伙伴装扮不给力，装饰不成功");
	 		}else if(result.data.result==2){
	 			popBoxAlert("奖品发完了！更多活动敬请期待！");
	 		}else if(result.data.result==3){
	 			popBoxAlert("领取失败，换个姿势重新领取吧！");
	 		}else if(result.data.result==4){
	 			popBoxAlert("领取失败，换个姿势重新领取吧！");
	 		}else if(result.data.result==5){
	 			if(result.data.sponsorFlag==1){
	 				$('.award-box').html('<p class="center award-again fs12">领取成功</p><p class="center award-again fs10">奖品于3个工作日内发到您的卡券中心！</p><p class="center award-again fs10">您还能再发起一次'+result.data.prizeName+'的装扮游戏</p>');
	 				$('#del').removeClass('del').addClass('once-again');
	 				$('.light').show();
	 				var timer=setTimeout(function(){
						window.location.href=getRootUrl() + "helpFriend2.do?op=sponsor&a="+activityId+'&aw='+aw;//刷新页面，再来一轮
						clearTimeout(timer);
					},5000);
	 			}else if(result.data.sponsorFlag==0){
	 					$('.award-box').html('<p class="center award-again fs12">领取成功</p><p class="center award-again fs10">奖品于3个工作日内发到您的卡券中心！</p><img src="'+root+'/img/helpFriend/1/get01.png" class="getGift js-get-btn btn"/>');
			 			$('.light').show();
			 			var timer=setTimeout(function(){
							$('.light').hide();
							clearTimeout(timer);
						},5000);
	 			}
	 		}else if(result.data.result==6){
	 			popBoxAlert("奖品发放中，请稍等~");
	 		}else if(result.data.result==7){
	 			popBoxAlert("领取失败，换个姿势重新领取吧！");
	 		}
	 	}
	 }});
}