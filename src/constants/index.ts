interface Product {
  id: number
  name: string
  price: number
  date: Date // Adicionado o campo date como opcional
}

// Função para gerar uma data aleatória dentro de um intervalo
const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export const products: Product[] = [
  {
    id: 1,
    name: "Semente de Soja A",
    price: 20,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 2,
    name: "Semente de Soja B",
    price: 30,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 3,
    name: "Semente de Soja C",
    price: 25,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 4,
    name: "Semente de Soja D",
    price: 85,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 5,
    name: "Semente de Soja E",
    price: 42,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 6,
    name: "Semente de Soja F",
    price: 14,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 7,
    name: "Semente de Soja G",
    price: 98,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    id: 8,
    name: "Semente de Soja H",
    price: 62,
    date: randomDate(new Date(2022, 0, 1), new Date()),
  },
]
