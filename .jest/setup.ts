import '@testing-library/jest-dom'

import { setConfig } from 'next/config'
import config from '../next.config.js'

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config)

