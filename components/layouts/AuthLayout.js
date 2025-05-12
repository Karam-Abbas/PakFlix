import NavbarIn from '@/components/NavbarIn'
import FooterIn from '@/components/FooterIn'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col gap-8">
      <NavbarIn />
      <main className="flex-grow">
        {children}
      </main>
      <FooterIn/>
    </div>
  )
}