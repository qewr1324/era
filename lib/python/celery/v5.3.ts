export function generate(params: any): string {
	return `from celery import Celery
import os

celery_app = Celery(
    'tasks',
    broker=os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379/0'),
    backend=os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379/1')
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,
    task_soft_time_limit=25 * 60,
    worker_max_tasks_per_child=100,
    worker_prefetch_multiplier=1,
    
    task_routes={
        'app.tasks.email.*': {'queue': 'email'},
        'app.tasks.report.*': {'queue': 'report'},
    },
    
    beat_schedule={
        'cleanup-old-records': {
            'task': 'app.tasks.cleanup.cleanup_old_records',
            'schedule': 3600.0,
        },
        'send-daily-report': {
            'task': 'app.tasks.report.send_daily_report',
            'schedule': 86400.0,
        },
    },
)

celery_app.autodiscover_tasks(['app.tasks'])`;
}
