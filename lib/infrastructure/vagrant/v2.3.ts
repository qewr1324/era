export function generate(params: any): string {
	return `Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.box_version = "20231201.0.0"
  
  config.vm.hostname = "my-app-dev"
  
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 5432, host: 5432
  config.vm.network "private_network", ip: "192.168.56.10"
  
  config.vm.synced_folder "./app", "/home/vagrant/app"
  
  config.vm.provider "virtualbox" do |vb|
    vb.name = "my-app-dev"
    vb.memory = "4096"
    vb.cpus = 2
  end
  
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y curl git build-essential
    
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    
    apt-get install -y postgresql postgresql-contrib
    
    sudo -u postgres psql -c "CREATE USER vagrant WITH PASSWORD 'password';"
    sudo -u postgres psql -c "CREATE DATABASE mydb OWNER vagrant;"
    
    cd /home/vagrant/app
    sudo -u vagrant npm install
    
    npm install -g pm2
    sudo -u vagrant pm2 start index.js
    sudo -u vagrant pm2 save
    sudo -u vagrant pm2 startup
  SHELL
end`;
}
