# Flask Analytics Data Models (Representation of data models and schemas)

class MetricPoint:
    def __init__(self, key, value, category):
        self.key = key
        self.value = value
        self.category = category

    def to_dict(self):
        return {
            "key": self.key,
            "value": self.value,
            "category": self.category
        }
