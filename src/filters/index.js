//转化封面url为实际url
export const url2Real = (url) => {
	if (url.search(/agent/i) === -1) {
      return 'http://api.zhuishushenqi.com' + url;
    }
    else{
      return url.replace(/\/agent\//, '');
    }
}
//将字数带上单位 如12345 转化为1.2万字
export const wordCountStr = (wordCount) => {
	if (Array.from(String(wordCount)).length > 4) {
      let arr = Array.from(String(wordCount));
      arr.length -= 4;
      wordCount = arr.join('') + '万';
    }
    return wordCount + '字';
}
// 时间格式YYYY-MM-DD HH:mm:ss 转化为YYYY-MM-DD
export function getDateTime(dataTime){
	let time = dataTime;
	let str = time.substring(0,10);
	return str
}