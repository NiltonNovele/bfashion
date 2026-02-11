module.exports = {
        apps: [
           {
                name: "backend-bfashion",
                script: "./index.js",
                cwd: "/home/bfashion/backend",
                env: {
                        NODE_ENV: "production",
                        PORT: 5009,
                }
          }
        ]
      };