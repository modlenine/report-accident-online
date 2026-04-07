module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/intsys/rao/' : '/',
    
    // Dev server config
    devServer: {
        port: 8082, // Dev port (ใช้ 8082 เพื่อไม่ซ้ำกับ onsiteservice ที่ใช้ 8081)
        proxy: {
            // Proxy backend requests to MAMP (port 8080)
            '/intranet': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            },
            '/intsys': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false
            }
        }
    }
}