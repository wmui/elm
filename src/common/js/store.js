// 此函数用来缓存数据
export function saveToLocal(id, key, value) {
	// 创建储存对象
	let seller = window.localStorage.__seller__;
	if (!seller) {
		seller = {};
		// 通过id向__seller__添加一个空缓存对象
		seller[id] = {};
	} else {
		// eg: JSON.parse('{"1":"123","2":"456"}') 
		// result: {1:"123",2:"456"}
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	// localStorage只能存储字符串
	// eg: JSON.stringify({1:"123",2:"456"}) 
	// result: "{"1":"123","2":"456"}"
	window.localStorage.__seller__ = JSON.stringify(seller);
};

// 此函数返回一个布尔值
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	// 默认值
	if (!seller) {
		return def;
	}
	// 从id下获取缓存的对象
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	return ret || def;
};