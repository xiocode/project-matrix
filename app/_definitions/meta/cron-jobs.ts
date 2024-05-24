import type { CronJobConfiguration as TCronJobConfiguration } from '@ruiapp/rapid-core';
import detectOfflinePrinters from '../models/cron-jobs/detectOfflinePrinters';
import kis_sync_data_job from '../models/cron-jobs/kis_sync_data_job';
import kis_update_tokens_job from '../models/cron-jobs/kis_update_tokens_job';

export default [
  detectOfflinePrinters,
  kis_sync_data_job,
  kis_update_tokens_job,
] as TCronJobConfiguration[];
