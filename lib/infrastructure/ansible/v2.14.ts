export function generate(params: any): string {
	return `---
- name: Deploy Application
  hosts: webservers
  become: yes
  
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        
    - name: Install Node.js
      apt:
        name: nodejs
        state: present
        
    - name: Deploy application
      copy:
        src: ./app
        dest: /opt/my-app
        
    - name: Start application
      command: node /opt/my-app/index.js`;
}
