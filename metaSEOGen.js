async function getSuggestions(url) {
  // enter your api key here
  const apiKey = "YOUR_API_KEY";

  const prompt = "Provide 1 Title and 1 Meta Description for this url: " + url;

  return fetch("https://api.openai.com/v1/completions", {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      max_tokens: 1024,
      temperature: 0.5,
      model: "text-davinci-003",
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  }).then(res => res.json());
}


window.addEventListener("DOMContentLoaded", (event) => {
  
  let reset = document.getElementById("reset")

  reset.addEventListener('click', () => {
    document.getElementById('url').value = "";
    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('status').value = "";
    document.getElementById('TitleCopied').value = "";
    document.getElementById('descCopied').value = "";
  });
  document.getElementById('gen').addEventListener('click', () => {
    var url = document.getElementById('url').value;
    document.getElementById('status').innerHTML = "Loading...";

    getSuggestions(url).then(r => {

      document.getElementById('status').innerHTML = "Done!"
      var result = r.choices[0].text;
      var temp = result.split('Meta Description:')
      var title = temp[0].split('Title:')[1]
      var metadesc = temp[1]
      document.getElementById('desc').value = "<meta name=\"description\" content=\"" + metadesc + "\"</meta>"
      document.getElementById('title').value = "<title>" + title + "</title>"

    })
  });
});

function copy(id_button) {
  // Get the text field
  var copyText = document.getElementById(id_button).value;

  setTimeout(() => {
    navigator.clipboard.writeText(copyText)
  }, 100);

  var id_copied = "TitleCopied"
  if (id_button == 'desc') {
    id_copied = "descCopied"
  }

  document.getElementById(id_copied).innerHTML = "Text copied";
}

