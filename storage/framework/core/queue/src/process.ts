import { ok, type Ok } from '@stacksjs/error-handling'
import { log } from '@stacksjs/logging'
import { Job, type JobModel } from '../../../orm/src/models/Job'
import { runJob } from './job'

interface QueuePayload {
  displayName: string
  name: string
  maxTries: number
  timeOut: number | null
  timeOutAt: Date | null
}

export async function processJobs(queue: string | undefined): Promise<Ok<string, never>> {
  async function process() {
    try {
      await executeJobs(queue)
    } catch (error) {
      log.error('Error processing jobs:', error)
    }

    setTimeout(process, 1000)
  }

  process()

  return ok('Job processing has started successfully!')
}

async function executeJobs(queue: string | undefined): Promise<void> {
  const jobs = await Job.when(queue !== undefined, (query: any) => query.where('queue', queue)).get()

  for (const job of jobs) {

    if (!job.payload) continue

    if (job.available_at && job.available_at > timestampNow()) continue

    const payload: QueuePayload = JSON.parse(job.payload)
    const currentAttempts = job.attempts || 0

    log.info(`Running job: ${payload.displayName}`)

    await updateJobAttempts(job, currentAttempts)

    try {
      await runJob(payload.name, {
        queue: job.queue,
        payload: {},
        context: '',
        maxTries: payload.maxTries,
        timeout: 60,
      })

      await job.delete()
      log.info(`Successfully ran job: ${payload.displayName}`)
    } catch (error) {
      log.error(`Job failed: ${payload.displayName}`, error)
    }
  }
}

async function updateJobAttempts(job: any, currentAttempts: number): Promise<void> {
  try {
    await job.update({ attempts: currentAttempts + 1 })
  } catch (error) {
    log.error('Failed to update job attempts:', error)
  }
}

function timestampNow(): number {
  const now = Date.now()
  return Math.floor(now / 1000)
}
