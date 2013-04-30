/**
 * @class Cynergic.view.ux.PortalPanel
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class used for providing drag-drop-enabled portal layouts.
 */
Ext.define('testing.view.Dashboard', {
    extend: 'testing.view.ux.PortalPanel',
    alias: 'widget.dashboard',
				
    requires: [
    'testing.view.ux.PortalPanel', 
    'testing.view.ux.PortalColumn'
    ],
				
    cls : 'x-portal dashboard',
    border : 0,
				
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, header, tool){
                var portlet = header.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },
				
    initComponent : function(){
        this.items = [{
            id: 'col-1',
            items: [{
                id: 'portlet-1',
                title: 'Mail List',
                tools: this.getTools(),
                items :[{
                    xtype : 'grid',
                    name :'maillist',
                    border : 0,
                    store: Ext.getStore('Mail'),
                    forcefit : true,
                    columns: [ {
                        text     : 'From',
                        width     : 200,
                        sortable : false,
                        dataIndex: 'from'
                    },{
                        text     : 'Subject',
                        flex     : 1,
                        sortable : false,
                        dataIndex: 'subject'
                    },{
                        text     : 'Date',
                        width     : 100,
                        sortable : false,
                        dataIndex: 'date'
                    }]
                }],
                
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            }]
        },{
            id: 'col-2',
            items: [{
                id: 'portlet-2',
                title: 'Show Mail',
                tools: this.getTools(),
                items :[{
                    xtype : 'viewmail',
                    name:'viewmailportlet'
                }],
                
                listeners: {
                    'close': Ext.bind(this.onPortletClose, this)
                }
            }]
        }];

        this.callParent(arguments);
    },

    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
        msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});
