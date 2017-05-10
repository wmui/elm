// url解析函数
// ?id=111&name=567  => {id:111,name:567}
export function urlParse(){
	let obj = {};
	let reg = /[?&][^?&]+=[^?&%]+/g;
	let url = window.location.search;
	let arr = url.match(reg);
	arr.forEach((item) => {
		let tempArr = item.substring(1).split('=');
		let key = decodeURIComponent(tempArr[0]);
		let val = decodeURIComponent(tempArr[1]);
		obj[key] = val;
	})
	return obj;
}