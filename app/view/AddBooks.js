Ext.define('testing.view.AddBooks', {
    extend: 'Ext.window.Window',
    alias: 'widget.AddBooks',
    height: 200,
    width : 300,
    title: 'Add Books',
    autoShow: true,

    initComponent: function() {
        this.items = [
        {
            xtype: 'form',
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
        ];

        this.buttons = [
        {
            text: 'Save',
            action: 'save'
        },
        {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }
        ];

        this.callParent(arguments);
    }
});


