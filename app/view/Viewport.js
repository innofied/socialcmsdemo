Ext.define('testing.view.Viewport' ,{
    extend: 'Ext.container.Viewport',
    requires : ['Ext.layout.container.Card'],
    layout: 'card',
    items:[{
            xtype: 'tabpanel',
            name:'viewpanel',
            activeTab: 1,
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
                       overflowY : 'auto',
                    items : [{
                            xtype: 'form',
                            layout: 'hbox',
                            padding : 10,
                            frame : true,
                            name : 'mail-login',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Username',
                                    name: 'username',
                                    value:'sapphire.indranil@gmail.com',
                                    allowBlank:false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Password',
                                    name: 'password',
                                    value:'georgebubai04011991',
                                    inputType: 'password',
                                    allowBlank:false
                                },{
                                        xtype: 'button', 
                                        text: 'Login',
                                        action: 'login'
                                    }]},{
                            xtype: 'dashboard'
                        }]
                    }]
            }]
    });

