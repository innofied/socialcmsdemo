Ext.define('testing.view.ViewMail', {
    extend: 'Ext.window.Window',
    alias: 'widget.viewmail',
    height: 250,
    width : 400,
    title: 'View Mail',
    autoShow: true,
    layout : 'fit',
    items : [{
        border : 0,
        xtype: 'form',
        layout: 'form',
        padding : 10,
        items: [
        {
            xtype: 'textareafield',
            name      : 'body',
            fieldLabel: 'Body',
            grow      : true,
            anchor    : '100%',
            allowBlank:false
        }
        ]
    }
    ]
   
});


