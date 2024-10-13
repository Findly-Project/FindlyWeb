from typing import List


class ProductData:
    default_image_url = 'https://грандпол.рф/core/theme/default/images/placeholder.png'

    def __init__(self, link: str, name: str, price: float, image: str | None = default_image_url):
        self.link = link
        self.name = name
        self.image = image
        self.price = price

    def __repr__(self):
        return f"ProductData(name={self.name}, price={self.price}, link={self.link})"


class ProductList:
    def __init__(self):
        self.products: List[ProductData] = []

    def add_product(self, product: ProductData):
        self.products.append(product)

    def __iter__(self):
        return iter(self.products)

    def __repr__(self):
        return f"ProductList(products={self.products})"
