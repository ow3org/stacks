import type Stripe from 'stripe'
import type { PaymentMethodModel } from '../../../../orm/src/models/PaymentMethod'
import type { UserModel } from '../../../../orm/src/models/User'
import { stripe } from '..'
import PaymentMethod from '../../../../orm/src/models/PaymentMethod'

export interface ManagePaymentMethod {
  addPaymentMethod: (user: UserModel, paymentMethod: string | Stripe.PaymentMethod) => Promise<Stripe.Response<Stripe.PaymentMethod>>
  updatePaymentMethod: (user: UserModel, paymentMethodId: string, updateParams?: Stripe.PaymentMethodUpdateParams) => Promise<Stripe.Response<Stripe.PaymentMethod>>
  setDefaultPaymentMethod: (user: UserModel, paymentMethodId: string) => Promise<Stripe.Response<Stripe.Customer>>
  deletePaymentMethod: (user: UserModel, paymentMethodId: string) => Promise<Stripe.Response<Stripe.PaymentMethod>>
  retrieveDefaultPaymentMethod: (user: UserModel) => Promise<PaymentMethodModel | undefined>
  listPaymentMethods: (user: UserModel, cardType?: string) => Promise<PaymentMethodModel[]>
}

export const managePaymentMethod: ManagePaymentMethod = (() => {
  async function addPaymentMethod(user: UserModel, paymentMethod: string | Stripe.PaymentMethod): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    if (!user.hasStripeId()) {
      throw new Error('Customer does not exist in Stripe')
    }

    let stripePaymentMethod

    if (typeof paymentMethod === 'string') {
      stripePaymentMethod = await stripe.paymentMethod.retrieve(paymentMethod)
    }
    else {
      stripePaymentMethod = paymentMethod
    }

    if (stripePaymentMethod.customer !== user.stripe_id) {
      stripePaymentMethod = await stripe.paymentMethod.attach(stripePaymentMethod.id, {
        customer: user.stripe_id || '',
      })
    }

    return stripePaymentMethod as Stripe.Response<Stripe.PaymentMethod>
  }

  async function setDefaultPaymentMethod(user: UserModel, paymentMethodId: string): Promise<Stripe.Response<Stripe.Customer>> {
    if (!user.hasStripeId()) {
      throw new Error('Customer does not exist in Stripe')
    }

    const paymentMethod = await stripe.paymentMethod.retrieve(paymentMethodId)

    if (paymentMethod.customer !== user.stripe_id) {
      await stripe.paymentMethod.attach(paymentMethod.id, {
        customer: user.stripe_id || '',
      })
    }

    const updatedCustomer = await stripe.customer.update(user?.stripe_id || '', {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    return updatedCustomer
  }

  async function deletePaymentMethod(user: UserModel, paymentMethodId: string): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    if (!user.hasStripeId()) {
      throw new Error('Customer does not exist in Stripe')
    }

    const paymentMethod = await stripe.paymentMethod.retrieve(paymentMethodId)

    if (paymentMethod.customer !== user.stripe_id) {
      throw new Error('Payment method does not belong to this customer')
    }

    return await stripe.paymentMethod.detach(paymentMethodId)
  }

  async function updatePaymentMethod(user: UserModel, paymentMethodId: string, updateParams?: Stripe.PaymentMethodUpdateParams): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    if (!user.hasStripeId()) {
      throw new Error('Customer does not exist in Stripe')
    }

    const paymentMethod = await stripe.paymentMethod.retrieve(paymentMethodId)

    if (paymentMethod.customer !== user.stripe_id) {
      throw new Error('Payment method does not belong to this customer')
    }

    return await stripe.paymentMethod.update(paymentMethodId, updateParams)
  }

  async function listPaymentMethods(
    user: UserModel,
    cardType?: string,
  ): Promise<PaymentMethodModel[]> {
    if (!user.hasStripeId()) {
      throw new Error('Customer does not exist in Stripe')
    }

    const paymentMethods = await PaymentMethod.where('user_id', user.id).get()

    // const paymentMethods = await stripe.paymentMethod.list({
    //   customer: user.stripe_id,
    //   type: 'card',
    // })

    // // Filter by card type if provided, and exclude the default payment method ID if it's available
    // paymentMethods.data = paymentMethods.data.filter(
    //   method =>
    //     (!cardType || method.card?.brand === cardType)
    //     && (defaultPayment?.id !== method.id), // Ensure defaultPayment is not null or undefined
    // )

    return paymentMethods
  }

  async function retrieveDefaultPaymentMethod(user: UserModel): Promise<PaymentMethodModel | undefined> {
    if (!user.hasStripeId()) {
      throw new Error('Customer does not exist in Stripe')
    }

    const paymentMethod = await PaymentMethod.find(Number(user?.default_payment_method))

    return paymentMethod
  }

  return { addPaymentMethod, deletePaymentMethod, retrieveDefaultPaymentMethod, updatePaymentMethod, listPaymentMethods, setDefaultPaymentMethod }
})()
