import { createRoot } from 'react-dom/client'
import './demo/index.css'
import './index.css'
import LandingPage from './landing/LandingPage'

// 不用 StrictMode: 这是移除 LiquidEther 之前为 WebGL 双挂载留下的既有决定。
// 恢复 StrictMode 需要单独验证 demo 的双挂载行为，不在本次改版范围。
createRoot(document.getElementById('root')!).render(
  <LandingPage />,
)
