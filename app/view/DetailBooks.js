Ext.define('testing.view.DetailBooks' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.detailbooks',
    title: 'Books',
    tpl : document.getElementById('tpl_book_details').innerHTML,
    buttons : [{
        text: 'Edit',
        action: 'edit'
    }, {
        text: 'Delete',
        action: 'delete'
    }],
    tools: [{ 
        xtype:'button',
        text: 'Add new book',
        action: 'add'
    }]
});
