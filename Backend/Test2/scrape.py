import os
import serpapi
import json

def search_serpapi(query, location="India", hl="en", gl="in", num=2):
    # Load API key from config.json
    with open('config.json') as f:
        config = json.load(f)

    api_key = config.get('SERPAPI_KEY')

    if not api_key:
        raise ValueError("SERPAPI_KEY not found in configuration file.")

    # Initialize SerpAPI client
    client = serpapi.Client(api_key=api_key)

    # Perform search
    result = client.search(
        q=query,
        engine="google",
        location=location,
        hl=hl,
        gl=gl,
        num=num
    )

    # Extract and return links from organic results
    links = []
    if 'organic_results' in result:
        for item in result['organic_results']:
            links.append(item['link'])
    else:
        print("No links found.")
    print(links)
    return links

# Example usage:
if __name__ == "__main__":
    links = search_serpapi("Lion")
    for link in links:
        print(link)
