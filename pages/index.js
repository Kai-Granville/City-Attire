import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getStaticProps() {
  const { data: products } = await supabase.from('products').select('*')
  return { props: { products }, revalidate: 3600 }
}

export default function Home({ products }) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Workwear Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 200px)',
        gap: '1rem'
      }}>
        {products?.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '1rem' }}>
            <img src={p.image_url} alt={p.title} width="180" />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <a href={p.awin_link} target="_blank" rel="noopener noreferrer">
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
