import logo from '/logo.svg';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Link, Social, SocialType } from '../types'
import Icon from '../components/Icon'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: links } = useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/links')
      const links = await response.json()
      return links;
    }
  })

  const { data: socials } = useQuery<Social[]>({
    queryKey: ['socials'],
    queryFn: async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/socials')
      const socials = await response.json()
      return socials;
    }
  })

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="flex flex-col max-w-xl mx-auto py-16 px-4">
        <img className="mx-auto rounded-full w-24 h-24" src={logo} alt="sorocaba.tech logo" width="96" height="96" />
        <h1 className="mt-4 text-center text-lg font-bold text-primary-dark">@sorocaba.tech</h1>
        <ul className="flex justify-center gap-5 mt-5">
          {socials?.map((social, index) =>
            <li key={index}>
              {social.type === SocialType.WHATSAPP && (
                <a className="text-3xl text-primary-dark" href={'https://api.whatsapp.com/send?phone=' + social.value} target="_blank" rel="noopener">
                  <Icon name="whatsapp" width={32} height={32} />
                </a>
              )}
              {social.type === SocialType.INSTAGRAM && (
                <a className="text-3xl text-primary-dark" href={'https://instagram.com/' + social.value} target="_blank" rel="noopener">
                  <Icon name="instagram" width={32} height={32} />
                </a>
              )}
            </li>
          )}
        </ul>
        <ul className="flex flex-col gap-4 mt-9">
          {links?.map((link, index) =>
            <li key={index}>
              <a className="button button-secondary button-lg" href={link.url} target="_blank" rel="noopener">
                {link.name}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
