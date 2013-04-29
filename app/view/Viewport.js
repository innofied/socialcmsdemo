Ext.define('testing.view.Viewport' ,{
    extend: 'Ext.container.Viewport',
  requires : ['Ext.layout.container.Card'],
  layout: 'card',
   items:[{
    xtype: 'tabpanel',
    //width:400,
    //height:400,
    activeTab: 1, // index or id
    items:[{
        title: 'Search',
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
    },{
        title: 'Email',
        xtype: 'dashboard'
    }]
   }]
});

