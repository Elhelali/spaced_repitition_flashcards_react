import axios from "axios";
export async function get_words() {
  //Retrieve all words in db
  const response = await axios.get("get_words");
  return response.data.words;
}

export async function get_definition(word) {
  //find definition fom api
  const response = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return response.data;
}

export async function add_word(word, definition) {
  //adds word to db
  const response = await axios.post(`add_word`, {
    word: word,
    definition: definition,
  });
  return response.data;
}

export async function delete_word(word) {
  //adds word to db
  const response = await axios.post(`delete_word`, { word: word });
  return response.data;
}

export async function create_user() {
  //adds word to db
  const response = await axios.post(`create_user`);
  return response.data;
}

export async function get_user() {
  //adds word to db
  const response = await axios.get(`get_user`);
  return response.data;
}

export async function submit_result(data) {
  //adds word to db
  const response = await axios.post(`submit_result`, data);
  return response.data;
}
export async function update_user_words() {
  //adds word to db
  const response = await axios.post(`update_user_words`);
  return response.data;
}
