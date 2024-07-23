from urllib.request import urlopen
from bs4 import BeautifulSoup

url = "https://www.forbes.com/sites/davidphelan/2024/07/22/crowdstrike-outage-microsoft-blames-eu-while-macs-remain-immune/"
html = urlopen(url).read()
soup = BeautifulSoup(html, features="html.parser")

# get rid of all style and script elements
for script in soup(["script", "style"]):
    script.extract()

text = soup.get_text()

#break into lines and remove leading/trailing whitespace on each
lines = (line.strip() for line in text.splitlines())

#break multi-headlines into a line each
chunks = (phrase.strip() for line in lines for phrase in line.split("  "))

#drop blank lines
text = '\n'.join(chunk for chunk in chunks if chunk)

print(text)