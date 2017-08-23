# -*- coding: utf-8 -*-
{
    'name' : 'Filter on GL Report',
    'version' : '1.0',
    'summary': 'Report General Ledger ',
    'description': """
Filter Partner and Account ON General Ledger Report 
====================
    """,
    'category': 'Account',
    'author' : 'Spellbound Soft Solutions',
    'website': 'https://www.spellboundss.com',
    'depends' : ['base', 'account', 'report',],
    'data': [
             'wizard/account_report_general_ledger_view.xml',
             'views/report_generalledger.xml',
    ],
    'price': 50,
    'currency': 'EUR',
    'images':  ['static/description/Banner.png'],
    'installable': True,
    
}
