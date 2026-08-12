import { createRoot } from 'react-dom/client'
import './demo/index.css'
import './index.css'
import LandingPage from './landing/LandingPage'

// 不用 StrictMode: LiquidEther(WebGL) 在开发模式双挂载下 forceContextLoss
// 会导致流体渲染失败(经典 WebGL 组件坑)
createRoot(document.getElementById('root')!).render(
  <LandingPage />,
)
