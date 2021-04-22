# Notary Sign Action

This action is intendet to sign images for docker using [Notary](https://github.com/theupdateframework/notary).

# Usage

Import this action and use the [docker build-push-action](https://github.com/docker/build-push-action) to create an image.
Then you can sign it using your key.

```yml
name: ci

on:
  push:
    branches:
      - 'master'

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v1
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      - name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build and push
        id: docker_build
        uses: docker/build-push-action@v2
        with:
          load: true
          tags: user/app:latest
      - name: Sign image
        uses: neohelden/notary-action
        with:
          tags: user/app:latest
          key: ${{ secrets.RSA_KEY }}
          keyname: actions
```

# Inputs

| Name     | type     | description                                     | required | default                  |
| -------- | -------- | ----------------------------------------------- | -------- | ------------------------ |
| key      | string   | The key to load into docker to sign the images  | true     |                          |
| tags     | List/CSV | The tags to sign and push                       | true     |                          |
| keyname  | string   | The name of the key. This key is used by notary | true     |                          |
| registry | string   | The notary registry to use                      | false    | https://notary.docker.io |
