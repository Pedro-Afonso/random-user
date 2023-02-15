import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import { IRandomUser, IRandomUserResponse } from '@/interfaces'

export type Data = {
  users: IRandomUser[]
  total: number
  filter: {
    name: string
    list: string[]
  }[]
  sort: { name: string; value: string }[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { search, page, limit, state, gender, sort } = getParams(req)

  let randomUserData = await fetchRandomUserData()

  if (search) {
    randomUserData = searchByName(search, randomUserData)
  }

  const discoveredColors = randomUserData.map(i => i.location.state)
  const stateList = { name: 'Estado', list: [...new Set(discoveredColors)] }

  const discoveredGender = randomUserData.map(i => i.gender)
  const genderList = { name: 'Gênero', list: [...new Set(discoveredGender)] }

  const filter = [stateList, genderList]

  if (state.length > 0) {
    randomUserData = randomUserData.filter(user =>
      state.includes(user.location.state)
    )
  }

  if (gender.length > 0) {
    randomUserData = randomUserData.filter(user => gender.includes(user.gender))
  }

  // Total of users
  const total: number = randomUserData.length

  if (sort) {
    randomUserData = randomUserData.sort((a, b) => {
      const { name: nameA, dob: dobA } = a
      const { name: nameB, dob: dobB } = b

      switch (sort) {
        case 'age-des':
          return dobB.age - dobA.age
        case 'age-asc':
          return dobA.age - dobB.age
        case 'name-asc':
          return nameA.first.localeCompare(nameB.first)
        case 'name-des':
          return nameB.first.localeCompare(nameA.first)
        default:
          return 1
      }
    })
  }

  // Pagination
  if (limit && +limit <= 150 && page) {
    const startIndex = (parseInt(page) - 1) * parseInt(limit)
    const endIndex = parseInt(page) * parseInt(limit)
    randomUserData = randomUserData.slice(startIndex, endIndex)
  } else {
    randomUserData = randomUserData.slice(0, 9)
  }

  const sortOptions = [
    { name: 'Nome crescente', value: 'name-asc' },
    { name: 'Nome decrescente', value: 'name-des' },
    { name: 'Idade crescente', value: 'age-asc' },
    { name: 'Idade decrescente', value: 'age-des' }
  ]

  res.status(200).json({
    users: randomUserData,
    filter,
    total,
    sort: sortOptions
  })
}

async function fetchRandomUserData() {
  const urlRandomUser = 'https://randomuser.me/api/?seed=11&nat=br&results=615'
  const response = await axios
    .get<IRandomUserResponse>(urlRandomUser, {
      headers: { 'Accept-Encoding': 'gzip' }
    })
    .then(res => res.data.results)
  return response
}

function getParams(req: NextApiRequest) {
  const search = paramToString(req, 'search') || ''
  const page = paramToString(req, 'page') || '1'
  const limit = paramToString(req, 'limit') || '9'
  const sort = paramToString(req, 'sort')

  const state = paramToArray(req, 'Estado')
  const gender = paramToArray(req, 'Gênero')

  return { search, page, limit, sort, state, gender }
}

function paramToString(req: NextApiRequest, value: string): string | undefined {
  const query = req.query[value]
  const newQuery = Array.isArray(query) ? query[0] : query
  return newQuery
}

function paramToArray(req: NextApiRequest, value: string): string[] {
  const query = req.query[value + '[]'] || req.query[value] || []
  if (Array.isArray(query)) {
    return query.map(q => decodeURIComponent(q))
  } else {
    return [decodeURIComponent(query)]
  }
}

function searchByName(search: string, randomUserData: IRandomUser[]) {
  return randomUserData.filter(
    user => user.name.first.includes(search) || user.name.last.includes(search)
  )
}
