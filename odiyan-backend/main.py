from fastapi import FastAPI
from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse
from api.auth_controller import auth_router
from api.user_controller import user_router
app = FastAPI()

file_content_cache = {}

def detect_media_type(file_path):
    extension=file_path[::-1].split(".")[0] # Reverse and split with .
    extension = extension[::-1]
    
    match extension:
        case "js":
            return "text/javascript"
        case "css":
            return "text/css"
        case "svg":
            return "image/svg+xml"
        case _:
            raise Exception("Unknown Asset Media Type")
    
def get_static_content_from_disk_or_cache(filename,file_path):
    # Save filecontent in Cache to avoid DISK READ
    if filename not in file_content_cache:
        content = open(file_path).read()
        file_content_cache[filename] = content
    else:
        content = file_content_cache[filename]
    return content
    
# Start APIs for serving static HTML+JS+CSS content
@app.get("/", tags=["Static UI Content based APIs"], summary="Loads the home page")
def show_home():
    html_content = get_static_content_from_disk_or_cache("index.html","index.html")
    return HTMLResponse(content=html_content, status_code=200)

@app.get("/login",tags=["Static UI Content based APIs"], summary="Loads the login/registration page") # Re route back to FRONTEND
def show_login():
    html_content = get_static_content_from_disk_or_cache("index.html","index.html")
    return HTMLResponse(content=html_content, status_code=200)

@app.get("/assets/{asset_file}",tags=["Static UI Content based APIs"], summary="Loads static js and css files")
def give_static_assets(asset_file:str):
    content = get_static_content_from_disk_or_cache(asset_file,f"assets/{asset_file}")
    media_type = detect_media_type(asset_file)
    return Response(content=content, media_type=media_type, headers={"Cache-Control":"max-age=60"})

# END APIs

# Adding other routers
app.include_router(auth_router, tags=["Auth based APIs"])
app.include_router(user_router, tags=["User Management APIs"])