
var DataScope = Class.create({

	initialize: function(dataScopeClazzName, dataScopeRootId, dataScopeByReferenceName, specifiedScopeIdArray, receivedPropertyNames, idRootOfDataScope, dataOnlyRestriction){
		
		this.dataScopeClazzName = dataScopeClazzName;
		this.dataScopeRootId = dataScopeRootId;
		this.dataScopeByReferenceName = dataScopeByReferenceName;
		
		this.specifiedScopeIdArray = specifiedScopeIdArray || [];
		
		this.receivedPropertyNames = receivedPropertyNames || ['id', 'name'];
		
		this.idRootOfDataScope = idRootOfDataScope || "data_scope_select_";
		this.rootOfDataScope = $(this.idRootOfDataScope + 'tr');
		
		this.currentHierarchyNumber = 1;
		
		this.currentSelectedValue = -1;
		
		//指定取回的数据是否应该唯一（约束返回的数据只能对应到一个选项——默认）。
		this.dataOnlyRestriction = ( undefined == dataOnlyRestriction )? true: dataOnlyRestriction;
	
		this.isInitialized = false;
	
	}
	
	, extractCurrentHierarchyNumber: function(currentSelectId) {
		
		var selectIdPattern = new RegExp(this.idRootOfDataScope + "(\\d)+");
		
		var extractData = selectIdPattern.exec(currentSelectId);
		if( extractData ) {
			
			return extractData[1];
		}
		return extractData;
	}
	
	, clean: function(currentHierarchyNumber) {

		if( currentHierarchyNumber ) {

			while ( currentHierarchyNumber < this.rootOfDataScope.childNodes.length ) {

				this.rootOfDataScope.removeChild(this.rootOfDataScope.lastChild);
			}
		} else {

			//console.log(321);
			//console.log(this.rootOfDataScope);
			while ( 0 < this.rootOfDataScope.childNodes.length ) {
				
				this.rootOfDataScope.removeChild(this.rootOfDataScope.firstChild);
			}
		}
	}
	
	, getDataScopeClazzName: function() {
		
		return this.dataScopeClazzName;
	}
	
	, getCurrentSelectedValue: function() {
		
		return this.currentSelectedValue;
	}
	
	, setCurrentSelectedValue: function(scopeSelect) {

		var hierarchyNumber = parseInt(this.extractCurrentHierarchyNumber(scopeSelect.id));
		
		if( ( -1 == scopeSelect.value )&&( 1 != hierarchyNumber ) ) {

			this.currentSelectedValue = $(this.idRootOfDataScope + (hierarchyNumber - 1)).value;
		} else {

			this.currentSelectedValue = scopeSelect.value;
		}
	}
	
	, getDataScopeByReferenceName: function() {
		
		return this.dataScopeByReferenceName;
	} 
	
	, build: function() {
		
		this.clean();
		
		this.receiveScopeData();
		
		this.isInitialized = true;
	}
	
	, receiveScopeData: function(currentSelectId, currentSelectValue) {

		if( currentSelectId && currentSelectValue ) {

			var number = this.extractCurrentHierarchyNumber(currentSelectId);
			if( number ) {

				this.currentHierarchyNumber = parseInt(number) + 1;
			}
			
			FetchService.getObjects(this.dataScopeClazzName, null, [['parentId', 'eq', currentSelectValue]], [['id', 'asc']], 0, -1, this.receivedPropertyNames
								, {
									callback: function(data) {

										this.callback4ReceiveScopeData(data);
									}.bind(this)
								});
		} else {

			FetchService.getObject(this.dataScopeClazzName, null, [['id', 'eq', this.dataScopeRootId]], this.receivedPropertyNames
								, {
									callback: function(data) {

										this.callback4ReceiveScopeData(data);
									}.bind(this)
								});
		}
	}
	
	, callback4ReceiveScopeData: function(data) {

		if( '' != data ) {

			if( !dwr.util._isArray(data) ) {
				
				data = [data];
			}
			
			var isLocked = false;
			if( ( 0 < this.specifiedScopeIdArray.length )&&( this.dataOnlyRestriction ) ) {
				
				data.each(function(pair){
					
					if( pair['id'] == this.specifiedScopeIdArray[this.currentHierarchyNumber - 1] ) {

						data = [pair];
						isLocked = true;
						
						throw $break;
					}
				}.bind(this));
			}
			
			var scopeSelect = $(this.cellCreator());
			this.populateScopeOption(scopeSelect, data, isLocked);

			this.currentHierarchyNumber++;

			if( this.currentHierarchyNumber <= this.specifiedScopeIdArray.length + 1 ) {

				this.setCurrentSelectedValue(scopeSelect);
				this.receiveScopeData(scopeSelect.id, scopeSelect.value);
			}
		}
	}
	
	, cellCreator: function() {

		var cell = document.createElement("td");
		cell.setAttribute('id', this.idRootOfDataScope + 'td_' + this.currentHierarchyNumber);
		cell.setAttribute('align', 'center');
		
		var select = document.createElement("select");
		
		var selectId = this.idRootOfDataScope + this.currentHierarchyNumber;
		select.setAttribute('id', selectId);
		
		cell.appendChild(select);
		this.rootOfDataScope.appendChild(cell);
		
		return selectId;
	}

	, populateScopeOption: function(scopeSelect, scopeData, isLocked) {

		var valueOptions = $H();
		valueOptions.set('-1', '请选择');
		
		$A(scopeData).each(function(pair){

			valueOptions.set(pair['id'], pair['name']);
		});
		if( ( scopeData )&&( ( 1 == scopeData.length ) )
			&&( isLocked ) ) {
		
			valueOptions.unset('-1');
		}
		
		dwr.util.removeAllOptions(scopeSelect);
		scopeSelect.setOptions(valueOptions);
		
		if( !isLocked ) {
			
			scopeSelect.setValue(this.specifiedScopeIdArray[this.currentHierarchyNumber - 1]);
		}
		
		scopeSelect.observe("change", function() {

			this.setCurrentSelectedValue(scopeSelect);
			
			var hierarchyNumber = parseInt(this.extractCurrentHierarchyNumber(scopeSelect.id));
			if( (hierarchyNumber + 1) < this.currentHierarchyNumber ) {

				this.clean(hierarchyNumber);
			}
			this.receiveScopeData(scopeSelect.id, scopeSelect.value);
		}.bind(this));
	}
});