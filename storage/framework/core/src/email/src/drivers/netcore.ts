import { NetCoreProvider } from '@novu/netcore'
import type { EmailOptions } from '@stacksjs/types'
import type { ResultAsync } from '@stacksjs/error-handling'
import { notification } from '@stacksjs/config'
import { send as sendEmail } from '../send'

const env = notification.email
const service = notification.email?.drivers.netcore

const provider = new NetCoreProvider({
  apiKey: service?.key || '',
  from: env?.from.address || '',
})

async function send(options: EmailOptions, css?: string): Promise<ResultAsync<any, Error>> {
  return sendEmail(options, provider, 'Netcore', css)
}

export { send as Send, send }