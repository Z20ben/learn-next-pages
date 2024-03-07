import { useCallback, useEffect, useState } from "react"

export const useQueries = ({ prefixUrl = "" } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  })

  const fetchingData = useCallback(async ({ url = "", method = "GET" } = {}) => {
    setData({
      ...data,
      isLoading: true,
    })
    try {
      const result = await (await fetch(url, {
        method,
      })).json();
      setData({
        ...data,
        data: result,
        isLoading: false,
      })
    } catch (error) {
      setData({
        ...data,
        isError: true,
        isLoading: false
      })
    }
  }, [])

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl })
    }
  }, [])

  return { ...data };
}