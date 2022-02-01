import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Home page | ig.news" />
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications <br />
            <span>
              for{' '}
              {new Intl.NumberFormat('en', {
                style: 'currency',
                currency: 'EUR',
              }).format(product.amount)}{' '}
              month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KO5SwAm3jniLxS4CtIIknYk')

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  }

  return {
    props: {
      product,
    },
  }
}
