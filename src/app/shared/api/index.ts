import axios from "axios";

export const getCharactersList = async () => {
  try {
    const response = await axios.get('https://stage.theaigo.com:8000/characters_list_full')
    if(response.data) {
      return response.data
    }
  } catch (error) {
    console.log('error',error)
  }
}