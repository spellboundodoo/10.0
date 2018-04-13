# -*- coding: utf-8 -*-
{
    'name' : 'General Ledger Report filter',
    'version' : '1.0',
    'summary': 'General Ledger Report Partner and Account Filter',
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
    'license': "AGPL-3",
    'price': 50,
    'currency': 'EUR',
    'images':  ['static/description/Banner.png'],
    'installable': True,
    
}
