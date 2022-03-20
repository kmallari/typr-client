import { createProxyMiddleware } from "http-proxy-middleware"

module.exports = (app: any) => {
  app.use(
    createProxyMiddleware("/", 
    {
      target: "https://5kg8owmfme.execute-api.ap-southeast-1.amazonaws.com/getWords",
      changeOrigin: true
    })
  )
}