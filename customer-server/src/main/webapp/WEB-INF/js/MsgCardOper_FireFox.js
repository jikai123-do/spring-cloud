

function RAWCard( )
{
	var sec = document.getElementById("Action");
	switch( parseInt(sec.value) )
	{
		case 1:
			ReadTrack( 1 );
			break;
		case 2:
			ReadTrack( 2 );
			break;
		case 3:
			ReadTrack( 3 );
			break;
		case 4:
			ReadTrack( 12 );
			break;
		case 5:
			ReadTrack( 23 );
			break;
		case 6:
			ReadTrack( 123 );
			break;
		case 7:
			WriteTrack( 1 );
			break;
		case 8:
			WriteTrack( 2 );
			break;
		case 9:
			WriteTrack( 3 );
			break;
		case 10:
			WriteTrack( 12 );
			break;
		case 11:
			WriteTrack( 23 );
			break;
		case 12:
			WriteTrack( 123 );
			break;
	}
}	


function ReadTrack( nMode )
{		
	var szDevice = document.getElementById("Device").value;
	var nBaudrate = parseInt(document.getElementById("Baudrate").value);
	var BpNo = document.getElementById("EntendPort").value;
	var nTimeOut = parseInt(document.getElementById("Timeout").value);
	var nCharset = parseInt(document.getElementById("Charset").value);

	if(MsgCardOper == null )
	{ 
		window.alert("请先安装ocx控件");
		return ;
	}
	
	document.getElementById("sk1").value = "";
	document.getElementById("sk2").value = "";
	document.getElementById("sk3").value = "";
	var bRet = MsgCardOper.CT_ReadMsgCard( szDevice, nBaudrate, BpNo, nCharset, nTimeOut, nMode );
	if( bRet == 0 )
	{
		if(nMode == 1)
		{
			document.getElementById("sk1").value = MsgCardOper.Tr2Data;
		}
		else if( nMode == 2 )
		{
			document.getElementById("sk2").value = MsgCardOper.Tr2Data;
		}
		else if( nMode == 3 )
		{
			document.getElementById("sk3").value = MsgCardOper.Tr3Data;
		}
		else if( nMode == 12 )
		{
			document.getElementById("sk1").value = MsgCardOper.Tr1Data;
			document.getElementById("sk2").value = MsgCardOper.Tr2Data;
		}
		else if( nMode == 23 )
		{
			document.getElementById("sk2").value = MsgCardOper.Tr2Data;
			document.getElementById("sk3").value = MsgCardOper.Tr3Data;
		}
		else
		{
			document.getElementById("sk1").value = MsgCardOper.Tr1Data;
			document.getElementById("sk2").value = MsgCardOper.Tr2Data;
			document.getElementById("sk3").value = MsgCardOper.Tr3Data;
		}
	}
	else
	{
		window.alert("读卡错误，错误代码：" + bRet );
	}
}


function WriteTrack( nMode )
{
	var szDevice = document.getElementById("Device").value;
	var nBaudrate = parseInt(document.getElementById("Baudrate").value);
	var BpNo = document.getElementById("EntendPort").value;
	var nTimeOut = parseInt(document.getElementById("Timeout").value);
	var nCharset = parseInt(document.getElementById("Charset").value);
	var szTr1Data = document.getElementById("sk1").value;
	var szTr2Data = document.getElementById("sk2").value;
	var szTr3Data = document.getElementById("sk3").value;

	
	if(MsgCardOper == null )
	{ 
		window.alert("请先安装ocx控件");
		return ;
	}
	
	var bRet = MsgCardOper.CT_WriteMsgCard( szDevice, nBaudrate, BpNo, nCharset, nTimeOut, nMode, szTr1Data, szTr2Data, szTr3Data );
	if( bRet == 0 )
	{
		window.alert( "写卡成功" ) ;
	}
	else
	{
		window.alert("写卡错误，错误代码：" + bRet ) ;
	}
}