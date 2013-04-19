/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'testing',

    views: [
    'Books',
    'AddBooks',
    'SearchItem',
    'DetailBooks',
    'EditBooks'
    ],

    controllers: [
    'Books'
    ],
  
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout : 'border',
            items: [{
                title: 'Search',
                region: 'north',     // position for region
                xtype: 'SearchItem',
                height: 100,
                margins: '0 5'
            },{
                title: 'Search Content',
                region:'west',
                xtype: 'Books',
                margins: '0 5',
                width: 200
            },{
                title: 'Detail Content',
                region:'center',
                xtype: 'DetailBooks',
                margins: '0 5',
                width: 700
            }]
        });
    }
});
