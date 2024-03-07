import { useCallback, useState } from "react"

export const useMutation = ({ } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  })

  const mutate = useCallback(async ({ url = "", method = "POST", payload = {} } = {}) => {
    setData({
      ...data,
      isLoading: true,
    })
    try {
      const result = await (await fetch(url, {
        method,
        body: JSON.stringify(payload),
      })).json();
      setData({
        ...data,
        data: result,
        isLoading: false,
      })

      return { ...result };
    } catch (error) {
      setData({
        ...data,
        isError: true,
        isLoading: false
      })
      return error;
    }
  }, [])


  return { ...data, mutate };
}