import { bcf1, bcf2, bcf3, bcf4, bcf5, bcf6, bcf7, bcf8 } from "../assets"

interface Product {
  id: number
  name: string
  price: number
  date?: Date
  img?: any
}

const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export const products: Product[] = [
  {
    id: 1,
    name: "Semente de Soja A2lO",
    price: 20,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf1,
  },
  {
    id: 2,
    name: "Semente de Soja BF43",
    price: 30,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf2,
  },
  {
    id: 3,
    name: "Semente de Soja CR32",
    price: 25,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf3,
  },
  {
    id: 4,
    name: "Semente de Soja D98P",
    price: 85,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf4,
  },
  {
    id: 5,
    name: "Semente de Soja ERT5",
    price: 42,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf5,
  },
  {
    id: 6,
    name: "Semente de Soja F58G",
    price: 14,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf6,
  },
  {
    id: 7,
    name: "Semente de Soja G98W",
    price: 98,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf7,
  },
  {
    id: 8,
    name: "Semente de Soja H78A",
    price: 62,
    date: randomDate(new Date(2022, 0, 1), new Date()),
    img: bcf8,
  },
]
