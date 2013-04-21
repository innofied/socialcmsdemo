Ext.define('testing.view.EditBooks', {
    extend: 'Ext.window.Window',
    alias: 'widget.editbooks',
    height: 250,
    width : 400,
    title: 'Edit Books',
    autoShow: true,
    
    buttons : [{
        text: 'Save',
        action: 'save'
    }, {
        text: 'Cancel',
        scope: this,
        handler: this.close
    }],

    items : [{
        border : 0,
        xtype: 'form',
        layout: 'form',
        padding : 10,
        name : 'editbooks',
        items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Title',
            name: 'title',
            allowBlank:false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Text',
            name: 'text',
            allowBlank:false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Author',
            name: 'author',
            allowBlank:false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tags',
            name: 'tags',
            allowBlank:false
        }
        ]
    }
    ]
});



