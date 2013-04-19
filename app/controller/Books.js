Ext.define('testing.controller.Books', {
    extend: 'Ext.app.Controller',

    views: [
    'Books',
    'AddBooks',
    'SearchItem',
    'DetailBooks',
    'EditBooks'
    ],
    stores: [
    'Books'
    ],
    models: ['Books'],
    refs : [
        {
        ref: 'detailbooks',
        selector: 'DetailBooks'
    },
    {
        ref: 'editform',
        selector: "form[name='editbooks']"
    }
    ],

    init: function() {
        
        this.control({
            'Books': {
                render: this.loadBooks,
                itemclick: this.showDetails
            },
            
            'AddBooks button[action=save]': {
                click: this.addBooks
            },
            'SearchItem button[action=add]': {
                click: this.addView
            },
            'EditBooks button[action=save]': {
                click: this.editBook
            },
            'DetailBooks button[action=edit]' :{
                click : this.editView
            },
             'DetailBooks button[action=delete]' :{
                click : this.deleteBook
            }
            
        });
    },
    
    showDetails : function(grid,rowIndex) {
        this.getDetailbooks().update(rowIndex.data);
       this.currentRecord=rowIndex.data;
    },

    addView : function() {
        var view = Ext.widget('AddBooks');  
    },
    deleteBook : function () {
        var values;
        this.getDetailbooks().update(values);
        var id=this.currentRecord._id;
         Ext.Ajax.request({
                        url: 'http://127.0.0.1:8000/delete',
                        params: {
                            _id : id
                        }
                    });
    },
    editBook : function(button) {
        
        var win    = button.up('window'),
        form   = win.down('form');
        if (form.isValid()) {
            var values = form.getValues();
             this.getDetailbooks().update(values);
            console.log("value",values);
            Ext.Ajax.request({
                url: 'http://127.0.0.1:8000/edit',
                params: {
                    _id : values._id,
                    title: values.title,
                    text : values.text,
                    author : values.author,
                    tags: values.tags
                }
            });
        }
        else {
            console.log("Texfield Blank")
        }
        win.close();
    },
    editView : function(button) {
        var view = Ext.widget('EditBooks');
        this.getEditform().getForm().findField('title').setValue(this.currentRecord.title)
        this.getEditform().getForm().findField('_id').setValue(this.currentRecord._id)
        this.getEditform().getForm().findField('text').setValue(this.currentRecord.text)
        this.getEditform().getForm().findField('author').setValue(this.currentRecord.author)
        this.getEditform().getForm().findField('tags').setValue(this.currentRecord.tags)
    },

    addBooks : function (button) {
        var win    = button.up('window'),
        form   = win.down('form');
        if (form.isValid()) {
            var values = form.getValues();
            console.log(values);
            Ext.Ajax.request({
                url: 'http://127.0.0.1:8000/register',
                params: {
                    title: values.title,
                    text : values.text,
                    author : values.author,
                    tags: values.tags
                }
            });
        }
        else {
            console.log("Texfield Blank")
        }
        win.close();
    },
    loadBooks : function () {
        console.log("books")
        var store = Ext.data.StoreManager.lookup('Books');
        Ext.Ajax.request({
            url: 'http://127.0.0.1:8000/books',
            params : {
                text : "load"
            },
            success : function(response){
                var text = response.responseText;
                console.log(text)
                var usertext=JSON.parse(text);
                for(var i=0; i<usertext.length;i++){
                    console.log("data",usertext[i]);
                    store.add({
                        title: usertext[i].title,
                        text : usertext[i].text,
                        author : usertext[i].author,
                        tags : usertext[i].tags,
                        _id: usertext[i]._id
                    });  
                }
            }
        });
    }
   
});