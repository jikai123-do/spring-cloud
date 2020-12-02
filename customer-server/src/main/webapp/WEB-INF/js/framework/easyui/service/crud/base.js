(function($) {


	$.BaseService = function(queryFormId, datagridId, dialogId, editFormId, args) {
		var that = this;
		this.args = args || {};
		this.queryFormId = queryFormId;
		this.queryForm = $(queryFormId);

		this.datagridId = datagridId;
		this.datagrid = $(datagridId);

		this.dialogId = dialogId;
		this.dialog = $(dialogId);

		this.editFormId = editFormId;

		this.datagridFirst = true;

		this.volunteerSign = this.args.volunteerSign;//自愿缴存，转出，封存，区之间的标志

		this.isfitColumns = this.args.isfitColumns;

		//是否只允许选择一条
        this.isSingleSelect = this.args.isSingleSelect;

		//指定模块的根目录
		this.actionRootUrl = this.args.actionRootUrl;

		//请求URL参数
		this.formUrl = this.args.formUrl || 'form.shtml';
		this.deleteUrl = this.args.deleteUrl || 'delete.shtml';
		this.listUrl = this.args.listUrl || 'list.shtml';
		this.detailUrl = this.args.detailUrl || 'detail.shtml';
		this.saveOrUpdateUrl = this.args.saveOrUpdateUrl || 'save_or_update.shtml';

		this.entityTitle = this.args.entityTitle || '数据';
		var datagridLoad=this.args.datagridLoad;

        if( undefined == this.args.optLenght ) {

            this.optLenght = 0;
        } else {

            this.optLenght = this.args.optLenght;
        }


		if( undefined == this.args.datagridDefaultQuery ) {

			this.datagridDefaultQuery = false;
		} else {

			this.datagridDefaultQuery = this.args.datagridDefaultQuery;
		}

		//添加按钮的id——所属于datagrid的toolbar。
		this.datagridAddButtonId = this.args.datagridAddButtonId || 'datagrid_add_button';
		//批删按钮的id——所属于datagrid的toolbar。
		this.datagridBatchDeleteButtonId = this.args.datagridBatchDeleteButtonId || 'datagrid_batch_delete_button';

		if( undefined == this.args.datagridHasFrozenColumns ) {

			this.datagridHasFrozenColumns = true;
		} else {

			this.datagridHasFrozenColumns = this.args.datagridHasFrozenColumns;
		}
		this.datagridCheckAll = this.args.datagridCheckAll|| function(rows) {};
		this.datagridCheck = this.args.datagridCheck|| function(rowIndex,rowData) {};
		this.datagridToolbar = this.args.datagridToolbar
			|| [{
				id: this.datagridAddButtonId
				, text: '新增'
				//, iconCls: 'icon-add'
				, handler: function(event) {

					that.dialogBuilder();
					//为了保证点击列表内操作中的(修改)按钮时,不会打开新增的dialog,所以这里需要做一个事件
					if( event instanceof MouseEvent ) {

						that.dialog.dialog('open').dialog('refresh', that.actionRootUrl + that.formUrl);
					}
				}
			}
				, '-'
				, {
					id: this.datagridBatchDeleteButtonId
					, text: '批量删除'
					, disabled: false
					//, iconCls: 'icon-remove'
					, handler: function() {

						var checkedData = {};
						var items = that.datagrid.datagrid('getChecked');
						for(var i = 0; i < items.length; i++) {

							checkedData["ids[" + i + "]"] = items[i].id;
						}

						var dataCount = Object.keys(checkedData).length;
						var prefix = ( 1 < dataCount )? "批量": "";
						if( dataCount ) {

							if( confirm("确定要删除吗？？？") ) {

								$.ajax({
									url: that.actionRootUrl + that.deleteUrl
									, type : "post"
									, dataType : 'json'
									, data : checkedData
									, success : function(data, response, status) {

										if( jQuery.parseJSON('' + data) ) {

											$.messager.alert('通知', prefix + "删除成功。");
											that.datagrid.datagrid('clearChecked');
											that.datagrid.datagrid('reload');
										} else {

											$.messager.alert('通知', prefix + "删除失败。");
										}
									}
								});
							} else {

								that.datagrid.datagrid('clearChecked');
							}
						} else {

							$.messager.alert('通知', "请选中数据后再执行删除。");
						}
					}
				}];

		//指定“操作”列的内容
		this.optionFormatter = this.args.optionFormatter
			|| function(value, rec) {

				return '<a href="#" title="修改" onClick="$(\'#' + that.datagridAddButtonId + '\').click();$(\'' + dialogId + '\').dialog(\'open\').dialog(\'refresh\', \'' + that.actionRootUrl + that.formUrl + '?entity.id=' + rec.id + '\');" iconCls="icon-edit" class="easyui-linkbutton" data-options="plain: true">修改</a>'
					+ '&nbsp;&nbsp;'
					+ '<a href="#" title="删除" onClick="$(\'' + datagridId + '\').datagrid(\'checkRow\', $(\'' + datagridId + '\').datagrid(\'getRowIndex\', ' + rec.id + '));$(\'#' + that.datagridBatchDeleteButtonId + '\').click();" iconCls="icon-remove" class="easyui-linkbutton" data-options="plain: true">删除</a>';
			};

		this.optionDisplayToken;
		if( undefined == this.args.optionDisplayToken ) {

			this.optionDisplayToken = true;
		} else {

			this.optionDisplayToken = this.args.optionDisplayToken;
		}
		var optionContent = this.optionFormatter("", {id: ""});
		if( ( this.optionDisplayToken )&&( '' == optionContent ) ) {

			this.optionDisplayToken = false;
		}

		//列表数据列的布局
		this.datagridColumns = this.args.datagridColumns || [];

		//列表多Title
		var titles = new Array();
		if( undefined == this.args.datagridTitles ) {
			titles [0] = {title: this.entityTitle + '信息', colspan: this.datagridColumns.length};
		} else {
			titles = this.args.datagridTitles || [];
		}
		this.dialogWidth = this.args.dialogWidth || 600;
//根据显示器分辨率判断dialog的高度
        var globalDialogHeigh = this.args.dialogHeight || 450;
        var dispalyStandardHeigh = 1080;
        var dispalyHeigh = window.screen.height;
        this.dialogHeight = globalDialogHeigh/dispalyStandardHeigh*dispalyHeigh;
//end

        this.dialogSaveOnSubmit = this.args.dialogSaveOnSubmit || function(isValid) {return isValid;};

		this.dialogButtons = this.args.dialogButtons
			|| [
				{
					text:'保存'
					//, iconCls: 'icon-save'
					, handler: function() {
					var innerThat = this;
					$.messager.progress();

					$(that.editFormId).form('submit', {
						url: that.actionRootUrl + that.saveOrUpdateUrl
						, onSubmit: function() {

							var isValid = $(this).form('validate');
							if ( !isValid ){

								$.messager.progress('close');
							}

							return that.dialogSaveOnSubmit(isValid);
						}
						, success: function(data) {

							$.messager.progress('close');

							$($(innerThat).context.parentElement.parentElement).dialog('close');

							that.datagrid.datagrid('reload');
						}
					});
				}
				}
				, {
					text:'取消',
					iconCls:'icon-cancel',
					handler: function() {$($(this).context.parentElement.parentElement).dialog('close');}
				}
			];

		this.datagrid.datagrid({

			title: this.entityTitle + '列表'
			//, iconCls:'icon-save'
			, width: this.args.datagridWidth||'100%'
			, height: this.args.datagridHeight||520
			, nowrap: true
			, autoRowHeight: false
			, striped: true
			, collapsible:true
			//, url: this.actionRootUrl + this.listUrl
			, method: 'post'
			, sortName: 'id'
			, sortOrder: 'desc'
			, remoteSort: false
			, idField:'id'
			, fitColumns: this.isfitColumns || false
			, singleSelect:this.isSingleSelect || false
			, resizeHandle: 'right'
			, checkOnSelect: this.args.checkOnSelect || false
			, selectOnCheck:this.args.selectOnCheck || false
			, pagePosition: 'both'
			, remoteSort: true
			, frozenColumns: this.datagridHasFrozenColumns? [
				[
					{field: 'id', checkbox: true}
					, {title: 'id', field: 'id', width: 80, align: 'center', sortable: true, hidden: true}
				]
			]: []
			, columns: [
				( this.optionDisplayToken )
					? [
                     {field: 'opt'
                        , title: '操作'
                        , width: this.optLenght
                        , align: 'center'
                        , rowspan: 2
                        , formatter: this.optionFormatter},
					 {title: this.entityTitle + '信息', colspan: this.datagridColumns.length}
				]
					: titles
				, this.datagridColumns
			]
			, pagination: true
			, queryParams: {

				'volunteerSign':this.volunteerSign
			}
			, rownumbers: true
			, toolbar: this.datagridToolbar
			, onCheckAll: this.datagridCheckAll
			, onCheck: this.datagridCheck
			, onBeforeLoad: function(param) {

                var itemArray = $(that.queryFormId).serializeArray();
                for(var i = 0, num = itemArray.length; i < num; i++) {

                    param[itemArray[i].name] = jQuery.trim(itemArray[i].value);
                }

                if( that.datagridDefaultQuery ) {
                	debugger;
                    var opts = that.datagrid.datagrid("options");
                    opts.url = that.actionRootUrl + that.listUrl;
                } else {

                    if( that.datagridFirst ) {

                        that.datagridFirst = false;
                    } else {

                        var opts = that.datagrid.datagrid("options");
                        opts.url = that.actionRootUrl + that.listUrl;
                    }
                }
            }
			, onLoadSuccess: function(data) {

				$('a.easyui-linkbutton').linkbutton({});
			}
		});

		//在datagrid刷新之前做一些事情。
		$(this.datagrid.datagrid('getPager')).pagination({
		 onBeforeRefresh:function(){
		 	if(datagridLoad){
                if(!BeforeRefresh()){
                    jqXHR.abort();
				};
			}

		 }
		 });
		this.dialogBuilder = function() {
			this.dialog.dialog({

				title : this.entityTitle
				//, href: this.actionRootUrl + this.formUrl
				, width : this.dialogWidth
				, height : this.dialogHeight
                , closed : true
                , cache : false
                , resizable : true
                , collapsible : true
                , maximizable : true
                , buttons : this.dialogButtons
                , modal : true
                , onClose : function() {
				    try{
                        this.dialog.dialog('destroy');
                    } catch (e){
                    }
                    //$('<div id="'+dialogId+'" />').appendTo($("body"));
                    //that.dialogBuilder();
                }
			});
		}
		//this.dialogBuilder();


		this.queryForm.form({

			onSubmit: function(){

				var parameter = {};
				/*
				 * for(var i = 0; i < this.length; i++) {
				 *
				 * if( this[i].id && this[i].value ) {
				 *
				 * parameter[this[i].id] = jQuery.trim(this[i].value); } }
				 */
				var itemArray = $(this).serializeArray();
				for(var i = 0, num = itemArray.length; i < num; i++) {

					parameter[itemArray[i].name] = jQuery.trim(itemArray[i].value);
				}

				var opts = that.datagrid.datagrid("options");
				opts.url = that.actionRootUrl + that.listUrl;

				that.datagrid.datagrid('load', parameter);

				return false;
			}
			/*, success:function(data) {

			 alert(data);
			 }*/
		});
	}
})(jQuery);

//根据显示器高度计算dialog的高度
function calculateDialogHeight(dialogHeight){
    var dispalyStandardHeigh = 1080;
    var dispalyHeigh = window.screen.height;
    return dialogHeight/dispalyStandardHeigh*dispalyHeigh;
}
//重置按钮的方法--自愿缴存

function volunteerRest (queryFormId) {
    $(queryFormId).find("table input:not(:hidden)").attr("value", "");
    //debugger;
    $(queryFormId).find("table select").combobox("setValue","");
    // $(queryFormId).find("table select").combobox({
    //     value : ''
    // });
}

