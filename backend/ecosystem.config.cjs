module.exports = {
        apps: [
           {
                name: "backend",
                script: "./index.js",
                cwd: "/home/bac/backend",
                env: {
                        NODE_ENV: "production",
                        PORT: 5004,
                }
          }
        ]
      };