export function generate(params: any): string {
	return `---
- name: Deploy Application
  hosts: webservers
  become: yes
  vars:
    app_name: my-app
    app_port: 3000
    node_version: 20.x
    
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600
        
    - name: Install required packages
      apt:
        name:
          - git
          - curl
          - build-essential
        state: present
        
    - name: Add NodeSource repository
      shell: |
        curl -fsSL https://deb.nodesource.com/setup_{{ node_version }} | bash -
        
    - name: Install Node.js
      apt:
        name: nodejs
        state: present
        
    - name: Create app directory
      file:
        path: /opt/{{ app_name }}
        state: directory
        owner: ubuntu
        group: ubuntu
        
    - name: Clone repository
      git:
        repo: https://github.com/user/{{ app_name }}.git
        dest: /opt/{{ app_name }}
        version: main
      become_user: ubuntu
      
    - name: Install npm dependencies
      npm:
        path: /opt/{{ app_name }}
        ci: yes
      become_user: ubuntu
      
    - name: Build application
      command: npm run build
      args:
        chdir: /opt/{{ app_name }}
      become_user: ubuntu
      
    - name: Start application with PM2
      npm:
        name: pm2
        global: yes
        
    - name: Start app
      command: pm2 start /opt/{{ app_name }}/dist/index.js --name {{ app_name }}
      become_user: ubuntu
      
    - name: Save PM2 process list
      command: pm2 save
      become_user: ubuntu`;
}
