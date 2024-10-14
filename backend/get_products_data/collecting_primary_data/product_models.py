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

    def del_product(self, index: int):
        self.products.pop(index)

    def sort_by_name(self, names: List[str], products: List[ProductData]) -> List[ProductData]:
        self.products = [item for item in products if item.name in names]
        return self.products

    def __iter__(self):
        return iter(self.products)

    def __len__(self):
        return len(self.products)

    def __getitem__(self, item):
        return self.products[item]

    def __repr__(self):
        return f"ProductList(products={self.products})"


class MarketPlaceList:
    def __init__(self):
        self.list_of_products = {}

    def add_list_of_products(self, list_name: str, list_data: ProductList):
        self.list_of_products[list_name] = list_data

    def get_json(self):
        return self.list_of_products

