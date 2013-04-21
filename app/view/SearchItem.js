Ext.define('testing.view.SearchItem' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.SearchItem', 
    title: "Search Books",
    layout: {
        type: 'vbox'
    },
    defaultType: 'textfield',
    padding : 5,
    initComponent: function() {

        this.items= [ {
            xtype: 'form',
            name : 'searchbooks',
            items: [
            {
                xtype: 'textfield',
                name: 'search'
            }]
        }],
        this.buttons = [{
            text: 'Search',
            action: 'search'
        },{
            text: 'Add',
            action: 'add'
        }
        ];
        this.callParent(arguments);
    }
});

