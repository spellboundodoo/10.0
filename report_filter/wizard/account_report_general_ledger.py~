# -*- coding: utf-8 -*-

from openerp import fields, models, _
from openerp.exceptions import UserError


class AccountReportGeneralLedger(models.TransientModel):
    _inherit = "account.report.general.ledger"
    _description = "General Ledger Report"

    partner_ids = fields.Many2many(
            'res.partner','account_report_general_ledger_partner_rel', 'account_id', 'partner_id',
            string='Filter on partner')
    account_ids = fields.Many2many(
            'account.account','account_report_general_ledger_accounts_rel', 'ledger_id', 'account_id',
            string='Filter on Accounts')

    def _print_report(self, data):
        data = self.pre_print_report(data)
        data['form'].update(self.read(['initial_balance', 'sortby'])[0])
        if data['form'].get('initial_balance') and not data['form'].get('date_from'):
            raise UserError(_("You must define a Start Date"))
        records = self.env[data['model']].browse(data.get('ids', []))
        return self.env['report'].with_context(landscape=True).get_action(records, 'account.report_generalledger', data=data)
