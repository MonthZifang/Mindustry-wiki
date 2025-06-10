import logging

logger = logging.getLogger('MonthCloud_api')
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter('[%(asctime)s %(levelname)s][%(name)s][%(filename)s:%(lineno)s][%(process)d]: %(message)s')

consoleHeader = logging.StreamHandler()
consoleHeader.setFormatter(formatter)
consoleHeader.setLevel(logging.INFO)

fileHandler = logging.FileHandler(f"main.log")
fileHandler.setLevel(logging.DEBUG)
fileHandler.setFormatter(formatter)

logger.addHandler(fileHandler)
logger.addHandler(consoleHeader)




def debug(str):
    logger.debug(str)
def warning(str):
    logger.warning(str)
def error(str):
    logger.error(str)
def info(str):
    logger.info(str)


