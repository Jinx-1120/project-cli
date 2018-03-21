/*
 * rules 所有模块验证规则
 * 作者:zyc
 * 日期:2017-04-17
 *
 * */
import {
	utils
} from '../libs/util';
import _ from 'lodash'
let defEvent = 'blur';

let vcity = {
	11: "北京",
	12: "天津",
	13: "河北",
	14: "山西",
	15: "内蒙古",
	21: "辽宁",
	22: "吉林",
	23: "黑龙江",
	31: "上海",
	32: "江苏",
	33: "浙江",
	34: "安徽",
	35: "福建",
	36: "江西",
	37: "山东",
	41: "河南",
	42: "湖北",
	43: "湖南",
	44: "广东",
	45: "广西",
	46: "海南",
	50: "重庆",
	51: "四川",
	52: "贵州",
	53: "云南",
	54: "西藏",
	61: "陕西",
	62: "甘肃",
	63: "青海",
	64: "宁夏",
	65: "新疆",
	71: "台湾",
	81: "香港",
	82: "澳门",
	91: "国外"
};

let checkCard = function (rule, value, callback) {
	var card = value;
	//是否为空
	if (card === '') {
		callback(new Error('请输入身份证号，身份证号不能为空'));
	}
	//校验长度，类型
	if (isCardNo(card) === false) {
		callback(new Error('您输入的身份证号码不正确，请重新输入'));
	}
	//检查省份
	if (checkProvince(card) === false) {
		callback(new Error('您输入的身份证号码不正确,请重新输入'));
	}
	//校验生日
	if (checkBirthday(card) === false) {
		callback(new Error('您输入的身份证号码生日不正确,请重新输入'));
	}
	//检验位的检测
	if (checkParity(card) === false) {
		callback(new Error('您的身份证校验位不正确,请重新输入'));
	}
	callback();
};

//检查号码是否符合规范，包括长度，类型
let isCardNo = function (card) {
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	if (reg.test(card) === false) {
		return false;
	}
	
	return true;
};

//取身份证前两位,校验省份
let checkProvince = function (card) {
	var province = card.substr(0, 2);
	if (vcity[province] == undefined) {
		return false;
	}
	return true;
};

//检查生日是否正确
let checkBirthday = function (card) {
	var len = card.length;
	//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
	if (len == '15') {
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		var arr_data = card.match(re_fifteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date('19' + year + '/' + month + '/' + day);
		return verifyBirthday('19' + year, month, day, birthday);
	}
	//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
	if (len == '18') {
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = card.match(re_eighteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date(year + '/' + month + '/' + day);
		return verifyBirthday(year, month, day, birthday);
	}
	return false;
};

//校验日期
let verifyBirthday = function (year, month, day, birthday) {
	var now = new Date();
	var now_year = now.getFullYear();
	//年月日是否合理
	if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
		//判断年份的范围（3岁到100岁之间)
		var time = now_year - year;
		if (time >= 3 && time <= 100) {
			return true;
		}
		return false;
	}
	return false;
};

//校验位的检测
let checkParity = function (card) {
	//15位转18位
	card = changeFivteenToEighteen(card);
	var len = card.length;
	if (len == '18') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i, valnum;
		for (i = 0; i < 17; i++) {
			cardTemp += card.substr(i, 1) * arrInt[i];
		}
		valnum = arrCh[cardTemp % 11];
		if (valnum == card.substr(17, 1)) {
			return true;
		}
		return false;
	}
	return false;
};

//15位转18位身份证号
let changeFivteenToEighteen = function (card) {
	if (card.length == '15') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0,
			i;
		card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
		for (i = 0; i < 17; i++) {
			cardTemp += card.substr(i, 1) * arrInt[i];
		}
		card += arrCh[cardTemp % 11];
		return card;
	}
	return card;
};


let baseRules = {
	requiredNoEvent: {
		required: true,
		message: '此项不能为空',
	},
	required: {
		required: true,
		message: '此项不能为空!',
		trigger: defEvent
	}, //非空验证
	mustHasOne: {
		type: 'array',
		required: true,
		message: '请至少选择一个!',
		trigger: 'change'
	}, //至少选择一个
	/*
	 * 字符串区间值
	 * @min number 范围最小值
	 * @max number 范围最大值
	 * @return {}
	 * */
	sectionVal: function (min = 2, max = 20) {
		return {
			min: min,
			max: max,
			message: '长度在 ' + min + ' 到 ' + max + ' 个字符'
		}
	},
	email: {
		type: 'email',
		message: '邮箱格式不正确',
		trigger: defEvent,
	}, //邮箱验证
	//手机号
	mobile: {
		type: 'string',
		message: '手机号格式不正确',
		pattern: /^1(3|4|5|7|8)\d{9}$/
	},
	
	//身份证
	idNumber: checkCard,
	// 数字
	number: {
		// type: 'number',
		message: '该项必须为数字并且最多10位',
		pattern: /^\d{1,10}$/,
		trigger: defEvent
	},
	/**
	 * 输入字符长度检测
	 * @min number 范围最小值
	 * @max number 范围最大值
	 *
	 * 参数：null -> 不做任何检测 inputLen()
	 *      min -> 最少输入多少个字符 inputLen(2)
	 *      0,max -> 最多输入多少个字符 inputLen(0,5)
	 *      min,max -> 只能输入min-max个字符 inputLen(1,10)
	 */
	inputLen: (min, max) => {
		// 长度检测
		return (rule, value = '', callback) => {
			let msg;
			if (!value) value = '';
			if (min === 0 && max && value.length > max) {
				msg = `最多输入${max}个字符`;
			} else {
				if (max && (value.length > max || value.length < min)) {
					msg = `只能输入${min}-${max}个字符`
				}
				if (value.length < min) {
					msg = `最少输入${min}个字符`;
				}
			}
			msg && callback(new Error(msg));
			callback();
		}
	},
	/*
	 * 异步验证数据
	 * @optins {} //验证传递的参数
	 * example
	 * //{validator:baseRules.asyncVal, oldValue:{value:'',val:false}, url:'http://192.168.1.116:8000/role/list?name=&identify=djgs&type=', myMessage:'已存在', trigger: 'blur'}
	 * */
	asyncVal: function (rule, value, callback, source, options) {
		
		let url = rule.url; //服务请求的地址
		let params = {}; //服务请求的必须参数
		let messages = rule.myMessage;
		if (value == "") {
			rule.oldValue["value"] = "";
			return;
		}
		/*if(rule.oldValue["value"]==value){
		  switch (rule.oldValue["val"]) {
			case 0:
			  //已验证成功
			  callback();
			  break;
			case 1:
			  //验证失败
			  callback(new Error(messages));
			  break;
			case 2:
			  //验证失败
			  callback(new Error("服务端数据验证失败!"));
			  break;
			case 3:
			  //客户端请求异常
			  callback(new Error("客户端请求异常!"));
			  break;
		  }
		  return ;
		}*/
		rule.oldValue["value"] = value;
		utils.queryData({
			url: url,
			params: params
		})().then(function (data) {
			let response = data["data"];
			if (data["status"] == 200) {
				if (response["data"].length > 0) {
					//数据库中已存在
					rule.oldValue["val"] = 1;
					callback(new Error(messages));
				} else {
					//数据库中不存在
					rule.oldValue["val"] = 0;
					callback();
				}
			} else {
				//服务端已经响应,2XX错误
				rule.oldValue["val"] = 2;
				callback(new Error("服务端数据验证失败!"));
			}
		}).catch(function (error) {
			//客户端请求失败
			rule.oldValue["val"] = 3;
			callback(new Error(error))
		})
	}
}



let rules = {
	//权限管理
	authority: {
		name: [
			_.defaultsDeep({}, baseRules.required, {
				message: '角色名称不能为空'
			}),
			baseRules.sectionVal(),
		],
		identify: [
			_.defaultsDeep({}, baseRules.required),
			//baseRules.email,
		],
		type: [
			baseRules.mustHasOne
		],
		remark: [
			baseRules.required
		]
	},
	//人员账户
	users: {
		name: [baseRules.required], //姓名
		sex: [baseRules.requiredNoEvent], //性别
		origin: [baseRules.inputLen(0, 20)], // 籍贯
		specialty: [baseRules.required], //专业
		school: [baseRules.requiredNoEvent], //学校
		grade: [baseRules.required], //年级
		group: [baseRules.required], //班级
		idNumber: [baseRules.required, baseRules.inputLen(15, 18)], //身份证号码
		mobile: [baseRules.required, baseRules.mobile], //手机号
		emgContactMobile: [baseRules.mobile], // 紧急联系人
		postCode: [baseRules.number], // 邮编
		email: [baseRules.required, baseRules.email, ], //邮箱
	},
	//本科教育-周历
	calendar: {
		weekSetInstructions: [baseRules.required], //姓名,
	}
}

export default rules;
  