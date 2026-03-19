from unittest.mock import MagicMock


def make_result_all(items: list):
    scalar = MagicMock()
    scalar.all.return_value = items
    scalar.scalar_one_or_none.return_value = None
    result = MagicMock()
    result.scalars.return_value = scalar
    result.scalar_one_or_none.return_value = None
    return result


def make_result_one(item):
    scalar = MagicMock()
    scalar.all.return_value = []
    scalar.scalar_one_or_none.return_value = item
    result = MagicMock()
    result.scalars.return_value = scalar
    result.scalar_one_or_none.return_value = item
    return result
