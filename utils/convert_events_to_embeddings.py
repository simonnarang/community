import pandas as pd
import openai

openai.api_key = "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"

data = pd.read_csv('run_results.csv', skiprows = 1, names = ["title_name", "title_url", "title_description", "title_start_time", "title_end_time"])
data = data.dropna()

out = pd.DataFrame(columns = ["content", "metadata", "embedding"])

for i, row in data.iterrows():

    content = "The event, " + \
    row['title_name'] + \
    ", is happening from " + \
    row['title_start_time'].split(" –", 1)[0] + \
    " until " + \
    row['title_end_time'] + \
    ". Here is the description: " + row['title_description'].split("Details\n",1)[1].split("\nFile Attachments",1)[0] + "."

    metadata = "{\"date\": \"" + row['title_start_time'].split(" –", 1)[0] +"\", \"title\": \"" + row['title_name'] + "\", \"source\": \"" + row['title_url'] + "\"}"

    response = openai.Embedding.create(
    input=content,
    model="text-embedding-ada-002"
    )
    embeddings = response['data'][0]['embedding']

    out.loc[i] = [content, metadata, embeddings]


    # out.loc[i] = [row['title_name'], row['title_url'], row['title_description'].split("Details\n",1)[1].split("\nCopy Link",1)[0], row['title_start_time'].split(" –", 1)[0], row['title_end_time']]
    # print(row['title_name'])
    # print(row['title_url'])
    # row['title_description'] = (row['title_description'].split("Details\n",1)[1].split("\nCopy Link",1)[0])
    # row['title_start_time'] = (row['title_start_time'].split(" –", 1)[0])
    # print(row['title_end_time'])

out.to_csv('run_results2.csv', index=False)