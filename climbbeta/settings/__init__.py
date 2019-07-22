import os
import sys

if os.environ['PRODUCTION_SETTING'] == "true":
    from .production import *
elif os.environ['PRODUCTION_SETTING'] == "false":
    from .local import *
else:
    sys.exit("PRODUCTION_SETTING value is not recognized. Set variable to either 'true' or 'false'")
