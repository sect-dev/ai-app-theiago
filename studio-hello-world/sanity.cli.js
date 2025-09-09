import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '5755vpzu',   // 👈 тот же projectId, что и в sanity.config.ts
    dataset: 'production',   // 👈 твой dataset
  },
})