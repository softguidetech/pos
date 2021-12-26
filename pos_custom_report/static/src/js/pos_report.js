odoo.define('a_test_module.pos_report', function (require) {
"use strict";
var screens = require('point_of_sale.screens');
var gui = require('point_of_sale.gui');
var core = require('web.core');
var models = require('point_of_sale.models');
var core = require('web.core');
var rpc = require('web.rpc');
var utils = require('web.utils');
var field_utils = require('web.field_utils');
var BarcodeEvents = require('barcodes.BarcodeEvents').BarcodeEvents;
var QWeb = core.qweb;
var _t = core._t;

var round_pr = utils.round_precision;

screens.ReceiptScreenWidget.include({
    show: function(){
        this._super();
        var self = this;
        this.render_receipt_1();
    },
    finalize_validation: function () {
            var self = this;
            var order = this.pos.get_order();
            if (order.is_paid_with_cash() && this.pos.config.iface_cashdrawer) {

                this.pos.proxy.open_cashbox();
            }
            order.initialize_validation_date();
            order.finalized = true;
            if (order.is_to_invoice()) {
                var invoiced = this.pos.push_and_invoice_order(order);
                this.invoicing = true;

                invoiced.fail(this._handleFailedPushForInvoice.bind(this, order, false));

                invoiced.done(function (orderId) {
                    self.invoicing = false;
                    rpc.query({
                        model: 'pos.order',
                        method: 'get_invoice_number',
                        args: [orderId],
                    })
                    .then(function (number) {
                        var order = self.pos.get_order();
                        order.invoice_number = number;
                        self.gui.show_screen('receipt');
                    });
                });
            } else {
                this.pos.push_order(order);
                this.gui.show_screen('receipt');
            }
        },
    print_web1: function() {
        if ($.browser.safari) {
            document.execCommand('print', false, null);
        } else {
            try {
                window.print();
            } catch(err) {
                if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
                    this.gui.show_popup('error',{
                        'title':_t('Printing is not supported on some android browsers'),
                        'body': _t('Printing is not supported on some android browsers due to no default printing protocol is available. It is possible to print your tickets by making use of an IoT Box.'),
                    });
                } else {
                    throw err;
                }
            }
        }
        this.pos.get_order()._printed = true;
    },

    print_xml1: function() {
        var receipt1 = QWeb.render('XmlReceipt1', this.get_receipt_render_env());
        this.pos.proxy.print_receipt(receipt1);
        this.pos.get_order()._printed = true;
    },

    print1: function() {
        var self = this;
        if (!this.pos.config.iface_print_via_proxy) { // browser (html) printing
            this.lock_screen(true);
            setTimeout(function(){
                self.lock_screen(false);
            }, 1000);
            this.print_web1();
        } else {    // proxy (xml) printing
            this.print_xml();
            this.lock_screen(false);
        }
    },
    renderElement: function() {
        var self = this;
        this._super();
        this.$('.button.custom').click(function(){
            if (!self._locked) {
            var selected_type = this.getAttribute('value');
            var index_value = $('.index_value').val();
           for (let i = 0; i < parseInt(index_value); i++) {
               var name = '.barcode'+i;
               var b_name = '#barcode_value'+i;
               var barcode_value = $(b_name).val()
                $(name).JsBarcode(barcode_value);
            }
            if (selected_type == 'label'){
                $("#label_receipt_container").css("display", "inline-block");
                $("#order_receipt_container").css("display", "none");
            }else{
                $("#label_receipt_container").css("display", "none" );
                $("#order_receipt_container").css("display", "inline-block" );
            }
            }
        });
        this.$('.button.label').click(function(){
                $('.pos-sale-ticket').css('display: none;')
        });
         this.$('.back').click(function(){
            self.gui.back();
        });
    },
    render_receipt_1: function() {
        this.$('.pos-receipt-container.custom').html(QWeb.render('PosTicket1', this.get_receipt_render_env()));
    },
});
});