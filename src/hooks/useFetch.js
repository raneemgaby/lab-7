import { useReducer, useEffect } from 'react';

const initialState = {
  loading: true,
  error: null,
  data: null,
};

function fetchReducer(state, action) { //manages the state of the fecth operation
  switch (action.type) {
    case 'FETCH_INIT':
      return { loading: true, error: null, data: null };
    case 'FETCH_SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'FETCH_FAILURE':
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

export function useFetch(fetchFn, deps = []) { //fetches data using the provided fetch function
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    dispatch({ type: 'FETCH_INIT' });

    fetchFn(controller.signal)
      .then((data) => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        if (isMounted) {
          dispatch({
            type: 'FETCH_FAILURE',
            payload: err.message || 'An error occurred while fetching',
          });
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, deps);

  return state;
}