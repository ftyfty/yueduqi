<template>
	<div class="">
		<div class="">
			
		</div>
		<div class="read-box">
			<h2>{{bookRead.title}}</h2>
			<pre class="read-box-con" v-html="bookRead.content"></pre>
		</div>
		<ul class="read-btn">
			<li @click="previousChapter">
				<span >上一章</span>
			</li>
			<li @click="nextChapter">
				<span >下一章</span>
			</li>
		</ul>
		<div class="touch-box"></div>
		<div class=""></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bookRead:{
					title:'',
					content:''
				},
				bookChapters:[],
				index:''
			}
		},
		computed:{
//			index(){
//				return this.$store.getters.getReadId
//			}
		},

		activated(){
			this.index = this.$store.getters.getReadId
			console.log(this.index)
			this.bookChapters =  this.$store.getters.getChapterList.length ? this.$store.getters.getChapterList:JSON.parse(localStorage.getItem('chapterList'));
			this.obtainCon()
		},
//		deactivated(){
//			this.$destroy()
//		},
		methods:{
			obtainCon(){
				this.axios.get(`/readerChapter/chapter/`+this.bookChapters[this.index].link+`?k=2124b73d7e2e1945&t=1468223717`)
				.then((response)=>{
					console.log(response)
					if(response.data.ok){
						window.scroll(0,0)
                        const data = response.data.chapter
						this.bookRead.title = data.title;
						this.bookRead.content = data.cpContent?data.cpContent:data.body
					}
				}).catch((error)=>{
					console.log(error)
				})
				
			},
			previousChapter(){
				this.index--
				//console.log(this.index)
				if(this.index<0){
					this.index++
					alert("已经是第一章了")
					return
				}
				this.$store.dispatch('acReadId',this.index)
				localStorage.setItem('ReadId',this.index)
				this.obtainCon()
				console.log(this.$store.getters.getReadId)
			},
			nextChapter(){
				this.index++
				if(this.index>=this.bookChapters.length){
					this.index--
					alert("已经是最新一章了")
					return
				}
				this.$store.dispatch('acReadId',this.index)
				localStorage.setItem('ReadId',this.index)
				this.obtainCon()
				console.log(this.$store.getters.getReadId)
			}
		}
	}
</script>

<style>
	.read-box{padding: 0 0.4rem;}
	.read-box h2{ font-size: 18px; color: #666;}
	[data-dpr="2"] .read-box h2{ font-size: 36px;}
	[data-dpr="3"] .read-box h2{ font-size: 54px;}
	.read-btn{display: -webkit-flex; display: flex;}
	.read-btn li{flex: 1;-webkit-flex: 1; text-align: center; margin: 0.2rem 0; font-size: 18px; color: #666666;}
	[data-dpr="2"] .read-btn li{font-size: 36px;}
	[data-dpr="3"] .read-btn li{font-size: 54px;}
	.read-box pre{text-indent: 2em;}
	.touch-box{ position: fixed; width: 100%; height: 50%; background: #000; z-index: 9999; left: 0; top: 25%; display: none;}
</style>