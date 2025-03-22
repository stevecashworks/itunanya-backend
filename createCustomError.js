const createCustomError= (err,code)=>{
  const message= err||"An unexpected error occured please try again"
  const statusCode= code||500
  return {message, code:statusCode}
}

export default createCustomError