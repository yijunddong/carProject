module.exports = {
  apps: [
    {
      name: 'car_backend',
      cwd: '/mnt/pgdata/data/carProject/backend',
      script: './start.sh',
      interpreter: 'bash',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      error_file: '/mnt/pgdata/data/carProject/logs/backend-error.log',
      out_file: '/mnt/pgdata/data/carProject/logs/backend-out.log',
      time: true,
      env: {
        HOST: '0.0.0.0',
        PORT: '3001',
        PATH: '/mnt/pgdata/data/carProject/backend/.venv/bin:/mnt/pgdata/npm-global/bin:/usr/local/bin:/usr/bin:/bin'
      }
    },
    {
      name: 'car_frontend',
      cwd: '/mnt/pgdata/data/carProject/frontend',
      script: './start.sh',
      interpreter: 'bash',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      error_file: '/mnt/pgdata/data/carProject/logs/frontend-error.log',
      out_file: '/mnt/pgdata/data/carProject/logs/frontend-out.log',
      time: true,
      env: {
        HOST: '0.0.0.0',
        PORT: '5200',
        PATH: '/mnt/pgdata/npm-global/bin:/usr/local/bin:/usr/bin:/bin'
      }
    }
  ]
};
