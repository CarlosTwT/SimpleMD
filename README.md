<h1 align='center'>Bienvenido👋 :wave:</h1>

<div align="center">
<img src="https://telegra.ph/file/c690c8293d8aa06491244.png" alt="SIMPLE MD" width="300" />
<p align="center">
 <img src="https://komarev.com/ghpvc/?username=CarlosTwT&color=pink&label=Vistas" />
 </p>
</p>
<h1 align="center">SIMPLE MD</h1>
</div>

## Cosas a destacar

- [x] Uso simple
- [x] Fácil de usar
- [x] Fácil de mantener/reparar
- [x] Anti-retraso
- [x] Único
- [x] ¡Antiventas!

# ¡Lee esto!

- Cambiar [Config](https://github.com/CarlosTwT/SimpleMD/blob/main/lib/config.json)
- Nombre de sesión: simple-md.json

# corre en heroku

Bot de WhatsApp multidispositivo

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/CarlosTwT/SimpleMD)


# Heroku Buildpack

| BuildPack | LINK |
|--------|--------|
| **FFMPEG** |[HERE](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) |
| **IMAGEMAGICK** | [HERE](https://github.com/mcollina/heroku-buildpack-imagemagick.git) |
| **Node.js**     | heroku/nodejs|
| **WEBP**        | [HERE](https://github.com/clhuang/heroku-buildpack-webp-binaries.git) |

### Statistics

[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=CarlosTwT&show_icons=true&hide=issues&theme=radical)](https://github-readme-stats.vercel.app)
[![Top Languages](https://github-readme-stats.vercel.app/api/top-langs?username=CarlosTwT&layout=compact&theme=radical)](https://github-readme-stats.vercel.app)

## Instalación en Termux

### Clonar repositorio

```bash
> pkg install
> pkg upgrade
> pkg install git
> pkg install ffmpeg && pkg install libwebp
> pkg install nodejs
> git clone https://github.com/CarlosTwT/SimpleMD
> cd SimpleMD
> npm install
> npm start
# Scan QR
```

## Instalación

### Necesario

1.  [Nodejs](https://nodejs.org/en/download) 16x/17x
2.  [FFmpeg](https://ffmpeg.org)
3.  [libWebP](https://developers.google.com/speed/webp/download)

### Install Ffmpeg

-   Para usuarios de Windows, pueden ver el tutorial aquí [WikiHow](https://www.wikihow.com/Install-Ffmpeg-on-Windows)<br />
-   Para usuarios de Linux, puede usar su propio administrador de paquetes. Por ejemplo;

```bash
# apt (Ubuntu)
apt install ffmpeg -y

# pacman (Arch Linux)
pacman -S ffmpeg
```

### Install libWebP

- Para usuarios de Windows,

1. Descargue libWebP para Windows desde [aquí](https://developers.google.com/speed/webp/download)
2.  Extraer a C:\
3. Cambie el nombre de la carpeta extraída a `libwebp`
4. Abra PowerShell y ejecute el siguiente comando;

```cmd
setx /m PATH "C:\libwebp\bin;%PATH%"
```

> Si se instaló correctamente, verifique con el siguiente comando en el símbolo del sistema

```cmd
webpmux -version
```

-   Para usuarios de Linux, puede usar su administrador de paquetes. Por ejemplo;

```bash
# apt (Ubuntu)
apt install libwebp-dev -y

# pacman (Arch Linux)
pacman -S libwebp
```

### Clone Repo

```bash
# clone repo
git clone --depth=1 https://github.com/CarlosTwT/SimpleMD

# cambia tu posición en el directorio
cd SimpleMD

# instalar todos los módulos
npm install
# o
yarn install

# cuando la biblioteca @adiwajshing/baileys de error, ejecute el siguiente código

cd ./node_modules/@adiwajshing/baileys
npm install -g typescript
npm run build:tsc
```

### Iniciar robot

Iniciar y escanear QR<br />

```bash
npm start
```

# Many thanks to the creator of the base!!
# Muchísimas gracias al creador de la base!!

-   [`Senkuu`](https://github.com/xzeera-id)
-   [`Senkuu`](https://wa.me/6281312960392)
