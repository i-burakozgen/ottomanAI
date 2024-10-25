from app import factoryCreateApp
from config import DevConfig


if __name__ == "__main__":
    app = factoryCreateApp(DevConfig)
    app.run(debug=True, port=3000)