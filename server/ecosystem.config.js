// 备注：复制这个文件到 dist/ 目录下，运行 pm2 start <此文件>

module.exports = {
  apps : [{
    name: 'vue_my_music',
    script: 'simple-server',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '8095',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
