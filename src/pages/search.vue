<template>
	<div class="">
		<header class="search-header">
			<div class="search-return" @click="Rreturn()">
				<img src="../assets/images/return.png"/>
			</div>
			<div class="search-frame">
				<input type="text" placeholder="请输入书名" v-model="searchCon" />
				<img src="../assets/images/error.png" @click="clearn"/>
			</div>
			<div class="search-magnifier" @click="searchEvent">
				<img src="../assets/images/magnifier.png"/>
			</div>
		</header>
		<div class="header-paddingtop">
			<ul class="book-list">
				<li v-for="(item,index) in bookLists">
					<router-link :to="{name:'details',params:{id:item._id}}">
						<div class="">
							<div class="book-img">
								<img :src="item.cover |url2Real"/>
							</div>
							<div class="book-info">
								<h2 class="title">{{item.title}}</h2>
								<p class="author">作者：{{item.author}}</p>
								<p class="cat">类型：{{item.cat}}</p>
								<p class="comp">字数：{{item.wordCount|wordCountStr}} | {{item.latelyFollower|wordCountStr}}人看过 | {{item.retentionRatio}}%人收藏</p>
							</div>
						</div>
						<div class="briefInc">
							<p class="shortIntro">简介:{{item.shortIntro}}</p>
							
						</div>
					</router-link>
				</li>
			</ul>
			<div class="search-history" v-if="bookLists.length==0">
				<p class="title">搜索历史</p>
				<div class="no-histroy" v-if="searchRecord.length==0">
					没有搜索历史
				</div>
				<ul class="searchRecord">
					<li v-for="(record,index) in searchRecord" :style="{'background-color': getRandomColor()}" @click="sercHis(record)">
						{{record}}
					</li>
				</ul>
				<p class="clear" @click="clearHistroy" v-if="!searchRecord.length==0"><img src="../assets/images/clear.png"/>清空历史</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				searchCon:'',
				bookLists:[],
				searchRecord:[]
			}
		},
		activated(){
			this.searchRecord = localStorage.getItem('searchRecord')?localStorage.getItem('searchRecord').split(',') : []
		},
		methods:{
			searchEvent(){
				if(this.searchCon === ''){
					alert("请输入书名")
					return
				}
				this.axios.get(`/readerApi/book/fuzzy-search`,{
					params:{
						query:this.searchCon,
						start:0
					}
				}).then((response) =>{
					if(response.data.ok){
						const data = response.data
						this.bookLists = data.books
					}
				}).catch((error)=>{
					console.log(error)
				})
				window.scroll(0,0)
				if(this.searchRecord.indexOf(this.searchCon)<0){
					this.searchRecord.push(this.searchCon)
					localStorage.setItem('searchRecord',this.searchRecord.join(','))
				}
				
				
			},
			clearn(){
				this.searchCon='';
				this.bookLists=[]
			},
			clearHistroy(){
				this.searchRecord=[];
				localStorage.removeItem('searchRecord')
			},
			Rreturn(){
				this.$router.go(-1)
			},
			sercHis(record){
				this.searchCon = record;
				this.searchEvent()
			},
			getRandomColor(){
			   return '#'+'0123456789abcdef'.split('').map(function(v,i,a){ 
    				return i>5 ? null : a[Math.floor(Math.random()*16)] 
			   }).join('');
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
	.search-history{ padding: 0.2rem;}
	.search-history .title{ font-size: 16px; color: #333;}
	[data-dpr="2"] .search-history .title{ font-size: 32px;}
	[data-dpr="3"] .search-history .title{ font-size: 48px;}
	.search-history .clear{ text-align: center; font-size: 14px; color: #666;}
	[data-dpr="2"] 	.search-history .clear{ font-size: 28px;}
	[data-dpr="3"] 	.search-history .clear{ font-size: 42px;}
	.search-history .clear img{ width: 0.68rem; vertical-align: middle; margin-top: -0.08rem; padding: 0 0.1rem;}
	.book-list{padding: 0 0.2rem;}
	.book-list li{ border-bottom: 1px solid #999; padding: 0.4rem 0;}
	.book-img{ float: left; width: 2rem;}
	.book-img img{ width: 2rem; height: 2.49rem;}
	.book-info{ position: relative; margin-left: 2.2rem;}
	.book-info .title{ color: #FF9200; font-size: 18px;}
	[data-dpr="2"] .book-info .title{ font-size: 36px;}
	[data-dpr="3"] .book-info .title{ font-size: 54px;}
	.book-info{ min-height: 2.69rem;}
	.book-info p{ padding-bottom: 0.1rem;}
	.briefInc{ text-indent: 2em;}
	.briefInc p{text-overflow: -o-ellipsis-lastline;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-line-clamp: 2;  -webkit-box-orient: vertical; }
	.searchRecord{ margin: 0.3rem 0;}
	.searchRecord li{ padding: 0.1rem 0.3rem; display: inline-block; color: #fff; border-radius: 8px;font-size: 14px; margin-right: 0.4rem; margin-bottom: 0.3rem;}
	[data-dpr="2"] .searchRecord li{ font-size: 28px;}
	[data-dpr="3"] .searchRecord li{ font-size: 42px;}
	.no-histroy{ text-align: center; padding: 0.6rem 0; font-size: 20px; color: #666;}
	[data-dpr="2"] .no-histroy{font-size: 40px;}
	[data-dpr="3"] .no-histroy{font-size: 60px;}
</style>

