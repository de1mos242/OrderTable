class OrderEventStatus:
    PREPARE = 0
    BUILD = 1
    SEND = 2
    PAY = 3
    CLOSE = 4
    STATUS_CHOICES = (
        (PREPARE, 'PREPARE'),
        (BUILD, 'BUILD'),
        (SEND, 'SEND'),
        (PAY, 'PAY'),
        (CLOSE, 'CLOSE'),
    )

    @staticmethod
    def get_by_name(status_name: str) -> int:
        return next(value for value, name in OrderEventStatus.STATUS_CHOICES if name == status_name.upper())
