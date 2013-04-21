Ext.define('testing.view.AddBooks', {
    extend: 'Ext.window.Window',
    alias: 'widget.addbooks',
    height: 250,
    width : 400,
    title: 'Add Books',
    autoShow: true,
    layout : 'fit',
    items : [{
        border : 0,
        xtype: 'form',
        layout: 'form',
        padding : 10,
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
    ],
    buttons : [{
        text: 'Save',
        action: 'save'
    }, {
        text: 'Cancel',
        scope: this,
        handler: this.close
    }]
});


