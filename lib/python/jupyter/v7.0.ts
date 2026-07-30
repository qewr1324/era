export function generate(params: any): string {
	return `c.ServerApp.ip = '0.0.0.0'
c.ServerApp.port = 8888
c.ServerApp.open_browser = False
c.ServerApp.token = ''

c.ServerApp.notebook_dir = '/home/jupyter/notebooks'

c.ServerApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors 'self'"
    }
}

c.ServerApp.allow_origin = '*'
c.ServerApp.allow_credentials = True

c.ServerApp.root_dir = '/home/jupyter'`;
}
