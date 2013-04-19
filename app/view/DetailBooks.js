Ext.define('testing.view.DetailBooks' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.DetailBooks',
    title: 'Books',

    initComponent: function() {
        this.tpl = new Ext.XTemplate(
            '<div>',
            'Id : {_id}, Title : {title}, Text : {text}, Author : {author}, Tags : {tags}',
            '</div>'
            )
        this.items = [
        
        ];
        this.buttons = [{
            text: 'Edit',
            action: 'edit'
        },
        {
            text: 'Delete',
            action: 'delete'
        }
        ];

        this.callParent(arguments);
    }
});