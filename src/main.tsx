import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './demo/index.css'
import ImageFilterDemo from './demo/ImageFilterDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageFilterDemo />
  </StrictMode>,
)
