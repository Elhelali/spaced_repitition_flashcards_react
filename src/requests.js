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
  const response = await axios.post(`add_word`, {
    word: word,
    definition: definition,
  });
  return response.data;
}

export async function delete_word(word) {
  const response = await axios.post(`delete_word`, { word: word });
  return response.data;
}

export async function create_user() {
  const response = await axios.post(`create_user`);
  return response.data;
}

export async function get_user() {
  const response = await axios.get(`get_user`);
  return response.data;
}

export async function get_all_users() {
  const response = await axios.get(`get_all_users`);
  return response.data;
}
export async function submit_result(data) {
  const response = await axios.post(`submit_result`, data);
  return response.data;
}
export async function update_user_words() {
  // Adds word to db
  const response = await axios.post('update_user_words', {}, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}


export async function admin_update_user_words(user_id) {
  const response = await axios.post(`update_user_words`, { user_id: user_id });
  return response.data;
}

export async function update_name(name) {
  const response = await axios.post(`update_name`, { name: name });
  return response.data;
}
