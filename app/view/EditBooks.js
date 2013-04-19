Ext.define('testing.view.EditBooks', {
    extend: 'Ext.window.Window',
    alias: 'widget.EditBooks',
    height: 200,
    width : 300,
    title: 'Edit Books',
    autoShow: true,

    initComponent: function() {
        this.items = [
        {
            xtype: 'form',
            name : 'editbooks',
            items: [
                {
                xtype: 'textfield',
                fieldLabel: 'Id',
                name: '_id',
                readOnly:true
            },
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



