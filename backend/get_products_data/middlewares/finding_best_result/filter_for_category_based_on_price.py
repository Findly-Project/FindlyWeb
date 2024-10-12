from pprint import pprint
from typing import List, Dict

data = [{'image': 'https://mmg.by/files/ItemsImages/271109_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/chehol_thule_gauntlet_macbook_pro_tgse2352_(temno-sinij)/',
          'name': '  Чехол Thule Gauntlet MacBook Pro TGSE2352 (темно-синий)',
          'price': 150.02},
         {'image': 'https://mmg.by/files/ItemsImages/177659_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/chehol_thule_gauntlet_macbook_pro_sleeve_16_tgse2357blk/',
          'name': '  Чехол Thule Gauntlet MacBook Pro Sleeve 16 TGSE2357BLK',
          'price': 201.99},
         {'image': 'https://mmg.by/files/ItemsImages/177660_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/chehol_thule_gauntlet_macbook_pro_sleeve_16_tgse2357blu/',
          'name': '  Чехол Thule Gauntlet MacBook Pro Sleeve 16 TGSE2357BLU',
          'price': 201.99},
         {'image': 'https://mmg.by/files/ItemsImages/253390_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/sumka_thule_gauntlet_macbook_pro_14_tgae2358_(black)/',
          'name': '  Сумка Thule Gauntlet MacBook Pro 14 TGAE2358 (black)',
          'price': 360.99},
         {'image': 'https://mmg.by/files/ItemsImages/223550_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/apple_macbook_pro_14__m1_pro_2021_mkgp3/',
          'name': 'Ноутбук  Apple Macbook Pro 14" M1 Pro 2021 MKGP3',
          'price': 8243.85},
         {'image': 'https://mmg.by/files/ItemsImages/282978_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/apple_macbook_pro_14__m1_pro_2021_z15g000ck/',
          'name': 'Ноутбук  Apple Macbook Pro 14" M1 Pro 2021 Z15G000CK',
          'price': 8778.8},
         {'image': 'https://mmg.by/files/ItemsImages/283047_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/apple_macbook_pro_16__m2_pro_2023_mnw83/',
          'name': 'Ноутбук  Apple Macbook Pro 16" M2 Pro 2023 MNW83',
          'price': 12147.38},
         {'image': 'https://mmg.by/files/ItemsImages/284088_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/apple_macbook_pro_16__m2_pro_2023_mnw93/',
          'name': 'Ноутбук  Apple Macbook Pro 16" M2 Pro 2023 MNW93',
          'price': 12899.98},
         {'image': 'https://mmg.by/files/ItemsImages/284086_r100.jpg',
          'link': 'https://mmg.by/shop/w/Item/apple_macbook_pro_16__m2_pro_2023_mnwd3/',
          'name': 'Ноутбук  Apple Macbook Pro 16" M2 Pro 2023 MNWD3',
          'price': 12899.98}]


def filter_by_price(candidates: List[Dict]) -> List[Dict]:

    if len(candidates) > 2:
        while True:
            is_filter = 1
            for i in range(len(candidates) - 1):
                try:
                    if candidates[i + 1]['price'] / candidates[i]['price'] > 2:
                        candidates.pop(i)
                        is_filter = 0
                except IndexError:
                    continue

            if is_filter:
                return candidates
    else:
        return candidates
