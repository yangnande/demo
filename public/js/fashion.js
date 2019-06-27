/**
 *调用手机客户端
 */
var fashion = {
	mobile_os: ["android", "wp8", "ios"],
	error_reason: "",
	O2String: function(O) {
		var S = [];
		var J = "";
		if (Object.prototype.toString.apply(O) === '[object Array]') {
			for (var i = 0; i < O.length; i++)
				S.push(O2String(O[i]));
			J = '[' + S.join(',') + ']';
		} else if (Object.prototype.toString.apply(O) === '[object Date]') {
			J = "new Date(" + O.getTime() + ")";
		} else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
			J = O.toString();
		} else if (Object.prototype.toString.apply(O) === '[object Object]') {
			for (var i in O) {

				var tmp = typeof(O[i]) == 'string' ? '"' + O[i] + '"' : (typeof(O[i]) === 'object' ? O2String(O[i]) : O[i]);
				S.push('"' + i + '"' + ':' + tmp);
			}
			J = '{' + S.join(',') + '}';
		} else if (Object.prototype.toString.apply(O) === '[object Number]') {
			J = O.toString();
		} else if (Object.prototype.toString.apply(O) === '[object String]') {
			J = O;
		}
		return J;
	},
	mobile_info: {},
	user_call_back: function(obj) {
		fashion.error_reason = "undefined user call back.";
	},
	init_cb: function(obj) {},
	mobileInvoke: function(jsonstr) {
		var obj = eval("(" + jsonstr + ")");
		if (undefined != typeof(obj.BUSINESSNAME) && "undefined" != typeof(obj.BUSINESSNAME) && "initJS" == obj.BUSINESSNAME && undefined != typeof(obj.OSTYPE) && "undefined" != typeof(obj.OSTYPE)) {
			
			fashion.mobile_info = obj;
			fashion.init_cb(obj);
		} else {
			if (obj.CODE == 2 || obj.CODE == 100) { //设置TOKEN
				if (undefined != obj.VERSION && null != obj.VERSION) {
				
					if (obj.VERSION.length >= 3 && 2.2 <= parseFloat(obj.VERSION.substring(0, 3)) && publicClient.versions.ios) {
						
						obj.CITY = newCity.reCity(obj.CITY);
					}
				} 
			}
			fashion.user_call_back(obj);
		}
	},
	set_init_cb: function(func) {
		fashion.init_cb = func;
	},
	/**
	 * 判断操作系统并调用系统的js
	 * @param obj 给手机客户端传递json对象
	 * @param cb 回调js方法
	 */
	invokeMobile: function(obj, cb) {
//		alert("obj="+JSON.stringify(obj))
		var arg = fashion.O2String(obj);
		fashion.user_call_back = cb;
		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //android系统
			javascript: sdkInterface.enteryMobile(arg);
		} else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { //ios系统
			window.location.href = "mobileFunc:" + arg;
		} else if (u.indexOf('IEMobile') > -1) { //Windows Phone系统
			window.external.notify(arg);
		} else {
			fashion.error_reason = "不支持该操作系统";
			return;
		}
	}
};
var mobileInvoke = function(jsonstr) {
	fashion.mobileInvoke(jsonstr);
};

var newCity = {
	/**
	 * 传递新的城市编码获取老的城市编码
	 * @param {Object} city 新的城市编码
	 */
	reCity: function(city) {
		var data = newCity.cityData;
		$.each(data, function(index, d) {
			if (d.newcitycode == city) {
				city = d.oldcitycode;
				return false;
			}
		});
		return city;
	},
	/**
	 * 传递老的城市编码获取最新的城市编码
	 * @param {Object} city 老的城市编码
	 */
	reNewCity: function(city) {
		var data = newCity.cityData;
		$.each(data, function(index, d) {
			if (d.oldcitycode == city) {
				city = d.newcitycode;
				return false;
			}
		});
		return city;
	},
	cityData: [{
		"name": "北京",
		"oldcitycode": "010",
		"newcitycode": "100",
		"proviceCODE": "100"
	}, {
		"name": "广州",
		"oldcitycode": "020",
		"newcitycode": "200",
		"proviceCODE": "200"
	}, {
		"name": "上海",
		"oldcitycode": "021",
		"newcitycode": "210",
		"proviceCODE": "210"
	}, {
		"name": "天津",
		"oldcitycode": "022",
		"newcitycode": "220",
		"proviceCODE": "220"
	}, {
		"name": "重庆",
		"oldcitycode": "023",
		"newcitycode": "230",
		"proviceCODE": "230"
	}, {
		"name": "沈阳",
		"oldcitycode": "024",
		"newcitycode": "240",
		"proviceCODE": "240"
	}, {
		"name": "南京",
		"oldcitycode": "025",
		"newcitycode": "250",
		"proviceCODE": "250"
	}, {
		"name": "武汉",
		"oldcitycode": "027",
		"newcitycode": "270",
		"proviceCODE": "270"
	}, {
		"name": "成都",
		"oldcitycode": "028",
		"newcitycode": "280",
		"proviceCODE": "280"
	}, {
		"name": "西安",
		"oldcitycode": "029",
		"newcitycode": "290",
		"proviceCODE": "290"
	}, {
		"name": "邯郸",
		"oldcitycode": "0310",
		"newcitycode": "310",
		"proviceCODE": "311"
	}, {
		"name": "石家庄",
		"oldcitycode": "0311",
		"newcitycode": "311",
		"proviceCODE": "311"
	}, {
		"name": "保定",
		"oldcitycode": "0312",
		"newcitycode": "312",
		"proviceCODE": "311"
	}, {
		"name": "张家口",
		"oldcitycode": "0313",
		"newcitycode": "313",
		"proviceCODE": "311"
	}, {
		"name": "承德",
		"oldcitycode": "0314",
		"newcitycode": "314",
		"proviceCODE": "311"
	}, {
		"name": "唐山",
		"oldcitycode": "0315",
		"newcitycode": "315",
		"proviceCODE": "311"
	}, {
		"name": "廊坊",
		"oldcitycode": "0316",
		"newcitycode": "316",
		"proviceCODE": "311"
	}, {
		"name": "沧州",
		"oldcitycode": "0317",
		"newcitycode": "317",
		"proviceCODE": "311"
	}, {
		"name": "衡水",
		"oldcitycode": "0318",
		"newcitycode": "318",
		"proviceCODE": "311"
	}, {
		"name": "邢台",
		"oldcitycode": "0319",
		"newcitycode": "319",
		"proviceCODE": "311"
	}, {
		"name": "秦皇岛",
		"oldcitycode": "0335",
		"newcitycode": "335",
		"proviceCODE": "311"
	}, {
		"name": "朔州",
		"oldcitycode": "0349",
		"newcitycode": "349",
		"proviceCODE": "351"
	}, {
		"name": "忻州",
		"oldcitycode": "0350",
		"newcitycode": "350",
		"proviceCODE": "351"
	}, {
		"name": "太原",
		"oldcitycode": "0351",
		"newcitycode": "351",
		"proviceCODE": "351"
	}, {
		"name": "大同",
		"oldcitycode": "0352",
		"newcitycode": "352",
		"proviceCODE": "351"
	}, {
		"name": "阳泉",
		"oldcitycode": "0353",
		"newcitycode": "353",
		"proviceCODE": "351"
	}, {
		"name": "晋中",
		"oldcitycode": "0354",
		"newcitycode": "354",
		"proviceCODE": "351"
	}, {
		"name": "长治",
		"oldcitycode": "0355",
		"newcitycode": "355",
		"proviceCODE": "351"
	}, {
		"name": "晋城",
		"oldcitycode": "0356",
		"newcitycode": "356",
		"proviceCODE": "351"
	}, {
		"name": "临汾",
		"oldcitycode": "0357",
		"newcitycode": "357",
		"proviceCODE": "351"
	}, {
		"name": "吕梁",
		"oldcitycode": "0358",
		"newcitycode": "358",
		"proviceCODE": "351"
	}, {
		"name": "运城",
		"oldcitycode": "0359",
		"newcitycode": "359",
		"proviceCODE": "351"
	}, {
		"name": "商丘",
		"oldcitycode": "0370",
		"newcitycode": "370",
		"proviceCODE": "371"
	}, {
		"name": "郑州",
		"oldcitycode": "0371",
		"newcitycode": "371",
		"proviceCODE": "371"
	}, {
		"name": "安阳",
		"oldcitycode": "0372",
		"newcitycode": "372",
		"proviceCODE": "371"
	}, {
		"name": "新乡",
		"oldcitycode": "0373",
		"newcitycode": "373",
		"proviceCODE": "371"
	}, {
		"name": "许昌",
		"oldcitycode": "0374",
		"newcitycode": "374",
		"proviceCODE": "371"
	}, {
		"name": "平顶山",
		"oldcitycode": "0375",
		"newcitycode": "375",
		"proviceCODE": "371"
	}, {
		"name": "信阳",
		"oldcitycode": "0376",
		"newcitycode": "376",
		"proviceCODE": "371"
	}, {
		"name": "南阳",
		"oldcitycode": "0377",
		"newcitycode": "377",
		"proviceCODE": "371"
	}, {
		"name": "开封",
		"oldcitycode": "0378",
		"newcitycode": "378",
		"proviceCODE": "371"
	}, {
		"name": "洛阳",
		"oldcitycode": "0379",
		"newcitycode": "379",
		"proviceCODE": "371"
	}, {
		"name": "焦作",
		"oldcitycode": "0391",
		"newcitycode": "391",
		"proviceCODE": "371"
	}, {
		"name": "鹤壁",
		"oldcitycode": "0392",
		"newcitycode": "392",
		"proviceCODE": "371"
	}, {
		"name": "濮阳",
		"oldcitycode": "0393",
		"newcitycode": "393",
		"proviceCODE": "371"
	}, {
		"name": "周口",
		"oldcitycode": "0394",
		"newcitycode": "394",
		"proviceCODE": "371"
	}, {
		"name": "漯河",
		"oldcitycode": "0395",
		"newcitycode": "395",
		"proviceCODE": "371"
	}, {
		"name": "驻马店",
		"oldcitycode": "0396",
		"newcitycode": "396",
		"proviceCODE": "371"
	}, {
		"name": "三门峡",
		"oldcitycode": "0398",
		"newcitycode": "398",
		"proviceCODE": "371"
	}, {
		"name": "铁岭",
		"oldcitycode": "0241",
		"newcitycode": "410",
		"proviceCODE": "240"
	}, {
		"name": "大连",
		"oldcitycode": "0411",
		"newcitycode": "411",
		"proviceCODE": "240"
	}, {
		"name": "鞍山",
		"oldcitycode": "0412",
		"newcitycode": "412",
		"proviceCODE": "240"
	}, {
		"name": "抚顺",
		"oldcitycode": "0242",
		"newcitycode": "413",
		"proviceCODE": "240"
	}, {
		"name": "本溪",
		"oldcitycode": "0414",
		"newcitycode": "414",
		"proviceCODE": "240"
	}, {
		"name": "丹东",
		"oldcitycode": "0415",
		"newcitycode": "415",
		"proviceCODE": "240"
	}, {
		"name": "锦州",
		"oldcitycode": "0416",
		"newcitycode": "416",
		"proviceCODE": "240"
	}, {
		"name": "营口",
		"oldcitycode": "0417",
		"newcitycode": "417",
		"proviceCODE": "240"
	}, {
		"name": "阜新",
		"oldcitycode": "0418",
		"newcitycode": "418",
		"proviceCODE": "240"
	}, {
		"name": "辽阳",
		"oldcitycode": "0419",
		"newcitycode": "419",
		"proviceCODE": "240"
	}, {
		"name": "朝阳",
		"oldcitycode": "0421",
		"newcitycode": "421",
		"proviceCODE": "240"
	}, {
		"name": "盘锦",
		"oldcitycode": "0427",
		"newcitycode": "427",
		"proviceCODE": "240"
	}, {
		"name": "葫芦岛",
		"oldcitycode": "0429",
		"newcitycode": "429",
		"proviceCODE": "240"
	}, {
		"name": "长春",
		"oldcitycode": "0431",
		"newcitycode": "431",
		"proviceCODE": "431"
	}, {
		"name": "吉林",
		"oldcitycode": "0432",
		"newcitycode": "432",
		"proviceCODE": "431"
	}, {
		"name": "延边朝鲜族自治州",
		"oldcitycode": "0433",
		"newcitycode": "433",
		"proviceCODE": "431"
	}, {
		"name": "四平",
		"oldcitycode": "0434",
		"newcitycode": "434",
		"proviceCODE": "431"
	}, {
		"name": "通化",
		"oldcitycode": "0435",
		"newcitycode": "435",
		"proviceCODE": "431"
	}, {
		"name": "白城",
		"oldcitycode": "0436",
		"newcitycode": "436",
		"proviceCODE": "431"
	}, {
		"name": "辽源",
		"oldcitycode": "0437",
		"newcitycode": "437",
		"proviceCODE": "431"
	}, {
		"name": "松原",
		"oldcitycode": "0438",
		"newcitycode": "438",
		"proviceCODE": "431"
	}, {
		"name": "白山",
		"oldcitycode": "0439",
		"newcitycode": "439",
		"proviceCODE": "431"
	}, {
		"name": "哈尔滨",
		"oldcitycode": "0451",
		"newcitycode": "451",
		"proviceCODE": "451"
	}, {
		"name": "齐齐哈尔",
		"oldcitycode": "0452",
		"newcitycode": "452",
		"proviceCODE": "451"
	}, {
		"name": "牡丹江",
		"oldcitycode": "0453",
		"newcitycode": "453",
		"proviceCODE": "451"
	}, {
		"name": "佳木斯",
		"oldcitycode": "0454",
		"newcitycode": "454",
		"proviceCODE": "451"
	}, {
		"name": "绥化",
		"oldcitycode": "0455",
		"newcitycode": "455",
		"proviceCODE": "451"
	}, {
		"name": "黑河",
		"oldcitycode": "0456",
		"newcitycode": "456",
		"proviceCODE": "451"
	}, {
		"name": "大兴安岭",
		"oldcitycode": "0457",
		"newcitycode": "457",
		"proviceCODE": "451"
	}, {
		"name": "伊春",
		"oldcitycode": "1458",
		"newcitycode": "458",
		"proviceCODE": "451"
	}, {
		"name": "大庆",
		"oldcitycode": "0459",
		"newcitycode": "459",
		"proviceCODE": "451"
	}, {
		"name": "七台河",
		"oldcitycode": "0464",
		"newcitycode": "464",
		"proviceCODE": "451"
	}, {
		"name": "鸡西",
		"oldcitycode": "0467",
		"newcitycode": "467",
		"proviceCODE": "451"
	}, {
		"name": "鹤岗",
		"oldcitycode": "0468",
		"newcitycode": "468",
		"proviceCODE": "451"
	}, {
		"name": "双鸭山",
		"oldcitycode": "0469",
		"newcitycode": "469",
		"proviceCODE": "451"
	}, {
		"name": "呼和浩特",
		"oldcitycode": "0471",
		"newcitycode": "471",
		"proviceCODE": "471"
	}, {
		"name": "包头",
		"oldcitycode": "0472",
		"newcitycode": "472",
		"proviceCODE": "471"
	}, {
		"name": "乌海",
		"oldcitycode": "0473",
		"newcitycode": "473",
		"proviceCODE": "471"
	}, {
		"name": "通辽",
		"oldcitycode": "0475",
		"newcitycode": "475",
		"proviceCODE": "471"
	}, {
		"name": "赤峰",
		"oldcitycode": "0476",
		"newcitycode": "476",
		"proviceCODE": "471"
	}, {
		"name": "鄂尔多斯",
		"oldcitycode": "0477",
		"newcitycode": "477",
		"proviceCODE": "471"
	}, {
		"name": "阿拉善盟",
		"oldcitycode": "0483",
		"newcitycode": "483",
		"proviceCODE": "471"
	}, {
		"name": "无锡",
		"oldcitycode": "0510",
		"newcitycode": "510",
		"proviceCODE": "250"
	}, {
		"name": "镇江",
		"oldcitycode": "0511",
		"newcitycode": "511",
		"proviceCODE": "250"
	}, {
		"name": "苏州",
		"oldcitycode": "0512",
		"newcitycode": "512",
		"proviceCODE": "250"
	}, {
		"name": "南通",
		"oldcitycode": "0513",
		"newcitycode": "513",
		"proviceCODE": "250"
	}, {
		"name": "扬州",
		"oldcitycode": "0514",
		"newcitycode": "514",
		"proviceCODE": "250"
	}, {
		"name": "盐城",
		"oldcitycode": "0515",
		"newcitycode": "515",
		"proviceCODE": "250"
	}, {
		"name": "徐州",
		"oldcitycode": "0516",
		"newcitycode": "516",
		"proviceCODE": "250"
	}, {
		"name": "淮安",
		"oldcitycode": "0517",
		"newcitycode": "517",
		"proviceCODE": "250"
	}, {
		"name": "连云港",
		"oldcitycode": "0518",
		"newcitycode": "518",
		"proviceCODE": "250"
	}, {
		"name": "常州",
		"oldcitycode": "0519",
		"newcitycode": "519",
		"proviceCODE": "250"
	}, {
		"name": "宿迁",
		"oldcitycode": "0527",
		"newcitycode": "520",
		"proviceCODE": "250"
	}, {
		"name": "泰州",
		"oldcitycode": "0523",
		"newcitycode": "523",
		"proviceCODE": "250"
	}, {
		"name": "菏泽",
		"oldcitycode": "0530",
		"newcitycode": "530",
		"proviceCODE": "531"
	}, {
		"name": "济南",
		"oldcitycode": "0531",
		"newcitycode": "531",
		"proviceCODE": "531"
	}, {
		"name": "青岛",
		"oldcitycode": "0532",
		"newcitycode": "532",
		"proviceCODE": "531"
	}, {
		"name": "淄博",
		"oldcitycode": "0533",
		"newcitycode": "533",
		"proviceCODE": "531"
	}, {
		"name": "德州",
		"oldcitycode": "0534",
		"newcitycode": "534",
		"proviceCODE": "531"
	}, {
		"name": "烟台",
		"oldcitycode": "0535",
		"newcitycode": "535",
		"proviceCODE": "531"
	}, {
		"name": "潍坊",
		"oldcitycode": "0536",
		"newcitycode": "536",
		"proviceCODE": "531"
	}, {
		"name": "济宁",
		"oldcitycode": "0537",
		"newcitycode": "537",
		"proviceCODE": "531"
	}, {
		"name": "泰安",
		"oldcitycode": "0538",
		"newcitycode": "538",
		"proviceCODE": "531"
	}, {
		"name": "临沂",
		"oldcitycode": "0539",
		"newcitycode": "539",
		"proviceCODE": "531"
	}, {
		"name": "滨州",
		"oldcitycode": "0543",
		"newcitycode": "543",
		"proviceCODE": "531"
	}, {
		"name": "东营",
		"oldcitycode": "0546",
		"newcitycode": "546",
		"proviceCODE": "531"
	}, {
		"name": "滁州",
		"oldcitycode": "0550",
		"newcitycode": "550",
		"proviceCODE": "551"
	}, {
		"name": "合肥",
		"oldcitycode": "0551",
		"newcitycode": "551",
		"proviceCODE": "551"
	}, {
		"name": "蚌埠",
		"oldcitycode": "0552",
		"newcitycode": "552",
		"proviceCODE": "551"
	}, {
		"name": "芜湖",
		"oldcitycode": "0553",
		"newcitycode": "553",
		"proviceCODE": "551"
	}, {
		"name": "淮南",
		"oldcitycode": "0554",
		"newcitycode": "554",
		"proviceCODE": "551"
	}, {
		"name": "马鞍山",
		"oldcitycode": "0555",
		"newcitycode": "555",
		"proviceCODE": "551"
	}, {
		"name": "安庆",
		"oldcitycode": "0556",
		"newcitycode": "556",
		"proviceCODE": "551"
	}, {
		"name": "宿州",
		"oldcitycode": "0557",
		"newcitycode": "557",
		"proviceCODE": "551"
	}, {
		"name": "阜阳",
		"oldcitycode": "1558",
		"newcitycode": "558",
		"proviceCODE": "551"
	}, {
		"name": "黄山",
		"oldcitycode": "0559",
		"newcitycode": "559",
		"proviceCODE": "551"
	}, {
		"name": "淮北",
		"oldcitycode": "0561",
		"newcitycode": "561",
		"proviceCODE": "551"
	}, {
		"name": "铜陵",
		"oldcitycode": "0562",
		"newcitycode": "562",
		"proviceCODE": "551"
	}, {
		"name": "宣城",
		"oldcitycode": "0563",
		"newcitycode": "563",
		"proviceCODE": "551"
	}, {
		"name": "六安",
		"oldcitycode": "0564",
		"newcitycode": "564",
		"proviceCODE": "551"
	}, {
		"name": "巢湖",
		"oldcitycode": "0565",
		"newcitycode": "565",
		"proviceCODE": "551"
	}, {
		"name": "池州",
		"oldcitycode": "0566",
		"newcitycode": "566",
		"proviceCODE": "551"
	}, {
		"name": "亳州",
		"oldcitycode": "0558",
		"newcitycode": "567",
		"proviceCODE": "551"
	}, {
		"name": "衢州",
		"oldcitycode": "0570",
		"newcitycode": "570",
		"proviceCODE": "571"
	}, {
		"name": "杭州",
		"oldcitycode": "0571",
		"newcitycode": "571",
		"proviceCODE": "571"
	}, {
		"name": "湖州",
		"oldcitycode": "0572",
		"newcitycode": "572",
		"proviceCODE": "571"
	}, {
		"name": "嘉兴",
		"oldcitycode": "0573",
		"newcitycode": "573",
		"proviceCODE": "571"
	}, {
		"name": "宁波",
		"oldcitycode": "0574",
		"newcitycode": "574",
		"proviceCODE": "571"
	}, {
		"name": "绍兴",
		"oldcitycode": "0575",
		"newcitycode": "575",
		"proviceCODE": "571"
	}, {
		"name": "台州",
		"oldcitycode": "0576",
		"newcitycode": "576",
		"proviceCODE": "571"
	}, {
		"name": "温州",
		"oldcitycode": "0577",
		"newcitycode": "577",
		"proviceCODE": "571"
	}, {
		"name": "丽水",
		"oldcitycode": "0578",
		"newcitycode": "578",
		"proviceCODE": "571"
	}, {
		"name": "金华",
		"oldcitycode": "0579",
		"newcitycode": "579",
		"proviceCODE": "571"
	}, {
		"name": "舟山",
		"oldcitycode": "0580",
		"newcitycode": "580",
		"proviceCODE": "571"
	}, {
		"name": "福州",
		"oldcitycode": "0591",
		"newcitycode": "591",
		"proviceCODE": "591"
	}, {
		"name": "厦门",
		"oldcitycode": "0592",
		"newcitycode": "592",
		"proviceCODE": "591"
	}, {
		"name": "宁德",
		"oldcitycode": "0593",
		"newcitycode": "593",
		"proviceCODE": "591"
	}, {
		"name": "莆田",
		"oldcitycode": "0594",
		"newcitycode": "594",
		"proviceCODE": "591"
	}, {
		"name": "泉州",
		"oldcitycode": "0595",
		"newcitycode": "595",
		"proviceCODE": "591"
	}, {
		"name": "漳州",
		"oldcitycode": "0596",
		"newcitycode": "596",
		"proviceCODE": "591"
	}, {
		"name": "龙岩",
		"oldcitycode": "0597",
		"newcitycode": "597",
		"proviceCODE": "591"
	}, {
		"name": "三明",
		"oldcitycode": "0598",
		"newcitycode": "598",
		"proviceCODE": "591"
	}, {
		"name": "南平",
		"oldcitycode": "0599",
		"newcitycode": "599",
		"proviceCODE": "591"
	}, {
		"name": "威海",
		"oldcitycode": "0631",
		"newcitycode": "631",
		"proviceCODE": "531"
	}, {
		"name": "枣庄",
		"oldcitycode": "0632",
		"newcitycode": "632",
		"proviceCODE": "531"
	}, {
		"name": "日照",
		"oldcitycode": "0633",
		"newcitycode": "633",
		"proviceCODE": "531"
	}, {
		"name": "莱芜",
		"oldcitycode": "0634",
		"newcitycode": "634",
		"proviceCODE": "531"
	}, {
		"name": "聊城",
		"oldcitycode": "0635",
		"newcitycode": "635",
		"proviceCODE": "531"
	}, {
		"name": "汕尾",
		"oldcitycode": "0660",
		"newcitycode": "660",
		"proviceCODE": "200"
	}, {
		"name": "阳江",
		"oldcitycode": "0662",
		"newcitycode": "662",
		"proviceCODE": "200"
	}, {
		"name": "揭阳",
		"oldcitycode": "0663",
		"newcitycode": "663",
		"proviceCODE": "200"
	}, {
		"name": "茂名",
		"oldcitycode": "0668",
		"newcitycode": "668",
		"proviceCODE": "200"
	}, {
		"name": "德宏",
		"oldcitycode": "0692",
		"newcitycode": "692",
		"proviceCODE": "871"
	}, {
		"name": "鹰潭",
		"oldcitycode": "0701",
		"newcitycode": "701",
		"proviceCODE": "791"
	}, {
		"name": "鄂州",
		"oldcitycode": "0711",
		"newcitycode": "711",
		"proviceCODE": "270"
	}, {
		"name": "孝感",
		"oldcitycode": "0712",
		"newcitycode": "712",
		"proviceCODE": "270"
	}, {
		"name": "黄冈",
		"oldcitycode": "0713",
		"newcitycode": "713",
		"proviceCODE": "270"
	}, {
		"name": "黄石",
		"oldcitycode": "0714",
		"newcitycode": "714",
		"proviceCODE": "270"
	}, {
		"name": "咸宁",
		"oldcitycode": "0715",
		"newcitycode": "715",
		"proviceCODE": "270"
	}, {
		"name": "荆州",
		"oldcitycode": "0716",
		"newcitycode": "716",
		"proviceCODE": "270"
	}, {
		"name": "宜昌",
		"oldcitycode": "0717",
		"newcitycode": "717",
		"proviceCODE": "270"
	}, {
		"name": "恩施土家族苗族自治州",
		"oldcitycode": "0718",
		"newcitycode": "718",
		"proviceCODE": "270"
	}, {
		"name": "十堰",
		"oldcitycode": "0719",
		"newcitycode": "719",
		"proviceCODE": "270"
	}, {
		"name": "随州",
		"oldcitycode": "0722",
		"newcitycode": "722",
		"proviceCODE": "270"
	}, {
		"name": "荆门",
		"oldcitycode": "0724",
		"newcitycode": "724",
		"proviceCODE": "270"
	}, {
		"name": "岳阳",
		"oldcitycode": "0730",
		"newcitycode": "730",
		"proviceCODE": "731"
	}, {
		"name": "长沙",
		"oldcitycode": "0731",
		"newcitycode": "731",
		"proviceCODE": "731"
	}, {
		"name": "湘潭",
		"oldcitycode": "1731",
		"newcitycode": "732",
		"proviceCODE": "731"
	}, {
		"name": "株洲",
		"oldcitycode": "2731",
		"newcitycode": "733",
		"proviceCODE": "731"
	}, {
		"name": "衡阳",
		"oldcitycode": "0734",
		"newcitycode": "734",
		"proviceCODE": "731"
	}, {
		"name": "郴州",
		"oldcitycode": "0735",
		"newcitycode": "735",
		"proviceCODE": "731"
	}, {
		"name": "常德",
		"oldcitycode": "0736",
		"newcitycode": "736",
		"proviceCODE": "731"
	}, {
		"name": "益阳",
		"oldcitycode": "0737",
		"newcitycode": "737",
		"proviceCODE": "731"
	}, {
		"name": "娄底",
		"oldcitycode": "0738",
		"newcitycode": "738",
		"proviceCODE": "731"
	}, {
		"name": "邵阳",
		"oldcitycode": "0739",
		"newcitycode": "739",
		"proviceCODE": "731"
	}, {
		"name": "张家界",
		"oldcitycode": "0744",
		"newcitycode": "744",
		"proviceCODE": "731"
	}, {
		"name": "怀化",
		"oldcitycode": "0745",
		"newcitycode": "745",
		"proviceCODE": "731"
	}, {
		"name": "永州",
		"oldcitycode": "0746",
		"newcitycode": "746",
		"proviceCODE": "731"
	}, {
		"name": "江门",
		"oldcitycode": "0750",
		"newcitycode": "750",
		"proviceCODE": "200"
	}, {
		"name": "韶关",
		"oldcitycode": "0751",
		"newcitycode": "751",
		"proviceCODE": "200"
	}, {
		"name": "惠州",
		"oldcitycode": "0752",
		"newcitycode": "752",
		"proviceCODE": "200"
	}, {
		"name": "梅州",
		"oldcitycode": "0753",
		"newcitycode": "753",
		"proviceCODE": "200"
	}, {
		"name": "汕头",
		"oldcitycode": "0754",
		"newcitycode": "754",
		"proviceCODE": "200"
	}, {
		"name": "深圳",
		"oldcitycode": "0755",
		"newcitycode": "755",
		"proviceCODE": "200"
	}, {
		"name": "珠海",
		"oldcitycode": "0756",
		"newcitycode": "756",
		"proviceCODE": "200"
	}, {
		"name": "佛山",
		"oldcitycode": "0757",
		"newcitycode": "757",
		"proviceCODE": "200"
	}, {
		"name": "肇庆",
		"oldcitycode": "0758",
		"newcitycode": "758",
		"proviceCODE": "200"
	}, {
		"name": "湛江",
		"oldcitycode": "0759",
		"newcitycode": "759",
		"proviceCODE": "200"
	}, {
		"name": "中山",
		"oldcitycode": "0760",
		"newcitycode": "760",
		"proviceCODE": "200"
	}, {
		"name": "河源",
		"oldcitycode": "0762",
		"newcitycode": "762",
		"proviceCODE": "200"
	}, {
		"name": "清远",
		"oldcitycode": "0763",
		"newcitycode": "763",
		"proviceCODE": "200"
	}, {
		"name": "云浮",
		"oldcitycode": "0766",
		"newcitycode": "766",
		"proviceCODE": "200"
	}, {
		"name": "潮州",
		"oldcitycode": "0768",
		"newcitycode": "768",
		"proviceCODE": "200"
	}, {
		"name": "东莞",
		"oldcitycode": "0769",
		"newcitycode": "769",
		"proviceCODE": "200"
	}, {
		"name": "防城港",
		"oldcitycode": "0770",
		"newcitycode": "770",
		"proviceCODE": "771"
	}, {
		"name": "南宁",
		"oldcitycode": "0771",
		"newcitycode": "771",
		"proviceCODE": "771"
	}, {
		"name": "柳州",
		"oldcitycode": "0772",
		"newcitycode": "772",
		"proviceCODE": "771"
	}, {
		"name": "桂林",
		"oldcitycode": "0773",
		"newcitycode": "773",
		"proviceCODE": "771"
	}, {
		"name": "梧州",
		"oldcitycode": "0774",
		"newcitycode": "774",
		"proviceCODE": "771"
	}, {
		"name": "玉林",
		"oldcitycode": "0775",
		"newcitycode": "775",
		"proviceCODE": "771"
	}, {
		"name": "百色",
		"oldcitycode": "0776",
		"newcitycode": "776",
		"proviceCODE": "771"
	}, {
		"name": "钦州",
		"oldcitycode": "0777",
		"newcitycode": "777",
		"proviceCODE": "771"
	}, {
		"name": "河池",
		"oldcitycode": "0778",
		"newcitycode": "778",
		"proviceCODE": "771"
	}, {
		"name": "北海",
		"oldcitycode": "0779",
		"newcitycode": "779",
		"proviceCODE": "771"
	}, {
		"name": "崇左",
		"oldcitycode": "1771",
		"newcitycode": "780",
		"proviceCODE": "771"
	}, {
		"name": "来宾",
		"oldcitycode": "1772",
		"newcitycode": "781",
		"proviceCODE": "771"
	}, {
		"name": "贵港",
		"oldcitycode": "1775",
		"newcitycode": "782",
		"proviceCODE": "771"
	}, {
		"name": "贺州",
		"oldcitycode": "1774",
		"newcitycode": "783",
		"proviceCODE": "771"
	}, {
		"name": "新余",
		"oldcitycode": "0790",
		"newcitycode": "790",
		"proviceCODE": "791"
	}, {
		"name": "南昌",
		"oldcitycode": "0791",
		"newcitycode": "791",
		"proviceCODE": "791"
	}, {
		"name": "九江",
		"oldcitycode": "0792",
		"newcitycode": "792",
		"proviceCODE": "791"
	}, {
		"name": "上饶",
		"oldcitycode": "0793",
		"newcitycode": "793",
		"proviceCODE": "791"
	}, {
		"name": "抚州",
		"oldcitycode": "0794",
		"newcitycode": "794",
		"proviceCODE": "791"
	}, {
		"name": "宜春",
		"oldcitycode": "0795",
		"newcitycode": "795",
		"proviceCODE": "791"
	}, {
		"name": "吉安",
		"oldcitycode": "0796",
		"newcitycode": "796",
		"proviceCODE": "791"
	}, {
		"name": "赣州",
		"oldcitycode": "0797",
		"newcitycode": "797",
		"proviceCODE": "791"
	}, {
		"name": "景德镇",
		"oldcitycode": "0798",
		"newcitycode": "798",
		"proviceCODE": "791"
	}, {
		"name": "萍乡",
		"oldcitycode": "0799",
		"newcitycode": "799",
		"proviceCODE": "791"
	}, {
		"name": "攀枝花",
		"oldcitycode": "0812",
		"newcitycode": "812",
		"proviceCODE": "280"
	}, {
		"name": "自贡",
		"oldcitycode": "0813",
		"newcitycode": "813",
		"proviceCODE": "280"
	}, {
		"name": "绵阳",
		"oldcitycode": "0816",
		"newcitycode": "816",
		"proviceCODE": "280"
	}, {
		"name": "南充",
		"oldcitycode": "0817",
		"newcitycode": "817",
		"proviceCODE": "280"
	}, {
		"name": "达州",
		"oldcitycode": "0818",
		"newcitycode": "818",
		"proviceCODE": "280"
	}, {
		"name": "遂宁",
		"oldcitycode": "0825",
		"newcitycode": "825",
		"proviceCODE": "280"
	}, {
		"name": "广安",
		"oldcitycode": "0826",
		"newcitycode": "826",
		"proviceCODE": "280"
	}, {
		"name": "巴中",
		"oldcitycode": "0827",
		"newcitycode": "827",
		"proviceCODE": "280"
	}, {
		"name": "泸州",
		"oldcitycode": "0830",
		"newcitycode": "830",
		"proviceCODE": "280"
	}, {
		"name": "宜宾",
		"oldcitycode": "0831",
		"newcitycode": "831",
		"proviceCODE": "280"
	}, {
		"name": "内江",
		"oldcitycode": "0832",
		"newcitycode": "832",
		"proviceCODE": "280"
	}, {
		"name": "乐山",
		"oldcitycode": "0833",
		"newcitycode": "833",
		"proviceCODE": "280"
	}, {
		"name": "雅安",
		"oldcitycode": "0835",
		"newcitycode": "835",
		"proviceCODE": "280"
	}, {
		"name": "德阳",
		"oldcitycode": "0838",
		"newcitycode": "838",
		"proviceCODE": "280"
	}, {
		"name": "广元",
		"oldcitycode": "0839",
		"newcitycode": "839",
		"proviceCODE": "280"
	}, {
		"name": "资阳",
		"oldcitycode": "0281",
		"newcitycode": "840",
		"proviceCODE": "280"
	}, {
		"name": "眉山",
		"oldcitycode": "0282",
		"newcitycode": "841",
		"proviceCODE": "280"
	}, {
		"name": "贵阳",
		"oldcitycode": "0851",
		"newcitycode": "851",
		"proviceCODE": "851"
	}, {
		"name": "遵义",
		"oldcitycode": "0852",
		"newcitycode": "852",
		"proviceCODE": "851"
	}, {
		"name": "安顺",
		"oldcitycode": "0853",
		"newcitycode": "853",
		"proviceCODE": "851"
	}, {
		"name": "铜仁",
		"oldcitycode": "0856",
		"newcitycode": "856",
		"proviceCODE": "851"
	}, {
		"name": "毕节",
		"oldcitycode": "0857",
		"newcitycode": "857",
		"proviceCODE": "851"
	}, {
		"name": "六盘水",
		"oldcitycode": "0858",
		"newcitycode": "858",
		"proviceCODE": "851"
	}, {
		"name": "昭通",
		"oldcitycode": "0870",
		"newcitycode": "870",
		"proviceCODE": "871"
	}, {
		"name": "昆明",
		"oldcitycode": "0871",
		"newcitycode": "871",
		"proviceCODE": "871"
	}, {
		"name": "大理",
		"oldcitycode": "0872",
		"newcitycode": "872",
		"proviceCODE": "871"
	}, {
		"name": "曲靖",
		"oldcitycode": "0874",
		"newcitycode": "874",
		"proviceCODE": "871"
	}, {
		"name": "保山",
		"oldcitycode": "0875",
		"newcitycode": "875",
		"proviceCODE": "871"
	}, {
		"name": "文山",
		"oldcitycode": "0876",
		"newcitycode": "876",
		"proviceCODE": "871"
	}, {
		"name": "玉溪",
		"oldcitycode": "0877",
		"newcitycode": "877",
		"proviceCODE": "871"
	}, {
		"name": "楚雄",
		"oldcitycode": "0878",
		"newcitycode": "878",
		"proviceCODE": "871"
	}, {
		"name": "临沧",
		"oldcitycode": "0883",
		"newcitycode": "883",
		"proviceCODE": "871"
	}, {
		"name": "怒江",
		"oldcitycode": "0886",
		"newcitycode": "886",
		"proviceCODE": "871"
	}, {
		"name": "迪庆",
		"oldcitycode": "0887",
		"newcitycode": "887",
		"proviceCODE": "871"
	}, {
		"name": "丽江",
		"oldcitycode": "0888",
		"newcitycode": "888",
		"proviceCODE": "871"
	}, {
		"name": "拉萨",
		"oldcitycode": "0891",
		"newcitycode": "891",
		"proviceCODE": "891"
	}, {
		"name": "日喀则",
		"oldcitycode": "0892",
		"newcitycode": "892",
		"proviceCODE": "891"
	}, {
		"name": "山南",
		"oldcitycode": "0893",
		"newcitycode": "893",
		"proviceCODE": "891"
	}, {
		"name": "林芝",
		"oldcitycode": "0894",
		"newcitycode": "894",
		"proviceCODE": "891"
	}, {
		"name": "昌都",
		"oldcitycode": "0895",
		"newcitycode": "895",
		"proviceCODE": "891"
	}, {
		"name": "那曲",
		"oldcitycode": "0896",
		"newcitycode": "896",
		"proviceCODE": "891"
	}, {
		"name": "阿里",
		"oldcitycode": "0897",
		"newcitycode": "897",
		"proviceCODE": "891"
	}, {
		"name": "塔城",
		"oldcitycode": "0901",
		"newcitycode": "901",
		"proviceCODE": "991"
	}, {
		"name": "哈密",
		"oldcitycode": "0902",
		"newcitycode": "902",
		"proviceCODE": "991"
	}, {
		"name": "和田",
		"oldcitycode": "0903",
		"newcitycode": "903",
		"proviceCODE": "991"
	}, {
		"name": "阿勒泰",
		"oldcitycode": "0906",
		"newcitycode": "906",
		"proviceCODE": "991"
	}, {
		"name": "延安",
		"oldcitycode": "0911",
		"newcitycode": "911",
		"proviceCODE": "290"
	}, {
		"name": "榆林",
		"oldcitycode": "0912",
		"newcitycode": "912",
		"proviceCODE": "290"
	}, {
		"name": "渭南",
		"oldcitycode": "0913",
		"newcitycode": "913",
		"proviceCODE": "290"
	}, {
		"name": "商洛",
		"oldcitycode": "0914",
		"newcitycode": "914",
		"proviceCODE": "290"
	}, {
		"name": "安康",
		"oldcitycode": "0915",
		"newcitycode": "915",
		"proviceCODE": "290"
	}, {
		"name": "汉中",
		"oldcitycode": "0916",
		"newcitycode": "916",
		"proviceCODE": "290"
	}, {
		"name": "宝鸡",
		"oldcitycode": "0917",
		"newcitycode": "917",
		"proviceCODE": "290"
	}, {
		"name": "铜川",
		"oldcitycode": "0919",
		"newcitycode": "919",
		"proviceCODE": "290"
	}, {
		"name": "咸阳",
		"oldcitycode": "0291",
		"newcitycode": "920",
		"proviceCODE": "290"
	}, {
		"name": "临夏",
		"oldcitycode": "0930",
		"newcitycode": "930",
		"proviceCODE": "931"
	}, {
		"name": "兰州",
		"oldcitycode": "0931",
		"newcitycode": "931",
		"proviceCODE": "931"
	}, {
		"name": "定西",
		"oldcitycode": "0932",
		"newcitycode": "932",
		"proviceCODE": "931"
	}, {
		"name": "平凉",
		"oldcitycode": "0933",
		"newcitycode": "933",
		"proviceCODE": "931"
	}, {
		"name": "庆阳",
		"oldcitycode": "0934",
		"newcitycode": "934",
		"proviceCODE": "931"
	}, {
		"name": "张掖",
		"oldcitycode": "0936",
		"newcitycode": "936",
		"proviceCODE": "931"
	}, {
		"name": "酒泉",
		"oldcitycode": "0937",
		"newcitycode": "937",
		"proviceCODE": "931"
	}, {
		"name": "天水",
		"oldcitycode": "0938",
		"newcitycode": "938",
		"proviceCODE": "931"
	}, {
		"name": "陇南",
		"oldcitycode": "0939",
		"newcitycode": "939",
		"proviceCODE": "931"
	}, {
		"name": "甘南",
		"oldcitycode": "0941",
		"newcitycode": "941",
		"proviceCODE": "931"
	}, {
		"name": "白银",
		"oldcitycode": "0943",
		"newcitycode": "943",
		"proviceCODE": "931"
	}, {
		"name": "金昌",
		"oldcitycode": "0935",
		"newcitycode": "945",
		"proviceCODE": "931"
	}, {
		"name": "嘉峪关",
		"oldcitycode": "1937",
		"newcitycode": "947",
		"proviceCODE": "931"
	}, {
		"name": "银川",
		"oldcitycode": "0951",
		"newcitycode": "951",
		"proviceCODE": "951"
	}, {
		"name": "石嘴山",
		"oldcitycode": "0952",
		"newcitycode": "952",
		"proviceCODE": "951"
	}, {
		"name": "吴忠",
		"oldcitycode": "0953",
		"newcitycode": "953",
		"proviceCODE": "951"
	}, {
		"name": "固原",
		"oldcitycode": "0954",
		"newcitycode": "954",
		"proviceCODE": "951"
	}, {
		"name": "中卫",
		"oldcitycode": "0955",
		"newcitycode": "955",
		"proviceCODE": "951"
	}, {
		"name": "西宁",
		"oldcitycode": "0971",
		"newcitycode": "971",
		"proviceCODE": "971"
	}, {
		"name": "海东",
		"oldcitycode": "0972",
		"newcitycode": "972",
		"proviceCODE": "971"
	}, {
		"name": "格尔木市",
		"oldcitycode": "0979",
		"newcitycode": "979",
		"proviceCODE": "971"
	}, {
		"name": "克拉玛依",
		"oldcitycode": "0990",
		"newcitycode": "990",
		"proviceCODE": "991"
	}, {
		"name": "乌鲁木齐",
		"oldcitycode": "0991",
		"newcitycode": "991",
		"proviceCODE": "991"
	}, {
		"name": "伊犁哈萨克自治州",
		"oldcitycode": "0992",
		"newcitycode": "999",
		"proviceCODE": "991"
	}, {
		"name": "吐鲁番",
		"oldcitycode": "0995",
		"newcitycode": "995",
		"proviceCODE": "991"
	}, {
		"name": "阿克苏",
		"oldcitycode": "0997",
		"newcitycode": "997",
		"proviceCODE": "991"
	}, {
		"name": "喀什",
		"oldcitycode": "0998",
		"newcitycode": "998",
		"proviceCODE": "991"
	}, {
		"name": "济源市",
		"oldcitycode": "0391",
		"newcitycode": "397",
		"proviceCODE": "371"
	}, {
		"name": "呼伦贝尔",
		"oldcitycode": "0470",
		"newcitycode": "470",
		"proviceCODE": "471"
	}, {
		"name": "乌兰察布",
		"oldcitycode": "0474",
		"newcitycode": "474",
		"proviceCODE": "471"
	}, {
		"name": "巴彦淖尔",
		"oldcitycode": "0478",
		"newcitycode": "478",
		"proviceCODE": "471"
	}, {
		"name": "锡林郭勒盟",
		"oldcitycode": "0479",
		"newcitycode": "479",
		"proviceCODE": "471"
	}, {
		"name": "兴安盟",
		"oldcitycode": "0482",
		"newcitycode": "482",
		"proviceCODE": "471"
	}, {
		"name": "西双版纳",
		"oldcitycode": "0691",
		"newcitycode": "691",
		"proviceCODE": "871"
	}, {
		"name": "襄阳",
		"oldcitycode": "0710",
		"newcitycode": "710",
		"proviceCODE": "270"
	}, {
		"name": "三亚",
		"oldcitycode": "0898",
		"newcitycode": "721",
		"proviceCODE": "898"
	}, {
		"name": "湘西土家族苗族自治州",
		"oldcitycode": "0743",
		"newcitycode": "743",
		"proviceCODE": "731"
	}, {
		"name": "凉山彝族自治州",
		"oldcitycode": "0834",
		"newcitycode": "834",
		"proviceCODE": "280"
	}, {
		"name": "甘孜藏族自治州",
		"oldcitycode": "0836",
		"newcitycode": "836",
		"proviceCODE": "280"
	}, {
		"name": "阿坝藏族羌族自治州",
		"oldcitycode": "0837",
		"newcitycode": "837",
		"proviceCODE": "280"
	}, {
		"name": "红河州",
		"oldcitycode": "0873",
		"newcitycode": "873",
		"proviceCODE": "871"
	}, {
		"name": "普洱",
		"oldcitycode": "0879",
		"newcitycode": "879",
		"proviceCODE": "871"
	}, {
		"name": "海口",
		"oldcitycode": "0898",
		"newcitycode": "898",
		"proviceCODE": "898"
	}, {
		"name": "克孜勒苏柯尔克孜自治州",
		"oldcitycode": "0908",
		"newcitycode": "908",
		"proviceCODE": "991"
	}, {
		"name": "博尔塔拉蒙古自治州",
		"oldcitycode": "0909",
		"newcitycode": "909",
		"proviceCODE": "991"
	}, {
		"name": "武威",
		"oldcitycode": "1935",
		"newcitycode": "935",
		"proviceCODE": "931"
	}, {
		"name": "海北藏族自治州",
		"oldcitycode": "0970",
		"newcitycode": "970",
		"proviceCODE": "971"
	}, {
		"name": "黄南藏族自治州",
		"oldcitycode": "0973",
		"newcitycode": "973",
		"proviceCODE": "971"
	}, {
		"name": "海南藏族自治州",
		"oldcitycode": "0974",
		"newcitycode": "974",
		"proviceCODE": "971"
	}, {
		"name": "果洛藏族自治州",
		"oldcitycode": "0975",
		"newcitycode": "975",
		"proviceCODE": "971"
	}, {
		"name": "玉树藏族自治州",
		"oldcitycode": "0976",
		"newcitycode": "976",
		"proviceCODE": "971"
	}, {
		"name": "海西蒙古自治州",
		"oldcitycode": "0977",
		"newcitycode": "977",
		"proviceCODE": "971"
	}, {
		"name": "临高县",
		"oldcitycode": "0898",
		"newcitycode": "980",
		"proviceCODE": "898"
	}, {
		"name": "白沙县",
		"oldcitycode": "0898",
		"newcitycode": "981",
		"proviceCODE": "898"
	}, {
		"name": "昌江县",
		"oldcitycode": "0898",
		"newcitycode": "982",
		"proviceCODE": "898"
	}, {
		"name": "乐东县",
		"oldcitycode": "0898",
		"newcitycode": "983",
		"proviceCODE": "898"
	}, {
		"name": "陵水县",
		"oldcitycode": "0898",
		"newcitycode": "984",
		"proviceCODE": "898"
	}, {
		"name": "保亭县",
		"oldcitycode": "0898",
		"newcitycode": "985",
		"proviceCODE": "898"
	}, {
		"name": "琼中县",
		"oldcitycode": "0898",
		"newcitycode": "986",
		"proviceCODE": "898"
	}, {
		"name": "昌吉回族自治州",
		"oldcitycode": "0994",
		"newcitycode": "994",
		"proviceCODE": "991"
	}, {
		"name": "巴音郭楞蒙古自治州",
		"oldcitycode": "0996",
		"newcitycode": "996",
		"proviceCODE": "991"
	}, {
		"name": "伊犁哈萨克自治州",
		"oldcitycode": "0999",
		"newcitycode": "999",
		"proviceCODE": "991"
	}, {
		"name": "重庆",
		"oldcitycode": "0231",
		"newcitycode": "230",
		"proviceCODE": "230"
	}, {
		"name": "重庆",
		"oldcitycode": "0232",
		"newcitycode": "230",
		"proviceCODE": "230"
	}, {
		"name": "重庆",
		"oldcitycode": "0233",
		"newcitycode": "230",
		"proviceCODE": "230"
	}, {
		"name": "信阳",
		"oldcitycode": "1376",
		"newcitycode": "376",
		"proviceCODE": "371"
	}, {
		"name": "延边朝鲜族自治州",
		"oldcitycode": "1433",
		"newcitycode": "433",
		"proviceCODE": "431"
	}, {
		"name": "通化",
		"oldcitycode": "1435",
		"newcitycode": "435",
		"proviceCODE": "431"
	}, {
		"name": "省直辖行政单位",
		"oldcitycode": "0728",
		"newcitycode": "271",
		"proviceCODE": "270"
	}, {
		"name": "万宁市",
		"oldcitycode": "0898",
		"newcitycode": "988",
		"proviceCODE": "898"
	}, {
		"name": "东方市",
		"oldcitycode": "0898",
		"newcitycode": "989",
		"proviceCODE": "898"
	}, {
		"name": "五指山市",
		"oldcitycode": "0898",
		"newcitycode": "899",
		"proviceCODE": "898"
	}, {
		"name": "儋州市",
		"oldcitycode": "0898",
		"newcitycode": "890",
		"proviceCODE": "898"
	}, {
		"name": "定安县",
		"oldcitycode": "0898",
		"newcitycode": "907",
		"proviceCODE": "898"
	}, {
		"name": "屯昌县",
		"oldcitycode": "0898",
		"newcitycode": "889",
		"proviceCODE": "898"
	}, {
		"name": "文昌市",
		"oldcitycode": "0898",
		"newcitycode": "900",
		"proviceCODE": "898"
	}, {
		"name": "澄迈县",
		"oldcitycode": "0898",
		"newcitycode": "904",
		"proviceCODE": "898"
	}, {
		"name": "琼海市",
		"oldcitycode": "0898",
		"newcitycode": "905",
		"proviceCODE": "898"
	}, {
		"name": "黔西南布依族苗族自治州",
		"oldcitycode": "0859",
		"newcitycode": "860",
		"proviceCODE": "851"
	}, {
		"name": "黔东南苗族侗族自治州",
		"oldcitycode": "0855",
		"newcitycode": "861",
		"proviceCODE": "851"
	}, {
		"name": "黔南布依族苗族自治州",
		"oldcitycode": "0854",
		"newcitycode": "862",
		"proviceCODE": "851"
	}, {
		"name": "省直辖行政单位",
		"oldcitycode": "0993",
		"newcitycode": "1100",
		"proviceCODE": "991"
	}]
}