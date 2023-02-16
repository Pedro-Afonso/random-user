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
  try {
    const { search, page, limit, state, gender, sort } = getParams(req)

    let randomUserData = await fetchRandomUserData()

    if (search) {
      randomUserData = searchByName(search, randomUserData)
    }

    const filter = extractFilterList(randomUserData)

    if (state.length > 0) {
      randomUserData = applyFilterState(state, randomUserData)
    }

    if (gender.length > 0) {
      randomUserData = applyFilterGender(gender, randomUserData)
    }

    const total: number = randomUserData.length

    if (sort) {
      randomUserData = applySort(sort, randomUserData)
    }

    // Pagination
    randomUserData = applyPagination(limit, page, randomUserData)

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
  } catch (error) {
    console.log(error)
  }
}

async function fetchRandomUserData() {
  const urlRandomUser = 'https://randomuser.me/api/'
  const params = {
    seed: '11',
    nat: 'br',
    results: '60',
    inc: 'gender,name,nat,dob,id,picture,location,login'
  }
  const response = await axios
    .get<IRandomUserResponse>(urlRandomUser, {
      headers: { 'Accept-Encoding': 'gzip' },
      params
    })
    .then(res => res.data.results)
  return response
}

function getParams(req: NextApiRequest) {
  const search = paramToString(req, 'search') || ''
  const page = Number(paramToString(req, 'page') || 1)
  const limit = Number(paramToString(req, 'limit') || 9)
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

function extractFilterList(randomUserData: IRandomUser[]) {
  const discoveredColors = randomUserData.map(i => i.location.state)
  const stateList = { name: 'Estado', list: [...new Set(discoveredColors)] }

  const discoveredGender = randomUserData.map(i => i.gender)
  const genderList = { name: 'Gênero', list: [...new Set(discoveredGender)] }

  const filter = [stateList, genderList]

  return filter
}

function applyFilterState(state: string[], randomUserData: IRandomUser[]) {
  return randomUserData.filter(user => state.includes(user.location.state))
}

function applyFilterGender(gender: string[], randomUserData: IRandomUser[]) {
  return randomUserData.filter(user => gender.includes(user.gender))
}

function applySort(sort: string, randomUserData: IRandomUser[]) {
  return randomUserData.sort((a, b) => {
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

function applyPagination(
  limit: number,
  page: number,
  randomUserData: IRandomUser[]
) {
  if (limit && +limit <= 150 && page) {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    return randomUserData.slice(startIndex, endIndex)
  } else {
    return randomUserData.slice(0, 9)
  }
}
