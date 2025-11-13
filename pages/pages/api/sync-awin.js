import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  // Temporary mock data (you’ll replace with Awin API later)
  const mockProducts = [
    { title: 'Hi-Vis Jacket', price: 49.99, image_url: 'https://via.placeholder.com/200', awin_link: 'https://example.com/product1' },
    { title: 'Steel-Toe Boots', price: 89.50, image_url: 'https://via.placeholder.com/200', awin_link: 'https://example.com/product2' }
  ]

  for (const p of mockProducts) {
    await supabase.from('products').upsert(p)
  }

  res.status(200).json({ message: 'Synced mock data!', count: mockProducts.length })
}
