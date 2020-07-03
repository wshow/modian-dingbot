module.exports = {
  apps: [
    {
      name: 'dingbot',
      script: `${__dirname}/src/index.js`,
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      // exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '192.168.10.254',
      ref: 'origin/master',
      repo: 'git@github.com:shiwangme/modian-dingbot.git',
      path: '/root/modian-dingbot',
      'post-deploy': 'yarn && yarn reload'
    }
  }
};
