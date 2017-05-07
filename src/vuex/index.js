import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
		//章节列表
		chapterList:[],
		//收藏列表
		collectionList: JSON.parse(localStorage.getItem('collectionList'))?JSON.parse(localStorage.getItem('collectionList')):[],
		//第几章
		readId:localStorage.getItem('ReadId')?localStorage.getItem('ReadId'):0
		
	},
	mutations:{
		ChapterList(state,chapterList){
			state.chapterList = chapterList
		},
		CollectionList(state,mcollectionList){
			state.collectionList.push(mcollectionList)
		},
		//取消收藏
		CancelCollectionList(state,ind){
			state.collectionList.splice(ind,1)
		},
		ReadId(state,index){
			state.readId = index
		}
	},
	actions:{
		acChapterList({commit},chapterList){
			commit('ChapterList',chapterList)
		},
		acCollectionList({commit},collection){
			commit('CollectionList',collection)
		},
		acCancelCollectionList({commit},ind){
			commit('CancelCollectionList',ind)
		},
		acReadId({commit},index){
			commit('ReadId',index)
		}
	},
	getters:{
		getChapterList(state){
			return state.chapterList
		},
		getCollectionList(state){
			return state.collectionList
		},
		getReadId(state){
			return state.readId
		}
	}
})
export default store