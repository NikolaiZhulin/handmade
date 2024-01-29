import { ReportPostReason } from '@/constants/enums';

export const REPORT_ITEMS = [
  {
    label: 'post.report.sold',
    value: ReportPostReason.SOLD,
  },
  {
    label: 'post.report.wrongPrice',
    value: ReportPostReason.PRICE,
  },
  {
    label: 'post.report.wrongDesc',
    value: ReportPostReason.DESCRIPTION,
  },
  {
    label: 'post.report.wrongAddress',
    value: ReportPostReason.ADDRESS,
  },
  {
    label: 'post.report.breakRules',
    value: ReportPostReason.RULES,
  },
  {
    label: 'post.report.scammer',
    value: ReportPostReason.SCAMM,
  },
];
