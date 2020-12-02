var idCardPattern_15 = "^(\\d{6})(\\d{6})(\\d{2})(\\d{1})$";
var idCardPattern_18 = "^(\\d{6})(\\d{8})(\\d{2})(\\d{1})[A-Za-z0-9]$";
var regExp15 = new RegExp(idCardPattern_15);
var regExp18 = new RegExp(idCardPattern_18);

function trim(str)
{
	/*str = str.replace(/(^\s*)|(\s*$)/g, "");
	alert(str);*/
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function validateCN(str)
{
	myReg = /^[\u4e00-\u9fa5]+$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validatePhoneEx(str) {
	var myReg = /^([0-9]{7,8})([\-][0-9]{1,5})?$/;
	var ret = !myReg.test(str);
	if(ret)
	{
		//myReg = /^([0-9]{3,4})([\-][0-9]{7,8})([\-][0-9]{1,5})?$/;
		myReg = /^([0-9]{7,8})([\-][0-9]{1,5})?$/;
		ret = !myReg.test(str);
	}
	/*if(ret)
	{
		myReg = /^([0-9]{7,11})?$/;
		ret = !myReg.test(str);
	}*/
	return ret;
}
function validateZoneZip(str) {
	var myReg = /^([0-9]{6})?$/;
	var ret = !myReg.test(str);
	return ret;
}


function validateDate(str)
{
	myReg = /^[1-2]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}$/;		//	/^[0-9]{4}[\-]{1}[0-9]{1,2}[\-]{1}[0-9]{1,2}$/
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validateDatetime(str)
{
	myReg = /^[1-2]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}[\s]{1}[0-9]{2}[\:]{1}[0-9]{2}[\:]{1}[0-9]{2}$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validateDecimal(str)
{
	myReg = /^(?:[0-9]|[1-9][0-9]*)(?:\.[0-9]{1,2})$/;//?
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validateEMail(str)
{
	myReg = /^([-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~])+@([-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~])+(\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~])+/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validateEN(str)
{
	myReg = /^[a-zA-Z0-9\.\-\_\s\@\,\:]+$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}


function validateInt(str)
{
	myReg = /^(?:[0-9]|[1-9][0-9]*)$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validateNegativeInt(str)
{
	myReg = /^-(?:[0-9]|[1-9][0-9]*)$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validatePassword(str)
{
	myReg = /^[a-zA-Z0-9]{6,12}$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validatePhone(str, isSimple) {
	var myReg;
	if( isSimple ) {
		myReg = /^(?:[0-9]{7,8})$/;
	} else {
		myReg = /^(?:[0-9]{3,4})(?:[\-][0-9]{7,8})(?:[\-][0-9]{1,5})?$/;
	}
	
	return !myReg.test(str);
}

function validateMobile(str) {

	myReg = /^([0-9]{11})$/;
	
	return !myReg.test(str);
}

function validateSafe(str)
{
	myReg = /[\|\`\'\s\/\<\>\=]+/;
	return myReg.test(str);
	//return ( myReg.test(str) )? true: false;
}

function validateTime(str)
{
	myReg = /^[0-9]{1,2}[\:]{1}[0-9]{1,2}[\:]{1}[0-9]{1,2}$/;
	return !myReg.test(str);
	//return ( !myReg.test(str) )? true: false;
}

function validateLength(value,max){
	var newvalue = value.replace(/[^\x00-\xff]/g, "***");
	var length = newvalue.length;
	return max>length?true:false;	
}

/**
 * search 页面设置必输
 * @returns {boolean} true 必输项没有值 ,false 可以查
 */
function validateQuery(){
    var num = arguments.length; //必填数
    var init =0;  //未填数
    for (var i=0;i<arguments.length;i++){
        var arg = $('#'+arguments[i]).val().trim();
        if(arg == null || arg.length == 0){
            init++;
        }
    }
    return num==init;
}


/*function validateValue(field, sort)
{
	var obj = document.getElementById(field);
	var myReg = null;

	switch(sort)
	{
		case "cn":
			myReg = /^[\u4e00-\u9fa5]+$/;
			break;
		case "date":
			myReg = /^[0-9]{4}[\-]{1}[0-9]{1,2}[\-]{1}[0-9]{1,2}$/;
			break;
		case "datetime":
			myReg = /^[0-9]{4}[\-]{1}[0-9]{1,2}[\-]{1}[0-9]{1,2}[\s]{1}[0-9]{1,2}[\:]{1}[0-9]{1,2}[\:]{1}[0-9]{1,2}$/;
			break;
		case "decimal":
			myReg = /^([0-9])+([\.]?[0-9]{0,2})$/;//?
			break;
		case "email":
			myReg = /^([-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~])+@([-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~])+(\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~])+/;
			break;
		case "en":
			myReg = /^[a-zA-Z0-9\.\-\_\s\@\,\:]+$/;
			break;
		case "int":
			myReg = /^[0-9]+$/;
			break;
		case "password":
			myReg = /^[a-zA-Z0-9]{6,12}$/;
			break;
		case "safe":
			myReg = /[\|\.\s\'\"\/\*\;\<\>\`]+/;
			return ( myReg.test(obj.value) )? true: false;
			break;
		case "time":
			myReg = /^[0-9]{1,2}[\:]{1}[0-9]{1,2}[\:]{1}[0-9]{1,2}$/;
			break;
	}

    return !myReg.test(obj.value);
    //return ( !myReg.test(obj.value) )? true: false;
}*/
