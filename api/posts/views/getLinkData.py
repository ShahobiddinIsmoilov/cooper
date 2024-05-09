import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from bs4 import BeautifulSoup


@api_view(["GET"])
def getLinkData(request):

    def get_meta_property(meta, property_name, default_value=""):
        if "property" in meta.attrs and meta.attrs["property"] == property_name:
            return meta.attrs["content"]
        return default_value

    def get_url_metadata(external_sites_url):
        headers = {"User-Agent": "Mozilla/5.0"}
        external_sites_html = requests.get(external_sites_url, headers=headers).text

        soup = BeautifulSoup(external_sites_html, "html.parser")

        title = soup.title.text
        image = ""
        description = ""
        icon = ""

        for meta in soup.findAll("meta"):
            title = get_meta_property(meta, "og:title", title)
            image = get_meta_property(meta, "og:image", image)
            description = get_meta_property(meta, "og:description", description)

        icon_link = soup.find("link", rel="shortcut icon")
        if icon_link is None:
            icon_link = soup.find("link", rel="icon")
        if icon_link:
            icon = icon_link.get("href", "")

        return {
            "title": title,
            "image": image,
            "description": description,
            "icon": icon,
        }

    metadata = get_url_metadata(request.GET.get("link", ""))

    return Response(metadata, status=status.HTTP_200_OK)
