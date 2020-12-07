define(["dojo/_base/lang",
        "dojo/_base/declare",
		 "dojo/ready",
		 "dijit/tree/dndSource",
		 "dijit/registry",
		 "../checkBoxTree/Tree",
		 "../checkBoxTree/models/ForestStoreModel",
		 "dojo/data/ItemFileWriteStore"
], function (lang, declare, ready, dndSource, registry, Tree, ForestStoreModel, Store) {
	
	return declare(null, {
		
		//tree请求的url
		regionTreeHref:'',
		
		treeId:'regionCheckboxTree',
		
		//数据url
		storeUrl : "",
		
		store : "",
		
		//数据model
		model : "",
		
		//区域树
		tree : "",
		
		rootLabel:"北京市",
		
		query: {level: '2'},
		
		//checkboxAll:是否是checkbox  ,checkboxState:checkbox 初始化状态 ,checkboxStrict:checkbox选中后设置parent选中 或者是设置child选中
		checkboxAll:  true,
		checkboxRoot: true,
		checkboxState: false,
		checkboxStrict: true,
		
		//被选中的regionId数组
		regionIdSelectArray: '',
		
		//需要替换的div的id
		domLocation : 'CheckboxTree',
		
		dialogId: 'checkBoxTreeDialog',
		
		dialogTitle: '区域',
		
		constructor:function(args){
			var args = args || {};
			var contextPath = args.contextPath || '/callcenter96156/';
			
			var showDataName = ( args.showDataName )? args.showDataName: "region";
			this.storeUrl = args.storeUrl || contextPath + 'js/json/tree/' + showDataName + '.json';
			this.regionTreeHref = args.regionTreeHref || contextPath + 'manage/region/tree.shtml';
			
			this.formItemId4IdString = args.formItemId4IdString;
			this.formItemId4NameString = args.formItemId4NameString;
			
			this.callbackLookSelectedFunxtion = args.callbackLookSelectedFunxtion || dojo.hitch(this, this.callbackLookSelectedFunxtion);
			this.domLocation = args.domLocation || this.domLocation;
			this.regionIdSelectArray = args.regionIdSelectArray || '';
			
			this.treeId = args.treeId || this.treeId;
			this.rootLabel = args.rootLabel || this.rootLabel;
			this.query = args.query || this.query;
			this.showRoot = args.showRoot || false;
			this.checkboxAll = args.checkboxAll || this.checkboxAll;
			this.checkboxRoot = args.checkboxRoot || this.checkboxRoot;
			this.checkboxState = args.checkboxState || this.checkboxState;
			this.checkboxStrict = args.checkboxStrict || this.checkboxStrict;
			
			this.dialogId = args.dialogId || this.dialogId;
			this.dialogTitle = args.dialogTitle || this.dialogTitle;

			this.setSelectedFunction = args.setSelectedFunction|| dojo.hitch(this, this.setSelectedFunction);
			
			this.selectedContainMixed = args.selectedContainMixed || false;
		},
		
		callbackLookSelectedFunxtion : function(array){
        	/*alert('callbackFunxtion 回调函数');
        	alert('选中个数：' + array.length);*/
			var ids = '';
			var names = '';

			dojo.forEach(array, function(item){

				ids += ',' + item.id;
				if( 0 < item.name.length ) {

					names += '、' + item.name;
				}
			});

			if( this.formItemId4NameString ) {

				dojo.byId(this.formItemId4NameString).value = ( 0 < names.length )? names.substring(1): names;
			}
			dojo.byId(this.formItemId4IdString).value = ( 0 < ids.length )? ids + ',': ids;
    },
    
    setSelectedFunction: function (items) {

		var selectedItems = new Array();
        if (items) {
        	
			items.each(function(item) {

				selectedItems.push(item);
			});
        }
		return selectedItems;
    }, 
	
	//查看选中了那些
	lookSelected :	function (){
		
		var callback = this.callbackLookSelectedFunxtion;
		function gotData(items, request) {
			var dataIdArray = new Array();
            if (items) {
            	
            	var i;
                for (i = 0; i < items.length; i++) {
                	var item = items[i];
                		dataIdArray.push(item);
                }
            }
            
            callback(dataIdArray);
        }
		
		var checkedExp = 'true';
		if(this.selectedContainMixed){
			checkedExp = new RegExp('true|mixed');
		}
		this.store.fetch({
            query: {
                checked: checkedExp
            },
            onComplete: gotData,
            queryOptions: {
                deep: true
            }
        });
	},
	
	createTree : function() {
		this.store = new Store( {
				url: this.storeUrl,
				urlPreventCache:true
              });
		this.model = new ForestStoreModel( {
				store: this.store,
				query: this.query,
				rootLabel: this.rootLabel,
				checkboxAll:  this.checkboxAll,
				checkboxRoot: this.checkboxRoot,
				checkboxState: this.checkboxState,
				checkboxStrict: this.checkboxStrict
			});
		this.tree = new Tree( {
				model: this.model,
				id: this.treeId,
				showRoot:this.showRoot,
				checkboxStyle: "dijit",
				allowMultiState: true,
				branchIcons: true,
				nodeIcons: true,
				openOnClick:true
			});
		this.tree.placeAt(this.domLocation);
			
		if(this.regionIdSelectArray != ''){
			for(var i=0;i<this.regionIdSelectArray.length;i++){
				this._setSelected(this.regionIdSelectArray[i]);
			}
		}
	},
	
	showRegionDialog : function(){
		var checkBoxTreeDialog = dijit.byId(this.dialogId);
		if(checkBoxTreeDialog){
			
		}else{
			checkBoxTreeDialog = new dijit.Dialog({id:this.dialogId,title:'区域'});
		}
		checkBoxTreeDialog.setHref(this.regionTreeHref);
		checkBoxTreeDialog.show();
	},
	
	showDialog : function(){
		var checkBoxTreeDialog = dijit.byId(this.dialogId);
		if(checkBoxTreeDialog){
			
		}else{
			checkBoxTreeDialog = new dijit.Dialog({id:this.dialogId,title: this.dialogTitle});
		}
		checkBoxTreeDialog.setHref(this.regionTreeHref);
		checkBoxTreeDialog.show();
	},
	
	
	hideRegionDialog : function(){
		dijit.byId(this.dialogId).hide();
	},
	
	hideDialog : function(){
		dijit.byId(this.dialogId).hide();
	},
	
	//设置选中
	_setSelected :function (id){
		var model1 = this.model;
		var setSelectedFunction = this.setSelectedFunction;
		function gotData(items, request) {

			var selectedItems = setSelectedFunction(items);
			selectedItems.each(function(item) {
				
            	model1.setChecked(item, true);
			});
        }
        
		this.store.fetch({
            query: {
                id: id
            },
            onComplete: gotData,
            queryOptions: {
                deep: true
            }
        });
	}
	
	, getItemById: function(id){
	
		var item;
		function gotData(items, request) {
            if (items) {
            	var i;
                for (i = 0; i < items.length; i++) {
                	item = items[i];
                }
            }
        }
        
		this.store.fetch({
            query: {
                id: id
            },
            onComplete: gotData,
            queryOptions: {
                deep: false
            }
        });
        
        return item;
	},
	

	showTreeAtContainer : function(){
		this.createTree();
	}
	});
});
