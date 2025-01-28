import '../app/globals.css'

export const metadata = {
  title: 'Your Portfolio',
  description: 'Personal portfolio website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}