import 'dotenv/config'
export default {
  APP: parseInt(process.env.APP as string) || 3000,
  SERVER: parseInt(process.env.SERVER as string) || 3001
}