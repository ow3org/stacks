import type { AppConfig, CacheConfig, CdnConfig, ChatConfig, CliConfig, DatabaseConfig, DependenciesConfig, DnsConfig, EmailConfig, Events, GitConfig, HashingConfig, JobConfig, LibraryConfig, Model, NotificationConfig, PaymentConfig, QueueConfig, SearchEngineConfig, SecurityConfig, ServicesConfig, SmsConfig, StacksConfig, StorageConfig, UiConfig } from '@stacksjs/types'
import { createLocalTunnel } from '@stacksjs/tunnel'
import { config } from './'

export type LocalUrlType = 'frontend' | 'backend' | 'api' | 'admin' | 'library' | 'email' | 'docs' | 'inspect' | 'desktop'

export async function localUrl({
  domain = config.app.url || 'stacks',
  type = 'frontend' as LocalUrlType,
  localhost = false,
  https = undefined as boolean | undefined,
  network = undefined as boolean | undefined
} = {}) {
    // Ensure url starts with http:// or https://
  // if (!url.startsWith('http://') && !url.startsWith('https://'))
  //   url = 'https://' + url
  let url

  switch (type) {
    case 'frontend':
      if (network)
        return await createLocalTunnel(config.app.ports?.frontend || 3336)

      if (localhost)
        return `http://localhost:${config.app.ports?.frontend}`

      url = domain.replace(/\.[^\.]+$/, '.localhost')

      if (https)
        return `https://${url}`

      return url
    case 'backend':
      if (localhost)
        return `http://localhost:${config.app.ports?.backend}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/api/')

      if (https)
        return `https://${url}`

      return url
    case 'api':
      if (localhost)
        return `http://localhost:${config.app.ports?.backend}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/api/')

      if (https)
        return `https://${url}`

      return url
    case 'admin':
      if (localhost)
        return `http://localhost:${config.app.ports?.admin}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/admin/')

      if (https)
        return `https://${url}`

      return url
    case 'library':
      if (localhost)
        return `http://localhost:${config.app.ports?.library}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/libs/')

      if (https)
        return `https://${url}`

      return url
    case 'email':
      if (localhost)
        return `http://localhost:${config.app.ports?.email}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/email/')

      if (https)
        return `https://${url}`

      return url
    case 'docs':
      if (localhost)
        return `http://localhost:${config.app.ports?.docs}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/docs/')

      if (https)
        return `https://${url}`

      return url
    case 'inspect':
      if (localhost)
        return `http://localhost:${config.app.ports?.inspect}`

      url = domain.replace(/\.[^\.]+$/, '.localhost/__inspect/')

      if (https)
        return `https://${url}`

      return url
    default:
      if (localhost)
        return `http://localhost:${config.app.ports?.frontend}`

      url = domain.replace(/\.[^\.]+$/, '.localhost')

      if (https)
        return `https://${url}`

        return url
  }
}

export function defineStacksConfig(config: StacksConfig) {
  return config
}

export function defineApp(config: AppConfig) {
  return config
}

export function defineCache(config: CacheConfig) {
  return config
}

export function defineCdn(config: CdnConfig) {
  return config
}

export function defineChat(config: ChatConfig) {
  return config
}

export function defineCli(config: CliConfig) {
  return config
}

export function defineJob(config: JobConfig) {
  return config
}

export function defineCronJob(config: JobConfig) {
  return config
}

export function defineDatabase(config: DatabaseConfig) {
  return config
}

export function defineDependencies(config: DependenciesConfig) {
  return config
}

export function defineDns(config: DnsConfig) {
  return config
}

export function defineEmailConfig(config: EmailConfig) {
  return config
}

export function defineEmail(config: EmailConfig) {
  return config
}

export function defineGit(config: GitConfig) {
  return config
}

export function defineHashing(config: HashingConfig) {
  return config
}

export function defineLibrary(config: LibraryConfig) {
  return config
}

export function defineNotification(config: NotificationConfig) {
  return config
}

export function definePayment(config: PaymentConfig) {
  return config
}

export function defineQueue(config: QueueConfig) {
  return config
}

export function defineSearchEngine(config: SearchEngineConfig) {
  return config
}

export function defineSecurity(config: SecurityConfig) {
  return config
}

export function defineServices(config: ServicesConfig) {
  return config
}

export function defineSms(config: SmsConfig) {
  return config
}

export function defineStorage(config: StorageConfig) {
  return config
}

export function defineUi(config: UiConfig) {
  return config
}

export function defineModel(config: Model) {
  return config
}

export function defineEvents(config: Events) {
  return config
}
