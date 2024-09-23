import type { CronJobConfiguration as TCronJobConfiguration } from '@ruiapp/rapid-core';
import detectOfflinePrinters from '../models/cron-jobs/detectOfflinePrinters';

export default [
  detectOfflinePrinters,
] as TCronJobConfiguration[];
