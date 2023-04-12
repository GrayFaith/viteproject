export function formatIdsDict({ vueObj, cellValue, dictName }) {
	const flag = null === cellValue | cellValue === undefined | '' === cellValue;
	if (flag) {
		return cellValue;
	}
	const dict = vueObj.store['state']['dictionary']['dictionary'][dictName];
	let val;
	if (dict) {
		for (const value of dict) {
			if (cellValue.toString() === value['DICT_CODE']) {
				val = value['DICT_NAME'];
				break;
			}
		}
	}
	// 如果上面依旧无法对应上字典,那么就将原有数据返回
	if (!val) {
		val = cellValue;
	}
	return val;
}
export function formatIdsDictSelect({ vueObj, dictName }) {
	const dict = vueObj.store['state']['dictionary']['dictionary'][dictName];
	const arr = [];
	if (dict) {
		for (const value of dict) {
			arr.push({ label : value['DICT_NAME'], value : value['DICT_CODE'] });
		}
	}
	return arr;
}
export function formatQueryIdsDict({ vueObj, cellValue, dictName }) {
	const flag = null === cellValue | cellValue === undefined | '' === cellValue;
	if (flag) {
		return cellValue;
	}
	const dictionary = vueObj.store['state']['dictionary']['dictionary'][dictName];
	let val;
	if (dictionary) {
		for (const value of dictionary) {
			if (cellValue.toString() === value['KEY']) {
				val = value['VALUE'];
				break;
			}
		}
	}
	// 如果上面依旧无法对应上字典,那么就将原有数据返回
	if (!val) {
		val = cellValue;
	}
	return val;
}
export function formatQueryIdsDictByList(cellValue, list) {
	const flag = null === cellValue | cellValue === undefined | '' === cellValue;
	if (flag) {
		return cellValue;
	}
	const dictionary = list;
	let val;
	if (dictionary) {
		for (const value of dictionary) {
			if (cellValue.toString() === value['KEY']) {
				val = value['VALUE'];
				break;
			}
		}
	}
	// 如果上面依旧无法对应上字典,那么就将原有数据返回
	if (!val) {
		val = cellValue;
	}
	return val;
}
export function formatQueryIdsDictSelect({ vueObj, dictName }) {
	const dict = vueObj.store['state']['dictionary']['dictionary'][dictName];
	const arr = [];
	if (dict) {
		for (const value of dict) {
			arr.push({ label : value['VALUE'], value : value['KEY'] });
		}
	}
	return arr;
}
export function showDictValueByDictCode({ vueObj, dictName, value }) {
	let dict_name;
	vueObj.store['state']['dictionary']['dictionary'][dictName].forEach(item => {
		if (item['DICT_CODE'] === value) {
			dict_name = item['DICT_NAME'];
			return dict_name;
		}
	});
	return dict_name;
}
export function showDictValueByKey(dict, value) {
	if (dict) {
		const result = dict.find(item => item['value'] === value);
		if (result) {
			return result['label'];
		}
	}
	return value;
}