<template>
	<div class="">
		<header class="search-header">
			<div class="search-return" @click="Rreturn()">
				<img src="../assets/images/return.png"/>
			</div>
			<div class="search-frame">
				<p class="title-de">章节目录</p>
			</div>
		</header>
		<div class="header-paddingtop">
			<ul class="chapters-box">
				<li v-for="(chapter,index) in pagingList"  @click="hreadId(chapter.readId)">
						{{chapter.title}}
				</li>
			</ul>
			<div class="paging-box">
				<ul>
					<li>
						<span @click="flipEvent(1)">首页</span>
					</li>
					<li>
						<span @click="flipEvent(--paIndex)">上一页</span>
					</li>
					<li>
						<span @click="flipEvent(++paIndex)">下一页</span>
					</li>
					<li>
						<span @click="flipEvent(allPages)">尾页</span>
					</li>
					
				</ul>
				<ul>
					<li class="all">页数:{{paIndex}}/{{allPages}}</li>
					<li class="other">
						<input type="number" v-model="pageNum" />
						<span @click="jumpEvent(pageNum)">跳转</span>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bookChapters:[],
				pagingList:[],
				paIndex:1,//页数
				allPages:0,//总页数
				pageNum:1
			}
		},
//		deactivated(){
//			this.$destroy()
//		},
		activated(){
			this.bookChapters =  this.$store.getters.getChapterList.length ? this.$store.getters.getChapterList:JSON.parse(localStorage.getItem('chapterList'));
			this.allPages = Math.ceil(this.bookChapters.length/20);
			for (const i=0;i<this.bookChapters.length;i++){
					this.bookChapters[i].readId = i
			}
			this.pagingList = this.pagination(1,20,this.bookChapters)
			console.log(this.pagingList)
		},
		methods:{
			Rreturn(){
				this.$router.go(-1)
			},
			pagination(pageNo, pageSize, array){  
                var offset = (pageNo - 1) * pageSize;  
                return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);  
           },
           flipEvent(index){
           		if(index<=0){
           			this.paIndex = 1
           			alert("已经是第一页了")
           			return
           		}
           		if(index==1){
           			this.paIndex = 1
           		}
           		if(index>this.allPages){
           			this.paIndex = this.allPages
           			alert("已经是最后一页了")
           			return
           		}
           		if(index==this.allPages){
           			this.paIndex = this.allPages
           		}
           		window.scroll(0,0)
           		this.pagingList = this.pagination(index,20,this.bookChapters)
           },
           jumpEvent(index){
           	console.log(typeof(index))
           		if(typeof(index-0)=="number"){
	           		if(index > this.allPages || index < 0){
	           			this.pageNum = 1;
	           			alert("请输入正确的页数")
	           			return
           			}
           		}else{
           			alert("请输入数值")
           			return
           		}
           		this.paIndex = index
           		window.scroll(0,0)
           		this.pagingList = this.pagination(index,20,this.bookChapters)
           },
           hreadId(index){
           		this.$store.dispatch('acReadId',index)
           		localStorage.setItem('ReadId',index)
           		this.$router.push('/read')
           		console.log(this.$store.getters.getReadId)
           		
           }
		}
	}
</script>

<style>
	.search-header{ height: 1.6rem; background: #ff9200; position: fixed; left: 0; top: 0; width: 100%;z-index: 999;}
	.search-return{ width: 1.4rem; height: 1.6rem; position: absolute; left: 0; top: 0;}
	.search-magnifier{ width: 1.4rem; height: 1.6rem; position: absolute; right: 0; top: 0;}
	.search-return,.search-magnifier{ text-align: center; padding-top: 0.4rem;}
	.search-return img,.search-magnifier img{ width: 0.8rem;}
	.search-frame{ padding: 0 1.4rem;line-height: 1.56rem; overflow: hidden;}
	.search-frame input{ width: 5.5rem; padding-left: 0.2rem; font-size: 18px; background: transparent; color: #fff;}
	[data-dpr ="2"] .search-frame input{ font-size: 36px;}
	[data-dpr ="3"] .search-frame input{ font-size: 54px;}
	.search-frame img{ width: 1.2rem; float: right; width: 0.76rem; padding: 0.4rem 0.4rem 0;box-sizing: content-box;}
	.search-frame .title-de{ color: #fff; font-size: 20px;}
	[data-dpr="2"] .search-frame .title-de{font-size: 40px;}
	[data-dpr="3"] .search-frame .title-de{font-size: 60px;}
	.share-de{ color: #666; font-size: 16px; padding-top: 0.16rem;}
	[data-dpr="2"] .share-de{ color: #666; font-size: 32px;}
	[data-dpr="3"] .share-de{ color: #666; font-size: 48px;}
	.chapters-box li{  color: #666; border-bottom: 1px solid #999999; font-size: 14px;padding: 0.4rem 0 0.3rem 0.4rem;}
	[data-dpr="2"] .chapters-box li{ font-size: 28px;}
	[data-dpr="3"] .chapters-box li{ font-size: 42px;}
	.paging-box ul li {font-size: 16px; color: #5EA0C2;}
	[data-dpr="2"] .paging-box ul li {font-size: 32px;}
	[data-dpr="3"] .paging-box ul li {font-size: 48px;}
	.paging-box ul{text-align: center; margin: 0.4rem 0;}
	.paging-box ul li{ width: 1.5rem; display: inline-block; text-align: center;}
	.paging-box ul li span{display: block; border: 1px solid #5EA0C2; border-radius: 4px;}
	.paging-box ul li.other{ width: 2.1rem;}
	.paging-box ul li.other input{ width: 0.8rem; height: 0.586rem; line-height: 0.586rem; vertical-align: middle; margin-top: -0.14rem; border-radius: 4px;}
	.paging-box ul li.other span{ width: 1rem;display: inline-block;}
	.paging-box ul li.all{width: 2.2rem;}
</style>