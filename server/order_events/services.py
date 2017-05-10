from django.core.exceptions import ValidationError

from order_events.enums import OrderEventStatus
from order_events.models import OrderEvent


def update_order_status(order: OrderEvent, new_status: int):
    if not is_state_change_acceptable(order.status, new_status):
        raise ValidationError("{0} is not valid new status".format(new_status))

    order.status = new_status
    order.save()

def is_state_change_acceptable(old_status, new_status) -> bool:
    allowed_transitions = (
        (OrderEventStatus.PREPARE, OrderEventStatus.BUILD),
        (OrderEventStatus.BUILD, OrderEventStatus.SEND),
        (OrderEventStatus.SEND, OrderEventStatus.BUILD),
        (OrderEventStatus.SEND, OrderEventStatus.PAY),
        (OrderEventStatus.PAY, OrderEventStatus.BUILD),
        (OrderEventStatus.PAY, OrderEventStatus.CLOSE),
        (OrderEventStatus.CLOSE, OrderEventStatus.PAY),
    )

    val = next((transition for transition in allowed_transitions if
                transition[0] == old_status and transition[1] == new_status), None)
    return val is not None
