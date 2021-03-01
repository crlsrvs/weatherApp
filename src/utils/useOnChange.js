import { useEffect } from 'react'

function useOnChange( state, setState, observer, fields) {

  useEffect( () => {

    const observerIsNotEmpty = Object.keys(observer).length !== 0

    if (observerIsNotEmpty) {

      const newState = {}

      fields.forEach( (field) => newState[field] = observer[field] )

      setState(newState)
    }
  }, [ observer ])

  return state
}

export {useOnChange}