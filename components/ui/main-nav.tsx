'use client'
import Link from 'next/link'
import { cn } from '../../lib/utils'
import { ThemeSwitch } from '../theme-switch'
import { useCookies } from 'react-cookie'
import { usePathname } from 'next/navigation'

interface NavLink {
  href: string
  label: string
  // condition to render the link
  condition?: boolean
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname()
  const [cookies, setCookie, removeCookie] = useCookies(['kc_session'])
  const links: NavLink[] = [
    {
      href: '/users',
      label: 'Users',
      condition: cookies.kc_session,
    },
    {
      href: '/',
      label: 'Upload',
      condition: cookies.kc_session,
    },
    {
      href: '/register',
      label: 'Register',
      condition: !cookies.kc_session && path !== '/register',
    },
    {
      href: '/login',
      label: 'Login',
      condition: !cookies.kc_session && path !== '/login',
    },
    {
      href: '/settings',
      label: 'Settings',
      condition: cookies.kc_session,
    },
  ]

  return (
    <div className='flex h-16 items-center px-4 border-b relative lg:px-16'>
      <ThemeSwitch />

      <nav
        className={cn('flex items-center space-x-4 lg:space-x-6', className)}
        {...props}
      >
        {links.map(({ href, label, condition }) => {
          if (condition) {
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-3 py-2 rounded ${
                  path === href
                    ? 'text-primary font-extrabold bg-gray-100 dark:bg-gray-800'
                    : ''
                }`}
              >
                {label}
              </Link>
            )
          }
        })}
      </nav>
    </div>
  )
}
