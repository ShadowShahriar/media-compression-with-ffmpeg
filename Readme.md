# media-compression-with-ffmpeg

> This repository demonstrates a basic approach to compressing media files using [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg). It also shows how we can automate this task and push compressed files to a new branch ([gh-pages][1]) using GitHub Actions.

Compressed files from the [src](./src) folder are stored in the [docs](./docs) folder. Media file extension, bitrate, codec, and other settings can be customized by editing the [index.config.js](./index.config.js) file.

# Note

To copy _only_ the [docs](./docs) folder to the ([gh-pages][1]) branch, first we have to create an orphan branch. We can do this by following the steps below:

1. Create a new branch named `gh-pages`.

    ```bash
    git checkout --orphan gh-pages
    ```

2. Delete everything except the `LICENSE` file.

3. Add files and push changes to the `gh-pages` branch.
    ```bash
    git add .
    git commit -m "Add initial files"
    git push -u origin gh-pages
    ```

Having done that, we can continue adding/removing media files by returning to our `main` branch.

```bash
git checkout main
```

And it should update the [docs][2] folder in the `gh-pages` branch.

# Demo

Install NPM dependencies by entering,

```bash
npm install
```

Then run the following command,

```bash
node index.js
```

It should store the compressed media files in the [docs](./docs) folder.

[1]: https://github.com/ShadowShahriar/media-compression-with-ffmpeg/tree/gh-pages
[2]: https://github.com/ShadowShahriar/media-compression-with-ffmpeg/tree/gh-pages/docs

# Audio Attribution

Royalty Free Music: https://www.bensound.com
License code: 4YLGVBMFRHVWIXYN
