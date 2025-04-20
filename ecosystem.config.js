module.exports = {
  apps: [
    {
      name: 'cbt-frontend',
      script: '/home/ubuntu/.nvm/versions/node/v22.14.0/bin/pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 5173
      },
      instances: 2,
      exec_mode: 'cluster_mode',
      max_memory_restart: '800M'
    }
  ]
}
