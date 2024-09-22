## Install

```
# Build the image
docker build -t morph:latest .

# Run the container with auto-restart
docker run -d --restart=always --name morph-container morph:latest
```