function ConverErrCode(msg)
{
	var ErrCode;
	
	if(msg == "1")
	{
		ErrCode ="非接触在位已经上电";
	}
	else if(msg == "2")
	{
		ErrCode ="接触在位已经上电";
	}
	else if(msg == "3")
	{
		ErrCode = "接触在位未上电";
	}
	else if(msg == "-1")
	{
		ErrCode ="未知错误";
	}
	else if(msg == "-2")
	{
		ErrCode ="打开串口（U口）失败";
	}
	else if(msg == "-17")
	{
		ErrCode ="卡片为2.0卡片，没有圈存日志入口";
	}

	else if(msg == "-105")
	{
		ErrCode ="未知错误";
	}
	else if(msg == "-300")
	{
		ErrCode ="打开串口（U口）失败";
	}
	else if(msg == "-201")
	{
		ErrCode ="选择应用环境失败";		
	}
	else if(msg == "-202")
	{
		ErrCode ="选择应用失败";		
	}
	else if(msg == "-203")
	{
		ErrCode ="应用初始化失败";		
	}
	else if(msg == "-204")
	{
		ErrCode ="获取 ARQC 失败";		
	}
	else if(msg == "-205")
	{
		ErrCode ="外部认证失败";		
	}
	else if(msg == "-206")
	{
		ErrCode ="执行脚本错误";		
	}
	else if(msg == "-207")
	{
		ErrCode ="没有日志入口";		
	}
	else if(msg == "-208")
	{
		ErrCode ="卡片被锁定";		
	}
	else if(msg == "-209")
	{
		ErrCode ="卡片永久锁定";		
	}
	else if(msg == "-1001")
	{
		 ErrCode ="不支持接触用户";
	}
	else if(msg == "-1002")
	{
		ErrCode = "接触用户卡位未插到位";
	}
	else if( msg == "-1004")
	{
		ErrCode = "接触用户卡未上电";
	}
	else if(msg =="-1005")
	{
		ErrCode = "接触用户卡上电失败";
	}
	else if (msg == "1006")
	{
		ErrCode = "接触用户卡数据无回应";
	}
	else if (msg == "1007")
	{
		ErrCode = "接触用户卡数据出现错误";
	}
	else if(msg == "-2001")
	{
		ErrCode = "不支持 PSAM 卡";
	}
	else if(msg == "-2004")
	{
		ErrCode = "PSAM卡未上电";
	}
	else if(msg == "-2005")
	{
		ErrCode = "PSAM 卡上电失败";
	}
	else if(msg == "-2006")
	{
		ErrCode = "操作PSAM卡数据无回应";
	}
	else if(msg == "-2007")
	{
		ErrCode = "操作PSAM卡数据出现错误";
	}
	else if(msg == "-2009")// 原-1
	{
		ErrCode = "获取交易明细失败";	
	}
	else if(msg == "-3001")
	{
		ErrCode = "不支持非接触用户卡";
	}
	else if(msg == "-3004")
	{
		ErrCode = "非接触用户卡未激活";
	}
	else if(msg == "-3005")
	{
		ErrCode = "非接触用户卡激活失败";
	}
	else if(msg == "-3006")
	{
		ErrCode = "等待卡进入感应区超时";
	}
	else if(msg == "-3007")
	{
		ErrCode = "操作非接触用户卡数据出现错误";
	}
	else if(msg == "-3008")
	{
		ErrCode = "设置卡 halt 状态失败";
	}
	else if(msg == "-3009")
	{
		ErrCode = "有多张卡在感应区";
	}
	else
	{
		ErrCode = "未知错误";
	}
	
	return ErrCode;
}

function resetWin()
{
	document.getElementById("txtRsp").value="";
}

// 上电函数
function IccPowerON(  )
{
	
	var buf;
	var nRet;
	var info;
	var Len ;
	var nErrCode;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var slottype = document.getElementById("selSlotType").value;
		
		var msg =0;
		var info;
		var cAtr="";
		
		IccPboc.CT_SetSlot(slottype);
		
		msg = IccPboc.CT_PowerOn(comport, bpno, cardtype);
		
		info=IccPboc.szAtr;
		Len = IccPboc.nAtrLen;
		if ( msg == 0 )
		{
			document.getElementById("txtRsp").value += "IC 卡上电成功  长度:" + Len + "信息:" + info + "\r\n";	
		}
		else
		{
			nErrCode = ConverErrCode(msg);
			info = " IC卡上电失败 -- 错误信息：" + nErrCode;	
			window.alert(info);
		}
		
	}
	catch (e)
	{
		txtRsp.value += " 故障信息:" + e + "\r\n";
	}
	
}

// 下电函数
function IccPowerOff()
{	
	var buf;
	var nRet;
	var info;
	var nErrCode;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		
		var msg =0;
		var info;
		msg = IccPboc.CT_PowerOff(comport, bpno, cardtype);
		if ( msg == 0 )
		{
			document.getElementById("txtRsp").value +="IC 卡下电成功 \r\n";	
		}
		else
		{
			nErrCode = ConverErrCode(msg);
			info = " IC卡下电失败-- 错误与信息" + nErrCode;	
			window.alert(info);
		}
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
}

// 发送命令函数
function IccSendCmd()
{
	
	var buf;
	var nRet;
	var info;
	var Len;
	var nErrCode;
	var msg = -1;
	var info;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		
		msg = IccPboc.CT_SendCommand(comport, bpno, cardtype, 22, "00A4040005A00000033300");
		if ( msg == 0 )
		{
			Len = IccPboc.nCmdLen ;
			info = IccPboc.szCmdRecv;
			document.getElementById("txtRsp").value += "IC 发送命令成功 长度：" + Len + "数据：" + info + "\r\n";	
		}
		else
		{
			nErrCode = ConverErrCode(msg);
			info = " IC 发送命令失败-- 错误信息：" + nErrCode;	
			window.alert(info);
		}
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
}

// 卡在位检测
function IccCardPresent()
{
	var buf;
	var nRet;
	var info;
	var Len;
	var nErrCode;
	var msg;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var slottype = document.getElementById("selSlotType").value;
		var newfunc = document.getElementById("selNewFunc").value;
		
		IccPboc.CT_SetSlot(slottype);
		
		if ( newfunc == "0" )
		{
			msg = IccPboc.CT_DetectCard(comport, bpno, cardtype);
		}
		else
		{
			msg = IccPboc.CT_CardPresent(comport, bpno, cardtype);
		}
		
		document.getElementById("txtRsp").value += "IC卡在位检测完成" + "\r\n";	
		nErrCode = ConverErrCode(msg);
		info = " IC卡在位检测" + nErrCode;	
		window.alert(info);
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
	
}
//获取IC卡片信息函数
function IccGetInfo()
{
	var szTagList = "ABCDEFGHIJKL";
	var Len;
	var msg;
	var info;
	var nErrCode;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var slottype = document.getElementById("selSlotType").value;
		var newfunc = document.getElementById("selNewFunc").value;
		var defaultaid = document.getElementById("DefaultAid").value;
		
		IccPboc.CT_SetSlot(slottype);
		
		if ( newfunc == "0" )
		{
			msg = IccPboc.CT_GetIccInfo( comport, bpno, cardtype, defaultaid, szTagList );
		}
		else
		{
			msg = IccPboc.CT_getIcInfo( comport, bpno, cardtype, szTagList );
		}
		
		if ( msg == 0 )
		{
			info = IccPboc.szInfo;
			Len = IccPboc.nInfoLen;
			document.getElementById("txtRsp").value += "获取卡片信息成功  长度：" + Len + "信息" + info + "\r\n";		
		}
		else
		{
			nErrCode = ConverErrCode(msg);
			info = "获取卡片信息失败 -- 错误信息：" + nErrCode;
			window.alert(info);
		}
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
	
}
// 生产ARQC函数
function IccGenArqc()
{
	try
	{
		var msg;
		var info;
		var ascArqc="";
		var nErrCode;
		
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var slottype = document.getElementById("selSlotType").value;
		var newfunc = document.getElementById("selNewFunc").value;
		var defaultaid = document.getElementById("DefaultAid").value;
		var txdata = document.getElementById("TxSendData").value;
		
		if ( selNewFunc.value == "0" )
		{
			msg = IccPboc.CT_GenerateARQC( comport, bpno, cardtype, defaultaid, txdata );
		}
		else
		{
			msg = IccPboc.CT_genARQC( comport, bpno, cardtype, txdata );
		}
		
		if ( msg == 0 )
		{
			info = IccPboc.szArqc ;
			Len = IccPboc.nArqcLen;
			document.getElementById("txtRsp").value += "GenArqc  成功  长度:" + Len + "信息" + info + "\r\n";
		}
		else
		{
			nErrCode = ConverErrCode(msg);
			info = "生产ARQC 失败 -- 错误信息：" + nErrCode;
			window.alert(info);
		}
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
}

//处理脚本
function IccExScript()
{
	var msg;
	var info;
	var nErrCode;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var newfunc = document.getElementById("selNewFunc").value;
		var txdata = document.getElementById("TxSendData").value;
		var scriptdata = document.getElementById("TxSendData").value;
		
		if(selNewFunc.value == "0")
		{
			msg = IccPboc.CT_CloseTransAction( comport, bpno, cardtype, txdata, scriptdata );
		}
		else
		{
			msg = IccPboc.CT_CtlScriptData( comport, bpno, cardtype, txdata, scriptdata );
		}
		
		if(msg != 0)
		{
			info = "脚本执行失败 -- 错误信息：" + IccPboc.szScriptResult;
			window.alert(info);
		}
		else
		{
			document.getElementById("txtRsp").value += "脚本执行成功 TC长度：" + IccPboc.nTc + "信息" + IccPboc.szTc + "\r\n";
			document.getElementById("txtRsp").value += "脚本结果:" + IccPboc.szScriptResult + "\r\n";
		}
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
}

function IccGetDetail()
{
	var msg;
	var info;
	var Len;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var slottype = document.getElementById("selSlotType").value;
		var newfunc = document.getElementById("selNewFunc").value;
		var defaultaid = document.getElementById("DefaultAid").value;
		
		IccPboc.CT_SetSlot(slottype);
		
		msg = IccPboc.CT_GetTranDetail( comport, bpno, cardtype );
		if ( msg == 0 )
		{
			info = IccPboc.szDetail ;
			Len = IccPboc.nDetailLen;
			document.getElementById("txtRsp").value += "获取交易日志成功 长度：" + Len + "信息" + info + "\r\n";
		}
		else
		{
			info = "获取交易日志 失败" + msg;
			window.alert(info);
		}		
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
}
//圈存明细

function IccGetCreditLog()
{
	var msg;
	var info;
	var Len ;
	
	try
	{
		var comport = document.getElementById("selComPort").value;
		var bpno = document.getElementById("selBpNo").value;
		var cardtype = document.getElementById("selCardType").value;
		var slottype = document.getElementById("selSlotType").value;
		var newfunc = document.getElementById("selNewFunc").value;
		var defaultaid = document.getElementById("DefaultAid").value;
		
		IccPboc.CT_SetSlot(slottype);
		msg = IccPboc.CT_GetCreditLoadLog( comport, bpno, cardtype, defaultaid );	
		if ( msg == 0 )
		{
			info = IccPboc.szCreditLog ;
			Len = IccPboc.nCreditLen;
			document.getElementById("txtRsp").value += "获取圈存日志成功 长度：" + Len + "信息" + info + "\r\n";
		}
		else
		{
			info = " 获取圈存日志 失败" + msg;
			window.alert(info);
		}		
	}
	catch (e)
	{
		document.getElementById("txtRsp").value += " 故障信息:" + e + "\r\n";
	}
}
