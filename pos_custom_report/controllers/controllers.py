# -*- coding: utf-8 -*-
from odoo import http

# class PosCustomReport(http.Controller):
#     @http.route('/pos_custom_report/pos_custom_report/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_custom_report/pos_custom_report/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_custom_report.listing', {
#             'root': '/pos_custom_report/pos_custom_report',
#             'objects': http.request.env['pos_custom_report.pos_custom_report'].search([]),
#         })

#     @http.route('/pos_custom_report/pos_custom_report/objects/<model("pos_custom_report.pos_custom_report"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_custom_report.object', {
#             'object': obj
#         })