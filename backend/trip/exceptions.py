from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Global API exception handler.
    Hides internal system errors from users.
    """

    # Let DRF handle normal exceptions
    response = exception_handler(exc, context)

    if response is not None:
        return response

    # Log actual error internally
    logger.exception(
        "Unhandled Exception: %s",
        exc
    )

    # Return safe response to user
    return Response(
        {
            "success": False,
            "message": "Something went wrong while processing your request."
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )