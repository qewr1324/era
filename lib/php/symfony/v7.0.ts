export function generate(params: any): string {
	return `services:
    _defaults:
        autowire: true
        autoconfigure: true
        public: false

    App\:
        resource: '../src/'
        exclude:
            - '../src/DependencyInjection/'
            - '../src/Entity/'
            - '../src/Kernel.php'

    App\Controller\:
        resource: '../src/Controller/'
        tags: ['controller.service_arguments']

    App\EventListener\:
        resource: '../src/EventListener/'
        tags:
            - { name: kernel.event_listener, event: kernel.exception }

    App\Repository\:
        resource: '../src/Repository/'
        tags: ['doctrine.repository_service']

parameters:
    app.version: '1.0.0'
    app.support_email: 'support@example.com'`;
}
