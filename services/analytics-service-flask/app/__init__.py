from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from .routes.analytics_routes import analytics_bp
    from .routes.health_routes import health_bp
    
    app.register_blueprint(analytics_bp)
    app.register_blueprint(health_bp)
    
    return app
