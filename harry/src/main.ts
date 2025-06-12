import './style.css'
class Character {
  image: string
  name: string
  house: string

  constructor(image: string, name: string, house: string) {
    this.image = image
    this.name = name
    this.house = house
  }
}

const app = document.querySelector<HTMLDivElement>('#app')!

function header(): void {
  const headerDiv: HTMLDivElement = document.createElement('div')
  headerDiv.className = 'header py-10 bg-blue-900 fixed top-0 right-0 left-0 z-50'

  const linkAccueil: HTMLAnchorElement = document.createElement('a')
  linkAccueil.href = ''
  linkAccueil.className = 'px-8 text-2xl text-white'
  linkAccueil.textContent = 'Accueil'

  const linkMaison: HTMLAnchorElement = document.createElement('a')
  linkMaison.href = ''
  linkMaison.className = 'px-8 text-2xl text-white'
  linkMaison.textContent = 'Maisons'

  const linkFilms: HTMLAnchorElement = document.createElement('a')
  linkFilms.href = ''
  linkFilms.className = 'px-8 text-2xl text-white'
  linkFilms.textContent = 'Films'

  const linkLivres: HTMLAnchorElement = document.createElement('a')
  linkLivres.href = ''
  linkLivres.className = 'px-8 text-2xl text-white'
  linkLivres.textContent = 'Livres'

  headerDiv.appendChild(linkAccueil)
  headerDiv.appendChild(linkMaison)
  headerDiv.appendChild(linkFilms)
  headerDiv.appendChild(linkLivres)
  app.appendChild(headerDiv)
}

const mainDiv: HTMLDivElement = document.createElement('div')
mainDiv.className = 'grid grid-cols-5 gap-6 p-10'

const h1: HTMLHeadingElement = document.createElement('h1')
h1.className = 'flex items-center justify-center text-5xl pt-10 drop-shadow-[0_0_5px_white] mt-30'
h1.textContent = "Élèves de l'école de Poudlard"

header()
app.appendChild(h1)
app.appendChild(mainDiv)

async function callAPI(): Promise<any[]> {
  const res = await fetch("https://hp-api.onrender.com/api/characters")
  return await res.json()
}

async function displayCharacters(): Promise<void> {
  const dataPure = await callAPI()

  const chars: Character[] = dataPure.map((char: any) =>
    new Character(char.image, char.name, char.house)
  )

  chars.forEach(char => {
    const card: HTMLDivElement = document.createElement("div")
    card.className =
      "bg-black bg-opacity-50 rounded-lg p-6 m-4 max-w-xs text-white shadow-lg flex flex-col items-center justify-center border-4 border-white-500 hover:bg-sky-700 hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"

    const nameElem: HTMLHeadingElement = document.createElement("h2")
    nameElem.textContent = char.name
    nameElem.className = "text-2xl font-bold mb-2"

    const img: HTMLImageElement = document.createElement("img")
    img.src = char.image
    img.alt = `Portrait de ${char.name}`
    img.className = "w-32 h-32 rounded-full object-cover mb-4"

    const houseElem: HTMLParagraphElement = document.createElement("p")
    houseElem.textContent = `Maison : ${char.house}`
    houseElem.className = "text-lg"

    card.appendChild(img)
    card.appendChild(nameElem)
    card.appendChild(houseElem)

    mainDiv.appendChild(card)

    card.addEventListener("click", (): void => {
      characterDetail(char)
    })
  })
}

displayCharacters()
class DetailCharacter {
  image: string
  name: string
  house: string
  alternateName: string
  birth: string
  yearBirth: number
  espece: string
  genre: string
  ancetre: string
  hair: string
  eye: string
  isAlive: boolean
  actor: string

  constructor(image: string, name: string, house: string, alternateName: string, birth: string, yearBirth: number, espece: string, genre: string, ancetre: string, hair: string, eye: string, isAlive: boolean, actor: string) {
    this.image = image
    this.name = name
    this.house = house
    this.alternateName = alternateName
    this.birth = birth
    this.yearBirth = yearBirth
    this.espece = espece
    this.genre = genre
    this.ancetre = ancetre
    this.hair = hair
    this.eye = eye
    this.isAlive = isAlive
    this.actor = actor
  }
}

async function characterDetail(char: Character) {
  while (app.firstChild) {
    app.removeChild(app.firstChild)
  }

  header()

  const res = await fetch("https://hp-api.onrender.com/api/characters")
  const allCharacters = await res.json()

  const data = allCharacters.find((perso: any) => perso.name === char.name)

  const detail = new DetailCharacter(
    data.image,
    data.name,
    data.house,
    data.alternate_names[0] || "Aucun",
    data.dateOfBirth || "Inconnue",
    data.yearOfBirth || "Inconnue",
    data.species || "Inconnue",
    data.gender || "Inconnu",
    data.ancestry || "Inconnu",
    data.hairColour || "Inconnu",
    data.eyeColour || "Inconnu",
    data.alive,
    data.actor || "Inconnu"
  )

  const titre = document.createElement("h1")
  titre.textContent = `Détail de ${detail.name}`
  titre.className = "text-white text-4xl mt-20 text-center mt-30 text-shadow-lg/30"
  app.appendChild(titre)

  const wrapper = document.createElement("div")
  wrapper.className = "flex justify-center mt-10"

  const card: HTMLDivElement = document.createElement("div")
  card.className = "bg-black bg-opacity-50 rounded-lg p-6 m-4 text-white shadow-lg flex flex-col items-center justify-center border-4 border-white-500"

  wrapper.appendChild(card)
  app.appendChild(wrapper)
  const img = document.createElement("img")
  img.src = detail.image
  img.alt = detail.name
  img.className = "w-40 h-40 rounded-full object-cover mb-4"
  card.appendChild(img)

  const details = [
    `Nom : ${detail.name}`,
    `Maison : ${detail.house}`,
    `Nom alternatif : ${detail.alternateName}`,
    `Année de naissance : ${detail.yearBirth}`,
    `Date de naissance : ${detail.birth}`,
    `Acteur : ${detail.actor}`,
    `Espèce : ${detail.espece}`,
    `Sexe : ${detail.genre}`,
    `Ancêtre : ${detail.ancetre}`,
    `Cheveux : ${detail.hair}`,
    `Yeux : ${detail.eye}`,
    `En vie : ${detail.isAlive ? "Oui" : "Non"}`
  ]

  for (const detail of details) {
    const p = document.createElement("p")
    p.textContent = detail
    p.className = "mb-1 p-1 text-4xl text-white"
    card.appendChild(p)
  }
  footer()
}

function footer(): void {
  const footer = document.createElement('footer')
  footer.className = 'bg-blue-900 text-white text-center py-4'
  footer.textContent = '© Petitjean Quentyn'
  app.appendChild(footer)
}
footer()
