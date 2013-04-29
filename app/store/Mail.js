Ext.define('testing.store.Mail', {
    extend: 'Ext.data.ArrayStore',
     fields: [
       {name: 'from',type: 'String'},
       {name: 'subject',type: 'String'},
       {name: 'date',type: 'String'},
       {name: 'body', type: 'String'}

    ],
    data: [
    ]
        
});
