export const generateTackingID = () => {
    const id =  `TRK` + Math.random().toString(36).substring(2, 10).toUpperCase()
   return id
}

