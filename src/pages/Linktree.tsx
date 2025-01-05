import { useEffect, useState } from 'react'
import logo from '/logo.png';
import Icon from '../components/Icon'
import { Link, Social, SocialType } from '../types'

const Linktree = () => {
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
    <div className="min-h-screen bg-tertiary">
      <div className="flex flex-col max-w-xl mx-auto py-16 px-4">
        <img className="mx-auto rounded-full w-24 h-24" src={logo} alt="sorocaba.tech logo" width="96" height="96" />
        <h1 className="mt-4 text-center text-lg font-bold leading-normal text-primary">@sorocaba.tech</h1>
        <ul className="flex justify-center gap-5 mt-5">
          {socials.map((social, index) =>
            <li key={index}>
              {social.type === SocialType.WHATSAPP && (
                <a className="text-3xl text-primary" href={'https://api.whatsapp.com/send?phone=' + social.value} target="_blank" rel="noopener">
                  <Icon name="whatsapp" width={32} height={32} />
                </a>
              )}
              {social.type === SocialType.INSTAGRAM && (
                <a className="text-3xl text-primary" href={'https://instagram.com/' + social.value} target="_blank" rel="noopener">
                  <Icon name="instagram" width={32} height={32} />
                </a>
              )}
            </li>
          )}
        </ul>
        <ul className="flex flex-col gap-4 mt-9">
          {links.map((link, index) =>
            <li key={index}>
              <a className="block py-5 px-11 bg-quaternary text-base text-center text-primary font-bold" href={link.url} target="_blank" rel="noopener">
                {link.name}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Linktree
