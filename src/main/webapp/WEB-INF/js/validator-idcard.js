//去掉字符串头尾空格  
function trim(str) {  
	return str.replace(/(^\s*)|(\s*$)/g, "");  
} 
    
//验证身份证号
function checkIdCard(idCard){
	idCard = trim(idCard.replace(/ /g, "")); 
	if(idCard.length == 15){
    	return validate15IdCard(idCard);
	}else if(idCard.length == 18){
		return validate18IdCard(idCard);
	}else{
    	return false;
	}
}
    
//验证15位身份证号
function validate15IdCard(idCard15){
	var idCardPattern_15 = "^\\d{15}$";
	var re = new RegExp(idCardPattern_15);
	if(!re.test(idCard15)){
		return false;
	}

	var year  = "19"+idCard15.substring(6,8);  
	var month = idCard15.substring(8,10);  
	var day   = idCard15.substring(10,12);
	if(!validateDate(year,month,day)){
		return false;
	}
	
	return true;
}
    
//验证18位身份证号
function validate18IdCard(idCard18){
	var idCardPattern_18 = "^\\d{17}[0-9|x|X]$";
	var re = new RegExp(idCardPattern_18);
	if(!re.test(idCard18)){
		return false;
	}
	
	var year  = idCard18.substring(6,10);  
	var month = idCard18.substring(10,12);  
	var day   = idCard18.substring(12,14);
	if(!validateDate(year,month,day)){
		return false;
	}
	
	return true;
}
   
//验证是否为合法日期
function validateDate(year,month,date){
	var d = new Date();
	if(year < 1860  ||  year > d.getFullYear()){
		return false;
	}
	if(month < 1 || month>12){
		return false;
	}
	var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if(year%400 === 0 || year%4 === 0 || year%100 === 0){
		monthDays[1] = 29;
	}
	if(date < 1 || date > monthDays[month -1] ){
		return false;
	}
	return true;
}

//获取出生日期
function getBirthday(idCard){//110106198802093313
	idCard = trim(idCard.replace(/ /g, ""));
	if(checkIdCard(idCard)){
		var birthday="";
		if(idCard.length == 15){
			birthday = "19"+idCard.substring(6,8) +"-" +
							idCard.substring(8,10)  + "-"+
							idCard.substring(10,12);
		}else{
			birthday = idCard.substring(6,10) +"-" +
							idCard.substring(10,12)  + "-"+
							idCard.substring(12,14);
		}
		
		return birthday;
	}
}

//获取性别
function getSex(idCard){
	idCard = trim(idCard.replace(/ /g, ""));
	if(checkIdCard(idCard)){
		var sexNum;
		if(idCard.length == 15){
			sexNum = idCard.substring(14);
		}else{
			sexNum = idCard.substring(16,17);
		}
		if(sexNum%2 === 0){
			return "female";
		}else{
			return "male";
		}
	}
}

/**
  *
  * 获取年龄
  *	targetDate : 以此日期为基准时间求年龄
  *
 */
function getAge(idCard,targetDate){
	var birthdayStr = getBirthday(idCard);
	var birthday = new Date(birthdayStr.substring(0,4),birthdayStr.substring(5,7)-1,birthdayStr.substring(8,10));
	var age = targetDate.getFullYear() - birthday.getFullYear() - 
				( ( ( targetDate.getMonth() < birthday.getMonth() ) 
					|| ( ( targetDate.getMonth() == birthday.getMonth() ) && ( targetDate.getDate() < birthday.getDate() ) ) )
				? 1 : 0)
	return age;
}