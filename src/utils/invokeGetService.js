
const invokeGetService = async ( serviceUrl ) => {

  const conf = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }

  try {
    const req = await fetch(serviceUrl, conf)
    const response = await req.json()

    return response

  } catch (error) {
    console.log('fetch error ::: ', error)
  }
}

export default invokeGetService