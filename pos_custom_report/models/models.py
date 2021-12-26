# -*- coding: utf-8 -*-

from odoo import models


class SalesReport(models.TransientModel):
    _name = 'sale.wizard'
    _description = "Sale Wizard Model"

    def print_report(self):
        return self.env.ref('pos_custom_report.pos_ord_session_reprt').report_action(self,
                                                                                 data={'name': 'POS Order Report'})
