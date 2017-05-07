<template>
	<div class="home-box">
		<header-box></header-box>
		<div class="header-paddingtop">
			<ul class="collection-list">
				<li v-for="(colllist,index) in collectionList">
					<router-link :to="{name:'details',params:{id:colllist.id}}">
						<div class="collection-box">
							<div class="collection-box-img">
								<img :src="colllist.cover|url2Real"/>
							</div>
							<div class="collection-box-con">
								<h2>{{colllist.title}}</h2>
								<p>作者:{{colllist.author}}</p>
								<p>更新时间:{{colllist.updated|getDateTime}}</p>
								<p>最新章节:{{colllist.lastChapter}}</p>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			<div class="empty-box" v-if="collectionList.length == 0">
				书架空空的！快去添加点书吧！
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderBox from '../components/header'
	export default{
		components:{
			HeaderBox
		},
		data(){
			return{
				collectionList:[]
			}
		},
		computed:{
		},
		methods:{
			
		},
		activated(){
			this.collectionList = JSON.parse(localStorage.getItem('collectionList'))
			//console.log(this.collectionList)
			for(const i=0;i<this.collectionList.length;i++){
				this.axios.get(`/readerApi/book/`+this.collectionList[i].id)
					.then((response)=>{
						this.collectionList[i].updated = response.data.updated;
						this.collectionList[i].lastChapter = response.data.lastChapter
					})
					.catch((error)=>{
						console.log(error)
					})
			}
			console.log(this.collectionList)
			localStorage.setItem('collectionList',JSON.stringify(this.collectionList))
		}
	}
</script>

<style>
	.empty-box{text-align: center; font-size: 20px; margin-top: 3rem;}
	[data-dpr="2"] .empty-box{ font-size: 40px;}
	[data-dpr="3"] .empty-box{ font-size: 60px;}
	.collection-list{ padding: 0 0.2rem;}
	.collection-list li{border-bottom: 1px solid #666666;}
	.collection-box{ display: -webkit-flex; display: flex;}
	.collection-box-img{ padding: 0.2rem 0.3rem 0.2rem 0;}
	.collection-box-img img{ width: 1.8rem;}
	.collection-box-con h2{ color: #FF9200;font-size: 16px;}
	[data-dpr="2"] .collection-box-con h2{ font-size: 32px;}
	[data-dpr="3"] .collection-box-con h2{ font-size: 48px;}
	.collection-box-con p{ padding-bottom: 0.2rem;}
	.collection-box-con p:last-child{ padding-bottom: 0;}
</style>
