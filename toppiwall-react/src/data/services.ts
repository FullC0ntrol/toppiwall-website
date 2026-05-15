import { Brush, Hammer, Layers3, Bath, Wrench, PaintBucket, DoorOpen, Paintbrush, Grip } from 'lucide-react'

export const phoneNumber = '+32 492 85 87 50'
export const whatsappNumber = '+32 492 85 87 50'
export const emailAddress = 'walldonebelgium@gmail.com'
export const facebookUrl = 'https://www.facebook.com/profile.php?id=61578623409138'
export const instagramUrl = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fwall_done_belgium%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEwY1o1T3hXZHhIUmIzY3JGSXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5Nabdns9s3bhVhZjRLQ_8P8G_3HkiA1Fhx9fGsvKNHHG-EOqcZ-VRtVSCxfQ_aem_dQQdIYSzIySgUzbDlU0HYw&h=AUDsTtMYn6e_0Pdlj9dJDMjb9djFtO4GuMt1624XlQyMOf8td6TK4IzyHRhA-kCDGbNrMdyPyKbwFydwKbkXXbZeEp-lGEqXcWv-hjGEVzmfbNqfcgss6x05M7h_zz87OLyH'

export const paintingSteps = [
  {
    num: '01',
    title: 'Zabezpieczenie',
    text: 'Folia ochronna, taśma malarska, precyzyjne zabezpieczenie każdego centymetra powierzchni. Chronimy Twoje meble i podłogi.',
  },
  {
    num: '02',
    title: 'Gruntowanie',
    text: 'Podkład, który gwarantuje idealną przyczepność i wyrównanie. Perfekcyjnie gładkie ściany bez kompromisów.',
  },
  {
    num: '03',
    title: 'Szpachlowanie',
    text: 'Precyzyjna likwidacja ubytków, gładzie, przygotowanie podłoża do nieskazitelnej warstwy końcowej.',
  },
  {
    num: '04',
    title: 'Malowanie',
    text: 'Ostre odcięcia, równomierne krycie, trwałe powłoki premium. Efekt wow gwarantowany.',
  },
]

export const services = [
  {
    icon: Brush,
    title: 'Malowanie Premium',
    text: 'Wnętrza i fasady, używamy wyłącznie sprawdzonych, trwałych farb.',
  },
  {
    icon: Hammer,
    title: 'Zabudowy G-K',
    text: 'Sufity podwieszane, nowoczesne ścianki, precyzyjne łączenia gotowe pod finisz.',
  },
  {
    icon: Layers3,
    title: 'Montaż Podłóg',
    text: 'Panele laminowane i winylowe. Perfekcyjne dopasowanie listew.',
  },
]

export const extras = [
  { icon: Bath, title: 'Łazienki', text: 'Kafelkowanie, fugowanie, kompletne wykończenie.' },
  { icon: Wrench, title: 'Montaże Geberit', text: 'Instalacja stelaży podtynkowych i systemów.' },
  { icon: PaintBucket, title: 'Renowacja mebli', text: 'Odświeżanie i malowanie starych drewnianych mebli.' },
  { icon: DoorOpen, title: 'Renowacja drzwi', text: 'Szlifowanie i malowanie drzwi wewnętrznych.' },
  { icon: Paintbrush, title: 'Tapetowanie', text: 'Profesjonalne klejenie tapet, równe cięcia.' },
  { icon: Grip, title: 'Drobne naprawy', text: 'Silikonowanie, szpachlowanie, drobne usterki.' },
]

export const portfolioProjects = [
  {
    id: 'r1',
    title: 'Kompleksowe Wykończenie',
    category: 'Malowanie i Zabudowy',
    images: Array.from({ length: 12 }, (_, i) => `/realization/realization1/pic (${i + 1}).png`)
  },
  {
    id: 'r2',
    title: 'Nowoczesny Salon',
    category: 'Gładzie i Malowanie',
    images: Array.from({ length: 4 }, (_, i) => `/realization/realization2/pic (${i + 1}).png`)
  },
  {
    id: 'r3',
    title: 'Zabudowa Poddasza',
    category: 'Zabudowy G-K',
    images: Array.from({ length: 4 }, (_, i) => `/realization/realization3/pic (${i + 1}).png`)
  },
  {
    id: 'r4',
    title: 'Elegancka Sypialnia',
    category: 'Malowanie Premium',
    images: Array.from({ length: 4 }, (_, i) => `/realization/realization4/pic (${i + 1}).png`)
  },
  {
    id: 'r5',
    title: 'Renowacja Wnętrza',
    category: 'Kompleksowe Wykończenie',
    images: Array.from({ length: 4 }, (_, i) => `/realization/realization5/pic (${i + 1}).png`)
  },
  {
    id: 'r6',
    title: 'Odświeżenie Biura',
    category: 'Malowanie',
    images: Array.from({ length: 4 }, (_, i) => `/realization/realization6/pic (${i + 1}).png`)
  }
]

export const allPortfolioImages = portfolioProjects.flatMap(project => 
  project.images.map(src => ({
    src,
    title: project.title,
    category: project.category
  }))
)

export const reviews = [
  { author: 'Anna K.', text: 'Profesjonalna ekipa, czysto i terminowo. Salon wygląda fantastycznie, farba idealnie nałożona!', rating: 5 },
  { author: 'Marc V.', text: 'Świetna robota z zabudową G-K w kuchni. Wszystko prosto, bez pęknięć. Polecam w Leuven.', rating: 5 },
  { author: 'Sophie D.', text: 'Panele położone idealnie, zero reklamacji. Szybka komunikacja i czysta praca.', rating: 5 },
]
