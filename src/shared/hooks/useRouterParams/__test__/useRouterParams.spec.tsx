import mockRouter from 'next-router-mock'

import { renderHooksProvider } from '@/providers'

import { useRouterParams } from '..'
import { act } from '@testing-library/react'

jest.mock('next/router', () => require('next-router-mock'))

describe('useRouterParams hook', () => {
  describe('hasParam', () => {
    it('should check whether a param is exposed in the URL string', () => {
      mockRouter.push('?A=1&B=2&B=3&C=4&D=')
      const { result } = renderHooksProvider(() => useRouterParams())

      const hasAParam = result.current.hasParam('A', '1')
      const hasBParam = result.current.hasParam('B', '2')
      const hasCParam = result.current.hasParam('C')
      const hasDParam = result.current.hasParam('D')

      expect(hasAParam).toBeTruthy()
      expect(hasBParam).toBeTruthy()
      expect(hasCParam).toBeTruthy()
      expect(hasDParam).toBeFalsy()
    })
  })

  describe('getParamValue', () => {
    it('should retrieve from the URL the value of the provided param', () => {
      mockRouter.push('?A=1&B=2&B=3')
      const { result } = renderHooksProvider(() => useRouterParams())

      const valueA = result.current.getParamValue('A')
      const valueB = result.current.getParamValue('B')
      const valueC = result.current.getParamValue('C')

      expect(valueA).toBe('1')
      expect(valueB).toEqual(['2', '3'])
      expect(valueC).toBeUndefined()
    })
  })

  describe('addParam', () => {
    it('should add a query param to the URL string', () => {
      mockRouter.push('?A=1')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.addParam('B', '2')
      })

      expect(mockRouter.asPath).toBe('?A=1&B=2')
    })

    it('should add a query param with the same name', () => {
      mockRouter.push('?A=1&B=2')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.addParam('B', '3')
      })

      expect(mockRouter.asPath).toBe('?A=1&B=2&B=3')
    })

    it('should add multiples params with the same name', () => {
      mockRouter.push('?A=1&B=2&B=3')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.addParam('B', '4')
      })

      expect(mockRouter.asPath).toBe('?A=1&B=2&B=3&B=4')
    })
  })

  describe('setParam', () => {
    it('should set query param', () => {
      mockRouter.push('?A=1&B=2')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.setParam('B', '3')
      })

      expect(mockRouter.asPath).toBe('?A=1&B=3')
    })

    it('should remove query param from URL', () => {
      mockRouter.push('?A=1&B=2')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.setParam('B')
      })

      expect(mockRouter.asPath).toBe('?A=1')
    })
  })

  describe('clearParams', () => {
    it('should clear all queries from the URL', () => {
      mockRouter.push('?A=1&B=2&C=3')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.clearParams()
      })

      expect(mockRouter.asPath).toBe('')
    })

    it('should clear multiples params', () => {
      mockRouter.push('?A=1&B=2&C=3')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.clearParams('B', 'C')
      })

      expect(mockRouter.asPath).toBe('?A=1')
    })
  })

  describe('removeParam', () => {
    it('should remove the provided param with a specific value', () => {
      mockRouter.push('?A=1&B=2&B=3&C=4')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.removeParam('B', '3')
      })

      expect(mockRouter.asPath).toBe('?A=1&C=4&B=2')
    })

    it('should not change the URL query params', () => {
      mockRouter.push('?A=1&B=2&B=3&C=4')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.removeParam('D')
      })

      expect(mockRouter.asPath).toBe('?A=1&B=2&B=3&C=4')
    })
  })

  describe('toogleParam', () => {
    it('should add param', () => {
      mockRouter.push('?teste=1&page=1&search=a')
      const { result } = renderHooksProvider(() => useRouterParams())

      act(() => {
        result.current.toggleParam('search', 'a')
      })

      expect(mockRouter.asPath).toBe('?teste=1&page=1')
    })
  })
})
