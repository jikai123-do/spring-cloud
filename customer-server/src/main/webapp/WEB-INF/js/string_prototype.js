String.prototype.trim = function(){ return trim(this);}
String.prototype.lTrim = function(){return lTrim(this);}
String.prototype.lTrim = function(){return rTrim(this);}
String.prototype.startsWith = function(prefix){ return startsWith(this, prefix);}
String.prototype.endsWith = function(suffix){ return endsWith(this, suffix);}
String.prototype.realLength = function() { return realLength(this);}
String.prototype.replaceAll = function(target, replacement){return replaceAll(this, target, replacement);}
String.prototype.htmlEncode = function(){return htmlEncode(this);}
String.prototype.htmlDecode = function(){return htmlDecode(this);}


function lTrim(str) {
	return str.replace(/(^\s*)/,"");
}

function rTrim(str) {
	return str.replace(/(\s*$)/,"");
}

function trim(str) {
  //return this.replace(/(^\s*)|(\s*$)/g, "");
	return lTrim(rTrim(str));
}

function startsWith(str, prefix) {

	try{
	
		return ( str.match("^" + prefix) == prefix );
	} catch(e) {
		
		return false;
	}
}

function endsWith(str, suffix) {

	try{
	
		return ( str.match(suffix + "$") == suffix );
	} catch(e) {
		
		return false;
	}
}

function realLength(s) {

	var totalLength = 0;
	var i;
	var charCode;
	for (i = 0; i < s.length; i++) {
		charCode = s.charCodeAt(i);
		if (charCode < 0x007f) {
		  totalLength++;
		} else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
		  totalLength += 2;
		} else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
		  totalLength += 3;
		}
	}
	
	//alert(totalLength);
	return totalLength;
}

function replaceAll(src, target, replacement){  

	return src.replace(new RegExp(target, "g"), replacement);  
}  
   
function htmlEncode(str){

	return str.replaceAll("&", "&amp;")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replaceAll("'", "&apos;")
				.replaceAll("\"", "&quot;");
}

function htmlDecode(str){

	return str.replaceAll("&amp;", "&")  
				.replaceAll("&lt;", "<")
				.replaceAll("&gt;", ">")
				.replaceAll("&apos;", "'")
				.replaceAll("&quot;", "\"")
				.replaceAll("&034;", "\"");
}

/*function replaceAll(inputString, target, replacement) {
	var temp = inputString;
	if (target == "") {
		return inputString;
	}
	if (replacement.indexOf(target) == -1) { 
		while (temp.indexOf(target) != -1) {
			var toTheLeft = temp.substring(0, temp.indexOf(target));
			var toTheRight = temp.substring(temp.indexOf(target)+target.length, temp.length);
			temp = toTheLeft + replacement + toTheRight;
		}
	} else { 
		var midStrings = new Array("~", "`", "_", "^", "#");
		var midStringLen = 1;
		var midString = "";
		while(midString == "") {
			for (var i=0; i < midStrings.length; i++) {
				var tempMidString = "";
				for (var j=0; j < midStringLen; j++) {
					tempMidString += midStrings;
				}
				if (target.indexOf(tempMidString) == -1) {
					midString = tempMidString;
					i = midStrings.length + 1;
				}
			}
		} 
		while(temp.indexOf(target) != -1) {
			var toTheLeft = temp.substring(0, temp.indexOf(target));
			var toTheRight = temp.substring(temp.indexOf(target)+target.length, temp.length);
			temp = toTheLeft + midString + toTheRight;
		}
		while (temp.indexOf(midString) != -1) {
			var toTheLeft = temp.substring(0, temp.indexOf(midString));
			var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
			temp = toTheLeft + replacement + toTheRight;
		}
	} 
	return temp; 
}*/