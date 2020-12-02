function ReadIDCard()
{
	var szDevice ="HID";
	var nBaud =9600;
	var nTimeOut = 5;
	var CardInfo = document.getElementById( "idCardNumber" );
	var BpNo = "";
	var szImgpath = "D:\head.bmp";


	if(IDCardOper == null )
	{
		window.alert("请先安装ocx控件");
		return ;
	}

	var bRet = IDCardOper.CT_ReadIDCard( szDevice, BpNo, nBaud, nTimeOut, szImgpath );
	if(  bRet == 0 )
	{
		if(IDCardOper.iFlag == 0)
		{
			CardInfo.value = IDCardOper.CardId + IDCardOper.Name;
            IDCardPersonForMachine.Name = IDCardOper.Name;
            IDCardPersonForMachine.CardId = IDCardOper.CardId;
            $.messager.alert('通知', "读二代证成功！")
            return  IDCardPersonForMachine;
		}
		else
		{
			CardInfo.value =  IDCardOper.CardId + IDCardOper.Name;
            IDCardPersonForMachine.Name = IDCardOper.Name;
            IDCardPersonForMachine.CardId = IDCardOper.CardId;
            $.messager.alert('通知', "读取外国人永久居留证成功！");
            return  IDCardPersonForMachine;
		}
	}
	else
	{
        $.messager.alert('通知', "读取证件错误，错误代码：" + bRet );
	}
}

function IDCardPersonForMachine(CardId,Name) {
    this.CardId = CardId;
    this.Name = Name;
}

function ReadIDCardForeigner(  )
{
	var szDevice = document.getElementById("Device").value;
	var nBaud = parseInt(document.getElementById("Baud").value);
	var nTimeOut = parseInt(document.getElementById("Timeout").value);
	var CardInfo = document.getElementById( "CardInfo" );
	var BpNo = document.getElementById("ExtPort").value;
	var szImgpath = document.getElementById("ImgPath").value;
	var CardImg = document.getElementById( "CardImg" );

	CardImg.src = "";
	CardInfo.value = "";

	if(IDCardOper == null )
	{
		window.alert("请先安装ocx控件");
		return ;
	}

	var bRet = IDCardOper.CT_ReadIDCardForeigner( szDevice, BpNo, nBaud, nTimeOut, szImgpath );
	if(  bRet == 0 )
	{
		CardInfo.value = "姓名：" + IDCardOper.Name + "\r\n" +
			"英文姓名：" + IDCardOper.EngName + "\r\n" +
			"性别：" + IDCardOper.Sex + "\r\n" +
			"国籍：" + IDCardOper.Nation + "\r\n" +
			"证件版本：" + IDCardOper.Version + "\r\n" +
			"机关代码：" + IDCardOper.govCode + "\r\n" +
			"证件类型：" + IDCardOper.cardType + "\r\n" +
			"出生日期：" + IDCardOper.Birthday + "\r\n" +
			"永久居留证号码：" + IDCardOper.CardId + "\r\n" +
			"起始有效期："+ IDCardOper.ValidStart + "\r\n" +
			"截止有效期："+ IDCardOper.ValidEnd + "\r\n" +
			"预留项：" + IDCardOper.otherData + "\r\n" +
			"图片Base："+ "\r\n" + IDCardOper.PhotoData;


		window.alert("读取外国人永久居留证成功" );

		CardImg.width  = 102;
		CardImg.height = 126;
		CardImg.src = "file:///" + IDCardOper.ImgPath + "?" + Math.random();
	}
	else
	{
		window.alert("读取证件错误，错误代码：" + bRet );
	}
}

function SaveImg()
{
	var ImgType = parseInt(document.getElementById("ImgType").value);
	var CardImg = document.getElementById( "CardImg" );
	var szTmpPath = document.getElementById("ImgPath").value;
	var szLogoMsg = document.getElementById("LogoMsg").value;
	CardImg.src = "";

	if(IDCardOper == null )
	{
		window.alert("请先安装ocx控件");
		return ;
	}

	if(ImgType == 4)
	{
		var bRet = IDCardOper.CT_SaveFrontImgEx( szTmpPath, szLogoMsg );
	}
	else
	{
		var bRet = IDCardOper.CT_SaveImg( ImgType, szTmpPath );
	}

	if(  bRet == 0 )
	{
		window.alert("保存图片成功" );

		switch( ImgType )
		{
			case 0:
				CardImg.width  = 102;
				CardImg.height = 126;
				break;
			case 1:
			case 2:
			case 4:
				CardImg.width  = 329;
				CardImg.height = 210;
				break;
			case 3:
				CardImg.width  = 329;
				CardImg.height = 420;
				break;
		}
		CardImg.src = "file:///" + IDCardOper.ImgPath + "?" + Math.random();
	}
	else
	{
		window.alert("保存图片错误，错误代码：" + bRet );
	}
}


function GetImgBase64()
{
	var ImgType = parseInt(document.getElementById("ImgType").value);
	CardImg.src = "";

	if(IDCardOper == null )
	{
		window.alert("请先安装ocx控件");
		return ;
	}

	var bRet = IDCardOper.CT_GetImgBase64( ImgType );
	if(  bRet != "" )
	{
		window.alert("读取BASE64成功" );

		switch( ImgType )
		{
			case 0:
				CardImg.width  = 102;
				CardImg.height = 126;
				break;
			case 1:
			case 2:
				CardImg.width  = 329;
				CardImg.height = 210;
				break;
			case 3:
				CardImg.width  = 329;
				CardImg.height = 420;
				break;
		}
		CardImg.src = "file:///" + IDCardOper.ImgPath + "?" + Math.random();
		CardInfo.value = "图片Base："+ "\r\n" + IDCardOper.PhotoData;
	}
	else
	{
		window.alert("保存图片错误，错误代码：" + bRet );
	}
}

