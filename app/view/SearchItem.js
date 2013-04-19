Ext.define('testing.view.SearchItem' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.SearchItem', 
    title: "Add Books",
    layout: {
        type: 'vbox'
    },
    defaultType: 'textfield',
    padding : 5,
    initComponent: function() {

        this.items= [],
        this.buttons = [{
            text: 'Add',
            action: 'add'
        }
        ];
        this.callParent(arguments);
    }
});

