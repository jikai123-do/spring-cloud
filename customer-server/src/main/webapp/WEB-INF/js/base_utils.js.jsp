<%@ page language="java" pageEncoding="UTF-8"%>
//根据日期对象，得到日期字符串（"yyyy-MM-dd"）。
function getDateString(date) {
	var month = date.getMonth() + 1;
	if( 10 > month ) {
		month = '0' + month;
	}
	
	var day = date.getDate();
	if( 10 > day ) {
		day = '0' + day;
	}
	
	var year = date.getFullYear();
	return year + "-" + month + "-" + day;
}

//根据日期字符串（"yyyy-MM-dd"），得到日期对象。
function getDateObject(dateString) {

	var dateArray = parseDateArrayByString(dateString);
	
	if( dateArray ) {
		
		return new Date(dateArray[1], dateArray[2] - 1, dateArray[3]);
	}
	
	return null;
}

function parseDateArrayByString(string) {
	var simpleDatePattern = "^(\\d{4})[\-](\\d{2})[\-](\\d{2}$)";
	
	var dateRegexp = new RegExp(simpleDatePattern);
	var dateMatched = dateRegexp.exec(string);
	
	return dateMatched;
}

//使DWR的提示信息一直在窗口的右上角显示
window.onscroll = function() {

	var top = 0;

	//判断浏览器
	if( document.all ) {
		top = document.body.scrollTop;
	} else {
		top = window.pageYOffset;
	}

	var disabledZone = $('disabledZone');
	if( null != disabledZone ) {

		disabledZone.style.top = top + 'px';
	}
};

function log(content) {
	Try.these(
		function(){
			//console.log(content);
		}
		, function() {
			alert(content);
		}
	);
}

function getContextPath() {
	//return new RegExp("http://[^/]+(/[^/]+/[PA_eccomm_cms/]*)").exec(document.URL)[1];
	return "<%=request.getContextPath() %>";
}