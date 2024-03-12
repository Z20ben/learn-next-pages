import { useCallback, useEffect, useState } from "react"

export const useQueries = (
  { prefixUrl = "", headers = {} }, callback = {
    onSuccess: () => { },
  }
) => {
  const { onSuccess = () => { } } = callback;
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  })
  // console.log('headers up -> ', headers);

  const fetchingData = useCallback(async ({ url = "", method = "GET", headers = {} } = {}) => {
    setData({
      ...data,
      isLoading: true,
    })
    // console.log('headers -> ', headers)
    try {
      const result = await (await fetch(url, {
        method, headers
      })).json();
      // console.log("ini useq result", data)

      setData({
        ...data,
        data: result,
        isLoading: false,
      });
      onSuccess(result);
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
      fetchingData({ url: prefixUrl, headers: headers })
    }
  }, [prefixUrl])

  return { ...data };
}