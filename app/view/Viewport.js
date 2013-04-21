Ext.define('testing.view.Viewport' ,{
    extend: 'Ext.container.Viewport',
    requires : ['Ext.layout.container.Border'],
    layout : 'border',
    items: [{
        title: 'Search Content',
        region:'west',
        xtype: 'books',
        margins: 5,
        width: 300,
        name : 'search_result_panel',
        tbar : {
            layout : 'hbox',
            items : [{
                xtype : 'textfield',
                name : 'search',
                flex : 1,
                allowBlank : false,
                value : 'John'
            }, {
                xtype: 'button', 
                text: 'Search',
                action: 'search'
            }]
        }
    },{
        title: 'Detail Content',
        region:'center',
        xtype: 'detailbooks',
        margins: 5
    }]
});
