<template>
	<div class="">
		<header class="search-header">
			<div class="search-return" @click="Rreturn()">
				<img src="../assets/images/return.png"/>
			</div>
			<div class="search-frame">
				<p class="title-de">书籍详情</p>
			</div>
			<div class="search-magnifier">
				<p class="share-de">分享</p>
			</div>
		</header>
		<div class="details-box header-paddingtop">
			<div class="details-box-info">
				<div class="details-img">
					<img :src="bookcover|url2Real" />
				</div>
				<div  class="details-con">
					<h2>{{booktitle}}</h2>
					<p>作者:{{bookauthor}}</p>
					<p>类型:{{bookcat}}</p>
					<p>字数:{{bookwordCount|wordCountStr}}</p>
					<p style="display: none;">最新章节: <span @click="latestChapter"> {{booklastChapter}}</span></p>
				</div>
			</div>
			<div class="details-btn">
				<ul class="details-btnlist">
					<li>
						<span @click="collectionEvent" v-if="collectionfla"><img src="../assets/images/collection.png" >收藏</span>
						<span class="cancel" @click="collectionCancel" v-if="!collectionfla"><img src="../assets/images/cancel-collection.png">取消收藏</span>
					</li>
					<li>
						<router-link :to="{name:'catalog',params:{bookId:bookid}}">
							<span><img class="curr" src="../assets/images/reader.png"/>开始阅读</span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="book-otherinfo">
				<ul class="book-otherinfobox">
					<li>
						<p>追书人数</p>
						<p>{{booklatelyFollower}}</p>
					</li>
					<li>
						<p>读者收藏率</p>
						<p>{{bookretentionRatio}}%</p>
					</li>
					<li>
						<p>日更新字数</p>
						<p>{{bookserializeWordCount}}</p>
					</li>
				</ul>
			</div>
			<div class="details-longIntro">
				{{booklongIntro}}
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
					bookid:'',
					bookcat:'',//类型
					bookauthor:'',//作者
					booktitle:'',//标题
					bookupdated:'',//更新时间
					bookwordCount:'',//总字数
					booklongIntro:'',//简介
					bookcover:'',//图片
					booklastChapter:'',//最新章节
					booklatelyFollower:'',//追更人数
					bookretentionRatio:'',//读者留存率
					bookserializeWordCount:'',//日更字数
					collectionfla:true,
			}
		},
		computed:{
			chapterList(){
				return this.$store.getters.getChapterList
			},
			collectionList(){
				return  this.$store.getters.getCollectionList
			}
		},
		activated(){
			this.axios.get(`/readerApi/book/`+this.$route.params.id)
				.then((response) => {
					const data = response.data;
					//console.log(data)
					this.bookid = data._id;
					this.bookcat = data.cat;
					this.bookauthor = data.author;
					this.booktitle = data.title;
					this.bookupdated = data.updated;
					this.bookwordCount = data.wordCount;
					this.booklongIntro = data.longIntro;
					this.bookcover = data.cover;
					this.booklastChapter = data.lastChapter;
					this.booklatelyFollower = data.latelyFollower;
					this.bookretentionRatio = data.retentionRatio;
					this.bookserializeWordCount = data.serializeWordCount;
					//开始
					//console.log(this.booktitle)
					this.collectionfla = true;
					for(const i =0;i<this.collectionList.length;i++){
						if(this.collectionList[i].title == this.booktitle){
							this.collectionfla = false
							
						}
					}
					
					this.axios.get(`/readerApi/toc`,{
						params:{
							view:'summary',
							book:this.$route.params.id
						}
					}).then((response_d) => {
							//console.log(response_d)
							const bookSoureData = response_d.data
							const id = bookSoureData[2]._id;
							this.axios.get(`/readerApi/toc/`+id+`?view=chapters`)
								.then((chaptersData) => {
									//console.log(chaptersData)
									const data = chaptersData.data;
									this.$store.dispatch('acChapterList',data.chapters)
									localStorage.setItem('chapterList',JSON.stringify(data.chapters))
									//console.log(this.chapterList)
								})
								.catch((err)=>{
									console.log(err)
								})
						})
					.catch((error) => {
						console.log(error)
					})
					//结束
				})
				.catch((error)=>{
					console.log(error)
				})
			
		
		},
		methods:{
			Rreturn(){
				this.$router.go(-1)
			},
			latestChapter(){
				this.$router.push({name:'read',params:{index:this.chapterList.length-1}})
			},
			collectionEvent(){
				this.$store.dispatch('acCollectionList',{
					id:this.bookid,
					title:this.booktitle,
					author:this.bookauthor,
					cover:this.bookcover,
					lastChapter:this.booklastChapter,
					updated:this.bookupdated
					
				})
				this.collectionfla = false;
				localStorage.setItem('collectionList',JSON.stringify(this.collectionList))
			},
			collectionCancel(){
				for(const i =0;i<this.collectionList.length;i++){
					if(this.collectionList[i].title == this.booktitle){
						this.$store.dispatch('acCancelCollectionList',i)
					}
				}
				this.collectionfla = true;
				localStorage.setItem('collectionList',JSON.stringify(this.collectionList))
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
	.details-box{ padding-left: 0.2rem;}
	.details-box-info{display: -webkit-flex; display: flex;}
	.details-img{ padding: 0.2rem 0.2rem 0 0;}
	.details-img img{ width: 2.4rem;}
	.details-con{ padding-left: 0.2rem;}
	.details-con h2{ font-size: 20px; color: #FF9200;}
	[data-dpr="2"] .details-con h2{ font-size: 40px}
	[data-dpr="3"] .details-con h2{ font-size: 60px}
	.details-con p{ padding-bottom: 0.2rem;}
	.details-con p span{ color: #5ea0c2;}
	.book-otherinfobox{display: -webkit-flex; display: flex;}
	.book-otherinfobox li{ -webkit-flex: 1; flex: 1; text-align: center;}
	.book-otherinfobox li p:first-child{ color: #666; font-size: 16px; padding-bottom: 0.2rem;}
	[data-dpr="2"] .book-otherinfobox li p:first-child{font-size: 32px;}
	[data-dpr="3"] .book-otherinfobox li p:first-child{font-size: 48px;}
	.book-otherinfobox li p:last-child{ color: #333; font-size: 14px;}
	[data-dpr="2"] .book-otherinfobox li p:last-child{font-size: 28px;}
	[data-dpr="3"] .book-otherinfobox li p:last-child{font-size: 32px;}
	.book-otherinfo{ border: 1px solid #999999; border-width: 1px 0 1px 0; padding: 0.3rem 0; margin: 0.2rem 0;}
	.details-btnlist{display: -webkit-flex; display: flex;}
	.details-btnlist li{ -webkit-flex: 1;flex: 1;}
	.details-btnlist li span{display:block; width: 80%; margin: 0 auto; color: #fff; background: #FF9200; border-radius: 6px; height: 1rem; line-height: 1rem; font-size: 14px;}
	.details-btnlist li span.cancel{ background: #666666;}
	[data-dpr="2"] .details-btnlist li span{font-size: 28px;}
	[data-dpr="3"] .details-btnlist li span{font-size: 42px;}
	.details-btnlist li span img{ width: 0.7rem; vertical-align: middle;margin: -0.2rem 0.6rem 0;}
	.details-btnlist li span img.curr{ margin: -0.16rem 0.6rem 0;}
	.details-btn{ margin: 0.3rem 0;}
	.details-longIntro{ text-indent: 2em; font-size: 14px; padding: 0 0.8rem;}
	[data-dpr="2"] .details-longIntro{font-size: 28px;}
	[data-dpr="3"] .details-longIntro{font-size: 42px;}
</style>
