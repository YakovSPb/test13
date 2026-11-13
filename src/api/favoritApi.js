import { API_KEY } from '../config'

function buildUrl(params) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, value)
    }
  })
  return `/hsprice/?${search.toString()}`
}

const mockBrands = [
  { brand: 'BOSCH', number: '0 986 494 058', name: 'Колодки тормозные' },
  { brand: 'TRW', number: 'GDB1550', name: 'Колодки тормозные' },
  { brand: 'FERODO', number: 'FDB1782', name: 'Колодки тормозные' },
]

const mockOffers = [
  {
    brand: 'BOSCH',
    name: 'Колодки тормозные дисковые',
    price: 2450,
    stock: 12,
  },
  {
    brand: 'TRW',
    name: 'Колодки тормозные (аналог)',
    price: 1980,
    stock: 4,
  },
  {
    brand: 'FERODO',
    name: 'Колодки тормозные (аналог)',
    price: 2210,
    stock: 0,
  },
]

function uniqueBrands(goods) {
  const map = new Map()
  goods.forEach((item) => {
    if (!item?.brand) return
    if (!map.has(item.brand)) {
      map.set(item.brand, {
        brand: item.brand,
        number: item.number,
        name: item.name,
      })
    }
  })
  return Array.from(map.values())
}

function flattenOffers(goods) {
  const rows = []

  goods.forEach((item) => {
    const warehouses = Array.isArray(item.warehouses) ? item.warehouses : []

    if (warehouses.length === 0) {
      rows.push({
        brand: item.brand,
        name: item.name || item.number,
        price: item.price ?? null,
        stock: item.count ?? 0,
      })
      return
    }

    warehouses.forEach((wh) => {
      rows.push({
        brand: item.brand,
        name: item.name || item.number,
        price: wh.price ?? null,
        stock: wh.stock ?? 0,
      })
    })

    if (Array.isArray(item.analogues)) {
      item.analogues.forEach((analog) => {
        const analogWh = Array.isArray(analog.warehouses) ? analog.warehouses : []
        if (analogWh.length === 0) {
          rows.push({
            brand: analog.brand,
            name: analog.name || analog.number,
            price: analog.price ?? null,
            stock: analog.count ?? 0,
          })
          return
        }
        analogWh.forEach((wh) => {
          rows.push({
            brand: analog.brand,
            name: analog.name || analog.number,
            price: wh.price ?? null,
            stock: wh.stock ?? 0,
          })
        })
      })
    }
  })

  return rows
}

async function request(params) {
  if (!API_KEY) {
    await new Promise((r) => setTimeout(r, 400))
    if (params.analogues === 'on' && params.brand) {
      return { goods: mockOffers.map((o) => ({ ...o, warehouses: [{ price: o.price, stock: o.stock }] })) }
    }
    return {
      goods: mockBrands.map((b) => ({
        brand: b.brand,
        number: params.number,
        name: b.name,
        warehouses: [],
      })),
    }
  }

  const response = await fetch(buildUrl({ key: API_KEY, ...params }))
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const data = await response.json()
  if (data?.error) {
    throw new Error(Array.isArray(data.error) ? data.error.join('; ') : String(data.error))
  }
  return data
}

export async function fetchBrands(number) {
  const data = await request({ number })
  const goods = Array.isArray(data.goods) ? data.goods : []
  const brands = uniqueBrands(goods)
  if (brands.length === 0) {
    return []
  }
  return brands
}

export async function fetchOffers(number, brand) {
  const data = await request({ number, brand, analogues: 'on' })
  const goods = Array.isArray(data.goods) ? data.goods : []
  return flattenOffers(goods)
}

export function hasApiKey() {
  return Boolean(API_KEY)
}
