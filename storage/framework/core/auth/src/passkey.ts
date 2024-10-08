import type { VerifiedRegistrationResponse } from '@simplewebauthn/server'
import type { AuthenticatorTransportFuture, PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types'
import { type Insertable, db } from '@stacksjs/database'
import type { UserModel } from '../../../orm/src/models/User'
export {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server'

export type * from '@simplewebauthn/types'

type PasskeyInsertable = Insertable<PasskeyAttribute>

export interface PasskeyAttribute {
  id: string
  cred_public_key: string
  user_id: number
  webauthn_user_id: string
  counter: number
  backup_eligible: boolean
  backup_status: boolean
  transports?: AuthenticatorTransportFuture[]
  created_at: Date
  last_used_at: string
}

export async function getUserPasskeys(userId: number): Promise<PasskeyAttribute[]> {
  return await db.selectFrom('passkeys').selectAll().where('user_id', '=', userId).execute()
}

export async function setCurrentRegistrationOptions(
  user: UserModel,
  verified: VerifiedRegistrationResponse,
): Promise<void> {
  const passkeyData: PasskeyInsertable = {
    id: verified.registrationInfo?.credentialID || '',
    cred_public_key: JSON.stringify(verified.registrationInfo?.credentialPublicKey), // Convert to JSON string if needed
    user_id: user.id as number,
    webauthn_user_id: user.email || '',
    counter: verified.registrationInfo?.counter || 0,
    credential_type: verified.registrationInfo?.credentialType,
    device_type: verified.registrationInfo?.credentialDeviceType,
    backup_eligible: false,
    backup_status: verified.registrationInfo?.credentialBackedUp || false,
    transports: 'internal',
    last_used_at: formatDateTime(),
  }

  const result = await db.insertInto('passkeys').values(passkeyData).executeTakeFirstOrThrow()
}

function formatDateTime(): string {
  const date = new Date()
  const pad = (num: number): string => String(num).padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // getMonth is zero-based
  const day = pad(date.getDate())

  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
