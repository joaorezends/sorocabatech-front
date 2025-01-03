import { useEffect, useState } from 'react'
import WhatsAppIcon from '../components/icons/WhatsAppIcon'
import InstagramIcon from '../components/icons/InstagramIcon'
import { Link, Social, SocialType } from '../types'

function Linktree() {
  const [links, setLinks] = useState<Link[]>([])
  const [socials, setSocials] = useState<Social[]>([])

  useEffect(() => {
    const load = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/links')
      const links = await response.json()
      setLinks(links)
    }

    load()
  }, [])

  useEffect(() => {
    const load = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/socials')
      const socials = await response.json()
      setSocials(socials)
    }

    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#e4e9ed]">
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col gap-8 py-16 px-4">
          <ul className="flex justify-center gap-5">
            {socials.map((social, index) =>
              <li key={index}>
                {social.type === SocialType.WHATSAPP && (
                  <a className="text-3xl text-[#0027d0]" href={'https://api.whatsapp.com/send?phone=' + social.value} target="_blank" rel="noopener">
                    <WhatsAppIcon width={32} height={32} />
                  </a>
                )}
                {social.type === SocialType.INSTAGRAM && (
                  <a className="text-3xl text-[#0027d0]" href={'https://instagram.com/' + social.value} target="_blank" rel="noopener">
                    <InstagramIcon width={32} height={32} />
                  </a>
                )}
              </li>
            )}
          </ul>
          <ul className="flex flex-col gap-4">
            {links.map((link, index) =>
              <li key={index}>
                <a className="block py-5 px-11 bg-white rounded-3xl text-base text-center text-[#0027d0]" href={link.url} target="_blank" rel="noopener">
                  {link.name}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Linktree
