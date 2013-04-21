Ext.define('testing.view.Books' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.books',
    title: 'Books',
    store: 'Books',
    initComponent: function() {
        this.columns = [
        {
            header: 'Title',  
            dataIndex: 'title',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            flex: 1
        },{
            header: 'Author',  
            dataIndex: 'author',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            },
            flex: 1
        }];

        this.callParent(arguments);
    }
});