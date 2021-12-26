# -*- coding: utf-8 -*-
{
    'name': "Label Ordered Products by POS",

    'summary': """
       Label Ordered Products QTY by POS""",

    'description': """
       Label Ordered products qty by pos to identify !!
    """,

    'author': "SOFT GUIDE TECHNOLOGY",
    'website': "http://www.softguidetech.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '12.0',

    # any module necessary for this one to work correctly
    'depends': ['base','point_of_sale'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/assets_path.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'images': ['static/description/banner.jpg'],
    'qweb': [
        'static/src/xml/print_order_button.xml',
             ],
}
