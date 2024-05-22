import type { CronJobConfiguration as TCronJobConfiguration } from '@ruiapp/rapid-core';
import kis_sync_data_job from '../models/cron-jobs/kis_sync_data_job';
import kis_update_tokens_job from '../models/cron-jobs/kis_update_tokens_job';

export default [
  kis_sync_data_job,
  kis_update_tokens_job,
] as TCronJobConfiguration[];
