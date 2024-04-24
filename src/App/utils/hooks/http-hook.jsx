import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClinet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest=useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const HttpabortCtrl=new AbortController();
      activeHttpRequest.current.push(HttpabortCtrl)
      try {
        const response = await fetch(url, { method, body, headers });

        const responseData = await response.json();
        activeHttpRequest.current=activeHttpRequest.current.filter(
            reqCtrl=>reqCtrl !==HttpabortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  useEffect(()=>{
    return()=>{
        activeHttpRequest.current.forEach(abortCtrl=>abortCtrl.abort())
    }    
  },[])
  return {isLoading,error,sendRequest,clearError}
};
