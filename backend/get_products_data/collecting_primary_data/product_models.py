from typing import List


class ProductData:
    default_image_url = 'images/placeholder.png'

    def __init__(self, link: str, name: str, price: float, image: str | None = default_image_url):
        self.link = link
        self.name = name
        self.image = image
        self.price = price

    def __repr__(self):
        return f"ProductData(name={self.name}, price={self.price}, link={self.link})"


class ProductList:
    def __init__(self, products: List[ProductData] | None = None):
        self.products: List[ProductData] = products if products else []

    def add_product(self, product: ProductData):
        self.products.append(product)

    def del_product(self, index: int):
        self.products.pop(index)

    def __iter__(self):
        return iter(self.products)

    def __len__(self):
        return len(self.products)

    def __getitem__(self, item):
        return self.products[item]

    def __repr__(self):
        return f"ProductList(products={self.products})"


class SortProductList(ProductList):
    @staticmethod
    def sort_by_name(names: List[str], products: ProductList) -> ProductList:
        products_list = [item for item in products if item.name in names]
        return ProductList(products_list)

    @staticmethod
    def sort_by_price(products: ProductList):
        return ProductList(sorted([item for item in products.products], key=lambda c: c.price))


class MarketPlaceList:
    def __init__(self):
        self.list_of_products = {}

    def add_list_of_products(self, list_name: str, list_data: ProductList):
        self.list_of_products[list_name] = list_data

    def get_json(self):
        output_json = {}
        for marketplace, product_list in self.list_of_products.items():
            items = []
            for item in product_list.products:
                items.append({"image": item.image,
                              "link": item.link,
                              "name": item.name,
                              "price": item.price})
            output_json[marketplace] = items
        return output_json
