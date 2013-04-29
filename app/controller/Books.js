Ext.define('testing.controller.Books', {
    extend: 'Ext.app.Controller',
    
    requires : ['Ext.window.MessageBox'],

    views: [
    'Books',
    'AddBooks',
    'Viewport',
    'DetailBooks',
    'EditBooks',
    'Dashboard',
    'ViewMail'
    ],
    
    stores: [
    'Books',
    'Mail'
    ],
    
    models: ['Books'],
    
    refs : [
    {
        ref: 'detailBooks',
        selector: 'detailbooks'
    },
     {
        ref: 'viewMail',
        selector: 'viewmail'
    },
    {
        ref: 'editForm',
        selector: "form[name='editbooks']"
    },
    {
        ref: 'searchItem',
        selector: "textfield[name='search']"
    },
    
    {
        ref : 'searchResultPanel',
        selector : 'container[name="search_result_panel"]'
    }
    ],

    init: function() {        
        this.control({
            'books': {
                itemclick: this.showDetails
            },
            
            'addbooks button[action=save]': {
                click: this.addBooks
            },
            'button[action=add]': {
                click: function() {
                    Ext.widget('addbooks');  
                }
            },
            'dashboard' :{
                render: this.loadEmail,
                itemclick: this.showEmail
            },
            'button[action=search]': {
                click: this.searchBooks
            },
            'editbooks button[action=save]': {
                click: this.editBook
            },
            'detailbooks button[action=edit]' :{
                click : this.loadEditData
            },
            'detailbooks button[action=delete]' :{
                click : this.deleteBook
            }
            
        });
    },
    
    getApi : (function(){
        //var baseUrl = 'http://innofied.nodejitsu.com/';
        var baseUrl = 'http://localhost:8000/';
        return {
            deleteBook : baseUrl + 'delete',
            register : baseUrl + 'register',
            search : baseUrl + 'search',
            edit : baseUrl + 'edit',
            reademail : baseUrl + 'reademail'
        }
    }()),
    
    showDetails : function(grid, record, item, index) {
        record.index = index;
        this.getDetailBooks().update(record.getData());
        this.currentRecord = record;
    },
     showEmail : function(grid, record, item, index) {
         Ext.widget('viewmail'); 
         console.log(record)
        this.getViewMail().loadRecord();
        
    },
    loadEmail : function () {
        console.log("load");
        var me = this,
        mailStore = Ext.getStore('Mail');
        Ext.Ajax.request({
            url: me.getApi.reademail,
            method : 'GET',
            
            success : function(response){
                var json = JSON.parse(response.responseText);
                for(var i=0; i<json.length;i++){
                   var data = {};
                   var subopen=json[i].header.indexOf(']');
                   data.from=json[i].header.substr(1,subopen);
                   var subclose=json[i].header.indexOf(']',2);
                   data.subject=json[i].header.substr(subopen+2,subclose);
                   data.date=json[i].date;
                   mailStore.add(data);
                }
            },
            
            failure : function(err){
                console.log(err);
            }
        });

    },

    deleteBook : function () {
        var me = this,
        bookStore = Ext.getStore('Books'),
        toBeDeletedRecord = Ext.clone(me.currentRecord),
        recordIndex = me.currentRecord.index;
        
        me.getDetailBooks().update('');
        bookStore.remove(me.currentRecord);
        
        Ext.Ajax.request({
            url: me.getApi.deleteBook,
            params: {
                _id : me.currentRecord.get('_id')
            },
            
            success : function(response){
                var json = Ext.decode(response.responseText);
                
                if(json && !json.success){
                    bookStore.insert(recordIndex, toBeDeletedRecord);
                }
            },
            
            failure : function(){
                Ext.Msg.alert('Unable to connect to server. Please try again.');
            }
        });
        
    },
    
    editBook : function(button) {
        var me = this,
        win    = button.up('window'),
        form   = win.down('form');
        
        if (form.isValid()) {
            var values = form.getValues();
            
            me.currentRecord.set(values);
            Ext.Ajax.request({
                url: me.getApi.edit,
                params: me.currentRecord.getData(),
                success : function(response){
                    var json = JSON.parse(response.responseText);
                    win.close();
                    
                    if(json.success){
                        me.getDetailBooks().update(values);
                    }else{
                        me.showMsg(json.message || 'Unable to update book. Please try again');
                    }
                },
            
                failure : function(){
                    me.showMsg('Unable to connect to server. Please try again.');
                }
            });
        }
        else {
            me.showMsg('Please fill all the necessary fields.');
        }
        
    },
    
    loadEditData : function() {
        Ext.widget('editbooks');        
        this.getEditForm().loadRecord(this.currentRecord);
    },

    addBooks : function (button) {
        var me = this,
        win    = button.up('window'),
        form   = win.down('form');
        
        if (form.isValid()) {
            Ext.Ajax.request({
                url: me.getApi.register,
                params: form.getValues(),
                
                success : function(response){
                    var json = JSON.parse(response.responseText);
                    
                    if(json.success){
                        me.showMsg( 'Book added successfully', 'Done');
                    }else{
                        me.showMsg(json.message || 'Unable to add book. Please try again');
                    }
                },
            
                failure : function(){
                    me.showMsg('Unable to connect to server. Please try again.');
                }
            });
            
            win.close();
            
        } else {
            me.showMsg('Please provide all the data');
        }
        
    },
    
    searchBooks : function (){
        var me = this,
        query = me.getSearchItem().getValue(),
        bookStore = Ext.getStore('Books');
        console.log(query);
        if(query.length > 0){
            bookStore.removeAll();
            var mask = new Ext.LoadMask({
                target  :me.getSearchResultPanel(),
                msg:"Searching '" + query + "' ..."
            });
            mask.show();
        
            Ext.Ajax.request({
                url: me.getApi.search,
                method : 'GET',
                params : {
                    search : query
                },
                
                success : function(response){
                    mask.hide();
                    var json = JSON.parse(response.responseText);
                    bookStore.add(json);
                },
            
                failure : function(){
                    mask.hide();
                    me.showMsg('Unable to connect to server. Please try again.');
                }
            });
        }
    },
    
    showMsg : function(msg, title){
        if(msg){
            Ext.MessageBox.alert(title || 'Error', msg);
        }
    }
   
});