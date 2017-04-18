# -*- coding: utf-8 -*-
{
    'name' : 'Filter on GL Report',
    'version' : '1.0',
    'summary': 'Report General Ledger ',
    'description': """
Filter Partner In General Ledger Report 
====================
    """,
    'category': 'Account',
    'author' : 'Spellbound Soft Solution',
    'website': 'https://www.spellboundss.com',
    'depends' : ['base', 'account', 'report',],
    'data': [
             'wizard/account_report_general_ledger_view.xml',
             'views/report_generalledger.xml',
    ],
    'installable': True,
    'auto_install': False,
}
