import type { CronJobConfiguration as TCronJobConfiguration } from '@ruiapp/rapid-core';
import detectOfflinePrinters from '../models/cron-jobs/detectOfflinePrinters';
import kis_sync_audit_status from '../models/cron-jobs/kis_sync_audit_status';
import kis_sync_base_data_job from '../models/cron-jobs/kis_sync_base_data_job';
import kis_sync_inventory_data_job from '../models/cron-jobs/kis_sync_inventory_data_job';
import kis_sync_inventory_notify_job from '../models/cron-jobs/kis_sync_inventory_notify_job';
import kis_update_tokens_job from '../models/cron-jobs/kis_update_tokens_job';

export default [
  detectOfflinePrinters,
  kis_sync_audit_status,
  kis_sync_base_data_job,
  kis_sync_inventory_data_job,
  kis_sync_inventory_notify_job,
  kis_update_tokens_job,
] as TCronJobConfiguration[];
